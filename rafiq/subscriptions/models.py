from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

SUBSCRIPTION_TITLE = (
    ("FREE","FREE"),
    ("BASIC","BASIC"),
    ("PRO","PRO"),
    ("BUSINESS","BUSINESS"),
)
SUBSCRIPTION_TENURE = (
    ("MONTHLY","MONTHLY"),
    ("ANUAL","ANUAL"),
)

class SubscriptionFeatures(models.Model):
    messages_count = models.IntegerField(default=0)
    chat_gpt_plus = models.BooleanField(default=True)
    chat_gpt_plus_premium = models.BooleanField(default=False)
    custom_chatbot_count = models.IntegerField(default=0)
    add_files_or_link = models.BooleanField(default=True)
    files_count = models.IntegerField(default=0)
    webpages_count = models.IntegerField(default=100)
    pages_count = models.IntegerField(default=0)
    mb_count = models.IntegerField(default=0)
    share_link_with_anyone = models.BooleanField(default=False)
    embed_in_your_website = models.BooleanField(default=False)
    remove_rafiq_branding = models.BooleanField(default=False)
    languages = models.CharField(null=True,blank=True,max_length=100)
    email_support = models.BooleanField(default=False)
    chat_bot_access = models.CharField(null=True,blank=True,max_length=100)

class SubscriptionPlans(models.Model):
    title = models.CharField(max_length=500,choices=SUBSCRIPTION_TITLE,null=True, blank=True)
    description = models.TextField(max_length=1000, null=True, blank=True)
    features = models.ForeignKey(SubscriptionFeatures,on_delete=models.CASCADE,null=True,blank=True)
    subscription_tenure = models.CharField(max_length=500,choices=SUBSCRIPTION_TENURE,null=True, blank=True,default="MONTHLY")
    price = models.FloatField(null=True, blank=True)
    status = models.BooleanField(default=True)
    stripe_price_id = models.CharField(max_length=1000, null=True, blank=True)
    stripe_product_id = models.CharField(max_length=1000, null=True, blank=True)

    def __str__(self):
        return self.title
    
class StripeSetupIntent(models.Model):
    setupIntent = models.CharField(max_length=1000, null=True, blank=True)
    intent_secret = models.CharField(max_length=1000, null=True, blank=True)
    payment_method_id = models.CharField(max_length=1000, null=True, blank=True)
    ephemeral_key = models.CharField(max_length=1000, null=True, blank=True)
    status = models.BooleanField(default=False)


class Cards(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    last_4 = models.CharField(max_length=4, null=True, blank=True)
    exp_month = models.CharField(max_length=2, null=True, blank=True)
    exp_year = models.CharField(max_length=4, null=True, blank=True)
    payment_id = models.CharField(max_length=1000, null=True, blank=True)
    message = models.CharField(max_length=1000, default="")
    active = models.BooleanField(default=True)
    
class StripeCustomer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    stipe_customerId = models.CharField(max_length=1000, null=True, blank=True)
    setup_intent = models.ManyToManyField(
        StripeSetupIntent, related_name="setup_intent"
    )
        
class PaymentsHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    subscription = models.ForeignKey(
        SubscriptionPlans, on_delete=models.CASCADE, null=True, blank=True
    )
    card = models.ForeignKey(Cards, on_delete=models.CASCADE, null=True, blank=True)
    stripe_invoice_id = models.CharField(max_length=2000, null=True, blank=True)
    stripe_receipt_link = models.CharField(max_length=2000, null=True, blank=True)
    payment_intent_id = models.CharField(max_length=1000, null=True, blank=True)
    amount = models.FloatField(default=0.0)
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)