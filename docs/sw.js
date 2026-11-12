const C='deadly-alliance-pages-v2';
const FILES=['./','./index.html','./manifest.json','./Deadly_Alliance_touch.html'];
self.addEventListener('install',event=>event.waitUntil(caches.open(C).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==C).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>event.respondWith(caches.match(event.request).then(response=>response||fetch(event.request))));
