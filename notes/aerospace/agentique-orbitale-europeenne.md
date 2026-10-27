---
title: "Agentique orbitale européenne"
domain: "Aerospace"
tags: ["aerospacelab","agentics","cloud-computing"]
related: []
thumbnail: "images/iss-my-class.png"
---

L'agentique orbitale d'Aerospacelab ce serait l'équivalent de SpaceX Starmind.
Une fois des datacenters dans l'espace, il est possible d'avoir des swarms d'agents dans l'espace qui communique et se copie entre satellites sur différentes couches orbitales, comme un oignon. Pour comprendre l'intérêt d'avoir une large présence sur ces hautes orbites et orbites cislunaires, cette vidéo récente sur l'importance de l'espace cislunaire en politique étrangère américaine est pertinente. [](https://www.youtube.com/watch?v=kdpOdSMzXTA)

Déplacer les centres de calcul dans l’espace. Les puces ne devraient pas chercher à rester froides ; au contraire, elles devraient être conçues pour fonctionner à plein régime dans des conditions de forte chaleur. 
Dans le vide spatial, en l’absence d’air pour permettre la convection, le refroidissement des puces repose exclusivement sur le rayonnement thermique.
Elon Musk a déjà expliqué qu'en augmentant la température de fonctionnement de la puce de 20 % sur l’échelle Kelvin, on peut réduire de moitié le poids du système de refroidissement. D'ailleurs, une fois des GPUs dans l'espace, pluôt qu'utiliser des puces terrestrs il est préférable de redesigner des puces électroniques entièrement pour l'espace : qui soient très performantes qui tournent à haut températur mais moins efficacémnt. C'est pour ça que Nvidia s'est allié à SpaceX sur Starmind. 
En Belgique d'ici 2040-2050 c'est probablement possible avec IMEC et les petites entreprises se basant sur la technologie en aval d'IMEC.

Sur Terre, lorsque nous concevons des centres de données, on cherche toujorus à maximiser le refroidissement et garantir une précision totale des données. Les serveurs sont parfois immergés dans des liquides de refroidissement, tandis que les puces destinées à l’aérospatiale (très chères) sont équipées de lourds blindages anti-radiations pour empêcher les rayons cosmiques de transformer un 0 en 1: ce qui ferait planter tout le système instantanément.
Dans l'espace, comme l'a expliqué Elon Musk, ces deux règles n'existent plus avec des agents. Les logiciels traditionnels reposent sur des règles heuristiques rigides, une seule erreur dans un caractère, et c’est toute la ligne de code qui s’effondre. Je me souviens notamment de la complexité de réussir à réparer à distance les bugs de Voyager 2.
Mais sur un modèle massif doté de milliers de milliards de paramètres, si du bruit cosmique vient altérer quelque donnée, le modèle ne le sent même pas. La tolérance aux pannes est extrême.

Ainsi l'espace les hautes orbites terrestres sont un environnement qui nous seulement scale très bien point de vue énergétique mais aussi où le compute a  intérêt disproportionné à être utilisé par des LLMs que part du software classique.