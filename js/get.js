// get.js
import { Gig } from './js/gig.js';

// Initialize the gig evaluation setup with any recent gigs if available
import { setupGigEvaluation } from './gig-evaluator.js';

document.addEventListener("DOMContentLoaded", () => {
    const recentGigs = [
        { paidMiles: 30, totalMiles: 40 },
        { paidMiles: 25, totalMiles: 35 },
        { paidMiles: 20, totalMiles: 30 }
    ];

    setupGigEvaluation(recentGigs);
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("G.E.T. is alive");

    formFields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            console.log(`Listening to ${id}`);
            el.addEventListener("input", evaluateGig);
        }
    });

    const formFields = ["gigId", "customer", "driverEarnings", "tip", "approachMiles", "paidMiles"];

    function readyToPost() {
        const gigId = document.getElementById("gigId").value.trim();
        const customer = document.getElementById("customer").value.trim();
        const earnings = parseFloat(document.getElementById("driverEarnings").value);
        const paidMiles = parseFloat(document.getElementById("paidMiles").value);
        const approachMiles = parseFloat(document.getElementById("approachMiles").value);

        return gigId && customer && !isNaN(earnings) &&
            (!isNaN(paidMiles) || !isNaN(approachMiles));
    }

    function evaluateGig() {
        const earnings = parseFloat(document.getElementById("driverEarnings").value);
        const paidMiles = parseFloat(document.getElementById("paidMiles").value);
        const approachMiles = parseFloat(document.getElementById("approachMiles").value);
        const tip = parseFloat(document.getElementById("tip").value) || 0;

        const gigId = document.getElementById("gigId").value.trim();
        const customer = document.getElementById("customer").value.trim();

        const button = document.getElementById("postGigBtn");
        const evalZone = document.getElementById("gigEvaluation");

        console.log("Evaluating gig...");

        if (!readyToPost()) {
            evalZone.textContent = "💬 Waiting...";
            button.disabled = true;
            return;
        }

        const gig = new Gig(gigId, paidMiles || 0, earnings, tip, "", approachMiles || 0);
        const thumbs = gig.isProfitable ? "👍" : "👎";
        const rate = gig.payPerMile.toFixed(2);

        evalZone.textContent = `Profitability: ${thumbs} ($${rate}/mi)`;
        button.disabled = false;
    }

    formFields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", evaluateGig);
    });
});
