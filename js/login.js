$(document).ready(function () {
    $("#loginForm").submit(function (event) {
        event.preventDefault(); // Empêche le rechargement de la page

        var username = $("#username").val();
        var password = $("#password").val();

        // Envoyer la demande de connexion à votre script PHP
        $.ajax({
            url: "php/login.php", // Lien vers votre script PHP
            type: "POST",
            data: {
                username: username,
                password: password
            },
            dataType: "json",
            success: function (response) {
                if (response.status) {
                    // Rediriger vers la page de filtres en cas de succès
                    window.location.href = response.redirect;
                } else {
                    // Afficher un message d'erreur en cas d'échec de la connexion
                    alert("Identifiants incorrects. Veuillez réessayer.");
                }
            },
            error: function () {
                alert("Une erreur s'est produite. Veuillez réessayer.");
            }
        });
    });
});