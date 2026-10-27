import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const domains = [
  ['Aerospace', 'Aerospace'],
  ['Biomédical', 'Biomedical'],
  ['Agronomie', 'Agronomie'],
  ['Biologie spéculative', 'Biologie-speculative'],
  ['Travail manuel', 'Travail-manuel'],
  ['Urbanisme & durabilité', 'Urbanisme'],
];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');

// Run after editing the home feed to refresh the six standalone domain pages.
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const [domain, slug] of domains) {
  let html = home.replace('<title>Notes</title>', `<title>${escape(domain)} — Notes</title>`)
    .replace('<main class="feed"', `<main data-domain="${escape(domain)}" class="feed"`)
    .replace(/<article class="media-card" data-domain="([^"]+)">[\s\S]*?<\/article>/g,
      (card, name) => name === escape(domain) ? card : '')
    .replace(/<section\b[^>]*data-domain-intro="([^"]+)"[\s\S]*?<\/section>/g,
      (section, name) => name === escape(domain) ? section.replace(/ hidden=""/g, '') : '')
    .replace(/<a\b[^>]*data-domain="([^"]*)"[^>]*>/g, (link, name) => {
      link = link.replace(/ aria-current="page"/g, '');
      return name === escape(domain) ? link.replace('>', ' aria-current="page">') : link;
    })
    .replace(/((?:href|src)="|poster=")\.\//g, '$1../');
  const directory = path.join(root, slug);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, 'index.html'), html);
}
console.log('Generated six domain pages.');
