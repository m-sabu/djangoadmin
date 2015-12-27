import logging
logger = logging.getLogger(__name__)

import re

from collections import Counter
from operator import itemgetter

from django.db import connection

from pprint import pformat


class LogSQLMiddleware:

    calls = Counter()
    queries = Counter()

    def process_response(self, request, response):
        """Log the SQL queries that the request ran"""
        logger.debug('SQL Queries for request {}:\n{}'.format(request.path, pformat(connection.queries)))
        logger.debug('Total SQL Queries for request {}: {}'.format(request.path, len(connection.queries)))
        self.calls[request.path] += 1
        self.queries[request.path] += len(connection.queries)
        averages = [(ep, self.queries[ep]/float(self.calls[ep]) if self.calls[ep] else 0.0) for ep in self.queries]
        averages.sort(key=itemgetter(1))
        logger.debug('Endpoint averages:\n{}'.format('\n'.join('{}: {}'.format(ep, avg) for ep, avg in averages)))
        return response