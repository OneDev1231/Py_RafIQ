from rest_framework.viewsets import ModelViewSet,ViewSet
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import TokenAuthentication
from .serializers import EmbeddingSerializer,TestomonialsSerializer,FAQSerializer,FeatureVideoSerializer,ContactUsSerializer
from ..models import Embedding,Testomonials,FAQ,FeatureVideo,ContactUs
from rest_framework.response import Response
from rest_framework import status
from rafiq.subscriptions.models import SubscriptionPlans
from rafiq.subscriptions.api.serializers import SubscriptionPlansSerializer
from django.middleware.csrf import get_token


class GetCsrfToken(ViewSet):
    permission_classes = [AllowAny]
    
    def list(self,request):
        return Response(data={'csrfToken': get_token(request)},status=status.HTTP_200_OK)

class EmbeddingView(ModelViewSet):
    serializer_class = EmbeddingSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = Embedding.objects.all()


class ContactUsView(ModelViewSet):
    serializer_class = ContactUsSerializer
    permission_classes = [AllowAny]
    queryset = ContactUs.objects.all()
    
class HomePageView(ViewSet):
    permission_classes = [AllowAny]
    
    def list(self, request):        
        testomonials = Testomonials.objects.all()
        faq = FAQ.objects.all()
        video = FeatureVideo.objects.all()
        subscriptions = SubscriptionPlans.objects.all().order_by("price")
        
        testomonials_serializer = TestomonialsSerializer(testomonials,many=True)
        faq_serializer = FAQSerializer(faq,many=True)
        feature_video_serializer = FeatureVideoSerializer(video,many=True)
        subscriptions_serializer = SubscriptionPlansSerializer(subscriptions,many=True)
        
        data = {
            "status":"ok",
            "message":"successfull",
            "testomonials":testomonials_serializer.data,
            "faq":faq_serializer.data,
            "feature_video":feature_video_serializer.data,
            "subscriptions":subscriptions_serializer.data
        }
        return Response(data=data,status=status.HTTP_200_OK)        
        
