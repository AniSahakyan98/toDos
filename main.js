const {spawn} = require('child_process')
const pidusage = require('pidusage')


const child = spawn('node',['worker.js'])
console.log('Child PID:',child.pid)
//let beat = 1–1.67 beats per second
let beat = 0
let start = Date.now()

setInterval(() => {
  let funcStart = Date.now()
  const delay = funcStart - start - 1000
  console.log("Delay:",delay)

  start = funcStart
  pidusage(child.pid,(err,stats) => { //childi memory u cpu track anenq
  
    if(err) return console.err(err)
      
      console.log("heartbeat", beat+=1 )
      console.log("CPU %",stats.cpu)
      console.log("memory",stats.memory)
      
  })

},1000)



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
