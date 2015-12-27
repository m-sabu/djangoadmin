# -*- coding: utf-8 -*-

import logging
logger = logging.getLogger(__name__)

from django.contrib.sites.models import Site

from .utils import get_activation_token
from .tasks import send_email


def send_activation_mail(profile):
    context = {
        'profile': profile,
        'link': "{}/activate/{}/".format(Site.objects.get_current().domain, get_activation_token(profile))
    }
    logger.debug(context)
    send_email.delay(context, 'email/activation_sv.html', profile.email, _('Please activate your account'))
    logger.info("Mail sent To: {}".format(profile.email))
