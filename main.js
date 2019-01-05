const puppeteer = require('puppeteer');
const { url, token } = require('./constants');

(async () => {
    console.log('start');
    console.time('end');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 761,
        height: 1,
    });
    await page.setExtraHTTPHeaders({
        'X-Must-Store': 'yes',
        'Authorization': 'Bearer ' + token
    });
    await page.goto(url);
    await new Promise((resolve) => {
        setTimeout(resolve, 4000);
    });
    // await page.waitFor(4000);
    await page.pdf({
        path: 'test.pdf',
        format: 'a4',
        margin: {
            top: '10px',
            bottom: '10px',
            right: '10px',
            left: '10px',
        }, });
    await browser.close();

    await new Promise((resolve) => {
        console.timeEnd('end');
        resolve();
    });
})();
