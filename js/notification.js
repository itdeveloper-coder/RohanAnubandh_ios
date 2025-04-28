
 $(window).on('load', async function () {

     var eventnotification = "Event:CustomerPortal_notifications~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
     // Ensure fnsndrequest returns a valid JSON object
     var vrgetJsonDatanotification = await fnsndrequest("AppCP_Construction_Phase", eventnotification);
     Promise.resolve(vrgetJsonDatanotification)
         .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
         .then(datanotification => notification(datanotification))
         .catch(error => console.error("Error processing data:", error));
 });


 function notification(datanotification) {

    var notificationContainer = $("#notification_all").empty();

    datanotification.forEach(notification => {
        notificationContainer.append(`
              <div class="flex_card text-center">
              <div class="card_iconsuccess mb-3" id="kyc_success_yes">
                <img src="img/icon/star-bg-icon.png"loading="lazy" alt="File Icon" class="img-fluid">
              </div>
              <div class="card_contant_details ms-3">
              <small>${notification.Date}</small>
              <p>
                ${notification.description}
              </p>
              </div>
            </div>
                  
        `);
    });
}




