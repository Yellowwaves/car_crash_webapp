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

# Activation du débogage CGI
cgitb.enable()

# Lecture des paramètres de la requête CGI
form = cgi.FieldStorage()

# Récupération de la latitude et de la longitude de l'accident
latitude_accident = form.getvalue('latitude')
longitude_accident = form.getvalue('longitude')

# Appel de la fonction nettoyage
donnees = nettoyage()

# Appel de la fonction clustering_lat_lon
donnees, centroides = clustering_lat_lon(donnees)

# Recherche du cluster correspondant à l'accident donné
# Utilisation des centroides dans la méthode k-means
kmeans = KMeans(n_clusters=len(centroides), random_state=0).fit(centroides)
cluster_label = kmeans.predict([[latitude_accident, longitude_accident]])

# Construction du résultat
resultat = int(cluster_label[0])

# Conversion du résultat en JSON
resultat_json = dic = {'cluster': resultat, 'latitude': latitude_accident,'longitude' : longitude_accident}

# Envoi des en-têtes HTTP
print ("Content-type: application/json \r\n")

#print("Content-Type: application/json")
#print()
jsonf=json.dumps(resultat_json)
print(jsonf)
# Envoi de la réponse JSON
#print("latitude",latitude_accident)
#print("longitude",longitude_accident)

