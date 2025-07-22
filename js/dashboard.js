// --- DASHBOARD ---

/**
 * Initializes dashboard-specific elements like the eyes/ears toggle switch.
 */
function initializeDashboard() {
  const goToDashboardBtn = document.getElementById('goToDashboardBtn');
  if (goToDashboardBtn) {
    goToDashboardBtn.addEventListener('click', goToDashboard);
  }

  const goToEarsDashboardBtn = document.getElementById('goToEarsDashboardBtn');
  if (goToEarsDashboardBtn) {
    goToEarsDashboardBtn.addEventListener('click', goToEarsDashboard);
  }

  const eyesSwitch = document.getElementById('eyesToEarsSwitch');
  if (eyesSwitch) {
    eyesSwitch.addEventListener('change', function() {
      if (this.checked) {
        showPage('earsDashboard');
      }
    });
  }

  const earsSwitch = document.getElementById('earsToEyesSwitch');
  if (earsSwitch) {
    earsSwitch.addEventListener('change', function() {
      if (!this.checked) {
        showPage('dashboard');
      }
    });
  }
}

/**
 * Updates the eyes/ears toggle switch based on the current dashboard page.
 * @param {string} pageId - The ID of the current page.
 */
function updateDashboardSwitch(pageId) {
  const eyesSwitch = document.getElementById('eyesToEarsSwitch');
  const earsSwitch = document.getElementById('earsToEyesSwitch');

  if (pageId === 'dashboard' && eyesSwitch) {
    eyesSwitch.checked = false;
  }

  if (pageId === 'earsDashboard' && earsSwitch) {
    earsSwitch.checked = true;
  }
}

/**
 * Navigates to the main (eyes) dashboard.
 */
function goToDashboard() {
  showPage('dashboard');
}

/**
 * Navigates to the ears dashboard.
 */
function goToEarsDashboard() {
  showPage('earsDashboard');
}
