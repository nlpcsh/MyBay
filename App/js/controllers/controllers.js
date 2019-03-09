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
                        $("#remove-" + p.productId).removeClass("hidden").addClass("remove");
                    }
                });

                $('.add-to-basket').on('click', function(event) {
                    let curentId = event.currentTarget.id.split('-')[1];
                    currentUser.addToBasket(getProductById(products, curentId));
                    $('#remove-' + curentId).removeClass('hidden').addClass("remove");

                    return false;
                });

                $('.remove-from-basket').on('click', function(event) {
                    let curentId = event.currentTarget.id.split('-')[1];
                    let productQuantity = currentUser.removeFromBasket(curentId);

                    if (productQuantity < 1) {
                        $('#remove-' + curentId).addClass('hidden').removeClass('remove');
                    }

                    if (currentUser.shoppingBasket && (currentUser.shoppingBasket.length < 1)) {
                        $('#basket').removeClass('has-products');
                    }

                    return false;
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
        })
        .then(function () {
            $('#register-form-link').on('click', function(event) {
                $('#register-form').removeClass('hidden');
                $('#sign-in-form').addClass('hidden');
            });
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
            let totalValue = MyBayManger.getTotalProductsValue(currentUser.shoppingBasket, products.productsList);

            $("#total-value").html(totalValue);
            if (totalValue == 0) {
                $('#confirm-order').attr("disabled", true);
            }

            $("#confirm-order").on('click', function(e) {
                e.preventDefault();
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