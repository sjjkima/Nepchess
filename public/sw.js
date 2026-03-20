const CACHE_NAME = "nepchess-v1";

const urlsToCache = [
"/",
"/index.html",
"/bullet.html",
"/blitz.html",
"/game10min.html",
"/game30min.html",
"/game5min.html",
"/easyai.html",
"/mediumai.html",
"/interai.html",
"/masterai.html"
];

self.addEventListener("install", e=>{
e.waitUntil(
caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache))
);
});

self.addEventListener("fetch", e=>{
e.respondWith(
caches.match(e.request).then(res=>{
return res || fetch(e.request);
})
);
});