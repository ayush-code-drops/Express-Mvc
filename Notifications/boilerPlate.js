//let process=require('process')
function runProgram(input) {
    
}

process.stdin.resume();
process.stdin.setEncoding('ascii');
let read = '';

process.stdin.on('data', function (input) {
    read += input;
})

process.stdin.on('end', function (input) {
    read = read.replace('/\n$/ ', "");
    runProgram(read);
})


process.on('SigInt', () => {
    read = read.replace('/\n$/ ', "")
    process.exit(0)
})