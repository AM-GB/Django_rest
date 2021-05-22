from rest_framework.viewsets import ModelViewSet
from todoapp.serializers import ProjectModelSerializer, TodoModelSerializer, ProjectUsersModelSerializer

from todoapp.models import Project, Todo, ProjectUsers


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer


class ProjectUsersViewSet(ModelViewSet):
    queryset = ProjectUsers.objects.all()
    serializer_class = ProjectUsersModelSerializer
