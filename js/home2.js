let cpSessionIdstest = localStorage.getItem("cpSessionids");
$("#loginform_div").show();

if (cpSessionIdstest == "" || cpSessionIdstest == null || cpSessionIdstest == undefined) {
    window.location.href = "login.html";
}


$("#project_status").click(async function () {
    window.location.href = "Project-Details.html";
});

$("#project_Payment_details ,#projectname_hide").click(async function () {
    window.location.href = "Payment-Details.html";
});

$("#project_support").click(async function () {
    window.location.href = "Support.html";
});


$("#project_appointment").click(async function () {
    window.location.href = "Appointment.html";
});


$(window).on('load', function () {
    $(".SupportAllow").hide();
    var eventcheck11 = "Event:Is_Support_Allow~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid") + "";
    var vrgetJsonData11 = fnsndrequest("AppCP", eventcheck11);
  
    var getSubmdata11 = "";
    getSubmdata11 = vrgetJsonData11.replace(/\[|\]/g, "");
    const vrstatus11 = getValueByKey(getSubmdata11, "Status");
    const vrmsg11 = getValueByKey(getSubmdata11, "Msg");
    if (vrstatus11 == "Success") {
        $(".SupportAllow").show();
    }





    
    var eventcheck = "Event:Current_Due_Stage_Date~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid") + "";
    var vrgetJsonData = fnsndrequest("AppCP", eventcheck);
    var getSubmdata = "";
    getSubmdata = vrgetJsonData.replace(/\[|\]/g, "");
     // Function to extract a specific key's value from the response string
     const vrstatus = getValueByKey(getSubmdata, "Status");
     if (vrstatus == "Success") {
        const varDueDate = getValueByKey(getSubmdata, "DueDate");
        const varTitle = getValueByKey(getSubmdata, "Title");
        $("#due_date").html(varDueDate);
         $("#title_project_date").html(varTitle);
         $("#projectname_hide").show();
             // Change height only for small screens
    if (window.matchMedia("(max-width: 375px)").matches) {
        $("#homepage2_details").css("height", "46vh");
    }
         
    }
    else {
        $("#projectname_hide").hide();
            // Change height only for small screens
    if (window.matchMedia("(max-width: 375px)").matches) {
        $("#homepage2_details").css("height", "56vh");
    }
    }

    var eventTicket_Pending_Count = "Event:Ticket_Pending_Count~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid") + "";
    var vrgetJsonData = fnsndrequest("AppCP", eventTicket_Pending_Count);
    var getSubmdata = "";
    getSubmdata = vrgetJsonData.replace(/\[|\]/g, "");  
    const vrstateventTicket_Pending_Count = getValueByKey(getSubmdata, "Status");
    const varTicketCount = getValueByKey(getSubmdata, "Msg");
    if (vrstateventTicket_Pending_Count == "Success") {
        $("#Ticket_Pending_Count").html(varTicketCount);
    }
    else {
        alert(vrstateventTicket_Pending_Count);
    }

});


