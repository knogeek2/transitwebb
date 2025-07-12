/*
    Gig Module
    Author: Alan Webb
    License: MIT
    Created: July 2025
    Description: Represents a single gig entry in G.E.T.
*/

export class Gig {
    constructor(id, paidMiles, driverEarnings, tip = 0, notes = "", approachMiles = 0) {
        this.id = id;
        this.paidMiles = paidMiles;
        this.approachMiles = approachMiles;
        this.driverEarnings = driverEarnings;
        this.tip = tip;
        this.notes = notes;
    }

    get totalPay() {
        return this.driverEarnings + this.tip;
    }

    get payPerMile() {
        const totalMiles = this.paidMiles + this.approachMiles;
        return totalMiles > 0 ? this.totalPay / totalMiles : 0;
    }

    get unpaidMiles() {
        return this.approachMiles;
    }
}
