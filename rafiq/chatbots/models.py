from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import JSONField
from rafiq.core.models import EMBEDDING_CHOICES
User = get_user_model()


class Documents(models.Model):
    DATA_SOURCE = (
        ("DOCUMENT","DOCUMENT"),
        ("WEBSITE","WEBSITE"),
    )
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    name = models.CharField(max_length=1000,null=True,blank=True)
    pages_count = models.IntegerField(null=True,blank=True)
    type =  models.CharField(max_length=15,choices=DATA_SOURCE,default="FILES")
    website_link = models.URLField(null=True,blank=True)
    file_size = models.CharField(max_length=100,null=True,blank=True)
    document = models.FileField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Chatbots(models.Model):
    DATA_LANGUAGE = (
        ("ENGLISH","ENGLISH"),
        ("NOT-ENGLISH","NOT-ENGLISH"),
    )
    DATA_SOURCE = (
        ("FILES","FILES"),
        ("WEBSITE","WEBSITE"),
        ("FILES & WEBSITE","FILES & WEBSITE"),
    )
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    name = models.CharField(max_length=1000,null=False,blank=False)
    thumbnail = models.ImageField(null=True,blank=True)
    data_language = models.CharField(max_length=15,choices=DATA_LANGUAGE,default="ENGLISH")
    data_source = models.CharField(max_length=15,choices=DATA_SOURCE,default="FILES")
    website_link = models.URLField(null=True,blank=True)
    documents = models.ManyToManyField(Documents,related_name="chatbot_files",blank=True)
    vector_store = models.CharField(max_length=10000,null=True,blank=True)
    embedding = models.CharField(max_length=15,choices=EMBEDDING_CHOICES,null=True,blank=True)
    cost = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
class Messages(models.Model):
    query = models.TextField(null=True,blank=True)
    stand_alone_query = models.TextField(null=True,blank=True)
    context_based = models.BooleanField(default=False)
    cost = models.FloatField(default=0.0)
    response = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    
class Conversation(models.Model):
    VISIBILITY = (
        ("PUBLIC","PUBLIC"),
        ("PRIVATE","PRIVATE"),
    )
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    chat = models.ManyToManyField(Messages,related_name="chat",blank=True)
    bot = models.ForeignKey(Chatbots,on_delete=models.CASCADE,null=False,blank=False)
    user_message_color = models.CharField(max_length=100,null=True,blank=True)
    chat_bubble_color = models.CharField(max_length=100,null=True,blank=True)
    initial_message = models.CharField(max_length=1000,null=True,blank=True)
    visibility = models.CharField(max_length=100,choices=VISIBILITY,default="PRIVATE")
    created_at = models.DateTimeField(auto_now_add=True)
    
    
class SavedChatBots(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    bot = models.ForeignKey(Chatbots,on_delete=models.CASCADE,null=False,blank=False)
    name = models.CharField(max_length=1000,null=True,blank=True)
    
class ChatbotView(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    bot = models.ForeignKey(Chatbots,on_delete=models.CASCADE,null=False,blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    


class GptMessages(models.Model):
    query = models.TextField(null=True,blank=True)
    cost = models.FloatField(default=0.0)
    response = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    
class GptConversation(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=False,blank=False)
    chat = models.ManyToManyField(Messages,related_name="chat_gpt",blank=True)
    created_at = models.DateTimeField(auto_now_add=True)