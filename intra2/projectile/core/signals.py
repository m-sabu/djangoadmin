import logging
logger = logging.getLogger(__name__)

def send_activation_mail(sender, created, **kwargs):
    if created:
        logger.debug('Do something more good')
