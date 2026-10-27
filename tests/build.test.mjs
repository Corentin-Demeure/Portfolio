import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { build, output } from '../build.mjs';

test('Markdown notes produce working pages, navigation, images and search', () => {
  const notes = build();
  assert.equal(notes.length, 7);
  const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry => entry.isDirectory() ? walk(path.join(dir,entry.name)) : [path.join(dir,entry.name)]);
  const pages = walk(output).filter(file => file.endsWith('.html'));
  assert.equal(pages.length, 14);
  for (const file of pages) {
    const html = fs.readFileSync(file,'utf8');
    assert.ok(!html.includes('{{'), file+' contains unresolved placeholders');
    for (const [,value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(?:[a-z]+:|\/\/|#)/i.test(value)) continue;
      const relative = decodeURIComponent(value.split(/[?#]/)[0]);
      assert.ok(fs.existsSync(path.resolve(path.dirname(file), relative)), `${file}: missing ${value}`);
    }
  }
  const aerospace = fs.readFileSync(path.join(output,'notes/parcours-aerospatial/index.html'),'utf8');
  assert.match(aerospace, /<img src="..\/..\/images\/iss-my-class.jpg"/);
  assert.match(aerospace, /id="années-2010"/);
  assert.match(aerospace, /href="..\/..\/Aerospace\/"/);
  const sandbox = {window:{}};
  vm.runInNewContext(fs.readFileSync(path.join(output,'assets/notes.js'),'utf8'),sandbox);
  assert.equal(sandbox.window.PortfolioNotes.length, 7);
  assert.ok(sandbox.window.PortfolioNotes.some(note => note.text.includes('Eurospace')));
});

test('editing only Markdown updates the rendered note and search catalogue', () => {
  const source = new URL('../notes/satellites.md',import.meta.url);
  const original = fs.readFileSync(source,'utf8');
  try {
    fs.writeFileSync(source,original+'\n## Modification de vérification\n\nMarkdown-autoupdate-9274.\n\n[Autre note](biomedical.md)\n');
    build();
    assert.match(fs.readFileSync(path.join(output,'notes/satellites/index.html'),'utf8'), /id="modification-de-vérification"/);
    assert.match(fs.readFileSync(path.join(output,'assets/notes.js'),'utf8'), /Markdown-autoupdate-9274/);
    assert.match(fs.readFileSync(path.join(output,'notes/satellites/index.html'),'utf8'), /href="..\/biomedical\/index.html"/);
    fs.writeFileSync(source,original.replace('domain: "Aerospace"','domain: "Unknown"'));
    assert.throws(build,/Invalid title, domain or tags/);
  } finally {
    fs.writeFileSync(source,original);
    build();
  }
});
