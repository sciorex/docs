# Frequently Asked Questions

Quick answers to common questions about Sciorex.

## General

### What is Sciorex?

Sciorex is a desktop application that provides a visual interface for working with AI. It combines project management features (tickets, epics) with AI chat capabilities, allowing you to have AI assistants that understand your codebase and can help you build software.

### Is Sciorex free?

Sciorex is currently in **Alpha** and free to use. You'll need access to at least one AI provider (Claude Code, Gemini, Codex, LM Studio, or Ollama).

### What platforms are supported?

Sciorex runs on:
- **Windows** 10/11 (x64)
- **macOS** 11+ (Intel and Apple Silicon)
- **Linux** (AppImage, x64)

### Does Sciorex store my data?

All your data stays local in your workspace's `.sciorex/` folder. Nothing is sent to our servers. AI conversations go directly to your chosen provider's API through their CLI.

### Can I use Sciorex offline?

Sciorex itself works offline. For AI features:
- **Cloud providers** (Claude, Gemini, Codex) require internet
- **Local providers** (LM Studio, Ollama) work fully offline

## AI and Models

### Which AI models can I use?

Sciorex supports multiple AI providers:

**Cloud Providers:**
- **Claude Code** - Opus, Sonnet, Haiku models
- **Google Gemini** - Gemini 2.5 Pro, Flash models
- **OpenAI Codex** - GPT-5, Codex models

**Local Providers:**
- **LM Studio** - Any GGUF model (Qwen, DeepSeek, Llama, etc.)
- **Ollama** - Any Ollama-supported model

See the [Models Reference](/reference/models) for detailed comparisons.

### How much does it cost?

Sciorex itself is free. Costs depend on your provider:
- **Cloud providers** - Pay per API usage (see each provider's pricing)
- **Local providers** - Free (you provide the hardware)

### What is Extended Thinking?

Extended thinking gives AI models more "thinking time" for complex problems. The model can use internal reasoning before responding, leading to better answers for difficult tasks. Available on Claude and Gemini. See [Extended Thinking](/features/agents#extended-thinking).

### Can the AI access my files?

Only if you allow it. Tool permissions control what the AI can do:
- **Read** - Read files (safe)
- **Write/Edit** - Modify files (requires approval)
- **Bash** - Run commands (requires approval)

You can configure default permissions in agent settings or respond to permission requests per-session.

## Agents and Workflows

### What's the difference between Chat and Agents?

- **Chat** is a direct conversation with AI
- **Agents** are pre-configured personas with specific instructions, allowed tools, and output formats

Think of agents as specialized team members, each expert at certain tasks.

### Can I create my own agents?

Yes! Go to **Agents** in the sidebar and click **+ New Agent**. You can define:
- System prompt (personality and instructions)
- Model and thinking level
- Allowed tools
- Output format (schema)

See [Creating Your First Agent](/cookbook/first-agent).

### What are Flows?

Flows are visual workflows that chain multiple agents together. For example, you could create a flow where:
1. Agent A researches a topic
2. Agent B summarizes the findings
3. Agent C extracts action items

See [Flows Overview](/features/flows/overview).

### Can agents create tickets?

Yes! With the `sciorex-tickets` MCP server, agents can:
- Create new tickets
- Update ticket status
- Link related tickets

This enables AI-driven project management workflows.

## Tickets and Projects

### Where are my tickets stored?

Tickets are YAML files in `.sciorex/tickets/`. You can:
- Edit them directly
- Commit them to Git
- Share them with your team

### Can I import from Jira/Linear/etc?

Not directly yet. However, since tickets are simple YAML files, you could write a script to convert exported data.

### What's the ticket workflow?

Default statuses: `backlog` → `planned` → `in_progress` → `in_review` → `done`

You can also mark tickets as `cancelled`. See [Ticket Board](/features/tickets#board-view).

### Can multiple people use the same workspace?

Yes! Since all data is in files:
- Commit `.sciorex/` to Git
- Team members can pull changes
- Tickets, agents, and flows sync through Git

For real-time collaboration, consider using Git branches and merging.

## Git and Worktrees

### What are worktrees?

Git worktrees let you have multiple working directories from the same repository. In Sciorex, each chat session can have its own worktree, so AI changes don't affect your main code until you merge them.

See [Git Worktrees](/features/worktrees).

### Do I need to use worktrees?

No, they're optional. By default, sessions work directly in your main workspace. Enable worktrees when you want:
- Isolated AI experiments
- Multiple parallel tasks
- Easy review before merging

### How do I merge worktree changes?

1. Review changes in the worktree
2. Commit them to a branch
3. Merge the branch into your main branch (via Git or PR)
4. Clean up the worktree

## MCP and Integrations

### What is MCP?

Model Context Protocol (MCP) is a standard for extending AI capabilities with custom tools. Sciorex includes built-in MCP servers and supports external ones.

### What MCP servers does Sciorex include?

- **sciorex-tickets** - Create and manage tickets
- **sciorex-interactions** - Ask user questions, show notifications
- **sciorex-resources** - Save agents and flows
- **sciorex-permissions** - Dynamic tool permission management

### Can I add custom MCP servers?

Yes! Configure them through Claude Code CLI:
```bash
claude mcp add my-server -- node /path/to/server.js
```

They'll be available in your Sciorex sessions automatically.

## Troubleshooting

### Why isn't the AI responding?

Check:
1. Your provider CLI is installed and configured
2. You're authenticated (for cloud providers)
3. The server is running (for LM Studio/Ollama)
4. You have internet connectivity (for cloud providers)
5. The session isn't stuck (try cancelling and retrying)

### Where can I report bugs?

[GitHub Issues](https://github.com/sciorex/sciorex/issues) - Please include:
- Steps to reproduce
- Expected vs actual behavior
- OS and version info

### How do I reset everything?

Delete the `.sciorex/` folder in your workspace. This removes all tickets, agents, flows, and settings for that workspace.

::: warning
This cannot be undone unless you have a backup or Git history.
:::

## Still have questions?

- Check the [Troubleshooting](/guide/troubleshooting) guide
- Join our [Discord community](https://discord.gg/sciorex)
- Browse [GitHub Issues](https://github.com/sciorex/sciorex/issues)
