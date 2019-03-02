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

    $('#page-container').on('click', 'div', function(event) {
        let curentId = event.currentTarget.id;

        if (event.target.classList.contains('add-to-basket')) {
            currentUser.addToBasket(getProductById(products, curentId));
        }

        if (event.target.classList.contains('remove-from-basket')) {
            currentUser.removeFromBasket(curentId);
        }
        //$("#total-value").html(MyBayManger.getTotalProductsValue(currentUser.shoppingBasket, products.productsList));
    });
    // make 
    $('.nav.navbar-nav').on('click', 'li', function(event) {
        let $this = $(this);
        $('.active').removeClass('active');
        $this.addClass('active');
    });

    if (toastr) {
        toastr.options = {
            positionClass: 'toast-top-center'
        }
    }

});


