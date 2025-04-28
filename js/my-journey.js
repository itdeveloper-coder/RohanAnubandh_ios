$(window).on("load", function () {
    var eventMy_Journey = "Event: My_Journey~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDataMy_Journey = fnsndrequest("AppCP", eventMy_Journey);
console.log(vrgetJsonDataMy_Journey);
    Promise.resolve(vrgetJsonDataMy_Journey)
    .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
    .then(datamy_journey => renderReceipts(datamy_journey))
    .catch(error => console.error("Error processing data:", error));
});


function renderReceipts(datamy_journey) {
    var myjourneyHtml = $("#my_journey_form").empty();
    datamy_journey.forEach(myjourney => {
        myjourneyHtml.append(` 
                  <div class="flex_card text-center">
              <div class="card_iconsuccess mb-3" id="kyc_success_yes">
                <img src="img/icon/star-bg-icon.png"loading="lazy" alt="File Icon" class="img-fluid">
              </div>
              <div class="card_contant_details ms-3">
                    <h6>${myjourney.Header}</h6>
               <small>${myjourney.Date}</small>
              </div>
            </div>
        `);
    });
}






