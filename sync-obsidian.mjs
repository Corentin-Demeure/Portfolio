import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const source=process.env.OBSIDIAN_PORTFOLIO || 'C:/Liberté/Ecole/Carnet diaristique et Notes/Projects/Portfolio';
const vault=path.resolve(source,'../..');
const domains={aerospace:'Aerospace',biomedical:'Biomédical',agronomie:'Agronomie','biologie-speculative':'Biologie spéculative','travail-manuel':'Travail manuel',urbanisme:'Urbanisme & durabilité'};
const slug=s=>s.normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name.startsWith('.')?[]:e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
export function sync(){
 if(!fs.existsSync(source)) throw Error('Source Obsidian introuvable : '+source);
 const manifestPath=path.join(root,'.obsidian-import.json');
 const previous=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath,'utf8')):{};
 const planned=[]; const assets=new Map(); const warnings=[];
 const all=walk(vault); const imageFor=ref=>{
  const name=ref.split('|')[0].split('#')[0].trim();
  const matches=all.filter(p=>path.relative(vault,p).replaceAll('\\','/')===name || path.basename(p)===name);
  if(matches.length!==1) throw Error('Image absente ou ambiguë : '+name);
  const ext=path.extname(matches[0]).toLowerCase();
  if(!['.png','.jpg','.jpeg','.gif','.webp','.svg','.avif'].includes(ext)) throw Error('Format de miniature non pris en charge : '+name);
  const bytes=fs.readFileSync(matches[0]); const dest='images/obsidian/'+hash(bytes).slice(0,20)+ext;
  assets.set(dest,bytes); return dest;
 };
 for(const entry of fs.readdirSync(source,{withFileTypes:true})){
  if(!entry.isDirectory() || !/^Portfolio-/i.test(entry.name)) continue;
  const tab=slug(entry.name.replace(/^Portfolio-/i,''));
  if(!domains[tab]) {warnings.push('Onglet non configuré : '+entry.name);continue;}
  for(const file of walk(path.join(source,entry.name)).filter(p=>p.endsWith('.md'))){
   const title=path.basename(file,'.md'); const lines=fs.readFileSync(file,'utf8').replace(/^\uFEFF/,'').split(/\r?\n/);
   const hasTags=/^\s*#[^\s#]+/.test(lines[0]) && !/^#\s/.test(lines[0]);
   const tags=hasTags?[...lines[0].matchAll(/#([^\s#]+)/g)].map(m=>m[1]):[tab];
   let body=(hasTags?lines.slice(1):lines).join('\n');
   const thumbLine=hasTags?lines[1]||'':'';
   const wiki=thumbLine.match(/^\s*!?\[\[([^\]]+)\]\]\s*$/);
   const md=thumbLine.match(/^\s*!?\[[^\]]*\]\(([^)]+)\)\s*$/);
   let thumbnail='images/iss-my-class.png';
   if(wiki) thumbnail=imageFor(wiki[1]);
   else if(md && !/^https?:/i.test(md[1])) thumbnail=imageFor(decodeURI(md[1]));
   else warnings.push('Miniature par défaut : '+title);
   body=body.replace(/!\[\[([^\]]+)\]\]/g,(_,ref)=>'!['+ref.split('|')[0]+'](../../'+imageFor(ref)+')');
   const id=slug(title); const relative='notes/'+tab+'/'+id+'.md';
   const metadata={title,domain:domains[tab],tags,related:[],thumbnail};
   const content='---\n'+Object.entries(metadata).map(([k,v])=>k+': '+JSON.stringify(v)).join('\n')+'\n---\n\n'+body;
   if(planned.some(p=>p.relative===relative)) throw Error('Collision de noms : '+relative);
   const dest=path.join(root,relative);
   if(fs.existsSync(dest) && hash(fs.readFileSync(dest))!==previous[relative] && fs.readFileSync(dest,'utf8')!==content) throw Error('Copie modifiée localement, import arrêté : '+relative);
   planned.push({relative,content});
  }
 }
 for(const [relative,bytes] of assets){const dest=path.join(root,relative);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,bytes);}
 const next={...previous};
 for(const {relative,content} of planned){const dest=path.join(root,relative);fs.mkdirSync(path.dirname(dest),{recursive:true});if(!fs.existsSync(dest)||fs.readFileSync(dest,'utf8')!==content)fs.writeFileSync(dest,content);next[relative]=hash(content);}
 fs.writeFileSync(manifestPath,JSON.stringify(next,null,2)+'\n');
 for(const stale of Object.keys(previous).filter(p=>!planned.some(n=>n.relative===p)))warnings.push('Ancienne copie conservée, source absente : '+stale);
 console.log(planned.length+' notes importées ; '+assets.size+' images.'); warnings.forEach(w=>console.warn(w));
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 sync();
 if(process.argv.includes('--watch')){ console.log('Surveillance Obsidian active (Ctrl+C pour arrêter).'); let running=false; setInterval(()=>{if(running)return;running=true;try{sync();}catch(e){console.error(e.message);}finally{running=false;}},5000); }
}
