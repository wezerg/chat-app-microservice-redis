import { WebSocketServer } from 'ws';
import { createClient } from 'redis';

const client = createClient({url: 'redis://redis'});
client.on('error', (err) => console.log('Redis Client Error', err));
const subscriber = client.duplicate();
subscriber.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();
await subscriber.connect();

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', async function connection(ws, http) {
    await subscriber.subscribe('messages', async (message) => {
        const data = JSON.parse(message);
        if (http.url.replace('/listener/', '') === data.roomId) {
            const messages = await client.LRANGE(`messages:${data.roomId}`, 0, -1);
            for (let i = 0; i < messages.length; i++) {
                messages[i] = JSON.parse(messages[i]);
            }
            ws.send(JSON.stringify(messages));         
        }
    });
});