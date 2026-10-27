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
  assert.equal(pages.length, 7);
  for (const file of pages) {
    const html = fs.readFileSync(file,'utf8');
    assert.ok(!html.includes('{{'), file+' contains unresolved placeholders');
    for (const [,value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(?:[a-z]+:|\/\/|#)/i.test(value)) continue;
      const relative = decodeURIComponent(value.split(/[?#]/)[0]);
      assert.ok(fs.existsSync(path.resolve(path.dirname(file), relative)), `${file}: missing ${value}`);
    }
  }
  const aerospace = fs.readFileSync(path.join(output,'Aerospace/index.html'),'utf8');
  assert.match(aerospace, /<img src="..\/images\/iss-my-class.jpg"/);
  assert.match(aerospace, /id="années-2010"/);
  assert.match(aerospace, /href="..\/Aerospace\/"/);
  assert.ok(!fs.existsSync(path.join(output,'notes/satellites/index.html')));
  assert.ok(!fs.existsSync(path.join(output,'notes/parcours-aerospatial/index.html')));
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    assert.ok(!html.includes('Penser les satellites à l’échelle'));
    assert.ok(!html.includes('<summary>Aerospace</summary>'));
    if (file !== path.join(output, 'index.html')) assert.ok(!html.includes('class="media-card"'));
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
    assert.match(fs.readFileSync(path.join(output,'Aerospace/index.html'),'utf8'), /id="modification-de-vérification"/);
    assert.match(fs.readFileSync(path.join(output,'assets/notes.js'),'utf8'), /Markdown-autoupdate-9274/);
    assert.match(fs.readFileSync(path.join(output,'Aerospace/index.html'),'utf8'), /href="..\/Biomedical\/"/);
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
