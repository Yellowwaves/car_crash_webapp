<?php
include("database.php");

$accident = $pdo->prepare("SELECT * FROM accident_new LIMIT 10");
$accident->execute();
$results = $accident->fetchAll(PDO::FETCH_ASSOC);

// Construction du tableau des accidents
$accidents = [];
foreach ($results as $row) {
    $accidentData = [
        'acc_id' => $row['acc_id'],
        'latitude' => $row['latitude'],
        'longitude' => $row['longitude']
    ];
    $accidents[] = $accidentData;
}

// Conversion du tableau des accidents en chaîne JSON
$accidentsJSON = json_encode($accidents);
// Construction de la commande pour exécuter le script Python
$command = "/var/www/etu124/cgi/script_kmeans.py 'accidents=$accidentsJSON'";
// Exécution de la commande et récupération de la sortie
$output = shell_exec($command);
// Conversion de la sortie en tableau associatif
// $resultat = json_decode($output, true);

// Envoi de la réponse en tant que JSON
header('Content-Type: application/json');
echo $output;
//echo json_encode($response);

//$json = json_encode($results);
//echo $json;
?>
