const fs = require('fs');
var starter = fs.readFileSync(ourFiles.inputFile1).toString().split('\n')[0]
module.exports = starter