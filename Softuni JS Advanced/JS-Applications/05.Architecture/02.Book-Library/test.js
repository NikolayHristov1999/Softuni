const { chromium } = require("playwright-chromium");
const { chai, expect } = require('chai');

const mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0":{
        "author":"J.K.Rowling",
        "title":"Harry Potter and the Philosopher's Stone"
    },
    "d953e5fb-a585-4d6b-92d3-ee90697398a1":{
        "author":"Svetlin Nakov",
        "title":"C# Fundamentals"
    }
}

const mockHarryPotterData = {"author":"J.K.Rowling","title":"Harry Potter and the Philosopher's Stone"}

function json(data){
    return {
        status: 200,
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    };
}

describe('Tests', async function () {
    this.timeout(5000);

    let page, browser;

    before(async () => {
        //browser = await chromium.launch({headless:false, slowMo: 500});
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close()
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    it('load and display books', async () => {
        await page.route('**/jsonstore/collections/books*', (route, request) => {
            route.fulfill(json(mockData));
        })
        await page.goto('http://localhost:5500');

        await page.click('text=Load All Books');

        await page.waitForSelector('text=Harry Potter');

        const rows = await page.$$eval('tr', (rows) => rows.map(r => r.textContent.trim()))

        expect(rows[1]).to.contains('Harry Potter');
        expect(rows[1]).to.contains('Rowling');
        expect(rows[2]).to.contains('C# Fundamentals');
        expect(rows[2]).to.contains('Svetlin Nakov');
    })

    it('adding book correctly', async () => {
        await page.goto('http://localhost:5500');

        await page.fill('form#createForm >> input[name="title"]', 'Title');
        await page.fill('form#createForm >> input[name="author"]', 'Author');

        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'POST'),
            page.click('form#createForm >> text=Submit')
        ]);
        
        const data = JSON.parse(request.postData());
        expect(data.title).to.equal('Title');
        expect(data.author).to.equal('Author');

    })

    it('editing book works', async () => {
        await page.route('**/jsonstore/collections/books', (route, request) => {
            route.fulfill(json(mockData));
        });
        
        await page.route('**/jsonstore/collections/books/*', (route, request) => {
            route.fulfill(json(mockHarryPotterData));
        });

        await page.goto('http://localhost:5500');

        await page.click('text=Load All Books');
        await page.waitForSelector('text=Harry Potter');

        await Promise.all([
            page.waitForRequest(request => request.method() == 'GET'),
            page.click('text=Edit'),
        ]);

        const title = await page.inputValue('#editForm >> input[name="title"]');
        const author = await page.inputValue('#editForm >> input[name="author"]');

        expect(title).to.equal("Harry Potter and the Philosopher's Stone");
        expect(author).to.equal("J.K.Rowling");

        await page.fill('#editForm >> input[name="title"]', 'Title');
        await page.fill('#editForm >> input[name="author"]', 'Author');

        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'PUT'),
            page.click('form#editForm >> text=Save')
        ]);

        const data = JSON.parse(request.postData());
        expect(data.title).to.equal('Title');
        expect(data.author).to.equal('Author');
    })
})