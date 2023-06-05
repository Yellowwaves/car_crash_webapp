import sys
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report
import json
import warnings
warnings.filterwarnings("ignore")

import pandas as pd
import plotly.express as px
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.cluster import KMeans
from scipy.spatial.distance import cdist
import math
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report


import random as rd

def nettoyage():
    le = LabelEncoder()
    """Importation des données"""
    donnees = pd.read_csv('df_nettoye.csv', sep=',')
    """Suppression des colonnes pour décharger le programme"""
    donnees = donnees.drop(['Unnamed: 0'], axis=1)
    donnees = donnees.drop(['id_usa'], axis=1)
    donnees = donnees.drop(['date'], axis=1)
    donnees = donnees.drop(['num_veh'], axis=1)
    donnees = donnees.drop(['ville'], axis=1)
    donnees = donnees.drop(['jour'], axis=1)
    donnees = donnees.drop(['id_code_insee'], axis=1)
    donnees = donnees.drop(['mois'], axis=1)
    donnees = donnees.drop(['heure'], axis=1)
    donnees = donnees.drop(['Num_Acc'], axis=1)
    donnees = donnees.drop(['an_nais'], axis=1)
    donnees = donnees.drop(['place'], axis=1)
    donnees = donnees.drop(['descr_agglo'], axis=1)
    donnees['descr_grav'] = donnees['descr_grav'].replace([1, 2], 1)
    donnees['descr_grav'] = donnees['descr_grav'].replace([3, 4], 2)
    donnees=donnees.sample(n=1000)
    return donnees


df=nettoyage()
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report
import json

from sklearn.model_selection import train_test_split, LeaveOneOut
from sklearn.neighbors import KNeighborsClassifier

# Sélectionner les colonnes 'grav', 'lum', 'cat_veh', 'longitude' et 'latitude'
features = df[['descr_lum', 'descr_cat_veh', 'longitude', 'latitude','age','descr_athmo','descr_etat_surf','descr_dispo_secu']]

# Séparer les caractéristiques (X) de la variable cible (y)
X = features
y = df["descr_grav"]

# Holdout : Division en base d'apprentissage et de test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialiser la méthode Leave-One-Out
loo = LeaveOneOut()

# Parcourir chaque échantillon en utilisant la méthode Leave-One-Out
for train_index, test_index in loo.split(X):
    # Diviser les données en ensembles d'entraînement et de test
    X_loo_train, X_loo_test = X.iloc[train_index], X.iloc[test_index]
    y_loo_train, y_loo_test = y.iloc[train_index], y.iloc[test_index]


def KNN(informations_accident, X_train, X_test, y_train, y_test):
    # Créer une instance de KNeighborsClassifier
    knn = KNeighborsClassifier(n_neighbors=5, metric='euclidean')

    # Ajuster le modèle aux données d'apprentissage
    knn.fit(X_train, y_train)

    # Prévoir les résultats de classification pour les données de test
    y_pred = knn.predict(X_test)
    # Obtenir les valeurs uniques des prédictions
    classes_predites = np.unique(y_pred)

    # Nombre de classes différentes prédites
    nombre_classes_predites = len(classes_predites)
    # Afficher le rapport de classification

    # Prévoir la classe de l'accident donné
    classe_predite = knn.predict(informations_accident)

    # Construction du résultat
    resultat = {
        'classe_accident': str(classe_predite[0])
    }

    # Conversion du résultat en JSON
    resultat_json = json.dumps(resultat)
    return resultat_json

# Vérification des arguments en ligne de commande
if len(sys.argv) != 10:
    print("Veuillez fournir la latitude et la longitude en tant qu'arguments en ligne de commande.")
    sys.exit(1)

# Récupération des latitudes et longitudes à partir des arguments en ligne de commande
descr_lum = int(sys.argv[1])
descr_type_col = int(sys.argv[2])
latitude_accident = float(sys.argv[4])
longitude_accident = float(sys.argv[3])
descr_athmo = int(sys.argv[5])
descr_etat_surf = int(sys.argv[6])
descr_dispo_secu = int(sys.argv[7])
descr_cat_veh = int(sys.argv[8])
age = int(sys.argv[9])




# Informations sur l'accident
informations_accident = [[descr_lum, descr_cat_veh, longitude_accident, latitude_accident,age,descr_athmo,descr_etat_surf,descr_dispo_secu]]

# Appel de la fonction KNN
resultat = KNN(informations_accident, X_train, X_test, y_train, y_test)

print(resultat)
