<?php

include("database.php");

function my_exec(string $command, array &$output = null, int &$result_code = null): string|false {
    // Construction de l'URL avec les paramètres

    $url = "http://etu124.projets.isen-ouest.fr/cgi/script_highlevel.py" . $command;
    
    // Exécution de la requête HTTP et récupération de la réponse
    $response = file_get_contents($url);
    
    // Vérification de la réponse
    if ($response === false) {
        $result_code = null;  // La requête a échoué, on définit le code de résultat à null
        return false;
    } else {
        $result_code = 0;  // La requête a réussi, on définit le code de résultat à 0
        $output = [$response];  // On assigne la réponse à la variable $output
        return $response;
    }
}

$id = $_POST['id_acc'];

$accident = $pdo->prepare("SELECT * FROM accident WHERE acc_id = $id");

$accident->execute();
$results = $accident->fetchAll(PDO::FETCH_ASSOC);

?>
