# Provenance et modifications du code

## Code upstream

- Projet : OctoGent (hesamsheikh/octogent)
- Licence : MIT (fichier LICENSE conserve tel quel)
- Commit vendored : 07cfc4e3c7c3f9ee1fb9ceab2c89fe8715ad4254 (2026-04-20)
- Date du vendoring : 2026-09-04
- Note : le projet upstream n'est pas publie sur npm et n'accepte pas de
  pull requests pour l'instant ; ce depot est un fork autonome.

## Arborescence

- Tout le code source upstream est conserve a l'identique dans `apps/`,
  `packages/`, `bin/`, `prompts/`, `scripts/`, `static/`.
- `docs/` : documentation upstream du produit (installation, concepts,
  reference API). Elle reste valide.
- `project/` : documents de demarche du projet AgentOrchestrator
  (vision, spike, strategies, questions).
- `setup/` : scripts ajoutes par AgentOrchestrator (config Codex, lanceur
  Windows).

## Modifications par rapport a upstream

1. Default provider d'agent passe de `claude-code` a `codex` (DeepSeek / LLM
   locaux via Codex CLI) :
   - apps/api/src/terminalRuntime/constants.ts (DEFAULT_AGENT_PROVIDER)
   - apps/web/src/components/DeckPrimaryView.tsx (etat initial du selecteur)
   - apps/web/src/components/PromptsPrimaryView.tsx (lancement de prompts)
   - apps/web/src/App.tsx (lancement tentacle-planner)
   - apps/web/src/app/hooks/useTerminalMutations.ts (fallback provider)
   Le provider `claude-code` reste disponible dans l'UI (selecteur inchange).
2. README racine remplace par celui d'AgentOrchestrator.
3. Ajout de setup/codex-config.mjs : generation de ~/.codex/config.toml avec
   les providers deepseek, ollama, lmstudio.
4. Ajout de setup/run-windows.ps1 et setup/run-windows.bat : lanceur pour
   Windows (PC gaming).

## Pour synchroniser avec upstream plus tard

```bash
git remote add upstream https://github.com/hesamsheikh/octogent.git
git fetch upstream
git diff HEAD upstream/main -- apps packages bin prompts scripts static
```

Appliquer ensuite les changements voulus en gardant les adaptations listees
ci-dessus.
