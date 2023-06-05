<?php
    $age_cond = $_POST['age_cond'];
    $date = ($_POST['date']);
    $ville = $_POST['ville'];
    $lat = $_POST['lat'];
    $lon = $_POST['lon'];
    $cond_ath = $_POST['cond_ath'];
    $cond_lum = $_POST['cond_lum'];
    $etat_surf = $_POST['etat_surf'];
    $dispo_secu = $_POST['dispo_secu'];
    //print des variables pour vérifier
    echo $age_cond;
    echo $date;
    echo $ville;
    echo $lat;
    echo $lon;
    echo $cond_ath;
    echo $cond_lum;
    echo $etat_surf;
    echo $dispo_secu;

    include("database.php");
    $nouvel_accident = $pdo->prepare("insert into tests (age_conducteur,date_heure,ville,latitude,longitude,conditions_atmospheriques,luminosite_scene,etat_route,etat_ceinture_secu) values (?,?,?,?,?,?,?,?,?)");
    $nouvel_accident->execute(array($age_cond,$date,$ville,$lat,$lon,$cond_ath,$cond_lum,$etat_surf,$dispo_secu));
    $resp['redirect'] = "index.html";
    echo json_encode($resp);
?>