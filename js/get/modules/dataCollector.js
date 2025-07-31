// modules/dataCollector.js

/**
 * Extracts and sanitizes gig form data for evaluation and logging.
 * Designed to be triggered on form submission or tab switch.
 * Returns a consistent gigData object for downstream modules.
 */

export function collectGigData(formElement) {
    const gigData = {};

    // 📅 Date of the gig (can be used for trend analysis)
    gigData.date = formElement.querySelector('#gigDate')?.value || '';

    // 🏢 Platform name (e.g., Uber, DoorDash), trimmed for consistency
    gigData.platform = formElement.querySelector('#gigPlatform')?.value.trim();

    // 📍 Core driving metrics
    gigData.totalMiles = parseFloat(formElement.querySelector('#totalMiles')?.value) || 0;
    gigData.totalGallons = parseFloat(formElement.querySelector('#totalGallons')?.value) || 0;
    gigData.pricePerGallon = parseFloat(formElement.querySelector('#pricePerGallon')?.value) || 0;

    // 💵 Earnings for the gig shift
    gigData.earnings = parseFloat(formElement.querySelector('#earnings')?.value) || 0;

    // 🧾 Array to hold soft/manual expenses (food, cigarettes, etc.)
    gigData.expenses = [];

    // 🔍 Scan for inputs tagged with class="soft-expense" and data-type
    const softExpenseElements = formElement.querySelectorAll('.soft-expense');
    softExpenseElements.forEach(el => {
        const type = el.getAttribute('data-type');       // e.g., 'food', 'cigarettes'
        const amount = parseFloat(el.value);             // Convert to number

        // ✅ Only push valid numbers into the array
        if (!isNaN(amount)) {
            gigData.expenses.push({ type, amount });
        }
    });

    return gigData;
}
