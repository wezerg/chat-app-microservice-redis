import { createClient } from 'redis';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

const client = createClient({url: 'redis://redis'});
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

await client.SET('incremental:id:rooms', 0);
let incrementalId = await client.INCR('incremental:id:rooms', 1);
await client.RPUSH('rooms', JSON.stringify({name: "general", id: incrementalId}));
incrementalId = await client.INCR('incremental:id:rooms', 1);
await client.RPUSH('rooms', JSON.stringify({name: "dev", id: incrementalId}));
incrementalId = await client.INCR('incremental:id:rooms', 1);
await client.RPUSH('rooms', JSON.stringify({name: "design", id: incrementalId}));

app.use(express.json()); // Middleware Express Json
app.use(cookieParser()); // Middleware Express Json

// Déclaration des routes ici
app.get('/chatrooms', async (req, res, next) => {
    if (req.cookies['auth-chat-app']) {
        const user = await client.HGETALL(`users:${req.cookies['auth-chat-app']}`);
        if (user && user.username) {
            const rooms = await client.LRANGE('rooms', 0, -1);
            for (let i = 0; i < rooms.length; i++) {
                rooms[i] = JSON.parse(rooms[i]);
            }
            res.status(200).send(rooms);
        }
        else{
            next("Cet utilisateur n'existe pas");
        }  
    }
    else{
        next('Cookie de session inexistant');
    }
});
app.get('/chatrooms/:id', async (req, res, next) => {
    if (req.cookies['auth-chat-app']) {
        const user = await client.HGETALL(`users:${req.cookies['auth-chat-app']}`);
        if (user && user.username) {
            const id = parseInt(req.params.id);
            if (id && !isNaN(id)) {
                const rooms = await client.LRANGE('rooms', 0, -1);
                let room = null;
                for (let i = 0; i < rooms.length; i++) {
                    rooms[i] = JSON.parse(rooms[i]);
                    if (rooms[i].id === id) {
                        room = rooms[i];
                        break;
                    }
                }
                if (room) {
                    res.status(200).send(room);                     
                }
                else{
                    next('Chat room introuvable');
                }     
            }
            else{
                next('Identifiant de chat room incorrect');
            }
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