const {parentPort} = require('worker_threads')


parentPort.on('message',({start,end}) =>{
    const startCpu = process.cpuUsage();

    let sum = 0

    for (let i = start *2e8; i < end * 2e8 + 5e8; i++) {
     sum += Math.sqrt(i) * Math.sin(i) * Math.tan(i);
    }
    const diff = process.cpuUsage(startCpu);

    parentPort.postMessage({
        result: sum,
        cpuUserMicroseconds: diff.user, // CPU time in JS
        cpuSystemMicroseconds: diff.system // OS overhead

    })
})

 
//how a heavy loop affects the child process CPU”

// setInterval(()=> {
//     for (let i = 0; i < 1e8; i++) {
//        Math.sqrt(i);
//     }
// })
  