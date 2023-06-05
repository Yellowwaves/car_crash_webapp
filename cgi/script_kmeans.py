import sys
import pandas as pd
import numpy as np
import warnings
warnings.filterwarnings("ignore")
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder
import json

def nettoyage():
    le = LabelEncoder()
    """Importation des données"""
    donnees = pd.read_csv('df_nettoye.csv', sep=',')
    donnees = donnees.drop(['Unnamed: 0'], axis=1)
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
    donnees['descr_grav'] = donnees['descr_grav'].replace([1, 2], 1)
    donnees['descr_grav'] = donnees['descr_grav'].replace([3, 4], 2)
    return donnees

def clustering_lat_lon(donnees):
    """Clustering des coordonnées GPS et renvoi des centroides"""
    kmeans = kmeans(n_clusters=13, random_state=0).fit(donnees[['latitude', 'longitude']])
    donnees['cluster'] = kmeans.labels_

    centroides = kmeans.cluster_centers_  # Récupération des centroides calculés

    return donnees, centroides

# Vérification des arguments en ligne de commande
if len(sys.argv) != 3:
    print("Veuillez fournir la latitude et la longitude en tant qu'arguments en ligne de commande.")
    sys.exit(1)

# Récupération des latitudes et longitudes à partir des arguments en ligne de commande
latitude_accident = float(sys.argv[1])
longitude_accident = float()

# Appel de la fonction nettoyage
donnees = nettoyage()

# Appel de la fonction clustering_lat_lon
donnees, centroides = clustering_lat_lon(donnees)

# Recherche du cluster correspondant à l'accident donné
# Utilisation des centroides dans la méthode k-means
kmeans = KMeans(n_clusters=len(centroides), random_state=0).fit(centroides)
cluster_label = kmeans.predict([[latitude_ant, lonude_accident]])

# Construction du résultat
resultat = {
    'latitude': float(latitude_accident),
    'longitude': float(longitude_accident),
    'cluster': int(cluster_label[0])
}

# Conversion du résultat en JSON
resultat_json = json.dumps(resultat)
print(resultason)