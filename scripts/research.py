import concurrent.futures, json, re, urllib.request, pathlib
from html.parser import HTMLParser
from urllib.parse import urljoin
ROOT=pathlib.Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self):
  super().__init__(); self.hidden=0; self.parts=[]; self.links=[]; self.images=[]; self.anchor=None
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t in ('script','style','noscript'): self.hidden+=1
  if t in ('p','div','h1','h2','h3','li','br','section'): self.parts.append('\n')
  if t=='a' and a.get('href'): self.anchor={'href':a['href'],'text':''}; self.links.append(self.anchor)
  if t=='img': self.images.append({'src':a.get('data-original') or a.get('src'),'alt':a.get('alt','')})
 def handle_endtag(self,t):
  if t in ('script','style','noscript'): self.hidden=max(0,self.hidden-1)
  if t=='a': self.anchor=None
  if t in ('p','div','h1','h2','h3','li','section'): self.parts.append('\n')
 def handle_data(self,data):
  if not self.hidden:
   self.parts.append(data)
   if self.anchor is not None: self.anchor['text']+=data
 def text(self): return '\n'.join(x.strip() for x in ''.join(self.parts).splitlines() if x.strip())
def get(url):
 try:
  html=urllib.request.urlopen(url,timeout=20).read().decode('utf-8')
  name=url.split('rkrs.ru')[-1].strip('/').replace('/','--') or 'index'
  pathlib.Path('/tmp/rakurs-crawl').mkdir(exist_ok=True)
  pathlib.Path('/tmp/rakurs-crawl',name+'.html').write_text(html)
  p=Page();p.feed(html)
  title=re.search(r'<title>(.*?)</title>',html,re.S)
  item={'url':url,'title':title.group(1) if title else '', 'text':p.text(),'links':p.links,'images':p.images}
  (ROOT/'docs/research'/f'{name}.md').write_text(f'# {item["title"]}\n\nИсточник: {url}\n\n'+item['text'])
  return item
 except Exception as e: return {'url':url,'error':str(e)}
urls=re.findall(r'<loc>(.*?)</loc>',pathlib.Path('/tmp/rakurs-sitemap.html').read_text())
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool: pages=list(pool.map(get,urls))
(ROOT/'docs/research/pages.json').write_text(json.dumps(pages,ensure_ascii=False,indent=2))
for p in pages: print(p['url'],p.get('title',p.get('error')),len(p.get('text','')))
