const puppeteer = require('puppeteer');

(async()=>{
    const str = '-x Trailer Dune Español';
    console.log(str.slice(2));
    /*const browser = await puppeteer.launch({headless: false});
    const page =  await browser.newPage();

    await page.goto('https://www.youtube.com');
    await page.waitForSelector('ytd-button-renderer.ytd-consent-bump-v2-lightbox:nth-child(2) > a:nth-child(1) > tp-yt-paper-button:nth-child(1)', {visible: true} );
    await page.click('ytd-button-renderer.ytd-consent-bump-v2-lightbox:nth-child(2) > a:nth-child(1) > tp-yt-paper-button:nth-child(1)');
    await page.waitForSelector('#search-input',{visible: true});
    await page.click('#search-input');
    await page.waitForSelector('input.ytd-searchbox',{visible: true}); 
    await page.type('input.ytd-searchbox','Trailer Dune Español');
    await page.waitForSelector('#search-icon-legacy',{visible: true});
    await page.click('#search-icon-legacy');
    await page.waitForSelector('ytd-video-renderer.ytd-item-section-renderer:nth-child(1) > div:nth-child(1)');
    const enlace = await page.evaluate(() =>{
        const element = document.querySelector('ytd-video-renderer.ytd-item-section-renderer:nth-child(1) > div:nth-child(1) ytd-thumbnail a');
        const link = element.href;
        return link;
    });
    console.log(enlace);
    await page.goto(enlace);
    
    //await browser.close();*/
})();