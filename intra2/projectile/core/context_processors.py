import os
import time

from django.conf import settings


def config(request):
    _dict = {
        'RELEASE_TAG': os.environ.get('RELEASE_TAG', int(time.time())),
        'APP_URL': settings.APP_URL,
        'COUNTRY': 'se',
        'LANGUAGE': 'sv'
    }
    return _dict