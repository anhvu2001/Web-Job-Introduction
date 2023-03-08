from django.contrib import admin
from django.urls import path, re_path, include
from . import views
from rest_framework import routers
from rest_framework.routers import DefaultRouter


router = routers.DefaultRouter()
router.register('work', views.WorkViewSet)
router.register('candidate', views.CandidateViewSet)
router.register('users', views.UserViewSet)
router.register('employer' , views.EmployerViewSet)
router.register('comment', views.CommentViewSet)
router.register('apply', views.ApplyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]