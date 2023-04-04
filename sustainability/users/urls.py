from django.urls import path
from .views import home, profile_edit, RegisterView, profile, leaderboard, profile_id

from django.contrib.auth import views as auth_views

from users.forms import LoginForm
from users.views import CustomLoginView, ResetPasswordView, ChangePasswordView

urlpatterns = [

    path('register/', RegisterView.as_view(), name='users-register'),
    path('profile_edit/', profile_edit, name='users-profile-edit'),
    path('profile/', profile, name='users-profile'),

    path('login/',
         CustomLoginView.as_view(redirect_authenticated_user=True, template_name='users/login.html',
                                 authentication_form=LoginForm), name='login'),

    path('logout/', auth_views.LogoutView.as_view(template_name='index.html'), name='logout'),

    path('password-reset/', ResetPasswordView.as_view(), name='password_reset'),

    path('password-reset-confirm/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(template_name='users/password_reset_confirm.html'),
         name='password_reset_confirm'),

    path('password-reset-complete/',
         auth_views.PasswordResetCompleteView.as_view(template_name='users/password_reset_complete.html'),
         name='password_reset_complete'),

    path('password-change/', ChangePasswordView.as_view(), name='password_change'),

    path('leaderboard/', leaderboard, name='leaderboard'),

    path('<int:uid>/profile/', profile_id, name='users_profile_id'),
]
