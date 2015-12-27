from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer

from .models import UserProfile


class UserProfileSerializer(ModelSerializer):

    class Meta:
        model = UserProfile
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'date_joined',
            'last_login',
        )
        read_only_fields = (
            'id',
            'date_joined',
            'last_login',
        )


class UserProfilePOSTSerializer(Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField(min_length=2, max_length=50)
    last_name = serializers.CharField(min_length=2, max_length=50)

    class Meta:
        fields = (
            'email',
            'first_name',
            'last_name',
            'access'
        )

    def create(self, validated_data):
        user = UserProfile(
            email=validated_data['email'].lower(),
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_active=False
        )
        user.save()
        return user


class UserProfilePublicSerializer(UserProfileSerializer):
    class Meta(UserProfileSerializer.Meta):
        model = UserProfile


class MeLoginSerializer(Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()