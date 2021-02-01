//  === Requirements ===
var file_stream = require('fs')
var file_path = require('path')
 
//  === Create Stream ===
var log_helper = file_stream.createWriteStream(file_path.join(__dirname, 'access.log'), { flags: 'a' })

//  === Exports ===
module.exports = log_helper