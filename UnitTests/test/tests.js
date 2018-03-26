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

        it('Expect getDataToSent return Array', function() {
            expect(dataToSend).to.be.instanceof(Array);
        });

        it('Expect getDataToSent return Array with proper length', function() {
            expect(dataToSend).to.have.length(3);
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
            expect(dataToSend[2]).to.has.property('totalPrice').equal(88);
        });
        describe('Testing Objects', function() {
            describe('Testing Product', function() {
                it('Expect Product to be a class', function() {
                    expect(Product).to.be.a('function');
                });
                it('Expect Product to throw if there are no 5 arguments', function() {
                    expect(() => { new Product() }).to.throw('Product must have 5 arguments');
                });
                it('Expect Product to throw if the price is not valid', function() {
                    expect(() => { new Product('Boat3', 3333, 'txt3', 'abc', 'img/boat3.jpg') }).to.throw('Product price must be a number');
                });
                it('Expect Product to throw if the price is negative number', function() {
                    expect(() => { new Product('Boat3', 3333, 'txt3', -33, 'img/boat3.jpg') }).to.throw('Product price must be a positive number');
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
            describe('Testing User', function() {
                it('Expect User to be a class', function() {
                    expect(User).to.be.a('function');
                });
                it('Expect User to throw if there is no name specified', function() {
                    expect(() => { new User() }).to.throw('User name must be specified!');
                });
                it('Expect User to throw if name is not string', function() {
                    expect(() => { new User(5) }).to.throw('User name must be specified!');
                });

                let newUser = new User('Unufri');
                it('Expect User to has name', function() {
                    expect(newUser).to.has.property('uName').equal('Unufri');
                });
                it('Expect User to has property "shoppingBasket" which is "Array"', function() {
                    expect(newUser).to.has.property('shoppingBasket').that.is.an.instanceof(Array);
                });
                it('Expect User to has property "addToBasket" which is "function"', function() {
                    expect(newUser).to.has.property('addToBasket').that.is.a('function');
                });
                it('Expect User to has property "removeFromBasket" which is "function"', function() {
                    expect(newUser).to.has.property('removeFromBasket').that.is.a('function');
                });
                it('Expect User to has property "removeFromBasket" which is "function"', function() {
                    expect(newUser).to.has.property('removeFromBasket').that.is.a('function');
                });
                it('Expect User.addToBasket() to throw if there is no product specified', function() {
                    expect(() => { newUser.addToBasket() }).to.throw('No product is specified to add!');
                });
                it('Expect User.addToBasket(5) to throw if there is no valid product specified', function() {
                    expect(() => { newUser.addToBasket(5); }).to.throw('The argument is not a valid Product!');
                });
                it('Expect User.addToBasket(product) to add a product in the shoppingBasket', function() {
                    newUser.addToBasket(products.productsList[0]);
                    expect(newUser.shoppingBasket[0]).to.has.property('name').equal('Boat3');
                    expect(newUser.shoppingBasket[0]).to.has.property('productId').equal(3333);
                    expect(newUser.shoppingBasket[0]).to.has.property('singleUnitPrice').equal(33);
                    expect(newUser.shoppingBasket[0]).to.has.property('quantity').equal(1);
                });
                it('Expect User.addToBasket(product) to change quantity of the same product', function() {
                    newUser.addToBasket(products.productsList[0]);
                    expect(newUser.shoppingBasket[0]).to.has.property('name').equal('Boat3');
                    expect(newUser.shoppingBasket[0]).to.has.property('productId').equal(3333);
                    expect(newUser.shoppingBasket[0]).to.has.property('singleUnitPrice').equal(33);
                    expect(newUser.shoppingBasket[0]).to.has.property('quantity').equal(2);
                });
                it('Expect User.addToBasket(product2) to add new product2 and keep the previos one', function() {
                    newUser.addToBasket(products.productsList[1]);

                    expect(newUser.shoppingBasket[1]).to.has.property('name').equal('Boat1');
                    expect(newUser.shoppingBasket[1]).to.has.property('productId').equal(1111);
                    expect(newUser.shoppingBasket[1]).to.has.property('singleUnitPrice').equal(11);
                    expect(newUser.shoppingBasket[1]).to.has.property('quantity').equal(1);

                    expect(newUser.shoppingBasket[0]).to.has.property('name').equal('Boat3');
                    expect(newUser.shoppingBasket[0]).to.has.property('productId').equal(3333);
                    expect(newUser.shoppingBasket[0]).to.has.property('singleUnitPrice').equal(33);
                    expect(newUser.shoppingBasket[0]).to.has.property('quantity').equal(2);
                });

                it('Expect User.removeFromBasket() to throw if there is no valid product ID specified', function() {
                    expect(() => { newUser.removeFromBasket(); }).to.throw('No product to remove ID specified!');
                });
                it('Expect User.removeFromBasket(productId) to throw if there is no valid product ID number specified', function() {
                    expect(() => { newUser.removeFromBasket('abc'); }).to.throw('The product ID is not a number!');
                });
                it('Expect User.removeFromBasket(productId) to throw if there is no such product', function() {
                    expect(() => { newUser.removeFromBasket(111111); }).to.throw('No Such Product in the basket!');
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