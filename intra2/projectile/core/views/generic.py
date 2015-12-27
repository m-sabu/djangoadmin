from django.shortcuts import render_to_response, get_object_or_404, redirect
from django.template import RequestContext, loader
from django.http import HttpResponseRedirect

from core.models import UserProfile
from core.utils import get_activation_token, extract_pk_from_activation_token
from core.forms import CustomSetPasswordForm


def index(request):
    return render_to_response('html/index.html', locals(), context_instance=RequestContext(request))


def activate(request, token):
    pk = extract_pk_from_activation_token(token)
    try:
        profile = UserProfile.objects.get(pk=pk)
        # Only pass activation if profile is not activated yet
        if not profile.is_active:
            if token == get_activation_token(profile):
                profile.is_active = True
                profile.save()
                # Set pk of profile to be picked up before settings password
                request.session['profile'] = {'pk': profile.pk}
                # Redirect to set password view
                return redirect('core.set_first_password')
            else:
                # Show error message that token is invalid
                context = {'message': 'The activation token is invalid!'}
        else:
            # Show error page that profile seems to have been activated already
            context = {'message': 'The profile has probably been activated already. Please contact support@avance.io'}
        return render_to_response('html/something_wrong.html', context, context_instance=RequestContext(request))
    except UserProfile.DoesNotExist, e:
        pass

    context = {'message': 'Invalid request.'}
    return render_to_response('html/something_wrong.html', locals(), context_instance=RequestContext(request))


def set_first_password(request):
    profile = get_object_or_404(UserProfile, pk=request.session['profile']['pk'])
    submit_phrase = _('Proceed')
    if profile:
        if request.method == 'POST':
            form = CustomSetPasswordForm(profile, request.POST.copy())
            if form.is_valid():
                form.save()
                # Redirect user to login state in Angular app
                return HttpResponseRedirect('/#/login')
            else:
                return render_to_response('html/activation/set_password.html', locals(), context_instance=RequestContext(request))

        form = CustomSetPasswordForm(profile)
        return render_to_response('html/activation/set_password.html', locals(), context_instance=RequestContext(request))

    # If no profile is found, show error message
    context = {'message': 'Invalid request.'}
    return render_to_response('html/something_wrong.html', context, context_instance=RequestContext(request))