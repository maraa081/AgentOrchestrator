# AgentOrchestrator

Orchestration multi-agents de type octopus (tentacles + todo.md + deck) pour
agents de code, independante du fournisseur de modele : API DeepSeek, LLM
locaux (Ollama, LM Studio), ou tout endpoint OpenAI-compatible.

## Qu'est-ce que c'est ?

Ce depot est un fork de [OctoGent](https://github.com/hesamsheikh/octogent)
(MIT, commit 07cfc4e du 2026-04-20), adapte pour fonctionner avec DeepSeek et
des modeles locaux au lieu d'exiger Claude Code.

OctoGent resout le probleme des "dix terminaux d'agents ouverts en meme
temps" : chaque job a son propre contexte durable en markdown (une
"tentacule" : CONTEXT.md + todo.md + notes), les agents peuvent etre spawnes
par tache, communiquer entre eux, et tout est supervise depuis une UI web.

L'UI est identique a celle d'octogent. La seule difference fonctionnelle :
l'agent executeur par defaut est Codex CLI (configurable sur DeepSeek / Ollama /
LM Studio) au lieu de Claude Code.

## Pourquoi ca marche avec DeepSeek / du local ?

OctoGent gere deja deux providers de terminaux : `claude-code` et `codex`.
OpenAI Codex CLI accepte des fournisseurs de modele personnalises
(OpenAI-compatible) : DeepSeek API, Ollama, LM Studio. On branche donc
OctoGent sur le provider `codex` et on configure Codex pour pointer vers le
modele voulu. Zero modification du moteur d'orchestration.

## Installation rapide (Windows, PC gaming)

Prerequis : Node 22+, git, et un compte DeepSeek (cle API sur
platform.deepseek.com) ou Ollama/LM Studio pour du local.

```powershell
# 1. Outils
npm install -g pnpm
npm install -g @openai/codex

# 2. Config Codex vers DeepSeek (ou --provider ollama / lmstudio)
node setup/codex-config.mjs --provider deepseek
# definir la cle API DeepSeek en variable d'environnement Windows :
#   setx DEEPSEEK_API_KEY "sk-..."

# 3. Installer + lancer
powershell -ExecutionPolicy Bypass -File setup\run-windows.ps1
```

L'UI s'ouvre sur http://localhost:8787. Dans le deck, choisir Codex comme
agent (selection par defaut), creer une tentacule, et lancer des agents.

## Documentation

- `docs/` : documentation du produit (upstream, toujours valide) :
  - docs/index.md (sommaire)
  - docs/getting-started/installation.md et quickstart.md
  - docs/concepts/ (tentacles, mental model, runtime and API)
  - docs/guides/ (todos, agents enfants, messagerie inter-agents)
  - docs/reference/ (CLI, API, layout, depannage)
- `project/` : demarche du projet AgentOrchestrator :
  - project/vision.md, project/spike-octogent.md, project/strategie.md,
    project/questions.md, project/VENDORED.md
- `setup/` : scripts d'installation et de configuration

## Licence et provenance

Code upstream : MIT, Copyright (c) 2026 hesamsheikh/octogent (voir LICENSE).
Modifications et scripts ajoutes : meme licence MIT. Voir
project/VENDORED.md pour le detail des modifications.
