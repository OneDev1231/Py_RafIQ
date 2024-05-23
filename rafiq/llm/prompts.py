COND_QA_PROMPT = """
Given the following conversations and a user input in {language}.
If the user input is not a question, then don't rephrase it and return it as result.
If the user input is not related to the conversations, don't rephrase it and return it as result.
Otherwise rephrase the user input to be a standalone question if the question is a follow-up question.

Conversations:
{chat_history}

User input: {question}

When coming up with this status/result pair, you must respond in the following format:
```
{{
    "status": "$YOUR_STATUS_HERE",
    "result": "$THE_RESULT_HERE"
}}
```
Everything between the ``` must be valid json.
"result" should ALWAYS be in {language}.

The status key should have one of the following values:
    - "question": if it's a question.
    - "generic": if it's not a question.
"""

GENERIC_PROMPT = """
You are an AI assistant chatbot.
You are given the following conversations and a user input in {language}.
If the user input is not a question, then greet the user.
If the user input is related any subject matter just answer "Hmm, I'm not sure." and ask if there are any other
questions in the answer. Don't try to make up an answer.
Don't act like any SME.
ALWAYS reply in {language}.

Conversations:
{chat_history}

User input: {question}

Answer:
"""

QA_PROMPT = """
. The input is in {language}. If you can't find the answer in the information below, just answer "Hmm, I'm not
sure." and stop after that in the answer. Don't try to make up an answer. If the user input is not related to the
information, politely answer that you are tuned to only answer questions. Never break character.
For each answer you provide, also include a status key that indicates whether the answer is generated from the
given context or not. Also give 3 new follow-up user questions in a list.

When coming up with the final result, you must respond in the following format:
```
{{
    "status": "$YOUR_STATUS_HERE",
    "answer": "$YOUR_ANSWER_HERE",
    "follow_up_ques": "$YOUR_FOLLOW_UP_QUES_HERE"
}}
```
"answer" key value should ALWAYS be in {language}.

The status key should have one of the following values:
    - "True": if the answer is generated from the given context.
    - "False": if the answer is not generated from the given context or if you're not sure about the answer.

Everything between the ``` must be valid JSON.

Please come up with a result, in the specified JSON format, for the following:
----------------
Information: {context}
User input: {question}
"""

LANGUAGE_CODES = {
  "af": "Afrikaans",
  "ar": "Arabic",
  "bg": "Bulgarian",
  "bn": "Bengali",
  "ca": "Catalan",
  "cs": "Czech",
  "cy": "Welsh",
  "da": "Danish",
  "de": "German",
  "el": "Greek",
  "en": "English",
  "es": "Spanish",
  "et": "Estonian",
  "fa": "Persian",
  "fi": "Finnish",
  "fr": "French",
  "gu": "Gujarati",
  "he": "Hebrew",
  "hi": "Hindi",
  "hr": "Croatian",
  "hu": "Hungarian",
  "id": "Indonesian",
  "it": "Italian",
  "ja": "Japanese",
  "kn": "Kannada",
  "ko": "Korean",
  "lt": "Lithuanian",
  "lv": "Latvian",
  "mk": "Macedonian",
  "ml": "Malayalam",
  "mr": "Marathi",
  "ne": "Nepali",
  "nl": "Dutch",
  "no": "Norwegian",
  "pa": "Punjabi",
  "pl": "Polish",
  "pt": "Portuguese",
  "ro": "Romanian",
  "ru": "Russian",
  "sk": "Slovak",
  "sl": "Slovenian",
  "so": "Somali",
  "sq": "Albanian",
  "sv": "Swedish",
  "sw": "Swahili",
  "ta": "Tamil",
  "te": "Telugu",
  "th": "Thai",
  "tl": "Tagalog",
  "tr": "Turkish",
  "uk": "Ukrainian",
  "ur": "Urdu",
  "vi": "Vietnamese",
  "zh-cn": "Chinese (Simplified)",
  "zh-tw": "Chinese (Traditional)"
}
