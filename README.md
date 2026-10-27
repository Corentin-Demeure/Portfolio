# Carnet ouvert

Portfolio statique en HTML, CSS et JavaScript. **Seules les notes sont écrites en Markdown.** GitHub Actions les transforme en HTML et publie le site à chaque push sur `main`.

Site : https://corentin-demeure.github.io/Portfolio/

## Modifier une note sur son PC

1. Ouvrir un fichier dans `notes/`, par exemple `notes/parcours-aerospatial.md`, avec un éditeur de texte.
2. Modifier le texte Markdown sous le bloc de métadonnées.
3. Enregistrer, committer et pousser sur `main` :

```sh
git add notes/
git commit -m "Mettre à jour mes notes"
git push
```

GitHub Actions reconstruit les pages, les tags et le catalogue de recherche, puis publie le résultat. Aucun HTML de note ni catalogue de recherche ne doit être modifié à la main. Les autres notes conservent leurs adresses `notes/<nom>/index.html`. Le fichier `notes/parcours-aerospatial.md` alimente directement `/Portfolio/Aerospace/`, unique page du portfolio aérospatial, sans miniature ni sous-menu.

Exemple :

```markdown
---
title: "Mon parcours dans l’aérospatial"
domain: "Aerospace"
tags: [aerospace, parcours]
eyebrow: "Aerospace / Parcours"
related: [satellites]
---

## Mon expérience

Un paragraphe avec du **gras**, de l’*italique* et un [lien](https://example.com).

![Ma classe dans l’ISS](../../images/iss-my-class.jpg)

- Une première idée
- Une deuxième idée
```

Le titre principal est généré depuis `title`. Les images restent dans `images/` ; leurs chemins sont relatifs à la page publiée, comme dans l’exemple. Un lien vers une autre source, `[Satellites](satellites.md)`, est automatiquement converti en lien HTML. `related` contient les noms de notes sans `.md`, pour les liens associés dans la colonne de droite.

## Ajouter une note

Créer `notes/mon-sujet.md` avec les métadonnées ci-dessus. Les domaines disponibles sont `Aerospace`, `Biomédical`, `Agronomie`, `Biologie spéculative`, `Travail manuel`, `Urbanisme & durabilité` et `Transversal`. La note est automatiquement publiée et ajoutée à la recherche. Pour l’ajouter aux cartes d’accueil et au menu, modifier aussi `index.html` et `templates/note.html`.

## Prévisualiser avant de pousser (facultatif)

Installer Node.js 24 et pnpm, puis :

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm preview
```

Ouvrir http://localhost:4173/Portfolio/. Relancer la prévisualisation après une modification. `pnpm build` produit les fichiers publiables dans `dist/`, qui n’est pas suivi par Git.

## Organisation

- `notes/*.md` : sources éditables des six notes.
- `templates/note.html` : mise en page commune des notes.
- `index.html` : accueil, cartes et navigation.
- `assets/style.css`, `assets/app.js`, `assets/search.js` : apparence et recherche.
- `images/` : photos et illustrations.
- `build.mjs` : conversion Markdown et catalogue de recherche.
- `generate-domain-pages.mjs` : pages des six domaines, reconstruites pendant le build.
- `.github/workflows/pages.yml` : tests, génération et publication automatique.

Les pages de domaine gardent leurs adresses : `/Portfolio/Aerospace/`, `/Portfolio/Biomedical/`, `/Portfolio/Agronomie/`, `/Portfolio/Biologie-speculative/`, `/Portfolio/Travail-manuel/` et `/Portfolio/Urbanisme/`. Les anciens liens `?domain=…` redirigent vers ces pages.

## Publication GitHub Pages

Dans `Corentin-Demeure/Portfolio` → Settings → Pages, la source doit être **GitHub Actions**. Le workflow publie uniquement `dist/` après avoir vérifié les pages et leurs liens.

## Recherche

La recherche porte sur le texte des notes et leurs tags. Exemples : `satellites`, `"passage à l’échelle"`, `#biologie`, `tag:biologie -tag:projet`. Les recherches restent partageables par URL ; Échap efface la recherche.

## Onglets vides à compléter

Seul le parcours aérospatial contient actuellement du texte, avec sa miniature dans Tout. Les cinq autres onglets lisent directement les fichiers Markdown ci-dessous ; écrire une phrase après le bloc `---` puis pousser suffit. Les fichiers vides ne sont pas affichés dans la recherche.

- Biomédical : `notes/biomedical.md`
- Agronomie : `notes/migration-craw.md`
- Biologie spéculative : `notes/biologie-speculative.md`
- Urbanisme : `notes/louvain-la-neuve.md`
- Travail manuel : `notes/travail-manuel.md`
