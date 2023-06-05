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
                    '<td>' + item.acc_id + '</td>' +
                    '<td>' + item.date + '</td>' +
                    '<td>' + item.latitude + '</td>' +
                    '<td>' + item.longitude + '</td>' +
                    '<td>' + item.age + '</td>' +
                    '<td>' + item.id_athmo + '</td>' +
                    '<td>' + item.id_lum + '</td>' +
                    '<td>' + item.id_etat_surf + '</td>' +
                    '<td>' + item.id_dispo_secu + '</td>' +
                    '<td>' + item.id_grav + '</td>' +
                    '<td>' + item.id_cat_veh + '</td>' +
                    '<td>' + item.id_code_insee + '</td>' +
                    '<td>' + item.id_type_col + '</td>' +
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
