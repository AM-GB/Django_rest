import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
from authapp.models import User
from django.contrib.auth import get_user_model
from .views import ProjectModelViewSet
from .models import Project, ProjectUsers, Todo


class TestProjectViewSet(TestCase):

    # def test_get_list(self):
    #     factory = APIRequestFactory()
    #     request = factory.get('/api/project/')
    #     view = ProjectModelViewSet.as_view({'get': 'list'})
    #     response = view(request)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_create_guest(self):
    #     factory = APIRequestFactory()
    #     request = factory.post(
    #         '/api/project/', {'name': 'Django', 'user_admin': 2}, format='json')
    #     view = ProjectModelViewSet.as_view({'post': 'create'})
    #     response = view(request)
    #     self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_create_admin(self):
    #     factory = APIRequestFactory()
    #     request = factory.post(
    #         '/api/project/', {'name': 'Django', 'user_admin': '2'}, format='json')
    #     print('+++++++++++++')
    #     print(request)
    #     print('+++++++++++++')
    #     admin = User.objects.create_superuser(
    #         'admin', 'admin@admin.com', 'admin123456')
    #     force_authenticate(request, admin)
    #     view = ProjectModelViewSet.as_view({'post': 'create'})
    #     response = view(request)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail(self):
        client = APIClient()
        User.objects.create_superuser(
            'admin', 'admin@admin.com', 'admin123456')
        client.login(username='admin', password='admin123456')

        project = Project.objects.create(
            name='Django', user_admin=User.objects.get(username='admin'))

        response = client.get(f'/api/project/{project.name}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, 'Django')
        self.assertEqual(project.user_admin,
                         get_user_model().objects.get(username='admin'))
        client.logout()

    # def test_edit_admin(self):
    #     # 6.
    #     project = Project.objects.create(
    #         name='Django', user_admin=get_user_model().objects.get(username='admin')
    #     client=APIClient()
    #     admin=User.objects.create_superuser(
    #         'admin', 'admin@admin.com', 'admin123456')
    #     client.login(username='admin', password='admin123456')
    #     response=client.put(
    #         f'/api/authors/{author.id}/', {'name': 'Грин', 'birthday_year': 1880})
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     author=Author.objects.get(id=author.id)
    #     self.assertEqual(author.name, 'Грин')
    #     self.assertEqual(author.birthday_year, 1880)
    #     client.logout()
