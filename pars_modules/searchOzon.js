// import { waitings } from '../inout/waitings.js'
export async function searchOzon(selector, lines, $) {
    try {
        // await page.waitForSelector(selector.plashka, { timeout: waitings.selector })
        ($(selector.plashka)).each((i, el) => {
            const $el = $(el).find(selector.link)
            const link = selector.domen + $el.attr('href')
            if (link.includes('/')) {
                lines.push(link)
            }
        })
    } catch (error) {
        throw error
    }
    return lines
}