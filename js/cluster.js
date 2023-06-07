mapboxgl.accessToken = 'pk.eyJ1IjoiamVvZnVuIiwiYSI6ImNrd3huZXZjMzAwMWkycXFtb29zeDMxdnMifQ.N0SyKbZ6Br7bCL0IPmUZIg';

$(document).ready(function () {
        $.ajax({
            url: 'php/cluster.php',
            method: 'POST',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                initializeMap(data);
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    });

    function initializeMap(data) {
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            projection: 'globe',
            center: [2.349014, 48.864716], // Coordonnées du centre de la France (Paris)
            zoom: 4 // Zoom initial pour voir la France entière
        });
    
        map.addControl(new mapboxgl.NavigationControl());
    
        map.on('load', function () {
            map.addSource('accidents', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: data.map(function (accident) {
                        return {
                            type: 'Feature',
                            properties: accident,
                            geometry: {
                                type: 'Point',
                                coordinates: [parseFloat(accident.longitude), parseFloat(accident.latitude)]
                            }
                        };
                    })
                }
            });
    
            var clusterColors = {
                0: 'red',
                1: 'blue',
                2: 'green',
                3: 'yellow',
                4: 'orange',
                5: 'purple',
                6: 'cyan',
                7: 'magenta',
                8: 'brown',
                9: 'pink',
                10: 'teal',
                11: 'lime',
                12: 'gray'
            };
    
            map.addLayer({
                id: 'accidents',
                type: 'circle',
                source: 'accidents',
                paint: {
                    'circle-color': [
                        'get',
                        ['to-string', ['get', 'cluster']], // Convertit en chaîne de caractères
                        ['literal', clusterColors]],
                    'circle-radius': 5,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': 'white'
                }
            });
    
            map.on('mouseenter', 'accidents', function (e) {
                var accident = e.features[0].properties;
                var popupContent = '<h4>Accident ID: ' + accident.acc_id + '</h4>' +
                    '<p>Latitude: ' + accident.latitude + '</p>' +
                    '<p>Longitude: ' + accident.longitude + '</p>' +
                    '<p>Cluster: ' + accident.cluster + '</p>';
                var popup = new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML(popupContent)
                    .addTo(map);
            });
            
    
            map.on('mouseenter', 'accidents', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
    
            map.on('mouseleave', 'accidents', function () {
                map.getCanvas().style.cursor = '';
            });
        });
    }
