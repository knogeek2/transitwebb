// gigEvaluator.js

export function setupGigEvaluation(recentGigs = []) {
    const newGig = {
        gigMiles: 0,
        shiftMiles: 0, // Optional if you want to reflect shift-level stats
        get mileEfficiency() {
            return this.gigMiles > 0 ? (this.shiftMiles / this.gigMiles) : 0;
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
        const gigMiles = parseFloat(document.getElementById("gigMiles")?.value) || 0;
        const shiftMiles = parseFloat(document.getElementById("totalMiles")?.value) || 0;

        // Update the gig object
        newGig.gigMiles = gigMiles;
        newGig.shiftMiles = shiftMiles;

        // Compare efficiency: how much mileage was actually paid for
        const verdict = compareToHistory(newGig, recentGigs);
        const output = document.getElementById("gigEvaluation");

        if (output) {
            output.textContent =
                `Efficiency: ${verdict.currentRate} paid mi / ${verdict.historyRate} avg → ${verdict.thumbs}`;
        }
    }

    // 🔁 Attach listeners to form inputs
    const paidMilesInput = document.getElementById("paidMiles");

    if (paidMilesInput) {
        paidMilesInput.addEventListener("input", (e) => {
            newGig.paidMiles = parseFloat(e.target.value) || 0;
            updateEvaluation();
        });
    }
}
