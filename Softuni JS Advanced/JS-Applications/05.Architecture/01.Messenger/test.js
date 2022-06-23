const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const mockData = {
    "-LxHVtajG3N1sU714pVj": {
        "author": "Spami",
        "content": "Hello, are you there?"
    },
    "-LxIDxC-GotWtf4eHwV8": {
        "author": "Garry",
        "content": "Yep, whats up :?"
    },
    "-LxIDxPfhsNipDrOQ5g_": {
        "author": "Spami",
        "content": "How are you? Long time no see? :)"
    },
    "-LxIE-dM_msaz1O9MouM": {
        "author": "George",
        "content": "Hello, guys! :))"
    },
    "-LxLgX_nOIiuvbwmxt8w": {
        "author": "Spami",
        "content": "Hello, George nice to see you! :)))"
    },
};

function json(data) {
    return {
        status: 200,
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    };
}

describe('Messenger tests', function () {
    this.thimeout(5000);

    let browser, page;
    before(async () => {
        //browser = await chromium.launch({headless:false, slowMo: 500});
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage()
    });

    afterEach(async () => {
        await page.close();
    });

    it('Refresh should display all messages', async () => {
        
        await page.goto('http://localhost:5500');
        await page.screenshot({path:'page.png'});
        await page.route('**/jsonstore/messenger*', (route, request) => {
            route.fulfill(json(mockData));
        });
        await Promise.all([
            page.waitForRequest(request => request.method() == 'GET'),
            page.click('text=Refresh')
        ]);

        const messages = await page.inputValue('#messages');
        expect(messages).to.contains(`Spami: Hello, are you there?\nGarry: Yep, whats up :?\nSpami: How are you? Long time no see? :)\nGeorge: Hello, guys! :))\nSpami: Hello, George nice to see you! :)))`)
    });

    it('Sending a new message should send post request with the right parameters', async () => {
        await page.goto('http://localhost:5500');

        await page.fill('#author', 'Nikolay');
        await page.fill('#content', 'Zdraveite');

        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'POST'),
            page.click('#submit')
        ]);

        const json = JSON.parse(request.postData());
        expect(json.author).to.equal(`Nikolay`);
        expect(json.content).to.equal('Zdraveite');
    })
})