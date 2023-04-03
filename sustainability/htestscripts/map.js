// Replace with your own TomTom API key
const apiKey = '2idb5C6XrELWhTtFIV6ZFR4GYr6comcq';

// Initialize the map
const map = tt.map({
    key: apiKey,
    container: 'map',
    center: [0, 0],
    zoom: 2
});

// Initialize the search inputs and button
const startInput = document.getElementById('start-input');
const endInput = document.getElementById('end-input');
const submitBtn = document.getElementById('submit-btn');

// Initialize the services
const searchService = tt.services.search({ key: apiKey });
const routingService = tt.services.calculateRoute({ key: apiKey });

// Initialize the markers and route layer
const startMarker = new tt.Marker().setLngLat([0, 0]).addTo(map);
const endMarker = new tt.Marker().setLngLat([0, 0]).addTo(map);
const routeLayer = new tt.Layer({
    type: 'line',
    source: new tt.source.Vector(),
    layout: {},
    paint: {
        'line-color': '#1a73e8',
        'line-width': 5
    }
}).addTo(map);

// Function to update the route
function updateRoute(start, end) {
    routingService.query({
        locations: [start, end]
    }).then(response => {
        const geojson = response.toGeoJson();
        routeLayer.setSource(geojson);
        map.fitBounds(geojson.bbox, { padding: 50 });
    });
}

// Handle the submit button click
submitBtn.addEventListener('click', () => {
    const startPromise = searchService.query({ query: startInput.value });
    const endPromise = searchService.query({ query: endInput.value });

    Promise.all([startPromise, endPromise]).then(([startResponse, endResponse]) => {
        const startLocation = startResponse.results[0].position;
        const endLocation = endResponse.results[0].position;

        startMarker.setLngLat(startLocation);
        endMarker.setLngLat(endLocation);

        updateRoute(startLocation, endLocation);
    });
});
