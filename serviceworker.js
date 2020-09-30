// self.addEventListener("install", async (event) => {
//   console.log("install event");
// });

// self.addEventListener("fetch", async (event) => {
//   console.log("fetch event");
// });
// const cacheName = "pwa-conf-v1";
// const staticAssets = [
//   "./",
//   "./index.html",
//   "./js/theinterestingfact.js",
//   "./js/canvas3.js",
//   "./css/theinterestingfact.css",
//   "./css/backgroundAnimation.css",
// ];
// self.addEventListener("install", async (event) => {
//   const cache = await caches.open(cacheName);
//   await cache.addAll(staticAssets);
// });

const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];
const self = this;
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhtitelist = [];
  cacheWhtitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheName) =>
      Promise.all(
        cacheName.map((cacheName) => {
          if (!cacheWhtitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
