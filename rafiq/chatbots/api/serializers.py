from ..models import Chatbots,Documents,Messages,Conversation,SavedChatBots,GptConversation,GptMessages
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from drf_extra_fields.fields import Base64ImageField
from rafiq.llm.helpers import get_suffix

class DocumentsSerializer(serializers.ModelSerializer):
    file_type = serializers.SerializerMethodField("get_file_type",read_only=True)
    class Meta:
        model = Documents
        fields = "__all__"
        
    def get_file_type(self,obj):
        try:
            if obj.document:
                return get_suffix(obj.document.path)
            else:
                return None
        except:
            return None
class ChatbotsSerializer(serializers.ModelSerializer):
    documents = DocumentsSerializer(read_only=True,many=True)
    documents_id = serializers.ListField(write_only=True)
    thumbnail = Base64ImageField(required=False)
    class Meta:
        model = Chatbots
        fields = "__all__"
    
    def create(self, validated_data):
        documents_id = list(validated_data.pop("documents_id",[]))
        documets = Documents.objects.filter(id__in=documents_id)
        chatbot = Chatbots.objects.create(**validated_data)
        chatbot.documents.set(documets)
        return chatbot
    
    def update(self, instance, validated_data):
        documents_id = list(validated_data.pop("documents_id",[]))
        documets = Documents.objects.filter(id__in=documents_id)
        instance.documents.set(documets)
        return super().update(instance, validated_data)
        
        
class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = "__all__"
        
class ConversationSerializer(serializers.ModelSerializer):
    chat = MessagesSerializer(read_only=True,many=True)
    bot = ChatbotsSerializer(read_only=True)
    class Meta:
        model = Conversation
        fields = "__all__"

class SavedChatBotsSerializer(serializers.ModelSerializer):
    bot = ChatbotsSerializer(read_only=True)
    bot_id = serializers.IntegerField(required=True,write_only=True)
    class Meta:
        model = SavedChatBots
        fields = "__all__"
        
    def create(self, validated_data):
        bot_id = validated_data.pop("bot_id",None)
        if bot_id is None:
            raise ValidationError("bot_id is required")
        
        try:
            bot = Chatbots.objects.get(id=bot_id)
        except:
            raise ValidationError("Invalid bot id")
        
        return SavedChatBots.objects.create(bot=bot,**validated_data)
    
    
class GptMessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GptMessages
        fields = "__all__"
        
class GptConversationSerializer(serializers.ModelSerializer):
    chat = GptMessagesSerializer(read_only=True,many=True)
    class Meta:
        model = GptConversation
        fields = "__all__"