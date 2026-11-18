---
title: "Backoffice React, Backend et Application React Native d'une application de localisation de brocantes (travail de groupe)"
domain: "Informatique de Gestion"
tags: [react, react-native, expo, javascript, nodejs, postgresql, backoffice, travail-de-groupe]
thumbnail: "images/appbrocante/02-brocantes.jpg"
thumbnailAlt: "Tableau d’administration des brocantes dans AppBrocante"
---

AppBrocante est une application consacrée à la découverte et à la localisation de brocantes. Le projet comprend une application mobile React Native, une API Node.js et une interface web d’administration React. J’ai entièrement développé seul le **backoffice avec React**. Le backend a été réalisé en partie avec un autre membre du groupe. Le projet associe ainsi des contributions individuelles et une collaboration sur le backend.

Le backoffice rassemble les brocantes, les brocanteurs, les articles proposés à la vente, les emplacements et les marques d’intérêt des participants. Il donne aux administrateurs une vue structurée des informations et des relations entre ces différents éléments.

Les captures ci-dessous proviennent de l’application exécutée localement avec son jeu de données de démonstration. Les adresses e-mail et les numéros de téléphone des comptes ont été remplacés par des valeurs fictives pour cette présentation.

Cet article présente successivement le **backoffice React**, l’annexe **Application Mobile Localisation de Brocante**, puis le **backend Node.js** et les parcours qui relient les deux interfaces à la même base de données.

## 1. Backoffice React

### Accès administrateur et navigation

L’entrée dans le backoffice passe par un formulaire de connexion. L’interface vérifie que le compte authentifié possède le rôle d’administrateur avant de donner accès aux pages de gestion. Après connexion, l’écran d’accueil présente l’identité visuelle d’AppBrocante : un repère de localisation portant la lettre B, accompagné d’une palette jaune et orange.

Le menu latéral conserve les mêmes rubriques pendant la navigation. Il permet de passer de l’accueil aux articles, aux brocantes, aux utilisateurs, aux brocanteurs, aux intérêts, aux emplacements et aux statistiques. Les drapeaux de la barre supérieure permettent de changer la langue de l’interface entre le français, l’anglais et le néerlandais. La déconnexion reste accessible dans cette même barre.

![Écran d’accueil du backoffice AppBrocante avec son logo et son menu latéral](../../images/appbrocante/01-accueil.jpg)

*Figure 1 — Écran d’accueil après connexion : le menu latéral donne accès aux rubriques d’administration et les drapeaux permettent de choisir la langue de l’interface.*

### Administrer les brocantes

La rubrique Brocantes constitue le point d’entrée pour gérer les événements. Chaque ligne du tableau correspond à une brocante et présente son adresse, ses dates de début et de fin, son titre, son thème, son caractère caritatif et les informations relatives aux avis. Ces données décrivent l’événement que les utilisateurs pourront ensuite retrouver dans l’application.

Les commandes placées au-dessus du tableau permettent de rechercher une brocante par son titre, de choisir le nombre de lignes affichées et de naviguer entre les pages. Les boutons situés dans les en-têtes proposent un tri croissant ou décroissant. Chaque ligne comporte également des actions de modification et de suppression, tandis que le bouton « + » ouvre le formulaire d’ajout.

![Liste des brocantes avec les dates, les thèmes, les avis et les commandes de gestion](../../images/appbrocante/02-brocantes.jpg)

*Figure 2 — Écran de gestion des brocantes : le tableau rassemble les informations des événements, avec la recherche, le tri, la pagination et les actions propres à chaque ligne.*

L’édition s’effectue dans une fenêtre superposée à la liste. La fiche est préremplie avec les valeurs de la brocante sélectionnée ; l’identifiant reste désactivé. Les champs obligatoires sont signalés par un astérisque. Des sélecteurs de date et une case à cocher complètent les champs textuels et numériques. L’administrateur peut enregistrer les changements ou annuler pour revenir à la liste.

![Fiche préremplie d’une brocante avec ses champs et les boutons Annuler et Enregistrer](../../images/appbrocante/03-formulaire-brocante.jpg)

*Figure 3 — Fenêtre de modification d’une brocante : l’adresse, les dates, le titre, le thème et les autres attributs sont regroupés dans un formulaire prérempli.*

### Gérer les articles proposés à la vente

Dans cette application, un article désigne un objet proposé par un brocanteur. La rubrique Articles présente son titre, sa description, sa date d’ajout, son prix et son état. L’identifiant du commerçant permet de relier l’objet à son vendeur. Le jeu de démonstration contient notamment des bijoux, des livres et du mobilier ancien.

Cette page reprend les conventions utilisées pour les brocantes : recherche par titre, pagination, réglage du nombre de lignes et actions d’ajout, de modification et de suppression. La réutilisation de ces commandes donne une structure commune aux différentes pages de gestion.

![Catalogue des objets avec leur vendeur, leur description, leur prix et leur état](../../images/appbrocante/04-articles.jpg)

*Figure 4 — Gestion des articles : chaque objet est associé à un brocanteur et décrit par ses caractéristiques commerciales, notamment son prix et son état.*

### Gérer les utilisateurs et leurs droits

La rubrique Utilisateurs centralise les comptes de l’application. Le tableau présente les informations de profil, la date de dernière modification ainsi que les indicateurs d’administration et de blocage. Une commande permet également de consulter la photo de profil.

Au-delà de l’édition des données, des boutons spécifiques servent à bannir ou débannir un compte et à le promouvoir administrateur ou à le rétrograder. Cette page regroupe ainsi la gestion des profils et les opérations de modération. Les coordonnées visibles dans la capture appartiennent au jeu de démonstration préparé pour cet article.

![Tableau des utilisateurs de démonstration avec leurs statuts et leurs actions de modération](../../images/appbrocante/05-utilisateurs.jpg)

*Figure 5 — Administration des utilisateurs : les colonnes de statut et les commandes de modération permettent de gérer le blocage des comptes et leur rôle d’administrateur.*

### Décrire les brocanteurs

Un compte utilisateur peut également disposer d’un profil de brocanteur. Cette rubrique décrit son activité à travers un type, une présentation et une date d’inscription. La note moyenne et le nombre d’avis complètent la fiche. Le lien avec la personne est conservé par son identifiant.

La distinction entre utilisateur et brocanteur permet de séparer les informations du compte de celles qui concernent l’activité de vente. Le tableau reprend les mêmes outils de recherche et de gestion que les autres rubriques.

![Liste des brocanteurs avec le type d’activité, la description et les évaluations](../../images/appbrocante/06-brocanteurs.jpg)

*Figure 6 — Gestion des brocanteurs : le profil vendeur complète le compte utilisateur avec une description de l’activité et les informations d’évaluation.*

### Suivre les intérêts et les participations

La rubrique Intérêts représente la relation entre une personne et une brocante. Elle distingue le fait d’être intéressé par un événement, le statut de brocanteur dans cette relation et l’information de participation. Les deux identifiants permettent de retrouver les entités associées.

Cette vue rend visible une relation qui serait moins lisible dans une simple liste d’utilisateurs ou d’événements. Des recherches par identifiant de brocante ou de personne permettent de cibler les associations à consulter.

![Relations entre les personnes et les brocantes avec les indicateurs d’intérêt et de participation](../../images/appbrocante/07-interets.jpg)

*Figure 7 — Suivi des intérêts : chaque ligne associe une personne à une brocante et expose ses indicateurs d’intérêt, de statut de brocanteur et de participation.*

### Administrer les emplacements

Les emplacements décrivent les espaces rattachés aux brocantes. Chaque enregistrement possède son propre identifiant, l’identifiant de la brocante concernée, une disponibilité et une superficie. Une même brocante peut donc disposer de plusieurs emplacements ayant des caractéristiques différentes.

La liste permet de consulter et d’entretenir ces données avec les commandes communes du backoffice. Elle complète la description générale d’un événement par une vue de ses espaces disponibles.

![Tableau des emplacements avec la brocante associée, la disponibilité et la superficie](../../images/appbrocante/08-emplacements.jpg)

*Figure 8 — Gestion des emplacements : les espaces sont reliés à leur brocante et décrits par leur disponibilité et leur superficie.*

### Visualiser l’activité dans le temps

La page Statistiques présente une courbe du nombre de brocantes par mois. Deux sélecteurs d’année et de mois définissent les bornes de la période affichée. Le graphique met en évidence la répartition temporelle des événements présents dans la base.

Dans cet exemple, le jeu de données comporte un regroupement de brocantes en décembre 2024, puis plusieurs événements répartis en 2025. Cet indicateur permet de comparer l’activité événementielle d’une période à l’autre.

![Courbe du nombre de brocantes par mois avec les sélecteurs de période](../../images/appbrocante/09-statistiques.jpg)

*Figure 9 — Écran de statistiques : la courbe représente le nombre de brocantes par mois sur la période sélectionnée.*

### Architecture du backoffice

Le backoffice repose sur **React 18 et Vite**, avec React Router pour la navigation. Des composants réutilisables prennent en charge les tableaux, la recherche, le tri, les formulaires et la pagination. Redux Toolkit centralise le choix de langue et les dictionnaires de traduction. Recharts produit le graphique statistique et React Hot Toast affiche les notifications.

L’interface échange avec une **API Node.js et Express**, organisée sous le préfixe versionné `/api/v1`. Les requêtes authentifiées transmettent un jeton JWT. Le backend vérifie l’identité, les autorisations et les données reçues avant d’accéder à PostgreSQL. Les mots de passe sont hachés avec Argon2. Les couches de routes, de contrôleurs et de modèles séparent le traitement HTTP des opérations sur les données.

Le modèle relationnel relie les personnes, leurs profils de brocanteur, leurs articles, les brocantes, leurs emplacements et les intérêts exprimés par les utilisateurs. L’API comporte également des fonctions de recherche de brocantes dans un périmètre géographique et entre deux dates. Le backoffice documenté ici sert à administrer ces informations ; la consultation cartographique relève du volet mobile du projet.

### Compétences mobilisées dans le backoffice

Ce backoffice, que j’ai développé intégralement, illustre la construction d’une interface d’administration reliée à une API et à une base relationnelle. Il associe la gestion des données métier, les rôles utilisateurs, la navigation entre rubriques, l’internationalisation et une première visualisation statistique.

## 2. Annexe — Application Mobile Localisation de Brocante

### Exécution sur PC avec Expo Go

L’application mobile est développée avec **React Native 0.76 et Expo SDK 52**. Pour cette visite, elle a été lancée en mode développement dans Expo Go, sur l’émulateur Android BlueStacks installé sur le PC. Les captures sont de véritables écrans Android ; le cadre et les publicités de l’émulateur ont été retirés du cadrage.

Le serveur Expo fournit le code JavaScript à Expo Go. L’application mobile échange avec la même API et la même base PostgreSQL que le backoffice, et intègre un fond cartographique OpenStreetMap.

### Se connecter et accéder à son compte

L’onglet Utilisateur présente le logo, le nom d’utilisateur et le mot de passe. Il donne également accès au formulaire d’inscription et à une page d’aide à la connexion. La connexion du compte de démonstration a été vérifiée : après authentification auprès de l’API, l’application récupère son profil et le conserve dans son état Redux.

![Écran Android de connexion à AppBrocante avec les champs et les commandes de compte](../../images/appbrocante/mobile/10-connexion.jpg)

*Figure 10 — Écran de connexion mobile : les identifiants sont transmis à l’API avant l’ouverture du profil utilisateur.*

Le formulaire d’inscription regroupe le prénom, le nom, le nom d’utilisateur, l’adresse, le numéro de téléphone, l’adresse e-mail et le mot de passe. Les informations de profil et de connexion sont ainsi réunies dans une interface commune.

![Formulaire Android d’inscription avec les informations de profil et de connexion](../../images/appbrocante/mobile/11-inscription.jpg)

*Figure 11 — Formulaire d’inscription : les informations de profil et de connexion sont rassemblées sur un écran.*

### Entretenir son profil et son activité de brocanteur

Après connexion, la page de profil permet de consulter ses coordonnées et présente une commande de mise à jour. Le profil de brocanteur complète ces informations avec un type d’activité et une description. Pour le compte de démonstration utilisé ici, cette activité est déjà renseignée et le bouton « Voir mes articles » ouvre son catalogue.

La différence avec le backoffice tient au périmètre de travail : sur mobile, l’utilisateur retrouve son propre compte et son activité ; dans l’interface d’administration, les tableaux permettent de consulter les différents comptes du système. Côté API, la route `/client/person/me` détermine la personne à partir de la session authentifiée.

![Profil mobile du compte de démonstration et description de son activité de brocanteur](../../images/appbrocante/mobile/12-profil.jpg)

*Figure 12 — Profil utilisateur et profil brocanteur après connexion : les coordonnées fictives, l’activité et les commandes de mise à jour sont regroupées sur la même page.*

### Consulter et préparer la modification de ses articles

Le catalogue du brocanteur présente les objets sous forme de cartes. Chaque carte affiche le titre, la description, le prix et l’état de l’objet, avec les commandes « Modifier » et « Supprimer ». Un bouton placé sous la liste ouvre le formulaire d’ajout. Lors de la visite, le compte connecté a notamment retrouvé une lampe de mineur ancienne, une carafe en cristal et un jeu de quilles en bois, issus de la base de démonstration.

![Catalogue mobile du brocanteur avec ses objets, leurs prix et les actions de gestion](../../images/appbrocante/mobile/13-articles.jpg)

*Figure 13 — Catalogue du brocanteur connecté : les objets sont chargés depuis l’API et présentés avec leurs commandes de gestion.*

Le bouton « Modifier » ouvre un formulaire prérempli sous la liste. Il permet de préparer le titre, la description, le prix et l’état de l’article avant l’envoi de la modification. Le contrôle des droits ne repose pas uniquement sur l’affichage de ce bouton : la route d’édition des articles vérifie aussi le statut de brocanteur et la propriété de l’objet côté serveur.

![Formulaire mobile prérempli pour la modification d’un article du brocanteur](../../images/appbrocante/mobile/14-edition-article.jpg)

*Figure 14 — Édition d’un article : la fiche de la lampe est préremplie ; l’utilisateur peut préparer une modification ou annuler.*

### Rechercher des brocantes et régler les filtres

La navigation principale comporte les onglets Utilisateur, Rechercher et Setting. L’écran de recherche réunit un champ d’adresse, une commande de filtrage, un bouton d’orientation et des commandes pour basculer entre carte et liste ou actualiser les résultats. Le fond OpenStreetMap est affiché avec Leaflet dans une `react-native-webview`. Cette solution fonctionne dans Expo Go et permet de déplacer la carte et de zoomer sans clé Google Maps pour le fond cartographique. L’attribution OpenStreetMap reste visible en bas de l’écran.

La vue initiale présente Namur et ses environs. Le fond OpenStreetMap permet d’explorer les quartiers, les axes routiers et les repères géographiques grâce au zoom et au déplacement tactile. La localisation de l’appareil est gérée par `expo-location`, avec l’autorisation de l’utilisateur.

![Carte OpenStreetMap de Namur dans l’application Android, avec les commandes de zoom, de recherche et de filtrage](../../images/appbrocante/mobile/15-recherche-carte.jpg)

*Figure 15 — Écran de recherche mobile : le fond OpenStreetMap présente Namur et Jambes. L’utilisateur peut déplacer la carte et ajuster le zoom tout en conservant l’accès à la recherche, aux filtres et à la vue en liste.*

Le panneau de filtres propose un rayon en kilomètres et deux dates au format `YYYY-MM-DD`. Le code envoie le rayon à la recherche géographique du backend, puis applique les conditions de date dans le mobile sur les résultats reçus. Le bouton « Annuler » referme le panneau sans appliquer ces critères.

![Panneau mobile de filtres superposé à la carte OpenStreetMap, avec un rayon en kilomètres et les dates de début et de fin](../../images/appbrocante/mobile/16-filtres.jpg)

*Figure 16 — Filtres de recherche superposés à la carte OpenStreetMap : l’utilisateur peut renseigner un rayon et une période avant de relancer la sélection des brocantes.*

### Préférences et langues

La page Setting présente un sélecteur de langue. Les dictionnaires français, anglais et néerlandais sont gérés dans l’état Redux et utilisés par les différents écrans. Cette centralisation assure une présentation cohérente des libellés pendant la navigation.

![Préférences mobiles avec le choix de langue et l’interrupteur de mode sombre](../../images/appbrocante/mobile/17-parametres.jpg)

*Figure 17 — Préférences de l’application : le sélecteur permet de choisir la langue utilisée dans les écrans du mobile.*

### Parcours complémentaires autour des brocantes

La fiche d’une brocante est prévue pour présenter son thème, son adresse, ses dates et ses avis, puis ouvrir ses intérêts et ses emplacements. Le parcours des intérêts associe une personne à l’événement ; celui des emplacements affiche leur disponibilité et leur superficie. Les écrans de détail permettent aussi de poursuivre vers les personnes et les brocanteurs associés.

## 3. Backend Node.js — parcours, droits et données partagées

### Une API commune aux deux interfaces

Le backend est une API **Node.js et Express**, reliée à **PostgreSQL**. Le préfixe `/api/v1` distribue les requêtes entre trois familles : `/client`, `/dealer` et `/admin`. Cette séparation correspond à des usages et à des contrôles d’accès différents. Le backoffice et le mobile ne possèdent donc pas chacun une base isolée : ils consultent et modifient les mêmes entités à travers des routes adaptées à leur rôle.

![Schéma de l’architecture AppBrocante reliant le mobile et le backoffice aux parcours Client, Brocanteur et Administrateur de l’API, puis à PostgreSQL](../../images/appbrocante/18-architecture.png)

*Figure 18 — Schéma d’architecture établi à partir du code : les deux interfaces passent par une API commune, avec des parcours et des contrôles distincts avant l’accès aux mêmes tables PostgreSQL.*

| Famille de routes | Usage | Exemples de parcours |
| --- | --- | --- |
| `/client` | Compte personnel et consultation authentifiée | Connexion, lecture de son profil, recherche de brocantes, consultation d’articles et d’emplacements, gestion de ses intérêts |
| `/dealer` | Activité du brocanteur | Lecture et modification de son profil vendeur, création et gestion d’articles, gestion de brocantes et d’emplacements selon les contrôles de chaque route |
| `/admin` | Administration globale | Listes paginées, recherche, création, édition et suppression des données, bannissement et promotion des comptes |

Le statut de brocanteur et le rôle administrateur sont distincts : le premier correspond à un profil vendeur, le second au drapeau d’administration du compte. Ils peuvent coexister, comme dans certains comptes du jeu de démonstration.

### Du formulaire à la base de données

Une requête suit plusieurs étapes. Le routeur Express choisit le parcours. Les middlewares vérifient le jeton JWT, les autorisations et les paramètres à l’aide de schémas VineJS. Le contrôleur coordonne ensuite l’action et choisit la réponse HTTP. Les modèles exécutent les requêtes PostgreSQL avec des paramètres séparés des instructions SQL.

Les données validées sont regroupées dans `req.val`. Les informations issues du jeton sont disponibles dans `req.session`. Le middleware `himself` impose l’identifiant de la personne connectée pour les opérations personnelles : l’identité utilisée par le serveur ne dépend donc pas seulement d’un identifiant envoyé par le mobile.

### Connexion et séparation client / administrateur

Le parcours commence par `POST /client/person/login`. Le serveur recherche la personne et son éventuel profil brocanteur, vérifie le mot de passe avec Argon2 et refuse la connexion d’un compte suspendu. En cas de succès, il renvoie un objet contenant `token` et `isAdmin`, avec un jeton valable huit heures. Le client utilise ensuite l’en-tête `Authorization: Bearer …`.

Le mobile peut ouvrir le profil d’un compte client après connexion. Le backoffice applique un contrôle supplémentaire dans son fournisseur d’authentification : il n’ouvre sa navigation de gestion que si `isAdmin` est vrai. L’API renouvelle ce contrôle sur les routes `/admin` avec les middlewares `jwtCheck`, `admin` et, sur les parcours concernés, `notBanned`. Masquer un écran ne constitue donc pas le seul contrôle d’accès.

Les vérifications de l’API illustrent la séparation des droits entre consultation personnelle et administration globale.

| Vérification effectuée | Réponse observée | Conséquence |
| --- | --- | --- |
| Liste administrative des brocantes sans jeton | `401` | Une requête anonyme ne peut pas lire le tableau administrateur |
| Connexion du compte client `User` | `201`, `isAdmin: false` | Le compte est authentifié, sans obtenir le rôle administrateur |
| Lecture de `/client/person/me` par ce client | `200` | Le parcours personnel reste accessible |
| Lecture de `/admin/fleaMarket/all` par ce même client | `403` | Un jeton valide ne suffit pas pour administrer les données |
| Lecture de cette liste avec le compte `Admin` | `200`, dix brocantes | Le backoffice peut alimenter son tableau |
| Recherche client entre 2024 et 2026 | `200`, dix brocantes | Les données métier sont accessibles par une route client autorisée |

### Parcours d’un article : du mobile au backoffice

Sur mobile, le catalogue du compte connecté appelle `GET /client/article/:personId`. Il affiche les objets du vendeur sous forme de cartes. Une modification passe ensuite par `PATCH /dealer/article` : le serveur exige un statut de brocanteur, valide les champs et vérifie que l’article appartient à la personne connectée avant de mettre à jour la ligne PostgreSQL.

Dans le backoffice, les routes `/admin/article` donnent une vue globale des articles et les opérations d’administration correspondantes. Une modification enregistrée par le vendeur concerne le même objet que celui consulté dans le tableau administrateur. Les interfaces actualisent leurs données par des appels HTTP à cette API commune.

### Parcours d’une brocante et recherche géographique

Le backoffice consulte les événements avec `/admin/fleaMarket/all`, les recherche par titre et soumet leurs formulaires d’ajout ou d’édition. Le mobile utilise notamment `/client/fleaMarket/inRange` et `/client/fleaMarket/inDates`. Ces routes lisent la même table `flea_market`, mais répondent à un besoin de découverte plutôt qu’à un besoin de gestion globale.

La recherche par rayon utilise **l’adresse du profil utilisateur comme point de référence**. Le backend géocode cette adresse et celles des brocantes avec OpenCage, calcule les distances puis sélectionne les événements dans le rayon demandé. Dans le mobile, le fond OpenStreetMap fournit le contexte visuel ; le géocodage des adresses de brocantes prépare séparément les coordonnées des marqueurs.

La recherche par dates interroge directement PostgreSQL sur les dates de début des brocantes. La page de statistiques du backoffice s’appuie sur ce parcours de lecture pour construire sa répartition mensuelle.

### Intérêts, emplacements et intégrité des relations

Le mobile lit les emplacements d’une brocante avec `/client/slot/:fleaMarketId` et les intérêts avec `/client/interest/:fleaMarketId`. Pour ajouter ou modifier son intérêt, le parcours client associe l’opération à la personne du jeton. Le backoffice possède en parallèle les routes d’administration de ces relations, visibles dans ses tableaux Intérêts et Emplacements.

La suppression d’une brocante montre comment le contrôleur protège la cohérence de la base : il ouvre une transaction, supprime les emplacements et les intérêts liés, puis la brocante elle-même. Un échec déclenche un retour arrière. Cette coordination évite de traiter la suppression de l’événement comme une opération indépendante de ses relations.

### Modération et évolution des rôles

Les commandes « Bannir », « Débannir », « Promouvoir » et « Rétrograder » du backoffice appellent les routes `/admin/moderation` et `/admin/promotion`. Elles modifient les attributs du compte dans PostgreSQL. Le parcours de bannissement prévoit également une notification par e-mail.

Les autorisations présentes dans le jeton sont établies à la connexion. Les sessions suivantes prennent ainsi en compte les rôles enregistrés par l’administrateur, aussi bien dans le mobile que dans le backoffice.

### Compétences mobilisées dans le projet

Ce projet réunit une interface d’administration React, une application mobile React Native et une API Node.js autour d’une base PostgreSQL commune. Il illustre la conception de parcours complémentaires, la gestion des rôles, l’intégrité des données et l’intégration d’une carte OpenStreetMap dans une application Expo.

Le code du projet est disponible dans le dépôt AppBrocante : [https://github.com/etu51424/appBrocante](https://github.com/etu51424/appBrocante).
