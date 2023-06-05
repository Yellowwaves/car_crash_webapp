import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn import svm
import sys
import warnings
warnings.filterwarnings("ignore")
from sklearn.ensemble import RandomForestClassifier
from sklearn.neural_network import MLPClassifier
import json

def nettoyage():
    le = LabelEncoder()
    """Importation des données"""
    donnees = pd.read_csv('df_nettoye.csv', sep=',')
    """Suppression des colonnes pour décharger le programme"""
    colonnes_supprimees = ['Unnamed: 0', 'id_usa', 'date', 'num_veh', 'ville', 'jour', 'id_code_insee',
                           'mois', 'heure', 'Num_Acc', 'an_nais', 'place', 'descr_agglo', 'descr_motif_traj']
    donnees = donnees.drop(colonnes_supprimees, axis=1)
    donnees['descr_grav'] = donnees['descr_grav'].replace([1, 2], 1)
    donnees['descr_grav'] = donnees['descr_grav'].replace([3, 4], 2)
    donnees=donnees.sample(n=100)
    return donnees


def classification_accident(informations_accident, methode, modeles):
    # Utilisation de la méthode de classification spécifiée avec les modèles entraînés
    if methode == "svm":
        clf = modeles["svm"]
        gravite_accident = clf.predict(informations_accident)
    elif methode == "rf":
        rf = modeles["random_forest"]
        gravite_accident = rf.predict(informations_accident)
    elif methode == "mlp":
        mlp = modeles["mlp"]
        gravite_accident = mlp.predict(informations_accident)
    else:
        return {"error": "Méthode de classification non valide."}
    
    # Construction du résultat au format JSON
    resultat = {
        "gravite": gravite_accident.tolist()
    }
    
    return resultat


# Informations de l'accident (à remplacer par les vraies informations)

if len(sys.argv) != 11:
    print("Veuillez reformater les informations")
    sys.exit(1)

# Récupération des latitudes et longitudes à partir des arguments en ligne de commande

methode = sys.argv[5]
descr_lum = int(sys.argv[1])
descr_type_col = int(sys.argv[2])
latitude_accident = float(sys.argv[3])
longitude_accident = float(sys.argv[4])
descr_athmo = int(sys.argv[5])
descr_etat_surf = int(sys.argv[6])
descr_dispo_secu = int(sys.argv[7])
descr_cat_veh = int(sys.argv[8])
age = int(sys.argv[9])
methode = sys.argv[10]
# Exemple de valeurs
# descr_lum = 1
# descr_type_col = 1
# latitude_accident = 48.8566
# longitude_accident = 2.3522
# descr_athmo = 1
# descr_etat_surf = 1
# descr_dispo_secu = 1
# descr_cat_veh = 1
# age = 20




# Informations sur l'accident
informations_accident = [[descr_lum, descr_type_col, longitude_accident, latitude_accident,age,descr_athmo,descr_etat_surf,descr_dispo_secu]]

# Méthode de classification à utiliser (à remplacer par la vraie méthode)
# Exemple de valeur : "svm", "rf", "mlp

# Entraînement des modèles
df = nettoyage()
features = df[['descr_lum', 'descr_type_col', 'longitude', 'latitude', 'age', 'descr_athmo', 'descr_etat_surf', 'descr_dispo_secu']]
X = features
y = df["descr_grav"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

svm_model = svm.SVC()
svm_model.fit(X_train, y_train)

rf_model = RandomForestClassifier()
rf_model.fit(X_train, y_train)

mlp_model = MLPClassifier(hidden_layer_sizes=(100,), max_iter=1000)
mlp_model.fit(X_train, y_train)

# Création du dictionnaire des modèles
modeles = {
    "svm": svm_model,
    "random_forest": rf_model,
    "mlp": mlp_model
}

# Classification de l'accident
resultat = classification_accident(informations_accident, methode, modeles)

# Conversion du résultat en JSON
resultat_json = json.dumps(resultat)

# Affichage du résultat
print(resultat_json)
