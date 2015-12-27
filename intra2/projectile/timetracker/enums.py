from django.utils.translation import gettext as _

from enumerify.enum import Enum


class InvoiceStatus(Enum):
    DRAFT = 0
    SENT = 1
    PAID = 2
    HIDDEN = 3
    REMOVED = 4

    i18n = (
        _('Draft'),
        _('Sent'),
        _('Paid'),
        _('Hidden'),
        _('Removed'),
    )


class ItemStatus(Enum):
    DEFAULT = 0
    HIDDEN = 1
    REMOVED = 2

    i18n = (
        _('Default'),
        _('Hidden'),
        _('Removed'),
    )