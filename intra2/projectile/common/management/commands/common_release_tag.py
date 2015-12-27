from django.core.management.base import NoArgsCommand

from ...helpers import ReleaseTagManager


class Command(NoArgsCommand):
    help = "Sets release tag in cache"

    def handle_noargs(self, **options):
        ReleaseTagManager.set()
