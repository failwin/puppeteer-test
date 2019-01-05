const phantom = require('phantom');
const { url, token } = require('./constants');

(async function() {
    console.log('start');
    console.time('end');
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.property('viewportSize', {
        width: 761,
        height: 1,
    });
    await page.property('paperSize', {
        format: 'a4',
        orientation : 'portrait',
        margin: 10 + 'mm'
    });
    await page.property('customHeaders', {
        'X-Must-Store': 'yes',
        'Authorization': 'Bearer ' + token,
    });
    await page.open(url);
    await new Promise((resolve) => {
        setTimeout(resolve, 4000);
    });
    await page.render('test2.pdf');
    await instance.exit();

    await new Promise((resolve) => {
        console.timeEnd('end');
        resolve();
    });
}());
