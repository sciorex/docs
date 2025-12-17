# Installation

This guide will help you install Sciorex on your system.

## System Requirements

| Requirement | Minimum |
|-------------|---------|
| **OS** | Windows 10+, macOS 11+, Ubuntu 20.04+ |
| **RAM** | 4 GB |
| **Disk Space** | 200 MB |
| **AI Provider** | At least one CLI installed (see below) |

## Download

Download the latest version for your platform:

### Windows

| Version | Download |
|---------|----------|
| Installer (.exe) | [Download](https://sciorex.com/download/windows) |
| Portable (.zip) | [Download](https://sciorex.com/download/windows-portable) |

### macOS

| Architecture | Download |
|--------------|----------|
| Apple Silicon (M1/M2/M3/M4) | [Download](https://sciorex.com/download/macos-arm64) |
| Intel | [Download](https://sciorex.com/download/macos-x64) |

### Linux

| Format | Download |
|--------|----------|
| AppImage | [Download](https://sciorex.com/download/linux-appimage) |
| Debian/Ubuntu (.deb) | [Download](https://sciorex.com/download/linux-deb) |

## Installing AI Provider CLIs

Sciorex supports multiple AI providers. Install at least one to use AI features.

### Claude Code (Anthropic)

Claude models including Opus 4.5, Sonnet 4.5, and Haiku 4.5.

👉 **[Claude Code Installation](https://docs.anthropic.com/en/docs/claude-code/getting-started)**

```bash
claude login
```

### Gemini CLI (Google)

Gemini models including 2.5 Pro, 2.5 Flash, and 2.5 Flash Lite.

👉 **[Gemini CLI Installation](https://geminicli.com/docs/get-started/installation/)**

```bash
gemini auth login
```

### Codex CLI (OpenAI)

GPT and Codex models including GPT-5.2, GPT-5.1 Codex Max, and more.

👉 **[Codex CLI Installation](https://developers.openai.com/codex/cli/)**

```bash
codex auth
```

### Local Models (Optional)

For local/private AI, install one of:

- **[LM Studio](https://lmstudio.ai/)** - GUI app with local model server
- **[Ollama](https://ollama.com/)** - CLI for running local models

Sciorex will automatically detect available models from these servers.

::: tip Mix and Match
You can install multiple providers and switch between them per agent or chat session. Configure providers in **Settings → AI Providers**.
:::

## First Launch

1. Launch Sciorex
2. Select or create a workspace folder
3. Configure your default AI model in Settings
4. You're ready to create your first agent!

## Updating

Sciorex includes auto-update functionality. When a new version is available:

1. You'll see a notification in the app
2. Click "Update Now" to download and install
3. Restart the app to apply the update

::: tip Portable Version
The portable version does not auto-update. Download new versions manually.
:::

## Troubleshooting

### CLI not found

Make sure your AI CLI is in your PATH:

```bash
# macOS/Linux
which claude   # Claude Code
which gemini   # Gemini CLI
which codex    # Codex CLI

# Windows
where claude
where gemini
where codex
```

If not found, follow the installation guide for your provider above.

### Permission errors on Linux

For AppImage, make it executable:

```bash
chmod +x Sciorex-*.AppImage
```

### macOS security warning

If macOS blocks the app:

1. Open System Preferences → Security & Privacy
2. Click "Open Anyway" next to the blocked app message

## Next Steps

- [Quick Start](/guide/quick-start) - Create your first agent
- [Settings](/guide/settings) - Configure Sciorex
- [Troubleshooting](/guide/troubleshooting) - Solve common issues
- [FAQ](/guide/faq) - Common questions answered
