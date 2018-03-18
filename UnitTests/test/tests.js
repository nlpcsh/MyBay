'use strict';

mocha.setup('bdd');

//let chai = require('chai');
const { expect, assert } = chai;

describe('Testing JS', function() {
    describe('Testing Helpers', function() {

        it('Expect getProductById to be a function', function() {
            expect(getProductById).to.be.a('function');
        });

        let products = {
            listId: 1,
            productsList: [{
                    name: 'Boat3',
                    id: 3333,
                    description: 'txt3',
                    image: 'img/boat3.jpg',
                    singleUnitPrice: 33
                }, {
                    name: 'Boat1',
                    id: 1111,
                    description: 'txt1',
                    image: 'img/boat1.jpg',
                    singleUnitPrice: 11
                },
                {
                    name: 'Boat2',
                    id: 2222,
                    description: 'txt2',
                    image: 'img/boat2.jpg',
                    singleUnitPrice: 22
                },
            ]
        };

        let peoductFound = getProductById(products, 1111);

        it('Expect getProductById to return object', function() {
            expect(peoductFound).to.be.a('object');
        });

        it('Expect getProductById to have proper name', function() {
            expect(peoductFound.name).to.be.eq('Boat1');
        });

        it('Expect getProductById to have correct ID', function() {
            expect(peoductFound.id).to.be.eq(1111);
        });

        it('Expect getProductById to have description', function() {
            expect(peoductFound.description).to.be.eq('txt1');
        });

        it('Expect getProductById to have proper unit prise', function() {
            expect(peoductFound.singleUnitPrice).to.be.eq(11);
        });

        let peoductFound2 = getProductById(products, 2222);

        it('Expect getProductById to have correct ID on second search', function() {
            expect(peoductFound2.id).to.be.eq(2222);
        });

        it('Expect getDataToSent to be a function', function() {
            expect(getDataToSent).to.be.a('function');
        });

        let currentUser = new User("Unufri");
        currentUser.addToBasket(products.productsList[0]);
        currentUser.addToBasket(products.productsList[0]);
        currentUser.addToBasket(products.productsList[2]);

        let dataToSend = getDataToSent(currentUser, products);

        it('Assert getDataToSent return Array', function() {
            assert.equal(Array.isArray(dataToSend), true);
        });

        it('Expect getDataToSent to have proper quantity', function() {
            expect(dataToSend[0].quantity).to.be.eq(2);
            expect(dataToSend[1].quantity).to.be.eq(1);
        });

        /*
        it('Task 2', function() {
            assert.equal(2, 2);
        });

        it('Equal test', function() {
            const array = [1, 2, 3];
            expect(array).to.equal(array);
        });
        it('Eql test', function() {
            const array1 = [1, 2, 3];
            const array2 = [1, 2, 3];
            expect(array1).to.eql(array2);
        });
        */
    });

});

mocha.run();