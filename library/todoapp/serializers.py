from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from todoapp.models import Project, Todo, ProjectUsers


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'


class ProjectUsersModelSerializer(ModelSerializer):
    class Meta:
        model = ProjectUsers
        fields = '__all__'
