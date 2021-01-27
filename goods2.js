const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
import { inout } from './inout/inout.js'
import { liner } from './pars_modules/rasPars.js'
import { getContent, dinaContent, getPage } from './pars_modules/getContent.js';
import { lineSaver } from './pars_modules/saver.js'
import { waitings } from './inout/waitings.js';
import { find } from 'async';
const selector = inout.selector2;
const lines = [...new Set(inout.lines1)];
(async() => {

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1600,
        height: 900
    })

    var content = await getContent(selector.startLink, page);
    var $ = await cheerio.load(content);

    for (let i = 0; i < lines.length; i++) {
    //for (let i = 157; i < 159; i++) {
        try {

            var startPage = lines[i].split(';')[lines[i].split(';').length - 3];
            //console.log('LINK: ' + startPage);
            content = await getContent(startPage, page);
            $ = await cheerio.load(content);
            
            if ($(selector.pages).length > 0) {
                var amountOfPages = $(selector.pages).eq(-2).text().replace(/\n/g, '').trim();
                var sel2 = false;
            } else if ($(selector.pages2).length > 0) {
                var amountOfPages = $(selector.pages2).eq(-2).text().replace(/\n/g, '').trim();
                var sel2 = true;
            } else {
                var amountOfPages = 1;
            }
            
            //console.log('pages:' + amountOfPages);

            for (let j = 1; j <= amountOfPages; j++) {
            //for (let j = 1; j <= 2; j++) {

                if (amountOfPages != 1 && j != 1) {
                    var pageLink = startPage + `page-${j}/`;
                    //console.log('PAGELINK: ' + pageLink);
                    content = await getContent(pageLink, page);
                    $ = await cheerio.load(content);
                } else {
                    var pageLink = startPage;
                }

                $(selector.plashka1).each((index, elem) => {
                    if (sel2 == false) {
                        var link = selector.domen + $(elem).find(selector.link).attr('href');
                        var img = $(elem).find(selector.img).attr('content');
                        var name = $(elem).find(selector.title).text().replace(/\n/g, '').trim();
                        var price = $(elem).find(selector.price).text().replace(/\n/g, '').trim();
                        var details = $(elem).find(selector.description).text().replace(/\s{2,}/g, ' ').trim();
                    } else {
                        var link = selector.domen + $(elem).find(selector.link2).attr('href');
                        var img = $(elem).find(selector.img2).attr('content');
                        var name = $(elem).find(selector.title2).text().replace(/\n/g, '').trim();
                        var price = $(elem).find(selector.price2).text().replace(/\n/g, '').trim();
                        var details = $(elem).find(selector.description2).text().replace(/\s{2,}/g, ' ').trim();
                    }
                    if (price.length < 1) {
                        price = 'Нет в наличии';
                    }
                    var catalog = lines[i] + name + ';' + price + ';' + details + ';' + link + ';' + img + ';';
                    //console.log(catalog);
                    //console.log('Это товар со страницы ' + pageLink + ':\n' + catalog);
                    lineSaver(catalog, inout.outputFile2);
                })
            } 
            console.log('Парсинг окончен')
            await browser.close();
        } catch(e) {
            console.log(e);
        }
    }
})()