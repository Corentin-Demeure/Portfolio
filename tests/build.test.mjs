import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { build, output } from '../build.mjs';

test('Markdown notes produce working pages, navigation, images and search', () => {
  const notes = build();
  assert.ok(notes.length >= 6);
  const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry => entry.isDirectory() ? walk(path.join(dir,entry.name)) : [path.join(dir,entry.name)]);
  const pages = walk(output).filter(file => file.endsWith('.html'));
  assert.equal(pages.length, notes.length + 2);
  for (const file of pages) {
    const html = fs.readFileSync(file,'utf8');
    assert.ok(!html.includes('{{'), file+' contains unresolved placeholders');
    for (const [,value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(?:[a-z]+:|\/\/|#)/i.test(value)) continue;
      const relative = decodeURIComponent(value.split(/[?#]/)[0]);
      assert.ok(fs.existsSync(path.resolve(path.dirname(file), relative)), `${file}: missing ${value}`);
    }
  }
  const aerospace = fs.readFileSync(path.join(output,'Aerospace/Mon-parcours/index.html'),'utf8');
  assert.match(aerospace, /<img src="..\/..\/images\/(?:iss-my-class\.png|obsidian\/[a-f0-9]+\.png)"/);
  assert.match(aerospace, /Passion pour le spatial/);
  assert.match(aerospace, /href="..\/..\/Aerospace\/"/);
  assert.ok(!fs.existsSync(path.join(output,'notes/satellites/index.html')));
  assert.ok(!fs.existsSync(path.join(output,'notes/parcours-aerospatial/index.html')));
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    assert.ok(!html.includes('Penser les satellites à l’échelle'));
    assert.ok(!html.includes('<summary>Aerospace</summary>'));
    if (![path.join(output, 'index.html'), path.join(output, 'Aerospace/index.html')].includes(file)) assert.ok(!html.includes('class="media-card"'));
  }
  const sandbox = {window:{}};
  vm.runInNewContext(fs.readFileSync(path.join(output,'assets/notes.js'),'utf8'),sandbox);
  assert.equal(sandbox.window.PortfolioNotes.length, notes.filter(note => note.html.trim()).length);
  assert.ok(sandbox.window.PortfolioNotes.some(note => note.text.includes('Eurospace')));
});

test('editing only Markdown updates the rendered note and search catalogue', () => {
  const source = new URL('../notes/parcours-aerospatial.md',import.meta.url);
  const original = fs.readFileSync(source,'utf8');
  try {
    fs.writeFileSync(source,original+'\n## Modification de vérification\n\nMarkdown-autoupdate-9274.\n\n[Autre note](biomedical.md)\n');
    build();
    assert.match(fs.readFileSync(path.join(output,'Aerospace/Mon-parcours/index.html'),'utf8'), /id="modification-de-vérification"/);
    assert.match(fs.readFileSync(path.join(output,'assets/notes.js'),'utf8'), /Markdown-autoupdate-9274/);
    assert.match(fs.readFileSync(path.join(output,'Aerospace/Mon-parcours/index.html'),'utf8'), /href="..\/..\/Biomedical\/"/);
    fs.writeFileSync(source,original.replace('domain: "Aerospace"','domain: "Unknown"'));
    assert.throws(build,/Invalid title, domain or tags/);
  } finally {
    fs.writeFileSync(source,original);
    build();
  }
});

 test('empty domain Markdown stays blank and becomes visible when edited', () => {
 const source = new URL('../notes/biomedical.md', import.meta.url);
 const original = fs.readFileSync(source, 'utf8');
 try {
  build();
  const page = path.join(output, 'Biomedical/index.html');
  assert.match(fs.readFileSync(page, 'utf8'), /<article class="prose">\s*<\/article>/);
  fs.writeFileSync(source, original + '\nMa première phrase biomédicale.\n');
  build();
  assert.match(fs.readFileSync(page, 'utf8'), /Ma première phrase biomédicale/);
  assert.match(fs.readFileSync(path.join(output, 'assets/notes.js'), 'utf8'), /Ma première phrase biomédicale/);
 } finally { fs.writeFileSync(source, original); build(); }
});

test('aerospace cards link to the nested article and show the ISS class photo', () => {
 build();
 for (const page of ['index.html', 'Aerospace/index.html']) {
  const html = fs.readFileSync(path.join(output,page),'utf8');
  assert.match(html, /class="media-card"/);
  assert.match(html, /Aerospace\/Mon-parcours\//);
  assert.match(html, /images\/iss-my-class.png/);
  assert.match(html, /data-domain="Aerospace"[^>]*>Aérospatial<\/a>/);
 }
 const css = fs.readFileSync(path.join(output,'assets/style.css'),'utf8');
 assert.ok(css.includes('body .shell'));
});

test('every page includes the thin attribution footer and contact links', () => {
 build();
 const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
 for (const file of walk(output).filter(file => file.endsWith('.html'))) {
  const html = fs.readFileSync(file,'utf8');
  assert.equal((html.match(/class="site-footer"/g) || []).length, 1);
  assert.match(html, /creativecommons.org\/licenses\/by-nc\/4.0/);
  assert.match(html, /https:\/\/www.linkedin.com\/in\/demeure-corentin/);
  assert.match(html, /mailto:etu51424@henallux.be/);
  assert.match(html, /assets\/logos\/henallux.svg/);
 }
});

test('domain backgrounds publish without private medical content', () => {
 build();
 const html=fs.readFileSync(path.join(output,'Biomedical/index.html'),'utf8');
 assert.match(html, /<article class="prose">\s*<\/article>/);
 assert.ok(!fs.existsSync(path.join(output,'images/cs-3d-imaging-dents.png')));
 const catalogue=fs.readFileSync(path.join(output,'assets/notes.js'),'utf8');
 assert.ok(!catalogue.includes('radio dentaire'));
 const css=fs.readFileSync(path.join(output,'assets/style.css'),'utf8');
 assert.ok(css.includes('rgba(36, 57, 59, .95)'));
 assert.ok(css.includes('background-size: 100% 100%'));
 for (const photo of ['Midjourney-unveils-full-body-ultrasonic-scanner-aimed-at-transforming-medical-imaging.jpg','urbanana building slice.jpg']) assert.ok(fs.existsSync(path.join(output,'assets/photos',photo)));
});

test('article breadcrumbs replace the redundant return link', () => {
 build();
 const html=fs.readFileSync(path.join(output,'Aerospace/Mon-parcours/index.html'),'utf8');
 assert.ok(!html.includes('Retour au fil'));
 assert.match(html, /aria-label="Fil d’Ariane"><a href="..\/..\/Aerospace\/">Aerospace<\/a> \/ Essai<\/nav>/);
 for(const file of ['index.html','Aerospace/index.html','Biomedical/index.html']) {
  const page=fs.readFileSync(path.join(output,file),'utf8');
  assert.ok(!page.includes('Retour au fil'));
  if (file === "Biomedical/index.html") assert.match(page, /width="28" height="28" alt="" aria-hidden="true"/);
  else assert.ok(!page.includes('class="draft-notice"'));
 }
});

test('search snippets show matching context, phrases and safe literal text', () => {
 const context = {};
 vm.runInNewContext(fs.readFileSync(new URL('../assets/search.js', import.meta.url),'utf8'),context);
 const {searchSnippets,matchesQuery}=context.PortfolioSearch;
 const body='Introduction sans correspondance. '.repeat(30)+'Une station spatiale observe la Terre. '+'Autre paragraphe. '.repeat(30)+'Le satellite termine sa mission.';
 const note={title:'Essai',domain:'Aerospace',tags:['espace'],text:'Essai Aerospace '+body};
 const snippets=searchSnippets(note,'"station spatiale" satellite -absent tag:espace');
 assert.equal(snippets.length,2);
 assert.ok(snippets[0].some(s=>s.highlight && s.text==='station spatiale'));
 assert.ok(snippets[1].some(s=>s.highlight && s.text==='satellite'));
 assert.ok(snippets[0].map(s=>s.text).join('').startsWith('… '));
 assert.ok(snippets[0].map(s=>s.text).join('').length<280);
 assert.ok(matchesQuery(note,'"station spatiale" satellite -absent tag:espace'));
 assert.ok(searchSnippets(note,'tag:espace')[0].every(s=>!s.highlight));
 const literal={title:'Test',domain:'Aerospace',tags:[],text:'Test Aerospace <img src=x onerror=alert(1)> C++ et École'};
 const safe=searchSnippets(literal,'C++ ÉCOLE');
 assert.ok(safe[0].some(s=>s.highlight && s.text==='C++'));
 assert.ok(safe[0].some(s=>s.highlight && s.text==='École'));
 assert.ok(safe[0].map(s=>s.text).join('').includes('<img'));
 const overlap=searchSnippets({...literal,text:'C++ station spatiale'},'station "station spatiale"');
 assert.equal(overlap[0].filter(s=>s.highlight).length,1);
});
