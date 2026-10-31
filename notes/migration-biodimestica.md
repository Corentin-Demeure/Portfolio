---
title: "Migration de Biodimestica - encyclopédie numérique botanique des variétés de fruits et légumes de Wallonie et Hauts de France"
domain: "Informatique de Gestion"
tags: ["django", "migration", "database", "wiki", "encyclopedie", "postgresql", "agronomy"]
related: []
thumbnail: "images/biodimestica/04-fiche.jpg"
thumbnailAlt: "Une fiche variétale de Biodimestica"
---

<p class="copy">Biodimestica rassemble un patrimoine dispersé : des variétés anciennes, leurs descriptions, leurs photographies et les savoir-faire qui les accompagnent. Mon travail de migration consiste à rendre ces informations consultables dans une application Django, en conservant les liens entre les données et les images.</p>
      <section id="decouvrir">
        <div class="copy"><h2>Un patrimoine à parcourir</h2><p>L’application conserve l’univers visuel de Biodimestica et organise la consultation autour de quelques entrées : fruits, légumes, agenda et bibliographie. Cette continuité donne un repère aux visiteurs qui connaissent déjà le site d’origine.</p></div>
        <figure><a href="../../images/biodimestica/01-accueil.jpg" target="_blank" rel="noopener" aria-label="Agrandir la figure 1 : accueil de Biodimestica"><img src="../../images/biodimestica/01-accueil.jpg" width="1264" height="1300" alt="Accueil de Biodimestica, avec son identité végétale et les entrées du menu principal." fetchpriority="high"></a><figcaption><strong>Figure 1 :</strong> L’accueil et la navigation principale de Biodimestica.</figcaption></figure>
        <p class="hint">Cliquer sur une illustration pour afficher la capture complète.</p>
      </section>
      <section class="chapter" id="catalogue">
        <div class="copy"><h2>Du catalogue à la recherche</h2><p>Le catalogue associe le nom de chaque variété à une photographie. Les filtres permettent de croiser l’espèce, la région, le terroir, l’usage du fruit ou encore ses caractéristiques gustatives et sa conservation. La liste est paginée pour garder la consultation lisible.</p><p>Ce même parcours sert de première aide à l’identification d’une pomme : on renseigne les caractères observés pour réduire les possibilités. Il accompagne l’observation, sans remplacer l’avis d’un spécialiste.</p></div>
        <figure class="catalogue"><a href="../../images/biodimestica/02-catalogue.jpg" target="_blank" rel="noopener" aria-label="Agrandir la figure 2 : catalogue et filtres"><img src="../../images/biodimestica/02-catalogue.jpg" width="1264" height="2112" alt="Catalogue des fruits : critères de sélection à gauche et grille de photographies de variétés à droite." loading="lazy"></a><figcaption><strong>Figure 2 :</strong> Le catalogue fruitier et ses filtres multicritères.</figcaption></figure>
        <div class="copy" style="margin-top:28px"><p>Lorsqu’on dispose déjà d’un nom, le champ de recherche offre un accès plus direct aux fiches. Ici, une recherche sur « Boskoop » retrouve les contenus où ce terme apparaît.</p></div>
        <figure class="compact"><a href="../../images/biodimestica/03-recherche.jpg" target="_blank" rel="noopener" aria-label="Agrandir la figure 3 : résultats de recherche"><img src="../../images/biodimestica/03-recherche.jpg" width="547" height="650" alt="Résultats de la recherche Boskoop, dont la fiche Belle de Boskoop." loading="lazy"></a><figcaption><strong>Figure 3 :</strong> La recherche textuelle, une autre porte d’entrée vers les variétés.</figcaption></figure>
      </section>
      <section class="chapter" id="fiches">
        <div class="copy"><h2>Une fiche pour relier les informations</h2><p>Chaque variété possède sa propre fiche : identité, synonymes, origine, terroirs, description du fruit, usages et caractéristiques de culture. Un sommaire permet de rejoindre directement la rubrique recherchée ; la galerie présente les photographies associées.</p><p>C’est l’un des enjeux de la migration : retrouver ensemble une variété, ses critères descriptifs et ses images, plutôt qu’une succession d’informations isolées.</p></div>
        <figure><a href="../../images/biodimestica/04-fiche.jpg" target="_blank" rel="noopener" aria-label="Agrandir la figure 4 : fiche de la variété A côtes"><img src="../../images/biodimestica/04-fiche.jpg" width="1265" height="712" alt="Fiche de la pomme A côtes, avec ses synonymes, son sommaire et sa galerie photographique." loading="lazy"></a><figcaption><strong>Figure 4 :</strong> La fiche « A côtes », son sommaire et sa galerie d’images.</figcaption></figure>
      </section>
      <section class="chapter" id="guides">
        <div class="copy"><h2>Les gestes du verger</h2><p>Le volet fruitier rassemble aussi des guides : choisir un arbre, sauvegarder une variété, greffer, planter ou tailler. Les textes illustrés et les liens vers des documents prolongent le catalogue par des conseils de terrain.</p></div>
        <figure><a href="../../images/biodimestica/05-guides.png" target="_blank" rel="noopener" aria-label="Agrandir la figure 5 : guide du verger"><img src="../../images/biodimestica/05-guides.png" width="996" height="658" alt="Guide du verger illustrant le choix du terrain et les distances de plantation." loading="lazy"></a><figcaption><strong>Figure 5 :</strong> Un extrait du guide consacré au choix du terrain et à l’espace disponible.</figcaption></figure>
      </section>
      <section class="chapter" id="legumes">
        <div class="copy"><h2>La place des variétés légumières</h2><p>Une rubrique distincte présente le patrimoine légumier régional et sa sauvegarde. Son catalogue donne accès aux variétés de légumes et à leurs fiches, dans la continuité du parcours proposé pour les fruits.</p></div>
        <figure class="legumes"><a href="../../images/biodimestica/06-legumes.jpg" target="_blank" rel="noopener" aria-label="Agrandir la figure 6 : catalogue des légumes"><img src="../../images/biodimestica/06-legumes.jpg" width="1264" height="3115" alt="Catalogue illustré des anciennes variétés de légumes de Biodimestica." loading="lazy"></a><figcaption><strong>Figure 6 :</strong> Le catalogue des variétés légumières.</figcaption></figure>
      </section>
      <section class="chapter" id="ressources">
        <div class="copy"><h2>Des rendez-vous et des références</h2><p>L’agenda propose une navigation par mois et un sélecteur de date pour consulter les événements, y compris passés. La bibliographie permet, de son côté, de retrouver des ouvrages à l’aide de filtres : patrimoine, espèce, type de publication, auteur, titre ou année.</p></div>
        <div class="pair">
          <figure><a href="../../images/biodimestica/07-agenda.jpg" target="_blank" rel="noopener" aria-label="Agrandir la figure 7 : agenda"><img src="../../images/biodimestica/07-agenda.jpg" width="547" height="650" alt="Agenda avec calendrier mensuel et sélection d’une date ; aucun événement n’est prévu pour le mois affiché." loading="lazy"></a><figcaption><strong>Figure 7 :</strong> L’agenda et sa navigation dans le calendrier. Le mois affiché ne contient aucun événement.</figcaption></figure>
          <figure class="bibliographie"><a href="../../images/biodimestica/08-bibliographie.jpg" target="_blank" rel="noopener" aria-label="Agrandir la figure 8 : bibliographie"><img src="../../images/biodimestica/08-bibliographie.jpg" width="1265" height="712" alt="Bibliothèque de Biodimestica avec ses filtres de recherche et ses notices bibliographiques." loading="lazy"></a><figcaption><strong>Figure 8 :</strong> La bibliothèque, ses filtres et ses notices bibliographiques.</figcaption></figure>
        </div>
      </section>
      <aside class="copy endnote"><h2>Ce que ce projet m’a demandé</h2><p>Au-delà de l’affichage, cette migration m’a amené à travailler sur la reprise des données, la correspondance des critères et le rattachement des photographies. L’objectif reste concret : permettre de passer d’un nom ou d’une observation à une fiche, puis aux ressources utiles pour comprendre la variété.</p><p class="meta">Repères techniques : Python · Django · PostgreSQL<br>Illustrations : captures de l’application Biodimestica.</p></aside>
