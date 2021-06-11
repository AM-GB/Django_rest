from django.contrib import admin
from django.urls import path, include
from django.urls.conf import re_path
from rest_framework.routers import DefaultRouter
from authapp.views import UserModelViewSet
from todoapp.views import *
from rest_framework.authtoken import views
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


router = DefaultRouter()
router.register('user', UserModelViewSet)
router.register('todo', TodoModelViewSet)
router.register('project', ProjectModelViewSet)
router.register('project-users', ProjectUsersViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="Library",
        default_version='0.1',
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    # path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/<str:version>/', include(router.urls)),
    path('swagger/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
    re_path('^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),
]
