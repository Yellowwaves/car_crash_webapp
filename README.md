# Projet d'Analyse d'Accidents en France

Bienvenue dans le référentiel du projet d'analyse des accidents routiers en France. Ce projet utilise une base de données SQL pour stocker les informations sur les accidents et utilise CGI pour analyser ces données en utilisant l'intelligence artificielle.

## Fonctionnalités

- **Filtrage des Accidents :** Permet aux utilisateurs de filtrer les accidents en fonction de divers critères tels que la date, la localisation, la gravité, etc.

- **Affichage des Données :** Fournit une interface conviviale pour visualiser les données d'accidents de manière claire et compréhensible.

- **Analyse avec l'IA :** Intègre des fonctionnalités d'intelligence artificielle via CGI pour analyser les schémas et les tendances des accidents.

## Structure du Projet

Le projet est organisé comme suit :

|-- /docs
| |-- Rapport_Analyse_IA.md
|-- /src
| |-- main.py
| |-- database.sql
| |-- cgi_scripts
| |-- analyze.py
|-- README.md
|-- LICENSE

- **/docs :** Contient la documentation du projet, y compris le rapport d'analyse avec l'IA.

- **/src :** Comprend le code source du projet.
  - **main.py :** Le point d'entrée principal de l'application.
  - **database.sql :** Le script SQL pour créer la base de données des accidents.
  - **cgi_scripts :** Les scripts CGI pour l'analyse avec l'IA.

## Configuration Requise

Assurez-vous d'avoir les éléments suivants installés avant d'exécuter le projet :

- Python 3.x
- Base de données SQL (par exemple, MySQL, SQLite)

## Comment Utiliser

1. Clonez le référentiel sur votre machine locale.
git clone https://github.com/votre-utilisateur/analyse-accidents-france.git

markdown
Copy code

2. Importez le script SQL dans votre base de données.

3. Exécutez le script principal.
python src/main.py

4. Accédez à l'application dans votre navigateur à l'adresse [http://localhost:5000](http://localhost:5000).

## Contribution

Si vous souhaitez contribuer à ce projet, veuillez consulter le guide de contribution [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus d
