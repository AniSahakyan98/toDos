 
 
process.on('message',(msg) => {
    console.log('child got:',msg)
    let sum = 5+5
    process.send(`result is ${sum}`) 
})