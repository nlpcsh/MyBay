'use strict';

$(document).ready(function() {
    // make 
    /*
    $('#navLinks li').on('click', function(event) {
        $('#navLinks').removeClass('show');
        $('#navLinks .active').removeClass('active');
        $(this).toggleClass('active');
    });

    $('.navbar-brand').on('click', function(event) {
        $('#navLinks .active').removeClass('active');
    });
    */
    if (toastr) {
        toastr.options = {
            positionClass: 'toast-top-center'
        }
    }

    $(function () {
        $(document).scroll(function () {
            var $nav = $("#mainNavbar");
            $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
        });
    });
});
