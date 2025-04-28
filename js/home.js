

$(window).on('load',async function () {
    successfully();
    var eventcd = "Event:Check_Collection_Document~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDdata = await fnsndrequest("AppCP", eventcd);
   // console.log(vrgetJsonDatacasd);
   var getSubmdatacd ="";
   getSubmdatacd = vrgetJsonDdata.replace(/\[|\]/g, "");
    const cdmsg = getValueByKey(getSubmdatacd, "Msg");
    const cdtitle = getValueByKey(getSubmdatacd, "title");
    const cdstatus = getValueByKey(getSubmdatacd, "Status");
    $("#msg_bind_collectdoc").html(cdtitle);
});


    async function agreementsignignbtn() {
    var eventvideo = "Event:Explainer_Video~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDatavideo = await fnsndrequest("AppCP", eventvideo);
    var getSubmdatavideo = vrgetJsonDatavideo.replace(/\[|\]/g, "");
    var Video_Link = getValueByKey(getSubmdatavideo, "Video_Link");

    const embedURL = convertToEmbedURL(Video_Link);
      originalSrc = embedURL; // Store the original video URL
      $("#youtubeIframe").attr("src", embedURL);
}

var player; // YouTube Player variable

function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtubeIframe", {
        events: {
            "onReady": onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    $(window).on("beforeunload", function () {
        if (player && player.pauseVideo) {
            player.pauseVideo(); // Pause video instead of removing src
        }
    });
}
// Load YouTube Iframe API
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Restore video when user comes back
$(document).ready(function () {
    if ($("#youtubeIframe").attr("src") === "") {
        $("#youtubeIframe").attr("src", originalSrc); // Restore video when coming back
    }
});

    function convertToEmbedURL(url) {
      if (url.includes("youtube.com/watch?v=")) {
        return url.replace("watch?v=", "embed/");
      } else if (url.includes("youtu.be/")) {
        return url.replace("youtu.be/", "youtube.com/embed/");
      }
      return url; // Return as is if already an embed link
    }

$("#playButton").on("click", function () {
  var iframe = $("#youtubeIframe");
  iframe.attr("src", iframe.attr("src") + "&autoplay=1"); // Appends autoplay parameter
});



$("#backButtonvideo").on("click", function (e) {
    e.preventDefault();

    let currentPage = $(".page:visible").attr("id"); // Assuming pages have 'page' class
    console.log("Current Page:", currentPage);

    let url = window.location.href;
    let fileName = window.location.pathname.split("/").pop(); // Extract filename

    console.log("URL:", url);
    console.log("File Name:", fileName);

    history.back(); // Navigate back
});



$("#agreement_signign_btn").click(function () {
    agreementsignignbtn();
   });


async function successfully() {
    var eventKycStatus = "Event:KycStatus~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDataKycStatus = await fnsndrequest("AppCP", eventKycStatus);
    getSubmdata = vrgetJsonDataKycStatus.replace(/\[|\]/g, "");
    const KycStatus = getValueByKey(getSubmdata, "Msg");
    const tittle = getValueByKey(getSubmdata, "title");
    $("#msg_bind_kycdetails").text(tittle);
    $("#pkycstatus").html(" &#x24D8; Please complete the KYC process");
 if(KycStatus == "Approved" || KycStatus == "Pending")
    {
    if(KycStatus == "Approved"){
        $("#kyc_document_upload_btn").removeClass("d-none , main_custom_btn ").addClass("custom_btn").html("view");
        $("#kyc_approve").removeClass("d-none");
        $("#pkycstatus").html(" &#x24D8; " + tittle);
    }

    else if(KycStatus == "Pending"){
        $("#kyc_document_upload_btn").removeClass("d-none");
        $("#kyc_pending").removeClass("d-none");
        $("#agreement_signign_btn").removeClass("d-none");
    
    }
    var eventcasd = "Event:Check_Agreement_Singing_date~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDatacasd = await fnsndrequest("AppCP", eventcasd);
   // console.log(vrgetJsonDatacasd); 
    getSubmdata = vrgetJsonDatacasd.replace(/\[|\]/g, "");
    const msgcasd = getValueByKey(getSubmdata, "Msg");
    const RequestedDate = getValueByKey(getSubmdata, "RequestedDate");
    $("#msg_bind_datetime").text(RequestedDate);
        // msg_bind_datetime
        if(msgcasd == "Yes"){
            $("#agreement_signign_details_approve").removeClass("d-none");
            $("#agreement_signign_btn").addClass("d-none");
            $("#agreement_signign_approve").removeClass("d-none");
            $("#registration_call_success").removeClass("d-none");
            $("#request_for_appointmen_call").removeClass("d-none");
    var eventcall = "Event:Check_Registration_call~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDatacall = await fnsndrequest("AppCP", eventcall);
    getSubmdata = vrgetJsonDatacall.replace(/\[|\]/g, "");
    const msgcall = getValueByKey(getSubmdata, "Msg");
    const varRequestedDate = getValueByKey(getSubmdata, "RequestedDate");
    $("#msg_bind_datetime_registration_call").text(varRequestedDate);
    
    // msg_bind_datetime
    if(msgcall == "Yes"){
        $("#registration_call_success").removeClass("d-none");
        $("#registration_success_approve").removeClass("d-none");
        $("#collectdoc_success_yes").removeClass("d-none");
        $("#request_for_appointmen_call").addClass("d-none");
        $("#registration_approve").removeClass("d-none");
        $("#agreement_signign_p").addClass("d-none");
    }
    else{
        $("#registration_call_success").removeClass("d-none");
        $("#registration_approve").addClass("d-none");
    }
    // fnUpdatePageData(vrgetJsonDatasummary, "#loading");
        }
        else{
            $("#agreement_signign_details_approve").removeClass("d-none");
            $("#agreement_signign_approve").addClass("d-none");
        }
}
    else{
        $("#kyc_document_upload_btn").removeClass("d-none");
        $("#kycdetails_approve").removeClass("d-none");
        $("#kyc_pending").addClass("d-none");
        $("#agreement_signign_btn").addClass("d-none");
    }
}

$("#collec_your_document_btn").click(async function () {
    $("#collec_your_document_success_yes").addClass("d-none");
    $("#collectdoc_success_yes").removeClass("d-none");
    var eventDocuments_Collection_Title = "Event:Documents_Collection_Title~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDataeventDocuments_Collection_Title = await fnsndrequest("AppCP", eventDocuments_Collection_Title);
    getSubmdata = vrgetJsonDataeventDocuments_Collection_Title.replace(/\[|\]/g, "");
    
    const dcMsg = getValueByKey(getSubmdata, "Status");
    
    if(dcMsg == "Success"){
        const Documents_Collection_Title = getValueByKey(getSubmdata, "Title");
        $("#Documents_Collection_Title").html(Documents_Collection_Title);
    }
    else{
       alert("No data found");
       
    }
    
    });


$("#D_D_Collection").click(async function () {
    var eventD_D_Collection = "Event:Download_Document_Collection~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDataD_D_Collection = await fnsndrequest("AppCP", eventD_D_Collection);
    /*alert(vrgetJsonDataD_D_Collection);*/
    getSubmdata = vrgetJsonDataD_D_Collection.replace(/\[|\]/g, "");
    const D_D_Collection = getValueByKey(getSubmdata, "Msg");
    const Dstatus = getValueByKey(getSubmdata, "Status");
    if (Dstatus == "Success") {
        if (D_D_Collection == "") {
            alert("Currently Docuent not available");
        }
        else {
            fnDownload(D_D_Collection, "D_D_Collection.pdf");
        }
       
    }
    else {
        $("#errer_D_D_Collection").show().html("Agreement copy is not uploaded yet.");
    }
});

 $("#download_agreement").click(async function () {
    var eventdownload_agreement = "Event:Download_Agreement~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDatadownload_agreement =await fnsndrequest("AppCP", eventdownload_agreement);
    getSubmdata = vrgetJsonDatadownload_agreement.replace(/\[|\]/g, "");
    const download_agreement = getValueByKey(getSubmdata, "Msg");
    if(download_agreement == ""){
        $("#download_agreement_sub").show().html("Agreement copy is not uploaded yet.");
    }
    else{
 fnDownload(download_agreement,"download_agreement.pdf");
    }
 });
 


// Function to trigger file input
async function triggerFileInput(id) {
    $(`#file-input-${id}`).click();
}

// Function to update file name display
async function updateFileName(id) {
    const fileInput = $(`#file-input-${id}`)[0];
    const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'No file chosen';
    $(`#file-name-${id}`).text(fileName);
    $(`#file-name-${id}`).parent().removeClass('hidden');
}

// Function to remove file selection
async function removeFile(id) {
    $(`#file-input-${id}`).val(null);
    $(`#file-name-${id}`).text('No file chosen');
    $(`#file-name-${id}`).parent().addClass('hidden');
}
$(".menu-items a").on("click",async function () {
    var offcanvasMenu = bootstrap.Offcanvas.getInstance($("#offcanvasMenu")[0]);
    if (offcanvasMenu) {
        offcanvasMenu.hide();
    }
});




async function bindKyc() {
    const eventval = `Event:Bind_Kyc~!cpsaleid:${localStorage.getItem("cpsaleid")}~!cploginid:${localStorage.getItem("cploginid")}~!cpuserid:${localStorage.getItem("cpuserid")}`;
    const vrgetJsonData = await fnsndrequest("AppCP", eventval);
    fnUpdatePageData(vrgetJsonData, "#loading");

    // Reset visibility
    $('#cpkycapplicant3').addClass('d-none');
    $("#addapplicant2").removeClass("d-none");
    $('#cpkycapplicant2').addClass('d-none');
    $("#addapplicant3").addClass("d-none");

    // Handle applicant 2 visibility
    let hideDiv = true;
    $('[id$="_applicant2"]').each(function () {
        const text = $(this).text().trim();
        const val = $(this).val?.() || "";
        if (text !== "Upload" && text !== "" && val !== "Upload" && val !== "") {
            hideDiv = false;
        }
    });

    if (hideDiv) {
        $('#cpkycapplicant2').addClass('d-none');
    } else {
        $("#addapplicant2").addClass("d-none");
        $("#addapplicant3").removeClass("d-none d-lg-none").addClass("d-flex");
        $("#cpkycapplicant2").removeClass("d-none");
    }

    // Handle applicant 3 visibility
    let hideDiv2 = true;
    $('[id$="_applicant3"]').each(function () {
        const text = $(this).text().trim();
        const val = $(this).val?.() || "";
        if (text !== "Upload" && text !== "" && val !== "Upload" && val !== "") {
            hideDiv2 = false;
        }
    });

    if (hideDiv2) {
        $('#cpkycapplicant3').addClass('d-none');
    } else {
        $("#addapplicant3").addClass("d-none").removeClass("d-flex");
        $("#cpkycapplicant3").removeClass("d-none");
    }

    // Format remark labels
    $("[id*='_remark_applicant']").each(function () {
        const label = $(this);
        const text = label.text().trim();

        if (text.includes("Approved")) {
            label.css("color", "green").addClass("messageinfo");
        } else if (text === "") {
            label.removeClass("messageinfo").css("color", "");
        } else {
            label.css("color", "red").addClass("messageinfo");
        }
    });
}



$("#kyc_document_upload_btn , #btnu_doc_viewiconsuccess").click(function () {
    bindKyc();
    successfully();
});

$(document).on('click', '.upload-icon', function () {
    // Finds the nearest file input within the card structure
    const fileInput = $(this).closest('.card_contant_details').find('input[type="file"]');
    if (fileInput.length) fileInput.trigger('click');
});

$(document).on('click', '.delete-icon', async function () {
    const kycId = $(this).attr('id').replace("delete_", "");

    // Call backend delete handler
    const deleteEvent = `Event:Delete_KYC~!kycid:${kycId}`;
    let thcheck = await FormSubmissionshandles("test_", "AppCP", "#loading", deleteEvent + "~!");

    if (thcheck.includes("Success")) {
        // Smart DOM traversal (no reliance on special classes or fixed IDs)
        const cardSection = $(this).closest('.card_contant_details');
        const fileInput = cardSection.find('input[type="file"]');
        const remarkLabel = cardSection.find('[id*="_remark_"]'); // dynamically finds label with "remark" in id

        // Set success message
        if (remarkLabel.length) {
            remarkLabel
                .text("Document deleted successfully!")
                .css("color", "green")
                .addClass("messageinfo");

            // Clear input & refresh
            setTimeout(() => {
                fileInput.val("");
                remarkLabel.removeClass("messageinfo");
                bindKyc();
            }, 1000);
        } else {
            bindKyc(); // Just refresh if no label found
        }
    } else {
        remarkLabel
        .text(thcheck)
    }
});


function handleKycUpload(labelId, fileInputId, remarkId = null) {
    // Click on "Upload" label triggers file input
    $(`#${labelId}`).click(function () {
        if ($(this).text() === "Upload") {
            $(`#${fileInputId}`).click();
        }
    });

    // File input change handler
    $(`#${fileInputId}`).change(async function () {
        let file = this.files[0];
        if (!file) return;

        let varevent = `Event:KYC_Process~!cpuserid:${localStorage.getItem("cpuserid")}~!cpsaleid:${localStorage.getItem("cpsaleid")}~!cploginid:${localStorage.getItem("cploginid")}`;
        let thcheck = await FormSubmissionshandles("customerkyc_", "AppCP", "#loading", varevent + "~!");

        if (thcheck.includes("Success")) {
      

            // Show success message, then reset color
            if (remarkId) {
                $(`#${remarkId}`)
                    .text("Document Upload successfully!")
                    .css("color", "green")
                    .addClass("messageinfo");

                setTimeout(() => {
                    $(this).val(""); // Clear file input
                    bindKyc(); // Refresh UI
                    $(`#${remarkId}`).css("color", "red").addClass("messageinfo");;
                }, 1000);
            }
        } else {
            // Show error message
            if (remarkId) {
                let errorMsg = thcheck.split('>')[1]?.trim();
                $(`#${remarkId}`)
                    .text(errorMsg || "Upload failed!")
                    .css("color", "red");
            }
            $("#loading").hide();
        }
    });
}

// ✅ Call the function for each document
handleKycUpload("customer_lbl_adharcard", "customerkyc_file_adharcard_applicant1_Template29", "customer_lbl_adharcard_remark_applicant1");
handleKycUpload("customer_lbl_Pancard", "customerkyc_file_pan_applicant1_Template30", "customer_lbl_Pancard_remark_applicant1");
handleKycUpload("customer_lbl_photo", "customerkyc_file_photo_applicant1_Template31" ,"customer_lbl_photo_remark_applicant1");
handleKycUpload("customer_lbl_loanletter", "customerkyc_file_loanletter_applicant1_Template32","customer_lbl_loanletter_remark_applicant1");
handleKycUpload("customer_lbl_adharcard_applicant2", "customerkyc_file_adharcard_applicant2_Template29","customer_lbl_adharcard_remark_applicant2");
handleKycUpload("customer_lbl_Pancard_applicant2", "customerkyc_file_pan_applicant2_Template30", "customer_lbl_Pancard_remark_applicant2");
handleKycUpload("customer_lbl_photo_applicant2", "customerkyc_file_photo_applicant2_Template31" ,"customer_lbl_photo_remark_applicant2");
handleKycUpload("customer_lbl_adharcard_applicant3", "customerkyc_file_adharcard_applicant3_Template29","customer_lbl_adharcard_remark_applicant3");
handleKycUpload("customer_lbl_Pancard_applicant3", "customerkyc_file_pan_applicant3_Template30", "customer_lbl_Pancard_remark_applicant3");
handleKycUpload("customer_lbl_photo_applicant3", "customerkyc_file_photo_applicant3_Template31" ,"customer_lbl_photo_remark_applicant3");


//addapplicant2
$("#addapplicant2").click(function () {
    $(this).addClass("d-none"); // Hide using d-none
    $("#cpkycapplicant2").removeClass("d-none"); // Show cpkycapplicant2
    $("#cpkycapplicant3").addClass("d-none");
    $("#addapplicant3").removeClass("d-none");
    $("#addapplicant3").addClass("d-flex");
});
//addapplicant2
$("#addapplicant3").click(function () {
    $(this).addClass("d-none");
    $("#addapplicant3").removeClass("d-flex");
    $("#cpkycapplicant3").removeClass("d-none"); 
    
});

// Close button functionality
$("#closeBtn").click(function () {
    $("#addapplicant3").addClass("d-none");
    $("#cpkycapplicant2").addClass("d-none"); // Hide using d-none
    $("#addapplicant2").removeClass("d-none"); // Show addapplicant2
    $("#customerkyc_file_adharcard_applicant2_Template29").val(""); //Clear file adharcard input
    $("#customerkyc_file_pan_applicant2_Template30").val(""); // Clear file pan input
    $("#customerkyc_file_photo_applicant2_Template31").val(""); // Clear file photo input
    $("#customerkyc_file_loanletter_applicant2_Template32").val(""); // Clear file loanletter input
});
$("#closeBtn_applicant3").click(function () {
    $("#cpkycapplicant3").addClass("d-none"); // Hide using d-none
    $("#addapplicant3").removeClass("d-none"); // Show addapplicant2
    $("#addapplicant3").addClass("d-flex"); // Show addapplicant2
    $("#customerkyc_file_adharcard_applicant3_Template29").val(""); //Clear file adharcard input
    $("#customerkyc_file_pan_applicant3_Template30").val(""); // Clear file pan input
    $("#customerkyc_file_photo_applicant3_Template31").val(""); // Clear file photo input
    $("#customerkyc_file_loanletter_applicant3_Template32").val(""); // Clear file loanletter input
});

// Open modal and load PDF
// $(document).on('click', '.visibility-icon', function (e) {
//     e.preventDefault();
  
//     const pdfUrl = $(this).closest('a').attr('href');
//     $('#pdf_iframe').attr('src', pdfUrl);
//     $('#imagesifram').fadeIn();
//   });
  
  // Close modal
//   $('#imagesiframclose').on('click', function () {
//     $('#imagesifram').fadeOut();
//     $('#pdf_iframe').attr('src', ''); // reset iframe
//   });

// async function fnattachkyc(vrkycid, type) {
//     var vardelet = "Event:Delete_KYC~!kycid:" + vrkycid;
//     var thcheck = "";
//     thcheck = await FormSubmissionshandles("test_", "AppCP", "#loading", vardelet + "~!");
//     if (thcheck.indexOf("Success") > -1) {
//         bindKyc();
//     }
// }

// Store selected dates and time slot
let selectedDates = [];
let vartime = "";

// Function to reset date and time selections
function resetSelections() {
    selectedDates = [];
    vartime = "";

    // Reset UI
    $(".date-btn").removeClass("btn-primary").addClass("btn-outline-primary").prop("disabled", false);
    $("input[name='timeslotRadio']").prop("checked", false); // Uncheck radio buttons
}

// Function to fetch and render available dates
async function fetchAppointmentDates() {
    resetSelections(); // Reset selections before fetching new dates

    let eventvalAppointment = "Event:Appointment_Date_Bind~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    // Ensure fnsndrequest returns a valid JSON object
    let vrgetJsonData = await fnsndrequest("AppCP", eventvalAppointment);
    console.log(vrgetJsonData);
    let getSubmdata_Date = "";
    let datejson = vrgetJsonData;



    var vrgetfinajson = JSON.parse(datejson);
    // Get the first 'Msg' value
    var firstMsg = vrgetfinajson[0].Msg;
    var fistatus = vrgetfinajson[0].Status;



    //getSubmdata_Date = vrgetJsonData.replace(/\[|\]/g, "");
    //alert(getSubmdata_Date);
    //let datemsg = getValueByKey(getSubmdata_Date, "Msg");

    //let datestatus = getValueByKey(getSubmdata_Date, "Status");
    if (fistatus == "Error") {
        $(".errer_datemsg").html(firstMsg);
        $(".call_section_date").hide()
    }
    else {
        $(".errer_datemsg").html(firstMsg);
        Promise.resolve(vrgetJsonData)
            .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
            .then(data => renderMilestones(data))
            .catch(error => console.error("Error processing data:", error));
    }
}

// Function to display fetched dates as buttons
function renderMilestones(data) {
    let datesContainer = $(".dates").empty(); // Clear existing dates

    data.forEach(item => {
        datesContainer.append(`
            <button class="btn btn-outline-primary date-btn">
                ${item.Date} ${item.Day} <span class="d-none">${item.Date1}</span>
            </button>
        `);
    });
}

// Handle date selection logic
$(document).on("click", ".date-btn", function () {
    let dateText = $(this).find("span").text().trim(); // Get hidden date value

    if (selectedDates.includes(dateText)) {
        // Deselect if already selected
        $(this).removeClass("btn-primary").addClass("btn-outline-primary");
        selectedDates = selectedDates.filter(date => date !== dateText);
    } else {
        if (selectedDates.length >= 2) {
            alert("❌ You can only select up to 2 dates.");
            return; // Prevent selecting more than 2 dates
        }
        // Select new date
        $(this).removeClass("btn-outline-primary").addClass("btn-primary");
        selectedDates.push(dateText);
    }

    // Disable other buttons when 2 dates are selected
    $(".date-btn").not(".btn-primary").prop("disabled", selectedDates.length === 2);
});

// Capture selected time slot
$("input[name='timeslotRadio']").change(function () {
    vartime = $(this).val(); // Get selected radio button value
});






$("input[name='would_register']").change(function () {
    varreg = $(this).val(); // Get selected radio button value
    $("#register_hdn_would_register").val(varreg); // Set the value to hidden input
    $("#errorwould_register").hide();
});





// Function to show a section
function showSection2(sectionId) {
    if (!sectionId) return; // Prevent errors if sectionId is undefined
    $('.section').removeClass('activesection'); // Hide all sections
    $('#' + sectionId).addClass('activesection'); // Show the selected section
}

$("#book_an_appointment_meeting").click(async function () {

    if ($("#register_hdn_would_register").val() == "") {
        $("#errorwould_register").show();
    } else {
        $("#errorwould_register").hide(); // Hide error message when valid input is provided
        $("#youtubeIframe").attr("src", ""); // Stops the video
        // Ensure the button has the correct data attribute
        if (!$(this).attr("data-section")) {
            $(this).attr("data-section", "support_meetingsection"); // Default value if missing
        }
        const targetSection = $(this).data('section');
        if (targetSection) {
            showSection2(targetSection);
            history.pushState({ section: targetSection }, targetSection, "?section=" + targetSection);
        }

        let eventRegister = "Event:Register_With_this_agreement~!cpuserid:" + localStorage.getItem("cpuserid") + 
                            "~!cpsaleid:" + localStorage.getItem("cpsaleid") + 
                            "~!cploginid:" + localStorage.getItem("cploginid");
        let responsereq = await FormSubmissionshandles("register_", "AppCP", "#loading", eventRegister + "~!");
        
        if (responsereq.includes("Success")) {
            // Handle success scenario
        } else {
            // Handle failure scenario
        }

        fetchAppointmentDates();
    }
});


$("#request_for_appointmen_call").click(fetchAppointmentDates);
// Click event for submitting appointment request for a call
$("#selectdate_appointment_forcall").click(async function () {
    if (selectedDates.length < 2) {
          $("#appoinment_error_forcall").show().html("Please select at least two dates.");
        return false;
    }
    if (!vartime) {
       $("#appoinment_error_forcall").show().html("Please select a time slot.");
        return false;
    }


    
  let eventvalReqr = "Event:Req_Registration_Appointment~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid") + " ~!requestdate:" + selectedDates.join(",") + "~!requesttime:" + vartime;
    // alert("✅ Request Sent: " + eventval);

    try {
        let response = await FormSubmissionshandles("time_", "AppCP", "#loading", eventvalReqr + "~!");
        if (response.includes("Success")) {
            $("#appoinment_error_forcall").show().css("color", "green").html("🎉 Appointment successfully booked!");
            successfully();
            window.location.href = "Home.html?section=home_firstsection";
        } else {
            $("#appoinment_error_forcall").show().html("❌ Booking failed: " + response);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        $("#appoinment_error_forcall").show().html("❌ An error occurred while booking the appointment.");
    }
});

// Click event for submitting the selected date and time
$("#selectdate_appointment").click(async function () {

    if (selectedDates.length < 2) {
          $("#appoinment_error_forMeeting").show().html("Please select at least two dates.");
        return false;
    }
    if (!vartime) {
       $("#appoinment_error_forMeeting").show().html("Please select a time slot.");
        return false;
    }

    
                   let eventvalReq = "Event:Req_Appointment_Agreement_Singing~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid") + " ~!requestdate:" + selectedDates.join(",") + "~!requesttime:" + vartime  + "~!register_hdn_would_register:" +  $("#register_hdn_would_register").val();
                 
 

    try {
        let response = await FormSubmissionshandles("time_", "AppCP", "#loading", eventvalReq + "~!");
        if (response.includes("Success")) {
             $("#appoinment_error_forMeeting").show().css("color", "green").html("🎉 Appointment successfully booked!");
            successfully();
            window.location.href = "Home.html?section=home_firstsection";
        } else {
            $("#appoinment_error_forMeeting").show().html("❌ Booking failed: " + response);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        $("#appoinment_error_forMeeting").show().html("❌ An error occurred while booking the appointment.");
    }
});


$("#registration_btn").click(async function () {
    var eventDue_Amount = "Event:registration_Due_Amount~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDataDue_Amount = fnsndrequest("AppCP", eventDue_Amount);
     Promise.resolve(vrgetJsonDataDue_Amount)
     .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
     .then(datard => renderDue_Amount(datard))
     .catch(error => console.error("Error processing data:", error));
});


function renderDue_Amount(datard) {

    var dataAmountContainer = $("#Due_AmountContainer").empty();

    datard.forEach(Amount => {
        dataAmountContainer.append(`
    <div class="flex_card text-center">
    <div class="card_icon mb-3">
      <img src="img/icon/cash-icon.png" loading="lazy" alt="File Icon">
    </div>
    <div class="card_contant_details ms-2">
      <h5 class="Componentamount">${Amount.Component}</h5>
      <h3 class="fw-bold">₹ ${Amount.Amount}</h3>
    </div>
  </div>
        `);
    });
}

