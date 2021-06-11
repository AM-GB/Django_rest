from rest_framework.viewsets import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.mixins import *
from .models import User
from .serializers import UserModelSerializer, UserSerializer


class UserLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 2


class UserModelViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    # serializer_class = UserModelSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializer
        return UserSerializer
