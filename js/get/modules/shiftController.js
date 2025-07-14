import { addToHistory, compareToHistory } from './history.js';

export class ShiftController {
    constructor(shiftDate, odometerStart = 0) {
        this.shiftDate = shiftDate;
        this.odometerStart = odometerStart;
        this.odometerEnd = odometerStart;
        this.gigs = [];
    }


    addGig(gig) {
        this.gigs.push(gig);
        addToHistory(gig);               // Track gig in recent history
        this.updateShiftMetrics();

        const verdict = compareToHistory(gig, recentGigs);  // Optional live feedback
        document.getElementById("gigEvaluation").textContent =
            `Paid Miles: ${verdict.currentRate} vs Hist Avg: ${verdict.historyRate} → ${verdict.thumbs}`;
    }

    setOdometerEnd(value) {
        this.odometerEnd = value;
        this.updateShiftMetrics();
    }

    updateShiftMetrics() {
        const paidMiles = this.gigs.reduce((sum, g) => sum + g.paidMiles, 0);
        const totalMiles = this.odometerEnd - this.odometerStart || 0;
        const totalEarnings = this.gigs.reduce((sum, g) => sum + g.driverEarnings + g.tip, 0);
        const mileEfficiency = totalMiles > 0 ? ((paidMiles / totalMiles) * 100).toFixed(1) : "0.0";

        document.getElementById("totalEarnings").textContent = `$${totalEarnings.toFixed(2)}`;
        document.getElementById("paidMiles").textContent = paidMiles.toFixed(1);
        document.getElementById("totalMiles").textContent = totalMiles.toFixed(1);
        document.getElementById("mileEfficiency").textContent = `${mileEfficiency}%`;
    }

    saveShift() {
        const data = {
            shiftDate: this.shiftDate,
            odometerStart: this.odometerStart,
            odometerEnd: this.odometerEnd,
            gigs: this.gigs
        };
        localStorage.setItem(`shift-${this.shiftDate}`, JSON.stringify(data));
    }

    static loadShift(shiftDate) {
        const raw = localStorage.getItem(`shift-${shiftDate}`);
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        const controller = new ShiftController(parsed.shiftDate, parsed.odometerStart);
        controller.setOdometerEnd(parsed.odometerEnd);
        parsed.gigs.forEach(g => controller.addGig(g)); // Assuming plain object format
        return controller;
    }
}

// ShiftController Module
let recentGigs = [];

function addToHistory(gig) {
    recentGigs.unshift(gig);
    if (recentGigs.length > 20) recentGigs.pop();
}
function getHistoricalMileEfficiency(gigs) {
    const paid = gigs.reduce((sum, g) => sum + g.paidMiles, 0);
    const total = gigs.reduce((sum, g) => sum + g.totalMiles, 0);
    return total > 0 ? paid / total : 0;
}
function compareToHistory(currentGig, history) {
    const currentEfficiency = currentGig.paidMiles / currentGig.totalMiles || 0;
    const historyEfficiency = getHistoricalMileEfficiency(history);
    return {
        thumbs: currentEfficiency >= historyEfficiency ? "👍" : "👎",
        currentRate: currentEfficiency.toFixed(2),
        historyRate: historyEfficiency.toFixed(2)
    };
}

const verdict = compareToHistory(newGig, recentGigs);
document.getElementById("gigEvaluation").textContent =
    `Paid Miles: ${verdict.currentRate} vs Hist Avg: ${verdict.historyRate} → ${verdict.thumbs}`;

