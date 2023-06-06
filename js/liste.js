$(document).ready(function() {
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
                var tbody = $('#liste_accident tbody');
                tbody.empty(); // Effacer le contenu précédent de la table

                $.each(data, function(index, item) {
                    var row = '<tr>' +
                        '<td>' + item.acc_id + '</td>' +
                        '<td>' + item.date + '</td>' +
                        '<td>' + item.latitude + '</td>' +
                        '<td>' + item.longitude + '</td>' +
                        '<td>' + item.age + '</td>' +
                        '<td>' + item.descr_athmo + '</td>' +
                        '<td>' + item.descr_lum + '</td>' +
                        '<td>' + item.descr_etat_surf + '</td>' +
                        '<td>' + item.descr_dispo_secu + '</td>' +
                        '<td>' + item.id_grav + '</td>' +
                        '<td>' + item.descr_cat_veh + '</td>' +
                        '<td>' + item.ville_nom + '</td>' +
                        '<td>' + item.descr_type_col + '</td>' +
                        '</tr>';
                    tbody.append(row);
                });
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

