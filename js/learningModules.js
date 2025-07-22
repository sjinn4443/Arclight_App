// --- LEARNING MODULES ---

/**
 * Initializes click listeners for all learning module cards.
 */
function initializeLearningModules() {
  const buttonMappings = {
    'showLearningModulesBtn': showLearningModules,
    'showEarsLearningModulesBtn': showEarsLearningModules,
    'showCoreClinicalOphthalmicExaminationBtn': showCoreClinicalOphthalmicExamination,
    'showDiseasesBtn': showDiseases,
    'showArclightBtn': showArclight,
    'goToAtomsCardEyesBtn': () => goToAtomsCard('eyes'),
    'goToAtomsCardEarsBtn': () => goToAtomsCard('ears'),
  };

  for (const [btnId, handler] of Object.entries(buttonMappings)) {
    const button = document.getElementById(btnId);
    if (button) {
      button.addEventListener('click', handler);
    }
  }

  const cardMappings = {
    'ophthalmoscopyCard': 'directOphthalmoscopy',
    'visualacuityCard': 'visualAcuityPage',
    'fundalreflexFRT': 'fundalReflexPage',
    'interactiveLearningCard': 'interactiveLearningPage',
    'miresCard': 'miresPage',
    'morphCard': 'morphPage',
    'squintPalsyCard': 'squintPalsyPage',
    'cataractCard': 'cataractPage',
    'anteriorSegmentCard': 'frontOfEyePage',
    'anteriorSegmentVideoCard': 'anteriorSegmentVideoPage',
    'caseBasedLearningCard': 'anteriorSegmentQuizPage',
    'pupilsCard': 'pupilsPage',
    'childhoodEyeScreeningCard': 'childhoodEyeScreeningPage',
    'howToUseArclightCard': 'howToUseArclightVideoPage',
    'phoneAttachmentCard': 'phoneAttachmentVideoPage',
    'rapdVideoCard': 'rapdTestVideoPage',
    'earsLearningModules': 'earsLearningModules',
  };

  for (const [elementId, pageId] of Object.entries(cardMappings)) {
    const card = document.getElementById(elementId);
    if (card) {
      card.addEventListener('click', () => showPage(pageId));
    }
  }

  document.querySelectorAll('[data-page]').forEach(element => {
    element.addEventListener('click', () => {
      showPage(element.dataset.page);
    });
  });

  // Special cases with more complex logic
  document.querySelectorAll('#pupilsPage .module-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3').textContent.trim();
      const pageMap = {
        'Pupil Full Examination': 'pupilFullExamPage',
        'Primary Eye Care Examination': 'pupilExamPECPage',
        'RAPD Test': 'rapdPage',
        'Pupil Pathways Explained': 'pupilPathwaysPage',
      };
      if (pageMap[title]) showPage(pageMap[title]);
    });
  });

  document.querySelectorAll('#childhoodEyeScreeningPage .module-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3').textContent.trim();
      const pageMap = {
        'How to Use the Arclight': 'howToArclightPage',
        'Assessment of Eyes and Vision': 'assessmentVisionPage',
        'Normal and Abnormal Findings': 'normalAbnormalPage',
      };
      if (pageMap[title]) showPage(pageMap[title]);
    });
  });
}

/**
 * Navigates to the main learning modules page.
 */
function showLearningModules() {
  showPage('learningModules');
}

/**
 * Navigates to the ears learning modules page.
 */
function showEarsLearningModules() {
  showPage('earsLearningModules');
}

/**
 * Navigates to the core clinical examination page.
 */
function showCoreClinicalOphthalmicExamination() {
  showPage('coreClinicalOphthalmicExamination');
}

/**
 * Navigates to the Arclight usage page.
 */
function showArclight() {
  showPage('arclightPage');
}

/**
 * Navigates to the diseases page.
 */
function showDiseases() {
  showPage('diseasesPage');
}
