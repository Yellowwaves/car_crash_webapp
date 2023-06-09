#!/usr/bin/python3.9

import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings("ignore")
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder
import json
import cgi
import cgitb

def nettoyage():
    le = LabelEncoder()
    """Importation des données"""
    donnees = pd.read_csv('df_nettoye2.csv', sep=',')
    """Suppression des colonnes pour décharger le programme"""
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
    donnees = donnees.drop(['descr_motif_traj'], axis=1)
    """on regroupe gravité 1 et 2 en 1 et 3 et 4 en 2"""
    return donnees

def clustering_lat_lon(donnees):
    """Clustering des coordonnées GPS et renvoi des centroides"""
    kmeans = KMeans(n_clusters=13, random_state=0).fit(donnees[['latitude', 'longitude']])
    donnees['cluster'] = kmeans.labels_

    centroides = kmeans.cluster_centers_  # Récupération des centroides calculés

    return donnees, centroides

def predire_clusters(accidents):
    """Prédiction des clusters pour les accidents donnés"""
    # Chargement des données et clustering initial
    donnees = nettoyage()
    donnees, centroides = clustering_lat_lon(donnees)

    # Prédiction des clusters pour chaque accident
    resultats = []
    for accident in accidents:
        latitude_accident = accident['latitude']
        longitude_accident = accident['longitude']

        # Recherche du cluster correspondant à l'accident donné
        kmeans = KMeans(n_clusters=len(centroides), random_state=0).fit(centroides)
        cluster_label = kmeans.predict([[latitude_accident, longitude_accident]])

        # Construction du résultat pour l'accident donné
        resultat = {
            'latitude': latitude_accident,
            'longitude': longitude_accident,
            'cluster': int(cluster_label[0])
        }
        resultats.append(resultat)

    return resultats

# Activation du débogage CGI
cgitb.enable()

# Lecture des paramètres de la requête CGI
form = cgi.FieldStorage()
accidents= form["accidents"].value
print(accidents)
# Récupération des accidents sélectionnés depuis la requête POST
accidents_data = json.loads(accidents)
# print(accidents_data)
# Appel de la fonction de prédiction des clusters
resultats = predire_clusters(accidents_data)

# Envoi des en-têtes HTTP
print("Content-type: application/json\r\n")

# Envoi de la réponse JSON
print(json.dumps(resultats))