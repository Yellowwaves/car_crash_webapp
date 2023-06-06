$(document).ready(function () {
    $.get('php/dynamic_select.php', function (data) {
        $.each(data, function (idx, opt) {
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

