# views.py
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Advice
from .serializers import AdviceSerializer


class LikeAdviceView(APIView):
    def post(self, request, *args, **kwargs):

        permission_classes = [IsAuthenticated]
        print('iAmhere')
        print(request.user.id)
        serializer = AdviceSerializer(data=request.data)
        if serializer.is_valid():
            text = serializer.validated_data['text']
            question = serializer.validated_data['question']
            advice, created = Advice.objects.get_or_create(user=request.user, text=text, question=question)
            if created:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"detail": "Advice already liked"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UnlikeAdviceView(APIView):
    def post(self, request, *args, **kwargs):
        permission_classes = [IsAuthenticated]
        serializer = AdviceSerializer(data=request.data)
        if serializer.is_valid():
            text = serializer.validated_data['text']
            question = serializer.validated_data['question']
            advice = get_object_or_404(Advice, user=request.user, text=text, question=question)
            advice.delete()
            return Response({"detail": "Advice unliked"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListFavoriteAdvicesView(APIView):
    def get(self, request, *args, **kwargs):
        permission_classes = [IsAuthenticated]
        advices = Advice.objects.filter(user=request.user)
        serializer = AdviceSerializer(advices, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)