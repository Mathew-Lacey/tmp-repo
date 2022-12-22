//operating system module
const os = require('os');

//info about current user
const user = os.userInfo();
console.log(user);

//method returns system uptime in seconds
console.log(`The system uptime is ${os.uptime()} seconds`);

const currentOS = {
    name:os.type(),
    release:os.release(),
    totalMem:os.totalmem(),
    freeMem:os.freemem(),
}

console.log(currentOS);

//file module
const path = require('path');

console.log(path.sep);

const filepath = path.join('/content', 'subfolder', 'test.txt');
console.log(filepath);

const base = path.basename(filepath);
console.log(base);

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
console.log(absolute);


//other file module sync
const { readFileSync, writeFileSync, read } = require('fs');

const first = readFileSync('./content/first.txt', 'utf-8')
const second = readFileSync('./content/second.txt', 'utf-8')

console.log(first, second);

writeFileSync(
    './content/result-sync.txt', 
    `Here is the result : ${second}, ${first}`, 
    { flag: 'a' })


//other file module async
const { readFile, writeFile } = require('fs');

readFile('./content/first.txt', 'utf8', (err, result) =>{
    if(err){
        return;
        console.log(err);
    }
    
    const first = result;
    readFile('./content/second.txt', 'utf-8', (err, result) =>{
        if(err) {
            console.log(err);
            return;
        }

        const second = result;
        writeFile(
            './content/result-async.txt',
            `Here is the result : ${second}, ${first}`,
            (err, result) =>{
                if(err){
                    console.log(err);
                    return;
                }
                console.log(result);
            })
    })
})

//http module
const http = require('http');

const server = http.createServer((req, res)=>{
    if(req.url === '/'){
        res.end('welcome to our gnome page')
    }
    if(req.url === '/about'){
        res.end('These are out gnomes')
    }
    res.end(`
    <h1>Oops!</h1>
    <p>No gnomes here</p>
    <a href="/">Back gnome</a>
    `)
})

server.listen(5000);