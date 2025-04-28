
 $(window).on('load', async function () {
         var eventunitarea = "Event:CustomerPortal_unit_area~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
         var vrgetJsonDataunitarea = await fnsndrequest("AppCP", eventunitarea);
         Promise.resolve(vrgetJsonDataunitarea)
             .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
             .then(dataunitarea => unitarea(dataunitarea))
         .catch(error => console.error("Error processing data:", error));



     //var eventval11 = `Event:Project_Details~!cpuserid:${localStorage.getItem("cpuserid")}~!cpsaleid:${localStorage.getItem("cpsaleid")}~!cploginid:${localStorage.getItem("cploginid")}`;
     //var getSubmdata = fnsndrequest("AppCP", eventval11).replace(/\[|\]/g, "");

     //const vrstatus = getValueByKey(getSubmdata, "Status");
     //const prjname = getValueByKey(getSubmdata, "Projnm");

     //if (vrstatus == "" || vrstatus == null || vrstatus == undefined) {

     //}
     //else {
     //    if (vrstatus == "Success") {
     //        $("#projectname").html(prjname);
     //    }
     //    else {

     //    }
     //}

 });
 function unitarea(dataunitarea) {
    unitareaContainer = $("#unit_area").empty();
    dataunitarea.forEach(item => {
            unitareaContainer.append(`
                      <div class="col-8">
                        <h6>${item.Description}</h6>
                      </div>
                      <div class="col-4 text-end">
                       <p>${item.Area}</p>
                      </div>
            `);
        });
    }
   


    $(document).on('click', '#location-tab', function() {
      var eventdatalocation = "Event:Loc_Map~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
              
      var vrgetJsondatalocation = fnsndrequest("AppCP", eventdatalocation);
      console.log(vrgetJsondatalocation);
      Promise.resolve(vrgetJsondatalocation)
          .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
          .then(datalocation => locationmap(datalocation))
          .catch(error => console.error("Error processing data:", error));
   }); 
   
   
   function locationmap(datalocation) {
    locationmapContainer = $("#location-tab-pane").empty();
    datalocation.forEach(item => {
           locationmapContainer.append(`
  
                 <p class="my-2">Map Location: </p>
                     <iframe class="" src="${item.Link}" width="100%" height="250px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                      <p class="my-2">Address:</p>
                      <h6 class="address">${item.Address}</h6>
            `);
        });
    }

             
             $(document).on('click', '#update_tab', function() {
                var eventprojectupdate = "Event:CustomerPortal_project_update~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
                var vrgetJsonDataproupdate = fnsndrequest("AppCP", eventprojectupdate);
                Promise.resolve(vrgetJsonDataproupdate)
                    .then(response => JSON.parse(response || "[]")) // Ensure it's parsed JSON
                    .then(dataproupdate => unitdetails(dataproupdate))
                    .catch(error => console.error("Error processing data:", error));
             });        



             function unitdetails(dataproupdate) {
              const unitdetailsContainer = $("#project_update").empty();
            
              dataproupdate.forEach(item => {
                // Check if the URL is a video
                const isVideo = item.projectupdateimage.toLowerCase().endsWith(".mp4");
            
                // Create media element based on type
                const mediaElement = isVideo
                  ? `<video class="img-fluid projectupdateimage" controls preload="metadata">
                       <source src="${item.projectupdateimage}" type="video/mp4">
                       Your browser does not support the video tag.
                     </video>`
                  : `<img src="${item.projectupdateimage}" alt="Project Update" class="img-fluid projectupdateimage">`;
            
                unitdetailsContainer.append(`
                  <div class="amenities_sub_tab text-center py-3">
                    ${mediaElement}
                    <div class="flex_card text-center">
                      <div class="card_iconsuccess mb-3" id="kyc_success_yes">
                        <img src="img/icon/success-icon.png" loading="lazy" alt="File Icon" class="img-fluid">
                      </div>
                      <div class="card_contant_details ms-3">
                        <h6>${item.projectupdatename}</h6>
                        <small>${item.projectupdatedate}</small>
                      </div>
                    </div>
                  </div>
                `);
              });
            }
            



              function shareAPK() {
                var imageUrl = "https://tinyjpg.com/images/social/website.jpg"; // Replace with your image URL
                window.plugins.socialsharing.share(
                    "Hey! Check this out Image:",  // Message
                    "Image",                // Subject
                    imageUrl,                // Image URL instead of file path
                    null,                    // No extra URL
                    function () { // Success callback
                        // alert("Shared successfully! ✅");
                    },
                    function (error) { // Error callback
                        alert("Failed to share! ❌\nError: " + error);
                    }
                );
            }


              // stop videos on nav-link click
  $(document).on('click', '.nav-link', function () {
    $('video').each(function () {
      this.pause();
      this.currentTime = 0;
    });
  });