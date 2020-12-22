const puppeteer = require('puppeteer')
const inout = require('../inout/inout.js')
const fs = require('fs');
var waitConnect = 10000,
    waitRecieve = 30000,
    startPort = inout.startPort,
    finishPort = inout.finishPort
var browser,
    page,
    content
async function getContent(url, newPort) {
    try {
        browser = await puppeteer.launch({
            headless: false,
            args: ['--proxy-server=socks5://127.0.0.1:' + newPort]
        });
        page = await browser.newPage();
        await page.waitFor(waitConnect)
        await page.goto(url, { waitUntil: 'load', timeout: 0 });
        await page.waitFor(waitRecieve)
        content = await page.content()
        browser.close()
        return content
    } catch (error) {
        try {
            fs.appendFileSync(inout.outputFailed2, newPort + '\n');
            try {
                browser.close()
            } catch (error) {
                console.log(error)
            }
            if (newPort >= finishPort - 1) {
                newPort = startPort
            } else {
                newPort++
            }
            return () => getContent(url, newPort)
        } catch (error) {
            console.log(error)
            try {
                browser.close()
            } catch (error) {
                console.log(error)
            }
            return () => getContent(url, newPort)
        }
    }
}
module.exports = getContent