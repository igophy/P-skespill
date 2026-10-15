const CACHE="fjellro-app-9f0106e5ceda8ddc";
const ASSETS=["./","./app.js","./assets/app-icon.svg","./assets/dining.svg","./assets/henrik.svg","./assets/hotel.svg","./assets/icon-192.png","./assets/icon-512.png","./assets/kitchen.svg","./assets/library.svg","./assets/liv.svg","./assets/maja.svg","./assets/sander.svg","./game-data.js","./index.html","./manifest.webmanifest","./styles.css"];
const UPGRADE_MARKER=new URL('__fjellro_upgrade__',self.registration.scope).href;
self.addEventListener('install',event=>{event.waitUntil((async()=>{
  const upgrading=!!self.registration.active;
  const cache=await caches.open(CACHE);
  await cache.addAll(ASSETS.map(path=>new Request(path,{cache:'reload'})));
  await cache.put(UPGRADE_MARKER,new Response(upgrading?'1':'0'));
  await self.skipWaiting();
})())});
// All game progress is saved immediately. Only an upgrade of an older worker
// reloads existing windows; a first installation leaves the new player alone.
self.addEventListener('activate',event=>{event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  const marker=await cache.match(UPGRADE_MARKER);
  const upgrading=marker&&await marker.text()==='1';
  await Promise.all((await caches.keys()).filter(key=>key.startsWith('fjellro-app-')&&key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
  if(upgrading){
    const tabs=await self.clients.matchAll({type:'window'});
    // Do not await navigation here: the navigation itself waits for activation.
    for(const tab of tabs.filter(tab=>tab.url.startsWith(self.registration.scope)))tab.navigate(tab.url).catch(()=>{});
  }
})())});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  // Serve one complete, precached release. Navigation never mixes versions.
  event.respondWith(caches.open(CACHE).then(async cache=>{
    const cached=await cache.match(event.request,{ignoreSearch:true});
    if(cached)return cached;
    if(event.request.mode==='navigate')return cache.match('./index.html');
    return fetch(event.request);
  }));
});
