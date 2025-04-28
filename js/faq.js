
$(window).on('load', function () {

        var eventval = "Event:Faq_Bind~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
        // Ensure fnsndrequest returns a valid JSON object
        var vrgetJsonData = fnsndrequest("AppCP", eventval);
        Promise.resolve(vrgetJsonData)
            .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
            .then(data => renderMilestones(data))
            .catch(error => console.error("Error processing data:", error));


});

function renderMilestones(data) {

    var paymentdataContainer = $("#faqAccordion").empty();
    data.forEach((data, index) => {
        paymentdataContainer.append(`
                  <div class="accordion-item">
                  <h2 class="accordion-header">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index + 1}">
                      ${data.Ques}
                      </button>
                  </h2>
                  <div id="collapse${index + 1}" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div class="accordion-body">
                      ${data.Answ}
                      </div>
                  </div>
              </div>
        `);
    });
}


