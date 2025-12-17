# Settings Reference

All settings are accessible via **Settings** (`Ctrl/Cmd + ,`). Changes are saved automatically to your workspace.

## Appearance

Customize how Sciorex looks.

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Color Theme** | Application color scheme | Dark | Dark, Light, System |
| **Accent Color** | Primary highlight color | Purple | Purple, Blue, Green, Orange, Red, Pink, Cyan, Yellow |
| **UI Font Size** | Base font size for the interface | Medium (14px) | Small (13px), Medium (14px), Large (16px), XL (18px) |
| **Code Font Size** | Font size for code blocks and terminal | 14px | 12, 14, 16, 18 |
| **Sidebar Width** | Navigation sidebar width | Default (256px) | Narrow (200px), Default (256px), Wide (320px), Extra Wide (400px) |
| **Reduce Motion** | Minimize animations | Off | On, Off |
| **Process Explorer Mode** | How Process Explorer opens | Modal | Modal (current window), Window (new window) |

See [Process Explorer](/features/process-explorer) for details on monitoring running processes.

## Editor

Code editor behavior and appearance.

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Vim Mode** | Enable vim keybindings | Off | On, Off |
| **Editor Theme** | Code editor color scheme | Tokyo Night | Tokyo Night, GitHub Light, High Contrast Dark, High Contrast Light |
| **Insert Spaces** | Use spaces instead of tabs | On | On, Off |
| **Tab Size** | Spaces per indentation level | 2 | 2, 4, 8 |
| **Word Wrap** | Wrap long lines | Off | On, Off |
| **Line Numbers** | Show line numbers | On | On, Off |
| **Minimap** | Show code overview on right | On | On, Off |
| **Single Click to Open** | Open files with single click | Off | On, Off |

## AI Providers

Configure AI providers and models.

### Provider Settings

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Default Provider** | AI provider for new chats | Claude Code | Claude Code, Gemini, Codex, LM Studio, Ollama |
| **Default Model** | Model for new chats | Provider-specific | See [Models Reference](/reference/models) |
| **Default Permission Mode** | How tool calls are approved | Auto-approve edits | Normal (ask all), Auto-approve edits, YOLO (approve all) |
| **Default Thinking Level** | Extended thinking depth | Off | Off, Think, Think Hard, Think Harder, Ultrathink |
| **MCP Permission Prompts** | Experimental proactive permissions | Off | On, Off |

### Provider Configuration

Each provider has its own configuration tab:

| Provider | Configuration |
|----------|---------------|
| **Claude Code** | CLI path (auto-detect or custom) |
| **Google Gemini** | CLI path (auto-detect or custom) |
| **OpenAI Codex** | CLI path, OSS mode toggle |
| **LM Studio** | Server URL (default: `http://localhost:1234`) |
| **Ollama** | Server URL (default: `http://localhost:11434`) |

::: tip
See the setup instructions in each provider's tab for installation and authentication details.
:::

### System Prompt Override

Add custom instructions to every conversation:

| Setting | Description |
|---------|-------------|
| **Custom Instructions** | Text added to all conversations |
| **Mode** | Append (add to default) or Replace (override default) |
| **Templates** | Save and load reusable prompt templates |

### Thinking Token Budgets

Configure maximum tokens for each thinking level:

| Level | Default Budget | Range |
|-------|---------------|-------|
| Think | 1,024 | 1,024 to 128,000 |
| Think Hard | 10,000 | 1,024 to 128,000 |
| Think Harder | 16,000 | 1,024 to 128,000 |
| Ultrathink | 32,000 | 1,024 to 128,000 |

### System Prompt Override

Add custom instructions included in every conversation:

- **Mode**: Append (add after default) or Replace (override default)
- **Templates**: Save and load reusable prompt templates

## Chat

Chat interface behavior.

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Default Display Mode** | How messages are shown | Compact | Extended (full details), Compact (collapsed tools), Focus (minimal) |
| **Expand Tool Calls** | Auto-expand tool details in Extended mode | On | On, Off |
| **Default Diff View** | How file edits display | Unified | Split (side by side), Unified (inline) |
| **Send Shortcut** | How to send messages | Enter | Enter, Shift+Enter, Ctrl+Enter, Cmd+Enter |
| **Preprocess @ Mentions** | Resolve @file mentions before sending | On | On, Off |
| **Preprocess / Commands** | Execute slash commands via CLI | On | On, Off |
| **Open Links Externally** | Open links in system browser | Off | On, Off |
| **Internal Browser User Agent** | Custom user agent for internal browser | Default | Custom string or preset |

See [Chat Interface](/features/chat) for full chat documentation.

## Files

File tree behavior.

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Respect .gitignore** | Hide gitignored files | On | On, Off |
| **Exclude Patterns** | Additional patterns to hide | node_modules, .git, .sciorex, .tickets | Custom patterns |

Common patterns you can add: `__pycache__`, `.cache`, `.DS_Store`, `vendor`, `target`, `.idea`, `.vscode`, `*.log`, `tmp`, `temp`

## Tickets

Ticket system configuration.

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Ticket Prefix** | Prefix for ticket IDs | T | Up to 5 characters |
| **Epic Prefix** | Prefix for epic IDs | E | Up to 5 characters |
| **Auto-increment Start** | Starting number for IDs | 1 | Any number |
| **Default Flow** | Flow to run on tickets | None | Any flow ID |

::: warning
Changing prefixes does not rename existing tickets. Only new tickets use the new prefix.
:::

## Worktrees

Git worktree support for parallel sessions.

| Setting | Description | Default | Options |
|---------|-------------|---------|---------|
| **Enable Worktrees** | Turn worktree support on/off | On | On, Off |
| **Git Path** | Path to Git executable | Auto-detect | Custom path |
| **Directory Prefix** | Prefix for worktree folders | wt- | Custom string |

Worktrees are stored in `.sciorex/worktrees/`. See [Understanding Worktrees](/guide/concepts/worktrees) for details.

## MCP Servers

Configure Model Context Protocol servers.

**Built-in servers** (always available):
- `sciorex-tickets` — Ticket and epic management
- `sciorex-interactions` — User prompts and notifications

**Custom servers**: Add your own MCP servers with:
- Server name
- Command (e.g., `node`, `npx`, `python`)
- Arguments

## Notifications

Control when and how you're notified.

| Setting | Description | Default |
|---------|-------------|---------|
| **Sound Notifications** | Play sound on events | On |
| **Desktop Notifications** | Show system notifications | On |
| **Permission Requests** | Notify when AI needs approval | On |
| **Interaction Requests** | Notify when AI asks questions | On |
| **Chat Complete** | Notify when response finishes | On |

::: tip
Notifications only trigger when the application window is not focused.
:::

## Updates

| Setting | Description | Default |
|---------|-------------|---------|
| **Auto Update** | Check and download updates automatically | On |

## Advanced

| Setting | Description |
|---------|-------------|
| **Prompt Template** | Edit the workspace prompt template (`.sciorex/prompt-template.md`) |

## Keyboard Shortcuts

Quick reference for keyboard shortcuts:

### Navigation
| Shortcut | Action |
|----------|--------|
| Ctrl+1 | Dashboard |
| Ctrl+2 | Tickets |
| Ctrl+3 | Flow Editor |
| Ctrl+4 | Agents |
| Ctrl+5 | Chat |
| Ctrl+B | Toggle sidebar |
| Ctrl+, | Settings |

### Editor
| Shortcut | Action |
|----------|--------|
| Ctrl+S | Save file |
| Ctrl+F | Find |
| Ctrl+H | Find and replace |
| Ctrl+G | Go to line |
| Ctrl+/ | Toggle comment |
| Ctrl+D | Select next occurrence |

### Chat
| Shortcut | Action |
|----------|--------|
| Tab | Cycle thinking levels |
| Shift+Tab | Cycle permission modes |
| Escape | Close modals |

### Application
| Shortcut | Action |
|----------|--------|
| Ctrl+N | New ticket |
| Ctrl+T | New chat |
| F11 | Toggle fullscreen |
| Ctrl+Plus | Zoom in |
| Ctrl+Minus | Zoom out |
| Ctrl+0 | Reset zoom |

## Configuration Files

Settings are stored in your workspace:

```
.sciorex/
├── config.json          # All settings
├── prompt-template.md   # Custom prompt template
└── worktrees/           # Worktree registry
```

You can edit these files directly, but using the Settings UI is recommended.
