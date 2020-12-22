const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
import { inout } from './inout/inout.js'
import { liner, nuller } from './pars_modules/rasPars.js'
import { getContent, dinaContent, getPage, getFetch } from './pars_modules/getContent.js';
import { lineSaver } from './pars_modules/saver.js'
import { waitings } from './inout/waitings.js';
const selector = inout.selector3;
const lines = [...new Set(inout.lines2)];
(async() => {

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1600,
        height: 900
    })
    await getPage(selector.startLink, page);
    await page.waitFor(2000);

    for (let i = 0; i < lines.length; i++) {
        try {

            let fromPage = inout.shema1;
            await nuller(fromPage);
            fromPage.productLink = lines[i].split(';')[lines[i].split(';').length - 3];
            var content = await getContent(fromPage.productLink, page);
            var $ = await cheerio.load(content);

            fromPage.catalog1Name = lines[i].split(';')[0];
            fromPage.catalog1Link = lines[i].split(';')[1];
            fromPage.catalog1Img = lines[i].split(';')[2];

            fromPage.catalog2Name = lines[i].split(';')[3];
            fromPage.catalog2Link = lines[i].split(';')[4];
            fromPage.catalog2Img = lines[i].split(';')[5];

            if (lines[i].split(';').length > 12) {
                fromPage.catalog3Name = lines[i].split(';')[6];
                fromPage.catalog3Link = lines[i].split(';')[7];
                fromPage.catalog3Img = lines[i].split(';')[8];
            }
            if (lines[i].split(';').length > 15) {
                fromPage.catalog4Name = lines[i].split(';')[9];
                fromPage.catalog4Link = lines[i].split(';')[10];
                fromPage.catalog4Img = lines[i].split(';')[11];
            }
            fromPage.productName = lines[i].split(';')[lines[i].split(';').length - 6];
            fromPage.productImg = lines[i].split(';')[lines[i].split(';').length - 2];
            fromPage.productPrice = lines[i].split(';')[lines[i].split(';').length - 5];
            fromPage.productMainData = lines[i].split(';')[lines[i].split(';').length - 4];

            fromPage.productCode = $(selector.productCode).text().replace(/\s{2,}/g, ' ').trim();
            
            $(selector.techTable).each((j, elem) => {
                let harName = $(elem).find(selector.harName).text().replace(/\n/g, '').replace(/;/g, ' ').replace(/\s+/g, ' ').trim()
                let harZnach = $(elem).find(selector.harZnach).text().replace(/\n/g, '').replace(/;/g, ' ').replace(/\s+/g, ' ').trim()
                fromPage.productTechData = fromPage.productTechData + harName + '--' + harZnach + '|';
            })

            // console.log(fromPage.catalog1Name + fromPage.catalog1Link +fromPage.catalog1Img);
            // console.log(fromPage.catalog2Name + fromPage.catalog2Link +fromPage.catalog2Img);
            // console.log(fromPage.catalog3Name + fromPage.catalog3Link +fromPage.catalog3Img);
            // console.log(fromPage.catalog4Name + fromPage.catalog4Link +fromPage.catalog4Img);
            // console.log(fromPage.productName + fromPage.productLink + fromPage.productImg);
            // console.log(fromPage.productPrice + fromPage.productMainData);
            // console.log(fromPage.productCode + fromPage.productDescript);
            // console.log(fromPage.productTechData);

            if (fromPage.catalog3Name == '') {
                delete fromPage.catalog3Name;
                delete fromPage.catalog3Link;
                delete fromPage.catalog3Img;
                delete fromPage.catalog4Name;
                delete fromPage.catalog4Link;
                delete fromPage.catalog4Img;
            } else if (fromPage.catalog4Name == '') {
                delete fromPage.catalog4Name;
                delete fromPage.catalog4Link;
                delete fromPage.catalog4Img;
            }

            let line = await liner(fromPage, ';')
            await lineSaver(line, inout.outputFile3)
            //console.log(i);
            //console.log('----------------------------')

        } catch(e) {
            console.log(e)
            await lineSaver(lines[index], inout.outputFailed3)
        }
    }
})()