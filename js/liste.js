$(document).ready(function() {
    $.ajax({
        url: 'php/liste.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var tbody = $('#liste_accident tbody');
            console.log("valide");
            console.log(data);
            $.each(data, function(index, item) {
                var row = '<tr>' +
                    '<td>' + item.id + '</td>' +
                    '<td>' + item.age_conducteur + '</td>' +
                    '<td>' + item.date_heure + '</td>' +
                    '<td>' + item.latitude + '</td>' +
                    '<td>' + item.longitude + '</td>' +
                    '<td>' + item.conditions_atmospheriques + '</td>' +
                    '<td>' + item.luminosite_scene + '</td>' +
                    '<td>' + item.etat_route + '</td>' +
                    '<td>' + item.etat_ceinture_secu + '</td>' +
                    '<td>' + item.ville + '</td>' +
                    '</tr>';
                tbody.append(row);
            });
        },
        error : function(xhr, resp, text,data) {
            console.log("fail");
            console.log(xhr, resp, text);
            console.log(data);
        }
    });
});
