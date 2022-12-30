import { createClient } from 'redis';
import express from 'express';

const app = express();

const client = createClient({url: 'redis://redis'});
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();

app.use(express.json()); // Middleware Express Json

// Déclaration des routes ici
app.post('/auth/login', async (req, res, next) => {
    if (req.body.username && req.body.password) {
        /**
         * Lire les HASH dans redis pour trouver l'utilisateur
         * Comparer mot de passe donnée par celui contenue dans le HASH
         * Renvoyer son idSession dans le cookie à la place de "Hello world"
         */
        res.status(200).cookie('auth-chat-app', 'Hello world').send({username: req.body.username});   
    }
    else{
        next("Veuillez renseigner un pseudo et un mot de passe");
    }
});
app.post('/auth/register', async (req, res, next) => {
    if (req.body.username && req.body.password && req.body.confirmPassword) {
        if (req.body.password === req.body.confirmPassword) {
            /**
             * Crypte mot de passe
             * Incrémenter le SET "incremental_id" pour avoir un nouvel id
             * Créer une nouvelle entrée dans HASH users de redis {username: username, password: crypt(password), idSession: incremental_id}
             * Renvoyer son idSession dans le cookie à la place de "Hello world"
             */
            res.status(200).cookie('auth-chat-app', 'Hello world').send({username: req.body.username});
        }
        else{
            next("Le mot de passe et sa confirmation ne correspondent pas");
        }
    }
    else{
        next("Veuillez renseigner un pseudo, un mot de passe et sa confirmation");
    }
});
app.get('/auth/auto', async (req, res) => {
    console.log("auto");
    res.status(200).send("Connecté");
});

// Middleware d'erreur général 400
app.use((err, req, res, next) => {
    res.status(400).send(err);
});

// Ecoute du serveur sur le port 3000
app.listen(3000);