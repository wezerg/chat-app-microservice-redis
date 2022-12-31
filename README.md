# App de chat sous micro-services

Les applications sont mis en conteneur sous Docker. La base de données utilisée est Redis.
Listes des micro-services :
- [Single Page Application Vue](https://www.github.com/wezerg/chat-app-microservice-redis/tree/main/spa 'SPA Vue')
- [Api Express pour le compteur](https://www.github.com/wezerg/chat-app-microservice-redis/tree/main/hits-counter 'Api Express Counter')
- [Api Express pour l'authentification](https://github.com/wezerg/demo-microservice-redis_vuejs/tree/main/auth 'Api Express Auth')
- [Api Express pour la gestion des rooms](https://github.com/wezerg/demo-microservice-redis_vuejs/tree/main/chatrooms 'Api Express ChatRooms')
- [Api Express pour l'écriture des messages](https://github.com/wezerg/demo-microservice-redis_vuejs/tree/main/publisher 'Api Express Publisher')
- [WebSocket Server & Pub/Sub Redis](https://github.com/wezerg/demo-microservice-redis_vuejs/tree/main/listener 'WebSocket Server Messages')

## Lancement de l'application

- Se placer à la racine du projet
- Exécuter la commande ```docker compose up``` pour lancer les conteneurs nécessaires à l'application.

## Arrêt d'un micro-service

- Exécuter CTRL+V pour arréter les conteneurs.
- Exécuter ```docker compose down``` pour supprimer les conteneurs lancés précédemment.
