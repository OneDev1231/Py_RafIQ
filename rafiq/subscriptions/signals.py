from django.db.models.signals import post_save,pre_save,post_delete
from django.dispatch import receiver
from .models import SubscriptionPlans
from django.conf import settings
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

def createStripeProduct(name):
    response = stripe.Product.create(name=name, active=True)
    return response


def createStripeProductPricing(instance):
    interval = "month"
    if instance.subscription_tenure == "MONTHLY":
        interval = "month"
    else:
        interval = "year"
    response = stripe.Price.create(
        unit_amount=int(instance.price * 100),
        currency="usd",
        recurring={"interval": interval},
        product=instance.stripe_product_id,
        active=True,
    )
    return response
    


@receiver(post_save, sender=SubscriptionPlans)
def create_stripe_product(sender, instance, created, **kwargs):
    if created:
        if instance.title != "FREE":
            product_response = createStripeProduct(instance.title)
            instance.stripe_product_id = product_response.id
            price_response = createStripeProductPricing(instance)
            instance.stripe_price_id = price_response.id
            instance.save()

@receiver(pre_save, sender=SubscriptionPlans)
def update_stripe_product(sender, instance, *args, **kwargs):
    if instance._state.adding:
        pass
    else:
        previous = SubscriptionPlans.objects.get(id=instance.id)
        if previous.price != instance.price:
            response = createStripeProductPricing(instance)
            modify_response = stripe.Price.modify(
                instance.stripe_price_id,
                active=False
            )
            instance.stripe_price_id = response.id