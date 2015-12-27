from django.utils.translation import gettext as _

from enumerify.enum import Enum


class UserProfileStatus(Enum):
    INVITED = 0
    ACTIVE = 1
    REMOVED = 2

    i18n = (
        _('Invited'),
        _('Active'),
        _('Removed'),
    )


class OrganisationStatus(Enum):
    DEFAULT = 0
    REMOVED = 1

    i18n = (
        _('Default'),
        _('Removed'),
    )


class OrganisationKind(Enum):
    DEFAULT = 0

    i18n = (
        _('Default'),
    )


class OrganisationUserAccess(Enum):
    STAFF = 0
    MANAGER = 1
    ADMIN = 2

    i18n = (
        _('Staff'),
        _('Manager'),
        _('Admin'),
    )


class OrganisationUserStatus(Enum):
    ACTIVE = 0
    REMOVED = 1

    i18n = (
        _('Active'),
        _('Removed'),
    )
