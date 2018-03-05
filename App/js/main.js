'use strict';

$(document).ready(function() {

    let produtsListId = 1;
    let products = MyBayManger.getListOfProducts(produtsListId);
    let currentUser = new User("Unufri");

    $("#welcome").html('Welcome to MyBay, dear ' + currentUser.uName + '!');

    // add products using a template
    let template = Handlebars.compile(document.getElementById('products-template').innerHTML);
    document.getElementById('product-container').innerHTML = template(products);

    let productsContainer = $('#product-container');

    productsContainer.on('click', 'div', function(event) {
        let curentId = event.currentTarget.id;

        if (event.target.classList.contains('add-to-basket')) {

            currentUser.addToBasket(curentId, products.productsList.find(p => p.id == curentId));
        }

        if (event.target.classList.contains('remove-from-basket')) {
            currentUser.removeFromBasket(curentId, products.productsList.find(p => p.id == curentId));
        }
        $("#total-value").html(MyBayManger.getTotalProductsValue(currentUser.shoppingBasket, products.productsList));
    });


});
/*
function getTemplateAjax(path) {
    var source;
    var template;

    $.ajax({
        url: path, //ex. js/templates/mytemplate.handlebars
        cache: true,
        success: function(data) {
            source = data;
            template = Handlebars.compile(source);
            $('#container').html(template);
        }
    });
}
*/