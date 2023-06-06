mapboxgl.accessToken = 'pk.eyJ1IjoiamVvZnVuIiwiYSI6ImNrd3huZXZjMzAwMWkycXFtb29zeDMxdnMifQ.N0SyKbZ6Br7bCL0IPmUZIg';

$(document).ready(function () {
            $.get('php/dynamic_select.php', function (data) {

                // Filtre 'ville
                var villeData = JSON.parse(data.ville); // Conversion de la chaîne JSON en un tableau d'objets
                $.each(villeData, function (idx, opt) {
                  $('#ville').append('<option value="' + opt.ville_nom + '">' + opt.ville_nom + '</option>');
                });

                // Filtre 'athmo'
                var athmoData = JSON.parse(data.athmo); // Conversion de la chaîne JSON en un tableau d'objets
                $.each(athmoData, function (idx, opt) {
                    $('#athmo').append('<option value="' + opt.id_athmo + '">' + opt.descr_athmo + '</option>');
                });
            
                // Filtre 'luminosite'
                var lumData = JSON.parse(data.lum); // Conversion de la chaîne JSON en un tableau d'objets
                $.each(lumData, function (idx, opt) {
                    $('#luminosite').append('<option value="' + opt.id_lum + '">' + opt.descr_lum + '</option>');
                });
            
                // Filtre 'etat_surf'
                var etatData = JSON.parse(data.etat_route); // Conversion de la chaîne JSON en un tableau d'objets
                $.each(etatData, function (idx, opt) {
                    $('#etat_surf').append('<option value="' + opt.id_etat_surf + '">' + opt.descr_etat_surf + '</option>');
                });
            
                // Filtre 'securite'
                var securiteData = JSON.parse(data.ceinture); // Conversion de la chaîne JSON en un tableau d'objets
                $.each(securiteData, function (idx, opt) {
                    $('#securite').append('<option value="' + opt.id_dispo_secu + '">' + opt.descr_dispo_secu + '</option>');
                });
            
                // Filtre 'cat_veh'
                var catVehData = JSON.parse(data.vehicule); // Conversion de la chaîne JSON en un tableau d'objets
                $.each(catVehData, function (idx, opt) {
                    $('#cat_veh').append('<option value="' + opt.id_cat_veh + '">' + opt.descr_cat_veh + '</option>');
                });
            
                // Filtre 'collision'
                var collisionData = JSON.parse(data.collision); // Conversion de la chaîne JSON en un tableau d'objets
                $.each(collisionData, function (idx, opt) {
                    $('#collision').append('<option value="' + opt.id_type_col + '">' + opt.descr_type_col + '</option>');
                });
            }, 'json');

    function filtrerAccidents() {
        var age = $('#age').val();
        var gravite = $('#gravite').val();
        var ville = $('#ville').val();
        var date = $('#date').val();
        var athmo = $('#athmo').val();
        var lum = $('#luminosite').val();  // Correction ici
        var etat_surf = $('#etat_surf').val();
        var securite = $('#securite').val();
        var cat_veh = $('#cat_veh').val();
        var collision = $('#collision').val();
        var limit = $('#limit').val();
        var bdd = $('#bdd').val();

    
        $.ajax({
            url: 'php/filtre.php',
            method: 'POST',
            data: { age: age, gravite: gravite, ville: ville, date: date, athmo: athmo, lum: lum, etat_surf: etat_surf, securite: securite, cat_veh: cat_veh, collision: collision, limit: limit, bdd: bdd},
            dataType: 'json',
            success: function (data) {
                console.log(data);
                initializeMap(data);
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    }

    $('#filterBtn').click(function() {
        filtrerAccidents();
    });
    filtrerAccidents();
});

function initializeMap(data) {
    var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v12',
projection: 'globe',
center: [2.349014, 48.864716], // Coordonnées du centre de la France (Paris)
zoom: 4, // Zoom initial pour voir la France entière
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

        map.addLayer({
            id: 'accidents',
            type: 'circle',
            source: 'accidents',
            paint: {
                'circle-color': 'red',
                'circle-radius': 5,
                'circle-stroke-width': 1,
                'circle-stroke-color': 'white'
            }
        });

        map.on('click', 'accidents', function (e) {
            var accident = e.features[0].properties;
            var popupContent = '<h4>Accident ID: ' + accident.acc_id + '</h4>' +
                '<p>Date/Heure: ' + accident.date + '</p>' +
                '<p>Latitude: ' + accident.latitude + '</p>' +
                '<p>Longitude: ' + accident.longitude + '</p>';
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
