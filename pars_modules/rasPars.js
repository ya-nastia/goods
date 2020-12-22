export async function eachIterate(selector, line, spliter, $) {
    $(selector).forEach(el => {
        try {
            line = line + $(el).text().replace(/;/g, ' ') + spliter
        } catch (error) {}
    })
    return line
}
export async function forIterate(selector, line, spliter = '', $, minus = 0, start = 0) {
    const arr = $(selector)
    for (let index = start; index < arr.length - minus; index++) {
        try {
            line = line + $(arr[index]).text().replace(/;/g, ' ') + spliter
        } catch (error) {}
    }
    return line
}
export async function replacer(line, forDel, count) {

}
export function liner(obj, spliter) {
    let line = ''
    for (const key in obj) {
        line = line + obj[key] + spliter
    }
    return line
}

export async function replaceGlue(line) {
    let b = line.match(/[a-z][A-Z]/g)
    for (let index = 0; index < b.length; index++) {
        line = line.replace(/[a-z][A-Z]/g, b[index][0] + ' ' + b[index][1])
    }
    let c = line.match(/\d[A-Z]/g)
    for (let index = 0; index < c.length; index++) {
        line = line.replace(/\d[A-Z]/g, c[index][0] + ' ' + c[index][1])
    }
    return line
}
export function nuller(obj) {
    for (const key in obj) {
        obj[key] = ''
    }
    return obj
}