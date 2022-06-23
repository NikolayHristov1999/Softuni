const library = require('./library')
const {expect} = require('chai');

describe('library', () => {
    describe('calculate price of Book', () => {
        it("works with valid input", function() {
            expect(library.calcPriceOfBook('Kniga', 2020)).to.equal('Price of Kniga is 20.00');
        });
        it("works with discount before or equal 1980", function() {
            expect(library.calcPriceOfBook('Kniga', 1980)).to.equal('Price of Kniga is 10.00');
            expect(library.calcPriceOfBook('Kniga', 200)).to.equal('Price of Kniga is 10.00');
        });

        it("throws an error with wrong input", function() {
            expect(() =>library.calcPriceOfBook(1980, 1980)).to.throw('Invalid input');
            expect(() =>library.calcPriceOfBook('Kniga', '200')).to.throw('Invalid input');
        });

    });
    describe('find Book', () => {
        it("The book is included in the arr", function() {
            expect(library.findBook(["Troy", "Life Style", "Torronto"], 'Troy')).to.equal('We found the book you want.')
        });
        it("The book is not included in the arr", function() {
            expect(library.findBook(["Life Style", "Torronto"], 'Troy')).to.equal('The book you are looking for is not here!')
            expect(library.findBook(["Life Style", "Torronto"], '')).to.equal('The book you are looking for is not here!')
        });
        it("Empty arr should throw an err", function() {
            expect(() => library.findBook([], 'Troy')).to.throw('No books currently available');
            expect(() => library.findBook([], '')).to.throw('No books currently available');
        });
    });
    describe('arrange the books', () => {
        it("The space is enough for the books", function() {
            expect(library.arrangeTheBooks(20)).to.equal('Great job, the books are arranged.')
            expect(library.arrangeTheBooks(0)).to.equal('Great job, the books are arranged.')
            expect(library.arrangeTheBooks(40)).to.equal('Great job, the books are arranged.')
        });
        it("Theere is not enough space for the books", function() {
            expect(library.arrangeTheBooks(41)).to.equal('Insufficient space, more shelves need to be purchased.');
        });
        it("Invalid input should throw an error", function() {
            expect(() => library.arrangeTheBooks('40')).to.throw();
            expect(() => library.arrangeTheBooks([])).to.throw();
            expect(() => library.arrangeTheBooks(-5)).to.throw();
        });
    });
    
})