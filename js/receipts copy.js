$(window).on("load", function () {
    let cpsaleid = localStorage.getItem("cpsaleid");
    let cploginid = localStorage.getItem("cploginid");
    let cpuserid = localStorage.getItem("cpuserid");

    var eventval = "Event:CustomerPortal_receipts~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");

    // Ensure fnsndrequest is wrapped in a Promise
    getReceiptsData("AppCP_Construction_Phase", eventval)
        .then(data => {
            if (Array.isArray(data)) {
                renderReceipts(data);
            } else {
                console.warn("Unexpected data format:", data);
            }
        })
        .catch(error => console.error("Error fetching receipts:", error));
});

// Wrap fnsndrequest in a Promise
function getReceiptsData(api, eventval) {
    return new Promise((resolve, reject) => {
        try {
            let response = fnsndrequest(api, eventval);
            let parsedData = JSON.parse(response || "[]");
            resolve(parsedData);
        } catch (error) {
            reject(error);
        }
    });
}

// Function to render receipts dynamically
function renderReceipts(data) {
    data.forEach(receipt => {
        let receiptHtml = `
            <div class="receipts_div border p-3 mb-3 bg-white rounded">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="text-primary">NO: ${receipt.receipt_no || "N/A"}</h5>
                          <img src="img/icon/donload-icon.png"loading="lazy" alt="File Icon">
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <h6>₹ ${receipt.amount ? receipt.amount.toLocaleString() : "0"}</h6>
                        <small>NET AMOUNT</small>
                    </div>
                    <div class="col-6 text-end">
                        <h6>${formatDate(receipt.date)}</h6>
                        <small>DATE</small>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <h6>${receipt.payment_type || "N/A"}</h6>
                        <small>PAYMENT TYPE</small>
                    </div>
                    <div class="col-6 text-end">
                        <h6>${receipt.payment_no || "N/A"}</h6>
                        <small>NO.</small>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <h6>${formatDate(receipt.cheque_date)}</h6>
                        <small>CHEQUE DATE</small>
                    </div>
                    <div class="col-6 text-end">
                        <h6>${receipt.bank_name || "N/A"}</h6>
                        <small>BANK NAME</small>
                    </div>
                </div>
            </div>
        `;
        $("#receiptsContainer").append(receiptHtml);
    });
}

// Function to format date
function formatDate(dateString) {
    if (!dateString) return "N/A";
    return dateString.split("T")[0]; // Extracts YYYY-MM-DD
}
