'use strict';

class Product {
    constructor(name, productId, description, singleUnitPrice, image) {
        this._id = productId;
        this._name = name;
        this._description = description;
        this._image = image;
        this._singleUnitPrice = singleUnitPrice;
    };

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    get image() {
        return this._image;
    }

    get singleUnitPrice() {
        return this._singleUnitPrice;
    }
}

class User {
    constructor(uName) {
        this._uName = uName;
        this._shoppingBasket = [];
    }

    get uName() {
        return this._uName;
    }

    get shoppingBasket() {
        return this._shoppingBasket;
    }

    addToBasket(product) {
        function addNewProductToTable(shoppingBasket) {
            shoppingBasket.push({
                name: product.name,
                productId: product.id,
                singleUnitPrice: product.singleUnitPrice,
                quantity: 1
            });
            $("#added-products-table-header").after('<tr id=' + product.id + ' > <td>' + product.name + '</td><td>$' + product.singleUnitPrice + '</td><td class="quantity">' + 1 + ' </td><td class="unit-price">$' + product.singleUnitPrice + '</td> </tr>');
            $("#" + product.id + " .hidden").removeClass("hidden").addClass("remove");
            toastr["info"]("Product " + product.name + " added.");
        }

        // add quantoty if the product exists
        if (this._shoppingBasket[0] == undefined) {
            addNewProductToTable(this._shoppingBasket);
        } else {
            let counter = 0;
            for (let i = 0; i < this._shoppingBasket.length; i += 1) {
                if (this._shoppingBasket[i].productId == product.id) {
                    counter += 1;
                    this._shoppingBasket[i].quantity += 1;

                    $("tr#" + product.id + " .quantity").html(this._shoppingBasket[i].quantity);
                    $("tr#" + product.id + " .unit-price").html('$' + (this._shoppingBasket[i].quantity * product.singleUnitPrice));
                }
                // last loop - if product not present  - add to the list
                if ((counter == 0) && (i == this._shoppingBasket.length - 1)) {
                    addNewProductToTable(this._shoppingBasket);
                    return;
                }
            }
            toastr["info"]("Product " + product.name + " added.");
        }
    }
    removeFromBasket(productIdtoRemove) {
        let productToRemoveName = '';
        for (let i = 0; i < this._shoppingBasket.length; i += 1) {
            if (this._shoppingBasket[i].productId == productIdtoRemove) {
                productToRemoveName = this._shoppingBasket[i].name;
                this._shoppingBasket[i].quantity -= 1;
                if (this._shoppingBasket[i].quantity == 0) {
                    this._shoppingBasket.splice(i, 1);
                    $("#added-products tr#" + productIdtoRemove).remove();
                    $("#" + productIdtoRemove + " .remove").removeClass("remove").addClass("hidden");
                    toastr["info"]("Product " + productToRemoveName + " removed.");
                    return;
                }
                $("tr#" + productIdtoRemove + " .quantity").html(this._shoppingBasket[i].quantity);
                $("tr#" + productIdtoRemove + " .unit-price").html('$' + (this._shoppingBasket[i].quantity * this._shoppingBasket[i].singleUnitPrice));
            }
        }
        toastr["info"]("Product " + productToRemoveName + " removed.");
    }
}

class MyBayManger {
    static getListOfProducts(productListId, db) {
        productListId = productListId || 0;
        // real functionality should be to get the available products from the app server
        // let products = {
        //     listId: productListId,
        //     productsList: []
        // };

        // for (let i = 0; i < 5; i += 1) {
        //     products.productsList.push(new Product("Name " + i, 1000 + i, "Description " + i, i + 10.99, "img/boat" + (+i + 1) + ".jpg"));
        // }

        let products = db[productListId];

        return products;
    }
    static getTotalProductsValue(userShopingBasket, productsList) {
        let totalProductsValue = 0;
        for (let item of userShopingBasket) {
            totalProductsValue += (item.quantity * item.singleUnitPrice);
        }
        //console.log(totalProductsValue);
        return totalProductsValue;
    }
}