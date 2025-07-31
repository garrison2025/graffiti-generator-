const CACHE_NAME = "brans-graffiti-v2"
const STATIC_CACHE = "static-v2"
const DYNAMIC_CACHE = "dynamic-v2"

// Critical resources to cache immediately
const STATIC_ASSETS = [
  "/",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/apple-touch-icon.png",
  "/favicon-32x32.png",
  "/favicon-16x16.png",
  "/favicon.ico",
  "/manifest.json",
]

// Install event - cache critical resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    }),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event - implement caching strategy
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle different types of requests
  if (request.method === "GET") {
    // Static assets - cache first
    if (STATIC_ASSETS.includes(url.pathname)) {
      event.respondWith(
        caches.match(request).then((response) => {
          return response || fetch(request)
        }),
      )
    }
    // Images - cache with fallback
    else if (request.destination === "image") {
      event.respondWith(
        caches.open(DYNAMIC_CACHE).then((cache) => {
          return cache.match(request).then((response) => {
            if (response) {
              return response
            }
            return fetch(request).then((fetchResponse) => {
              cache.put(request, fetchResponse.clone())
              return fetchResponse
            })
          })
        }),
      )
    }
    // API requests - network first
    else if (url.pathname.startsWith("/api/")) {
      event.respondWith(
        fetch(request).catch(() => {
          return caches.match(request)
        }),
      )
    }
    // Other requests - network first with cache fallback
    else {
      event.respondWith(
        fetch(request).catch(() => {
          return caches.match(request)
        }),
      )
    }
  }
})

// Background sync for offline functionality
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    event.waitUntil(
      // Handle background sync tasks
      console.log("Background sync triggered"),
    )
  }
})

// Push notifications (if needed in future)
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json()
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/android-chrome-192x192.png",
        badge: "/android-chrome-192x192.png",
      }),
    )
  }
})
