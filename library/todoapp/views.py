from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import LimitOffsetPagination
from todoapp.serializers import ProjectModelSerializer, TodoModelSerializer, ProjectUsersModelSerializer

from todoapp.models import Project, Todo, ProjectUsers


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    permission_classes = [IsAuthenticated]


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = TodoLimitOffsetPagination
    filterset_fields = ['add_date']
    permission_classes = [IsAuthenticated]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


class ProjectUsersViewSet(ModelViewSet):
    queryset = ProjectUsers.objects.all()
    serializer_class = ProjectUsersModelSerializer
    filterset_fields = ['project', 'user']
