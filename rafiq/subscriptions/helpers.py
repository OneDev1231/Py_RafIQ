import stripe
from django.conf import settings
from .models import StripeCustomer,StripeSetupIntent,Cards
from datetime import datetime
from django_celery_beat.models import PeriodicTask
from django_celery_beat.models import CrontabSchedule
import json
from dateutil.relativedelta import relativedelta

stripe.api_key = settings.STRIPE_SECRET_KEY


def renewSubscription(user,plan):
    now = datetime.now()
    
    message_count = plan.features.messages_count
    chatbot_count = plan.features.custom_chatbot_count
    files_count = plan.features.files_count
    
    user.userprofile.subscription_start_date = now
    user.userprofile.subscription_renew_date = now + relativedelta(months=+1)
    
    user.userprofile.message_count = message_count
    user.userprofile.chatbot_count = chatbot_count
    user.userprofile.files_count = files_count
    

def createStripeCustomer(user):
    # check if the user is already a stripe customer
    try:
        stipe_customer = StripeCustomer.objects.get(user=user)
    except:
        # if the user is not a stripe customer it create him a new stripe customer
        response = stripe.Customer.create(email=user.email)
        stipe_customer = StripeCustomer.objects.create(
            user=user, stipe_customerId=response["id"]
        )
    return stipe_customer



def getPaymentMethodDetails(method_id):
    # get the payment method details for specific setup intent
    response = stripe.PaymentMethod.retrieve(method_id)
    return response


def createSetupIntentCustomer(user):
    # create a new setup intent to add a new card for customer.
    stripe_customer = StripeCustomer.objects.get(user=user)
    response = stripe.SetupIntent.create(
        payment_method_types=["card"], customer=stripe_customer.stipe_customerId
    )
    ephemeralKey = stripe.EphemeralKey.create(
        customer=stripe_customer.stipe_customerId,
        stripe_version="2022-08-01",
    )
    setup_intent_obj = StripeSetupIntent.objects.create(
        setupIntent=response["id"],
        intent_secret=response["client_secret"],
        ephemeral_key=ephemeralKey.secret,
    )
    stripe_customer.setup_intent.add(setup_intent_obj)
    stripe_customer.save()
    return setup_intent_obj

def createStripeSubcription(user, subscription_plan):
    if user.userprofile.user_stripe_subscription_id != None:
        deleteSubscription(user)
    card = Cards.objects.filter(user=user, active=True).order_by("id").last()
    customer = createStripeCustomer(user)
    response = stripe.Subscription.create(
        customer=customer.stipe_customerId,
        default_payment_method=card.payment_id,
        items=[
            {"price": subscription_plan.stripe_price_id},
        ],
    )
    
    renewSubscription(user,subscription_plan)

    user.userprofile.user_stripe_subscription_id = response.id
    
    user.userprofile.subscription_plan = subscription_plan
    user.userprofile.save()
    return True

def deleteSubscription(user):
    stripe.Subscription.delete(
        user.userprofile.user_stripe_subscription_id,
    )
    user.userprofile.user_stripe_subscription_id = None
    user.userprofile.save()
    
def createMonthlySubscriptionFree(user,plan):
    if user.userprofile.user_stripe_subscription_id != None:
        deleteSubscription(user)
    renewSubscription(user,plan)
    user.userprofile.subscription_plan = plan
    user.userprofile.save()
    return True


def createMonthlySubscriptionCharge(user, plan):
    if plan.title == "FREE":
        response = createMonthlySubscriptionFree(user,plan)
    else:
        response = createStripeSubcription(user, plan)
    return True