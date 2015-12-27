import hashlib

from datetime import date

DELIMITER = "5b7886785f"


def get_activation_token(profile):
    """
    Returns a sha256 hexdigest string"
    """
    hashed = hashlib.sha256(str(profile.date_joined)).hexdigest()
    return "{}{}{}".format(profile.pk, DELIMITER, hashed[:40])


def extract_pk_from_activation_token(token):
    return token.split(DELIMITER)[0]