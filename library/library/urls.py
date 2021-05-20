from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from authapp.views import UserModelViewSet
from todoapp.views import *


router = DefaultRouter()
router.register('user', UserModelViewSet)
router.register('todo', TodoModelViewSet)
router.register('project', ProjectModelViewSet)
router.register('project-users', ProjectUsersViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-author/', include('rest_framework.urls')),
]
