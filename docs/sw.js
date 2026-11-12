const C='deadly-alliance-pages-v3';
const FILES=['./','./index.html','./manifest.json','./Deadly_Alliance_touch.html'];
self.addEventListener('install',event=>event.waitUntil(caches.open(C).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==C).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET'||new URL(request.url).origin!==location.origin)return;
  event.respondWith(fetch(request).then(response=>{
    if(response.ok)caches.open(C).then(cache=>cache.put(request,response.clone()));
    return response;
  }).catch(()=>caches.match(request).then(response=>response||caches.match('./index.html'))));
});
