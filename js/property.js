

        var stored = localStorage.getItem('userData');

        // Parse JSON data (handle double string case)
        var parsedOnce = JSON.parse(stored);
        var parsedArray = typeof parsedOnce === 'string' ? JSON.parse(parsedOnce) : parsedOnce;

        console.log("Parsed Array:", parsedArray);

        if (Array.isArray(parsedArray)) {
            parsedArray.forEach(function (item) {
                var cardHtml = `
                    <div class="sectioncard" data-userId="${item.UserId}" data-regid="${item.RegId}" data-loginid="${item.LoginId}" data-SalesId="${item.SalesId}">
                <img src="img/icon/project-gold-icon.png" alt="project-gold-icon">
                <h5>${item.ProjName}, </h5>
                <span>${item.FlatNo}</span>
            </div>`;
                $('.unitbindsalewise').append(cardHtml);
            });
        } else {
            console.error("userData is not a valid array.");
        }


        $(document).on('click', '.sectioncard', function () {
            const regId = $(this).data('regid');
            const loginId = $(this).data('loginid');
            const salesId = $(this).data('salesid');
            const userId = $(this).data('userid');
            console.log("UserId:", userId);
            console.log("SalesId:", salesId);
            console.log("RegId:", regId);
            console.log("LoginId:", loginId);
        
            // Filter matching item
            const result = parsedArray.filter(function (item) {
                return item.RegId == regId && item.LoginId == loginId && item.SalesId == salesId && item.UserId == userId;
            });
            console.log("Filtered Result:", result);

       

         if (result.length === 0) {
             console.log("No matching record found.");
         } else {
             $.each(result, function (i, user) {
                 if (user.Status == "Success") {
                     localStorage.setItem("cpaddress", user.Mailing_Address);
                     localStorage.setItem("cpprofilepic", user.ProfilePic);
                     localStorage.setItem("cpname", user.Name);
                     localStorage.setItem("cpmobileno", user.MobileNo);
                     localStorage.setItem("cpemailid", user.EmailId);
                     localStorage.setItem("cpSessionids", user.SessionIds);
                     localStorage.setItem("cpsaleid", user.SalesId);
                     localStorage.setItem("cploginid", user.LoginId);
                     localStorage.setItem("cpuserid", user.UserId);
                     localStorage.setItem("cpprojectid", user.ProjectId);
                     localStorage.setItem("cpBookingStatus", user.BookingStatus);
                     localStorage.setItem("cpflatno", user.FlatNo);
                     localStorage.setItem("cpunittype", user.UnitType);
                     var vrProfileGuid = user.ProfileGuid;
                     var vrProfileName = user.ProfileName;
                     var BookingStatus = user.BookingStatus;
         
                     if (vrProfileGuid == "" || vrProfileGuid == null || vrProfileGuid == undefined) {
                         vrProfileGuid = "";
                     }
                     if (vrProfileName == "" || vrProfileName == null || vrProfileName == undefined) {
                         vrProfileName = "";
                     }
         
                     localStorage.setItem("profileguid", vrProfileGuid);
                     localStorage.setItem("profName", vrProfileName);
                     window.location.href = "Video.html";
                    //   if(BookingStatus == "AD"){
                    //     window.location.href = "Home2.html";
                    //   }
                    //   else if(BookingStatus == "BK"){
                    //     window.location.href = "Home.html";
                    //   }
                    //   else{
         
                    //   }
                    }
             });
         }

        });
