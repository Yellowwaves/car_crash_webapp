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

$formattedDate = null;

if ($date) {
    // Convertir la date au format DATETIME
    $formattedDate = date('Y-m-d', strtotime($date));
}

// Construction de la requête de base
$query = "SELECT accident.*, etat_route.descr_etat_surf, athmo.descr_athmo, lum.descr_lum, ceinture.descr_dispo_secu, collision.descr_type_col, vehicule.descr_cat_veh, ville.ville_nom
FROM accident
JOIN etat_route ON accident.id_etat_surf = etat_route.id_etat_surf
JOIN athmo ON accident.id_athmo = athmo.id_athmo
JOIN lum ON accident.id_lum = lum.id_lum
JOIN ceinture ON accident.id_dispo_secu = ceinture.id_dispo_secu
JOIN collision ON accident.id_type_col = collision.id_type_col
JOIN vehicule ON accident.id_cat_veh = vehicule.id_cat_veh
JOIN ville ON accident.id_code_insee = ville.id_code_insee";

// Construction de la clause WHERE dynamiquement
$where = [];
$params = [];

if ($age) {
    $where[] = "accident.age BETWEEN :age_start AND :age_end";
    $params[':age_start'] = $age_start;
    $params[':age_end'] = $age_end;
}

if ($gravite) {
    $where[] = "accident.id_grav = :gravite";
    $params[':gravite'] = $gravite;
}

if ($ville) {
    $where[] = "ville.ville_nom = :ville";
    $params[':ville'] = $ville;
}

if ($formattedDate) {
    $where[] = "DATE(accident.date) = :date";
    $params[':date'] = $formattedDate;
}

// Vérification si la clause WHERE est nécessaire
if (!empty($where)) {
    $query .= " WHERE " . implode(" AND ", $where);
}

$query .= " LIMIT 100";

// Préparation et exécution de la requête
$accident = $pdo->prepare($query);

foreach ($params as $param => $value) {
    $accident->bindValue($param, $value, PDO::PARAM_STR);
}

$accident->execute();
$results = $accident->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
echo $json;
?>