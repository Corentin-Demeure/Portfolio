import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { build, output } from '../build.mjs';

test('Markdown notes produce working pages, navigation, images and search', () => {
  const notes = build();
  assert.equal(notes.length, 6);
  const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry => entry.isDirectory() ? walk(path.join(dir,entry.name)) : [path.join(dir,entry.name)]);
  const pages = walk(output).filter(file => file.endsWith('.html'));
  assert.equal(pages.length, 8);
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
  assert.match(aerospace, /<img src="..\/..\/images\/iss-my-class.png"/);
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
  assert.equal(sandbox.window.PortfolioNotes.length, 1);
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
 assert.ok(!css.includes('body:has('));
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
