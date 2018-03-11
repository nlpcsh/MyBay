'use strict';

$(document).ready(function() {

    let produtsListId = 1;
    let products = MyBayManger.getListOfProducts(produtsListId, db);
    let currentUser = new User("Unufri");

    //$("#welcome").html('Welcome to MyBay, dear ' + currentUser.uName + '!');

    // add products using a template
    let productstemplate = Handlebars.compile(document.getElementById('products-template').innerHTML);
    //document.getElementById('product-container').innerHTML = productstemplate(products);

    let sammyApp = Sammy("#product-container", function() {
        this.get('#/', function() {
            console.log('Home!!!');
            $('#product-container').html(productstemplate(products));
        });
        this.get('#/products', function() {
            console.log('Products!!!');
            $('#product-container').html(productstemplate(products));
            //let productsContainer = $('#product-container');
            $('#product-container').on('click', 'div', function(event) {
                let curentId = event.currentTarget.id;

                if (event.target.classList.contains('add-to-basket')) {
                    currentUser.addToBasket(getProductById(products.productsList, curentId));
                }

                if (event.target.classList.contains('remove-from-basket')) {
                    currentUser.removeFromBasket(curentId);
                }
                $("#total-value").html(MyBayManger.getTotalProductsValue(currentUser.shoppingBasket, products.productsList));
            });
            // add Remove button if necessary
            currentUser.shoppingBasket.forEach(p => {
                if (p.quantity > 0) {
                    $("#" + p.productId + " .hidden").removeClass("hidden").addClass("remove");
                }
            });

        });
        this.get('#/basket', function() {
            console.log('Basket!!!');

            let basketTemplate = Handlebars.compile(document.getElementById('basket-template').innerHTML);
            $('#product-container').html(basketTemplate(currentUser));

            currentUser.shoppingBasket.forEach(p => {
                $("tr#" + p.productId + " .unit-price").html('$' + (p.quantity * p.singleUnitPrice));
            });

            $("#confirm-order").on('click', function() {
                if (currentUser.shoppingBasket[0] == undefined) {
                    toastr["warning"]("Your shopping cart is empty.");
                } else {
                    for (let element of currentUser.shoppingBasket) {
                        if (element.quantity > 5) {
                            let product = getProductById(products.productsList, element.productId);
                            toastr["warning"]("Тhe selected quantity for product " + product.name + " is out of stock");
                            return;
                        }
                    }

                    let currentBasketData = getDataToSent(currentUser.shoppingBasket, products.productsList);

                    $.ajax({
                        type: "POST",
                        //url: "someUrl",
                        url: "someURL",
                        data: currentBasketData,
                        success: toastr["success"]("Order Confirmed!")
                    });
                }
            });
        });

        $(function() {
            sammyApp.run('#/products');
        });

        //load images
        //products.productsList.forEach(function(p) {
        //    $("div#" + p.id).css('background', 'transparent url(' + p.image + ') no-repeat center');
        //});

    });

    function getDataToSent(shoppingBasket, productsList) {
        let currentBasketData = new Array();

        shoppingBasket.forEach(product => {
            currentBasketData.push({
                name: product.name,
                singleUnitPrice: product.singleUnitPrice,
                quantity: product.quantity,
                totalPrice: MyBayManger.getTotalProductsValue(currentUser.shoppingBasket, products.productsList)
            })
        });
        return currentBasketData;
    }

    function getProductById(productsList, productId) {
        return productsList.find(p => p.id == productId);
    }
});