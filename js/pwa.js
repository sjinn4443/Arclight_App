// --- PWA & OFFLINE ---

/**
 * Initializes Progressive Web App features like the install prompt and service worker.
 */
function initializePWA() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('installBtn');
    if (installBtn) installBtn.style.display = 'block';
  });

  const installBtn = document.getElementById('installBtn');
  if (installBtn) installBtn.addEventListener('click', handleInstallPrompt);

  // Register Service Worker
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then(reg => console.log('Service Worker registered successfully.', reg))
        .catch(err => console.error('Service worker registration failed: ', err));
    });
  } else {
    console.log('Service worker not registered (not on https or localhost).');
  }
}

/**
 * Handles the PWA installation prompt.
 */
async function handleInstallPrompt() {
  if (!deferredPrompt) {
    alert("App is already installed or this browser doesn't support installation.");
    return;
  }
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`User ${outcome} the install prompt.`);
  deferredPrompt = null;
  const installBtn = document.getElementById('installBtn');
  if (installBtn) installBtn.style.display = 'none';
  const installIconBtn = document.getElementById('installIconBtn');
  if (installIconBtn) installIconBtn.style.display = 'none';
}

/**
 * Shows the modal for selecting offline content.
 */
function showOfflineContentModal() {
  document.getElementById('offlineContentModal').style.display = 'flex';
}

/**
 * Closes the modal for selecting offline content.
 */
function closeOfflineContentModal() {
  document.getElementById('offlineContentModal').style.display = 'none';
}

document.querySelectorAll('.showOfflineContentModalBtn').forEach(btn => {
  btn.addEventListener('click', showOfflineContentModal);
});

const closeOfflineContentModalBtn = document.getElementById('closeOfflineContentModalBtn');
if (closeOfflineContentModalBtn) {
  closeOfflineContentModalBtn.addEventListener('click', closeOfflineContentModal);
}

const downloadSelectedAssetsBtn = document.getElementById('downloadSelectedAssetsBtn');
if (downloadSelectedAssetsBtn) {
  downloadSelectedAssetsBtn.addEventListener('click', downloadSelectedAssets);
}

/**
 * Downloads selected assets for offline use via the service worker.
 */
async function downloadSelectedAssets() {
  const selected = Array.from(document.querySelectorAll('#offlineContentModal input:checked')).map(cb => cb.value);
  const assetMap = {
    cataract: ['./cataractPage.html', './videos/Cataract.mp4'],
    visualAcuity: ['./visualAcuityPage.html', './videos/VisualAcuity.mp4'],
    // ... Add all other asset mappings here ...
  };

  const assetsToCache = selected.flatMap(key => assetMap[key] || []);
  if (assetsToCache.length === 0) {
    alert("No assets selected for download.");
    return;
  }

  try {
    const sw = await navigator.serviceWorker.ready;
    sw.active.postMessage({ type: 'CACHE_ASSETS', payload: assetsToCache });
    alert('Download started in the background.');
    closeOfflineContentModal();
  } catch (error) {
    console.error("Failed to send message to service worker:", error);
    alert("Could not start download. Service worker not ready.");
  }
}
