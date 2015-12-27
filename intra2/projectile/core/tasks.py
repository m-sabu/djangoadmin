from __future__ import absolute_import

import logging
logger = logging.getLogger(__name__)

from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives

from celery import shared_task


@shared_task
def send_email(context, template, to_email, subject):
    html_body = render_to_string(template, context)
    msg = EmailMultiAlternatives(subject=subject, to=[to_email])
    msg.attach_alternative(html_body, "text/html")
    msg.send()
    logger.info(u"Email sent: Receiver: {}, Subject: {}".format(to_email, subject))