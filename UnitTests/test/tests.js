//mocha.setup('bdd');

let chai = require('chai');
const {expect, assert} = chai;

describe('Testing', function(){
    it('Test 1', function(){
        chai.expect(2).to.eq(2);
    });
    it('Test 1', function(){
        chai.assert.equal(2, 2);
    });

});

//mocha.run();
