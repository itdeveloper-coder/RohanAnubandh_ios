
localStorage.clear();

$(window).on('load', async function () {

    let cpSessionIdstest = localStorage.getItem("cpSessionids");
    $("#loginform_div").show();

    if (cpSessionIdstest == "" || cpSessionIdstest == null || cpSessionIdstest == undefined) {
       // window.location.href = "login.html";
    }

    $("#forgotpassword_div,#forgotuserid_div").hide();

    //$("#login_text_userid,#login_text_password").val("");
    //if (cpSessionIds == "" || cpSessionIds == null || cpSessionIds == undefined) {

    //}
    //else {

    //    var eventcheck = "Event:Check_Login~!SessionId:" + localStorage.getItem("cpSessionids") + "";
    //    var vrgetJsonData =await fnsndrequest("AppCP", eventcheck);
    //    var getSubmdata = "";
    //    //Clean up the response string by removing brackets if they exist
    //    getSubmdata = vrgetJsonData.replace(/\[|\]/g, "");

    //    // Function to extract a specific key's value from the response string
    //    const vrstatus = getValueByKey(getSubmdata, "Status");

    //    if (vrstatus == "Success") {
    //        const vruserid = getValueByKey(getSubmdata, "UserId");
    //        const vrpass = getValueByKey(getSubmdata, "Pass");
    //        //console.log(vrpass);
    //        getencryptedPass("CPApp", vrpass, "Decrypt").then(function (res) {
    //            if (res.indexOf("Success") > -1) {
    //                var vrrwe = res.split(":")[1];

    //                $("#login_text_userid").val(vruserid);
    //                $("#login_text_password").val(vrrwe);
    //                setTimeout(function () {
    //                    $("#login_btn").click();
    //                }, 900);

    //            }
    //        });



    //    }
    //    else {

    //    }
    //}
});
/*localStorage.clear();*/


document.addEventListener("backbutton", function (e) {
    e.preventDefault();

    let currentPage = $(".page:visible").attr("id"); // Assuming pages have 'page' class
    console.log("Current Page:", currentPage);
    let getcurrdiv = $("#current_hdn_stage").val();
    let url = window.location.href;
    let fileName = window.location.pathname.split("/").pop(); // Extract filename



    if (currentPage === "login" || fileName == "login.html") {
        if (getcurrdiv == "loginform_div") {
            navigator.app.exitApp(); // Exit app if on login
            $("#otpdiv").hide();
        }
        else if (getcurrdiv == "forgotpassword_div") {
            $("#current_hdn_stage").val("loginform_div");
            $("#loginform_div").show();
            $("#forgotpassword_div").hide();
            $("#forgotuserid_div").hide();
            $("#otpdiv").hide();
        }
        else if (getcurrdiv == "forgotuserid_div") {
            $("#current_hdn_stage").val("forgotpassword_div");
            $("#forgotpassword_div").show();
            $("#forgotuserid_div").hide();
            $("#loginform_div").hide();
            $("#otpdiv").hide();
        }
        else {
            navigator.app.exitApp(); // Exit app if on login
            $("#otpdiv").hide();
        }

    } else {
        history.back(); // Navigate back
    }
}, false);

$("#send_btn").click(async function (e) {
    $("#current_hdn_stage").val("forgotpassword_div");
    var thcheck = "N";
    thcheck = "Y";//IsvalidationForm("userid_");
  if (thcheck == "N") { 
    $("#useridname_error").show();
  }
  else {
      var varevent = "Event:SentOTP_For_ForgetPassword~!cpuserid:" + $("#userid_text_userid").val() + "";
      thcheck = await FormSubmissionshandles("notuser", "AppCP", "#loading", varevent + "~!");
      if (thcheck.indexOf("Success") > -1) {
        $("#forgotpassword_div").hide();
        $("#otpdiv").show();
   
      }
      else {
        let varResponsebot = thcheck.split("Error > ")[1];
        $("#useridname_error").show().html(varResponsebot);
      }
    }

});


$("#send_userbtn").click(async function(e) {
  if($("#userid_text_emailid").val() == "") {
    $("#forgotemailid_error").show().html("Enter a valid Email Id");
    return false;
  }
  else{
    varevente = "Event:Forget_Userid~!cpemailid:" + $("#userid_text_emailid").val() + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid") + "";
    var vrgetJsonData = fnsndrequest("AppCP", varevente);
    var getSubmdata = "";
    getSubmdata = vrgetJsonData.replace(/\[|\]/g, "");
    const status = getValueByKey(getSubmdata, "Status");
    const msg = getValueByKey(getSubmdata, "Msg");
    if(status == "Success"){
   
     
      $("#forgotemailid_error").show().html(msg).css("color", "#0d9b00");
      $("#forgotemailid_error").fadeTo(3000, 0.7, function () {
        $("#forgotuserid_div").hide();
        $("#forgotpassword_div").show();

    });
 
    }
    else{
    //alert(vrgetJsonData);
      $("#forgotemailid_error").show().html(msg);
    }
  }
 


});
$("#forgot_password").click(async function (e) {
    $("#current_hdn_stage").val("forgotuserid_div");
    e.preventDefault(); // Prevent default anchor behavior
    $("#current_hdn_stage").val("forgotpassword_div");
    $("#loginform_div").hide();
    $("#forgotpassword_div").show();
});

$("#forgot_userid").click(async function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    $("#loginform_div").hide();
    $("#forgotpassword_div").hide();
    $("#current_hdn_stage").val("forgotuserid_div");
    $("#forgotuserid_div").show();
});


$(".login_back").click(async function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    $("#current_hdn_stage").val("loginform_div");
    $("#forgotpassword_div").hide();
    $("#loginform_div").show();
    $("#otpdiv").hide();

});


$(".userid_back").click(async function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    $("#current_hdn_stage").val("forgotpassword_div");
    $("#forgotuserid_div").hide();
    $("#forgotpassword_div").show();
});


 $("#submit_password_btn").click( async function (e) {
    e.preventDefault();

    let isValid = true;

    let otp = $("#otp_text_otp").val().trim();
    let newPassword = $("#otp_text_newpassword").val().trim();
    let confirmPassword = $("#otp_text_confirmpassword").val().trim();

    // Patterns
    const otpPattern = /^[0-9]{4,6}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;

    // Hide all errors initially
    $(".error-message").hide();

    // OTP validation
    if (!otpPattern.test(otp)) {
        $("#otperror").show().text("Enter a valid OTP (4 to 6 digits)");
        isValid = false;
    }

    // New Password validation
    if (!passwordPattern.test(newPassword)) {
        $("#newpassword_error").show().text("Password must be 8–20 chars, with uppercase, lowercase & special char");
        isValid = false;
    }

    // Confirm Password validation
    if (confirmPassword === "") {
        $("#confirmpassword_error").show().text("Confirm your Password");
        isValid = false;
    } else if (newPassword !== confirmPassword) {
        $("#confirmpassword_error").show().text("Passwords do not match");
        isValid = false;
    }

    // If all fields are valid, proceed with form submission
    if (isValid) {
      
      var vrnewpassword=$("#otp_text_newpassword").val();
      getencryptedPass("CPApp", vrnewpassword, "Encrypt").then(async function (res) 
      { 
        


        varevent = "Event:ValidOTP_Reset_Password~!cpuserid:" + $("#userid_text_userid").val() + "~!Password:"+ res.replace("Success:","") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid") + "";
        thcheck = await FormSubmissionshandles("otp_", "AppCP", "#loading", varevent + "~!");
        if (thcheck.indexOf("Success") > -1) {
  
         let varResponsebot = thcheck.split("Success > ")[1];
         $("#confirmpassword_success").show().text(varResponsebot);
         $("#confirmpassword_error").hide();

         setTimeout(function () {
          $("#otpdiv").hide();
          $("#loginform_div").show();

        }, 1000);
   
        }
        else {
          let varResponsebot = thcheck.split("Error > ")[1];
          $("#confirmpassword_error").show().text(varResponsebot);
          $("#confirmpassword_success").hide();
         
        }


        
        
 
       });
   
       

       

        
    }
});




// $("#submit_password_btn").click(async function (e) {
//     e.preventDefault();

//     let isValid = true;

//     let otp = $("#otp_text_otp").val().trim();
//     let newPassword = $("#otp_text_newpassword").val().trim();
//     let confirmPassword = $("#otp_text_confirmpassword").val().trim();

//     // Patterns
//     const otpPattern = /^[0-9]{4,6}$/;
//     const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;

//     // Hide all errors initially
//     $(".error-message").hide();

//     // OTP validation
//     if (!otpPattern.test(otp)) {
//         $("#otperror").show().text("Enter a valid OTP (4 to 6 digits)");
//         isValid = false;
//     }

//     // New Password validation
//     if (!passwordPattern.test(newPassword)) {
//         $("#newpassword_error").show().text("Password must be 8–20 chars, with uppercase, lowercase & special char");
//         isValid = false;
//     }

//     // Confirm Password validation
//     if (confirmPassword === "") {
//         $("#confirmpassword_error").show().text("Confirm your Password");
//         isValid = false;
//     } else if (newPassword !== confirmPassword) {
//         $("#confirmpassword_error").show().text("Passwords do not match");
//         isValid = false;
//     }

//     // If valid, proceed
//     if (isValid) {
//         const vrnewpassword = newPassword;
//         getencryptedPass("CPApp", vrnewpassword, "Encrypt").then(async function (res) {
//             const encryptedPassword = res.replace("Success:", "");
//             const varevent = `Event:ValidOTP_Reset_Password~!cpuserid:${$("#userid_text_userid").val()}~!Password:${encryptedPassword}~!cpsaleid:${localStorage.getItem("cpsaleid")}~!cploginid:${localStorage.getItem("cploginid")}`;

//             const thcheck = await FormSubmissionshandles("otp_", "AppCP", "#loading", varevent + "~!");

//             if (thcheck.indexOf("Success") > -1) {
//                 const varResponsebot = thcheck.split("Success > ")[1];
//                 $("#confirmpassword_success").show().text(varResponsebot);
//                 $("#confirmpassword_error").hide();

//                 setTimeout(function () {
//                     $("#otpdiv").hide();
//                     $("#loginform_div").show();
//                 }, 1000);
//             } else {
//                 const varResponsebot = thcheck.split("Error > ")[1];
//                 $("#confirmpassword_error").show().text(varResponsebot);
//                 $("#confirmpassword_success").hide();
//             }
//         });
//     }
// });



$("#login_btn").click(function () {
    $("#current_hdn_stage").val("loginform_div");
    $("#logintextpassword").hide();
    $("#invalidlogin").hide();
    $("#logintextuserid").hide();
    localStorage.setItem("userid", "");
    localStorage.setItem("password", "");
    localStorage.setItem("cpsaleid", "");
    localStorage.setItem("cploginid", "");
    localStorage.setItem("cpuserid", "");
    var vruserid = $("#login_text_userid").val();
    var vrpassword = $("#login_text_password").val();


    if (vruserid == "") {
        $("#logintextuserid").show()

        return false;
    }
    if (vrpassword == "") {
        $("#logintextpassword").show()
        return false;
    }

    getencryptedPass("CPApp", vrpassword, "Encrypt").then(function (res) {
        var eventval = "Event:Login~!cpuserid:" + vruserid + "~!Password:" + res.replace("Success:", "") + "";
        var vrgetJsonData = fnsndrequest("AppCP", eventval);;
        // Clean up the response string by removing brackets if they exist
        getSubmdata = vrgetJsonData.replace(/\[|\]/g, "");

        // Function to extract a specific key's value from the response string
        const LoginId = getValueByKey(getSubmdata, "LoginId");
        const UserId = getValueByKey(getSubmdata, "UserId");
        //const Password = getValueByKey(getSubmdata, "Password");
        //const RegId = getValueByKey(getSubmdata, "RegId");
        const MobileNo = getValueByKey(getSubmdata, "MobileNo");
        const EmailId = getValueByKey(getSubmdata, "EmailId");
        //const Pan = getValueByKey(getSubmdata, "Pan");
        //const DateofAgreement = getValueByKey(getSubmdata, "DateofAgreement");
        const SalesId = getValueByKey(getSubmdata, "SalesId");
        //const IsAllowRefund = getValueByKey(getSubmdata, "IsAllowRefund");
        const ProjectId = getValueByKey(getSubmdata, "ProjectId");
        const BookingStatus = getValueByKey(getSubmdata, "BookingStatus");
        //const BankId = getValueByKey(getSubmdata, "BankId");
        //const IsRated = getValueByKey(getSubmdata, "IsRated");
        const IsMultiplSales = getValueByKey(getSubmdata, "IsMultiplSales");
        //const GetAllPass = getValueByKey(getSubmdata, "GetAllPass");
        const status = getValueByKey(getSubmdata, "Status");
        const name = getValueByKey(getSubmdata, "Name");
        const Sessionids = getValueByKey(getSubmdata, "SessionIds");
        let cpaddress = getValueByKey(getSubmdata, "Mailing_Address");
        let ProfilePic = getValueByKey(getSubmdata, "ProfilePic");
        let vrProfileGuid = getValueByKey(getSubmdata, "ProfileGuid");
        let vrProfileName = getValueByKey(getSubmdata, "ProfileName");
        let vrflatno = getValueByKey(getSubmdata, "FlatNo");
        let vrunittype = getValueByKey(getSubmdata, "UnitType");
        if (status == "Success") {
            localStorage.setItem("cpaddress", cpaddress);
            localStorage.setItem("cpprofilepic", ProfilePic);
            localStorage.setItem("cpname", name);
            localStorage.setItem("cpmobileno", MobileNo);
            localStorage.setItem("cpemailid", EmailId);
            localStorage.setItem("cpSessionids", Sessionids);
            localStorage.setItem("cpsaleid", SalesId);
            localStorage.setItem("cploginid", LoginId);
            localStorage.setItem("cpuserid", UserId);
            localStorage.setItem("cpprojectid", ProjectId);
            localStorage.setItem("cpBookingStatus", BookingStatus);
            localStorage.setItem("cpflatno", vrflatno);
            localStorage.setItem("cpunittype", vrunittype);

            if (vrProfileGuid == "" || vrProfileGuid == null || vrProfileGuid == undefined) {
                vrProfileGuid = "";
            }
            if (vrProfileName == "" || vrProfileName == null || vrProfileName == undefined) {
                vrProfileName = "";
            }

            localStorage.setItem("profileguid", vrProfileGuid);
            localStorage.setItem("profName", vrProfileName);

            if (IsMultiplSales == "0" || "1") {
                window.location.href = "Video.html";
                // window.location.href = "Contacts.html";
            }
            else {
                window.location.href = "Video.html?section=secondpage_firstsection";
            }
            // if(BookingStatus == "AD"){
            //   window.location.href = "Home2.html";
            // }
            // else if(BookingStatus == "BK"){
            //   window.location.href = "Home.html";
            // }
            // else{

            // }

        }
        else {
            const msg = getValueByKey(getSubmdata, "Msg");
            $("#invalidlogin").show().html(msg);
        }


    });
});


 
$('.sectioncard').on('click', function() {
    window.location.href = "Home.html?section=secondpage_projectvideo";
}); 

