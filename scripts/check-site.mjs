import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
const root = new URL('../dist/', import.meta.url).pathname;
async function walk(dir){return (await readdir(dir,{withFileTypes:true})).flatMap(e=>e.isDirectory()?[]:[join(dir,e.name)]).concat(...await Promise.all((await readdir(dir,{withFileTypes:true})).filter(e=>e.isDirectory()).map(e=>walk(join(dir,e.name)))))}
const files=(await walk(root)).filter(f=>f.endsWith('.html')); const paths=new Set(files.map(f=>'/'+relative(root,f).replace(/index\.html$/,'').replaceAll('\\','/')));
const errors=[];
for(const file of files){const html=await readFile(file,'utf8'); for(const [,href] of html.matchAll(/href="([^"]+)"/g)){if(href.startsWith('/')&&!href.match(/\.[a-z]+$/i)&&!paths.has(href))errors.push(`${relative(root,file)} -> ${href}`)} if(!html.includes('<meta name="description"'))errors.push(`${relative(root,file)} has no description`)}
if(files.length!==9) errors.push(`expected 9 pages, found ${files.length}`); if(errors.length){console.error(errors.join('\n'));process.exit(1)} console.log(`Checked ${files.length} pages: internal links and metadata are valid.`);
