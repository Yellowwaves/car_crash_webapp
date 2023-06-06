<?php
include("database.php");

$age = isset($_POST['age']) ? $_POST['age'] : null;
$gravite = isset($_POST['gravite']) ? $_POST['gravite'] : null;
$ville = isset($_POST['ville']) ? $_POST['ville'] : null;
$date = isset($_POST['date']) ? $_POST['date'] : null;
$athmo = isset($_POST['athmo']) ? $_POST['athmo'] : null;
$lum = isset($_POST['lum']) ? $_POST['lum'] : null;
$etat_surf = isset($_POST['etat_surf']) ? $_POST['etat_surf'] : null;
$securite = isset($_POST['securite']) ? $_POST['securite'] : null;
$cat_veh = isset($_POST['cat_veh']) ? $_POST['cat_veh'] : null;
$collision = isset($_POST['collision']) ? $_POST['collision'] : null;
$limit = isset($_POST['limit']) ? $_POST['limit'] : null;
$tableName = isset($_POST['bdd']) && $_POST['bdd'] === 'accident_new' ? 'accident_new' : 'accident';

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
$query = "SELECT $tableName.*, etat_route.descr_etat_surf, athmo.descr_athmo, lum.descr_lum, ceinture.descr_dispo_secu, collision.descr_type_col, vehicule.descr_cat_veh, ville.ville_nom
FROM $tableName
JOIN etat_route ON $tableName.id_etat_surf = etat_route.id_etat_surf
JOIN athmo ON $tableName.id_athmo = athmo.id_athmo
JOIN lum ON $tableName.id_lum = lum.id_lum
JOIN ceinture ON $tableName.id_dispo_secu = ceinture.id_dispo_secu
JOIN collision ON $tableName.id_type_col = collision.id_type_col
JOIN vehicule ON $tableName.id_cat_veh = vehicule.id_cat_veh
JOIN ville ON $tableName.id_code_insee = ville.id_code_insee";

// Construction de la clause WHERE dynamiquement
$where = [];
$params = [];

if ($age) {
    $where[] = "$tableName.age BETWEEN :age_start AND :age_end";
    $params[':age_start'] = $age_start;
    $params[':age_end'] = $age_end;
}

if ($gravite) {
    $where[] = "$tableName.id_grav = :gravite";
    $params[':gravite'] = $gravite;
}

if ($ville) {
    $where[] = "ville.ville_nom = :ville";
    $params[':ville'] = $ville;
}

if ($formattedDate) {
    $where[] = "DATE($tableName.date) = :date";
    $params[':date'] = $formattedDate;
}

if ($athmo) {
    $where[] = "athmo.id_athmo = :athmo";
    $params[':athmo'] = $athmo;
}

if ($lum) {
    $where[] = "lum.id_lum = :lum";
    $params[':lum'] = $lum;
}

if ($etat_surf) {
    $where[] = "etat_route.id_etat_surf = :etat_surf";
    $params[':etat_surf'] = $etat_surf;
}

if ($securite) {
    $where[] = "ceinture.id_dispo_secu = :securite";
    $params[':securite'] = $securite;
}

if ($cat_veh) {
    $where[] = "vehicule.id_cat_veh = :cat_veh";
    $params[':cat_veh'] = $cat_veh;
}

if ($collision) {
    $where[] = "collision.id_type_col = :collision";
    $params[':collision'] = $collision;
}

// Vérification si la clause WHERE est nécessaire
if (!empty($where)) {
    $query .= " WHERE " . implode(" AND ", $where);
}

// Ajout de la limite
if ($limit) {
    $query .= " LIMIT " . $limit;
}
else {
    $query .= " LIMIT 10";
}

// $query .= " ORDER BY RAND()";
// Préparation et exécution de la requête
$$tableName = $pdo->prepare($query);

foreach ($params as $param => $value) {
    $$tableName->bindValue($param, $value, PDO::PARAM_STR);
}

$$tableName->execute();
$results = $$tableName->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);


echo $json;
?>