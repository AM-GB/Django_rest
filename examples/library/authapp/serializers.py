from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "first_name", "last_name", "email")


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("id", 'username', 'is_superuser', 'is_staff')
