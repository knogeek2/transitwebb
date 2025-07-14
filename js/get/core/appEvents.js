// appEvents.js
// Centralized list of app-wide event identifiers used for logging, UI feedback, and system tracing.
// These constants help standardize event names across G.E.T. modules and prevent typos or duplication.

export const EVENTS = {
    EVALUATE_CLICKED: "evaluate_clicked",         // User clicks the Evaluate button
    POST_GIG_INITIATED: "post_gig_initiated",     // User triggers gig posting
    INPUT_CHANGED: "input_changed",               // Any input field is modified
    SHIFT_SAVED: "shift_saved",                   // ShiftController saves a completed shift
    ERROR_OCCURRED: "error_occurred"              // App captures a validation or runtime error
};
