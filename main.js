//example 1 - worker

const {Worker} = require ("worker_threads")
const worker1 = new Worker('./worker.js')
const worker2 = new Worker('./worker.js')

let results = []
const tStart = Date.now();

worker1.on('message',(data) => {
  console.log('worker 1 says',data)
  results.push(data)
  checkDone()
})

worker2.on('message',(data) => {
  console.log('worker 2 says',data)
  results.push(data)
  checkDone()
})

worker1.on('error', (err) => {
  console.log(err)
})
worker2.on('error', (err) => {
  console.log(err)
})

worker1.postMessage({ start: 0, end: 5e7 });
worker2.postMessage({ start: 5e7, end: 1e8 });

function checkDone() {
  if(results.length === 2) {
    const total = results[0].result + results[1].result
    console.log('Final result:', total);
    console.log("TOTAL TIME:", Date.now() - tStart, "ms");
  }
}






//example 2 - child PROCESS-👉 it runs something outside your main app, in parallel.
// const {spawn} = require('child_process')
// const pidusage = require('pidusage')

// const child = spawn('node',['worker.js'])
// console.log('Child PID:',child.pid)
// //let beat = 1–1.67 beats per second
// let beat = 0
// let start = Date.now()

// setInterval(() => {
//   let funcStart = Date.now()
//   const delay = funcStart - start - 1000
//   console.log("Delay:",delay)

//   start = funcStart
//   pidusage(child.pid,(err,stats) => { //childi memory u cpu track anenq
  
//     if(err) return console.err(err)
      
//       console.log("heartbeat", beat+=1 )
//       console.log("CPU %",stats.cpu)
//       console.log("memory",stats.memory)
      
//   })

// },1000)



//MAIN process
// const pidusage = require("pidusage")

// let beat = 0;
// let start = Date.now()

// setInterval(() => {
//   let funcStart = Date.now()
//   let delay = start - funcStart - 1000
//   console.log("Delay:",delay)

//   start = funcStart

//   for(let i = 0; i < 1e8; i++) {
//     Math.sqrt(i);
//   }
//   //current process
//   pidusage(process.pid,(err,stats) => {
//     if(err) return console.error(err)
//       console.log("heartbeat",++beat)
//       console.log("cpu %", stats.cpu)
//       console.log("memory",stats.memory)
//   })

// },1000)
