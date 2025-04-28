$(window).on("load", function () {
    var eventdocuments_details = "Event: My_Document_List~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsondocuments_details = fnsndrequest("AppCP", eventdocuments_details);
console.log(vrgetJsondocuments_details);
    Promise.resolve(vrgetJsondocuments_details)
    .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
    .then(documents_details => renderReceipts(documents_details))
    .catch(error => console.error("Error processing data:", error));
});


function renderReceipts(documents_details) {
    var documents_detailsHtml = $("#documents_details_bind").empty();
    documents_details.forEach(documents_details => {
        documents_detailsHtml.append(`
         <div class="tdspay">
              <img src="img/icon/agreement-icon.png"loading="lazy" alt="File Icon" class="img-fluid me-3 documentsicon">
            <div class="card_contant_details">
              <h5>${documents_details.Title}</h5>
              <a href="${documents_details.FilePath}" target="_blank" download>
            <button class="custom_btn my-3"><img src="img/icon/donload-icon.png"loading="lazy" alt="File Icon"> Download</button>
              </a>
            </div>
          </div>
        `);
    });
}







