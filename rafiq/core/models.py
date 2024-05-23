from django.db import models

from dotenv import load_dotenv

import os
load_dotenv()
COHERE_KEY = os.getenv('CELERY_KEY')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

EMBEDDING_CHOICES=(
    ("OPENAI","OPENAI"),
    ("COHERE","COHERE"),
)

class Embedding(models.Model):
    title = models.CharField(choices=EMBEDDING_CHOICES,max_length=15,default="OPENAI")
    prompt_message = models.TextField(default="You are a personal growth assistant. Your job is to help the users with their questions. You are given the following extracted parts of a long document and a user input. Provide an answer with atleast 300 words for the following user input.")
    open_api_key = models.CharField(max_length=1000,default=OPENAI_API_KEY)
    cohere_api_key = models.CharField(max_length=1000,default=COHERE_KEY)
    
    def __str__(self):
        return self.title
    
class FAQ(models.Model):
    question = models.TextField(null=True,blank=True)
    answer = models.TextField(null=True,blank=True)
    
    def __str__(self):
        return self.question

class Testomonials(models.Model):
    customer_name = models.CharField(max_length=1000,null=True,blank=True)
    rating = models.FloatField(default=5.0)
    review = models.TextField(null=True,blank=True)
    
    
    def __str__(self):
        return self.customer_name
    
class FeatureVideo(models.Model):
    video = models.FileField(null=True,blank=True)
    
    def __str__(self):
        return str(self.pk)
    
class ContactUs(models.Model):
    full_name = models.CharField(max_length=1000,null=True,blank=True)
    email = models.EmailField(null=True,blank=True)
    question = models.TextField(null=True,blank=True)
    
    def __str__(self):    
        return self.full_name
