
$(window).on('load', function () {
    fetchAppointmentDates();
});
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
function fetchAppointmentDates() {
    resetSelections(); // Reset selections before fetching new dates
                   
    let  eventvalAppointment = "Event:Appointment_Date_Bind_CRM~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid") ;
    // Ensure fnsndrequest returns a valid JSON object
    let vrgetJsonData = fnsndrequest("AppCP", eventvalAppointment);

    Promise.resolve(vrgetJsonData)
        .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
        .then(data => renderMilestones(data))
        .catch(error => console.error("Error processing data:", error));
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
    $("#appoinment_error").hide();
    if (selectedDates.includes(dateText)) {
        // Deselect if already selected
        $(this).removeClass("btn-primary").addClass("btn-outline-primary");
        selectedDates = selectedDates.filter(date => date !== dateText);
    } else {
        if (selectedDates.length >= 2) {
            $("#appoinment_error").show().html("Please select at least two dates.");
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
    $("#appoinment_error").hide();
});

     // Hide error message when user starts typing
     $("#reason_text_meeting").on("input", function() {
        $("#reason_error").hide();
    });
$("#selectdate_appointment_forcall").click(async function () {
    if (selectedDates.length < 2) {
        $("#appoinment_error").show().html("Please select at least two dates.");
        return false;
    }
    else{
        $("#appoinment_error").hide();
    }
    if (!vartime) {
        $("#appoinment_error").show().html("Please select a time slot.");
        return false;
    }
    else{
        $("#appoinment_error").hide();
    }
    var reason = $("#reason_text_meeting").val().trim();
                
                if (reason == "") {
                    $("#appoinment_error").show().html(" Enter a valid Reason of Meeting");
                    $("#reason_text_meeting").focus(); // Focus on the input field
                    return false;
                } else {
                    $("#reason_error").hide(); // Hide error message if input is valid
                    $("#appoinment_error").hide()
                }

    
    var reason = $("#reason_text_meeting").val().trim();
  let eventvalReqr = "Event:Req_Appointment_CRM~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid") + " ~!requestdate:" + selectedDates.join(",") + "~!requesttime:" + vartime + "~!requestreason:" + reason;


    try {
        let response = await FormSubmissionshandles("reason_", "AppCP", "#loading", eventvalReqr + "~!");
        if (response.includes("Success")) {
            $("#appoinment_error")
            .html("🎉 Appointment successfully booked!")
            .css("color", "green") // Set text color to green
            .fadeIn(500)  // Fade in over 0.5 seconds
            .delay(1000)   // Keep message visible for 1 second
            .fadeOut(500, function() {  // Fade out over 0.5 seconds
                window.location.href = "Home.html"; // Redirect after fade-out
            });
        } else {
            $("#appoinment_error").hide()
        }
    } catch (error) {
        $("#appoinment_error").show().html("❌ An error occurred while booking the appointment.");
    }
});

