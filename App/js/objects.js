'use strict';

class Product {
    constructor(name, productId, description, singleUnitPrise, image) {
        this._id = productId;
        this._name = name;
        this._description = description;
        this._image = image;
        this._singleUnitPrise = singleUnitPrise;
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

    get singleUnitPrise() {
        return this._singleUnitPrise;
    }
};

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

    addToBasket(productIdtoAdd, product) {
        function addNewProductToTable(shoppingBasket) {
            shoppingBasket.push({
                productId: productIdtoAdd,
                qantity: 1
            });
            $("#added-products-table-header").after('<tr id=' + productIdtoAdd + ' > <td>' + product.name + '</td><td>' + 1 + ' </td></tr>');
            $("#" + productIdtoAdd + " .hidden").removeClass("hidden").addClass("remove");
        }

        // add quantoty if the product exists
        if (this._shoppingBasket[0] == undefined) {
            addNewProductToTable(this._shoppingBasket);
        } else {
            let counter = 0;
            for (let i = 0; i < this._shoppingBasket.length; i += 1) {
                if (this._shoppingBasket[i].productId === productIdtoAdd) {
                    counter += 1;
                    this._shoppingBasket[i].qantity += 1;
                    if (this._shoppingBasket[i].qantity > 5) {
                        this._shoppingBasket[i].qantity = 5;
                        toastr["warning"]("Тhe selected quantity for product " + product.name + " is out of stock");
                        return;
                    }
                    console.log($("tr#" + productIdtoAdd + " td + td").html());
                    $("tr#" + productIdtoAdd + " td + td").html(this._shoppingBasket[i].qantity);
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
    removeFromBasket(productIdtoRemove, product) {
        for (let i = 0; i < this._shoppingBasket.length; i += 1) {
            if (this._shoppingBasket[i].productId === productIdtoRemove) {

                this._shoppingBasket[i].qantity -= 1;
                if (this._shoppingBasket[i].qantity == 0) {
                    this._shoppingBasket.splice(i, 1);
                    console.log($("tr#" + productIdtoRemove));
                    $("#added-products tr#" + productIdtoRemove).remove();
                    $("#" + productIdtoRemove + " .remove").removeClass("remove").addClass("hidden");
                    return;
                }
                console.log($("tr#" + productIdtoRemove + " td + td").html());
                $("tr#" + productIdtoRemove + " td + td").html(this._shoppingBasket[i].qantity);
            }
        }

        toastr["info"]("Product " + product.name + " removed.");
    }
}

class MyBayManger {
    static getListOfProducts(productListId) {
        productListId = productListId || 0;
        // real functionality should be to get the available products from the app server
        let products = {
            listId: productListId,
            productsList: []
        };

        for (let i = 0; i < 2; i += 1) {
            products.productsList.push(new Product("Name " + i, 1000 + i, "Description " + i, i + 10.99, "Image " + i));
        }

        return products;
    }
    static getTotalProductsValue(userShopingBasket, productsList) {
        let totalProductsValue = 0;
        for (let item of userShopingBasket) {
            let product = productsList.find(pr => pr.id == item.productId);
            totalProductsValue += (item.qantity * product.singleUnitPrise);
        }
        console.log(totalProductsValue);
        return totalProductsValue;
    }
}