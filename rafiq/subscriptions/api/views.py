from rest_framework.viewsets import ModelViewSet,ViewSet
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import TokenAuthentication
from django.http import HttpResponse
from .serializers import SubscriptionFeaturesSerializer,SubscriptionPlansSerializer,CardsSerializer
from ..models import SubscriptionFeatures,SubscriptionPlans,Cards,PaymentsHistory,StripeCustomer,StripeSetupIntent
from rafiq.core.helpers import StandardResultsSetPagination
from rafiq.users.api.serializers import PaymentsHistorySerializer

import stripe
from django.conf import settings
from django.db.models import Q
from ..helpers import getPaymentMethodDetails,createSetupIntentCustomer,createStripeCustomer,createMonthlySubscriptionCharge,renewSubscription
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rafiq.users.api.serializers import UserProfileSerializer
from rafiq.core.helpers import getPagination
from datetime import date

stripe.api_key = settings.STRIPE_SECRET_KEY

class SubscriptionFeaturesView(ModelViewSet):
    serializer_class = SubscriptionFeaturesSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = StandardResultsSetPagination
    queryset = SubscriptionFeatures.objects.all()

class PaymentsHistoryView(ModelViewSet):
    serializer_class = PaymentsHistorySerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = StandardResultsSetPagination
    queryset = PaymentsHistory.objects.all()
    
    def list(self, request, *args, **kwargs):
        _date = request.GET.get("date",date.today())
        queryset = self.queryset.filter(created_at__date=_date)
        return getPagination(queryset,request,self.serializer_class,True)
    
    @action(detail=False, methods=["get"], name="get all payment by user")
    def payments_by_me(self,request):
        queryset = self.queryset.filter(user=request.user)
        return getPagination(queryset,request,self.serializer_class,True)

class SubscriptionPlansView(ModelViewSet):
    serializer_class = SubscriptionPlansSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    pagination_class = StandardResultsSetPagination
    queryset = SubscriptionPlans.objects.all()
    
    @action(detail=False, methods=["post"], name="upgrade user subscription")
    def updgrade_subscription(self,request):
        user = request.user
        upgrade_plan_id = request.POST.get("plan-id", None)
        if upgrade_plan_id is None:
            data = {
                "status": "error",
                "message": "plan-id is required",
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        try:
            plan = SubscriptionPlans.objects.get(id=upgrade_plan_id)
        except:
            data = {
                "status": "error",
                "message": "invalid plan-id",
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        cards = Cards.objects.filter(user=user, active=True)
        if cards.count() == 0 and plan.title != "FREE":
            data = {
                "status": "ERROR",
                "message": "Please add a payment method before upgrade to subscription",
            }
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)

        response = createMonthlySubscriptionCharge(user, plan)
        serializer = UserProfileSerializer(user.userprofile)
        data = {
            "status": "OK",
            "message": "Subscription updated",
            "data": serializer.data,
        }
        return Response(data=data, status=status.HTTP_200_OK)

    
class SetupIntentStripeView(ViewSet):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
    """
    when ever user need to add a new card you want to create a new setup intent.
    each setup intent will represent new payment method
    """
    def list(self,request):
        user = request.user
        try:
            stipe_customer = StripeCustomer.objects.get(user=user)
        except:
            stipe_customer = createStripeCustomer(user)
        setup_intent = createSetupIntentCustomer(user)
        data = {
            "status": "OK",
            "setupIntent": setup_intent.intent_secret,
            "ephemeralKey": setup_intent.ephemeral_key,
            "customer": stipe_customer.stipe_customerId,
            "publish_key": settings.STRIPE_PUBLISHABLE_KEY,
        }
        return Response(data=data, status=status.HTTP_200_OK)

class PaymentMethodsView(ModelViewSet):
    queryset = Cards.objects.all()
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
    serializer_class=CardsSerializer
    
    def list(self, request, *args, **kwargs):
        user = request.user
        instance = self.queryset.filter(user=user).order_by("id").last()
        serializer = self.serializer_class(instance)
        data = {
            "status":"ok",
            "message":"successfull",
            "data":serializer.data
        }
        return Response(data=data, status=status.HTTP_200_OK)
    
    def destroy(self, request,pk, **kwargs):
        print("pk",pk)
        data = {
            "status":"ok",
            "message":"successfull"
        }
        return Response(data=data, status=status.HTTP_200_OK)
        

class StripeWebhookView(ViewSet):
    permission_classes = [AllowAny]
    """_stripe webhook when the user will create the setup intent and add a card on setup intent on stripe page.it will send the response for that setup intent for verification_
    Returns:
        200
    """
    def create(self,request):
        webhook_secret = settings.STRIPE_WEBHOOK_SECRET
        payload = request.body
        signature = request.headers.get("stripe-signature")
        event = None

        try:
            event = stripe.Webhook.construct_event(
                payload=payload, sig_header=signature, secret=webhook_secret
            )
        except ValueError as e:
            # Invalid payload
            return HttpResponse(status=400)

        if event.type == "setup_intent.succeeded":
            setup_intent = event.data.object
            instance = StripeSetupIntent.objects.get(
                setupIntent=setup_intent["id"],
                intent_secret=setup_intent["client_secret"],
            )
            instance.payment_method_id = setup_intent["payment_method"]
            instance.status = True
            instance.save()
            response = getPaymentMethodDetails(setup_intent["payment_method"])
            stripe_customer = StripeCustomer.objects.get(
                stipe_customerId=setup_intent["customer"]
            )
            card = Cards.objects.create(
                user=stripe_customer.user,
                last_4=response["card"]["last4"],
                exp_month=response["card"]["exp_month"],
                exp_year=response["card"]["exp_year"],
                payment_id=instance.payment_method_id,
                active=True,
            )
            subscription_id = (
                stripe_customer.user.userprofile.user_stripe_subscription_id
            )
            if subscription_id:
                stripe.Subscription.modify(
                    subscription_id, default_payment_method=card.payment_id
                )
            prev_card = Cards.objects.filter(
                Q(user=stripe_customer.user), ~Q(id=card.id), Q(active=True)
            )
            prev_card.update(active=False)
            return HttpResponse(status=200)
        elif event.type == "setup_intent.created":
            return HttpResponse(status=200)
        elif event.type == "payment_intent.created":
            return HttpResponse(status=200)
        elif event.type == "payment_intent.succeeded":
            return HttpResponse(status=200)
        elif event.type == "customer.deleted":
            return HttpResponse(status=200)
        elif event.type == "customer.subscription.created":
            return HttpResponse(status=200)
        elif event.type == "charge.succeeded":
            try:
                response = event.data.object
                invoice_id = response["invoice"]
                payment, created = PaymentsHistory.objects.get_or_create(
                    stripe_invoice_id=invoice_id
                )
                card = Cards.objects.get(payment_id=response["payment_method"])
                payment.card = card
                payment.user = card.user
                payment.stripe_receipt_link = response["receipt_url"]
                payment.amount = float(response["amount"]) / 100
                payment.payment_intent_id = response["payment_intent"]
                if response["status"] == "succeeded":
                    payment.status = True
                else:
                    payment.status = False
                payment.save()
                
                renewSubscription(payment.user,payment.user.userprofile.subscription_plan)
                return HttpResponse(status=200)
            except:
                return HttpResponse(status=400)
        elif event.type == "invoice.created":
            return HttpResponse(status=200)
        elif event.type == "invoice.paid":
            return HttpResponse(status=200)
        elif event.type == "invoice.paid":
            return HttpResponse(status=200)
        elif event.type == "invoice.payment_failed":
            try:
                response = event.data.object
                stripe_customer = StripeCustomer.objects.get(
                    stipe_customerId=response["customer"]
                )
                card = (
                    Cards.objects.filter(user=stripe_customer.user, active=True)
                    .order_by("id")
                    .last()
                )
                card.message = (
                    "Unable to charge your card please update your payment method."
                )
                card.save()
                return HttpResponse(status=200)
            except:
                return HttpResponse(status=400)
        else:
            print("Unhandled event type {}".format(event.type))

        return HttpResponse(status=200)
