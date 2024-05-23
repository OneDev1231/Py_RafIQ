from django.contrib import admin

from .models import Chatbots,Documents,ChatbotView


admin.site.register(Documents)
admin.site.register(Chatbots)
admin.site.register(ChatbotView)