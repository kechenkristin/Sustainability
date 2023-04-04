// Initialize the map
const map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 50.725948447673765, lng: -3.5273826065394425 }, 
  zoom: 15,
  mapTypeId: 'hybrid',
});

// lat: 50.733218984142624, lng: -3.5352645494120023

// Initialize the search inputs and button
const startInput = document.getElementById('start-input');
const endInput = document.getElementById('end-input');
const submitBtn = document.getElementById('submit-btn');

// Initialize the autocomplete feature for the input fields
const startAutocomplete = new google.maps.places.Autocomplete(startInput);
const endAutocomplete = new google.maps.places.Autocomplete(endInput);

// Initialize the directions service
const directionsService = new google.maps.DirectionsService();

// Initialize the directions renderers for each mode
const drivingRenderer = new google.maps.DirectionsRenderer({map: map, suppressMarkers: true});
const transitRenderer = new google.maps.DirectionsRenderer({map: map, suppressMarkers: true});
const bicyclingRenderer = new google.maps.DirectionsRenderer({map: map, suppressMarkers: true});
const walkingRenderer = new google.maps.DirectionsRenderer({map: map, suppressMarkers: true});

// Function to update the route
function updateRoute(start, end, mode, infoElementId, renderer, co2Factor, costFactor, googleMapsLinkElementId) {
  directionsService.route(
    {
      origin: start,
      destination: end,
      travelMode: mode
    },
    (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        const route = response.routes[0].legs[0];
        const distance = route.distance.text;
        const distanceInKm = parseFloat(distance.replace(',', '').split(' ')[0]);
        const duration = route.duration.text;

        // Calculate CO2 emissions
        const co2Emissions = Math.round(distanceInKm * co2Factor);

        // Calculate cost of the trip
        const cost = mode === google.maps.TravelMode.WALKING ? '<strong>FREE</strong>' : `£${(distanceInKm * costFactor).toFixed(2)}`;

        const infoElement = document.getElementById(infoElementId);
        infoElement.innerHTML = `<strong>${mode}</strong><br>Distance: ${distance}<br>Duration: ${duration}<br>CO2 Emitted: ${co2Emissions} grams<br> Cost of trip: ${cost}`;
    // Create the Google Maps link
    const googleMapsLinkElement = document.getElementById(googleMapsLinkElementId);
  const googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(start)}&destination=${encodeURIComponent(end)}&travelmode=${mode.toLowerCase()}`;
  googleMapsLinkElement.innerHTML = `<a href="${googleMapsLink}" target="_blank" onclick="updateDatabase()">Open in Google Maps</a>`;


    // Set the route for the renderer
    renderer.setDirections(response);
  } else {
    window.alert('Directions request failed due to ' + status);
  }
}
);
}




// Function to update the public transport route
// Function to update the public transport route
function updatePublicTransportRoute(start, end, infoElementId, renderer, googleMapsLinkElementId) {
  const co2Factor = 55.9;

  const request = {
    origins: [start],
    destinations: [end],
    travelMode: google.maps.TravelMode.TRANSIT,
    transitOptions: {
      modes: [google.maps.TransitMode.BUS, google.maps.TransitMode.SUBWAY, google.maps.TransitMode.TRAIN, google.maps.TransitMode.TRAM],
    },
    unitSystem: google.maps.UnitSystem.METRIC,
  };

  const matrixService = new google.maps.DistanceMatrixService();
  matrixService.getDistanceMatrix(request, (response, status) => {
    if (status === google.maps.DistanceMatrixStatus.OK) {
      const results = response.rows[0].elements;
      const distance = results[0].distance.text;
      const distanceInKm = parseFloat(distance.replace(',', '').split(' ')[0]);
      const duration = results[0].duration.text;

      // Calculate CO2 emissions
      const co2Emissions = Math.round(distanceInKm * co2Factor);
      const moneySaved = 2;

      const infoElement = document.getElementById(infoElementId);
      infoElement.innerHTML = `<strong>Public Transport</strong><br>Distance: ${distance}<br>Duration: ${duration}<br>CO2 Emitted: ${co2Emissions} grams<br> Cost of trip: £${moneySaved}`;

      directionsService.route(
        {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode.TRANSIT,
          transitOptions: {
            modes: [google.maps.TransitMode.BUS, google.maps.TransitMode.SUBWAY, google.maps.TransitMode.TRAIN, google.maps.TransitMode.TRAM],
          },
        },
        (transitResponse, transitStatus) => {
          if (transitStatus === google.maps.DirectionsStatus.OK) {
            renderer.setDirections(transitResponse);
            // Create the Google Maps link
            const googleMapsLinkElement = document.getElementById(googleMapsLinkElementId);
            const googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(start)}&destination=${encodeURIComponent(end)}&travelmode=${google.maps.TravelMode.TRANSIT}&dirflg=r`;
            googleMapsLinkElement.innerHTML = `<a href="${googleMapsLink}" target="_blank" onclick="updateDatabase()">Open in Google Maps</a>`;

          } else {
            window.alert('Transit directions request failed due to ' + transitStatus);
          }
        }
      );
    } else {
      window.alert('Distance Matrix request failed due to ' + status);
    }
  });
}

function updateDatabase() {
  const csrftoken = getCookie('csrftoken');

  // Add data to send to the server
  const data = {
    some_field: "some_value"
  };

  fetch('update_database/', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    // Convert data object to JSON string
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to update database');
      }
    })
    .then((json) => {
      if (json.status === 'success') {
        console.log('Database updated successfully');
      } else {
        console.log('Failed to update database');
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}



// Get CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Add event listeners to Google Maps links
const drivingMapsLinkElement = document.getElementById('driving-maps-link');
const publicTransportMapsLinkElement = document.getElementById('public-transport-maps-link');
const cyclingMapsLinkElement = document.getElementById('cycling-maps-link');
const walkingMapsLinkElement = document.getElementById('walking-maps-link');

drivingMapsLinkElement.addEventListener('click', updateDatabase);
publicTransportMapsLinkElement.addEventListener('click', updateDatabase);
cyclingMapsLinkElement.addEventListener('click', updateDatabase);
walkingMapsLinkElement.addEventListener('click', updateDatabase);


// Handle the submit button click
submitBtn.addEventListener('click', () => {
  const startLocation = startInput.value;
  const endLocation = endInput.value;

  updateRoute(startLocation, endLocation, google.maps.TravelMode.DRIVING, 'driving-info', drivingRenderer, 138, 0.34, 'driving-maps-link');
  updatePublicTransportRoute(startLocation, endLocation, 'public-transport-info', transitRenderer, 'public-transport-maps-link');
  updateRoute(startLocation, endLocation, google.maps.TravelMode.BICYCLING, 'cycling-info', bicyclingRenderer, 10, 0.01, 'cycling-maps-link');
  updateRoute(startLocation, endLocation, google.maps.TravelMode.WALKING, 'walking-info', walkingRenderer, 5, 0, 'walking-maps-link');
  });