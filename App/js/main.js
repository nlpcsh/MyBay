'use strict';

$(document).ready(function() {

    let produtsListId = 1;
    let products = MyBayManger.getListOfProducts(produtsListId);
    let currentUser = new User("Unufri");

    $("#welcome").html('Welcome to MyBay, dear ' + currentUser.uName + '!');
    //getTemplateAjax("templates/product.handlebars");

    // add products using a template
    let template = Handlebars.compile(document.getElementById('products-template').innerHTML);
    document.getElementById('product-container').innerHTML = template(products);

    let productsContainer = $('#product-container');

    productsContainer.on('click', 'div', function(event) {
        let curentId = event.currentTarget.id;

        console.log(event.currentTarget.id);
        console.log(event.target.innerHTML);
        console.log(event.target.classList.contains('add-to-basket'));

        if (event.target.classList.contains('add-to-basket')) {
            //console.log(event.currentTarget.id);
            currentUser.addToBasket(curentId);
        }

        if (event.target.classList.contains('remove-from-basket')) {
            //console.log(event.currentTarget.id);
            currentUser.removeFromBasket(curentId);
        }
    });

    /* DEBUG 
    console.log("List ID: " + products.id);
    products.productsList.forEach(p => {
        console.log(p.name);
        console.log(p.description);
        console.log(p.singleUnitPrise)
    });
    console.log("Current user name: " + currentUser.uName);
    */


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