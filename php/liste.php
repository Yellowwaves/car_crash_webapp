<?php
include("database.php");

$accident = $pdo->prepare("SELECT accident.*, etat_route.descr_etat_surf, athmo.descr_athmo, lum.descr_lum, ceinture.descr_dispo_secu, collision.descr_type_col, vehicule.descr_cat_veh
FROM accident
JOIN etat_route ON accident.id_etat_surf = etat_route.id_etat_surf
JOIN athmo ON accident.id_athmo = athmo.id_athmo
JOIN lum ON accident.id_lum = lum.id_lum
JOIN ceinture ON accident.id_dispo_secu = ceinture.id_dispo_secu
JOIN collision ON accident.id_type_col = collision.id_type_col
JOIN vehicule ON accident.id_cat_veh = vehicule.id_cat_veh
limit 100
");

$accident->execute();
$results = $accident->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
echo $json;
?>