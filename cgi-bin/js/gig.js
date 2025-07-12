// gig.js
export class Gig {
    constructor({ gigId, provider, driverEarnings = 0, tip = 0, paidMiles = 0, approachMiles = 0 }) {
        this.gigId = gigId;
        this.provider = provider;
        this.driverEarnings = driverEarnings;
        this.tip = tip;
        this.paidMiles = paidMiles;
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
}
