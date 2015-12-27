from calendar import monthrange
from datetime import datetime, date, timedelta

from isoweek import Week

from pytz import timezone

from django.conf import settings


def validate_week(week):
    if int(week) in range(1, 52 + 1):
        week = int(week)
    else:
        raise ValueError("Invalid week ({}). Must be between 1 and 52.".format(week))

    return week


def validate_month(month):
    if int(month) in range(1, 12 + 1):
        month = int(month)
    else:
        raise ValueError("Invalid month ({}). Must be between 1 and 12.".format(month))

    return month


def validate_year(year):
    now = datetime.now()
    if int(year) in range(1900, now.year + 1):
        year = int(year)
    else:
        raise ValueError("Invalid year ({}). Must be between 1900 and {}.".format(year, now.year))

    return year


def days_in_month(year, month):
    year = validate_year(year)
    month = validate_month(month)
    return monthrange(year, month)[1]


def get_weekly_range(year, week):
    """
    Returns tuple of first and last date of
    """
    w = Week(year, week)
    return w.monday(), w.sunday()


def get_monthly_range(year, month):
    """
    Returns tuple with first and last date of given month
    """
    days = days_in_month(year, month)
    return date(year, month, 1), date(year, month, days)


def get_yearly_range(year):
    """
    Returns tuple with first and last date of given year
    """
    return date(year, 1, 1), date(year, 12, 31)


def get_week(_date=None):
    """
    Return current week of today or of the date given
    """
    if _date is None:
        _date = date.today()
    return _date.isocalendar()[1]