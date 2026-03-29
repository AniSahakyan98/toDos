const { exec, execFile } = require('child_process');
const {spawn} = require('child_process')
const {fork} = require('child_process')
const path = require('path');


const test = () => {

    return new Promise((resolve,reject) => {
        exec('dir', (err, output, stderr) => {
            if (err) {
                return reject(err)               
            }
            resolve({
                data: output,
                warnings: stderr
            }) 
            
        });
    })
} 

const test1  = () => {
        return new Promise((resolve,reject) => {
            const child = spawn('cmd',['/c','dir'])
            let stdout = '';
            let stderr = '';


            child.stdout.on('data', (data) => {
            stdout += data.toString()
            })

            child.stderr.on('data',(data)=>{
            stderr +=data.toString()
            })
            child.on('error', (err) => {
                reject(err);
            });
            child.on('close', (code) =>{
                resolve({ stdout, stderr, code })
            })
        })

}

const test2 = (() => {
    return new Promise ((resolve,reject) => {
        const childPath = path.join(__dirname,'child.js')
        const child = fork(childPath)
        console.log('Parent started')
        child.send('start task')
        child.on('message', (msg) => {
            console.log('Parent got:', msg)
            resolve(msg)
        })

        child.on('error', (err) => reject(err));
        child.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Child exited with code ${code}`));
        });
    })
})


const test3 = (() => {
    return new Promise((resolve,reject) => {
        execFile('C:\\Windows\\System32\\notepad.exe',[],(err,stdout,stderr) => {
            if(err) reject(err)
            resolve ({
                data: stdout,
                warnings: stderr
            })
        })
    })
})

module.exports = {
    test,
    test1,
    test2,
    test3
}