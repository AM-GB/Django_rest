from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from authapp.views import UserModelViewSet
from todoapp.views import *
from rest_framework.authtoken import views


router = DefaultRouter()
router.register('user', UserModelViewSet)
router.register('todo', TodoModelViewSet)
router.register('project', ProjectModelViewSet)
router.register('project-users', ProjectUsersViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
]
