import json
import os

from langchain.chains import LLMChain, RetrievalQA, ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationTokenBufferMemory
from langchain.callbacks import get_openai_callback
from langchain.prompts import PromptTemplate
import langdetect
from django.conf import settings
from rafiq.core.models import Embedding


from rafiq.llm.prompts import COND_QA_PROMPT, GENERIC_PROMPT, QA_PROMPT, LANGUAGE_CODES


class _RetrievalQAExtended(RetrievalQA):
    def _call(self, inputs):
        question = inputs[self.input_key]
        inputs.pop(self.input_key)

        docs = self._get_docs(question)
        answer = self.combine_documents_chain.run(
            input_documents=docs, question=question, **inputs
        )

        if self.return_source_documents:
            return {self.output_key: answer, "source_documents": docs}
        else:
            return {self.output_key: answer}

def _estimate_chat_cost(total_tokens):
    return (0.002 / 1000) * total_tokens


def create_qa():
    llm = ChatOpenAI(openai_api_key=Embedding.objects.all().first().open_api_key, model_name="gpt-3.5-turbo", temperature=0)

    condense_question_chain = LLMChain(
        llm=llm, prompt=PromptTemplate(template=COND_QA_PROMPT, input_variables=['language', "chat_history", "question"])
    )

    # Create the generic question chain
    generic_llm = LLMChain(
        llm=llm, prompt=PromptTemplate(template=GENERIC_PROMPT, input_variables=['language', "chat_history", "question"])
    )

    return condense_question_chain, generic_llm


def create_context_qa(vectorstore, base_prompt):
    # Create the context based question chain
    retriever = vectorstore.as_retriever()
    retriever.search_kwargs = {"k": settings.TOP_K_CHUNK}

    qa = _RetrievalQAExtended.from_chain_type(
        llm=ChatOpenAI(openai_api_key=Embedding.objects.all().first().open_api_key, model_name="gpt-3.5-turbo", temperature=0),
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": PromptTemplate(template=base_prompt.strip() + QA_PROMPT, input_variables=['language', "context", "question"])},
    )

    return qa


def get_context_answer(cond_q, generic_llm, qa, query, conversations):
    language = LANGUAGE_CODES[langdetect.detect(query)]
    try:
        with get_openai_callback() as cb:
            # Try to generate a standalone questions using converstational history
            llm = ChatOpenAI(openai_api_key=Embedding.objects.all().first().open_api_key, model_name="gpt-3.5-turbo", temperature=0)
            chat_history = ConversationTokenBufferMemory(
                llm=llm, max_token_limit=3600, return_messages=False, ai_prefix="Assistant"
            )

            for conv in conversations:
                if conv.context_based:
                    chat_history.save_context({"input": conv.stand_alone_query}, {"output": conv.response})

            history = chat_history.load_memory_variables({})["history"]
            response = cond_q.run(question=query, chat_history=history, language=language)
            response = json.loads(response)
            new_question = response["result"] if response["status"] == "followup" else query

            # If query is generic, use generic llm
            if response["status"] == "generic":
                chat_history = ConversationTokenBufferMemory(
                    llm=llm, max_token_limit=3600, return_messages=False, ai_prefix="Assistant"
                )
                chats = []

                for conv in conversations[::-1]:
                    if not conv.context_based:
                        chats.append(({"input": conv.stand_alone_query}, {"output": conv.response}))
                    else:
                        break

                chats = chats[::-1]
                for chat in chats:
                    chat_history.save_context(*chat)

                history = chat_history.load_memory_variables({})["history"]
                answer = generic_llm.run(question=new_question, chat_history=history, language=language)
                response = {"context_based": False, "answer": {"answer": answer.split('\n')[0]}}

            # else use context based llm
            else:
                response = qa({"query": new_question, 'language': language}, return_only_outputs=True)
                print(response['result'])
                result = json.loads(response['result'].split('}')[0] + '}')
                result["context_based"] = result.pop("status")
                result["context_based"] = False if result["context_based"] == "False" else True

                if not result["context_based"]:
                    response = {"context_based": False, "answer": {"answer": result["answer"]}}
                else:
                    sources = response["source_documents"]
                    response = {
                        "context_based": True,
                        "answer": {
                            "answer": result["answer"],
                            "sources": sources,
                            "follow_up_questions": result["follow_up_ques"],
                        },
                    }

        chat_cost = _estimate_chat_cost(cb.total_tokens)
        return {
            "status": True,
            "answer": response["answer"],
            "context_based": response["context_based"],
            "standalone_question": new_question,
            "question": query,
            'cost': chat_cost, 
        }
    except BaseException as e:
        print(e)
        return {"status": False, "error": str(e)}


def get_conversation_answer(query, conversations):
    llm = ChatOpenAI(openai_api_key=Embedding.objects.all().first().open_api_key, model_name="gpt-3.5-turbo", temperature=1)
    chat_history = ConversationTokenBufferMemory(llm=llm, max_token_limit=3500, return_messages=False)

    for conv in conversations:
        chat_history.save_context({"input": conv[0]}, {"output": conv[1]})

    conversation = ConversationChain(llm=llm, verbose=False, memory=chat_history)
    answer = conversation.predict(input=query)
    return answer