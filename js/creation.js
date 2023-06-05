
$(document).ready(function () {
$("#submit").on('click', function () {
    $.ajax({
        url: 'php/creation.php',
        type: "POST",
        data: $("#form").serialize(),
        success: function (result) {
            console.log(result);
            result = JSON.parse(result)
            location.href = result['redirect']
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    })
});
});
