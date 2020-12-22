import { waitings } from '../inout/waitings.js'
import { sleep } from './sleep.js'
export async function scroller(page) {
    await page.evaluate(() => {
        new Promise((resolve, reject) => {
            let totalHeight = 0;
            let distance = 300;
            let scrolller = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scroll(0, totalHeight);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(scrolller);
                    resolve()
                }
            }, 100);
        })
    });
    sleep(waitings.scroller)

}