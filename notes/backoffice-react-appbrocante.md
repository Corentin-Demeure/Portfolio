---
title: "Backoffice React d'une application de localisation de brocantes (travail de groupe)"
domain: "Informatique de Gestion"
tags: [react, javascript, nodejs, postgresql, backoffice, travail-de-groupe]
thumbnail: "images/appbrocante/02-brocantes.jpg"
thumbnailAlt: "Tableau d’administration des brocantes dans AppBrocante"
---

AppBrocante est un projet de groupe consacré à la découverte et à la localisation de brocantes. Le projet comprend une application mobile, une API et une interface web d’administration. Cet article présente le **backoffice développé avec React**, qui permet d’entretenir les données utilisées par l’application et de gérer ses utilisateurs.

Le backoffice rassemble les brocantes, les brocanteurs, les articles proposés à la vente, les emplacements et les marques d’intérêt des participants. Il donne aux administrateurs une vue structurée des informations et des relations entre ces différents éléments. Le projet a été réalisé en groupe par Demeure, Dujardin et Verhaegen.

Les captures ci-dessous proviennent de l’application exécutée localement avec son jeu de données de démonstration. Les adresses e-mail et les numéros de téléphone des comptes ont été remplacés par des valeurs fictives pour cette présentation.

## Accès administrateur et navigation

L’entrée dans le backoffice passe par un formulaire de connexion. L’interface vérifie que le compte authentifié possède le rôle d’administrateur avant de donner accès aux pages de gestion. Après connexion, l’écran d’accueil présente l’identité visuelle d’AppBrocante : un repère de localisation portant la lettre B, accompagné d’une palette jaune et orange.

Le menu latéral conserve les mêmes rubriques pendant la navigation. Il permet de passer de l’accueil aux articles, aux brocantes, aux utilisateurs, aux brocanteurs, aux intérêts, aux emplacements et aux statistiques. Les drapeaux de la barre supérieure permettent de changer la langue de l’interface entre le français, l’anglais et le néerlandais. La déconnexion reste accessible dans cette même barre.

![Écran d’accueil du backoffice AppBrocante avec son logo et son menu latéral](../../images/appbrocante/01-accueil.jpg)

*Figure 1 — Écran d’accueil après connexion : le menu latéral donne accès aux rubriques d’administration et les drapeaux permettent de choisir la langue de l’interface.*

## Administrer les brocantes

La rubrique Brocantes constitue le point d’entrée pour gérer les événements. Chaque ligne du tableau correspond à une brocante et présente son adresse, ses dates de début et de fin, son titre, son thème, son caractère caritatif et les informations relatives aux avis. Ces données décrivent l’événement que les utilisateurs pourront ensuite retrouver dans l’application.

Les commandes placées au-dessus du tableau permettent de rechercher une brocante par son titre, de choisir le nombre de lignes affichées et de naviguer entre les pages. Les boutons situés dans les en-têtes proposent un tri croissant ou décroissant. Chaque ligne comporte également des actions de modification et de suppression, tandis que le bouton « + » ouvre le formulaire d’ajout.

![Liste des brocantes avec les dates, les thèmes, les avis et les commandes de gestion](../../images/appbrocante/02-brocantes.jpg)

*Figure 2 — Écran de gestion des brocantes : le tableau rassemble les informations des événements, avec la recherche, le tri, la pagination et les actions propres à chaque ligne.*

L’édition s’effectue dans une fenêtre superposée à la liste. La fiche est préremplie avec les valeurs de la brocante sélectionnée ; l’identifiant reste désactivé. Les champs obligatoires sont signalés par un astérisque. Des sélecteurs de date et une case à cocher complètent les champs textuels et numériques. L’administrateur peut enregistrer les changements ou annuler pour revenir à la liste.

![Fiche préremplie d’une brocante avec ses champs et les boutons Annuler et Enregistrer](../../images/appbrocante/03-formulaire-brocante.jpg)

*Figure 3 — Fenêtre de modification d’une brocante : l’adresse, les dates, le titre, le thème et les autres attributs sont regroupés dans un formulaire prérempli.*

## Gérer les articles proposés à la vente

Dans cette application, un article désigne un objet proposé par un brocanteur. La rubrique Articles présente son titre, sa description, sa date d’ajout, son prix et son état. L’identifiant du commerçant permet de relier l’objet à son vendeur. Le jeu de démonstration contient notamment des bijoux, des livres et du mobilier ancien.

Cette page reprend les conventions utilisées pour les brocantes : recherche par titre, pagination, réglage du nombre de lignes et actions d’ajout, de modification et de suppression. La réutilisation de ces commandes donne une structure commune aux différentes pages de gestion.

![Catalogue des objets avec leur vendeur, leur description, leur prix et leur état](../../images/appbrocante/04-articles.jpg)

*Figure 4 — Gestion des articles : chaque objet est associé à un brocanteur et décrit par ses caractéristiques commerciales, notamment son prix et son état.*

## Gérer les utilisateurs et leurs droits

La rubrique Utilisateurs centralise les comptes de l’application. Le tableau présente les informations de profil, la date de dernière modification ainsi que les indicateurs d’administration et de blocage. Une commande permet également de consulter la photo de profil.

Au-delà de l’édition des données, des boutons spécifiques servent à bannir ou débannir un compte et à le promouvoir administrateur ou à le rétrograder. Cette page regroupe ainsi la gestion des profils et les opérations de modération. Les coordonnées visibles dans la capture appartiennent au jeu de démonstration préparé pour cet article.

![Tableau des utilisateurs de démonstration avec leurs statuts et leurs actions de modération](../../images/appbrocante/05-utilisateurs.jpg)

*Figure 5 — Administration des utilisateurs : les colonnes de statut et les commandes de modération permettent de gérer le blocage des comptes et leur rôle d’administrateur.*

## Décrire les brocanteurs

Un compte utilisateur peut également disposer d’un profil de brocanteur. Cette rubrique décrit son activité à travers un type, une présentation et une date d’inscription. La note moyenne et le nombre d’avis complètent la fiche. Le lien avec la personne est conservé par son identifiant.

La distinction entre utilisateur et brocanteur permet de séparer les informations du compte de celles qui concernent l’activité de vente. Le tableau reprend les mêmes outils de recherche et de gestion que les autres rubriques.

![Liste des brocanteurs avec le type d’activité, la description et les évaluations](../../images/appbrocante/06-brocanteurs.jpg)

*Figure 6 — Gestion des brocanteurs : le profil vendeur complète le compte utilisateur avec une description de l’activité et les informations d’évaluation.*

## Suivre les intérêts et les participations

La rubrique Intérêts représente la relation entre une personne et une brocante. Elle distingue le fait d’être intéressé par un événement, le statut de brocanteur dans cette relation et l’information de participation. Les deux identifiants permettent de retrouver les entités associées.

Cette vue rend visible une relation qui serait moins lisible dans une simple liste d’utilisateurs ou d’événements. Des recherches par identifiant de brocante ou de personne permettent de cibler les associations à consulter.

![Relations entre les personnes et les brocantes avec les indicateurs d’intérêt et de participation](../../images/appbrocante/07-interets.jpg)

*Figure 7 — Suivi des intérêts : chaque ligne associe une personne à une brocante et expose ses indicateurs d’intérêt, de statut de brocanteur et de participation.*

## Administrer les emplacements

Les emplacements décrivent les espaces rattachés aux brocantes. Chaque enregistrement possède son propre identifiant, l’identifiant de la brocante concernée, une disponibilité et une superficie. Une même brocante peut donc disposer de plusieurs emplacements ayant des caractéristiques différentes.

La liste permet de consulter et d’entretenir ces données avec les commandes communes du backoffice. Elle complète la description générale d’un événement par une vue de ses espaces disponibles.

![Tableau des emplacements avec la brocante associée, la disponibilité et la superficie](../../images/appbrocante/08-emplacements.jpg)

*Figure 8 — Gestion des emplacements : les espaces sont reliés à leur brocante et décrits par leur disponibilité et leur superficie.*

## Visualiser l’activité dans le temps

La page Statistiques présente une courbe du nombre de brocantes par mois. Deux sélecteurs d’année et de mois définissent les bornes de la période affichée. Le graphique met en évidence la répartition temporelle des événements présents dans la base.

Dans cet exemple, le jeu de données comporte un regroupement de brocantes en décembre 2024, puis plusieurs événements répartis en 2025. Il s’agit d’un indicateur portant sur les événements enregistrés ; il ne mesure ni la fréquentation réelle des brocantes ni le volume des ventes.

![Courbe du nombre de brocantes par mois avec les sélecteurs de période](../../images/appbrocante/09-statistiques.jpg)

*Figure 9 — Écran de statistiques : la courbe représente le nombre de brocantes par mois sur la période sélectionnée.*

## Architecture technique

Le backoffice repose sur **React 18 et Vite**, avec React Router pour la navigation. Des composants réutilisables prennent en charge les tableaux, la recherche, le tri, les formulaires et la pagination. Redux Toolkit centralise le choix de langue et les dictionnaires de traduction. Recharts produit le graphique statistique et React Hot Toast affiche les notifications.

L’interface échange avec une **API Node.js et Express**, organisée sous le préfixe versionné `/api/v1`. Les requêtes authentifiées transmettent un jeton JWT. Le backend vérifie l’identité, les autorisations et les données reçues avant d’accéder à PostgreSQL. Les mots de passe sont hachés avec Argon2. Les couches de routes, de contrôleurs et de modèles séparent le traitement HTTP des opérations sur les données.

Le modèle relationnel relie les personnes, leurs profils de brocanteur, leurs articles, les brocantes, leurs emplacements et les intérêts exprimés par les utilisateurs. L’API comporte également des fonctions de recherche de brocantes dans un périmètre géographique et entre deux dates. Le backoffice documenté ici sert à administrer ces informations ; la consultation cartographique relève du volet mobile du projet.

## Cadre du projet

Ce travail de groupe illustre la construction d’une interface d’administration reliée à une API et à une base relationnelle. Il associe la gestion des données métier, les rôles utilisateurs, la navigation entre rubriques, l’internationalisation et une première visualisation statistique.

Il s’agit d’un prototype pédagogique. Certains formulaires exposent encore les noms techniques des champs et la session de l’interface doit être rouverte après un rechargement complet de la page. Les captures présentent la version existante du projet, sans refonte de son interface.

Le code du projet est disponible dans le [dépôt AppBrocante](https://github.com/etu51424/appBrocante).
