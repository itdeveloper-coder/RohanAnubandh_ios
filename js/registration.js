$(document).ready(function () {
    $('#verify_email_btn').click(async function () {
      var email = $('#registration_email').val().trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      $('#registration_email_error').hide();
  
      if (!emailPattern.test(email)) {
        $('#registration_email_error').show().html('Please enter a valid email address.');
        return;
      } else {
        var varevent = "Event:Check_New_Reg_Emailid~!cpNewEmailId:" + $("#registration_email").val() + "";
        var vrgetJsonData = fnsndrequest("AppCP", varevent);
        getSubmdata = vrgetJsonData.replace(/\[|\]/g, "");
        const status = getValueByKey(getSubmdata, "Status");
        const msg = getValueByKey(getSubmdata, "Msg");
        if(status == "Error"){
          alert(status);
            $('#registration_email_error').show().html(msg);
        }
        else if(status == "Success"){
          alert(status);
            $('#registration_email').attr('readonly', true);
            $('#registration_email').css('background-color', '#f0f0f0');
            $('#registration_email_error').hide();
            $('#registration_email_success').remove();
            $('#verify_email_btn').hide();
            $('#remaining_registration_fields').fadeIn();
       
        }
      }
    });
  


    // Allow only numbers
    $('#registration_mobile').on('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  
    // Modal open
    $('#open_terms_modal').click(function (e) {
      e.preventDefault();
      $('#terms_modal').fadeIn();
    });
  
    // Modal close
    $('#close_terms_btn').click(function () {
      $('#terms_modal').fadeOut();
    });
  
    // Agree button
    $('#agree_terms_btn').click(function () {
      $('#registration_terms_checkbox').prop('checked', true);
      $('#terms_modal').fadeOut();
      $('#terms_error').hide();
    });
  
    // Hide errors on focus
    $('.clsvalid').focus(function () {
      $('#' + this.id + '_error').hide();
    });
  
    // Registration validation
    $('#registration_btn').click(async function () {
      let mobile = $('#registration_mobile').val().trim();
      let password = $('#registration_password').val();
      let confirmPassword = $('#registration_confirmpassword').val();
      let isValid = true;
  
      let mobilePattern = /^[0-9]{10}$/;
      let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,20}$/;
  
      $('.error-message').hide();
  
      if (!mobilePattern.test(mobile)) {
        $('#registration_mobile_error').show();
        isValid = false;
      }
  
      if (!passwordPattern.test(password)) {
        $('#registration_password_error').show();
        isValid = false;
      }
  
      if (password !== confirmPassword) {
        $('#registration_confirmpassword_error').show();
        isValid = false;
      }
  
      if (!$('#registration_terms_checkbox').is(':checked')) {
        $('#terms_error').show();
        isValid = false;
      }
  
      if (isValid) {
        // Simulate OTP generation and sending
        var varevent = "Event:Send_OTP_for_New_Reg~!cpNewEmailId:" + $("#registration_email").val() + "~!cpNewMob:" + $("#registration_mobile").val() ;
        thcheck = await FormSubmissionshandles("notuser", "AppCP", "#loading", varevent + "~!");
        if (thcheck.indexOf("Success") > -1) {
          $('#registration_form_div').hide();
          $('#otp_registration_div').show();
     
        }
        else {
          let varResponsebot = thcheck.split("Error > ")[1];
          $("#registration_sendotp_error").show().html(varResponsebot);
        }
      
      }
    });
  
    $('#otp_registration_submit_btn').click(async function () {
      let emailOtp = $('#otp_registration_email').val().trim();
      let mobileOtp = $('#otp_registration_mobile').val().trim();
      let otpPattern = /^[0-9]{4,6}$/;
      let isValid = true;
  
      $('.error-message').hide();
  
      if (!otpPattern.test(emailOtp)) {
        $('#otp_registration_email_error').show();
        isValid = false;
      }
  
      if (!otpPattern.test(mobileOtp)) {
        $('#otp_registration_mobile_error').show();
        isValid = false;
      }

          // If all fields are valid, proceed with form submission
    if (isValid) {
      var vrnewpassword=$("#registration_password").val();
      getencryptedPass("CPApp", vrnewpassword, "Encrypt").then(async function (res) 
      { 
        varevent = "Event:Verify_OTP_for_New_Reg~!cpNewEmailId:" + $("#registration_email").val() + "~!cpNewPassword:"+ res.replace("Success:","") + "~!cpNewMob:" + $("#registration_mobile").val() + "~!cpNewOTP_Email:" + $("#otp_registration_email").val() + "~!cpNewOTP_Mob:" + $("#otp_registration_mobile").val();

        thcheck = await FormSubmissionshandles("notuser", "AppCP", "#loading", varevent + "~!");
        if (thcheck.indexOf("Success") > -1) {
         let varResponsebot = thcheck.split("Success > ")[1];
         $("#registration_submitotp_error").show().text(varResponsebot);
         $("#registration_submitotp_error").css("color", "green");
         $("#registration_submitotp_error").css("font-weight", "bold");
         setTimeout(function () {
          window.location.href = 'login.html';
        }, 1000);
        }
        else {
          let varResponsebot = thcheck.split("Error > ")[1];
          $("#registration_submitotp_error").show().text(varResponsebot);
          $("#registration_submitotp_error").css("color", "red");
          $("#registration_submitotp_error").css("font-weight", "bold");
         
        }
       });
    }
    });
  
    $(".userid_back").click(function () {
      $('#registration_form_div').show();
      $('#otp_registration_div').hide();
    });
  });
  