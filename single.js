const tStart = Date.now();

let sum = 0;

for (let i = 0; i < 1e8; i++) {
    sum += Math.sqrt(i) * Math.sin(i) * Math.tan(i);
}

console.log("Result:", sum);
console.log("TIME:", Date.now() - tStart, "ms");