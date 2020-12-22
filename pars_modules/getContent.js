import { waitings } from '../inout/waitings.js'
import { scroller } from '../pars_modules/scroller.js'
const fetch = require('node-fetch');
export async function dinaContent(link, page) {
    try {
        await page.goto(link, { waitUntil: 'load', timeout: 0 });
        await page.waitFor(waitings.pageLoad)
        await scroller(page)
        await page.waitFor(waitings.dinaContent)
    } catch (error) {
        await page.waitFor(waitings.error)
    }
    const content = await page.content()
    return content
}
export async function getContent(link, page) {
    try {
        await page.goto(link, { waitUntil: 'load', timeout: 0 });
        await page.waitFor(waitings.pageLoad)
    } catch (error) {
        await page.waitFor(waitings.error)
    }
    const content = await page.content()
    return content
}
export async function getPage(link, page) {
    try {
        await page.goto(link, { waitUntil: 'load', timeout: 0 });
        await page.waitFor(waitings.pageLoad)
    } catch (error) {
        await page.waitFor(waitings.error)
    }
    return
}
export async function getFetch(link) {
    try {
        let response = await fetch(link, {
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'cache-control': 'no-cache',
                'dnt': '1',
                'pragma': 'no-cache',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'

            }
        });
        if (response.ok) {
            return response.text()
        } else {
            console.log("Ошибка HTTP: " + response.status);
        }
    } catch (error) {
        throw error
    }
}