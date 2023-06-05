mapboxgl.accessToken = '...';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/dudanesk/ck9yhkakw2f3a1imzd1qpbs6a',
    center: [0, 20],
    zoom: 1.25,
});
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const athleteID = urlParams.get('athleteID');

$.ajax({
    url: "test.php",
    type: "POST",
    proccessData: false,

    dataType: "JSON",
    success: function (json) {
        map.on('load', function(){
            // Add a new source from our GeoJSON data 
            map.addSource('route', {
                type: 'geojson',
            data: json
            });

            // Create layer from source
            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': 'red',
                    'line-width': 2
                }
            });
        });
    },
    error: function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.statusText
        alert('Error - ' + errorMessage);
    },
});