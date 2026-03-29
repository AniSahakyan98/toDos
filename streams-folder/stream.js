const path = require('path')
const fs = require('fs')


const readStream = fs.createReadStream(path.join(__dirname,'../docs/text1'),{encoding: 'utf8'})
const writeStream = fs.createWriteStream(path.join(__dirname,'../docs/text2'))


// readStream.on('data',(chunk) => {
//   //console.log('Chunk received')
//   //console.log(chunk)
//   writeStream.write(chunk)

// })

// readStream.on('end',() => {
//   console.log('finished reading file')
//   writeStream.end()
// })

// readStream.on('error',(err) => {
//   console.error('error reading file:',err)
// })

// writeStream.on('error',(err) => {
//   console.error('error writing file',err)
// })


readStream.on('error', (err) => console.error('read error',err))
writeStream.on('error',(err) => console.error('write error', err))
writeStream.on('finish',() => console.log('writing finished'))

readStream.pipe(writeStream)
