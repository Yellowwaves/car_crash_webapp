<?php
include("database.php");

$age = isset($_POST['age']) ? $_POST['age'] : null;
$gravite = isset($_POST['gravite']) ? $_POST['gravite'] : null;
$ville = isset($_POST['ville']) ? $_POST['ville'] : null;
$date = isset($_POST['date']) ? $_POST['date'] : null;

if ($age) {
    list($age_start, $age_end) = explode('-', $age);
} else {
    $age_start = null;
    $age_end = null;
}


$accident = $pdo->prepare("SELECT accident.*, etat_route.descr_etat_surf, athmo.descr_athmo, lum.descr_lum, ceinture.descr_dispo_secu, collision.descr_type_col, vehicule.descr_cat_veh, ville.ville_nom
FROM accident
JOIN etat_route ON accident.id_etat_surf = etat_route.id_etat_surf
JOIN athmo ON accident.id_athmo = athmo.id_athmo
JOIN lum ON accident.id_lum = lum.id_lum
JOIN ceinture ON accident.id_dispo_secu = ceinture.id_dispo_secu
JOIN collision ON accident.id_type_col = collision.id_type_col
JOIN vehicule ON accident.id_cat_veh = vehicule.id_cat_veh
JOIN ville ON accident.id_code_insee = ville.id_code_insee
WHERE (:age IS NULL OR accident.age BETWEEN :age_start AND :age_end)
AND (:gravite IS NULL OR accident.id_grav = :gravite)
-- AND (:ville IS NULL OR ville.ville_nom = :ville)
LIMIT 100");

$accident->bindValue(':age', $age, PDO::PARAM_STR);
$accident->bindValue(':age_start', $age_start, PDO::PARAM_INT);
$accident->bindValue(':age_end', $age_end, PDO::PARAM_INT);
$accident->bindValue(':gravite', $gravite, PDO::PARAM_INT);
// $accident->bindValue(':ville', $ville, PDO::PARAM_STR);
// $accident->bindValue(':date', $date, PDO::PARAM_STR);

$accident->execute();
$results = $accident->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
echo $json;
?>