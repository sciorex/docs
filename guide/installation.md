# Installation

This guide will help you install Sciorex on your system.

## System Requirements

| Requirement | Minimum |
|-------------|---------|
| **OS** | Windows 10+, macOS 11+, Ubuntu 20.04+ |
| **RAM** | 4 GB |
| **Disk Space** | 200 MB |
| **Claude Code CLI** | Required for AI features |

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

## Installing Claude Code CLI

Sciorex uses Claude Code CLI for AI features. Follow the official installation guide:

👉 **[Claude Code Setup Guide](https://code.claude.com/docs/en/setup)**

After installation, authenticate with:

```bash
claude login
```

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

### Claude CLI not found

Make sure Claude Code CLI is in your PATH:

```bash
which claude  # macOS/Linux
where claude  # Windows
```

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
