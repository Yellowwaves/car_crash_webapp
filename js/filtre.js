$.get('php/select.php', function (data) {
    $.each(data, function (idx, opt) {
        $('#ville').append('<option value="' + opt.nom_ville + '">' + opt.nom_ville + '</option>');
    });
}, 'json');
