const CACHE='fjellro-app-v2.0.1';
const ASSETS=['./','./index.html','./styles.css','./game-data.js','./app.js','./manifest.webmanifest','./assets/hotel.svg','./assets/library.svg','./assets/kitchen.svg','./assets/dining.svg','./assets/liv.svg','./assets/sander.svg','./assets/maja.svg','./assets/henrik.svg','./assets/app-icon.svg','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('fjellro-app-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  // Keep each installed release together. A new worker activates after the old
  // app's tabs close, with all its assets already present in the new cache.
  event.respondWith(caches.open(CACHE).then(async cache=>{
    const cached=await cache.match(event.request,{ignoreSearch:true});
    if(cached)return cached;
    if(event.request.mode==='navigate')return cache.match('./index.html');
    return fetch(event.request);
  }));
});
