from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required

from users.models import Profile
from .forms import AddEventForm

from .models import Event

"""
add event when user logined
"""


@login_required
def add_event(request):
    if request.method == 'POST':
        event_add_form = AddEventForm(request.POST)

        if event_add_form.is_valid():
            event_add_form.save()

            eventname = event_add_form.cleaned_data.get('event_name')
            event = Event.objects.get(event_name=eventname)
            event.submitter = request.user

            submitter_profile = Profile.objects.get(id=request.user.id)
            submitter_profile.points += 3

            submitter_profile.save()

            event.save()

            messages.success(request, 'Your event is added successfully')
            return redirect(to='event_list')
    else:
        event_add_form = AddEventForm(instance=request.user)
    return render(request, 'event/add_event.html', {'form': event_add_form})


@login_required
def event_list(request):
    event_list = Event.objects.all()

    return render(request, 'event/list_event.html', {'event_list': event_list})


@login_required
def event_attend(request, eid):
    event = Event.objects.get(id=eid)

    if event.event_participant is not None:
        messages.error(request, "Someone is already doing this event!")
        return redirect(to='event_list')


    participant = Profile.objects.get(id=request.user.id)
    event_submitter = event.submitter



    if event_submitter.id == participant.id:
        messages.error(request, "You can't addend event created by yourself!")
        return redirect(to='event_list')

    event.event_participant = participant

    participant.points += event.event_points

    participant.event = event

    event.save()
    participant.save()

    messages.success(request, 'Your attend event successfully')
    return redirect(to='event_list')


@login_required
def event_finish(request, eid):
    event = Event.objects.get(id=eid)

    if event.event_participant is None:
        messages.error(request, "Nobody attend this event!")
        return redirect(to='event_list')

    participant_id = event.event_participant.id

    if request.user.id != participant_id:
        messages.error(request, "You are not the event participant!")
        return redirect(to='event_list')

    Event.objects.filter(id=eid).delete()
    messages.success(request, 'You have finished this event!')
    return redirect(to='event_list')


@login_required
def event_remove(request, eid):
    event = Event.objects.get(id=eid)

    event_submitter_id = event.submitter.id

    if event_submitter_id != request.user.id:
        messages.error(request, "You are not the event submitter!")
        return redirect(to='event_list')

    Event.objects.filter(id=eid).delete()
    messages.success(request, 'You remove this event!')
    return redirect(to='event_list')
