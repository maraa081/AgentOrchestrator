# Lanceur Windows pour AgentOrchestrator (PC gaming).
# Usage : powershell -ExecutionPolicy Bypass -File setup\run-windows.ps1
# Options : -NoInstall pour ne pas reinstaller les dependances.

param(
  [switch]$NoInstall,
  [string]$Provider = "deepseek"
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

Write-Host "== AgentOrchestrator (octogent + codex) ==" -ForegroundColor Cyan

# 1. Prerequis
$missing = @()
foreach ($cmd in @("node", "pnpm", "codex")) {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
    $missing += $cmd
  }
}
if ($missing.Count -gt 0) {
  Write-Host "[erreur] commandes manquantes: $($missing -join ', ')" -ForegroundColor Red
  Write-Host "Installez Node 22+ (https://nodejs.org), puis:"
  Write-Host "  npm install -g pnpm"
  Write-Host "  npm install -g @openai/codex"
  exit 1
}

# 2. Config Codex (deepseek / ollama / lmstudio)
Write-Host "[1/3] Config Codex CLI (provider: $Provider)" -ForegroundColor Cyan
if (-not (Test-Path "$env:USERPROFILE\.codex\config.toml")) {
  node setup/codex-config.mjs --provider $Provider
} else {
  Write-Host "[info] ~/.codex/config.toml deja present (lancez 'node setup/codex-config.mjs --provider <deepseek|ollama|lmstudio>' pour le regenerer)"
}

# 3. Dependances + build
if (-not $NoInstall) {
  Write-Host "[2/3] pnpm install + build" -ForegroundColor Cyan
  pnpm install
  if ($LASTEXITCODE -ne 0) { exit 1 }
}
pnpm build
if ($LASTEXITCODE -ne 0) { exit 1 }

# 4. Lancement
Write-Host "[3/3] Demarrage du Gateway + UI (http://localhost:8787)" -ForegroundColor Cyan
Write-Host "Pressez Ctrl+C pour arreter."
node bin/octogent
