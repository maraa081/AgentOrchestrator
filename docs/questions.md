# Questions ouvertes

Pour affiner le projet avant implementation. Reponses attendues de Maraa.

## Strategie

1. Option 1 (octogent + codex configure DeepSeek/local) comme point de depart ?
   Ou directement option 3 (fork avec provider natif) / option 4 (sur OpenClaw) ?
2. Le repo AgentOrchestrator doit-il contenir le code (fork/v0) ou d'abord de la
   doc + scripts (guides d'installation et configs) ?

## Runtime et cibles

3. Sur quelle machine le projet doit-il tourner en premier ?
   - WSL Ubuntu de l'autre PC (installation en cours),
   - ce WSL (ou tourne OpenClaw),
   - PC gaming avec GPU (Ollama deja installe, LM Studio deja utilise).
4. Modeles cibles : DeepSeek API d'abord, ou LLM local (Ollama/LM Studio) des le
   depart ? Lesquels (ex: Qwen3 Coder, DeepSeek distills...) ?

## Interface et perimetre

5. UI web type octogent indispensable, ou CLI + supervision minimale suffisent
   pour la v0 ?
6. Faut-il garder les git worktrees (isolation par branche octogent/*) des la
   v0, ou simplifier avec des repertoires partages ?
7. Perimetre v0 : un seul repo a orchestrer (lequel ?) ou outil generique
   multi-repos ?

## Projet

8. Langue des docs du repo : francais (defaut actuel) ou anglais ?
9. Nommage : garder "AgentOrchestrator" ou renommer (ex: tentacle-lab,
   octo-deep...) ?
