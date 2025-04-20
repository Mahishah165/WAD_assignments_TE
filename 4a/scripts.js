$(document).ready(function() {
    // Handle form submission
    $("form").on("submit", function(e) {
        e.preventDefault();
        alert("Message sent! (This is a demo)");
        $(this)[0].reset();
    });
});
