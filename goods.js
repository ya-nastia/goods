const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
import { inout } from './inout/inout.js'
import { liner } from './pars_modules/rasPars.js'
import { getContent, dinaContent, getPage } from './pars_modules/getContent.js';
import { lineSaver } from './pars_modules/saver.js'
import { waitings } from './inout/waitings.js';
import { find } from 'async';
const selector = inout.selector1;
(async() => {

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1600,
        height: 900
    })

    try {

        var content = await getContent(selector.startLink, page);
        var $ = await cheerio.load(content);

        var catalog1 = [];
        var catalog2 = [];
        var catalog3 = [];

        $(selector.catalogPlashka).each((index, elem) => {
            let link = selector.domen + $(elem).find(selector.catalogText1).attr('href');
            let name = $(elem).find(selector.catalogText1).attr('main_category_tile');
            let img = $(elem).find(selector.catalogImg1).attr('src');
            if (!$(elem).find(selector.skipItem).length > 0) {
                catalog1.push(name + ';' + link + ';' + img + ';');
            }
        })

        console.log('cat1:' + catalog1.length, catalog1);

        for (let i = 0; i < catalog1.length; i++) {

            console.log('Парсинг каталога ' + catalog1[i].split(';')[0] + '...');

            content = await getContent(catalog1[i].split(';')[1], page);
            $ = await cheerio.load(content);

            $(selector.catalogPlashka2).each((index, elem) => {
                let link = 'https:' + $(elem).find(selector.catalogText2).attr('href');
                let name = $(elem).find(selector.catalogText2).attr('title');
                let img = $(elem).find(selector.catalogImg2).attr('src');
                catalog2.push(catalog1[i] + name + ';' + link + ';' + img + ';');
            })
        }

        //console.log('cat2: ' + catalog2.length, catalog2);

        for (let i = 0; i < catalog2.length; i++) {

            content = await getContent(catalog2[i].split(';')[4], page);
            $ = await cheerio.load(content);

            if ($(selector.catalogPlashka2).length > 0) {

                console.log('Парсинг каталога ' + catalog2[i].split(';')[0] + '->' + catalog2[i].split(';')[3] + '...');

                $(selector.catalogPlashka2).each((index, elem) => {
                    let link = 'https:' + $(elem).find(selector.catalogText2).attr('href');
                    let name = $(elem).find(selector.catalogText2).attr('title');
                    let img = $(elem).find(selector.catalogImg2).attr('src');
                    catalog3.push(catalog2[i] + name + ';' + link + ';' + img + ';');
                })
            } else {
                catalog3.push(catalog2[i]);
                console.log('В каталоге ' + catalog2[i].split(';')[0] + '->' + catalog2[i].split(';')[3] + ' подкатологов нет!');
            }
        }

        //console.log(catalog3.length, catalog3);

        for (let i = 0; i < catalog3.length; i++) {

            content = await getContent(catalog3[i].split(';')[7], page);
            $ = await cheerio.load(content);

            if ($(selector.catalogPlashka2).length > 0) {

                console.log('Парсинг каталога ' + catalog3[i].split(';')[0] + '->' + catalog3[i].split(';')[3] + '->' + catalog3[i].split(';')[6]);

                $(selector.catalogPlashka2).each((index, elem) => {
                    let link = 'https:' + $(elem).find(selector.catalogText2).attr('href');
                    let name = $(elem).find(selector.catalogText2).attr('title');
                    let img = $(elem).find(selector.catalogImg2).attr('src');

                    let catalog = catalog3[i] + name + ';' + link + ';' + img + ';';
                    lineSaver(catalog, inout.outputFile1);
                })
            } else {
                let catalog = catalog3[i];
                lineSaver(catalog, inout.outputFile1);
                console.log('В каталоге ' + catalog3[i].split(';')[0] + '->' + catalog3[i].split(';')[3] + '->' + catalog3[i].split(';')[6] + ' подкатологов нет!');
            }
        }
        console.log('Парсинг окончен')
        await browser.close();
    } catch(e) {
        console.log(e);
    }
})()