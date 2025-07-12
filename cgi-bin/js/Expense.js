class expense {
    constructor(description, amount, hasReceipt = false, gigId = "", stamp = new Date()) {
        this.description = description;
        this.amount = amount;
        this.hasReceipt = hasReceipt;
        this.reimbursedAmount = hasReceipt ? amount : 0;
        this.gigId = gigId;
        this.timestamp = stamp;
        this.id = `${gigId}-${stamp.toISOString().replace(/[:.]/g, '-')}`;
    }

    get trueCost() {
        return this.amount - this.reimbursedAmount;
    }
}
