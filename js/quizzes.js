// --- QUIZZES ---

/**
 * Initializes all quiz-related functionality.
 */
function initializeQuizzes() {
  // This function could be expanded if more quizzes are added.
  // For now, the quiz logic is self-contained in launchQuiz and the IIFE.
}

/**
 * Launches the Direct Ophthalmoscopy quiz.
 */
function launchQuiz() {
  const previousPage = document.querySelector('.page.active')?.id || 'dashboard';
  const quizPageId = 'directOphthalmoscopyQuizPage';

  // Avoid creating duplicate quiz pages
  if (document.getElementById(quizPageId)) {
    showPage(quizPageId);
    return;
  }

  const quizPage = document.createElement('div');
  quizPage.id = quizPageId;
  quizPage.className = 'page';
  quizPage.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-header small">
        <div class="quiz-header-row centered">
          <button id="backToVideoBtn" class="back-icon" title="Go back">←</button>
          <h2>Quiz</h2>
        </div>
      </div>
      <div class="quiz-scroll"><form id="quizForm"></form></div>
      <div class="quiz-footer">
        <button type="submit" form="quizForm" class="start-btn">See Results</button>
      </div>
      <div id="quizModal" class="quiz-modal hidden">
        <div class="quiz-modal-content">
          <p id="quizScoreText"></p>
          <button id="seeWhyBtn">See why?</button>
        </div>
      </div>
    </div>`;
  document.getElementById('appRoot').appendChild(quizPage);

  const questions = [
    { q: "1. When starting direct ophthalmoscopy, what is the ideal distance between the examiner and the patient?", options: ["5 cm", "10 cm", "15 cm", "Arm’s length"], answer: 3 },
    { q: "2. Which of the options describe the best condition to get the view of the retina?", options: ["Outdoors with bright sunlight, dilated pupil", "Deem room with dilated pupil", "Indoors with bright light, dilated pupil", "Deem room with constricted pupil"], answer: 1 },
    { q: "3. Which eye should you use to examine the patient’s right eye?", options: ["Left eye", "Either eye", "Right eye", "Dominant eye"], answer: 2 },
    { q: "4. During ophthalmoscopy, which part of the back of the eye should you identify first?", options: ["Macula", "Optic disc", "Retinal periphery", "Fovea"], answer: 1 },
    { q: "5. What is the name given to pale optic disc?", options: ["Normal finding", "Cataract", "Optic atrophy", "Raised intraocular pressure"], answer: 2 },
    { q: "6. Which lighting condition is recommended for performing ophthalmoscopy with the Arclight?", options: ["Bright daylight", "Dim or darkened room", "Bright room", "Ambient light"], answer: 1 },
    { q: "7. What does a cup-to-disc ratio (CDR) of 0.7 or greater typically suggest on fundus examination?", options: ["Glaucoma", "Macular degeneration", "Diabetic retinopathy", "Retinal detachment"], answer: 0 }
  ];

  const quizForm = quizPage.querySelector('#quizForm');
  questions.forEach((q, i) => {
    let block = `<div class="quiz-block"><p>${q.q}</p>`;
    q.options.forEach((opt, j) => {
      block += `<label class="radio-label"><input type="radio" name="q${i}" value="${j}" /><span>${opt}</span></label>`;
    });
    block += `<p class="answer" style="display:none; margin-top:5px; font-style:italic;">Correct answer: ${q.options[q.answer]}</p></div>`;
    quizForm.innerHTML += block;
  });

  quizForm.onsubmit = (e) => {
    e.preventDefault();
    let correct = 0;
    questions.forEach((q, i) => {
      const radios = quizForm.querySelectorAll(`input[name="q${i}"]`);
      const answer = q.answer;
      let selected = null;
      radios.forEach(r => {
        r.disabled = true;
        if (r.checked) selected = parseInt(r.value);
      });
      const labels = radios[0].closest('.quiz-block').querySelectorAll('label');
      labels.forEach((label, index) => {
        if (index === answer) label.classList.add('correct');
        else if (parseInt(label.querySelector('input').value) === selected) label.classList.add('wrong');
      });
      if (selected === answer) correct++;
    });
    quizPage.querySelector('#quizScoreText').innerText = `You got ${correct} out of ${questions.length} correct.`;
    quizPage.querySelector('#quizModal').classList.remove('hidden');
  };

  quizPage.querySelector('#seeWhyBtn').addEventListener('click', () => {
    quizPage.querySelector('#quizModal').classList.add('hidden');
    quizPage.querySelectorAll('.answer').forEach(a => a.style.display = 'block');
  });

  quizPage.querySelector('#backToVideoBtn').addEventListener('click', () => {
    showPage(previousPage);
  });

  showPage(quizPageId);
}

/**
 * Anterior Segment Quiz Module (IIFE to encapsulate logic)
 */
(function() {
  const container = document.getElementById('anteriorSegmentQuizModule');
  if (!container) return;

  const elements = {
    caseTitle: container.querySelector("#caseTitle"),
    caseSubtitle: container.querySelector("#caseSubtitle"),
    caseImage: container.querySelector("#caseImage"),
    quizForm: container.querySelector("#quizForm"),
    prevQuestionBtn: container.querySelector("#prevQuestionBtn"),
    nextQuestionBtn: container.querySelector("#nextQuestionBtn"),
    nextCaseBtn: container.querySelector("#nextCaseBtn"),
    scoreCard: container.querySelector("#scoreCard"),
    quizCard: container.querySelector("#quizCard"),
    scoreText: container.querySelector("#scoreText"),
    restartBtn: container.querySelector("#restartBtn"),
    reviewBtn: container.querySelector("#reviewBtn"),
    reviewCard: container.querySelector("#reviewCard"),
    reviewContent: container.querySelector("#reviewContent"),
    closeReviewBtn: container.querySelector("#closeReviewBtn"),
    backBtn: container.querySelector("#anteriorQuizBackBtn"),
  };

  const cases = [
    { title: "6 month old baby: 'Eye looks funny'", image: "images/case1_eye.png", questions: [
        { question: "What is the dominant abnormal sign?", options: ["Hazey/grey cornea", "White pupil (leucocoria)", "Keratic precipitates", "Hypopyon"], correctIndex: 1 },
        { question: "What is the most likely diagnosis?", options: ["Corneal scar", "Congenital cataract", "Infective keratitis", "Limbal dermoid"], correctIndex: 1 },
        { question: "What should you do?", options: ["Prescribe topical antibiotics", "Refer urgently to an eye-care professional", "Reassure and discharge", "Assess for spectacles only"], correctIndex: 1 }
    ]},
    // ... Add all other cases here ...
  ];

  let currentCaseIndex = 0;
  let currentQuestionIndex = 0;
  let answers = [];

  function renderQuestion(caseIndex, questionIndex) {
    const c = cases[caseIndex];
    const q = c.questions[questionIndex];
    elements.caseTitle.textContent = `Case ${caseIndex + 1}`;
    elements.caseSubtitle.textContent = c.title;
    elements.caseImage.src = c.image;
    elements.quizForm.innerHTML = "";
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `<h3>${questionIndex + 1}. ${q.question}</h3><ul class="options"></ul>`;
    q.options.forEach((opt, optIndex) => {
      const li = document.createElement("li");
      li.innerHTML = `<input type="radio" name="q${questionIndex}" id="c${caseIndex}q${questionIndex}o${optIndex}" value="${optIndex}"><label for="c${caseIndex}q${questionIndex}o${optIndex}">${opt}</label>`;
      const input = li.querySelector('input');
      if (answers[caseIndex][questionIndex] === optIndex) input.checked = true;
      input.onchange = () => {
        answers[caseIndex][questionIndex] = parseInt(input.value);
        updateButtons();
      };
      div.querySelector('.options').appendChild(li);
    });
    elements.quizForm.appendChild(div);
    updateButtons();
  }

  function updateButtons() {
    elements.prevQuestionBtn.disabled = currentQuestionIndex === 0;
    elements.nextQuestionBtn.disabled = currentQuestionIndex === cases[currentCaseIndex].questions.length - 1;
    const allAnswered = !answers[currentCaseIndex].some(a => a === null);
    elements.nextCaseBtn.style.display = allAnswered ? "block" : "none";
  }

  function showScore() {
    elements.quizCard.style.display = "none";
    elements.scoreCard.style.display = "block";
    let correctCount = 0;
    cases.forEach((c, caseIdx) => {
      c.questions.forEach((q, qIdx) => {
        if (answers[caseIdx]?.[qIdx] === q.correctIndex) correctCount++;
      });
    });
    elements.scoreText.textContent = `You scored ${correctCount} out of ${cases.flatMap(c => c.questions).length} correct.`;
  }

  function buildReview() {
    elements.reviewContent.innerHTML = "";
    cases.forEach((c, caseIdx) => {
      const caseDiv = document.createElement("div");
      caseDiv.className = "review-case";
      caseDiv.innerHTML = `<h2>Case ${caseIdx + 1}</h2><div id="caseSubtitle">${c.title}</div><img class="case-image" src="${c.image}" alt="${c.title}">`;
      c.questions.forEach((q, qIdx) => {
        const qDiv = document.createElement("div");
        qDiv.className = "review-question";
        qDiv.innerHTML = `<h3>${qIdx + 1}. ${q.question}</h3><ul class="review-options"></ul>`;
        q.options.forEach((opt, optIdx) => {
          const li = document.createElement("li");
          li.textContent = opt;
          if (optIdx === q.correctIndex) li.classList.add("correct");
          if (answers[caseIdx][qIdx] === optIdx) li.classList.add("user-selected");
          qDiv.querySelector('ul').appendChild(li);
        });
        caseDiv.appendChild(qDiv);
      });
      elements.reviewContent.appendChild(caseDiv);
    });
  }

  window.startAnteriorSegmentQuiz = () => {
    currentCaseIndex = 0;
    currentQuestionIndex = 0;
    answers = cases.map(c => new Array(c.questions.length).fill(null));
    elements.scoreCard.style.display = "none";
    elements.reviewCard.style.display = "none";
    elements.quizCard.style.display = "block";
    renderQuestion(currentCaseIndex, currentQuestionIndex);
  };

  elements.prevQuestionBtn.onclick = () => { if (currentQuestionIndex > 0) renderQuestion(currentCaseIndex, --currentQuestionIndex); };
  elements.nextQuestionBtn.onclick = () => { if (currentQuestionIndex < cases[currentCaseIndex].questions.length - 1) renderQuestion(currentCaseIndex, ++currentQuestionIndex); };
  elements.nextCaseBtn.onclick = () => {
    currentCaseIndex++;
    currentQuestionIndex = 0;
    if (currentCaseIndex >= cases.length) showScore();
    else renderQuestion(currentCaseIndex, currentQuestionIndex);
  };
  elements.restartBtn.onclick = window.startAnteriorSegmentQuiz;
  elements.reviewBtn.onclick = () => {
    elements.scoreCard.style.display = "none";
    elements.reviewCard.style.display = "block";
    buildReview();
  };
  elements.closeReviewBtn.onclick = () => {
    elements.reviewCard.style.display = "none";
    elements.scoreCard.style.display = "block";
  };
  if (elements.backBtn) elements.backBtn.onclick = () => showPage('coreClinicalOphthalmicExamination');
})();
