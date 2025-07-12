/*
    G.E.T. Utilities
    Author: Alan Webb
    License: MIT
    Created: July 2025
    Description: Utility functions for generating IDs, formatting values, and handling time logic.
*/

// 🚚 Generates unique Gig ID based on provider and offer acceptance time
function generateGigId(provider, offerAcceptedTime = new Date(), supportId = "") {
    const prefix = provider ? provider.toUpperCase() : 'UNKNOWN';

    // If the provider is Roadie and there's a SupportID, use it directly
    if (prefix === "ROADIE" && supportId.trim() !== "") {
        return `${prefix}-${supportId}`;
    }

    // Otherwise, fall back to timestamp-based ID
    const stamp = offerAcceptedTime.toISOString().replace(/[:.]/g, '-');
    return `${prefix}-${stamp}`;
}

// 🕒 Formats a numeric value into readable HH:MM time string
function formatMinutes(minutes) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
}

// 💲 Formats a number as USD currency
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

// 🔢 Rounds value to 2 decimal places
function round(value) {
    return Math.round(value * 100) / 100;
}

// 📅 Generates a shift key with optional part-of-day suffix (for multi-shift support)
function generateShiftKey(dateString, partOfDay = "") {
    const base = dateString.replace(/-/g, "");
    return partOfDay ? `${base}-${partOfDay.toUpperCase()}` : base;
}

// 🛠 Diagnostic check
console.log("✅ utils.js loaded.");
