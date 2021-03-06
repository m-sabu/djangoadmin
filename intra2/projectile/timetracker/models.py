from datetime import datetime, date
from decimal import Decimal

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils.translation import ugettext as _

from enumerify import fields

from .enums import InvoiceStatus, ItemStatus
from .helpers import get_expiration_date


class Invoice(models.Model):
    organisation = models.ForeignKey('core.Organisation', verbose_name=_('Organisation'),
                                     help_text=_('The organisation that is going to send the invoice.'))
    number = models.IntegerField(max_length=20, blank=True, verbose_name=_('Invoice No'))
    title = models.CharField(max_length=100, blank=True, verbose_name=_('Invoice Title'))
    client = models.ForeignKey('core.Organisation', verbose_name=_('Client'), related_name='invoiceclient_set',
                               help_text=_('The organisation that is going to receive the invoice.'))

    created_at = models.DateTimeField(verbose_name=_('Created At'), auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=_('Updated At'), auto_now=True)
    expired_at = models.DateTimeField(verbose_name=_('Expires At'), default=get_expiration_date)
    cleared_at = models.DateTimeField(verbose_name=_('Cleared At'), blank=True,
                                      help_text=_('When payment was received.'))

    reference = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=_('Reference'),
                                  help_text=_('The recipient of the invoice.'))
    status = fields.SelectIntegerField(blueprint=InvoiceStatus, default=InvoiceStatus.DRAFT, verbose_name=_('Status'))
    comment = models.TextField(verbose_name=_('Comment'), blank=True)

    def get_status(self):
        return InvoiceStatus.i18n[self.status]

    def get_timecards(self):
        return self.timecard_set.filter(status__in=[InvoiceStatus.DRAFT, InvoiceStatus.SENT, InvoiceStatus.PAID])

    def get_items(self):
        return self.itemrow_set.filter()

    def is_late(self):
        now = datetime.now()
        return now > self.expired_at and not self.status == InvoiceStatus.PAID


class Item(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.DecimalField(default=1, max_digits=19, decimal_places=3)
    vat = models.DecimalField(default=1, max_digits=10, decimal_places=3)
    status = fields.SelectIntegerField(blueprint=ItemStatus, default=ItemStatus.DEFAULT, verbose_name=_('Status'))

    def __unicode__(self):
        return self.title

    def get_status(self):
        return InvoiceStatus.i18n[self.status]


class ItemRow(models.Model):
    invoice = models.ForeignKey(Invoice)
    item = models.ForeignKey(Item)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(default=1, max_digits=19, decimal_places=3)

    def get_price(self):
        return self.price if self.price else self.item.price

    def get_row_total(self):
        return self.quantity * self.get_price()

    def get_row_total_with_vat(self):
        return self.get_row_total() * self.item.vat


class Project(models.Model):
    organisation = models.ForeignKey('core.Organisation')
    client = models.ForeignKey('core.Organisation', related_name='projectclient_set')
    title = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Rate(models.Model):
    """
    A <Rate> instance can only be created by an OrganisationUser.Admin
    As soon as someone is added to a project he/she gets a rate. When
    that person reports a timecard it is automatically assigned the
    latest existing rate.

    Usage
    latest_rate = request.user.rate_set.filter()[0]
    """
    project = models.ForeignKey(Project)
    profile = models.ForeignKey(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=100, blank=True, verbose_name=_())
    price = models.DecimalField(default=1, max_digits=19, decimal_places=3)
    vat = models.DecimalField(default=1, max_digits=19, decimal_places=3)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)


class TimeCard(models.Model):
    """
    There should be different serializers for admins and non-admin
    personnel. A great example is that a non-admin should not have
    rate or invoice in whatever serializer they are using.

    A logged in user with Admin credentials should have access to
    the whole enchilada.
    """
    profile = models.ForeignKey(settings.AUTH_USER_MODEL)

    session_start = models.DateTimeField()
    session_stop = models.DateTimeField()
    break_start = models.DateTimeField()
    break_stop = models.DateTimeField()
    internal_description = models.TextField(blank=True, help_text=_('Visible to project owner.'))
    external_description = models.TextField(blank=True, help_text=_('Visible to client.'))

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    rate = models.ForeignKey('project.Rate')
    project = models.ForeignKey('project.Project')
    invoice = models.ForeignKey(Invoice, null=True, blank=True, help_text=_('Only visible to Admins.'))
    is_hidden = models.BooleanField(default=False)

    # TODO:

    def __unicode__(self):
        return str(self.session_start)

    def get_break_duration(self):
        delta = self.break_stop - self.break_start
        return delta

    def had_break(self):
        return self.get_break_duration().seconds > 60

    def get_work_duration(self, decimal=False):
        if decimal:
            duration = self.get_work_duration()
            time = Decimal(str(duration.seconds / 3600))
        else:
            time = (self.session_stop - self.session_start) - (self.break_stop - self.break_start)
        return time

    def get_total_time(self):
        """ Returns a nicer string than get_work_duration """
        results = str(self.get_work_duration()).split(':')
        return "{}:{}".format(results[0], results[1])

    def get_value(self):
        duration = self.get_work_duration()
        time = Decimal(str(duration.seconds/3600))
        return time * self.rate.price

    def get_value_with_vat(self):
        total = Decimal(str(self.get_value() * self.rate.vat))
        return total

    def save(self, *args, **kwargs):
        if self.project:
            try:
                self.rate = self.profile.rate_set.filter(project=self.project)[0]
            except ObjectDoesNotExist as e:
                pass
        super(TimeCard, self).save(*args, **kwargs)


class Salary(models.Model):
    profile = models.ForeignKey(settings.AUTH_USER_MODEL)
    month = models.DateField()
    pay_day = models.DateField(null=True, blank=True)
    hours = models.FloatField(null=True, blank=True)
    gross_wage = models.FloatField(null=True, blank=True, verbose_name=_('Pre Tax Salary'))
    net_pay = models.FloatField(null=True, blank=True, verbose_name=_('Post Tax Salary'))
    payroll_tax = models.FloatField(null=True, blank=True)
    total_cost = models.FloatField(null=True, blank=True, verbose_name=_('Total Cost for Organisation'))

    def save(self):
        if self.gross_wage and self.payroll_tax:
            self.total_cost = self.gross_wage + self.payroll_tax
        super(Salary, self).save()

    def __unicode__(self):
        return "%s: %s-%s" % (self.user.username, self.month.year, self.month.month)

    def get_month(self):
        return self.month.month

    def get_year(self):
        return self.month.year

    def get_hourly_cost(self):
        return self.total_cost/self.hours if self.hours and self.total_cost else None
