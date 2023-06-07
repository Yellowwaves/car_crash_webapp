$(document).ready(function () {
    $.ajax({
        url: 'php/authverify.php',
        method: 'POST',
        dataType: 'json',
        success: function(response) {
            if (response.status) {
                // Redirection vers index.html
                window.location.href = response.redirect;
            } else {
                // Le code à exécuter lorsque l'utilisateur est connecté
                confirm('Connecté');
            }
        },
        error: function(xhr, status, error) {
            console.log('Erreur AJAX : ' + error);
        }
    });
    $.get('php/dynamic_select.php', function (data) {
        var villeData = JSON.parse(data.ville); // Conversion de la chaîne JSON en un tableau d'objets
        $.each(villeData, function (idx, opt) {
          $('#ville').append('<option value="' + opt.id_code_insee + '">' + opt.ville_nom + '</option>');
        });
    }, 'json');

    $("#submit").on('click', function () {
        $.ajax({
            url: 'php/creation.php',
            type: "POST",
            data: $("#form").serialize(),
            success: function (result) {
                console.log(result);
                result = JSON.parse(result);
                location.href = result['redirect'];
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    });
});

