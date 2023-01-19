# App de chat sous micro-services

Les applications sont mis en conteneur sous Docker. La base de données utilisée est Redis.
Listes des micro-services :
- [Single Page Application Vue](https://www.github.com/wezerg/chat-app-microservice-redis/tree/main/spa 'SPA Vue')
- [Api Express pour le compteur](https://www.github.com/wezerg/chat-app-microservice-redis/tree/main/hits-counter 'Api Express Counter')
- [Api Express pour l'authentification](https://github.com/wezerg/demo-microservice-redis_vuejs/tree/main/auth 'Api Express Auth')
- [Api Express pour la gestion des rooms](https://github.com/wezerg/demo-microservice-redis_vuejs/tree/main/chatrooms 'Api Express ChatRooms')
- [Api Express pour l'écriture des messages](https://github.com/wezerg/demo-microservice-redis_vuejs/tree/main/publisher 'Api Express Publisher')
- [WebSocket Server & Pub/Sub Redis](https://github.com/wezerg/demo-microservice-redis_vuejs/tree/main/listener 'WebSocket Server Messages')

## Variables d'environnements
#### Docker compose

Les variables d'environnement des services backend sont déja configuré pour le docker compose. Pour le front-end, il faut rajouter un fichier ```.env``` à la racine du dossier ```spa/chat-app-frontend```.
*Exemple de fichier dotenv pour docker compose en local*
```
VITE_URL_AUTH=http://localhost:3000
VITE_URL_CHAT=http://localhost:3000
VITE_URL_HITS=http://localhost:3000
VITE_URL_LISTEN=ws://localhost:3000
VITE_URL_PUBLISH=http://localhost:3000
```

## Lancement et éxécution
### Lancement de l'application avec Docker compose

- Se placer à la racine du projet
- Exécuter la commande ```docker compose up``` pour lancer les conteneurs nécessaires à l'application.

### Arrêt de l'application avec Docker compose

- Exécuter CTRL+C pour arréter les conteneurs.
- Taper ```docker compose down``` pour supprimer les conteneurs lancés précédemment.
