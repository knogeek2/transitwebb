/*
    Gig Module
    Author: Alan Webb
    License: MIT
    Created: July 2025
    Description: Represents a single gig entry in G.E.T. with profit evaluation logic.
*/

export class Gig {
    constructor(id, paidMiles, driverEarnings, tip = 0, notes = "", approachMiles = 0) {
        this.id = id;
        this.paidMiles = paidMiles;
        this.driverEarnings = driverEarnings;
        this.tip = tip;
        this.notes = notes;
        this.approachMiles = approachMiles;
    }

    get totalPay() {
        return this.driverEarnings + this.tip;
    }

    get totalMiles() {
        return this.paidMiles + this.approachMiles;
    }

    get payPerMile() {
        return this.totalMiles > 0 ? this.totalPay / this.totalMiles : 0;
    }

    get isProfitable() {
        return this.payPerMile >= 0.75; // Threshold could be externalized later
    }
}
