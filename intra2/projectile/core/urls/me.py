from django.conf.urls import patterns, url

from ..views import private

urlpatterns = patterns('',
    url(r'^$', private.UserProfileDetail.as_view()),
    url(r'^/login$', private.MeLogin.as_view()),
    url(r'^/logout$', private.MeLogout.as_view()),
)