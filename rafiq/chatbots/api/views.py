from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .serializers import ChatbotsSerializer,DocumentsSerializer,MessagesSerializer,ConversationSerializer,SavedChatBotsSerializer,GptMessagesSerializer,GptConversationSerializer
from ..models import Chatbots,Documents,Messages,Conversation,SavedChatBots,ChatbotView,GptMessages,GptConversation
from rafiq.core.helpers import StandardResultsSetPagination,getPagination
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rafiq.llm.embeddings import create_vector_store, WeaviateRafiq
from rafiq.llm.models import create_context_qa, get_context_answer,get_conversation_answer
from rafiq.core.models import Embedding
from rafiq.llm.generate_source import generate_sources
from rafiq.llm.helpers import get_pages,get_file_size
from rafiq.chatbots.api.globals import CONTEXT_QA_BOT, GENERIC_LLM, CONDENSE_QUES_CHAIN


def _create_chatbot_index_name(chatbot_id):
    return f'Context_qa_{chatbot_id}'



def _create_chatbot(chatbot_id, documents, website_link, data_language, allowed_webpages_pages, reinit=False):
    files = [document.document.path for document in documents]

    if data_language == 'NOT-ENGLISH':
        embedding_type = 'COHERE'
    else:
        try:
            embedding_type = Embedding.objects.all().first().title
        except:
            embedding_type = "OPENAI"

    index_name = _create_chatbot_index_name(chatbot_id)
    vectorstore, cost = create_vector_store(files, website_link, index_name, allowed_webpages_pages, embedding_type=embedding_type, reinit=reinit) 

    context_qa = create_context_qa(vectorstore, base_prompt=Embedding.objects.all().first().prompt_message)
    CONTEXT_QA_BOT[index_name] = context_qa
    return cost, embedding_type


class DocumentsView(ModelViewSet):
    serializer_class = DocumentsSerializer
    permission_classes = [IsAuthenticated]
    pagination_class=StandardResultsSetPagination
    authentication_classes = [TokenAuthentication]
    queryset = Documents.objects.all()

    @action(detail=False, methods=["get"], name="Submit documents change for the chatbot")
    def submit_change(self,request):
        userprofile = request.user.userprofile
        chatbot_id = request.GET.get("chatbot-id",None)
        if chatbot_id is None:
            data = {
                "status":"error",
                "message":"chatbot-id is required",
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        try:
            chatbot = Chatbots.objects.get(id=chatbot_id)
        except:
            data = {
                "status":"error",
                "message":"invalid chatbot-id",
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)

        chatbot_id = chatbot.id
        documents = chatbot.documents.all()
        # webpages count
        allowed_webpages_pages = userprofile.subscription_plan.features.webpages_count
        cost, embedding_type = _create_chatbot(chatbot_id, documents, chatbot.website_link, chatbot.data_language, allowed_webpages_pages, reinit=True)
        chatbot.embedding = embedding_type
        chatbot.cost += cost
        chatbot.save()
        
        data = {
                "status":"ok",
                "message":"successfull updated the chatbot",
            }
        return Response(data=data,status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        user = request.user
        userprofile = user.userprofile
        if userprofile.files_count == 0:
            data ={
                "status":"error",
                "message":f"monthly limit reached."
            }
            return Response(data=data,status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            obj = serializer.save(user=request.user)
            if obj.type == "DOCUMENT":
            # page counts
                file_path = obj.document.path
                try:
                    page_count = get_pages(file_path)
                except:
                    data={
                        "status":"error",
                        "message":"invalid file type only .csv,.pdf,.txt,.doc,.docx are allowerd"
                    }
                    return Response(data=data,status=status.HTTP_400_BAD_REQUEST)

                file_size = get_file_size(file_path)
                if page_count > userprofile.subscription_plan.features.pages_count:
                    obj.delete()
                    data ={
                    "status":"error",
                    "message":f"page number exceed.you cannot upload a file having more than {userprofile.subscription_plan.features.pages_count} pages"
                    }
                    return Response(data=data,status=status.HTTP_400_BAD_REQUEST)
                if file_size >  userprofile.subscription_plan.features.mb_count:
                    data ={
                    "status":"error",
                    "message":f"file size exceed.you cannot upload a file more than {userprofile.subscription_plan.features.mb_count} mb."
                    }
                    return Response(data=data,status=status.HTTP_400_BAD_REQUEST)
                obj.pages_count = page_count
                obj.file_size = file_size
                obj.save()
                userprofile.files_count -= 1
                userprofile.save()
            return Response(data=serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        
class ChatbotsView(ModelViewSet):
    serializer_class = ChatbotsSerializer
    permission_classes = [IsAuthenticated]
    pagination_class=StandardResultsSetPagination
    authentication_classes = [TokenAuthentication]
    queryset = Chatbots.objects.all()
    
    
    def create(self, request, *args, **kwargs):
        user = request.user
        userprofile = user.userprofile
        if userprofile.chatbot_count == 0:
            data ={
                "status":"error",
                "message":f"monthly limit reached."
            }
            return Response(data=data,status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
            chatbot_id = obj.id
            documents = obj.documents.all()
            
            # webpages count
            allowed_webpages_pages = userprofile.subscription_plan.features.webpages_count
            cost, embedding_type = _create_chatbot(chatbot_id, documents, obj.website_link, obj.data_language, allowed_webpages_pages)
            obj.embedding = embedding_type
            obj.cost = cost
            obj.save()
            userprofile.chatbot_count -= 1
            userprofile.save()
            
            data = {
                "status":"ok",
                "message":"Successfull",
                "data":serializer.data
            }
            return Response(data=data,status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request,pk,*args, **kwargs):
        try:
            bot = self.queryset.get(id=pk)
        except:
            data={
                "status":"invalid id"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        ChatbotView.objects.create(user=request.user,bot=bot)
        return super().retrieve(request, *args, **kwargs)
        
    
    @action(detail=False, methods=["get"], name="Get Chatbots by user")
    def get_chatbot_by_user(self,request):
        user_id = request.GET.get("user-id",request.user.id)
        queryset = self.queryset.filter(user__id=user_id)
        return getPagination(queryset=queryset,request=request,serializerClass=self.serializer_class,many=True)
    
class MessagesView(ModelViewSet):
    serializer_class = MessagesSerializer
    permission_classes = [IsAuthenticated]
    pagination_class=StandardResultsSetPagination
    authentication_classes = [TokenAuthentication]
    queryset = Messages.objects.all()
    
    
    def create(self, request, *args, **kwargs):
        conversation_id = request.GET.get("conversation-id",None)
        bot_id = request.GET.get("bot-id",None)
        query = request.POST.get("query",None)
        
        user = request.user
        userprofile = user.userprofile
        if userprofile.message_count == 0:
            data ={
                "status":"error",
                "message":f"monthly limit reached."
            }
            return Response(data=data,status=status.HTTP_400_BAD_REQUEST)
        
        if query is None:
            data={
                "status":"error",
                "message":"query is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        if bot_id is None:
            data={
                "status":"error",
                "message":"bot-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        try:
            bot = Chatbots.objects.get(id=bot_id)
        except:
            data={
                "status":"error",
                "message":"invalid bot-id"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)

        try:
            conversation = Conversation.objects.get(id=conversation_id)
        except:
            conversation = Conversation.objects.create(user=request.user,bot=bot)
        
        conversations = conversation.chat.all()
        
        index_name = _create_chatbot_index_name(bot_id)
        if index_name not in CONTEXT_QA_BOT:
            import os
            from langchain.embeddings import OpenAIEmbeddings, CohereEmbeddings
            import weaviate

            if bot.embedding == 'OPENAI':
                embeddings = OpenAIEmbeddings(openai_api_key=Embedding.objects.all().first().open_api_key)
            else:
                embeddings = CohereEmbeddings(cohere_api_key=Embedding.objects.all().first().cohere_api_key)
                
            client = weaviate.Client(
                url=os.environ['WEAVIATE_URL']
            )
            vectorstore = WeaviateRafiq(client, index_name, text_key='text', embedding=embeddings, attributes=['source'])
            context_qa = create_context_qa(vectorstore, base_prompt=Embedding.objects.all().first().prompt_message)
            CONTEXT_QA_BOT[index_name] = context_qa

        # from langchain.vectorstores import Annoy
        # from langchain.embeddings import CohereEmbeddings, OpenAIEmbeddings
        # import os
        # chat_num = 386
        # vectorstore_path = f'/app/rafiq/vectorstores/{chat_num}'
        # embeddings = CohereEmbeddings(cohere_api_key=Embedding.objects.all().first().cohere_api_key)
        # # embeddings = OpenAIEmbeddings(openai_api_key=Embedding.objects.all().first().open_api_key)
        # vectorstore = Annoy.load_local(folder_path=vectorstore_path, embeddings=embeddings)
        # context_qa = create_context_qa(vectorstore)
        # settings.CONTEXT_QA_BOT[chat_num]=context_qa

        response = get_context_answer(
            cond_q=CONDENSE_QUES_CHAIN,
            generic_llm=GENERIC_LLM,
            qa=CONTEXT_QA_BOT[index_name],
            query=query,
            conversations=conversations
        )

        if response['status']:
            
            userprofile.message_count -= 1
            userprofile.save()
            
            sources = []
            if response['context_based']:
                sources = generate_sources(response['answer']['sources'])

            message = Messages.objects.create(query=query,response=response['answer']['answer'],context_based=response['context_based'],stand_alone_query=response['standalone_question'], cost=response['cost'])
            
                
            conversation.chat.add(message)
            conversation.save()
            
            serializer = self.serializer_class(message)
            data={
                "status":"ok",
                "message":"successfull",
                "data":serializer.data,
                "conversation_id":conversation.id
            }
            return Response(data=data,status=status.HTTP_201_CREATED)
        else:
            data = {
                "status": "error",
                "message": "something went wrong please try again later"
            }
            return Response(data=data,status=status.HTTP_400_BAD_REQUEST)
            
            
    @action(detail=False, methods=["get"], name="Get Chatbots by user")
    def get_messages_by_conversation(self,request):
        conversation_id = request.GET.get("chat-id",None)
        if conversation_id is None:
            data={
                "status":"error",
                "message":"conversation-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        try:
            conversation = Conversation.objects.get(id=conversation_id)
        except:
            data={
                "status":"error",
                "message":"invalid conversation"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        messages = conversation.chat.all()
        return getPagination(queryset=messages,request=request,serializerClass=self.serializer_class,many=True)
        
        
class ConversationView(ModelViewSet):
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]
    pagination_class=StandardResultsSetPagination
    authentication_classes = [TokenAuthentication]
    queryset = Conversation.objects.all()
    
    @action(detail=False, methods=["get"], name="Get Chatbots by user")
    def get_conversations_by_bot(self,request):
        bot_id = request.GET.get("bot-id",None)
        
        if bot_id is None:
            data={
                "status":"error",
                "message":"bot-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
        queryset = self.queryset.filter(bot__id=bot_id)
        return getPagination(queryset=queryset,request=request,serializerClass=self.serializer_class,many=True)
    
    @action(detail=False, methods=["get"], name="Get Chatbots by user")
    def get_conversations_by_user(self,request):
        user_id = request.GET.get("user-id",request.user.id)
        if user_id is None:
            data={
                "status":"error",
                "message":"user-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        queryset = self.queryset.filter(user__id=user_id)
        return getPagination(queryset=queryset,request=request,serializerClass=self.serializer_class,many=True)
    
    @action(detail=False, methods=["get"], name="Get Chatbots by user")
    def get_conversations_by_user_bot(self,request):
        user_id = request.GET.get("user-id",request.user.id)
        bot_id = request.GET.get("bot-id",None)
        if user_id is None:
            data={
                "status":"error",
                "message":"user-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        if bot_id is None:
            data={
                "status":"error",
                "message":"bot-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        queryset = self.queryset.filter(user__id=user_id,bot__id=bot_id)
        return getPagination(queryset=queryset,request=request,serializerClass=self.serializer_class,many=True)

class SavedChatBotsView(ModelViewSet):
    serializer_class = SavedChatBotsSerializer
    permission_classes = [IsAuthenticated]
    pagination_class=StandardResultsSetPagination
    authentication_classes = [TokenAuthentication]
    queryset = SavedChatBots.objects.all()
    
    
class GptConversationView(ModelViewSet):
    serializer_class = GptConversationSerializer
    permission_classes = [IsAuthenticated]
    pagination_class=StandardResultsSetPagination
    authentication_classes = [TokenAuthentication]
    queryset = GptConversation.objects.all()
    
    @action(detail=False, methods=["get"], name="Get Chatbots by user")
    def get_conversations_by_user(self,request):
        user_id = request.GET.get("user-id",request.user.id)
        queryset = self.queryset.filter(user__id=user_id)
        return getPagination(queryset=queryset,request=request,serializerClass=self.serializer_class,many=True)
    
    @action(detail=False, methods=["get"], name="Get Chatbots by user")
    def clear_all_conversations_by_user(self,request):
        user_id = request.GET.get("user-id",request.user.id)
        queryset = self.queryset.filter(user__id=user_id)
        queryset.delete()
        data={
            "status":"ok",
            "message":"successfull"
        }
        return Response(data=data,status=status.HTTP_200_OK)
    
    
    
class GptMessagesView(ModelViewSet):
    serializer_class = GptMessagesSerializer
    permission_classes = [IsAuthenticated]
    pagination_class=StandardResultsSetPagination
    authentication_classes = [TokenAuthentication]
    queryset = GptMessages.objects.all()
    
    
    def create(self, request, *args, **kwargs):
        gpt_conversation_id = request.GET.get("gpt-conversation-id",None)
        query = request.POST.get("query",None)
        if query is None:
            data={
                "status":"error",
                "message":"query is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)

        try:
            conversation = GptConversation.objects.get(id=gpt_conversation_id)
        except:
            conversation = GptConversation.objects.create(user=request.user)
        
        chats = conversation.chat.all()
        
        previous_questions = []
        for chat in chats:
            previous_questions.append((chat.query,chat.response))
        
        response = get_conversation_answer(query,previous_questions)

        if response:
            message = Messages.objects.create(query=query,response=response)
            conversation.chat.add(message)
            conversation.save()
            
            serializer = self.serializer_class(message)
            data={
                "status":"ok",
                "message":"successfull",
                "data":serializer.data,
                "conversation_id":conversation.id
            }
            return Response(data=data,status=status.HTTP_201_CREATED)
        else:
            data = {
                "status": "error",
                "message": "something went wrong please try again later"
            }
            return Response(data=data,status=status.HTTP_400_BAD_REQUEST)
            
            
    @action(detail=False, methods=["get"], name="Get messages by conversation")
    def get_messages_by_conversation(self,request):
        conversation_id = request.GET.get("chat-id",None)
        if conversation_id is None:
            data={
                "status":"error",
                "message":"chat-id is required"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        try:
            conversation = GptConversation.objects.get(id=conversation_id)
        except:
            data={
                "status":"error",
                "message":"invalid conversation"
            }
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        messages = conversation.chat.all()
        return getPagination(queryset=messages,request=request,serializerClass=self.serializer_class,many=True)
