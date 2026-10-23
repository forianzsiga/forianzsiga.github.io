// Kill switch: elszamolos is no longer published on GitHub Pages.
// Browsers that installed the old PWA fetch this file on their next update
// check. It deletes the old offline copy (this app's Cache Storage entries
// only; IndexedDB data is left alone), unregisters itself and reloads, so the
// page falls through to GitHub's 404.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.includes('/elszamolos/')).map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((client) => client.navigate(client.url));
  })());
});