// main.js — Command Center for UI interaction and module delegation

// 🚚 Import functions from dedicated modules
import { showTab, resetForm } from './uiController.js';          // Manages UI state and tab visibility
import { collectGigData } from './dataCollector.js';            // Gathers form inputs into a usable object
import { validateGigInputs } from './validate.js';              // Ensures inputs meet business logic rules
import { evaluateGig } from './gigEvaluator.js';                // Performs profitability scoring and feedback
import { logGig } from './gigLogger.js';                        // Records gig data for history or analysis

// 🛫 Setup on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeEventHandlers();       // Hook up all UI buttons/tabs
    showTab('evaluate');             // Default tab when app opens
});

// 🎛️ Sets up button/tab event listeners to route user actions
function initializeEventHandlers() {
    // 🔁 Tab navigation buttons
    document.getElementById('evaluateTabBtn').addEventListener('click', () => showTab('evaluate'));
    document.getElementById('logTabBtn').addEventListener('click', () => showTab('log'));
    document.getElementById('settingsTabBtn').addEventListener('click', () => showTab('settings'));

    // 🎯 Action buttons
    document.getElementById('evaluateButton').addEventListener('click', handleEvaluation);  // Triggers gig scoring
    document.getElementById('logButton').addEventListener('click', handleLogging);          // Saves gig data
    document.getElementById('resetButton').addEventListener('click', resetForm);            // Clears UI form
}

// 🧠 Evaluation handler: routes gig input to validation + evaluation modules
function handleEvaluation() {
    const gigData = collectGigData();                   // Parses form inputs into structured data
    const isValid = validateGigInputs(gigData);         // Checks for input errors, constraints, empty fields

    if (!isValid) {
        return; // Validation module shows error messages directly
    }

    evaluateGig(gigData);                               // Routes validated data into scoring logic
}

// 🗃️ Logging handler: records a gig (future use for history or stats)
function handleLogging() {
    const gigData = collectGigData();                   // Re-uses same form parser
    logGig(gigData);                                    // Sends gig object to logging system
}
