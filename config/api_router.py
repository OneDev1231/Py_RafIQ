from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter
from rafiq.users.api.views import (
    UserViewSet,
    SignupViewSet,
    LoginViewSet,
    verifyOtpView,
    sendOtpView,
    resetEmailView,
    resetPasswordView,
    userProfileView,
    deleteUserView,
)
from rafiq.subscriptions.api.views import (
    SubscriptionFeaturesView,
    SubscriptionPlansView,
    SetupIntentStripeView,
    PaymentMethodsView,
    StripeWebhookView,
    PaymentsHistoryView
)
from rafiq.core.api.views import (
    EmbeddingView,
    HomePageView,
    ContactUsView,
    GetCsrfToken
)
from rafiq.analytics.api.views import (
    ChatBotAnalytics,
    AdminAnalytics
)

from rafiq.chatbots.api.views import (
    DocumentsView,
    ChatbotsView,
    MessagesView,
    ConversationView,
    SavedChatBotsView,
    GptMessagesView,
    GptConversationView
)

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("verify-otp", verifyOtpView, basename="verify-otp")
router.register("send-otp", sendOtpView, basename="send-otp")
router.register("reset-email", resetEmailView, basename="reset-email")
router.register("reset-password", resetPasswordView, basename="reset-password")
router.register("user-profile", userProfileView, basename="user-profile")
router.register("delete-user", deleteUserView, basename="delete-user")
router.register("subscription-features", SubscriptionFeaturesView, basename="subscription-features")
router.register("subscription-plans", SubscriptionPlansView, basename="subscription-plans")
router.register("subscription-plans", SubscriptionPlansView, basename="subscription-plans")
router.register("embedding", EmbeddingView, basename="embedding")
router.register("chatbot-document", DocumentsView, basename="chatbot-document")
router.register("chatbot", ChatbotsView, basename="chatbot")
router.register("message", MessagesView, basename="message")
router.register("chat", ConversationView, basename="chat")
router.register("home-page", HomePageView, basename="home-page")
router.register("setup-intent", SetupIntentStripeView, basename="setup-intent")
router.register("payment-methods", PaymentMethodsView, basename="payment-methods")
router.register("stripe_webhook", StripeWebhookView, basename="stripe_webhook")
router.register("saved-bot", SavedChatBotsView, basename="saved-bot")
router.register("bot-analytics", ChatBotAnalytics, basename="bot-analytics")
router.register("admin-analytics", AdminAnalytics, basename="admin-analytics")
router.register("gpt-messages", GptMessagesView, basename="gpt-messages")
router.register("gpt-chat", GptConversationView, basename="gpt-chat")
router.register("contact-us", ContactUsView, basename="contact-us")
router.register("payment-history", PaymentsHistoryView, basename="payment-history")
router.register("get-token", GetCsrfToken, basename="get-token")


app_name = "api"
urlpatterns = router.urls
