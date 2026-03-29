const path = require('path')
const fs = require('fs')

// const name = process.argv[2]
// console.log('hello', name)
// console.log(process.env.NODE_ENV);




// const readStream = fs.createReadStream(path.join(__dirname,'../docs/text1'), {encoding: 'utf8' })
// const writeStream = fs.createWriteStream(path.join(__dirname,'../docs/text2'))

const readStream = fs.createReadStream(path.resolve('streams-folder','../docs/text1'), {encoding: 'utf8' })
const writeStream = fs.createWriteStream(path.resolve('streams-folder','../docs/text2'))


// const readStream = fs.createReadStream('../docs/text1')
// const writeStream = fs.createWriteStream('../docs/text2')

readStream.pipe(writeStream)

