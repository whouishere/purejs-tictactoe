// small service worker API
const sw = {
	preLoad: () => {
		console.log("Installing PWA...");
		return caches.open("offline").then((cache) => {
			console.log("Caching pages...");
			return cache.addAll(["/", "/offline.html"]);
		});
	}, 

	checkResponse: (request) => {
		return new Promise((fulfill, reject) => {
			fetch(request).then((response) => {
				if (response.status !== 404) {
					fulfill(response);
				} else {
					reject();
				}
			}, reject);
		});
	}, 

	addToCache: (request) => {
		return caches.open("offline").then((cache) => {
			return fetch(request).then((response) => {
				console.log(`${response.url} was cached.`);
				return cache.put(request, response);
			});
		});
	}, 

	returnFromCache: (request) => {
		return caches.open("offline").then((cache) => {
			return cache.match(request).then((matching) => {
				if (!matching || matching.status === 404) {
					return cache.match("offline.html");
				} else {
					return matching;
				}
			});
		});
	}
};

// make PWA installable
self.addEventListener("install", (event) => event.waitUntil(sw.preLoad()));

self.addEventListener("fetch", (event) => {
	event.respondWith(sw.checkResponse(event.request).catch(() => {
		return sw.returnFromCache(event.request);
	}));

	event.waitUntil(sw.addToCache(event.request));
});
