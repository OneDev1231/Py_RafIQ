from rest_framework import serializers
from django.http import HttpRequest
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from allauth.account.forms import ResetPasswordForm
from rest_auth.serializers import PasswordResetSerializer
from allauth.account import app_settings as allauth_settings
from django.utils.translation import ugettext_lazy as _
from ..models import *
from rafiq.subscriptions.api.serializers import SubscriptionPlansSerializer,SubscriptionFeaturesSerializer
from rafiq.subscriptions.models import PaymentsHistory


class UserProfileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField("get_name",read_only=True)
    subscription_plan = SubscriptionPlansSerializer(read_only=True,many=False)
    email = serializers.EmailField(write_only=True,required=False)
    
    class Meta:
        model = UserProfile
        fields = "__all__"
        read_only_fields = ["id"]
    
    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address.")
                )
        return email

    def update(self, instance, validated_data):
        email = validated_data.pop("email",None)
        if email:
            print("email",email)
            instance.user.email = email
            instance.user.is_verified=False
            instance.user.save()
        return super().update(instance, validated_data)

    
    def get_name(self,obj):
        return obj.user.name

class UserSerializer(serializers.ModelSerializer):
    userprofile = UserProfileSerializer(read_only=True)
    total_transactions = serializers.SerializerMethodField("get_total_transactions")
    
    class Meta:
        model = User
        fields = ["id", "email", "name", "is_verified","userprofile","user_type","total_transactions"]
        read_only_fields=["userprofile"]
        
    def get_total_transactions(self,obj):
        try:
            count = PaymentsHistory.objects.filter(user=obj).count()
            return count
        except:
            return 0
        
class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "email", "password","user_type")
        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}},
            "user_type": {
                "required": True,
                "allow_blank": False,
            },
        }

    def _get_request(self):
        request = self.context.get("request")
        if (
            request
            and not isinstance(request, HttpRequest)
            and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address.")
                )
        return email

    def create(self, validated_data):
        user_type = validated_data.pop("user_type", None)
        password = validated_data.get("password")
        user = User(**validated_data)
        if user_type:
            if user_type == "ADMIN":
                user.is_staff = True
                user.is_superuser = True
            user.user_type = user_type.upper()
        else:
            user.user_type = "USER"
        user.set_password(password)
        user.save()
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()
        
        
class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""

    password_reset_form_class = ResetPasswordForm


class PaymentsHistorySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    features = SubscriptionFeaturesSerializer(read_only=True,many=False)
    class Meta:
        model = PaymentsHistory
        fields = "__all__"