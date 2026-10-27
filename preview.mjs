import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { output, build } from './build.mjs';
build();
http.createServer((req,res) => {
  const url = new URL(req.url,'http://localhost');
  if (url.pathname === '/') {res.writeHead(302,{Location:'/Portfolio/'}).end();return;}
  if (!url.pathname.startsWith('/Portfolio/')) {res.writeHead(404).end();return;}
  const file = path.resolve(output, '.'+decodeURIComponent(url.pathname.slice('/Portfolio'.length)));
  if (!file.startsWith(output+path.sep) || !fs.existsSync(file)) {res.writeHead(404).end();return;}
  let target = file;
  if (fs.statSync(file).isDirectory()) {
    if (!url.pathname.endsWith('/')) {res.writeHead(301,{Location:url.pathname+'/'+url.search}).end();return;}
    target=path.join(file,'index.html');
  }
  if (!fs.existsSync(target)) {res.writeHead(404).end();return;}
  res.setHeader('Content-Type', {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg'}[path.extname(target)] || 'application/octet-stream');
  res.end(fs.readFileSync(target));
}).listen(4173,'127.0.0.1',()=>console.log('Preview: http://localhost:4173/Portfolio/ (restart after editing notes)'));
