const CACHE_NAME = "cache-v1";
const CACHE_STATIC_NAME = "static-v1";
const CACHE_INMUTABLE_NAME = "inmutable-v1";
const CACHE_DINAMYC_NAME = "dinamyc-v1";

function cleanCache(cacheName, sizeItems) {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length >= sizeItems) {
        cache.delete(keys[0]).then(() => {
          cleanCache(cacheName, sizeItems);
        });
      }
    });
  });
}

self.addEventListener("install", (event) => {
  const promesaCache = caches.open(CACHE_STATIC_NAME).then((cache) => {
    return cache.addAll([
      "./",
      "./index.html",
      "./css/page.css",
      "./images/inicio.jpg",
      "./js/app.js",
    ]);
  });

  const promesaInmutable = caches
    .open(CACHE_INMUTABLE_NAME)
    .then((cacheInmutable) => {
      return cacheInmutable.addAll([
        "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.js",
      ]);
    });

  event.waitUntil(Promise.all([promesaCache, promesaInmutable]));
});

self.addEventListener("fetch", (event) => {
  //2.-Cache with network
  //Busca cache y si no lo encuentra va a la red
  const respuestaCache = caches.match(event.request).then((resp) => {
    if (resp) {
      //responde cache

      return resp;
    }
    console.log("No esta en cache ", event.request.url);
    //voy a la red
    return fetch(event.request).then((respNet) => {
      caches.open(CACHE_DINAMYC_NAME).then((cache) => {
        cache.put(event.request, respNet).then(() => {
          cleanCache(CACHE_DINAMYC_NAME, 6);
        });
      });

      return respNet.clone();
    });
  });
  event.respondWith(respuestaCache);

  //1.-Cache only
  /*console.log(event.request)
    console.log(caches.match(event.request))
    event.respondWith(caches.match(event.request))*/
});
