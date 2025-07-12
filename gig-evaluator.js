// gig-evaluator.js

export function setupGigEvaluation(recentGigs = []) {
    const newGig = {
        paidMiles: 0,
        approachMiles: 0,
        get totalMiles() {
            return this.paidMiles + this.approachMiles;
        }
    };

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

    function updateEvaluation() {
        const verdict = compareToHistory(newGig, recentGigs);
        const output = document.getElementById("gigEvaluation");
        if (output) {
            output.textContent =
                `Paid Miles: ${verdict.currentRate} vs Hist Avg: ${verdict.historyRate} → ${verdict.thumbs}`;
        }
    }

    // 🔁 Attach listeners to form inputs
    const paidMilesInput = document.getElementById("paidMiles");
    const approachMilesInput = document.getElementById("approachMiles");

    if (paidMilesInput) {
        paidMilesInput.addEventListener("input", (e) => {
            newGig.paidMiles = parseFloat(e.target.value) || 0;
            updateEvaluation();
        });
    }

    if (approachMilesInput) {
        approachMilesInput.addEventListener("input", (e) => {
            newGig.approachMiles = parseFloat(e.target.value) || 0;
            updateEvaluation();
        });
    }
}
