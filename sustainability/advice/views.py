# views.py
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from django.shortcuts import get_object_or_404
from .models import Advice
from .serializers import AdviceSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny
from braces.views import CsrfExemptMixin

class IncrementLikesAPIView(CsrfExemptMixin,APIView):
    authentication_classes = []  # Override the default authentication classes
    permission_classes = [AllowAny] # Override the default permission classes
    def post(self, request,*args, **kwargs):
        advice_text = request.data.get('text')
        if not advice_text:
            return Response({"message": "No text provided."}, status=400)
        advice = Advice.objects.filter(Q(text__icontains=advice_text) | Q(text__iexact=advice_text)).first()
        if advice:
            advice.increment_likes()
            return Response({"message": f"Likes for advice {advice.id} with text '{advice_text}' increased by 1."})
        else:
            return Response({"message": f"No advice found with text '{advice_text}'."}, status=404)

class LikeAdviceView(CsrfExemptMixin,APIView):
    authentication_classes = []  # Override the default authentication classes
    permission_classes = [AllowAny] # Override the default permission classes
    def post(self, request, *args, **kwargs):
        authentication_classes = []  # Empty list to override the default authentication classes
        permission_classes = [AllowAny]
        print('iAmhere')
        serializer = AdviceSerializer(data=request.data)
        if serializer.is_valid():
            text = serializer.validated_data['text']
            question = serializer.validated_data['question']
            advice, created = Advice.objects.get_or_create( text=text, question=question)
            if created:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"detail": "Advice already liked"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UnlikeAdviceView(CsrfExemptMixin,APIView):
    authentication_classes = []  # Override the default authentication classes
    permission_classes = [AllowAny] # Override the default permission classes
    def post(self, request, *args, **kwargs):
        permission_classes = [AllowAny]
        authentication_classes = []
        serializer = AdviceSerializer(data=request.data)
        if serializer.is_valid():
            text = serializer.validated_data['text']
            question = serializer.validated_data['question']
            advice = get_object_or_404(Advice,text=text, question=question)
            advice.delete()
            return Response({"detail": "Advice unliked"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListFavoriteAdvicesView(CsrfExemptMixin,APIView):
    authentication_classes = []  # Override the default authentication classes
    permission_classes = [AllowAny] # Override the default permission classes
    def get(self, request, *args, **kwargs):
        permission_classes = [AllowAny]
        authentication_classes = []
        advices = Advice.objects.all().order_by('-likes')
        serializer = AdviceSerializer(advices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
