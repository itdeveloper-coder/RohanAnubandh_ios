


let videoID = ""; // Define videoID variable
let originalSrc = ""; // Store original video URL
$(window).on('load', async function () {
    var eventvideo = "Event:Launch_Video~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid");
    var vrgetJsonDatavideo = await fnsndrequest("AppCP", eventvideo);
    getSubmdatavideo = vrgetJsonDatavideo.replace(/\[|\]/g, "");
    const Video_Link = getValueByKey(getSubmdatavideo, "Video_Link");
    const Video_msg = getValueByKey(getSubmdatavideo, "Msg");
    const Video_type = getValueByKey(getSubmdatavideo, "Type");
    if (Video_type === "Video") {
      const embedURL = convertToEmbedURL(Video_Link);
      
      originalSrc = embedURL; // Store the original video URL
      $("#videoFrame").attr("src", embedURL);
    } else {
      $("#videodiv").html(`<img src="${Video_Link}" alt="Media Content" style="width:100%; height:auto;">`);
    }



});
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



document.addEventListener("backbutton", function (e) {
    e.preventDefault();

    let currentPage = $(".page:visible").attr("id"); // Assuming pages have 'page' class
    console.log("Current Page:", currentPage);
    let url = window.location.href;
    let fileName = window.location.pathname.split("/").pop(); // Extract filename



    if (currentPage === "Video" || fileName == "Video.html") {
        navigator.app.exitApp(); // Exit app if on Video
    } else {
        history.back(); // Navigate back
    }
}, false);



let cpSessionIdstest = localStorage.getItem("cpSessionids");
$("#loginform_div").show();

if (cpSessionIdstest == "" || cpSessionIdstest == null || cpSessionIdstest == undefined) {
    window.location.href = "login.html";
}
 let BookingStatus = localStorage.getItem("cpBookingStatus");

$("#next_WhatsApp_page").click( async function () {
var eventwa = "Event:Check_WA_notification~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid") + "~!AgreeWA:" + whatsappConsent ;
var vrgetJsonDatawa = await fnsndrequest("AppCP", eventwa);
getSubmdata = vrgetJsonDatawa.replace(/\[|\]/g, "");
const msg = getValueByKey(getSubmdata, "Msg");
if(msg == "Yes"){

if(BookingStatus == "AD"){
  window.location.href = "Home2.html";
}
else if(BookingStatus == "BK"){
  window.location.href = "Home.html";
}
else{
  
}
}
else{
window.location.href = "Video.html?section=secondpage_projectWelcome";
}
});


let whatsappConsent = ""; // Variable to store the selected value
$("input[name='WhatsApp']").on("change", function () {
whatsappConsent = $("input[name='WhatsApp']:checked").val(); 
});
$('#next_homepage').on('click',async function() {
var eventWhatsApp = "Event:WA_Notification~!cpuserid:" + localStorage.getItem("cpuserid") + "~!cpsaleid:" + localStorage.getItem("cpsaleid") + "~!cploginid:" + localStorage.getItem("cploginid") + "~!AgreeWA:" + whatsappConsent ;
var vrgetJsonDataWhatsApp = await fnsndrequest("AppCP", eventWhatsApp);

if(BookingStatus == "AD"){
  window.location.href = "Home2.html";
}
else if(BookingStatus == "BK"){
  window.location.href = "Home.html";
}
else{
  
}
});


