'use strict';

mocha.setup('bdd');

//let chai = require('chai');
const { expect, assert } = chai;

describe('Testing', function() {
    describe('Testing', function() {

        it('Test 1', function() {
            expect(getProductById).to.be.a('function');
            //expect(getProductById).to.eq(2);
        });
        it('Test 1', function() {
            assert.equal(2, 2);
        });
    });
});

mocha.run();