
// $(document).ready(function() {
//     $.get('php/dynamic_select.php', function (data) {
//         $.each(data, function (idx, opt) {
//             console.log("ok");
//             $('#ville').append('<option value="' + opt.ville_nom + '">' + opt.ville_nom + '</option>');
//         });
//     }, 'json');    
//     $.ajax({
//         url: 'php/liste.php',
//         type: 'GET',
//         dataType: 'json',
//         success: function(data) {
//             var tbody = $('#liste_accident tbody');
//             console.log("valide");
//             console.log(data);
//             $.each(data, function(index, item) {
//                 var row = '<tr>' +
//                     '<td>' + item.acc_id + '</td>' +
//                     '<td>' + item.date + '</td>' +
//                     '<td>' + item.latitude + '</td>' +
//                     '<td>' + item.longitude + '</td>' +
//                     '<td>' + item.age + '</td>' +
//                     '<td>' + item.descr_athmo + '</td>' +
//                     '<td>' + item.descr_lum + '</td>' +
//                     '<td>' + item.descr_etat_surf + '</td>' +
//                     '<td>' + item.descr_dispo_secu + '</td>' +
//                     '<td>' + item.id_grav + '</td>' +
//                     '<td>' + item.descr_cat_veh + '</td>' +
//                     '<td>' + item.id_code_insee + '</td>' +
//                     '<td>' + item.descr_type_col + '</td>' +
//                     '</tr>';
//                 tbody.append(row);
//             });
//         },
//         error : function(xhr, resp, text,data) {
//             console.log("fail");
//             console.log(xhr, resp, text);
//             console.log(data);
//         }
//     });
// }); 
$(document).ready(function() {   
$.get('php/dynamic_select.php', function (data) {
        $.each(data, function (idx, opt) {
            console.log("ok");
            $('#ville').append('<option value="' + opt.ville_nom + '">' + opt.ville_nom + '</option>');
        });
    }, 'json');
$('#filterBtn').click(function() {
        var age = $('#age').val();
        var gravite = $('#gravite').val();
        var ville = $('#ville').val();
        var date = $('#date').val();
    
        $.ajax({
          url: 'php/filtre.php',
          method: 'POST',
          data: { age: age, gravite: gravite, ville: ville, date: date },
        success: function (data) {
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
    })
});
});
