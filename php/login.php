<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Connexion à la base de données
    include("database.php");

    // Requête préparée pour sélectionner l'utilisateur par nom d'utilisateur
    $statement = $pdo->prepare("SELECT * FROM utilisateur WHERE username = :username LIMIT 1");
    $statement->bindParam(":username", $username);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);

    // Vérification du mot de passe
    if ($result && $result["password"] === md5($password)) {
        $_SESSION["username"] = $result["username"];
        $response["redirect"] = "creation.html";
        $response["status"] = true;
        $response["session"] = $_SESSION["username"];
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = false;
        echo json_encode($response);
        exit;
    }
}
?>