$(window).on("load", function () {
    var eventReceipts_Details = "Event:Reciept_Details~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDataReceipts_Details = fnsndrequest("AppCP", eventReceipts_Details);
    Promise.resolve(vrgetJsonDataReceipts_Details)
    .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
    .then(datard => renderReceipts(datard))
    .catch(error => console.error("Error processing data:", error));
});



function renderReceipts(datard) {
    var $receiptContainer = $("#receiptsContainer").empty(); // Cache jQuery selector

    let receiptHtml = ""; // Use string concatenation for better performance

    datard.forEach(receipt => {
        let receiptPath = receipt.Path && receipt.Path.trim() !== "" ? receipt.Path : null;

        receiptHtml += `
         <div class="receipts_div border p-3 mb-3 bg-white rounded">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="text-primary">NO: ${receipt.Receipt_id}</h5>
                    ${receiptPath ? `<a href="${receiptPath}" target="_blank">
                        <img src="img/icon/donload-icon.png" alt="Download">
                    </a>` : `<small class="text-muted">*</small>`}
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <h6>₹ ${receipt.Amount_Received ? receipt.Amount_Received.toLocaleString() : "0"}</h6>
                        <small>NET AMOUNT</small>
                    </div>
                    <div class="col-6 text-end">
                        <h6>${formatDate(receipt.Date)}</h6>
                        <small>DATE</small>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <h6>${receipt.Mode_of_Payment || "N/A"}</h6>
                        <small>PAYMENT TYPE</small>
                    </div>
                    <div class="col-6 text-end">
                        <h6>${receipt.Cheque_no || "N/A"}</h6>
                        <small>CHEQUE NO</small>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <h6>${formatDate(receipt.Cheque_date)}</h6>
                        <small>CHEQUE DATE</small>
                    </div>
                    <div class="col-6 text-end">
                        <h6>${receipt.Bank_Name || "N/A"}</h6>
                        <small>BANK NAME</small>
                    </div>
                </div>
            </div>`;
    });

    // Append all at once for performance optimization
    $receiptContainer.append(receiptHtml);
}




//function renderReceipts(datard) {
//    var receiptHtml = $("#receiptsContainer").empty();
//    datard.forEach(receipt => {
//        receiptHtml.append(`
//         <div class="receipts_div border p-3 mb-3 bg-white rounded">
//                <div class="d-flex justify-content-between align-items-center">
//                    <h5 class="text-primary">NO: ${receipt.Receipt_id}</h5>
//                       <a href="${receipt.Path}" target="_blank">   <img src="img/icon/donload-icon.png"loading="lazy" alt="File Icon"> </a>
//                        <!--<a href="${receipt.Path}" target="_blank" onclick="fndownload('${receipt.Path}')">   <img src="img/icon/donload-icon.png"loading="lazy" alt="File Icon"> </a> -->
//                </div>
//                <div class="row mt-3">
//                    <div class="col-6">
//                        <h6>₹ ${receipt.Amount_Received ? receipt.Amount_Received.toLocaleString() : "0"}</h6>
//                        <small>NET AMOUNT</small>
//                    </div>
//                    <div class="col-6 text-end">
//                        <h6>${formatDate(receipt.Date)}</h6>
//                        <small>DATE</small>
//                    </div>
//                </div>
//                <div class="row mt-3">
//                    <div class="col-6">
//                        <h6>${receipt.Mode_of_Payment || "N/A"}</h6>
//                        <small>PAYMENT TYPE</small>
//                    </div>
//                    <div class="col-6 text-end">
//                        <h6>${receipt.Cheque_no || "N/A"}</h6>
//                        <small>CHEQUE NO</small>
//                    </div>
//                </div>
//                <div class="row mt-3">
//                    <div class="col-6">
//                        <h6>${formatDate(receipt.Cheque_date)}</h6>
//                        <small>CHEQUE DATE</small>
//                    </div>
//                    <div class="col-6 text-end">
//                        <h6>${receipt.Bank_Name || "N/A"}</h6>
//                        <small>BANK NAME</small>
//                    </div>
//                </div>
//            </div>
       
                  
//        `);
//    });
//}





// Function to format date
function formatDate(dateString) {
    if (!dateString) return "N/A";
    return dateString.split("T")[0]; // Extracts YYYY-MM-DD
}
