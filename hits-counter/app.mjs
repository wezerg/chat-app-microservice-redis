import { createClient } from 'redis';
import express from 'express';
import cors from 'cors';

const app = express();

const client = createClient({url: process.env.REDIS_URL});
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

app.use(express.json()); // Middleware Express Json
app.use(cors()); // Middleware Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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