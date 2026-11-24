// Kill switch: haztartasos is not served from GitHub Pages; this path only
// redirects to the homelab app. A browser that installed an old Pages build
// fetches this file on its next update check. It deletes that build's
// offline copy (Cache Storage entries of this scope only), unregisters
// itself and reloads, so the page falls through to the redirect.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.includes('/haztartasos/') || k.startsWith('workbox-precache')).map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((client) => client.navigate(client.url));
  })());
});
