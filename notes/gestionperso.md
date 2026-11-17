---
title: "GestionPerso - ERP personnel et familial expérimental"
domain: "Informatique de Gestion"
tags: [erp, gestion-personnelle, planification, budget]
thumbnail: "images/gestionperso/carte-des-objectifs.jpg"
---

J'ai voulu créé GestionPerso car je pense que la gestion de soi et son entreprise c'est la base de l'adaptation et de la réduction de stress.
"La gestion de l'entreprise" Mais quelle entreprise vous allez-me dire, je suis étudiant ? Eh bien, chaque foyer, chaque personne est en réalité une entreprise. Chaque personne a un inventaire d'actifs et de passifs, des comptes bancaires, une comptabilité: de l'argent dépensé et gagné, des contacts, des comptes, des données et relevés de données. Souvent toutes ces données soient éparpillées soit gérées au travers d'un système de gestion que les gens ne reconnaissent même pas comme un ERP or c'en est partiellement un : Par exemple l'écosystème Google ou un agenda organisé.

# Pourquoi faire un ERP ?
La manière manière d'illustrer l'intérêt, c'est cette citation que j'ai trouvé venant d'un livre sur l'Achat au détail :
[The shoe dealer's discovery](the-shoe-dealers-discovery.md)

![[the-shoe-dealers-discovery]]

GestionPerso rassemble la planification, le suivi des activités et la gestion du foyer. Une tâche décrit ce qu’on prévoit de faire. Une action consigne ce qui a été réalisé, avec le temps passé et, le cas échéant, le montant associé.

# Gameification

Un autre principe de cette ERP est de gameifier les tâches que je trouve ennuyeuse ou qu je suis tenter à procrastiner. Nous sommes entourés dans notre vie de produits designés par des boites de marketing pour être aussi addictifs que possibles, or ce même facteur addictif n'est pas présent pour les interfaces des tâches qu'on trouve ennuyeuse.

Je voulais que chaque tâche rapporte un certain nombre d'xp, de points de récompense. L'onglet "Jouer" permet alors de voir sa progression, par quel chemin passé. La réussite de gros projets dépend de la réussite successive des étapes (tâches) pour y accéder. Tandis que l'onglet Construire permet de construire manuellement nos chemins de tâche.

## Agenda et tâches

Le calendrier affiche les tâches et les habitudes par jour, semaine ou mois. Une tâche peut rester sans horaire jusqu’à ce qu’un créneau lui soit attribué. On distingue trois types de tâches : les **tâches uniques** (sans implémentation spécifique), les **occasions** (événement récurrents sans répétition prévisible, déterminé par l'utilisateur) et aux **habitudes** (événement récurrent à répétition prévisible), dont on peut régler la récurrence. Les menus permet d'accéder à la liste brut de chacun.

À la base j'avais une distinction entre projet et tâche mais j'ai préféré fusionné les deux, un projet étant une tâche sans parent majeur. 

![Agenda quotidien de démonstration avec six activités planifiées](../../images/gestionperso/agenda.jpg)

## Journal

Le journal affiche le prévu et le réalisé côte à côte. Chaque action peut renseigner une durée, un résultat et une prochaine étape. Plusieurs séances peuvent faire avancer la même tâche, dont l’achèvement se confirme séparément.

![Journal d’activités avec ses colonnes Prévu et Réalisé et la liste des actions du jour](../../images/gestionperso/journal.jpg)

## Statistiques

Les statistiques rapprochent le temps prévu du temps renseigné sur sept jours. Elles présentent la répartition des activités, les tâches achevées ou partiellement avancées et les coûts associés. Le temps sans saisie apparaît comme non renseigné.

![Statistiques du temps prévu et réalisé sur les activités fictives](../../images/gestionperso/statistiques.jpg)

## Jouer

Cette vue propose des séances chronométrées pour les campagnes. Elle regroupe les tâches du jour, les jalons à confirmer et les notes de fin de séance. Les points suivent l’effort enregistré, tandis que les jalons suivent les résultats.

![Vue Jouer avec les créneaux du jour, les campagnes Stage et Spring et les étapes à confirmer](../../images/gestionperso/jouer.jpg)

## Construire

La carte permet de décomposer un objectif en tâches et de relier celles qui dépendent les unes des autres. Pour une recherche de stage, elle peut par exemple relier la préparation du CV, les candidatures et la préparation d’un entretien.

![Carte des objectifs et des dépendances entre tâches](../../images/gestionperso/carte-des-objectifs.jpg)

## Bachelier Dev

Onglet temporaire/spécifique à moi et espace regroupant les tâches du cursus par branche. Le menu ouvre directement les onglets temporaires **Intégration professionnelle**, et **Aide décisionnelle**, chacune étant des tâches majeures au moment des screenshots de l'ERP.

![Vue Bachelier Dev et organisation des tâches du cursus](../../images/gestionperso/bachelier.jpg)

## Permis

L’onglet **Permis** est présent dans la navigation des comptes habilités. Son écran est encore vide dans la version présentée.

## Finances

Le **Budget** regroupe par compte les recettes et dépenses liées aux actions. La vue **Flux d’argent** relie les montants saisis à leur provenance, au compte, à l’usage et à l’action correspondante. Le menu donne aussi accès aux **Comptes bancaires**, aux **Transactions** et aux **Abonnements**. Le rapprochement avec le registre des opérations bancaires reste manuel.

![Carte des flux de démonstration avec deux recettes et six dépenses](../../images/gestionperso/flux-argent.jpg)

![Budget de démonstration réparti sur deux comptes](../../images/gestionperso/budget.jpg)

## Comptes

Cet onglet rassemble les fiches de comptes d’accès à des services. Les comptes bancaires se consultent dans le menu Finances.

![Liste des comptes avec les noms et applications masqués](../../images/gestionperso/comptes.jpg)

## Contacts

Le répertoire permet de créer, de retrouver et de trier les fiches de contacts.

![Répertoire de contacts entièrement fictifs](../../images/gestionperso/contacts.jpg)

## Inventaire

L’inventaire rassemble les biens par personne. Chaque fiche peut préciser la catégorie, l’emplacement, l’état et la valeur déclarée du bien. Un objet peut être associé à une tâche ou à une action.

![Inventaire de démonstration avec trois objets fictifs](../../images/gestionperso/inventaire.jpg)

## Personnes

Le menu donne accès aux fiches des **Personnes du foyer** et à leurs **Routines**. La vue Routines reprend sur sept jours les tâches et les habitudes de la personne sélectionnée, à partir des mêmes données que l’agenda.

![Routines de la personne de démonstration](../../images/gestionperso/routines.jpg)

*Captures de démonstration avec des données fictives. Les noms et applications de la vue Comptes sont masqués.*
