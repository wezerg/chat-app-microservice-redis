import { createClient } from 'redis';
import express from 'express';
const app = express();

const client = createClient({url: 'redis://redis'});
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

app.use(express.json()); // Middleware Express Json

// Déclaration des routes ici
app.get('/hits', async (req, res) => {
    await client.pfAdd('count', 'hello world');
    const response = await client.pfCount('count');
    res.status(200).send(response.toString());
});

// Ecoute du serveur sur le port 3000
app.listen(3000);