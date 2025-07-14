/*
    KeyManager Class
    Author: Alan Webb
    License: MIT
    Description: Generates unique keys for G.E.T. entities with collision handling.
*/

export class KeyManager {
    constructor(existingKeys = new Set()) {
        this.existingKeys = existingKeys;
    }

    generateShiftKey(dateString, partOfDay = "") {
        const base = dateString.replace(/-/g, "");
        return partOfDay ? `${base}-${partOfDay.toUpperCase()}` : base;
    }

    generateGigId(provider, offerAcceptedTime = new Date(), supportId = "") {
        const prefix = provider ? provider.toUpperCase() : 'UNKNOWN';

        if (prefix === "ROADIE" && supportId.trim() !== "") {
            return `${prefix}-${supportId}`;
        }

        const stamp = offerAcceptedTime.toISOString().replace(/[:.]/g, '-');
        return `${prefix}-${stamp}`;
    }

    generateExpenseId(shiftDate, gigId = "", attempt = 0) {
        const stampBase = new Date();
        stampBase.setMilliseconds(stampBase.getMilliseconds() + attempt * 100);

        const stamp = stampBase.toISOString().replace(/[:.]/g, '-');
        const baseId = gigId ? `${gigId}-${stamp}` : `${shiftDate}-${stamp}`;

        // Collision check
        let finalId = baseId;
        let count = attempt;
        while (this.existingKeys.has(finalId) && count < 10) {
            count++;
            stampBase.setMilliseconds(stampBase.getMilliseconds() + 100);
            const retryStamp = stampBase.toISOString().replace(/[:.]/g, '-');
            finalId = gigId ? `${gigId}-${retryStamp}` : `${shiftDate}-${retryStamp}`;
        }

        this.existingKeys.add(finalId);
        return finalId;
    }

    sanitizeTimestamp(dateObj) {
        return dateObj.toISOString().replace(/[:.]/g, '-');
    }

    hasKey(key) {
        return this.existingKeys.has(key);
    }

    addKey(key) {
        this.existingKeys.add(key);
    }
}
