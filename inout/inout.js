var shema = require('./shema.js');
var selector = require('./selector.js');
var ourFiles = require('./ourFiles.js');
var port = require('./port.js');
export const inout = {
//    const inout = {
    selector1: selector[0],
    selector2: selector[1],
    selector3: selector[2],
    selector4: selector[3],
    shema1: shema[0],
    shema2: shema[1],
    shema3: shema[2],
    shema4: shema[3],
    inputFile1: ourFiles.inputFile1,
    inputFile2: ourFiles.inputFile2,
    outputFile1: ourFiles.outputFile1,
    outputFile2: ourFiles.outputFile2,
    outputFile3: ourFiles.outputFile3,
    outputFailed1: ourFiles.outputFailed1,
    outputFailed2: ourFiles.outputFailed2,
    lines1: ourFiles.lines1,
    lines2: ourFiles.lines2,
    ports: port.ports,
    startPort: port.startPort,
    finishPort: port.finishPort,
    fileStarter: ourFiles.fileStarter,
    starter: ourFiles.starter
}