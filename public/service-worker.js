console.log('[sw] fired1');

self.addEventListener('install', function (event) {
  console.log('[sw] install', event);
});

self.addEventListener('activate', function (event) {
  console.log('[sw] activate', event);

  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {

  //console.log('[sw] fetch', event);

  // post
  // var url = 'https://pwagram-99adf.firebaseio.com/posts';

  // if (event.request.url.indexOf(url) > -1) {
  //   event.respondWith(fetch(event.request)
  //     .then(function (res) {
  //       var clonedRes = res.clone();
  //       clearAllData('posts')
  //         .then(function () {
  //           return clonedRes.json();
  //         })
  //         .then(function (data) {
  //           for (var key in data) {
  //             writeData('posts', data[key])
  //           }
  //         });
  //       return res;
  //     })
  //   );
  // } else if (isInArray(event.request.url, STATIC_FILES)) {
  //   event.respondWith(
  //     caches.match(event.request)
  //   );
  // } else {
  //   event.respondWith(
  //     caches.match(event.request)
  //       .then(function (response) {
  //         if (response) {
  //           return response;
  //         } else {
  //           return fetch(event.request)
  //             .then(function (res) {
  //               return caches.open(CACHE_DYNAMIC_NAME)
  //                 .then(function (cache) {
  //                   // trimCache(CACHE_DYNAMIC_NAME, 3);
  //                   cache.put(event.request.url, res.clone());
  //                   return res;
  //                 })
  //             })
  //             .catch(function (err) {
  //               return caches.open(CACHE_STATIC_NAME)
  //                 .then(function (cache) {
  //                   if (event.request.headers.get('accept').includes('text/html')) {
  //                     return cache.match('/offline.html');
  //                   }
  //                 });
  //             });
  //         }
  //       })
  //   );
  // }
});

