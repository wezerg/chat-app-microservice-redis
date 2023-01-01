import { createClient } from 'redis';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

const client = createClient({url: 'redis://redis'});
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

app.use(express.json()); // Middleware Express Json
app.use(cookieParser()); // Middleware Express Json

// Déclaration des routes ici
app.post('/publish', async (req, res, next) => {
    if (req.cookies['auth-chat-app']) {
        const user = await client.HGETALL(`users:${req.cookies['auth-chat-app']}`);
        if (user && user.username) {
            const date = new Date();
            const message = {roomId: req.body.roomId, text: req.body.text, date: date.getTime(), username: req.body.username, userId: parseInt(req.cookies['auth-chat-app'])};
            await client.LPUSH(`messages:${message.roomId}`, JSON.stringify(message));
            await client.publish('messages', JSON.stringify(message));
            res.status(200).send(true);
        }
        else{
            next("Cet utilisateur n'existe pas");
        }  
    }
    else{
        next('Cookie de session inexistant');
    }
});
// Middleware d'erreur général 400
app.use((err, req, res, next) => {
    res.status(400).send(err);
});

// Ecoute du serveur sur le port 3000
app.listen(3000);