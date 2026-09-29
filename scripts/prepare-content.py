import json,re,pathlib,urllib.request,concurrent.futures
from urllib.parse import urljoin,parse_qs,urlparse
root=pathlib.Path(__file__).resolve().parents[1]
pages=json.loads((root/'docs/research/pages.json').read_text())
slugs=['kontrol-aktivnosti','duble','docs','analytic','raspred','telegram','cvetnye-sdelki','grouping-fields','dadata','status','first-call','processes','leads_copying','timeclient','notetotelegram','whatsapp','polya','search-in-list-field','adres-na-karte','fields-copying']
widgets=[]
for slug in slugs:
 p=next(p for p in pages if p['url'].endswith('/'+slug));t=p['text'];lines=t.splitlines()
 category='free' if 'Стоимость: бесплатно' in t else ('pro' if slug in slugs[:4] else 'top')
 price=next((l.replace('Стоимость: ','') for l in lines if l.startswith('Стоимость:')),'По запросу')
 links=p['links'];install=next((l['href'] for l in links if 'oauth?' in l['href']),None)
 if install and 'google.com/url' in install: install=parse_qs(urlparse(install).query).get('q',[install])[0]
 instruction=next((urljoin('https://rkrs.ru/',l['href']) for l in links if 'Инструкция' in l['text']),None)
 # Labels follow their paragraphs on the original Tilda pages.
 before=t.split('Стоимость:',1)[-1].split('КАК УСТАНОВИТЬ?')[0]
 chunks=re.split(r'\n(Проблема|Задача|Решение)\n?',before)
 sections={}
 for i in range(1,len(chunks),2):
  val=chunks[i-1].strip()
  if i==1:
   paragraphs=val.splitlines(); val=paragraphs[-1] if paragraphs else val
  sections[chunks[i]]=val
 start=lines.index(next(l for l in lines if l.startswith('Стоимость:')))+1
 description=next((l for l in lines[start:] if len(l)>90 and not l.startswith('Протестируйте')),'')
 if slug=='kontrol-aktivnosti': price='6 000 ₽ / год за сотрудника'
 widgets.append({'slug':slug,'title':p['title'],'category':category,'price':price,'description':description,'install':install,'instruction':instruction,'sections':sections,'source':p['url']})
legal={}
for slug in ['policy','oferta']:
 p=next(p for p in pages if p['url'].endswith('/'+slug));lines=p['text'].splitlines();legal[slug]=lines
instructions=[]
for p in pages:
 if p['url'].endswith('-instruction'):
  lines=p['text'].splitlines();start=next((i for i,l in enumerate(lines) if i>10 and ('Инструкция' in l or 'ИНСТРУКЦИЯ' in l)),14)
  end=next((i for i,l in enumerate(lines) if i>start and '+7 (921) 437-78-86' in l),len(lines))
  instructions.append({'slug':p['url'].split('/')[-1],'title':p['title'],'lines':lines[start:end],'source':p['url']})
(root/'src/data/site-data.json').write_text(json.dumps({'widgets':widgets,'legal':legal,'instructions':instructions},ensure_ascii=False,indent=2))
assets={'founder.jpg':'https://ka.rkrs.ru/img/founder.jpg','activity-hero.jpg':'https://ka.rkrs.ru/shots/opt/hero.jpg','activity-full.png':'https://ka.rkrs.ru/shots/opt/full.png','activity-events.jpg':'https://ka.rkrs.ru/shots/opt/events.jpg'}
def dl(item):
 name,url=item
 try:
  data=urllib.request.urlopen(url).read();(root/'public/assets'/name).write_bytes(data);return name,len(data)
 except Exception as e:return name,str(e)
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: print(list(pool.map(dl,assets.items())))
css=urllib.request.urlopen(urllib.request.Request('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',headers={'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'})).read().decode()
urls=list(dict.fromkeys(re.findall(r'url\((.*?)\)',css)))
for i,url in enumerate(urls):
 ext=url.split('.')[-1];name=f'inter-subset-{i}.{ext}';(root/'public/assets'/name).write_bytes(urllib.request.urlopen(url).read());css=css.replace(url,'/assets/'+name)
(root/'src/fonts.css').write_text(css)
print('Prepared',len(widgets),'widgets and',len(instructions),'instructions')
