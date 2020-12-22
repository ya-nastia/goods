import puppeteer from 'puppeteer'
export const launchOpts = {
    // headless: false,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1366x768'
    ]
};
export const pageOpts = {
    waitUntil: 'load',
    timeout: 0
};
export class PuppAsync {
    constructor() {
        this.browser = null
        this.page = null
    }
    async initBrowser() {
        this.browser = await puppeteer.launch(launchOpts)
        this.page = await this.browser.newPage()
    }
    closeBrowser() {
        this.browser.close()
    }
    async getPage(url) {
        if (!this.browser) {
            await this.initBrowser()
        }
        try {
            await this.page.goto(url, pageOpts)
            await this.page.waitFor(30000)
            const content = await this.page.content()
            return content
        } catch (error) {
            // throw error
            console.log('ошибка пупитера')
        }
    }
}