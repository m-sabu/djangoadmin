from django.conf.urls import patterns, include, url
from django.contrib import admin


urlpatterns = patterns('',
    # Only for the logged in user
    url(r'^api/v1/me', include('core.urls.me')),
    url(r'^api/v1/organisations-users', include('core.urls.organisation_users')),

    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^api-token-auth/', 'rest_framework_jwt.views.obtain_jwt_token'),

    url(r'^api/docs/', include('rest_framework_swagger.urls')),

    url(r'^activate/set_password/$', 'core.views.generic.set_first_password', name='core.set_first_password'),
    url(r'^activate/(?P<token>[-\w]+)/$', 'core.views.generic.activate', name='core.activate'),

    url(r'^adminium/', include(admin.site.urls)),

    # Must come last, since it catches all other urls
    url(r'^$', 'core.views.generic.index'),
)