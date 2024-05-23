from django.contrib import admin
from .models import *

admin.site.register(SubscriptionFeatures)
admin.site.register(SubscriptionPlans)
admin.site.register(Cards)
admin.site.register(StripeCustomer)
admin.site.register(StripeSetupIntent)
admin.site.register(PaymentsHistory)