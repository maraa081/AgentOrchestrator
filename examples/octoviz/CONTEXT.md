# CONTEXT - tentacule octoviz

## Mission

Construire un mini-site de supervision nomme "octoviz" qui affiche en temps
reel l'etat de l'orchestrateur OctoGent tournant sur la machine : les
tentacules (avec progression des todos), les agents/terminaux spawnes, leur
etat, et les messages inter-agents.

Le site doit etre construit dans le dossier `octoviz/` du repertoire projet
(celui ou octogent a ete lance, la ou se trouve `.octogent/`).

## Contexte technique

- L'orchestrateur expose une API locale sur http://localhost:8787 (port de
  depart 8787, verifier le port reelement ecoute).
- Endpoints disponibles (voir docs/reference/api.md du projet upstream) :
  - GET /api/deck/tentacles : liste des tentacules, fichiers vault, progression
    des todos (items - [ ] incomplets, - [x] completes)
  - GET /api/terminal-snapshots : terminaux/agents actifs, etat
    (idle, processing, waiting_for_permission, stale...), provider
    (codex ou claude-code), nom
  - GET /api/channels/:terminalId/messages : messages d'un canal de terminal
    (messagerie inter-agents) ; POST /api/channels/:terminalId/messages pour
    envoyer (non requis pour la v1)
  - GET /api/codex/usage : donnees d'usage Codex si disponibles
  - WS /api/terminals/:terminalId/ws : flux IO live (optionnel en v1)
- Contrainte CORS : le site est servi sur un autre port que l'API. Ne pas
  appeler l'API directement depuis le navigateur (pas de CORS cote API).
  Solution imposee : un petit serveur Node sans dependance qui sert les
  fichiers statiques ET projette les routes /api/* vers localhost:8787
  (reverse proxy). Le navigateur ne parle qu'au serveur local du site.

## Architecture cible (v1)

- octoviz/server.mjs : serveur Node (http natif, zero dependance) qui :
  - sert les fichiers statiques du dossier octoviz (index.html, style.css,
    app.js) sur le port 8090
  - projette /api/* et /ws* (optionnel) vers http://localhost:8787
- octoviz/index.html + octoviz/style.css + octoviz/app.js : page unique,
  sombre, sans build step (vanilla), qui :
  - interroge /api/deck/tentacles et /api/terminal-snapshots toutes les 3 s
    (polling simple, fetch)
  - affiche 3 panneaux : Tentacules (nom, fichiers, progression todo avec
    barre), Agents (terminal, provider, etat, tentacule lie), Messages
    (canaux non vides)
  - rafraichit sans recharger la page, horodatage du dernier rafraichissement
- Lancer le serveur en arriere-plan (start / background) et verifier avec un
  curl local que /api/deck/tentacles repond via le proxy (port 8090).

## Contraintes

- Code ASCII strict (pas d'emoji, pas de caracteres de boite unicode).
- Accents francais autorises dans les textes affiches.
- UI en francais.
- Ne pas toucher au dossier .octogent/ ni aux sources de l'orchestrateur.
- Fichiers uniquement dans octoviz/. Ne rien casser dans le reste du projet.
- La page doit marcher en ouvrant http://localhost:8090 avec le serveur lance.
- Tout doit fonctionner sans interaction humaine une fois l'agent lance
  (pas de question au milieu).
