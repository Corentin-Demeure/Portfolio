import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { generateDomainPages } from './generate-domain-pages.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const pageRoutes = {'parcours-aerospatial':'Aerospace/Mon-parcours', biomedical:'Biomedical', 'migration-craw':'Agronomie', 'biologie-speculative':'Biologie-speculative', 'louvain-la-neuve':'Urbanisme', 'travail-manuel':'Travail-manuel'};
const noteUrl = (slug, domain) => pageRoutes[slug] ? pageRoutes[slug]+'/' : domain === 'Aerospace' ? `Aerospace/${slug}/` : `notes/${slug}/index.html`;
export const output = path.join(root, 'dist');
const domains = {
  Aerospace: 'Aerospace', 'Biomédical': 'Biomedical', Agronomie: 'Agronomie',
  'Biologie spéculative': 'Biologie-speculative', 'Travail manuel': 'Travail-manuel',
  'Urbanisme & durabilité': 'Urbanisme', Transversal: '',
};
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const plain = html => html.replace(/<[^>]+>/g, ' ').replace(/&(?:amp|lt|gt|quot|#39);/g, entity => ({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"}[entity])).replace(/\s+/g, ' ').trim();

export function build() {
  const noteFiles = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? noteFiles(path.join(dir,e.name)) : e.name.endsWith('.md') ? [path.relative(path.join(root,'notes'),path.join(dir,e.name))] : []);
  const notes = noteFiles(path.join(root,'notes')).sort().map(name => {
    const {data, content} = matter(fs.readFileSync(path.join(root, 'notes', name), 'utf8'));
    if (typeof data.title !== 'string' || !data.title.trim() || !Object.hasOwn(domains, data.domain) || !Array.isArray(data.tags) || data.tags.some(tag => typeof tag !== 'string')) throw new Error(`Invalid title, domain or tags in ${name}`);
    if (data.related !== undefined && (!Array.isArray(data.related) || data.related.some(slug => typeof slug !== 'string'))) throw new Error(`Invalid related list in ${name}`);
    const slug = path.basename(name, '.md');
    if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`Invalid note filename: ${name}`);
    const ids = new Map();
    const markdown = new Marked({gfm: true, renderer: {
      heading({tokens, depth}) {
        const text = this.parser.parseInline(tokens);
        const base = plain(text).toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s+/g, '-');
        const count = ids.get(base) || 0; ids.set(base, count + 1);
        return `<h${depth} id="${escape(base + (count ? '-'+count : ''))}">${text}</h${depth}>\n`;
      },
      link({href, title, tokens}) {
        // Markdown sources may link to another .md; published links keep the old URLs.
        if (href && !/^(?:[a-z]+:|\/\/)/i.test(href)) href = href.replace(/(?:\.\.\/)?([a-z0-9-]+)\.md(?=[?#]|$)/, (_, slug) => '../../'+noteUrl(slug));
        return `<a href="${escape(href || '')}"${title ? ` title="${escape(title)}"` : ''}>${this.parser.parseInline(tokens)}</a>`;
      },
    }});
    const html = markdown.parse(content);
    return {...data, slug, html, text: data.title+' '+data.domain+' '+plain(html), url: noteUrl(slug, data.domain)};
  });
  if (!notes.length) throw new Error('No Markdown notes found.');
  const layout = fs.readFileSync(path.join(root, 'templates/note.html'), 'utf8');
  // Only clear this build's fixed output directory, contained in the project.
  if (path.dirname(output) !== root || path.basename(output) !== 'dist') throw new Error('Invalid output path');
  fs.rmSync(output, {recursive:true, force:true});
  fs.mkdirSync(output);
  for (const entry of ['index.html', 'assets', 'images', '.nojekyll', 'favicon.ico']) fs.cpSync(path.join(root, entry), path.join(output, entry), {recursive:true});
  const cards = notes.filter(note => note.html.trim() && note.url.split('/').filter(Boolean).length > 1).map(note => {
    const image = note.thumbnail || 'images/iss-my-class.png';
    if (!fs.existsSync(path.join(root, image))) throw new Error('Missing thumbnail: '+image);
    return '<article class="media-card" data-domain="'+escape(note.domain)+'"><div class="thumbnail"><a class="thumbnail-link" href="./'+note.url+'" aria-label="'+escape(note.title)+'"><img src="./'+escape(image)+'" alt="'+escape(note.thumbnailAlt || note.title)+'" loading="lazy"></a></div><div class="card-info"><h2><a href="./'+note.url+'">'+escape(note.title)+'</a></h2></div></article>';
  }).join('\n');
  const home = fs.readFileSync(path.join(output, 'index.html'), 'utf8').replace('<!-- NOTE_CARDS -->', cards);
  fs.writeFileSync(path.join(output, 'index.html'), home);
  generateDomainPages(output);
  for (const note of notes) {
    const tags = note.tags.map(tag => `<a href="../../index.html?q=${encodeURIComponent('tag:#'+tag.toLowerCase())}">#${escape(tag)}</a>`).join('');
    const related = (note.related || []).map(slug => {
      const target = notes.find(item => item.slug === slug);
      if (!target) throw new Error(`Unknown related note ${slug} in ${note.slug}`);
      return `<a class="related" href="../../${target.url}">${escape(target.title)} ↗</a>`;
    }).join('\n') || '<p>Pas encore de lien entrant.</p>';
    const domainUrl = '../../'+(domains[note.domain] ? domains[note.domain]+'/' : 'index.html');
    const category = (note.eyebrow || '').includes('/') ? (note.eyebrow || '').slice((note.eyebrow || '').indexOf('/') + 1).trim() : '';
    const breadcrumb = '<nav class="eyebrow breadcrumb" aria-label="Fil d’Ariane"><a href="'+domainUrl+'">'+escape(note.domain)+'</a>'+(category ? ' / '+escape(category) : '')+'</nav>';
    const values = {
      title: escape(note.title), description: escape(plain(note.html).slice(0, 160)),
      domainUrl: '../../'+(domains[note.domain] ? domains[note.domain]+'/' : 'index.html'),
      article: note.html.trim() ? `<nav class="note-tags" aria-label="Tags de la note">${tags}</nav>\n${breadcrumb}\n<h1>${escape(note.title)}</h1>\n${note.html}` : '',
      related,
    };
    let html = layout.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key]);
    html = html.replace(/<a\b[^>]*data-domain="([^"]*)"[^>]*>/g, (link, domain) => domain === escape(note.domain) ? link.replace('>', ' aria-current="page">') : link);
    html = html.replace(new RegExp(`(<a )(href="../../notes/${note.slug}/index.html")`), '$1class="selected" $2');
    if (note.url.endsWith('/') && note.url.split('/').filter(Boolean).length === 1) {
      html = html.replace(/<a class="back"[^>]*>[^<]*<\/a>/, '')
        .replaceAll('../../', '../');
    }
    if (!note.html.trim()) html = html.replace(/<aside class="connections">[\s\S]*?<\/aside>/, '');
    const dest = path.join(output, note.url, note.url.endsWith('/') ? 'index.html' : '');
    fs.mkdirSync(path.dirname(dest), {recursive:true}); fs.writeFileSync(dest, html);
  }
  const catalogue = notes.filter(note => note.html.trim()).map(({title,domain,tags,text,url}) => ({title,domain,tags,text,url}));
  fs.writeFileSync(path.join(output, 'assets/notes.js'), '// Generated from notes/*.md.\nwindow.PortfolioNotes = '+JSON.stringify(catalogue,null,2)+';\n');
  console.log(`Built ${notes.length} Markdown notes into dist/.`);
  return notes;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) build();
