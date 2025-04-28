

   // Function to show a section
   function showSection(sectionId) {
    // Hide all sections
    $('.section').removeClass('activesection');
    // Show the selected section
    $('#' + sectionId).addClass('activesection');
}


// Event handler for navigation buttons
 $('.Btnclick').click(function () {
     const targetSection = $(this).data('section');
     // Show the selected section and update history
     showSection(targetSection);
     history.pushState({ section: targetSection }, targetSection, "?section=" + targetSection);
 });



// Handle popstate event (back/forward navigation)
$(window).on('popstate', function (event) {
    if (event.originalEvent.state && event.originalEvent.state.section) {
        showSection(event.originalEvent.state.section);
    } else {
        // If no state exists, fallback to the first section
        showSection($('.section').first().attr('id'));
    }
});

// Initialize based on the current URL (if any section parameter exists)
const urlParams = new URLSearchParams(window.location.search);
const sectionParam = urlParams.get('section');
if (sectionParam) {
    showSection(sectionParam); // Show the section based on URL
} else {
    // If no section is found, show the first section by default
    showSection($('.section').first().attr('id'));
}

// Handle the Back Button click inside the page
$('.backButton').click(function () {
    history.back(); // Go back to the previous page
});



