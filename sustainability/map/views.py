from django.shortcuts import render

def map_view(request):
    return render(request, 'map/map.html')

from django.http import JsonResponse
import json

import sqlite3
import os

def update_database(request):
    if request.method == 'POST':
        try:
            # Load JSON data from request body
            data = json.loads(request.body)
            score_inc = data.get('score_increment', '')

            # Perform necessary database updates
            current_user = request.user
            db_path = 'db.sqlite3'

            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()

            # Get the ID of the current user based on their username
            query = f"SELECT id FROM auth_user WHERE username = '{current_user}'"
            cursor.execute(query)
            result = cursor.fetchone()
            if result is None:
                print(f"No user found with username {current_user}")
            else:
                user_id = result[0]

                # Update the user's score 1points
                query = f"UPDATE users_profile SET points = points + {score_inc} WHERE id = {user_id}"
                cursor.execute(query)

                # Commit the changes and close the connection
                conn.commit()
                conn.close()

            return JsonResponse({'status': 'success'})
        except Exception as e:
            print(f"Error updating database: {e}")
            return JsonResponse({'status': 'error'})
    else:
        return JsonResponse({'status': 'error'})

