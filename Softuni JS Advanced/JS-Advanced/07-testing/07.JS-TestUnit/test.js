const {expect} = require('chai');
const {isOddOrEven, lookupChar, mathEnforcer} = require('./module');

describe('Test object with math function', () =>{
    describe('Test addFive function', () => {
        it('If given parameter is not num undefined should be returned', () => {
            expect(mathEnforcer.addFive('str')).to.be.undefined;
            expect(mathEnforcer.addFive([])).to.be.undefined;
            expect(mathEnforcer.addFive({})).to.be.undefined;
        });
        it('If the input is valid, 5 should be added to it', () => {
            expect(mathEnforcer.addFive(1)).to.be.equal(6);
            expect(mathEnforcer.addFive(0.1)).to.be.closeTo(5.1,0.01);
            expect(mathEnforcer.addFive(-3)).to.be.equal(2);
        });
    });
    describe('Test subtractTen', () => {
        it('If given parameter is not num undefined should be returned', () => {
            expect(mathEnforcer.subtractTen('str')).to.be.undefined;
            expect(mathEnforcer.subtractTen([])).to.be.undefined;
            expect(mathEnforcer.subtractTen({})).to.be.undefined;
        });
        it('If the input is valid, 10 should be subtracted to it', () => {
            expect(mathEnforcer.subtractTen(1)).to.be.equal(-9);
            expect(mathEnforcer.subtractTen(0.1)).to.be.closeTo(-9.9,0.01);
            expect(mathEnforcer.subtractTen(-5)).to.be.equal(-15);
        });
    });
    describe('Test sum function with two parameters', () => {
        it('If a given parameter is not a number, undefined should be returned', () => {
            expect(mathEnforcer.sum('str', 0)).to.be.undefined;
            expect(mathEnforcer.sum(0, [])).to.be.undefined;
            expect(mathEnforcer.sum({}, {})).to.be.undefined;
        });
        it('If the input is valid, 10 should be subtracted to it', () => {
            expect(mathEnforcer.sum(1,1)).to.be.equal(2);
            expect(mathEnforcer.sum(0.1, 5)).to.be.closeTo(5.1,0.01);
            expect(mathEnforcer.sum(-3, -3)).to.be.equal(-6);
            expect(mathEnforcer.sum(-3, 1)).to.be.equal(-2);
            expect(mathEnforcer.sum(1, -1)).to.be.equal(0);
        });
    })

})

// describe('Test for character at given Index(lookupChar)', () =>{
//     it("Test where undefined should be returned", () =>{
//         expect(lookupChar([], 0)).to.be.undefined;
//         expect(lookupChar({}, 0)).to.be.undefined;
//         expect(lookupChar(2, 0)).to.be.undefined;
//         expect(lookupChar('str', {})).to.be.undefined;
//         expect(lookupChar('str', [])).to.be.undefined;
//         expect(lookupChar('str', 'string')).to.be.undefined;
//         expect(lookupChar(1, 'string')).to.be.undefined;
//         expect(lookupChar('', 0.1)).to.be.undefined;
//     });
//     it("Test for incorrect index", () =>{
//         expect(lookupChar('str', -1)).to.be.equal('Incorrect index');
//         expect(lookupChar('str', 3)).to.be.equal('Incorrect index');
//         expect(lookupChar('', 0)).to.be.equal('Incorrect index');
//     });
//     it("Test for valid data and it should return the character", () =>{
//         expect(lookupChar('str', 0)).to.be.equal('s');
//         expect(lookupChar('str', 2)).to.be.equal('r');
//         expect(lookupChar('str', 1)).to.be.equal('t');
//     });
// })
// describe('testOddOrEven',() => {
//     it("Test if undefined is returned", () =>{
//         expect(isOddOrEven([])).to.be.undefined;
//         expect(isOddOrEven({})).to.be.undefined;
//         expect(isOddOrEven(1)).to.be.undefined;
//     });
//     it("Test if odd is return", () =>{
//         expect(isOddOrEven("1")).to.be.equal("odd");
//         expect(isOddOrEven("123")).to.be.equal("odd");
//     });

//     it("Test if even is return", () =>{
//         expect(isOddOrEven("")).to.be.equal("even");
//         expect(isOddOrEven("12")).to.be.equal("even");
//     })
// })


