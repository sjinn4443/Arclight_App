// --- PAGE NAVIGATION ---

/**
 * Handles all page switching logic.
 * @param {string} pageId - The ID of the page element to display.
 * @param {boolean} [skipHistory=false] - If true, the current page will not be added to the history stack.
 */
function showPage(pageId, skipHistory = false) {
  const currentActive = document.querySelector('.page.active');
  if (currentActive && currentActive.id !== pageId && !skipHistory) {
    pageHistory.push(currentActive.id);
  }

  // Pause all videos when switching pages.
  document.querySelectorAll('video').forEach(video => {
    if (!video.paused) {
      video.pause();
    }
  });

  // Hide all pages, then show the target page.
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  const pageToShow = document.getElementById(pageId);
  if (pageToShow) {
    pageToShow.classList.add('active');
  }

  updateTitleBar(pageId);
  updateDashboardSwitch(pageId);
  updateBottomNavBar(pageId);
}

/**
 * Initializes general page navigation buttons like the global back and home buttons.
 */
function initializePageNavigation() {
  const backBtnGlobal = document.getElementById('backBtnGlobal');
  if (backBtnGlobal) {
    backBtnGlobal.addEventListener('click', () => {
      if (pageHistory.length > 0) {
        const prevPage = pageHistory.pop();
        showPage(prevPage, true); // `true` to prevent pushing the page back to history
      } else {
        showPage('dashboard'); // Fallback to dashboard
      }
    });
  }

  const homeBtn = document.getElementById('homeBtn');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => showPage('dashboard'));
  }
}

/**
 * Shows or hides the main title bar based on the current page.
 * @param {string} pageId - The ID of the current page.
 */
function updateTitleBar(pageId) {
  const hideTitleBarPages = ['splashScreen', 'registerPage'];
  const titleBar = document.getElementById('titleBar');
  const spacer = document.getElementById('titleBarSpacer');

  if (titleBar && spacer) {
    const shouldHide = hideTitleBarPages.includes(pageId);
    titleBar.style.display = shouldHide ? 'none' : 'flex';
    spacer.style.display = shouldHide ? 'none' : 'block';
  }
}

/**
 * Updates the state and visibility of the bottom navigation bar (Home/Back buttons).
 * @param {string} pageId - The ID of the current page.
 */
function updateBottomNavBar(pageId) {
  const homeBtnContainer = document.getElementById('homeButtonContainer');
  searchContainer = document.getElementById('fixedSearchContainer');

  const showHomePages = [
    'dashboard', 'earsDashboard', 'learningModules', 'coreClinicalOphthalmicExamination',
    'diseasesPage', 'arclightPage', 'childhoodEyeScreeningPage', 'howToUseArclightVideoPage',
    'directOphthalmoscopy', 'atomsCardPage', 'anteriorSegmentQuizPage', 'frontOfEyePage',
    'anteriorSegmentVideoPage', 'pupilsPage', 'rapdTestPage',
    'pupilExamPECPage', 'pupilPathwaysPage', 'howToArclightPage', 'assessmentVisionPage',
    'normalAbnormalPage', 'earsLearningModules', 'otoscopyPage', 'earHealthPage',
    'howToExamineEarPage', 'earConditionsPage', 'earFlowchartPage', 'pupilFullExamPage',
    'rapdPage', 'rapdTestVideoPage', 'phoneAttachmentVideoPage', 'visualAcuityPage',
    'fundalReflexPage', 'interactiveLearningPage', 'miresPage', 'morphPage',
    'squintPalsyPage', 'cataractPage',
  ];

  const shouldShowNav = showHomePages.includes(pageId);
  if (homeBtnContainer) homeBtnContainer.style.display = shouldShowNav ? 'flex' : 'none';
  if (searchContainer) {
    searchContainer.style.display = ['dashboard', 'earsDashboard'].includes(pageId) ? 'block' : 'none';
  }
}
