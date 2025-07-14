// shift-manager.js
import { Shift } from './js/shift.js';

export class ShiftManager {
    constructor() {
        this.shifts = [];
    }

    addShift(shift) {
        if (shift instanceof Shift) {
            this.shifts.push(shift);
        } else {
            console.warn("Invalid shift object");
        }
    }

    get totalEarnings() {
        return this.shifts.reduce((sum, shift) => sum + shift.totalPay, 0);
    }

    get totalMiles() {
        return this.shifts.reduce((sum, shift) => sum + shift.totalMiles, 0);
    }

    get averagePayPerMile() {
        const miles = this.totalMiles;
        return miles > 0 ? this.totalEarnings / miles : 0;
    }

    get shiftCount() {
        return this.shifts.length;
    }

    getShiftByDate(dateKey) {
        return this.shifts.find(shift => shift.dateKey === dateKey) || null;
    }


    clearShifts() {
        this.shifts = [];
    }

    logSummary() {
        console.log(`Shifts: ${this.shiftCount}`);
        console.log(`Total Earnings: $${this.totalEarnings.toFixed(2)}`);
        console.log(`Total Miles: ${this.totalMiles.toFixed(2)}`);
        console.log(`Avg Pay/Mile: $${this.averagePayPerMile.toFixed(2)}`);
    }
}
