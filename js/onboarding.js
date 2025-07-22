// --- ONBOARDING & SPLASH SCREEN ---

/**
 * Initializes event listeners for the splash screen and onboarding process.
 */
function initializeOnboarding() {
  // Splash screen language selection
  window.addEventListener('load', () => {
    const languageBox = document.getElementById('languageContainer');
    setTimeout(() => {
      if (languageBox) languageBox.style.display = 'block';
    }, 5000); // Show after 5 seconds
  });

  const splashDropdown = document.getElementById('splashLanguageDropdown');
  if (splashDropdown) {
    splashDropdown.addEventListener('change', () => {
      const splash = document.getElementById('splashScreen');
      const onboarding = document.getElementById('onboarding');
      if (splash && onboarding) {
        splash.classList.add('fade-out');
        setTimeout(() => {
          splash.classList.remove('active', 'fade-out');
          onboarding.classList.add('active');
        }, 500);
      }
    });
  }

  // Onboarding form logic
  const completeOnboardingBtn = document.getElementById('completeOnboardingBtn');
  if (completeOnboardingBtn) {
    completeOnboardingBtn.addEventListener('click', completeOnboarding);
  }

  const fieldSelect = document.getElementById('fieldSelect');
  if (fieldSelect) {
    fieldSelect.addEventListener('change', handleFieldSelection);
  }

  const jobSelect = document.getElementById('jobSelect');
  if (jobSelect) {
    jobSelect.addEventListener('change', () => {
      const studentYearSelect = document.getElementById('studentYearSelect');
      if (studentYearSelect) {
        studentYearSelect.classList.toggle('hidden', jobSelect.value !== "Medical Student");
      }
    });
  }
}

/**
 * Handles the logic for completing the onboarding form.
 */
function completeOnboarding() {
  const username = document.getElementById('username').value;
  const job = document.getElementById('jobSelect').value;
  const language = document.getElementById('splashLanguageDropdown').value;

  if (!username || !job || !language || language === "What's your preferred language?") {
    alert("Please complete all fields.");
    return;
  }

  alert("Welcome! You're now registered to Arclight Eye and Ear Care App!");
  showPage('selectModule');
}

/**
 * Populates the job role dropdown based on the selected field.
 */
function handleFieldSelection() {
  const fieldSelect = document.getElementById('fieldSelect');
  const jobSelect = document.getElementById('jobSelect');
  const studentYearSelect = document.getElementById('studentYearSelect');
  const selectedField = fieldSelect.value;

  // Hide all optgroups first
  jobSelect.querySelectorAll('optgroup').forEach(optgroup => {
    optgroup.style.display = 'none';
  });

  // Show the relevant optgroup
  const optgroupToShow = jobSelect.querySelector(`optgroup[label="${selectedField.charAt(0).toUpperCase() + selectedField.slice(1)}"]`);
  if (optgroupToShow) {
    optgroupToShow.style.display = 'block';
  }

  jobSelect.value = ""; // Reset selection
  jobSelect.classList.remove('hidden');
  studentYearSelect.classList.add('hidden');
}
