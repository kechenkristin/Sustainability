from django.urls import path
from . import views

urlpatterns = [
    path('board', views.news_board, name='news_board'),
]