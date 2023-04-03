from django.urls import path
from .views import home, profile_edit, RegisterView, profile

urlpatterns = [
    path('', home, name='users-home'),
    path('register/', RegisterView.as_view(), name='users-register'),
    path('profile_edit/', profile_edit, name='users-profile-edit'),
    path('profile/', profile, name='users-profile'),

]
