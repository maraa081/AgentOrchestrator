# Exemple : tentacule octoviz

Seed de tentacule pour faire construire par OctoGent un mini-site de
supervision ("octoviz") qui montre en temps reel les tentacules, les agents
spawnes et les messages inter-agents de l'orchestrateur.

## Principe

On utilise OctoGent en "dogfooding" : un agent Codex (pilote DeepSeek ou un
modele local) recoit la tentacule et construit le site lui-meme.

## Etapes

1. Creer un dossier projet vide et y lancer OctoGent :
   ```powershell
   mkdir C:\Users\Maxim\octodemo
   cd C:\Users\Maxim\octodemo
   node C:\Users\Maxim\AgentOrchestrator\bin\octogent
   ```
   L'UI s'ouvre sur http://localhost:8787.

2. Dans l'UI (vue Deck), creer une tentacule nommee `octoviz`.

3. Copier les fichiers du seed dans la tentacule creee :
   ```powershell
   copy C:\Users\Maxim\AgentOrchestrator\examples\octoviz\CONTEXT.md .octogent\tentacles\octoviz\CONTEXT.md
   copy C:\Users\Maxim\AgentOrchestrator\examples\octoviz\todo.md .octogent\tentacles\octoviz\todo.md
   ```

4. Dans l'UI, lancer un agent sur la tentacule `octoviz` (provider Codex,
   mode workspace partage). L'agent execute les items du todo.md un par un.

5. Verifier le resultat : http://localhost:8090 doit afficher la page de
   supervision (tentacules, agents, messages). Le proxy integre au mini-site
   appelle l'API octogent sur http://localhost:8787.

Note : si un item echoue ou que l'agent s'arrete, relancer un agent sur la
tentacule : il repart des items incomplets du todo.md.
