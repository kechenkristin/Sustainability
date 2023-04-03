from django.contrib.auth.decorators import login_required
from django.shortcuts import render
import requests


@login_required
def news_board(request):
    url = "https://climate-news-feed.p.rapidapi.com/page/1"

    querystring = {"limit": "10"}

    headers = {
        "X-RapidAPI-Key": "5632d5510fmsh11f48e26de7c88dp1a2719jsn6c6c56277791",
        "X-RapidAPI-Host": "climate-news-feed.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    data = response.json()
    articles = data['articles']

    context = {
        'articles': articles
    }

    return render(request, 'news/new_board.html', context)

