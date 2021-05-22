from rest_framework.viewsets import *
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.mixins import *
from .models import User
from .serializers import UserModelSerializer


class UserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 2


class UserModelViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    pagination_class = UserLimitOffsetPagination
