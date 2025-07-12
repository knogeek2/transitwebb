// JavaScript source code
const inputs = document.querySelectorAll("input");
const netProfitOutput = document.getElementById("netProfit");
const recommendationOutput = document.getElementById("recommendation");
const paidRatioOutput = document.getElementById("paidRatio");

inputs.forEach(input => {
    input.addEventListener("input", calculateProfit);
});

function calculateProfit() {
    const grossPay = parseFloat(document.getElementById("grossPay").value) || 0;
    const outboundMiles = parseFloat(document.getElementById("outboundMiles").value) || 0;
    const returnMiles = parseFloat(document.getElementById("returnMiles").value) || 0;
    const mileageCost = parseFloat(document.getElementById("mileageCost").value) || 0;
    const setAside = parseFloat(document.getElementById("setAside").value) || 0;
    const hours = parseFloat(document.getElementById("hours").value) || 0;
    const hourlyRate = parseFloat(document.getElementById("hourlyRate").value) || 0;

    const totalMileageCost = (outboundMiles + returnMiles) * mileageCost;
    const timeCost = hours * hourlyRate;
    const netProfit = grossPay - totalMileageCost - setAside - timeCost;

    netProfitOutput.textContent = `$${netProfit.toFixed(2)}`;
    recommendationOutput.textContent = netProfit >= 0 ? "✅ Proceed with offer." : "❌ Decline – unprofitable.";
    recommendationOutput.style.color = netProfit >= 0 ? "green" : "red";

    const totalMiles = outboundMiles + returnMiles;
    const paidRatio = totalMiles > 0 ? outboundMiles / totalMiles : 0;
    paidRatioOutput.textContent = `${(paidRatio * 100).toFixed(1)}%`;
    paidRatioOutput.style.color =
        paidRatio > 0.5 ? "green" :
            paidRatio >= 0.33 ? "orange" : "red";
}

document.getElementById("downloadArchiveBtn").addEventListener("click", () => {
    if (!acceptedGigs || acceptedGigs.length <= 100) {
        alert("No gigs to archive yet.");
        return;
    }

    const archivedRaw = acceptedGigs.slice(0, acceptedGigs.length - 100);
    const archivedProcessed = archivedRaw.map(gig => {
        const totalPay = gig.AmountDue + gig.Tip;
        const payPerMile = totalPay / gig.PaidMiles;
        const shiftDay = new Date(gig.ShiftDate).toLocaleDateString('en-US', { weekday: 'long' });

        return {
            ...gig,
            TotalPay: parseFloat(totalPay.toFixed(2)),
            PayPerMile: parseFloat(payPerMile.toFixed(2)),
            HasTip: gig.Tip > 0,
            DayOfWeek: shiftDay
        };
    });

    const archiveBlob = new Blob([JSON.stringify(archivedProcessed, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(archiveBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "archived-gigs.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});

function showTab(tabName) {
    document.querySelectorAll(".tab-content").forEach(el => el.style.display = "none");
    document.getElementById(tabName).style.display = "block";
}

document.getElementById("logGigBtn").addEventListener("click", () => {
    // Simulated gig logging logic (can be enhanced later)
    // e.g., pushing gig data into acceptedGigs array or localStorage

    // Show confirmation message
    document.getElementById("confirmationMessage").textContent = "✅ Gig completed and logged successfully.";
    document.getElementById("confirmationMessage").style.display = "block";
    setTimeout(() => {
        document.getElementById("confirmationMessage").style.display = "none";
    }, 4000);
});

function generateDateDimension(startYear = 2020, endYear = 2030) {
    const dateDimension = [];
    const startDate = new Date(`${startYear}-01-01`);
    const endDate = new Date(`${endYear}-12-31`);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const shiftDate = d.toISOString().split('T')[0];
        const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'long' });
        const weekNo = getWeekNumber(new Date(d));
        const endOfWeek = getEndOfWeek(new Date(d));
        const endOfPeriod = getLastDayOfMonth(new Date(d));
        const payday = getLastFridayOfMonth(new Date(d));
        const roadieTuesday = getTuesdayOfWeek(new Date(d));
        const monthNo = d.getMonth() + 1;
        const monthText = d.toLocaleDateString('en-US', { month: 'long' });
        const quarter = `${d.getFullYear()}Q${Math.ceil(monthNo / 3)}`;
        const year = d.getFullYear();

        dateDimension.push({
            shiftDate,
            dayOfWeek,
            weekNo,
            endOfWeek,
            endOfPeriod,
            payday,
            roadieTuesday,
            monthNo,
            monthText,
            quarter,
            year
        });
    }

    localStorage.setItem("DateDimension", JSON.stringify(dateDimension));
    console.log(`✅ DateDimension stored in localStorage (${dateDimension.length} days)`);
}
document.getElementById("gigForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const provider = document.getElementById("provider").value;
    const supportId = document.getElementById("supportId").value;
    const paidMiles = parseFloat(document.getElementById("paidMiles").value);
    const amountDue = parseFloat(document.getElementById("amountDue").value);
    const tip = parseFloat(document.getElementById("tip").value) || 0;
    const notes = document.getElementById("notes").value;

    const offerAcceptedTime = new Date();
    const gigId = generateGigId(provider, offerAcceptedTime, supportId);

    const newGig = new Gig(gigId, paidMiles, amountDue, tip, notes);

    // Create or update shift
    const today = offerAcceptedTime.toISOString().split("T")[0]; // YYYY-MM-DD
    const shiftKey = `shift_${today}`;
    let existingShiftData = localStorage.getItem(shiftKey);

    let shift;
    if (existingShiftData) {
        const raw = JSON.parse(existingShiftData);
        shift = new Shift(raw.dateKey);
        raw.gigs.forEach(g => shift.addGig(new Gig(g.id, g.paidMiles, g.amountDue, g.tip, g.notes)));
        raw.expenses.forEach(e => shift.addExpense(new Expense(e.description, e.amount, e.hasReceipt)));
        shift.unpaidMiles = raw.unpaidMiles;
        shift.unpaidMinutes = raw.unpaidMinutes;
    } else {
        shift = new Shift(today);
    }

    shift.addGig(newGig);
    localStorage.setItem(shiftKey, JSON.stringify(shift.serialize()));
    alert("Gig added successfully!");

    document.getElementById("gigForm").reset();
});


