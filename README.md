[![logo](sustainability/map/static/map/logo.jpeg)](https://greenways.life)
Leave a lighter footprint
------

GreenWays is a platform aimed at promoting sustainable living and raising awareness about climate change. It enables users to connect with like-minded individuals, share ideas, track their eco-friendly actions, and participate in events to promote sustainability.


Features
* Chat Functionality: Connect with others and exchange ideas on living sustainably and taking eco-friendly actions.
* Profile Page & Admin System: Users can manage their own profiles, and administrators can manage user accounts.
* News Feed: Stay up-to-date with the latest worldwide climate change news.
* Leaderboard: Compete with others and track your progress by comparing scores based on eco-friendly actions and achievements.
* Events: Discover, create, and register for events focused on sustainability and eco-friendly activities.
* Eco-friendly Journey Map: Visualize the cost and carbon emissions of your journey to make better, greener choices.

Deployment
* Install Django and Dependencies (not provided)
* Generate a Google maps API key - maps will not work without it
* cd to frontend and run ```npm install && npm run build```
* cd to the folder with manage.py (sustainability)
* run ```python manage.py runserver```


Google Maps API
* Go to https://developers.google.com/maps
* Generate an API key
* Make a new file: Sustainability\sustainability\map\static\map\apikey.js
* In this file inlcude: ```const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY';```
* Done
