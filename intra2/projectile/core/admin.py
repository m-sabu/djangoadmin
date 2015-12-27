
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _

from .models import UserProfile

# Register your models here.

from .models import UserProfile, Organisation, OrganisationUser
from .forms import UserProfileChangeForm, UserProfileCreationForm


class OrganisationUserInline(admin.TabularInline):
    model = OrganisationUser


class UserProfileAdmin(UserAdmin):
    # The forms to add and change user instances

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference the removed 'username' field
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Status'), {'fields': ('status',)}),
        (_('Regional'), {'fields': ('country', 'language')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
        ),
    )
    form = UserProfileChangeForm
    add_form = UserProfileCreationForm
    list_display = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'date_joined', 'last_login')
    list_filter = ('is_active', 'is_staff', 'date_joined', 'last_login')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('-date_joined',)
    inlines = (OrganisationUserInline,)


class OrganisationAdmin(admin.ModelAdmin):
    pass


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Organisation, OrganisationAdmin)
