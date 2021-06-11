import json

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from authapp.models import User
from django.contrib.auth import get_user_model
from .views import ProjectModelViewSet
from .models import Project, ProjectUsers, Todo


class TestProjectViewSet(APITestCase):

    def test_create_admin(self):
        factory = APIRequestFactory()
        admin = User.objects.create_superuser(
            'admin', 'admin@admin.com', 'admin123456')

        request = factory.post(
            '/api/project/', {'name': 'Django',
                              'user_admin': User.objects.get(username='admin').id}, format='json')

        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        print(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        client = APIClient()
        User.objects.create_superuser(
            'admin', 'admin@admin.com', 'admin123456')
        client.login(username='admin', password='admin123456')

        project = Project.objects.create(
            name='Django', user_admin=User.objects.get(username='admin'))

        response = client.get(f'/api/project/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'Django')
        self.assertEqual(project.user_admin,
                         get_user_model().objects.get(username='admin'))
        client.logout()

    def test_get_admin(self):
        admin = User.objects.create_superuser('admin', 'admin@admin.com',
                                              'admin123456')
        self.client.login(username='admin', password='admin123456')

        project = Project.objects.create(
            name='Django', user_admin=User.objects.get(username='admin'))

        response = self.client.get(f'/api/project/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_mixer(self):
        admin = User.objects.create_superuser('admin', 'admin@admin.com',
                                              'admin123456')
        self.client.login(username='admin', password='admin123456')

        project = mixer.blend(Project)

        response = self.client.get(f'/api/project/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
