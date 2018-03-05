'use strict';

$(document).ready(function() {

    let produtsListId = 1;
    let products = MyBayManger.getListOfProducts(produtsListId, db);
    let currentUser = new User("Unufri");

    //$("#welcome").html('Welcome to MyBay, dear ' + currentUser.uName + '!');

    // add products using a template
    let template = Handlebars.compile(document.getElementById('products-template').innerHTML);
    document.getElementById('product-container').innerHTML = template(products);

    //load images
    //products.productsList.forEach(function(p) {
    //    $("div#" + p.id).css('background', 'transparent url(' + p.image + ') no-repeat center');
    //});

    //let productsContainer = $('#product-container');
    $('#product-container').on('click', 'div', function(event) {
        let curentId = event.currentTarget.id;

        if (event.target.classList.contains('add-to-basket')) {
            currentUser.addToBasket(curentId, getProductById(products.productsList, curentId));
        }

        if (event.target.classList.contains('remove-from-basket')) {
            currentUser.removeFromBasket(curentId, getProductById(products.productsList, curentId));
        }
        $("#total-value").html(MyBayManger.getTotalProductsValue(currentUser.shoppingBasket, products.productsList));
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

    function getDataToSent(shoppingBasket, productsList) {
        let currentBasketData = new Array();

        shoppingBasket.forEach(element => {
            let product = getProductById(productsList, element.productId);
            currentBasketData.push({
                name: product.name,
                singleUnitPrice: product.singleUnitPrice,
                quantity: element.quantity,
                totalPrice: MyBayManger.getTotalProductsValue(currentUser.shoppingBasket, products.productsList)
            })
        });
        return currentBasketData;
    }

    function getProductById(productsList, productId) {
        return productsList.find(p => p.id == productId);
    }
});