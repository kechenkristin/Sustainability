from django.urls import path
from .views import LikeAdviceView, UnlikeAdviceView, ListFavoriteAdvicesView,IncrementLikesAPIView
from django.http import JsonResponse
def test_view(request):
    return JsonResponse({"message": "Test View"})

urlpatterns = [
    path('like_advice/', LikeAdviceView.as_view(), name='like_advice'),
    path('unlike_advice/', UnlikeAdviceView.as_view(), name='unlike_advice'),
    path('favorite_advices/', ListFavoriteAdvicesView.as_view(), name='favorite_advices'),
    path('test/', test_view, name='test_view'),
    path('increase/',IncrementLikesAPIView.as_view(),name='increase'),
]