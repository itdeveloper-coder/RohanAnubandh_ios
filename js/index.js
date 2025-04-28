$(window).on('load', async function () {
    let cpSessionIds = localStorage.getItem("cpSessionids");
    if (cpSessionIds == "" || cpSessionIds == null || cpSessionIds == undefined) {
        setTimeout(function () {
            $("#first_section").trigger("click");
        }, 500); // 1000ms = 1 second
        
    }
    else {

        var eventcheck = "Event:Check_Login~!SessionId:" + localStorage.getItem("cpSessionids") + "";
        var vrgetJsonData = await fnsndrequest("AppCP", eventcheck);
        var getSubmdata = "";
        //Clean up the response string by removing brackets if they exist
        getSubmdata = vrgetJsonData.replace(/\[|\]/g, "");
        // Function to extract a specific key's value from the response string
        const vrstatus = getValueByKey(getSubmdata, "Status");
        if (vrstatus == "Success") {
            const vruseridlogin = getValueByKey(getSubmdata, "UserId");
            const vrpass = getValueByKey(getSubmdata, "Pass");
            //console.log(vrpass);
            getencryptedPass("CPApp", vrpass, "Decrypt").then(function (res) {
                if (res.indexOf("Success") > -1) {
                    var vrrwe = res.split(":")[1];
                    setTimeout(function () {
                        $("#logintextpassword").hide();
                        $("#invalidlogin").hide();
                        $("#logintextuserid").hide();
                        localStorage.setItem("userid", "");
                        localStorage.setItem("password", "");
                        localStorage.setItem("cpsaleid", "");
                        localStorage.setItem("cploginid", "");
                        localStorage.setItem("cpuserid", "");
                        localStorage.setItem("myproperty", "");
                        var vruserid = vruseridlogin;
                        var vrpassword = vrrwe;
                        getencryptedPass("CPApp", vrpassword, "Encrypt").then(function (res) {
                            var eventval = "Event:Login~!cpuserid:" + vruserid + "~!Password:" + res.replace("Success:", "") + "";
                            var vrgetJsonData = fnsndrequest("AppCP", eventval);
                            var fingetrec = JSON.parse(vrgetJsonData);
                            localStorage.setItem('userData', JSON.stringify(vrgetJsonData));
                            var respcount = fingetrec.length;
                            localStorage.setItem("myproperty", respcount);
                            if (respcount > 1) {
                               
                                window.location.href = "Property.html";
                    
                            }
                            else if (respcount == 1) {
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
                                window.location.href = "Video.html";
                                //if (IsMultiplSales == "0" || "1") {
                                //    window.location.href = "Video.html";
                                //    // window.location.href = "Contacts.html";
                                //}
                                //else {
                                //    window.location.href = "Video.html?section=secondpage_firstsection";
                                //}
                                //// if(BookingStatus == "AD"){
                                ////   window.location.href = "Home2.html";
                                //// }
                                //// else if(BookingStatus == "BK"){
                                ////   window.location.href = "Home.html";
                                //// }
                                //// else{
                    
                                //// }
                    
                            }
                            else {
                              window.location.href = "login.html";
                            }
                        }
                    
                            //// Clean up the response string by removing brackets if they exist
                            //getSubmdata = vrgetJsonData.replace(/\[|\]/g, "");
                        });
                    }, 900);
                }
                else {
                    window.location.href = "login.html";
                }
            });



        }
        else {
            window.location.href = "login.html";
        }
    }
});





document.addEventListener("deviceready", function () {
    navigator.splashscreen.hide();
}, false);

$("#existing_customer").click(function () {
      window.location.href = "login.html";
});

$("#new_customer").click(function () {
    window.location.href = "Registration.html";
});