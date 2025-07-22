// --- VIDEO PLAYER & TOOLBAR ---

/**
 * Initializes the video player and its associated toolbar.
 */
function initializeToolbar() {
  const toolbarButtonMappings = {
    'timestampBtn': showTimestamps,
    'noteBtn': showNote,
    'folderBtn': showFiles,
    'infoBtn': showDefaultInfo,
    'quizBtn': launchQuiz,
  };

  for (const [btnId, handler] of Object.entries(toolbarButtonMappings)) {
    const button = document.getElementById(btnId);
    if (button) button.addEventListener('click', handler);
  }
}

/**
 * Initializes the video player with time-based events.
 */
function initializeVideoPlayers() {
  const video = document.getElementById('customVideo');
  if (video) {
    video.addEventListener('timeupdate', handleVideoTimeUpdate);
  }
}

/**
 * Handles time updates for the main video player to show contextual info.
 */
function handleVideoTimeUpdate() {
  const video = document.getElementById('customVideo');
  if (!video) return;

  const time = Math.floor(video.currentTime);
  const contentBox = document.getElementById('contentBox');

  const pauseEvents = {
    22: {
      id: 'eye-info',
      handler: () => {
        contentBox.innerHTML = `
          <h4>Eye Anatomy</h4>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Eye_anatomy_diagram.svg/1200px-Eye_anatomy_diagram.svg.png" style="width: 100%; border-radius: 5px; margin-top: 10px;" />
          <ul><li>Periorbita</li><li>Eyelids</li><li>Eyes</li></ul>`;
      }
    },
    32: {
      id: 'device-info',
      handler: () => {
        contentBox.innerHTML = `
          <h4>Arclight Device Overview</h4>
          <img src="images/arclight_device.png" style="width: 100%; border-radius: 5px;" />`;
      }
    }
  };

  if (pauseEvents[time] && lastPauseTime !== pauseEvents[time].id) {
    lastPauseTime = pauseEvents[time].id;
    video.pause();
    pauseEvents[time].handler();
    setTimeout(() => video.play(), 5000); // Auto-resume after 5 seconds
  }
}

/**
 * Seeks the video to a specific time.
 * @param {number} sec - The time in seconds to seek to.
 */
function seekTo(sec) {
  const video = document.getElementById('customVideo');
  if (video) {
    video.currentTime = sec;
    video.play();
    lastPauseTime = null; // Reset pause tracking
  }
}

/**
 * Displays timestamps in the content box.
 */
function showTimestamps() {
  setActiveToolbarButton('timestampBtn');
  const contentBox = document.getElementById('contentBox');
  contentBox.innerHTML = `
    <h4>Time stamp</h4>
    <p><a href="#" onclick="seekTo(0)">0:00 General Inspection</a></p>
    <p><a href="#" onclick="seekTo(28)">0:28 Arclight Setup</a></p>
    <p><a href="#" onclick="seekTo(47)">0:47 Fundal Reflex</a></p>
    <p><a href="#" onclick="seekTo(67)">1:07 Optic Nerve</a></p>
    <p><a href="#" onclick="seekTo(102)">1:42 Retinal Vessels</a></p>`;
}

/**
 * Displays a textarea for notes.
 */
function showNote() {
  setActiveToolbarButton('noteBtn');
  document.getElementById('contentBox').innerHTML = '<textarea placeholder="Type your notes here..."></textarea>';
}

/**
 * Displays a list of attached files.
 */
function showFiles() {
  setActiveToolbarButton('folderBtn');
  document.getElementById('contentBox').innerHTML = `
    <h4>Attached Files</h4>
    <p><a class="link" href="#">Arclight_Device_Practice.pdf</a></p>
    <p><a class="link" href="#">Fundal_Reflex.pdf</a></p>
    <p><a class="link" href="#">Ophthalmoscopy_Exercise.docx</a></p>`;
}

/**
 * Displays default information about the video.
 */
function showDefaultInfo() {
  setActiveToolbarButton('infoBtn');
  document.getElementById('contentBox').innerHTML = `
    <h4>Additional Information</h4>
    <p>This video shows how to prepare and use the Arclight ophthalmoscope.</p>`;
}

/**
 * Sets the 'active' class on the clicked toolbar button.
 * @param {string} id - The ID of the button to activate.
 */
function setActiveToolbarButton(id) {
  document.querySelectorAll('.toolbar button').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(id);
  if (activeBtn) activeBtn.classList.add('active');
}
