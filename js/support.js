

$(window).on('load', async function () {
    var eventvaldld = "Event:Bind_Ticket_Category~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    fnBindDropdownlist("AppCP", eventvaldld, "#support2_ddl_category", "0", "0", "Select Category", "0");
    // Get the ticket count
    var eventTicket_Count = "Event:Ticket_Count~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDataeventTicket_Count = fnsndrequest("AppCP", eventTicket_Count);
    getSubmdata = vrgetJsonDataeventTicket_Count.replace(/\[|\]/g, "");
    const Ticket_Count = getValueByKey(getSubmdata, "Msg");
    if (Ticket_Count == "") {
        $("#Ticket_Counthide").hide();
    }
    else {
        $(".Ticket_Count").html(Ticket_Count);
    }
    // Get the ticket count
    var eventTicket_Bind = "Event:Ticket_Bind~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    // Ensure fnsndrequest returns a valid JSON object
    var vrgetJsonDataTicket_Bind = await fnsndrequest("AppCP", eventTicket_Bind);
    Promise.resolve(vrgetJsonDataTicket_Bind)
        .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
        .then(dataTicket_Bind => Ticket_Bind(dataTicket_Bind))
        .catch(error => console.error("Error processing data:", error));

});
function Ticket_Bind(dataTicket_Bind) {

    var Ticket_BindContainer = $(".Ticket_Bind_all").empty();
    dataTicket_Bind.forEach(Ticket_Bind => {
        Ticket_BindContainer.append(`
            <div class="flex_card text-center Btnclick Btnclick2" data-section="total_ticket_section" id="${Ticket_Bind.ticketid}" style="cursor: pointer;" onclick="handleTicketClick('${Ticket_Bind.ticketid}')">
                <div class="card_contant_details">
                    <span>#${Ticket_Bind.ticketid}</span>
                    <h5>${Ticket_Bind.category}</h5>
                    <p>${Ticket_Bind.description}</p>
                    <img src="img/icon/date-schedule-icon.png" loading="lazy" alt="File Icon" class="img-fluid me-2"><span>${Ticket_Bind.Date}</span>
                    <div class="support-btn-group">
                        <button class="customsupport-btn" style="background-color: ${Ticket_Bind.status === 'Close' ? '#ff4121' : 'green'};">${Ticket_Bind.status}</button>
                    </div>
                </div>
            </div>
        `);
    });
}
$(document).on('click', '.Btnclick2', function () {
    var section = $(this).data('section'); // Check if the data attribute is retrieved
    showSection(section);
    history.pushState({ section: section }, section, "?section=" + section);
}
);

async function handleTicketClick(ticketId) {
    // Get the ticket count
    var eventTicket_BindBy_Id = "Event:Ticket_Bind_By_Id~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid")+ "~!Ticket_Id:" + ticketId;
    // Ensure fnsndrequest returns a valid JSON object
    var vrgetJsonDataTicket_Bind_by_id = await fnsndrequest("AppCP", eventTicket_BindBy_Id);
    Promise.resolve(vrgetJsonDataTicket_Bind_by_id)
    .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
    .then(dataTicket_Bind_by_id => Ticket_Bind_by_id(dataTicket_Bind_by_id))
    .catch(error => console.error("Error processing data:", error));
}

  function Ticket_Bind_by_id(dataTicket_Bind_by_id) {

    var Ticket_Bind_by_id = $("#total_ticket").empty();
    dataTicket_Bind_by_id.forEach(TicketBind => {
        Ticket_Bind_by_id.append(`
          <div class="px-2">
          <div class="flex_card text-center">
            <div class="card_contant_details">
              <div class="tdspay mb-3">

                <div class="totalticket_btn">
                  <button class="customsupportgrren-btn " style="background-color: ${TicketBind.status === 'Close' ? '#ff4121' : 'green'};">${TicketBind.status}</button>
                </div>
                <div class="my-3">
                  <p>Complaint ID</p>
                  <h6>${TicketBind.ticketid}</h6>
                </div>
                <div class="mb-3">
                  <p>Category</p>
                  <h6>${TicketBind.category}</h6>
                </div>
                <div class="mb-3">
                  <p>Description</p>
                  <small>${TicketBind.description}</small>
                </div>
              </div>
              <div class="tdspay  mb-3">

                <div class="my-3">
                  <p>Complaint ID</p>
                </div>
                <div class="mb-3 ttsehedule">
                  <img src="img/icon/date-schedule-icon.png"loading="lazy" alt="File Icon">
                  <div class="">
                    <h6>Ticket registered</h6>
                    <small>${TicketBind.ticketcreatedtime}</small>
                  </div>

                </div>
                <div class="mb-3 ttsehedule">
                  <img src="img/icon/date-schedule-icon.png"loading="lazy" alt="File Icon">
                  <div class="">
                    <h6>Ticket Resolved</h6>
                    <small>${TicketBind.ticketclosedtime}</small>
                  </div>

                </div>
              </div>
              <div class="tdspay mb-3">
                <h6 class="text-primary">
                  Attachments
                </h6>
                 <div class="card_attach_image ">
                   <a href="${TicketBind.FilePath}" target="_blank"> <span class="material-symbols-outlined me-2">visibility</span> View Attach File </a>
                </div>
              </div>
                  <div class="tdspay mb-3">
              <button type="button" class="btn btn-primary" id="submit_btn_ticket">Delete</button>
               </div>
            </div>
          </div>
        </div>
        `);

   
    });
}





// Camera Functionality
// function openCamera() {
//     navigator.camera.getPicture(
//         function (imageURI) {
//             var imageElement = document.getElementById("capturedImage");
//             imageElement.src = imageURI;
//             imageElement.style.display = "block"; // Show image
//             alert("✅ Picture captured successfully!");
//         },
//         function (error) {
//             alert("❌ Failed to capture image: " + error);
//         },
//         {
//             quality: 50, // Adjust image quality
//             destinationType: Camera.DestinationType.FILE_URI,
//             sourceType: Camera.PictureSourceType.CAMERA
//         }
//     );
// }

$("input[name='preferredtime']").change(function () {
    vartime = $(this).val(); // Get selected radio button value
    $("#support1_text_preferredtime").val(vartime); // Set the value to hidden input
});

// Initialize jQuery UI Datepicker
$(".datepicker").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0 // Prevent selecting past dates
});

// Trigger file input when button is clicked
$("#attach_file_btn").click(function () {
    $("#support1_file_preferredfile").click();
});


$("#support1_file_preferredfile").change(function () {
    let fileName = $(this).val().split("\\").pop();
    if (fileName) {
        $("#file_name_display").text("Selected File: " + fileName);
        $("#errorfile").hide(); // Hide error if file is selected
    } else {
        $("#file_name_display").text("");
    }
});

// Form Validation on Submit
// $("#submit_btn_ticket").click(function () {
//     let isValid = true;

//     // Validate Description
//     if ($("#support1_text_description").val().trim() === "") {
//         $("#errordescription").show();
//         isValid = false;
//     } else {
//         $("#errordescription").hide();
//     }

//     // Validate Preferred Date
//     if ($("#support1_text_preferreddate").val().trim() === "") {
//         $("#errorpreferreddate").show();
//         isValid = false;
//     } else {
//         $("#errorpreferreddate").hide();
//     }

//     // Validate Preferred Time Slot
//     if (!$("input[name='preferredtime']:checked").val()) {
//         $("#errorpreferredtime").show();
//         isValid = false;
//     } else {
//         $("#errorpreferredtime").hide();
//     }

//     // Validate File Attachment
//     if ($("#support1_file_preferredfile").val().trim() === "") {
//         $("#errorfile").show();
//         isValid = false;
//     } else {
//         $("#errorfile").hide();
//     }

//     // Submit the form if all validations pass
//     if (isValid) {
//         //alert("Form Submitted Successfully!");

//         var fileInput = document.getElementById("support1_file_preferredfile");
//         if (fileInput.files.length === 0) {
//             var eventval11 = "Event:New_Ticket_Raise~!cpuserid:" + localStorage.getItem("cpuserid") +
//                 "~!cpsaleid:" + localStorage.getItem("cpsaleid") +
//                 "~!cploginid:" + localStorage.getItem("cploginid") +
//                 "~!cpSpecification:" + $("#support1_text_description").val() +
//                 "~!cpPreferdate:" + $("#support1_text_preferreddate").val() +
//                 "~!cpTimeSlot:" + $("#support1_hdn_preferredtime").val() +
//                 "~!cpticketAtt:" + "" +
//                 "~!cpticketGuids:" + "";

//             var getSubmdata = fnsndrequest("AppCP", eventval11);
//             getSubmdata = getSubmdata.replace(/\[|\]/g, "");

//             const vrstatus = getValueByKey(getSubmdata, "Status");
//             const vrmsg = getValueByKey(getSubmdata, "Msg");
//             if (vrstatus === "Success") {
//                 alert("✅ " + vrmsg + "!");
//                                 } else {
//                 alert("❌ " + vrmsg + "!");
//             }
//         }
//         else {
//             var file = fileInput.files[0]; // Get file object
//             var formData = new FormData();
//             formData.append("file", file, file.name);

//             fetch("https://customerportal.rohanbuilders.com/Handler1.ashx", {
//                 method: "POST",
//                 body: formData
//             })
//                 .then(response => response.text()) // Ensure correct response handling
//                 .then(result => {
//                     console.log("🔹 Server Response:", result);

//                     var strvarguid = "";
//                     var strvarfilname = "";

//                     if (result.trim() === "") {
//                         strvarguid = "";
//                         strvarfilname = "";
//                     } else {
//                         var parts = result.split(",");
//                         strvarguid = parts[0] || "";
//                         strvarfilname = parts[1] || "";
//                     }

//                     var eventval11 = "Event:New_Ticket_Raise~!cpuserid:" + localStorage.getItem("cpuserid") +
//                         "~!cpsaleid:" + localStorage.getItem("cpsaleid") +
//                         "~!cploginid:" + localStorage.getItem("cploginid") +
//                         "~!cpSpecification:" + $("#support1_text_description").val() +
//                         "~!cpPreferdate:" + $("#support1_text_preferreddate").val() +
//                         "~!cpTimeSlot:" + $("#support1_hdn_preferredtime").val() +
//                         "~!cpticketAtt:" + strvarfilname +
//                         "~!cpticketGuids:" + strvarguid;

//                     var getSubmdata = fnsndrequest("AppCP", eventval11);
//                     getSubmdata = getSubmdata.replace(/\[|\]/g, "");

//                     const vrstatus = getValueByKey(getSubmdata, "Status");
//                     const vrmsg = getValueByKey(getSubmdata, "Msg");

//                     if (vrstatus === "Success") {
//                         alert("✅ " + vrmsg + "!");
//                                 } else {
//                         alert("❌ " + vrmsg + "!");
//                     }
//                 })
//                 .catch(error => {
//                     console.error("❌ Upload error:", error);
//                     alert("❌ Error uploading image: " + error);
//                 });

//         }
//     }

// });

$("#submit_btn_ticket").click(function () {

    let isValid = true;

    // Validate Category
    if ($("#support2_ddl_category").val() === "0") {
        $("#errorcategory").show();
        isValid = false;
    } else {
        $("#errorcategory").hide();
    }

    // Validate Description
    if ($("#support1_text_description").val().trim() === "") {
        $("#errordescription").show();
        isValid = false;
    } else {
        $("#errordescription").hide();
    }

    if (!isValid) return;


    const fileInput = document.getElementById("support1_file_preferredfile");
    const description = $("#support1_text_description").val();
    const cpuserid = localStorage.getItem("cpuserid");
    const cpsaleid = localStorage.getItem("cpsaleid");
    const cploginid = localStorage.getItem("cploginid");
    
    // File selected
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("file", file, file.name);
    
        fetch("https://customerportal.rohanbuilders.com/Handler1.ashx", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            console.log("🔹 Server Response:", result);
    
            const [guid = "", filename = ""] = result.trim().split(",");
    
            const eventval = `Event:New_Ticket_Raise~!cpuserid:${cpuserid}` +
                `~!cpsaleid:${cpsaleid}` +
                `~!cploginid:${cploginid}` +
                `~!cpSpecification:${description}` +
                `~!cpticketAtt:${filename}~!cpticketGuids:${guid}`;
    
            const responseData = fnsndrequest("AppCP", eventval).replace(/\[|\]/g, "");
            const status = getValueByKey(responseData, "Status");
            const msg = getValueByKey(responseData, "Msg");
    
            $("#errorallform")
            .show()
            .css("color", status === "Success" ? "green" : "red")
            .html(status === "Success" ? "✅ " + msg : "❌ " + msg);
        })
        .catch(error => {
            $("#errorallform")
            .show()
            .css("color", "red")
            .html("❌ Error uploading file: " + error);
        });
    } 
    // No file selected
    else {
        const eventval = `Event:New_Ticket_Raise~!cpuserid:${cpuserid}` +
            `~!cpsaleid:${cpsaleid}` +
            `~!cploginid:${cploginid}` +
            `~!cpSpecification:${description}` +
            `~!cpticketAtt:~!cpticketGuids:`;
    
        const responseData = fnsndrequest("AppCP", eventval).replace(/\[|\]/g, "");
        const status = getValueByKey(responseData, "Status");
        const msg = getValueByKey(responseData, "Msg");
    
        $("#errorallform")
        .show()
        .css("color", status === "Success" ? "green" : "red")
        .html(status === "Success" ? "✅ " + msg : "❌ " + msg);
    }
            // ✅ Clear form inputs on success
        setTimeout(() => {
          // (You can move this into your `.then()` block if needed only on success)
          $("#support_ticket_form").find("input[type='text'], input[type='file'], textarea").val("");
          $("#support_ticket_form").find("select").val("0");
          $(".error-message , #errorallform").hide();
          $("#file_name_display").empty();
          window.location.href = "Support.html";
        }, 1000);
    
});
