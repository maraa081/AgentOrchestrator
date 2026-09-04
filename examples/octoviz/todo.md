# Todo

- [ ] Creer octoviz/server.mjs : serveur Node natif sans dependance, port 8090, qui sert les fichiers statiques d'octoviz/ et projette /api/* vers http://localhost:8787 (proxy, en conservant methode, corps et en-tetes)
- [ ] Creer octoviz/index.html + octoviz/style.css : page unique sombre (themes sombre, panneaux, barre de progression todo) en francais, sans build step
- [ ] Creer octoviz/app.js : polling fetch toutes les 3 s vers /api/deck/tentacles et /api/terminal-snapshots, rendu des panneaux Tentacules (progression todo) et Agents (provider, etat, nom), horodatage du rafraichissement
- [ ] Ajouter le panneau Messages : pour chaque terminal, lire /api/channels/:terminalId/messages et afficher les derniers messages inter-agents (expediteur, contenu, horodatage)
- [ ] Ajouter le panneau Usage : afficher /api/codex/usage quand disponible, avec gestion de l'absence de donnees
- [ ] Lancer le serveur en arriere-plan et verifier : curl http://localhost:8090/api/deck/tentacles doit repondre avec les tentacules du projet (test de bout en bout du proxy)
