
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, login, logout

from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from core.serializers import UserProfileSerializer, MeLoginSerializer


class UserProfileDetail(APIView):

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        serializer = UserProfileSerializer(request.user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()


class MeLogin(APIView):

    permission_classes = ()

    def post(self, request, format=None):
        serializer = MeLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exceptions=True):
            user = authenticate(username=serializer.data['email'], password=serializer.data['password'])
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return Response()
                else:
                    raise serializers.ValidationError('Please activate account.')
            else:
                raise serializers.ValidationError('Invalid login credentials. Try again.')


class MeLogout(APIView):

    def get(self, request, format=None):
        logout(request)
        return Response()