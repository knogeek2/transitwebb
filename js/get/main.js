// Import the input validation function from a dedicated module.
// Ensures all gig evaluation inputs meet expected criteria before processing.
import { validateGigInputs } from './js/validate.js';

/**
 * Evaluates gig data by calculating total earnings and mileage efficiency.
 * Assumes input fields contain valid, pre-checked numbers.
 * Displays result in the gigEvaluation UI element.
 */
export function evaluateGig() {
    // Parse numeric values from form fields.
    const earnings = parseFloat(document.getElementById("driverEarnings").value);
    const tip = parseFloat(document.getElementById("tip").value);
    const approachMiles = parseFloat(document.getElementById("approachMiles").value);
    const paidMiles = parseFloat(document.getElementById("paidMiles").value);

    // Basic fallback validation in case raw data somehow bypassed validateGigInputs().
    if (
        isNaN(earnings) ||
        isNaN(tip) ||
        isNaN(approachMiles) ||
        isNaN(paidMiles)
    ) {
        document.getElementById("gigEvaluation").textContent =
            "Please fill out all fields with numbers.";
        return;
    }

    // Compute totals and efficiency metrics.
    const totalMiles = approachMiles + paidMiles;
    const totalEarnings = earnings + tip;
    const ratePerMile = totalEarnings / totalMiles;

    // Update the interface with the calculated value.
    document.getElementById("gigEvaluation").textContent =
        `You earned $${ratePerMile.toFixed(2)} per mile.`;
}

/**
 * Attach click listener to the Evaluate button.
 * Runs validation first; only proceeds with gig evaluation if inputs pass.
 */
document.getElementById("evaluateBtn").addEventListener("click", () => {
    const errors = validateGigInputs(); // Run modular input checks.

    if (errors.length > 0) {
        // Display formatted list of errors to guide the user.
        document.getElementById("gigEvaluation").textContent = errors.join("\n");
        return;
    }

    // Inputs are clean—run the calculation and update display.
    evaluateGig();
});
