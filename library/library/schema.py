from django.db import models
from django.db.models import fields
import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Project, ProjectUsers, Todo
from authapp.models import User


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ProjectUsersType(DjangoObjectType):
    class Meta:
        model = ProjectUsers
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)
    all_users = graphene.List(UserType)
    all_projets = graphene.List(ProjectType)
    all_project_users = graphene.List(ProjectUsersType)

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_project_users(root, info):
        return ProjectUsers.objects.all()


schema = graphene.Schema(query=Query)
