import { createClient } from 'redis';
import express from 'express';
const app = express();

const client = createClient({url: 'redis://redis'});
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

app.use(express.json()); // Middleware Express Json

app.get('/hits', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // Get IP Adress of client
    if (ip) {
        await client.pfAdd("count", ip);      
    }
    const response = await client.pfCount('count');
    res.status(200).send(response.toString()); 
});

// Ecoute du serveur sur le port 3000
app.listen(3000);