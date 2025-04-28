
 $(window).on('load',async function () {

     var eventsummary = "Event:CustomerPortal_payment_summary~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
     // Ensure fnsndrequest returns a valid JSON object
     var vrgetJsonDatasummary =await fnsndrequest("AppCP", eventsummary);
     Promise.resolve(vrgetJsonDatasummary)
         .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
         .then(datasummary => paymentsummary(datasummary))
         .catch(error => console.error("Error processing data:", error));


         var eventval = "Event:CustomerPortal_payment_Schedule~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
         // Ensure fnsndrequest returns a valid JSON object
         var vrgetJsonData =await fnsndrequest("AppCP", eventval);
         Promise.resolve(vrgetJsonData)
             .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
             .then(data => renderMilestones(data))
             .catch(error => console.error("Error processing data:", error));

             var eventval = "Event:CustomerPortal_other_charges~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
             // Ensure fnsndrequest returns a valid JSON object
             var vrgetJsonDataother_charges =await fnsndrequest("AppCP", eventval);
             Promise.resolve(vrgetJsonDataother_charges)
                 .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
                 .then(otherchargesdata => othercharges(otherchargesdata))
                 .catch(error => console.error("Error processing data:", error));
    


            

 });
 
 function renderMilestones(data) {
     var statusIcons = {
         "paid": "img/icon/success-icon.png",
         "due": "img/icon/pading-icon.png",
         "unclaimed": "img/icon/unsucess-icon.png"
     };
 
     var milestoneContainer = $(".milestones_list_div").empty();
 
     data.forEach((item, index) => {
        var iconSrc = statusIcons[item.Status] || "";
        var dateText = item.Date ? item.Date : "Date not available";

        var amountHtml = `
            <div class="excavation_footing row">
            <div class="col-6 mt-3">
                <h5 class="mb-0">₹&nbsp;${item["Installment due"]}</h5>
                <small class="text-muted">Installment Due</small>
                </div>
            <div class="col-6 mt-3">
                <h5 class="mb-0 ">₹&nbsp;${item["GST due"]}</h5>
                <small class="text-muted">GST Due</small>
     </div>
            <div class="col-6 mt-3">
                <h5 class="mb-0 ">₹&nbsp;${item["Amount to be paid"]}</h5>
                <small class="text-muted">Total Due Amount</small>
     </div>
            <div class="col-6 mt-3">
                <h5 class="mb-0 ">₹&nbsp;${item["Amount paid"]}</h5>
                <small class="text-muted">Amount Paid</small>
     </div>
            <div class="col-6 mt-3">
                <h5 class="mb-0 ">₹&nbsp;${item["Amount balance"]}</h5>
                <small class="text-muted">Balance Amount</small>
            </div>
            </div>
        `;
 
         milestoneContainer.append(`
             <div class="tdspay mt-3">
             <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index + 1}">
                              <div class="milestones_div m-2">
                                <img src="${iconSrc}"loading="lazy" alt="File Icon" class="img-fluid">
                                <div>
                                    <p>${item.Remark}</p>
                                    <small class="text-muted">${dateText}</small>
                                </div>
                            </div>
                            </button>
                        </h2>
                        <div id="collapse${index + 1}" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                ${amountHtml}
                            </div>
                        </div>
                    </div>
               
             </div>
         `);
     });
 }


 function paymentsummary(datasummary) {

    var paymentsummaryContainer = $("#taxes_other_charges").empty();

    datasummary.forEach(summary => {
        paymentsummaryContainer.append(`
                      <div class="col-6">
                        <p class="text-primary mb-2">${summary.Component}</p>
                        <h5 class="mb-2 mt-auto">₹&nbsp;${summary.Amount}</h5>
                      </div>
                  
        `);
    });
}

function all_receiptContainerfun(dataReceip) {
    var all_receiptContainer = $("#all_receipt_statement").empty();
    dataReceip.forEach(all_receipt => {
        all_receiptContainer.append(`
                  <div class="col-6>
                        <p class="text-primary mb-2">Received Amount</p>
                        <h5 class="mb-2 mt-auto">₹&nbsp;${all_receipt['Received Amount']}</h5>
                  </div>
        `);
    });
}





$(document).on('click', '#taxes_other_charges', function() {
    $("#taxesother_charges_modal").fadeIn();
    var eventdemand_letter = "Event:CustomerPortal_Amount_summary~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDatademand_letter = fnsndrequest("AppCP", eventdemand_letter);
    console.log(vrgetJsonDatademand_letter);
    Promise.resolve(vrgetJsonDatademand_letter)
    .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
    .then(dataAmount => amountsummary(dataAmount))
    .catch(error => console.error("Error processing data:", error));
});

$(document).on('click', '#140_interest_free_day', function() {
    $("#interest_free_day_modal").fadeIn();

});
function amountsummary(dataAmount) {

    var dataAmountContainer = $(".modal-content").empty();

    dataAmount.forEach(Amount => {
        dataAmountContainer.append(`
  <div class="content_taxes_other_charges mb-5">
    <h6>${Amount.Column_Name}</h6>
    <h4>₹&nbsp;${Amount.Amount}</h4>
  </div>
        `);
    });
}




$(document).on('click', '#close_modal_taxesother_charges', function() {

    $("#taxesother_charges_modal").hide()
});
$(document).on('click', '#close_modal_interest_free_day', function() {
    $("#interest_free_day_modal").fadeOut();
});





$(document).on('click', '#pay_demand_letter', function () {

    var eventdemand_letter = "Event:Demand_Letter~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDatademand_letter = fnsndrequest("AppCP", eventdemand_letter);
    //    alert(vrgetJsonDatademand_letter)
    getSubmdata = vrgetJsonDatademand_letter.replace(/\[|\]/g, "");
    const demand_letter = getValueByKey(getSubmdata, "Attach1");

    if (demand_letter == "") {
        $("#dounloaddemanderror").show().html("no file here")
    }
    else {
        fngetdownload(demand_letter);
        //fnDownload(demand_letter, "Demand_Letter.pdf");
    }
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
                    </a>` : `<small class="text-muted"></small>`}
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <h6>₹&nbsp;${receipt.Amount_Received ? receipt.Amount_Received.toLocaleString() : "0"}</h6>
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


// Function to format date
function formatDate(dateString) {
    if (!dateString) return "N/A";
    return dateString.split("T")[0]; // Extracts YYYY-MM-DD
}


function othercharges(otherchargesdata) {
    var statusIcons = {
        "paid": "img/icon/success-icon.png",
        "due": "img/icon/pading-icon.png",
        "unclaimed": "img/icon/unsucess-icon.png"
    };

    var otherchargesContainer = $("#othercharges_list_div").empty();

    otherchargesdata.forEach((item, index) => {
        var iconSrc = statusIcons[item.Status] || "";
        var dateText = item.Date ? item.Date : "Date not available";

        var amountHtml = `
            <div class="excavation_footing row">
            <div class="col-6 mt-3">
                <h5 class="mb-0">₹&nbsp;${item["Installment due"]}</h5>
                <small class="text-muted">Installment Due</small>
                </div>
            <div class="col-6 mt-3">
                <h5 class="mb-0 ">₹&nbsp;${item["GST due"]}</h5>
                <small class="text-muted">GST Due</small>
     </div>
            <div class="col-6 mt-3">
                <h5 class="mb-0 ">₹&nbsp;${item["Amount to be paid"]}</h5>
                <small class="text-muted">Total Due Amount</small>
     </div>
            <div class="col-6 mt-3">
                <h5 class="mb-0 ">₹&nbsp;${item["Amount paid"]}</h5>
                <small class="text-muted">Amount Paid</small>
     </div>
            <div class="col-6 mt-3">
                <h5 class="mb-0 ">₹&nbsp;${item["Amount balance"]}</h5>
                <small class="text-muted">Balance Amount</small>
            </div>
            </div>
        `;
 

            otherchargesContainer.append(`
            <div class="tdspay mt-3">
            <div class="accordion-item">
                       <h2 class="accordion-header">
                           <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseothercharges${index + 1}">
                             <div class="milestones_div m-2">
                               <img src="${iconSrc}"loading="lazy" alt="File Icon" class="img-fluid">
                               <div>
                                   <p>${item.Remark}</p>
                                 <small class="text-muted">${dateText}</small>
                               </div>
                           </div>
                           </button>
                       </h2>
                       <div id="collapseothercharges${index + 1}" class="accordion-collapse collapse" data-bs-parent="#otherchargesAccordion">
                           <div class="accordion-body">
                               ${amountHtml}
                           </div>
                       </div>
                   </div>
              
            </div>
        `);
    });
}




$("#receipts_tab").click(async function () {
    
    var eventReceip = "Event:Display_Receipt_Amount_Total~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    // Ensure fnsndrequest returns a valid JSON object
    var vrgetJsonDataReceip =await fnsndrequest("AppCP", eventReceip);
    Promise.resolve(vrgetJsonDataReceip)
        .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
        .then(dataReceip => all_receiptContainerfun(dataReceip))
        .catch(error => console.error("Error processing data:", error));

        var eventReceipts_Details = "Event:Reciept_Details~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
        var vrgetJsonDataReceipts_Details =await fnsndrequest("AppCP", eventReceipts_Details);
        Promise.resolve(vrgetJsonDataReceipts_Details)
        .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
        .then(datard => renderReceipts(datard))
        .catch(error => console.error("Error processing data:", error));
        loadReceiptStatement();
});

async function loadReceiptStatement() {
    var eventvalDownload = "Event:Download_Receipt_Statement~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDataReceipt = await fnsndrequest("AppCP", eventvalDownload);
    fngetdatawithtableWithClass(vrgetJsonDataReceipt, "#Receipt_Statement_table", "Receipt_Statement_table_tbl", "table table-hover align-middle w-100", "", "", "");
    }

//$('#Receipt_Statement_file').on('click', function () {
//    const { jsPDF } = window.jspdf;

//    var doc = new jsPDF('landscape', 'pt', 'a4'); // A4 Landscape
//    doc.text("Receipt Statement", 40, 30);

//    doc.autoTable({
//        html: '#Receipt_Statement_table_tbl',
//        startY: 50,
//        styles: { fontSize: 8, overflow: 'linebreak' },
//        headStyles: { fillColor: [0, 102, 204] }
//    });

//    // Cordova-friendly: Open PDF in a new tab
//    var blob = doc.output('blob');
//    var url = URL.createObjectURL(blob);
//    window.open(url, '_blank');
//});

$('#Receipt_Statement_file').on('click', function () {
    const { jsPDF } = window.jspdf;

    var doc = new jsPDF('landscape', 'pt', 'a4'); // A4 Landscape
    doc.text("Receipt Statement", 40, 30);

    doc.autoTable({
        html: '#Receipt_Statement_table_tbl',
        startY: 50,
        styles: { fontSize: 8, overflow: 'linebreak' },
        headStyles: { fillColor: [0, 102, 204] }
    });

    // Generate PDF Blob
    var pdfBlob = doc.output('blob');

    // Get Cordova file system path (downloads folder)
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dirEntry) {
        dirEntry.getFile("Receipt_Statement.pdf", { create: true, exclusive: false }, function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.write(pdfBlob);

                fileWriter.onwriteend = function () {
                    // Open the file after saving
                    cordova.plugins.fileOpener2.open(
                        fileEntry.nativeURL,
                        'application/pdf',
                        {
                            error: function (e) {
                                console.log("Error opening file: " + JSON.stringify(e));
                                alert("PDF saved, but cannot open. Please check your downloads.");
                            },
                            success: function () {
                                console.log("PDF opened successfully");
                            }
                        }
                    );
                };

                fileWriter.onerror = function (e) {
                    console.error("File write failed: " + JSON.stringify(e));
                    alert("Failed to write file");
                };

            }, function (err) {
                console.error("CreateWriter error: " + JSON.stringify(err));
            });
        }, function (err) {
            console.error("getFile error: " + JSON.stringify(err));
        });
    }, function (err) {
        console.error("resolveLocalFileSystemURL error: " + JSON.stringify(err));
    });
});


function fngetdownload(fulfilpath) {
    // Local file (from Cordova's filesystem)
    //var fileUrl = cordova.file.externalDataDirectory + "image1.jpg";
    var fileUrl = fulfilpath;
    var fileName = fulfilpath.split('/').pop(); // Get file name from path
    console.log(fileUrl + " --- " + fileName);
    var $a = $('<a>')
        .attr('href', fileUrl)
        .attr('download', fileName)
        .attr('target', '_blank')// Suggests filename
        .css('display', 'none');

    $('body').append($a);
    $a[0].click();
    $a.remove();
}