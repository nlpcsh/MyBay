'use strict';

const homeController = function () {
    function page(context){
        templates.get('home')
        .then(function (template){
                context.$element().html(template(currentUser));
        });
    }

    return {
        page: page
    }
}();

const productListController = function () {

    function all(context){

        /*
        $.get('templates/product.handlebars', function(html){
            //$('#content').html(html);
            context.$element().html(html);
        });
        */

        templates.get('productList')
            .then(function (template){
                context.$element().html(template(products));
            })
            .then( function () {
                // add Remove button if necessary
                currentUser.shoppingBasket.forEach(p => {
                    if (p.quantity > 0) {
                        $("#" + p.productId + " .hidden").removeClass("hidden").addClass("remove");
                    }
                });
            });
    }

    return {
        all: all
    }
}();

const aboutController = function () {
    function page(context){
        templates.get('about')
        .then(function (template){
                context.$element().html(template(currentUser));
        });
    }

    return {
        page: page
    }
}();

const contactController = function () {
    function page(context){
        templates.get('contact')
        .then(function (template){
                context.$element().html(template(currentUser));
        });
    }

    return {
        page: page
    }
}();

const loginController = function () {
    function login(context){
        templates.get('login')
        .then(function (template){
                context.$element().html(template(currentUser));
        });
    }

    return {
        login: login
    }
}();

const basketController = function () {

    function basket(context) {

        //let basketTemplate = Handlebars.compile(document.getElementById('basket-template').innerHTML);
        //$('#page-container').html(basketTemplate(currentUser));

        templates.get('basket')
        .then(function (template){
                context.$element().html(template(currentUser));
            })
        .then(function () {

            // calculate total price for a product
            currentUser.shoppingBasket.forEach(p => {
                $("tr#" + p.productId + " .unit-price").html('$' + (p.quantity * p.singleUnitPrice));
            });
            // set total value
            $("#total-value").html(MyBayManger.getTotalProductsValue(currentUser.shoppingBasket, products.productsList));

            $("#confirm-order").on('click', function() {
                if (currentUser.shoppingBasket[0] == undefined) {
                    toastr["warning"]("Your shopping cart is empty.");
                } else {
                    for (let element of currentUser.shoppingBasket) {
                        if (element.quantity > 5) {
                            let product = getProductById(products, element.productId);
                            toastr["warning"]("Тhe selected quantity for product " + product.name + " is out of stock");
                            return;
                        }
                    }

                    let currentBasketData = getDataToSent(currentUser, products);

                    $.ajax({
                        type: "POST",
                        //url: "someUrl",
                        url: "someURL",
                        data: currentBasketData,
                        success: toastr["success"]("Order Confirmed!")
                    });
                }
            });
        })
    }

    return {
        basket: basket
    }
}();