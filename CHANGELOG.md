# Changelog

## v1.6.6

### Nouveautés
- **Bandeau de diagnostic sur l'accueil** : si l'accélération GPU n'est pas disponible, un bandeau l'annonce désormais sur l'écran d'accueil (au lieu de le découvrir dans les options), avec un bouton **Réparer l'accélération** qui relance l'auto-configuration et re-vérifie le GPU.
- **Mise à jour en un clic** : le badge « Mise à jour disponible » passe dans le pied de page, à côté du numéro de version, et lance réellement `npm install -g whisperpro@latest` (plus d'ouverture de page web). L'app se ferme pour se laisser remplacer ; relancez `whisperpro` ensuite.
- **Instance unique** : relancer `whisperpro` alors que l'app est déjà ouverte ne crée plus de seconde instance — la fenêtre existante revient au premier plan.
- **Options restructurées** : le panneau d'options est découpé en sections (Reconnaissance, Capture, Modèles & système, Widget) avec espacement entre groupes.
- **Thème clair renforcé** : bordures, champs et surfaces mieux séparés — les cartes ressortent au lieu de se fondre dans le fond.
- **Rayons harmonisés** : système d'arrondis cohérent (2/4/6/8 px) dans toute l'interface.

### Interne
- Le drawer de paramètres est découpé en composants par section avec des briques de champ partagées.
- Le bouton de mise à jour utilise `npm install @latest` (le précédent `npm update` ne garantissait pas la dernière version).

## v1.6.5 et antérieurs

Notes générées automatiquement à partir des commits — voir les releases GitHub correspondantes.
