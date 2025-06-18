
(function () {

    'use strict';

    // Toggle sidebar on Menu button click
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#body').toggleClass('active');
    });
    window.addEventListener("load", (event) => {
        $('#loader').fadeIn();
        $('#loginusername').html(user.displayname);        
        setTimeout(function () {
            $('#loader').fadeOut();
        }, 1000);
    });
    // Auto-hide sidebar on window resize if window size is small
    // $(window).on('resize', function () {
    //     if ($(window).width() <= 768) {
    //         $('#sidebar, #body').addClass('active');
    //     }
    // });
})();



