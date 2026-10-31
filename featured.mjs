import fs from 'node:fs';
import path from 'node:path';
import { selectArticles } from './article-selection.mjs';
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function featuredSelection(root,notes){
 return domain=>{
  const chosen=selectArticles(notes, domain);
  if(!chosen.length)return '';
  const slides=chosen.map((n,i)=>{
   const image=n.thumbnail||'images/iss-my-class.png';if(!fs.existsSync(path.join(root,image)))throw Error('Missing featured image: '+image);
   return '<article class="featured-slide" data-feature-slide'+(i?' hidden':'')+'><a class="featured-picture" href="./'+esc(n.url)+'"><img src="./'+esc(image)+'" alt="'+esc(n.thumbnailAlt||n.title)+'"'+(i?' loading="lazy"':' fetchpriority="high"')+'></a><div class="featured-caption"><h2><a href="./'+esc(n.url)+'">'+esc(n.title)+'</a></h2><p class="article-byline">Corentin Demeure</p><a class="featured-read" href="./'+esc(n.url)+'">Lire l’article →</a></div></article>';
  }).join('');
  const thumbs=chosen.map((n,i)=>'<button type="button" data-feature-index="'+i+'" aria-label="Afficher : '+esc(n.title)+'" aria-pressed="'+!i+'"><img src="./'+esc(n.thumbnail||'images/iss-my-class.png')+'" alt="" loading="lazy"></button>').join('');
  return '<section class="featured-carousel" aria-label="Articles à la une" aria-roledescription="carrousel"><div class="featured-stage">'+slides+'</div><div class="featured-controls" hidden><button type="button" data-feature-step="-1" aria-label="Article précédent">←</button><span class="featured-count" aria-live="polite">1 / '+chosen.length+'</span><div class="featured-thumbs">'+thumbs+'</div><button type="button" data-feature-step="1" aria-label="Article suivant">→</button></div></section>';
 };
}
