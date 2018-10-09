importScripts('./appshell.js');

var AppShellCache = 'AppShellCache-v3';
var DynamicCache = 'DynamicCache-v3';

//var dontCacheRegExs = [/()/];

self.addEventListener('install', function (event) {
  console.log('[sw] install..');
  event.waitUntil(
    caches.open(AppShellCache)
      .then(function (cache) {
        console.log('[sw] precache AppShell');
        cache.addAll(AppShellFiles);
      })
  )
});

self.addEventListener('activate', function (event) {
  console.log('[sw] activate..', event);
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== AppShellCache && key !== DynamicCache) {
            console.log('[sw] remove old cache..', key);
            return caches.delete(key);
          }
        }));
    }));
  return self.clients.claim();
});


self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(res => {
        if (res) {
          console.log('[sw] from cache: ' + event.request.url);
          return res;
        } else {
          return fetch(event.request)
            .then(function (res) {
              console.log('[sw] net: ' + event.request.url);
              return caches.open(DynamicCache)
                .then(function (cache) {
                  cache.put(event.request, res.clone());
                  return res;
                });
            });
        }
      })
    );
});

var interval;
self.addEventListener('message', function(event){
    console.log("SW Received Message: " + event.data);
});