// ==========================================
// 🛡️ Service Worker สำหรับ GitHub PWA Container
// ==========================================
const CACHE_NAME = 'court-bail-pwa-v1';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// ติดตั้ง Service Worker และบันทึกไฟล์แคชพื้นฐาน
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Cache addAll warning:', err);
      });
    })
  );
  self.skipWaiting();
});

// เคลียร์แคชเวอร์ชันเก่าเมื่อมีการอัปเดต
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// จัดการการเรียกข้อมูล (ดักจับ Fetch สำหรับ PWA Checker)
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // แคชเฉพาะไฟล์ที่อยู่บนโดเมน GitHub เดียวกัน (ไม่แคช iframe ของ Google Apps Script เพื่อให้ได้ข้อมูลเรียลไทม์เสมอ)
  if (requestUrl.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
    );
  }
});
