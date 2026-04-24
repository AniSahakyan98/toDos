const {parentPort} = require('worker_threads')

parentPort.on('message',({start,end}) =>{
    let sum = 0

    for(let i = start; i < end; i++){
        sum+= i
    }

parentPort.postMessage(sum)
})




//how a heavy loop affects the child process CPU”

// setInterval(()=> {
//     for (let i = 0; i < 1e8; i++) {
//        Math.sqrt(i);
//     }
// })
  