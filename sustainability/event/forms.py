from django import forms

from .models import Event


class AddEventForm(forms.ModelForm):
    event_name = forms.CharField(max_length=100,
                                 required=True,
                                 widget=forms.TextInput(attrs={'class': 'form-control'}))

    event_points = forms.IntegerField(required=True,
                                      max_value=10,
                                      min_value=0,
                                      widget=forms.NumberInput(attrs={'class': 'form-control'}))

    event_date = forms.DateField(required=True,
                                 widget=forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}))

    event_description = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 5}))

    class Meta:
        model = Event
        fields = ['event_name', 'event_points', 'event_date', 'event_description']