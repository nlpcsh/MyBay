'use strict';

let produtsListId = 1;
let products = MyBayManger.getListOfProducts(produtsListId, db);
let currentUser = new User("Unufri");

$(document).ready(function() {

    let sammyApp = Sammy("#page-container", function() {
        this.get('#/home', homeController.page);
        // https://youtu.be/T0jtFmFPU-4?t=1648

        this.get('#/products', productListController.all);

        this.get('#/basket', basketController.basket);

        this.get('#/about', aboutController.page);

        this.get('#/contact', contactController.page);

        this.get('#/login', loginController.login);

        $(function() {
            sammyApp.run('#/home');
        });

    });

    // make 
    $('#navLinks li').on('click', function(event) {
        $('#navLinks').removeClass('show');
        $('#navLinks .active').removeClass('active');
        $(this).toggleClass('active');
    });

    $('.navbar-brand').on('click', function(event) {
        $('#navLinks .active').removeClass('active');
    });

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


