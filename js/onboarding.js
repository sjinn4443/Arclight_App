// --- ONBOARDING & SPLASH SCREEN ---

/**
 * Initializes event listeners for the splash screen and onboarding process.
 */
function initializeOnboarding() {
  // Splash screen transition
  window.addEventListener('load', () => {
    const splash = document.getElementById('splashScreen');
    const onboarding = document.getElementById('onboarding'); // Get onboarding element
    const languageContainer = document.getElementById('languageContainer'); // Keep reference for now

    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.classList.remove('active', 'fade-out');
        splash.style.display = 'none'; // Ensure splash is completely hidden
        if (onboarding) {
          onboarding.classList.add('active'); // Directly activate onboarding page
        }
        if (languageContainer) {
          languageContainer.style.display = 'none'; // Hide language container if it's still visible
        }
      }, 500);
    }, 3000); // Show next screen after 3s
  });

  // Temporarily remove installBtn logic for debugging white screen
  // const splashDropdown = document.getElementById('splashLanguageDropdown');
  // const installBtn = document.getElementById('installBtn');
  // if (splashDropdown && installBtn) {
  //   installBtn.addEventListener('click', () => {
  //     const onboarding = document.getElementById('onboarding');
  //     const languageContainer = document.getElementById('languageContainer');
  //     if (onboarding && languageContainer) {
  //       languageContainer.style.display = 'none';
  //       onboarding.classList.add('active');
  //     }
  //   });
  // }

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
  const language = document.getElementById('splashLanguageDropdown').value; // This will need to be handled if language dropdown is moved

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
