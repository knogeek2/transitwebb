export class Shift {
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
