from ..models import Embedding,Testomonials,FAQ,FeatureVideo,ContactUs
from rest_framework import serializers


class EmbeddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Embedding
        fields = ("id","title")
        read_only_fields = ["id"]
        
    def create(self, validated_data):
        embedding_val = validated_data.pop("title",None)
        embedding = Embedding.objects.all().first()
        if embedding_val is None or embedding_val == "OPENAI":
            embedding.title = "OPENAI"
        elif embedding_val == "COHERE":
            embedding.title = "COHERE"
        embedding.save()
        return embedding
    
class TestomonialsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testomonials
        fields = "__all__"

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = "__all__"

class FeatureVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureVideo
        fields = "__all__"

class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = "__all__"
