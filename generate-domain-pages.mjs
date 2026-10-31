import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceRoot = path.dirname(fileURLToPath(import.meta.url));
const domains = [
  ['Aerospace', 'Aerospace'],
  ['Biomédical', 'Biomedical'],
  ['Agronomie', 'Agronomie'],
  ['Biologie spéculative', 'Biologie-speculative'],
  ['Informatique de Gestion', 'Informatique-de-gestion'],
  ['Projets techniques', 'Travail-manuel'],
  ['Biologie spéculative', 'Biologie-speculative'],
  ['Urbanisme & durabilité', 'Urbanisme'],
];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');

// Run after editing the home feed to refresh the standalone domain pages.
export function generateDomainPages(root = sourceRoot, renderFeatured = () => '', renderCards = () => '') {
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const [domain, slug] of domains) {
  let html = home.replace('<title>Portfolio</title>', `<title>${escape(domain === "Aerospace" ? "Aérospatial" : domain)}</title>`)
    .replace('<!-- FEATURED_ARTICLES -->', renderFeatured(domain))
    .replace('<!-- NOTE_CARDS -->', '<!-- DOMAIN_INTRO -->'+renderCards(domain))
    .replace('<main class="feed"', `<main data-domain="${escape(domain)}" class="feed"`)
    .replace(/<article class="media-card" data-domain="([^"]+)">[\s\S]*?<\/article>/g,
      (card, name) => name === escape(domain) ? card : '')
    .replace(/<section\b[^>]*data-domain-intro="([^"]+)"[\s\S]*?<\/section>/g,
      (section, name) => name === escape(domain) ? section.replace(/ hidden=""/g, '') : '')
    .replace(/<section\b[^>]*data-featured-domain="([^"]+)"[\s\S]*?<\/section>/g, (section, name) => name === escape(domain) ? section : '')
    .replace(/<a\b[^>]*data-domain="([^"]*)"[^>]*>/g, (link, name) => {
      link = link.replace(/ aria-current="page"/g, '');
      return name === escape(domain) ? link.replace('>', ' aria-current="page">') : link;
    })
    .replace(/((?:href|src)="|poster=")\.\//g, '$1../');
  if (domain === 'Aerospace') html = html.replace(/\s*<aside class="draft-notice"[^>]*>[\s\S]*?<\/aside>/, '');
  const directory = path.join(root, slug);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), html);
}
console.log('Generated domain pages.');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) generateDomainPages();
