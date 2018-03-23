'use strict';

let produtsListId = 1;
let products = MyBayManger.getListOfProducts(produtsListId, db);
let currentUser = new User("Unufri");

$(document).ready(function() {

    let sammyApp = Sammy("#product-container", function() {
        this.get('#/', homeController.all);
        // https://youtu.be/T0jtFmFPU-4?t=1648

        this.get('#/products', homeController.all);

        this.get('#/basket', basketController.basket );

        $(function() {
            sammyApp.run('#/products');
        });

    });

    $('#product-container').on('click', 'div', function(event) {
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
});


