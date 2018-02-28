'use strict';

$(document).ready(function() {

    let produtsId = 1;
    let products = MyBayManger.getListOfProducts(produtsId);
    let currentUser = new User("Pesho");
    //getTemplateAjax("templates/product.handlebars");

    var template = Handlebars.compile(document.getElementById('products-template').innerHTML);
    document.getElementById('container').innerHTML = template(products);
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