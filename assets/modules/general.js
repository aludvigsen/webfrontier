$(function() {

    // Activate usermenu
    $(".Dropdown").on("click", function(){
        $(this).toggleClass('is-expanded');
    });

    // Close the usermenu if user clicks outside of the menu
    $(document).click(function(event) {
        if(
            $('.Dropdown').hasClass('is-expanded') &&
            !$(event.target).parents('.Dropdown').is('.Dropdown')
            ) {
            $('.Dropdown').removeClass('is-expanded');
        }
    })

});