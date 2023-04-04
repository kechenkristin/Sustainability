// Initialize the map
const map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 50.733218984142624, lng: -3.5352645494120023 },
  zoom: 15
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
function updateRoute(start, end, mode, infoElementId, renderer, co2Factor, costFactor) {
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

        // Set the route for the renderer
        renderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    }
  );
}




// Function to update the public transport route
function updatePublicTransportRoute(start, end, infoElementId, renderer) {
const transitMode = google.maps.TransitMode.TRAIN; // or use 'BUS' or 'SUBWAY' or 'TRAM'
const co2Factor = 55.9;

const request = {
  origins: [start],
  destinations: [end],
  travelMode: google.maps.TravelMode.TRANSIT,
  transitOptions: {
    modes: [transitMode],
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
          modes: [transitMode],
        },
      },
      (transitResponse, transitStatus) => {
        if (transitStatus === google.maps.DirectionsStatus.OK) {
          renderer.setDirections(transitResponse);
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

// Handle the submit button click
submitBtn.addEventListener('click', () => {
  const startLocation = startInput.value;
  const endLocation = endInput.value;
  
  updateRoute(startLocation, endLocation, google.maps.TravelMode.DRIVING, 'driving-info', drivingRenderer, 138, 0.34);
  updatePublicTransportRoute(startLocation, endLocation, 'public-transport-info', transitRenderer);
  updateRoute(startLocation, endLocation, google.maps.TravelMode.BICYCLING, 'cycling-info', bicyclingRenderer, 10, 0.01);
  updateRoute(startLocation, endLocation, google.maps.TravelMode.WALKING, 'walking-info', walkingRenderer, 5, 0);
  });