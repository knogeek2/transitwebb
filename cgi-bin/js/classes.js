/*
    G.E.T. (Gig Efficiency Tracker)
    Author: Alan Webb
    License: MIT
    Created: July 2025
    Description: Core class definitions for tracking gigs, expenses, and shift-level metrics.
*/

// 🚚 Gig class - represents a single delivery or paid driving instance
class Gig {
    constructor(id, paidMiles, amountDue, tip = 0, notes = "") {
        this.id = id;                       // Unique ID or reference
        this.paidMiles = paidMiles;         // Miles paid for
        this.amountDue = amountDue;         // Base amount paid
        this.tip = tip;                     // Tip amount, if any
        this.notes = notes;                 // Optional notes (pickup issues, delays, etc.)
    }

    get totalPay() {
        // Returns full payout for gig (base + tip)
        return this.amountDue + this.tip;
    }

    get payPerMile() {
        // Calculates efficiency of gig by paid mile
        return this.paidMiles > 0 ? this.totalPay / this.paidMiles : 0;
    }

    serialize() {
        // Prepares object for storage or export (e.g. JSON)
        return { ...this };
    }
}

// 💸 Expense class - tracks out-of-pocket or shift-level costs
class Expense {
// 🕒 Shift class - aggregates gigs and expenses tied to a specific date
class Shift {
    constructor(dateKey) {
        this.dateKey = dateKey;     // Format: YYYY-MM-DD, anchors the shift
        this.gigs = [];             // Array of Gig objects
        this.expenses = [];         // Array of Expense objects
        this.unpaidMiles = 0;       // Total non-compensated mileage
        this.unpaidMinutes = 0;     // Time spent waiting, deadheading, etc.
    }

    addGig(gig) {
        // Adds a Gig object to the shift
        this.gigs.push(gig);
    }

    addExpense(expense) {
        // Adds an Expense object to the shift
        this.expenses.push(expense);
    }

    get netEarnings() {
        // Total payout minus total expenses (pre-reimbursement)
        const totalPay = this.gigs.reduce((sum, g) => sum + g.totalPay, 0);
        const totalExpenses = this.expenses.reduce((sum, e) => sum + e.amount, 0);
        return totalPay - totalExpenses;
    }

    get paidMileRatio() {
        // Proportion of paid vs total miles (efficiency indicator)
        const paidMiles = this.gigs.reduce((sum, g) => sum + g.paidMiles, 0);
        const totalMiles = paidMiles + this.unpaidMiles;
        return totalMiles > 0 ? paidMiles / totalMiles : 0;
    }

    get driverBurden() {
        // Reflects actual financial burden after reimbursements
        return this.expenses.reduce((sum, e) => sum + e.trueCost, 0);
    }

    serialize() {
        // Prepares full shift for storage or export
        return {
            dateKey: this.dateKey,
            gigs: this.gigs.map(g => g.serialize()),
            expenses: this.expenses.map(e => e.serialize()),
            unpaidMiles: this.unpaidMiles,
            unpaidMinutes: this.unpaidMinutes
        };
    }
}

// 🛠 Diagnostic load check
console.log("✅ classes.js loaded.");
