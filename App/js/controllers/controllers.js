'use strict';

let homeController = function () {

    function all(context){

        /*
        $.get('templates/product.handlebars', function(html){
            //$('#content').html(html);
            context.$element().html(html);
        });
        
            // add Remove button if necessary
            currentUser.shoppingBasket.forEach(p => {
                if (p.quantity > 0) {
                    $("#" + p.productId + " .hidden").removeClass("hidden").addClass("remove");
                }
            });
        */

        templates.get('product').then(function (template){
            context.$element().html(template(products));
        });

    }

    return {
        all: all
    }
}();