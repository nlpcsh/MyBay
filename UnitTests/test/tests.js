'use strict';

mocha.setup('bdd');

//let chai = require('chai');
const { expect, assert } = chai;

// dummy toaster messages
let toastr = {
    'info': function(message) {
        return message;
    },
};

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
            expect(peoductFound).to.has.property('name').equal('Boat1');
        });

        it('Expect getProductById to have correct ID', function() {
            expect(peoductFound).to.has.property('id').equal(1111);
        });

        it('Expect getProductById to have description', function() {
            expect(peoductFound).to.has.property('description').equal('txt1');
        });

        it('Expect getProductById to have proper unit prise', function() {
            expect(peoductFound).to.has.property('singleUnitPrice').equal(11);
        });

        let peoductFound2 = getProductById(products, 2222);

        it('Expect getProductById to have correct ID on second search', function() {
            expect(peoductFound2).to.has.property('id').equal(2222);
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
            assert(Array.isArray(dataToSend));
        });

        it('Expect getDataToSent return Array with proper length', function() {
            expect(dataToSend).to.have.length(2);
        });

        it('Expect getDataToSent array objects to have correct quantity', function() {
            expect(dataToSend[0]).to.has.property('quantity').equal(2);
            expect(dataToSend[1]).to.has.property('quantity').equal(1);
        });

        it('Expect getDataToSent array objects to have proper name', function() {
            expect(dataToSend[0]).to.has.property('name').equal('Boat3');
            expect(dataToSend[1]).to.has.property('name').equal('Boat2');
        });

        it('Expect getDataToSent array objects to have proper singleUnitPrice', function() {
            expect(dataToSend[0]).to.has.property('singleUnitPrice').equal(33);
            expect(dataToSend[1]).to.has.property('singleUnitPrice').equal(22);
        });

        it('Expect getDataToSent array objects to have proper Total Price', function() {
            expect(dataToSend[0]).to.has.property('totalPrice').equal(88);
            expect(dataToSend[1]).to.has.property('totalPrice').equal(88);
        });
        describe('Testing Objects', function() {
            describe('Testing Product', function() {
                it('Expect Product to be an object', function() {
                    expect(Product).to.be.a('function');
                });
                let justProduct = new Product('Boat3', 3333, 'txt3', 33, 'img/boat3.jpg');

                it('Expect Product has name', function() {
                    expect(justProduct).to.has.property('name').equal('Boat3');
                });
                it('Expect Product has ID', function() {
                    expect(justProduct).to.has.property('id').equal(3333);
                });
                it('Expect Product has description', function() {
                    expect(justProduct).to.has.property('description').equal('txt3');
                });
                it('Expect Product has image', function() {
                    expect(justProduct).to.has.property('image').equal('img/boat3.jpg');
                });
                it('Expect Product has singleUnitPrice', function() {
                    expect(justProduct).to.has.property('singleUnitPrice').equal(33);
                });
            });
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