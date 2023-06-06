<?php

include("database.php");
$query = $pdo->prepare("select ville_nom FROM ville ");
$query->execute();
$resultats = $query->fetchAll(PDO::FETCH_ASSOC); 
$json = json_encode($resultats);
echo $json;

?>
