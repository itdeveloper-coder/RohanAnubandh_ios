$(window).on('load', async function () {

    $("#first_section").fadeTo(1000, 0.5, function () {
        localStorage.clear();
        //Object.keys(localStorage).forEach(function (key) {
        //    localStorage.setItem(key, ""); // Set each key to an empty string
        //});
        window.location.href = "login.html";
    });
    
});