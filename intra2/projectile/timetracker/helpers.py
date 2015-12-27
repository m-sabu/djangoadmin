
from datetime import datetime, timedelta


def get_expiration_date():
    return datetime.now() + timedelta(days=30)

