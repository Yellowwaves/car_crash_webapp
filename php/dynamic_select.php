<?php

include("database.php");
$query = $pdo->prepare("select * FROM ville LIMIT 15");
$query->execute();
$resultats = $query->fetchAll(PDO::FETCH_ASSOC); 
$json = json_encode($resultats);
echo $json;

?>
