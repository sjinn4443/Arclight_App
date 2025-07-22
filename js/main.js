// --- CORE INITIALIZATION ---

/**
 * Main entry point for the application.
 * Attaches all necessary event listeners when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  initializePageNavigation();
  initializeOnboarding();
  initializeDashboard();
  initializeLearningModules();
  initializeTOC();
  initializeToolbar();
  initializePWA();
  initializeQuizzes();
  initializeVideoPlayers();
  initializeMisc();

  // Set the initial page to be the splash screen.
  showPage('splashScreen');
});
