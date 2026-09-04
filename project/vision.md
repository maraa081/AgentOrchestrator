# Vision

## Probleme

Quand plusieurs taches avancent en parallele sur une meme codebase (documentation,
scripts, API, frontend...), il est difficile de :

- garder un contexte propre par tache (l'historique de chat se melange),
- suivre qui fait quoi et ce qui reste a faire,
- deleguer du travail a plusieurs agents sans chaos,
- conserver l'etat au-dela d'une session de chat.

## Inspiration : OctoGent

OctoGent (hesamsheikh/octogent, MIT) repond a ce probleme pour Claude Code avec
une metaphore pieuvre :

- un "octopus" : le developpeur (ou un agent coordinateur),
- des "tentacules" : des conteneurs de job, chaque tentacule est un dossier avec
  des fichiers markdown durables (CONTEXT.md, todo.md, notes, handoffs),
- un "deck" : lit les tentacules, parse les items de todo.md et genere les
  prompts des agents workers,
- plusieurs terminaux d'agents geres par une API locale + UI web (WebSocket),
- des agents enfants spawnables depuis les items todo, avec messagerie
  inter-agents (completion, blocages, handoffs),
- isolation optionnelle via git worktrees (branches octogent/*).

## Ce que AgentOrchestrator change

OctoGent exige le binaire `claude` (Claude Code) ou `codex` (OpenAI Codex).
AgentOrchestrator veut la meme orchestration mais :

- pilotable avec une cle API DeepSeek,
- pilotable avec des LLM locaux (Ollama sur une machine GPU, LM Studio),
- sans dependance a un abonnement Anthropic/OpenAI,
- potentiellement branche sur d'autres runtimes d'agents (OpenClaw, OpenCode...).

## Objectifs

1. Pouvoir lancer N agents de code en parallele sur un repo, chacun scope sur
   une tentacule (dossier avec CONTEXT.md + todo.md).
2. Fournir une vue de supervision (etat des agents, transcripts, idle) et des
   commandes de cycle de vie (start, stop, spawn, message).
3. Rester agnostique au modele : DeepSeek API d'abord, LLM local ensuite.
4. Documenter proprement (le projet veut une doc soignee).

## Non-objectifs (pour l'instant)

- Ne pas reimplementer un agent de code complet (edition de fichiers, outils) :
  on s'appuie sur des agents de code existants ou sur un runtime existant.
- Ne pas viser la production cloud ; usage local / LAN / WSL.

## Vocabulaire

- Tentacule : dossier de job avec contexte durable en markdown.
- Deck : composant qui transforme tentacules + todo.md en prompts de travail.
- Worker : agent executeur d'une tentacule.
- Coordinateur : agent (ou humain) qui repartit le travail.
