// 2025-07-15, Cline @ Arclight App Refactor
// --- GLOBAL STATE AND CONFIGURATION ---

/**
 * @type {string[]} History stack for page navigation.
 */
const pageHistory = [];

/**
 * @type {'eyes' | 'ears'} Tracks the currently selected Table of Contents type.
 */
let currentTOCType = 'eyes';

/**
 * @type {HTMLElement | null} Holds the reference to the search container element.
 */
let searchContainer;

/**
 * @type {Event | null} Holds the deferred event for the PWA installation prompt.
 */
let deferredPrompt = null;

/**
 * @type {string | number | null} Tracks the last pause time in the video player to prevent repeated pauses.
 */
let lastPauseTime = null;

/**
 * @type {number} The current zoom level for the ear health image.
 */
let zoomLevel = 1;
