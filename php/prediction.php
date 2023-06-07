<?php
include("database.php");

$accident = $pdo->prepare("SELECT * FROM accident LIMIT 10");

$accident->execute();
$results = $accident->fetchAll(PDO::FETCH_ASSOC);

// Récupération des données envoyées depuis le formulaire
// $age = $_POST['age'];
// $athmo = $_POST['athmo'];
// $lum = $_POST['luminosite'];
// $etat_surf = $_POST['etat_surf'];
// $securite = $_POST['securite'];
// $cat_veh = $_POST['cat_veh'];
// $longitude = $_POST['longitude'];
// $latitude = $_POST['latitude'];

$age = 1;
$athmo = 1;
$lum = 1;
$etat_surf = 1;
$securite = 1;
$cat_veh = 1;
$longitude = -0.633333;
$latitude = 43.6167;

// Construction de la commande pour exécuter le script Python
$command = "/var/www/etu124/cgi/script_knn.py \"descr_lum=$lum&descr_cat_veh=$cat_veh&latitude=$latitude&longitude=$longitude&descr_athmo=$athmo&descr_etat_surf=$etat_surf&descr_dispo_secu=$securite&age=$age\"";
//echo $command;
// Exécution de la commande et récupération de la sortie
$output = shell_exec($command);
// Conversion de la sortie en tableau associatif
$resultat = json_decode($output, true);

// Envoi de la réponse en tant que JSON
header('Content-Type: application/json');
echo $output;
//echo json_encode($response);

//$json = json_encode($results);
//echo $json;
?>
