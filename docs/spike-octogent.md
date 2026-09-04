# Spike : constats sur le code source d'OctoGent

Source analysee : hesamsheikh/octogent, clone du 2026-09-04 (branche main).

## Faits rapides

- Licence MIT (fork et modification libres, conserver le copyright).
- Non publie sur npm : installation locale depuis les sources
  (pnpm install && pnpm build && npm install -g .).
- TypeScript, pnpm workspace : `apps/api`, `apps/web`, `packages/core`,
  `bin/octogent`.
- Node >= 22. PTY via `node-pty`, transport WebSocket via `ws`.
- L'auteur n'accepte pas (pour l'instant) de pull requests : en cas de besoin
  de modification, fork a maintenir soi-meme.

## Abstraction de runtime d'agent : le point cle

`packages/core/src/domain/agentRuntime.ts` :

```ts
export type TerminalAgentProvider = "codex" | "claude-code";
export const TERMINAL_AGENT_PROVIDERS: TerminalAgentProvider[] = ["codex", "claude-code"];
```

- OctoGent gere deja DEUX providers de terminaux : `claude-code` et `codex`.
- `DEFAULT_AGENT_PROVIDER = "claude-code"`.
- `apps/api/src/terminalRuntime/constants.ts` :
  `TERMINAL_BOOTSTRAP_COMMANDS = { codex: "codex", "claude-code": "claude" }`
- `apps/api/src/startupPrerequisites.ts` : au demarrage, il faut qu'au moins un
  des deux binaires (`claude` ou `codex`) soit installe, sinon erreur.

Consequence : brancher un autre agent de code ne demande pas de tout repenser,
il y a deja un point de couture (enum + commandes de bootstrap + parsers de
transcript par provider : `terminalParsers.ts`, `codexUsage.ts`, `claudeUsage.ts`).

## Piste principale : le provider codex

OpenAI Codex CLI (binaire `codex`) est un agent de code open source qui accepte
des fournisseurs de modele personnalises via sa configuration
(`model_providers` dans config.toml) : base_url OpenAI-compatible,
wire_api "chat" ou "responses".

Cela ouvre la porte a :

- DeepSeek API : base_url https://api.deepseek.com, wire_api chat
- Ollama local/LAN : base_url http://IP:11434/v1
- LM Studio : base_url http://IP:1234/v1

Sans modifier une ligne d'OctoGent : terminal provider = codex, et le modele
est choisi cote configuration Codex. A valider en pratique (qualite du
tool-calling, parsing du transcript/usage par OctoGent).

## Architecture interne (vue rapide)

- `apps/api` : API locale + runtime de terminaux (PTY). Dossiers cles :
  - `terminalRuntime/sessionRuntime.ts` : cycle de vie des sessions PTY
  - `terminalRuntime/hookProcessor.ts` : traitement des evenements hooks Claude
  - `terminalRuntime/ptyEnvironment.ts`, `worktreeManager.ts` (isolation git)
  - `createApiServer/` : routes, parsers de transcripts, usage
- `apps/web` : UI web (React + Vite), WebSocket vers l'API.
- `packages/core` : domaine (types tentacles, todo, deck, runtime).
- Etat projet-local : `.octogent/` (tentacles, worktrees, state).
- Etat runtime : `~/.octogent/projects/<id>/state/`.

## Limites connues (documentees par l'auteur)

- Sessions PTY limitees a 32 par defaut (OCTOGENT_MAX_TERMINAL_SESSIONS).
- Les PTY ne survivent pas a un restart de l'API (records marques stale).
- Docs officielles couvertes uniquement pour Claude Code (le provider codex
  existe dans le code mais est moins documente).
- Features secondaires/experimentales : monitor, GitHub summary/metrics,
  vues user/token usage, prompt library UI, code intel, conversations.

## Risques identifiés pour notre usage

1. Qualite du tool-calling des modeles locaux petits (7B-14B Q4) sur le format
   d'outils de Codex : a tester (DeepSeek API en premier, modeles locaux ensuite).
2. Le parsing de transcript/usage cote OctoGent est code pour claude/codex
   officiels ; un modele tiers via codex peut produire des transcripts
   differents (a surveiller dans l'UI).
3. Hooks Claude (evenements start/stop/idle/transcript) : specifiques a
   claude-code ; cote codex, OctoGent s'appuie probablement sur le transcript.
   Si on veut des evenements riches avec un autre runtime, il faudra adapter.
