from ..models import SubscriptionPlans,SubscriptionFeatures,Cards,PaymentsHistory,StripeCustomer,StripeSetupIntent
from rest_framework import serializers

class SubscriptionFeaturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionFeatures
        fields = "__all__"

class SubscriptionPlansSerializer(serializers.ModelSerializer):
    features = SubscriptionFeaturesSerializer(read_only=True,many=False)
    class Meta:
        model = SubscriptionPlans
        fields = "__all__"

class CardsSerializer(serializers.ModelSerializer):
    features = SubscriptionFeaturesSerializer(read_only=True,many=False)
    class Meta:
        model = Cards
        fields = "__all__"



class StripeCustomerSerializer(serializers.ModelSerializer):
    features = SubscriptionFeaturesSerializer(read_only=True,many=False)
    class Meta:
        model = StripeCustomer
        fields = "__all__"

class StripeSetupIntentSerializer(serializers.ModelSerializer):
    features = SubscriptionFeaturesSerializer(read_only=True,many=False)
    class Meta:
        model = StripeSetupIntent
        fields = "__all__"