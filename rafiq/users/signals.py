from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .helpers import sendOtpEmail
from .models import User, UserProfile
from rafiq.subscriptions.models import SubscriptionPlans
from datetime import date
from rafiq.subscriptions.helpers import createStripeCustomer
from datetime import datetime
from dateutil.relativedelta import relativedelta

@receiver(post_save, sender=User)
def user_verification_send_otp(sender, instance, created, **kwargs):
    if created:
        sendOtpEmail(instance)
        createStripeCustomer(instance)
        try:
            subscription = SubscriptionPlans.objects.get(title="FREE")
            now = datetime.now()
            renew_date = now + relativedelta(months=+1)
            message_count = subscription.features.messages_count
            chatbot_count = subscription.features.custom_chatbot_count
            files_count = subscription.features.files_count
            UserProfile.objects.get_or_create(user=instance,subscription_plan=subscription,subscription_start_date=now,subscription_renew_date=renew_date,message_count=message_count,chatbot_count=chatbot_count,files_count=files_count)
        except:
            UserProfile.objects.get_or_create(user=instance)
            
        
    

@receiver(post_delete, sender=UserProfile)
def user_delete(sender, instance, **kwargs):
    try:
        user = instance.user
        user.delete()
    except:
        pass
