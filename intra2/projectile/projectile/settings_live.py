from settings import *

DEBUG = False

ALLOWED_HOSTS = [
    'example.com',
    'staging.example.com',
    'test.example.com',
]

ADMINS = (
    ('Faisal', 'faisal@willandskill.se'),
    ('Erik', 'erik@willandskill.se'),
)

# Parse database configuration from environment variable DATABASE_URL
import dj_database_url
DATABASES = {'default': dj_database_url.config(default=os.environ['DATABASE_URL'])}

# SECURITY WARNING: keep the secret key used in production secret!
# The SECRET_KEY value should be set in /etc/environment
# Use the management command 'common_secret_key' in order to create a new one
SECRET_KEY = os.environ['SECRET_KEY']

APP_URL = os.environ.get('APP_URL', '')

STATIC_URL = '/static/'

STATIC_ROOT = '/home/django/staticfiles/'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            'datefmt': "%d/%b/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
        'core': {
            'handlers': ['console'],
            'propagate': True,
            'level': 'DEBUG',
        },
        'common': {
            'handlers': ['console'],
            'propagate': True,
            'level': 'DEBUG',
        },
    }
}


# EMAIL SETTINGS
EMAIL_USE_TLS = True
MANDRILL_API_KEY = os.environ.get('MANDRILL_APIKEY', '')
EMAIL_BACKEND = "djrill.mail.backends.djrill.DjrillBackend"
DEFAULT_FROM_EMAIL = 'WANDS <projectile@willandskill.se>'
SERVER_EMAIL = 'projectile@willandskill.se'
EMAIL_SUBJECT_PREFIX = '[PROJECTILE] '


# RAVEN
RAVEN_CONFIG = {
    'dsn': os.environ.get('RAVEN_DSN', ''),
}

INSTALLED_APPS = INSTALLED_APPS + (
    'raven.contrib.django.raven_compat',
)