# AgentOrchestrator

Orchestration multi-agents de type "octopus/tentacles" pour agents de code,
independante du fournisseur de modele (API DeepSeek, LLM locaux via Ollama ou
LM Studio, ou tout endpoint OpenAI-compatible).

Le projet s'inspire d'[OctoGent](https://github.com/hesamsheikh/octogent)
(MIT) : contexte par job dans des fichiers durables (tentacles), todo.md comme
surface d'execution, agents enfants, messagerie inter-agents et dashboard.
La difference : OctoGent est verrouille sur Claude Code / Codex, AgentOrchestrator
vise a fonctionner avec DeepSeek et des modeles locaux sans etre dependant d'un
abonnement Anthropic.

## Etat du projet

- [en cours] Definition du perimetre et choix de strategie
- [a venir] Implementation de la v0

Documentation dans `docs/` :

- [Vision](docs/vision.md)
- [Spike OctoGent (constats sur le code source)](docs/spike-octogent.md)
- [Options de strategie](docs/strategie.md)
- [Questions ouvertes](docs/questions.md)

## Contributeurs

Projet personnel. README et docs en francais (voir questions ouvertes pour la
langue par defaut des docs).
