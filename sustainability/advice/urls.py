from django.urls import path
from .views import LikeAdviceView, UnlikeAdviceView, ListFavoriteAdvicesView,IncrementLikesAPIView

urlpatterns = [
    path('like_advice/', LikeAdviceView.as_view(), name='like_advice'),
    path('unlike_advice/', UnlikeAdviceView.as_view(), name='unlike_advice'),
    path('favorite_advices/', ListFavoriteAdvicesView.as_view(), name='favorite_advices'),
    path('increment_likes/', IncrementLikesAPIView.as_view(), name='increment_likes'),
]