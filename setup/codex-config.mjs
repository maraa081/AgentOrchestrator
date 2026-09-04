#!/usr/bin/env node
// Generateur de config Codex CLI (~/.codex/config.toml) pour AgentOrchestrator.
// Providers disponibles : deepseek (API), ollama (local), lmstudio (local).
//
// Usage :
//   node setup/codex-config.mjs                          -> deepseek par defaut
//   node setup/codex-config.mjs --provider ollama        -> ollama
//   node setup/codex-config.mjs --provider lmstudio
//   node setup/codex-config.mjs --model deepseek-chat    -> modele personnalise
//   node setup/codex-config.mjs --host 192.168.1.20      -> hote local distant
//   node setup/codex-config.mjs --dry-run                -> affiche sans ecrire
//
// La config existante est sauvegardee en config.toml.bak.<timestamp>.

import { homedir } from "node:os";
import { join } from "node:path";
import { existsSync, readFileSync, writeFileSync, renameSync, mkdirSync } from "node:fs";

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const hasFlag = (name) => args.includes(name);

const provider = getArg("--provider", "deepseek");
const host = getArg("--host", "localhost");
const dryRun = hasFlag("--dry-run");

const MODELS = {
  deepseek: getArg("--model", "deepseek-chat"),
  ollama: getArg("--model", "qwen3-coder:14b"),
  lmstudio: getArg("--model", "qwen3-coder-14b-instruct"),
};

const PROVIDERS = {
  deepseek: {
    name: "DeepSeek API",
    base_url: "https://api.deepseek.com",
    env_key: "DEEPSEEK_API_KEY",
    wire_api: "chat",
    requires_openai_auth: false,
  },
  ollama: {
    name: "Ollama (local)",
    base_url: `http://${host}:11434/v1`,
    env_key: null,
    wire_api: "chat",
    requires_openai_auth: false,
  },
  lmstudio: {
    name: "LM Studio (local)",
    base_url: `http://${host}:1234/v1`,
    env_key: null,
    wire_api: "chat",
    requires_openai_auth: false,
  },
};

if (!PROVIDERS[provider]) {
  console.error(`[erreur] provider inconnu: ${provider}`);
  console.error(`[aide] providers: ${Object.keys(PROVIDERS).join(", ")}`);
  process.exit(1);
}

const selected = PROVIDERS[provider];
const model = MODELS[provider];

const sections = [];
for (const [id, p] of Object.entries(PROVIDERS)) {
  const lines = [
    `[model_providers.${id}]`,
    `name = "${p.name}"`,
    `base_url = "${p.base_url}"`,
    `wire_api = "${p.wire_api}"`,
    `requires_openai_auth = ${p.requires_openai_auth}`,
  ];
  if (p.env_key) {
    lines.push(`env_key = "${p.env_key}"`);
  }
  sections.push(lines.join("\n"));
}

const toml = [
  `# Genere par AgentOrchestrator (setup/codex-config.mjs) le ${new Date().toISOString()}`,
  `model = "${model}"`,
  `model_provider = "${provider}"`,
  "",
  ...sections,
  "",
].join("\n");

if (dryRun) {
  console.log(toml);
  process.exit(0);
}

const configDir = join(homedir(), ".codex");
const configPath = join(configDir, "config.toml");

mkdirSync(configDir, { recursive: true });

if (existsSync(configPath)) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backup = `${configPath}.bak.${stamp}`;
  renameSync(configPath, backup);
  console.log(`[ok] ancienne config sauvegardee: ${backup}`);
}

writeFileSync(configPath, toml, "utf8");
console.log(`[ok] config ecrite: ${configPath}`);
console.log(`[ok] provider: ${provider} (${selected.name})`);
console.log(`[ok] modele: ${model}`);
console.log(`[info] base_url: ${selected.base_url}`);

if (provider === "deepseek" && !process.env.DEEPSEEK_API_KEY) {
  console.log(
    `[info] pensez a definir DEEPSEEK_API_KEY (variable d'environnement Windows) avec votre cle https://platform.deepseek.com`,
  );
}
