import logging
logger = logging.getLogger(__name__)

import base64
import random

from datetime import datetime

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.db.models.signals import post_save
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from enumerify import fields

from .enums import UserProfileStatus, OrganisationKind, OrganisationStatus, OrganisationUserAccess, OrganisationUserStatus
from .lists import COUNTRIES
from .managers import UserProfileManager, OrganisationManager, OrganisationUserManager


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """
    A custom User model

    A fully featured User model with admin-compliant permissions that uses
    a full-length email field as the username.

    Email and password are required. Other fields are optional.

    A more descriptive tutorial can be found here
    http://www.caktusgroup.com/blog/2013/08/07/migrating-custom-user-model-django/
    """
    email = models.EmailField(unique=True, db_index=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_staff = models.BooleanField(_('staff status'), default=False,
        help_text=_('Designates whether the user can log into this admin site.'))
    is_active = models.BooleanField(_('active'), default=True,
        help_text=_('Whether this user should be treated as active. Unselect this instead of deleting accounts.'))
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)
    country = models.CharField(max_length=2, choices=COUNTRIES, default='se', db_index=True)
    language = models.CharField(max_length=2, default='sv')
    phone = models.CharField(max_length=20, default='', blank=True)
    has_newsletter = models.BooleanField(default=True)
    has_weekletter = models.BooleanField(default=True)
    status = fields.SelectIntegerField(blueprint=UserProfileStatus, default=UserProfileStatus.DEFAULT, db_index=True)

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = (,)

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __unicode__(self):
        return u"Email: {}".format(self.email)

    def get_full_name(self):
        """ Returns the full name """
        name = u"{} {}".format(self.first_name, self.last_name)
        return name.strip()

    def get_short_name(self):
        return u"{}".format(self.email)


class Organisation(models.Model):
    name = models.CharField(max_length=50, help_text=_('Can be Will & Skill AB, Interconnection Ltd and so on.'))
    organisation_no = models.CharField(max_length=30, blank=True, verbose_name=_('Organisation No.'),
                                       help_text=_('Organisation No. for registry and taxation and so on.'))
    identifier = models.CharField(max_length=50, default='', blank=True, db_index=True,
                                  help_text=_('For external ids from other systems or APIs.'))
    kind = fields.SelectIntegerField(blueprint=OrganisationKind, default=OrganisationKind.DEFAULT, db_index=True)
    address = models.TextField(blank=True, verbose_name=_('Address'))
    zip_area = models.CharField(max_length=30, blank=True, verbose_name=_('Zip Area'))
    zip_code = models.CharField(max_length=30, blank=True, verbose_name=_('Zip Code'))
    country = models.CharField(max_length=2, choices=COUNTRIES, default='se', db_index=True)
    status = fields.SelectIntegerField(blueprint=OrganisationStatus, default=OrganisationStatus.DEFAULT, db_index=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = OrganisationManager()

    class Meta:
        ordering = ('name',)

    def __unicode__(self):
        return u"{}".format(self.name)


class OrganisationUser(models.Model):
    """
    To keep track of <User> and <Organisation>
    Thus one <Organisation> can have many <User>s
    """
    organisation = models.ForeignKey(Organisation)
    profile = models.ForeignKey(settings.AUTH_USER_MODEL)
    access = fields.SelectIntegerField(blueprint=OrganisationUserAccess, default=OrganisationUserAccess.STAFF,
                                       db_index=True)
    status = fields.SelectIntegerField(blueprint=OrganisationUserStatus, default=OrganisationUserStatus.DEFAULT,
                                       db_index=True)
    is_current = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = OrganisationUserManager()

    class Meta:
        verbose_name_plural = 'Organisation Users'
        ordering = ('-created_at',)
        unique_together = ('organisation', 'profile')

    def make_active(self):
        organisation_users = self.profile.organisationuser_set
        # Set existing instances to is_current=False
        active_users = organisation_users.filter(is_current=True)
        if active_users.exists():
            active_users.update(is_current=False)

        fields = ['is_current']
        self.is_current = True
        if not self.status == OrganisationUserStatus.DEFAULT:
            self.status = OrganisationUserStatus.DEFAULT
            fields.append('status')

        self.save(update_fields=fields)

    def make_staff(self):
        self.access = OrganisationUserAccess.STAFF
        self.save(update_fields=['access'])

    def make_manager(self):
        self.access = OrganisationUserAccess.MANAGER
        self.save(update_fields=['access'])

    def make_admin(self):
        self.access = OrganisationUserAccess.ADMIN
        self.save(update_fields=['access'])

    def remove(self):
        self.status = OrganisationUserStatus.REMOVED
        self.save(update_fields=['status'])


class Descendant(models.Model):
    """
    To keep track of <Organisation>s and their sub <Organisation>s relationships.
    An <Organisation> can have 0 or n sub <Organisation>s
    """
    parent = models.ForeignKey(Organisation, related_name='descendant_set')
    child = models.ForeignKey(Organisation, related_name='parent_set')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)
        unique_together = ('parent', 'child')

    def __unicode__(self):
        return u"Child: {} of Parent: {}".format(self.child, self.parent)
