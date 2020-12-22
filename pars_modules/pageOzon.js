import { waitings } from '../inout/waitings.js'
export async function pageOzon(selector, fromPage, $) {
    try {
        // console.log(($(selector.brand)).length)
        let selectorBrand = selector.brand + ':nth-child(' + ($(selector.brand)).length + ')' + ' > a > span'
            // console.log(selectorBrand)
        fromPage.brand = $(selectorBrand).text().replace(/\n/g, '').trim() || ''
            // console.log(fromPage.brand)
        fromPage.title = $(selector.title).text()
            // console.log(fromPage.title)
            // fromPage.articul = $(selector.articul).text().replace(/\n/g, '').replace('Код товара: ', '').trim()
            // console.log(fromPage.articul)
        fromPage.articul1 = $(selector.articul1).parent().parent().parent().find(selector.articul2).text().trim()
            // console.log("Артикул: ", fromPage.articul1)
        fromPage.razmer = $(selector.razmer1).parent().parent().parent().find(selector.razmer2).text().trim() || ''
            // console.log("Размер mm: ", fromPage.razmer)
        fromPage.razmerX = $(selector.razmerX1).parent().parent().parent().find(selector.razmerX2).text().trim() || ''
            // console.log("Размеры: ", fromPage.razmerX)
        fromPage.price1 = $(selector.price1).text().trim().replace(/[^\d]/g, '')
            // console.log("Цена1: ", fromPage.price1)
            // fromPage.price2 = $(selector.price2).text().trim().replace(/[^\d]/g, '')
            // console.log("Цена2: ", fromPage.price2)
            // let actions = $(selector.actions).text() || ''
            // let period = $(selector.period).text() || ''
            // fromPage.actions = period + ' ' + actions
            // console.log(fromPage.actions)
        fromPage.actions = $(selector.actions).text().replace(/\d/g, '') || ''
        console.log(fromPage.actions)
        fromPage.period = $(selector.period).text() || ''
        console.log(fromPage.period)
        fromPage.kolvo = $(selector.actions).text().replace(/[^\d]/g, '') || ''
        console.log(fromPage.kolvo)
    } catch (error) {
        throw error
    }
    return fromPage
}