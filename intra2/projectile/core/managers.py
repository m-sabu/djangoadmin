# -*- coding: utf-8 -*-

import logging
logger = logging.getLogger(__name__)

from datetime import date

from django.contrib.auth.models import BaseUserManager
from django.db import models
from django.db.models import Q, Sum
from django.utils import timezone

from .enums import OrganisationStatus, OrganisationUserStatus


class UserProfileManager(BaseUserManager):

    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        now = timezone.now()
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, is_staff=is_staff, is_active=True, is_superuser=is_superuser,
                          last_login=now, date_joined=now, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        return self._create_user(email, password, False, False, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, True, True, **extra_fields)


class OrganisationManager(models.Manager):

    def default(self):
        return self.get_queryset().filter(status=OrganisationStatus.DEFAULT)


class OrganisationUserManager(models.Manager):

    def active(self):
        return self.get_queryset().filter(status=OrganisationUserStatus.ACTIVE)
