from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, permissions, generics, status
from .models import Work, Candidate, Apply, User, Employer, Comment,Rating
from .serializers import WorkSerializer, CandidateSerializer, ApplySerializer, UserSerializer, CreateCommentSerializer, WorkDetailSerializer,EmployerSerializer, RatingSerializer, CommentSerializer
from rest_framework.parsers import MultiPartParser



class WorkViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.RetrieveAPIView,generics.ListAPIView):
    queryset = Work.objects.filter(active=True)
    serializer_class = WorkDetailSerializer
    parser_classes = [MultiPartParser, ]


    # def get_permissions(self):
    #     if self.action == 'retrieve':
    #         return [permissions.IsAuthenticated()]
    #
    #     return [permissions.AllowAny()]


class CandidateViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.RetrieveAPIView,generics.ListAPIView):
    queryset = Candidate.objects.filter(active = True)
    serializer_class = CandidateSerializer



class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserSerializer
    parser_classes = [MultiPartParser, ]

    def get_permissions(self):
        if self.action == 'current_user':
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], url_path="current-user", detail=False)
    def current_user(self, request):
        return Response(self.serializer_class(request.user, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class EmployerViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.ListAPIView):
    queryset = Employer.objects.filter(active=True)
    serializer_class = EmployerSerializer

    @action(methods=['post'], detail=True,  url_path='addcomment')
    def add_comment(self, request, pk):
        content = request.data.get('content')
        if content:
            c = Comment.object.create(content=content, employer =self.get_object(), creator=request.user)
            return Response(CreateCommentSerializer(c, context={'request': request}).data, status= status.HTTP_201_CREATED)

        return  Response(status= status.HTTP_400_BAD_REQUEST)


    @action(methods=['post'], url_path='rating', detail=True)
    def rating(self, request, pk):
        employer = self.get_object()
        creator = request.user

        r, _ = Rating.objects.get_or_create(employer=employer, creator=creator )
        r.rate = request.data.get('rate', 0)
        try:
            r.save()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(data=RatingSerializer(employer, context={'request': request}).data,
                        status=status.HTTP_200_OK)


# class CommentViewSet(viewsets.ModelViewSet):
#     queryset = Comment.objects.filter(active=True)
#     serializer_class = CreateCommentSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.filter(active=True)
    serializer_class = CommentSerializer


class ApplyViewSet(viewsets.ModelViewSet):
    queryset = Apply.objects.filter(active=True)
    serializer_class = ApplySerializer