/*
    KeyManager Class
    Author: Alan Webb
    License: MIT
    Description: Generates unique keys for G.E.T. entities with collision handling.
                 Supports shift keys, gig IDs, and expense records with timestamp precision.
*/

export class KeyManager {
    /**
     * Initializes the KeyManager with a registry of known keys.
     * Prevents duplicate key generation across sessions or modules.
     * @param {Set} existingKeys - Set of already-used keys to check against.
     */
    constructor(existingKeys = new Set()) {
        this.existingKeys = existingKeys;
    }

    /**
     * Generates a shift-specific key based on date and part of day (e.g. AM/PM).
     * Useful for indexing shifts by calendar day and time slot.
     * @param {string} dateString - Format: YYYY-MM-DD
     * @param {string} partOfDay - Optional marker (e.g. "am", "pm", "mid")
     * @returns {string} - Formatted key, e.g. "20250714-AM"
     */
    generateShiftKey(dateString, partOfDay = "") {
        const base = dateString.replace(/-/g, ""); // Strip dashes
        return partOfDay ? `${base}-${partOfDay.toUpperCase()}` : base;
    }

    /**
  * Generates a unique Gig ID, optionally using a provided identifier.
  * If a gig-specific ID is available, it's used directly.
  * Otherwise, constructs an ID based on provider name and timestamp.
  * @param {string} provider - Gig platform (e.g. "Uber", "Lyft", etc.)
  * @param {Date} offerAcceptedTime - Timestamp when gig was accepted
  * @param {string} providedGigId - Optional external Gig ID to use directly
  * @returns {string} - Unique Gig ID
  */
    generateGigId(provider, offerAcceptedTime = new Date(), providedGigId = "") {
        const prefix = provider ? provider.toUpperCase() : 'UNKNOWN';

        // Generalized fallback: use provided Gig ID if available
        if (providedGigId.trim() !== "") {
            return `${prefix}-${providedGigId}`;
        }

        // Otherwise, generate based on timestamp
        const stamp = offerAcceptedTime.toISOString().replace(/[:.]/g, '-');
        return `${prefix}-${stamp}`;
    }

    /**
     * Creates a unique expense record ID with collision recovery logic.
     * Timestamps are incremented by attempt count to avoid key overlap.
     * @param {string} shiftDate - Date reference for the shift
     * @param {string} gigId - Optional gig association
     * @param {number} attempt - Retry count to help offset timestamp if needed
     * @returns {string} - Unique expense ID
     */
    generateExpenseId(shiftDate, gigId = "", attempt = 0) {
        const stampBase = new Date();
        stampBase.setMilliseconds(stampBase.getMilliseconds() + attempt * 100); // Offset for retries

        let stamp = stampBase.toISOString().replace(/[:.]/g, '-');
        let finalId = gigId ? `${gigId}-${stamp}` : `${shiftDate}-${stamp}`;
        let count = attempt;

        // Collision mitigation loop
        while (this.existingKeys.has(finalId) && count < 10) {
            count++;
            stampBase.setMilliseconds(stampBase.getMilliseconds() + 100); // Nudge timestamp
            stamp = stampBase.toISOString().replace(/[:.]/g, '-'); // Correct assignment
            finalId = gigId ? `${gigId}-${stamp}` : `${shiftDate}-${stamp}`;
        }

        // Register the final key to avoid reuse
        this.existingKeys.add(finalId);
        return finalId;
    }
}