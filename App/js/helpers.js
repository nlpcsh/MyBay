'use strict';

function getDataToSent(currentUser, products) {
    let currentBasketData = new Array();

    currentUser.shoppingBasket.forEach(product => {
        currentBasketData.push({
            name: product.name,
            singleUnitPrice: product.singleUnitPrice,
            quantity: product.quantity,
            totalPrice: MyBayManger.getTotalProductsValue(currentUser.shoppingBasket, products.productsList)
        })
    });
    return currentBasketData;
}

function getProductById(products, productId) {
    return products.productsList.find(p => p.id == productId);
}