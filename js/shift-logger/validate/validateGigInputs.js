// Exported function to validate user input on the Gig Evaluation form.
// Returns an array of error messages if any validations fail.
export function validateGigInputs() {
    // Define the fields to validate, each with an ID, user-friendly name, and positivity requirement.
    const fields = [
        { id: "driverEarnings", name: "Driver Earnings", mustBePositive: true },
        { id: "tip", name: "Tip", mustBePositive: false },
        { id: "approachMiles", name: "Miles to Pickup", mustBePositive: true },
        { id: "paidMiles", name: "Paid Miles", mustBePositive: true }
    ];

    // Initialize an empty array to collect error messages.
    const errors = [];

    // Iterate over each field and run validation checks.
    fields.forEach(field => {
        const el = document.getElementById(field.id);                  // Get the input element by its ID.
        const value = parseFloat(el.value.trim());                     // Parse the value as a float, after trimming whitespace.

        // Validation #1: Empty input check.
        if (el.value.trim() === "") {
            errors.push(`${field.name} is required.`);
            el.style.border = "2px solid red";                         // Visually highlight the error in the UI.

            // Validation #2: Non-numeric input check.
        } else if (isNaN(value)) {
            errors.push(`${field.name} must be a number.`);
            el.style.border = "2px solid red";

            // Validation #3: Check for positive numbers where required.
        } else if (field.mustBePositive && value <= 0) {
            errors.push(`${field.name} must be greater than zero.`);
            el.style.border = "2px solid red";

            // If no errors, clear any previous styling.
        } else {
            el.style.border = "";
        }
    });

    // Return all collected error messages to the caller.
    return errors;
}
