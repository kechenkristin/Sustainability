from django.urls import path
from .views import LikeAdviceView, UnlikeAdviceView, ListFavoriteAdvicesView

urlpatterns = [
    path('like_advice/', LikeAdviceView.as_view(), name='like_advice'),
    path('unlike_advice/', UnlikeAdviceView.as_view(), name='unlike_advice'),
    path('favorite_advices/', ListFavoriteAdvicesView.as_view(), name='favorite_advices'),
]