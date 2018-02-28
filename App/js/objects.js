'use strict';

class Product {
    constructor(name, description, singleUnitPrise, image) {
        this._name = name;
        this._description = description;
        this._image = image;
        this._singleUnitPrise = singleUnitPrise;
    };

    get name() {
        return this._name;
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
        this._shoppingCart = [];
    }

    get uName() {
        return this._uName;
    }

    get shoppingCart() {
        return this._shoppingCart;
    }

    addToCart(product) {
        shoppingCart.push(product);
    }

    removeFromCart(product) {
        shoppingCart.remove(product);
    }
}

class MyBayManger {
    static getListOfProducts(productId) {
        productId = productId || 0;
        // real functionality should be to get the available products from the app server
        let products = {
            id: productId,
            productsList: []
        };

        for (let i = 0; i < 6; i += 1) {
            products.productsList.push(new Product("Name " + i, "Description " + i, i + 10.99, "Image " + i));
        }

        return products;
    }
}