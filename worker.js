const {parentPort} = require('worker_threads')


parentPort.on('message',({start,end}) =>{
    const t1 = Date.now()

    let sum = 0

    for (let i = start; i < end ; i++) {
     sum += Math.sqrt(i) * Math.sin(i) * Math.tan(i);
    }

    const t2 = Date.now()

    parentPort.postMessage({
        result: sum,
        durationMs : t2-t1

    })
})

 
//how a heavy loop affects the child process CPU”

// setInterval(()=> {
//     for (let i = 0; i < 1e8; i++) {
//        Math.sqrt(i);
//     }
// })
  