# Options de strategie

Resultat du spike : OctoGent a deja une abstraction de provider
(`codex` | `claude-code`). Cela change les options par rapport a une lecture
du README seul.

## Option 1 : OctoGent tel quel + Codex configure sur DeepSeek/local

- Installation : sources d'octogent (npm non publie), aucune modification.
- OctoGent tourne avec le terminal provider `codex`.
- Codex CLI est configure (config.toml, `model_providers`) pour pointer vers :
  - DeepSeek API (https://api.deepseek.com, wire_api chat),
  - Ollama (http://IP:11434/v1),
  - LM Studio (http://IP:1234/v1).
- Effort : faible (installation + configuration + tests).
- Risques : parsing transcripts/usage par OctoGent concu pour les providers
  officiels ; qualite du tool-calling des modeles locaux.
- Avantage : zero fork, zero maintenance de code tier, on garde l'UI web et
  toute l'orchestration (tentacles, deck, spawn, messaging).
- Desavantage : on depend de Codex CLI comme couche agent (comportement,
  rythme de release OpenAI).

## Option 2 : Proxy Anthropic-compatible devant Claude Code

- OctoGent inchange, terminal provider `claude-code`, mais le binaire claude
  pointe vers un proxy qui traduit le format Anthropic en OpenAI-compatible
  (LiteLLM proxy, claude-code-router...).
- Effort : faible, mais couche fragile (features Anthropic specifiques mal
  traduites, debogage penible).
- Utilite : surtout si on veut absolument garder le provider claude-code.
- Recommandation : ne la retenir que si l'option 1 echoue.

## Option 3 : Fork d'OctoGent avec un provider natif deepseek/ollama

- Fork MIT, ajout d'un nouveau TerminalAgentProvider (ex: `deepseek`, `ollama`,
  ou un provider generique "openai-compatible").
- Effort : moyen a eleve. Il faut :
  - un adaptateur d'agent de code qui parle directement a l'API
    (spawn, prompt, outils, transcript) OU brancher un autre agent local,
  - l'integration des hooks/evenements d'etat,
  - maintenir le fork (l'auteur amont n'accepte pas les PR actuellement).
- Interet : independance totale vis-a-vis de Codex/Claude ; controle du
  prompt system et des outils.
- C'est le "pimp" au sens strict.

## Option 4 : Orchestrateur original base sur un runtime existant

- Garder les concepts (tentacles, todo.md, deck, supervision) et brancher un
  runtime d'agents deja multi-modele, par exemple OpenClaw (DeepSeek, Ollama,
  LM Studio deja supportes nativement, sous-agents, sessions durables).
- Effort : le plus gros si on veut l'UI web ; moyen si on accepte la
  supervision via la Control UI/CLI existante d'OpenClaw.
- Avantage : rien a maintenir cote agent ; pattern tentacules implémentable
  rapidement (sous-agents spawn par tache, contexte en fichiers).
- Desavantage : on reimplemente (ou on adapte) la couche "deck + UI" qui fait
  la valeur d'OctoGent.

## Comparaison rapide

| Option | Effort | Dependance agent | Fork | UI octogent | Risque |
| ------ | ------ | ---------------- | ---- | ----------- | ------ |
| 1      | faible | Codex CLI        | non  | oui         | parsing/usage, tool-calling local |
| 2      | faible | Claude + proxy   | non  | oui         | fragile (traduction de format) |
| 3      | moyen+ | aucune (API directe) | oui | oui     | maintenance fork, integration hooks |
| 4      | moyen+ | OpenClaw         | non  | non (Control UI) | reimplementation deck/UI |

## Recommendation

Tester l'option 1 en premier : c'est la validation la plus rapide du concept
"orchestration octopus avec DeepSeek / LLM local". Si le resultat est
convaincant, AgentOrchestrator peut etre :

- soit un projet "guides + scripts d'installation/configuration" autour
  d'octogent + codex (documentation soignee, configs pretes a l'emploi),
- soit evoluer vers l'option 3 (fork pimpe) si on veut l'independance totale,
- soit alimenter l'option 4 si on prefere capitaliser sur OpenClaw.

La decision appartient a Maraa (voir docs/questions.md).
