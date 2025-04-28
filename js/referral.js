// Restrict phone input: only numbers (0-9)
$("#referral_text_phone").on("keypress", function (e) {
    var key = e.which;
    if (key >= 48 && key <= 57) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
});
$("#referral_text_phone").on("paste", function (e) {
    let pastedData = e.originalEvent.clipboardData.getData('text');
    let numberRegex = /^[0-9]+$/;
    if (!numberRegex.test(pastedData)) {
        e.preventDefault();
    }
});
$("#referral_text_phone").on("input", function () {
    if ($(this).val().length > 10) {
        $(this).val($(this).val().slice(0, 10));
    }
});
// Restrict name input: only letters and spaces allowed
$("#referral_text_name").on("keypress", function (e) {
    var key = e.which;
    // Allow A-Z, a-z, space, and backspace
    if (
        (key >= 65 && key <= 90) || // uppercase
        (key >= 97 && key <= 122) || // lowercase
        key === 32 // space
    ) {
        return true;
    } else {
        e.preventDefault();
        return false;
    }
});
$("#referral_text_name").on("paste", function (e) {
    let pastedData = e.originalEvent.clipboardData.getData('text');
    let nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(pastedData)) {
        e.preventDefault();
    }
});

async function viewrefrralbind() {
    var eventval = "Event:Referral_Bind~!cpsaleid:" + localStorage.getItem("cpsaleid") +
                   "~!cploginid:" + localStorage.getItem("cploginid") +
                   "~!cpuserid:" + localStorage.getItem("cpuserid");
                 
    var vrgetJsonDatarefrralbind =await fnsndrequest("AppCP", eventval);
    console.log(vrgetJsonDatarefrralbind);
    Promise.resolve(vrgetJsonDatarefrralbind)
    .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
    .then(datarefrrealbind => referrals_Bind(datarefrrealbind))
    .catch(error => console.error("Error processing data:", error));
}
function referrals_Bind(datarefrrealbind) {
    var refrralbindContainer = $("#view_all_referrals").empty();
    datarefrrealbind.forEach(item2 => {
        refrralbindContainer.append(`
            <div class="tdspay m-3 bg-white p-3">
                <small class="mt-3 text-muted">Date</small>
                <h5>${item2.Ref_Date}</h5>
                
                <small class="mt-3 text-muted">Name</small>
                <h5>${item2.Ref_Name}</h5>
                
                <small class="mt-3 text-muted">Phone No.</small>
                <h5>${item2.Ref_Mob}</h5>
                
                <small class="mt-3 text-muted">Mail ID</small>
                <h5>${item2.Ref_Emailid}</h5>

                 <small class="mt-3 text-muted">&nbsp;</small>
               <div class="support-btn-group">
                        <button class="customsupport-btn" style="background-color: ${referrals_Bind.Status === 'Close' ? '#ff4121' : 'green'};">${item2.Status}</button>
                    </div>
            </div>
        `);
    });
}

function refrralbind(datarefrral) {

}
$('#submit_btn_referral').click(async function () {
    let isValid = true;
    // Name validation: only alphabets and spaces
    const name = $("#referral_text_name").val().trim();
    const nameRegex = /^[A-Za-z\s]+$/;
    if (name === "" || !nameRegex.test(name)) {
        $("#error_referralname").text("Only alphabets and spaces allowed").show();
        isValid = false;
    } else {
        $("#error_referralname").hide();
    }

    // Phone validation: exactly 10 digits
    const phone = $("#referral_text_phone").val().trim();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        $("#error_referralphone").text("Enter valid 10-digit phone number").show();
        isValid = false;
    } else {
        $("#error_referralphone").hide();
    }

    // Email validation
    const email = $("#referral_text_email").val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        $("#error_referralemail").text("Enter valid email").show();
        isValid = false;
    } else {
        $("#error_referralemail").hide();
    }

    // Submit the form if all validations pass
    if (isValid) {
        varevent = "Event:Referral_Insert~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid") + "";
        thcheck = await FormSubmissionshandles("referral_", "AppCP", "#loading", varevent + "~!");

        if (thcheck.indexOf("Success") > -1) {
            let varResponsebot = thcheck.split("Success > ")[1];
            alert(varResponsebot + " Referral submitted successfully!");
            //  $("#referral_success").show().text(varResponsebot).css("color", "#4CAF50");
            $("#referral_text_name").val("");
            $("#referral_text_phone").val("");
            $("#referral_text_email").val("");
            $("#referral_text_project").val("");
            // example success message
            $('#referral_success').text("Referral submitted successfully!").fadeIn().css("color", "grren");

            // wait 1seconds and close modal
            $('#referral_success').fadeOut(500, function () {
                setTimeout(function () {
                    window.location.href = "Referral.html?section=viewallreferrals";
                }, 500);
            });

        }
        else {
            alert(thcheck);
            $('#loading').hide();

        }
    }
});

// Hide error messages on focus
$("#referral_text_name").focus(function () {
    $("#error_referralname").hide();
});

$("#referral_text_phone").focus(function () {
    $("#error_referralphone").hide();
});

$("#referral_text_email").focus(function () {
    $("#error_referralemail").hide();
});
$('#track_your_referral').click(async function () {
    viewrefrralbind();
 });
 $(window).on('load', async function () { viewrefrralbind(); });

 


 $('#viewallreferrals_btn').click(async function () {
    window.location.href = "Referral.html?section=viewallreferrals";
});

    $('#brochuresall').click(async function () {
        window.location.href = "Project-Details.html?section=Brochure";
    });

    const carouselElement = document.querySelector('#projectCarousel');
    const carousel = new bootstrap.Carousel(carouselElement, {
      interval: false,
      ride: false,
      wrap: false // <-- This stops the looping
    });



    $('#allproject_refer').click(async function () {
        Carouselbind();
      
    });

    function Carouselbind() {
        var eventval = "Event:Referral_Bind_Project_Slider~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
        var vrgetJsonDataCarouselbind = fnsndrequest("AppCP", eventval);
        console.log(vrgetJsonDataCarouselbind);
        Promise.resolve(vrgetJsonDataCarouselbind)
            .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
            .then(dataCarouselbind => refrralbind(dataCarouselbind))
            .catch(error => console.error("Error processing data:", error));
    }


    function refrralbind(dataCarouselbind) {
        let innerHtml = '';
      
        $.each(dataCarouselbind, function(index, item) {
          let activeClass = index === 0 ? 'active' : '';
      
          innerHtml += `
            <div class="carousel-item ${activeClass}">
              <div class="tdspay tdspayreferralcard bg-white p-3">
                <img src="${item.Logo}" alt="${item.projectName} Logo" class="img-fluid logoimg mb-3">
                <img src="${item.Banner}" alt="Project Cover" class="card-img-top">
                <h5 class="card-title my-2">${item.projectName}</h5>
                <small><ul><li>${item.unitText || 'unit plan'}</li></ul></small>
                <div class="row">
                  <div class="col-6 ms-auto">
                  <button class="custom_btn shearebtn p-0 mb-4"  onclick="shareAPK('${item.Brochure}')">
                      <img src="img/icon/share-icon.png" loading="lazy" alt="File Icon" class="img-fluid"> Share&nbsp;Details
                    </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `;
        });



      
        // Replace .carousel-inner content
        $('#projectCarousel .carousel-inner').html(innerHtml);
      
        // Optional: fix uniform height (if needed)
        setTimeout(() => {
          let maxHeight = 0;
          $('#projectCarousel .carousel-item').each(function() {
            maxHeight = Math.max(maxHeight, $(this).outerHeight());
          });
          $('#projectCarousel .carousel-item').css('min-height', maxHeight + 'px');
        }, 200);
      }
      

      function shareAPK(imageUrl) {
        window.plugins.socialsharing.share(
            "Hey! Check this out:",  // Message
            "Project Brochure",      // Subject
            imageUrl,                // Image or Brochure URL
            null,                    // No extra URL
            function () {
                // alert("Shared successfully! ✅");
            },
            function (error) {
                alert("Failed to share! ❌\nError: " + error);
            }
        );
    }
 $('#refer_your_friend').click(function () {
    window.location.href = "Referral-Friend.html";
 });

    // document.addEventListener('DOMContentLoaded', function () {
    //     const modalEl = document.getElementById('referFriendModal');
    //     const referModal = new bootstrap.Modal(modalEl);
      
    //     // Open modal
    //     document.getElementById('refer_your_friend').addEventListener('click', function () {
    //       referModal.show();
    //       history.pushState({ modalOpen: true }, null, '#referModal'); // Push state
    //     });
      
    //     // Close modal via custom button
    //     document.getElementById('someOtherCloseBtn').addEventListener('click', function () {
    //       referModal.hide();
    //       if (location.hash === '#referModal') {
    //         history.back(); // Optional: go back in history when manually closing modal
    //       }
    //     });
      
    //     // Close modal on browser back
    //     window.addEventListener('popstate', function () {
    //       if (modalEl.classList.contains('show')) {
    //         referModal.hide();
    //       }
    //     });
      
    //     // Optional: remove hash when modal is hidden
    //     modalEl.addEventListener('hidden.bs.modal', function () {
    //       if (location.hash === '#referModal') {
    //         history.replaceState(null, null, ' '); // Or use history.back() instead
    //       }
    //     });
    //   });
      