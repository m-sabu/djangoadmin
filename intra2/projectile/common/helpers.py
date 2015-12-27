# -*- coding: utf-8 -*-

import logging
logger = logging.getLogger(__name__)

import random
import time

from datetime import datetime

from django.conf import settings
from django.core.cache import cache


class ReleaseTagManager:

    cache_key = 'RELEASE_TAG'
    time_format = "%Y%m%d-%H%M%S"

    @staticmethod
    def set():
        now = datetime.now().strftime(ReleaseTagManager.time_format)
        cache.set(ReleaseTagManager.cache_key, now, 0)
        logger.info("Release tag was set to: {}".format(now))

    @staticmethod
    def get():
        cached = cache.get(ReleaseTagManager.cache_key)
        if cached:
            return cached
        now = datetime.now().strftime(ReleaseTagManager.time_format)
        return now


def get_release_tag():
    if settings.DEBUG:
        return str(int(time.time()))
    return ReleaseTagManager.get()


def get_secret_key():
    string_ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
    key_ = ''.join([random.SystemRandom().choice(string_) for i in range(50)])
    return key_
