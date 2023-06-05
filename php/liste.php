<?php
    include("database.php");
    $accident = $pdo->prepare("select * from accident");
    $accident->execute();
    $results = $accident->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
    echo $json;
?>