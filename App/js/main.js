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
        if (event.target.innerHTML == "Add to Basket") {
            console.log(event.currentTarget.id);
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