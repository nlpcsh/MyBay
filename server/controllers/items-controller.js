'use strict';

const Item = require('../models/item-model');

module.exports = function () {
    return {
        getItems(req, res) {
            Item.find({}).lean().exec(function (err, productsList) {
                res.status(200).render('productList', productsList);
            });
        },
        setItems(req, res) {
            //sample to incert in the base:
            let itemsList = require('../data/test-items.js');

            Item.collection.insert(itemsList, (err, items) => {
                if (err){ 
                    return console.error(err);
                } else {
                    console.log('Multiple items inserted to Collection');
                }
            })
        }
    }
}