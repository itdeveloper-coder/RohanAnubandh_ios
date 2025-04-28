
//navbar common code
$(window).on('load', function () {

    let cpSessionIdstest = localStorage.getItem("cpSessionids");
    $("#loginform_div").show();

    if (cpSessionIdstest == "" || cpSessionIdstest == null || cpSessionIdstest == undefined) {
        window.location.href = "login.html";
    }
    else {
        projectnaem();
        fnsndCRMDetails();
    }


    //projectnaem();
    //fnsndCRMDetails();
    //let cpSessionIdstest = localStorage.getItem("cpSessionids");
    //$("#loginform_div").show();

    //if (cpSessionIdstest == "" || cpSessionIdstest == null || cpSessionIdstest == undefined) {
    //    window.location.href = "login.html";
    //}


});


var cpBookingStatusvs = localStorage.getItem("cpBookingStatus");
var vrisupport = localStorage.getItem("supportAloow");
var vrmyprperty = localStorage.getItem("myproperty");


// $("#navbar_main").html("");
//     var varnavbar = '<nav class="navbar" >';
//     varnavbar += '<a class="navbar-brand" href="#">';
//     varnavbar += '  <i class="material-symbols-outlined" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu"';
//     varnavbar += '    aria-controls="offcanvasMenu">menu</i>';
//     varnavbar += '</a>';
//     varnavbar += '<div class="ms-auto">';
//     varnavbar += '  <i class="material-symbols-outlined">person</i>';
//     varnavbar += '  <i class="material-symbols-outlined">notifications</i>';
//     varnavbar += '</div>';
//     varnavbar += '</nav>';
//     $("#navbar_main").html(varnavbar);



    //navbar common code
    $(".footer_menu").html("");
    var varfooter_menu = '<div class="main_homepagemenu">';
    varfooter_menu += '<div id="homepage_maindiv">';
    varfooter_menu += '  <a href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu"';
    varfooter_menu += '    aria-controls="offcanvasMenu"><img src="img/icon/menu-icon.png"loading="lazy" alt="File Icon"></a>';
    if (window.location.href.indexOf("Project-Details.html") > -1) {

        varfooter_menu += '  <a href="Project-Details.html"><img src="img/icon/project-icon-bg.png"loading="lazy" alt="File Icon"></a>';
    }
    else {
        varfooter_menu += '  <a href="Project-Details.html"><img src="img/icon/project-icon.png"loading="lazy" alt="File Icon"></a>';
}



if (cpBookingStatusvs == "BK") {
    if (window.location.href.indexOf("Home.html") > -1) {

        varfooter_menu += '  <a href="Home.html"><img src="img/icon/home-bg-icon.png"loading="lazy" alt="File Icon"></a>';
    }
    else {
        varfooter_menu += '  <a href="Home.html"><img src="img/icon/home-icon.png"loading="lazy" alt="File Icon"></a>';
    }
}
else if (cpBookingStatusvs == "AD") {
    if (window.location.href.indexOf("Home2.html") > -1) {

        varfooter_menu += '  <a href="Home2.html"><img src="img/icon/home-bg-icon.png"loading="lazy" alt="File Icon"></a>';
    }
    else {
        varfooter_menu += '  <a href="Home2.html"><img src="img/icon/home-icon.png"loading="lazy" alt="File Icon"></a>';
    }
}



   

    if (window.location.href.indexOf("Notification.html") > -1) {

        varfooter_menu += '  <a href="Notification.html"><img src="img/icon/notification-bg-icon.png"loading="lazy" alt="File Icon"></a>';
    }
    else {
        varfooter_menu += '  <a href="Notification.html"><img src="img/icon/notification-icon.png"loading="lazy" alt="File Icon"></a>';
    }
    if (window.location.href.indexOf("Profile.html") > -1) {

        varfooter_menu += '  <a href="Profile.html"><img src="img/icon/profile-bg-icon.png"loading="lazy" alt="File Icon"></a>';
    }
    else {
        varfooter_menu += '  <a href="Profile.html"><img src="img/icon/profile-icon.png"loading="lazy" alt="File Icon"></a>';
    }
    varfooter_menu += '</div>';
    varfooter_menu += '</div>';
    $(".footer_menu").html(varfooter_menu);


    $("#offconvas_menu").html("");
var offcanvas_menu = '<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">';

offcanvas_menu += ' <div class="offcanvas-header">';
offcanvas_menu += '      <button type="button" class="btn-close" data-bs-dismiss="offcanvas">';
offcanvas_menu += '        <span class="material-symbols-outlined">close</span>';
offcanvas_menu += '      </button>';
offcanvas_menu += '      <div class="menu-profile">';
offcanvas_menu += '         <img src="' + localStorage.getItem("cpprofilepic") + '"loading="lazy" alt="File Icon" class="img-fluid me-4 profile_img cpprofilepic">';
offcanvas_menu += '        <div class="profile-contant">';
offcanvas_menu += '          <h5 class="user_name"> ... </h5>';
// offcanvas_menu += '          <small class="user_emailid"> ...</small>';
offcanvas_menu += '        </div>';
offcanvas_menu += '      </div>';
offcanvas_menu += '    </div>';
offcanvas_menu += '    <div class="offcanvas-body p-0">';
offcanvas_menu += '      <div class="menu-items">';
//offcanvas_menu += '        <a href="Appointment.html" class="manubar"><span class="material-symbols-outlined">event_available</span> Appointment</a>';
offcanvas_menu += '        <a href="Project-Details.html" class="manubar"><span class="material-symbols-outlined">info</span> Project Info </a>';
offcanvas_menu += '        <a href="Payment-Details.html" class="manubar"> <span class="material-symbols-outlined">credit_card</span> Payment & Receipts</a>';
offcanvas_menu += '        <a href="Support.html" class="manubar"><span class="material-symbols-outlined">headset_mic</span> Service Request</a>';
// offcanvas_menu += '        <a href="My-Journey.html" class="manubar"><span class="material-symbols-outlined">route</span> My Journey</a>';
offcanvas_menu += '        <a href="Documents.html" class="manubar"><span class="material-symbols-outlined">description</span> Legal Documents</a>';
offcanvas_menu += '        <a href="Referral.html" class="manubar"><span class="material-symbols-outlined">group</span>Referral & Loyalty</a>';
if (vrmyprperty > 1) {
    offcanvas_menu += '<a href="Property.html" class="manubar"><span class="material-symbols-outlined"> home_work</span> My Property</a>';
}
offcanvas_menu += '        <a href="FAQ.html" class="manubar"><span class="material-symbols-outlined">help</span> FAQ</a>';
offcanvas_menu += '        <a href="logout.html" class="manubar"><span class="material-symbols-outlined">digital_out_of_home</span> Logout</a>';
    offcanvas_menu += '      </div>';
    offcanvas_menu += '    </div>';
offcanvas_menu += '  </div>';
$("#offconvas_menu").html(offcanvas_menu);



async function fnsndCRMDetails() {
    var eventvalcrm = "Event:CRM_Details~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid") + "";
    var vrgetJsonData = await fnsndrequest("AppCP", eventvalcrm);
    const getSubmdata = vrgetJsonData.replace(/\[|\]/g, "");
    const cpcrmname = getValueByKey(getSubmdata, "CRM_Name");
    const cpCRM_Mob_No = getValueByKey(getSubmdata, "CRM_Mob_No");
    $(".cpcrmname").html(cpcrmname);
    $(".cpCRM_Mob_No").html(cpCRM_Mob_No);
}

async function projectnaem() {
    var eventval = "Event:Project_Details~!cpsaleid:" + localStorage.getItem("cpsaleid");
    var vrgetJsonData = await fnsndrequest("AppCP", eventval);
    // console.log(vrgetJsonData);
    // Clean up the response string by removing brackets if they exist
    const getSubmdata = vrgetJsonData.replace(/\[|\]/g, "");
    const projectname = getValueByKey(getSubmdata, "Project_Name");
    const cpflatno = localStorage.getItem("cpflatno")
    const cpunittype = localStorage.getItem("cpunittype")
    $(".projectflatno").html(cpflatno);
    $(".projectunittype").html(cpunittype);
    $("#projectname").html(projectname);
    $(".projectname").html(projectname);


    let MobileNo = localStorage.getItem("cpmobileno");
    let EmailId = localStorage.getItem("cpemailid");
    let name = localStorage.getItem("cpname");
    let address = localStorage.getItem("cpaddress");
    let profilepic = localStorage.getItem("cpprofilepic");

    profilepic = profilepic == "" ? "img/icon/user-profile.png" : profilepic;
  //  let shortEmail = EmailId.split("@")[0] + "..."; // Shorten email
    $(".user_name").html(name);
    $(".contact_no").html(MobileNo);
    // $(".user_emailid").html(shortEmail);
    $(".user_emailid").html(EmailId);
    $(".user_address").html(address);
    $(".profile_img").attr("src", profilepic);

    // $(".user_emailid")
    //     .html(shortEmail) // Initially show short email
    //     .attr("title", EmailId) // Set full email as tooltip
    //     .hover(
    //         function () {
    //             $(this).html(EmailId); // Show full email on hover
    //         },
    //         function () {
    //             $(this).html(shortEmail); // Show short email when not hovering
    //         }
    //     );


}


document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("loading");

    // Check if all images and other elements are loaded
    window.addEventListener("load", function () {
        document.body.classList.remove("loading");
    });
});
