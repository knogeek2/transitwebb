// get.js
import { Gig } from './gig.js';

document.addEventListener("DOMContentLoaded", () => {
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
