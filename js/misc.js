// --- MISCELLANEOUS ---

/**
 * Initializes miscellaneous event listeners that don't fit into other categories.
 */
function initializeMisc() {
  // Atom image zoom
  const atomsImgContainer = document.getElementById('atomsImageContainer');
  if (atomsImgContainer) {
    atomsImgContainer.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        e.target.classList.toggle('zoomed');
      }
    });
  }

  // Ear health image zoom
  const earHealthImage = document.getElementById('earHealthImage');
  if (earHealthImage) {
    document.addEventListener('wheel', function(e) {
      if (!earHealthImage.closest('.page.active')) return;
      e.preventDefault();
      zoomLevel = e.deltaY < 0 ? zoomLevel + 0.1 : Math.max(0.5, zoomLevel - 0.1);
      earHealthImage.style.transform = `scale(${zoomLevel})`;
    }, { passive: false });
  }
}
