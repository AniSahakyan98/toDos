const fs = require('fs')

const readStream = fs.createReadStream('./docs/text1', {encoding: 'utf8' })
const writeStream = fs.createWriteStream('./docs/text2')

readStream.pipe(writeStream)