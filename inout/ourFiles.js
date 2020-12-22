const fs = require('fs');
var ourFiles = {
    inputFile1: './output/out_goods1.csv',
    inputFile2: './output/out_goods2.csv',
    outputFile1: './output/out_goods1.csv',
    outputFile2: './output/out_goods2.csv',
    outputFile3: './output/out_goods3.csv',
    outputFailed1: './output/fail_goods1.csv',
    outputFailed2: './output/fail_goods2.csv',
    outputFailed3: './output/fail_goods3.csv',
    fileStarter: './input/starter.csv',
    lines1: [],
    lines2: [],
    starter: 0
};
ourFiles.lines1 = fs.readFileSync(ourFiles.inputFile1).toString().split('\n').filter(line => !!line);
ourFiles.lines2 = fs.readFileSync(ourFiles.inputFile2).toString().split('\n').filter(line => !!line);
try {
    // ourFiles.starter = +(fs.readFileSync(ourFiles.fileStarter).toString().split('\n')[0])
} catch (error) {

}
module.exports = ourFiles