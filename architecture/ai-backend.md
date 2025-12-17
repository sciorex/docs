# AI Backend Architecture

Sciorex uses a **100% local architecture** with no backend servers. All AI processing happens directly on your machine through CLI tools for multiple providers. This document explains the architecture, supported features, and why this approach was chosen.

## Why Local-Only?

Sciorex deliberately avoids any intermediate servers between you and the AI providers:

### Privacy & Security

- **Your code never leaves your machine** except to go directly to the AI provider's API
- **No third-party servers** storing or processing your conversations
- **Credentials stay on your device** - managed by each provider's CLI
- **Complete control** over what data is shared
- **Local model support** - run completely offline with LM Studio or Ollama

### Performance

- **Zero latency overhead** from proxy servers
- **Direct streaming** from provider to your UI
- **No network hops** that could fail or slow down responses

### Reliability

- **No dependency on external infrastructure** beyond the AI provider APIs
- **Offline-capable session management** - your history is stored locally
- **No account required** with Sciorex - just configure your provider

---

# Supported AI Providers

Sciorex supports multiple AI providers through their CLI tools:

| Provider | CLI Tool | Type | Status |
|----------|----------|------|--------|
| **Claude Code** | `claude` | Cloud | ✅ Supported |
| **Google Gemini** | `gemini` | Cloud | ✅ Supported |
| **OpenAI Codex** | `codex` | Cloud | ✅ Supported |
| **LM Studio** | Local Server | Local | ✅ Supported |
| **Ollama** | `ollama` | Local | ✅ Supported |

## How It Works

Sciorex spawns the provider CLI as a child process and communicates via:

- **stdin** - Send prompts and messages
- **stdout** - Receive streaming JSON responses
- **Environment variables** - Pass configuration

```
┌─────────────────┐      stdin       ┌──────────────────┐      HTTPS      ┌─────────────┐
│    Sciorex      │ ───────────────► │   Provider CLI   │ ─────────────► │  Provider   │
│   (Electron)    │ ◄─────────────── │    (Process)     │ ◄───────────── │    API      │
└─────────────────┘     stdout       └──────────────────┘                └─────────────┘
```

For local providers (LM Studio, Ollama), the connection is to a local server instead:

```
┌─────────────────┐                  ┌──────────────────┐
│    Sciorex      │ ◄──────────────► │   Local Server   │
│   (Electron)    │   HTTP API       │ (LM Studio/Ollama)│
└─────────────────┘                  └──────────────────┘
```

## Prerequisites

Each provider has its own requirements. See **Settings → AI Providers** in the app for detailed setup instructions.

| Provider | Requirement |
|----------|-------------|
| Claude Code | CLI installed and authenticated |
| Google Gemini | CLI installed and authenticated |
| OpenAI Codex | CLI installed and authenticated |
| LM Studio | Server running on configured port |
| Ollama | Server running (`ollama serve`) |

---

# Supported Claude Code Features

Sciorex leverages most Claude Code CLI capabilities. Here's what's supported:

## ✅ Fully Supported

### Core Features

| Feature | CLI Flag | Description |
|---------|----------|-------------|
| **Streaming JSON output** | `--output-format stream-json` | Real-time event streaming |
| **Print mode** | `--print` | Non-interactive execution |
| **Verbose output** | `--verbose` | Required for stream-json |
| **Model selection** | `--model` | Choose Claude model |
| **System prompts** | `--system-prompt` | Agent system prompts |
| **Append system prompt** | `--append-system-prompt` | Add to default prompt |
| **MCP configuration** | `--mcp-config` | Configure MCP servers |
| **Working directory** | `--cwd` | Set execution context |

### Session Management

| Feature | CLI Flag | Description |
|---------|----------|-------------|
| **Session resume** | `--resume` | Continue previous session |
| **Session forking** | `--fork-session` | Branch from any message |

### Permission Control

| Feature | CLI Flag | Description |
|---------|----------|-------------|
| **Skip all permissions** | `--dangerously-skip-permissions` | YOLO mode |
| **Accept edits mode** | `--permission-mode acceptEdits` | Auto-approve file ops |
| **Default mode** | `--permission-mode default` | Ask for all tools |
| **Permission prompt tool** | `--permission-prompt-tool` | MCP-based permissions |
| **Allowed tools filter** | `-tools` | Restrict tool access |

### Extended Thinking

| Feature | Environment Variable | Description |
|---------|---------------------|-------------|
| **Thinking budget** | `MAX_THINKING_TOKENS` | Token limit for thinking |

Thinking levels map to token budgets:

| Level | Environment Value |
|-------|------------------|
| Off | Not set |
| Think | 1024 |
| Think Hard | 10,000 |
| Think Harder | 16,000 |
| Ultrathink | 32,000 |

::: tip Configurable Budgets
You can customize these token budgets in **Settings → Thinking Budgets**.
:::

## ❌ Not Supported

The following Claude Code CLI features are **not currently used**:

| Feature | Reason |
|---------|--------|
| `--max-tokens` | API-only parameter, not supported by CLI |
| `--temperature` | API-only parameter, not supported by CLI |
| Interactive mode | UI handles interaction, CLI runs in print mode |
| `claude chat` | Only structured `--print` mode used |

---

# MCP Server Integration

Sciorex uses the Model Context Protocol (MCP) to extend Claude's capabilities:

## Built-in MCP Servers

| Server | Purpose | Auto-Started |
|--------|---------|--------------|
| **sciorex-tickets** | Ticket and epic management | When tools selected |
| **sciorex-interactions** | Ask user questions | When tools selected |
| **sciorex-resources** | Agent and flow CRUD operations | When tools selected |
| **sciorex-permissions** | Permission prompts | When MCP permissions enabled |

## How MCP Servers Are Configured

MCP servers are passed to Claude Code via the `--mcp-config` flag:

```json
{
  "mcpServers": {
    "sciorex-tickets": {
      "command": "node",
      "args": ["/path/to/server.js", "--workspace", "/project/path"]
    }
  }
}
```

## Custom MCP Servers

Custom MCP servers are automatically discovered from your Claude Code configuration and appear in the tool selector.

See [MCP Servers Documentation](/features/mcp) for details on available tools.

---

# Permission System

Sciorex supports two permission handling approaches:

## Reactive Permissions (Default)

When Claude attempts a tool that requires permission:

1. CLI emits `permission_denied` event
2. Sciorex shows permission modal
3. User approves/denies
4. Session resumes with `-tools` for approved tools

## Proactive Permissions (MCP-based)

When "Use MCP Permissions" is enabled:

1. `sciorex-permissions` MCP server is started
2. CLI uses `--permission-prompt-tool mcp__sciorex-permissions__approval_prompt`
3. Permission requests go through MCP bridge
4. Sciorex shows permission modal
5. Response sent back through MCP

### Permission Modes

| Mode | CLI Configuration | Behavior |
|------|-------------------|----------|
| **YOLO** | `--dangerously-skip-permissions` | No prompts |
| **Auto-edits** | `--permission-mode acceptEdits` | Auto-approve file ops |
| **Ask all** | `--permission-mode default` | Prompt for everything |

---

# Process Management

## Lifecycle

Each chat or agent session spawns a new Claude Code process:

```
Session Start → Spawn CLI → Send Prompt → Stream Output → Process Exit
```

## Concurrent Execution

Sciorex limits concurrent processes (default: 3) to prevent resource exhaustion.

## Process Control

| Action | Implementation |
|--------|---------------|
| **Pause** | `SIGSTOP` signal |
| **Resume** | `SIGCONT` signal |
| **Cancel** | `SIGKILL` + cleanup |
| **Timeout** | Auto-kill after default timeout (5 minutes) |

## Session Continuation

When you send a follow-up message to a completed session:

1. Previous Claude session ID is retrieved
2. New CLI spawned with `--resume [session-id]`
3. `--fork-session` creates new ID for branching support
4. Conversation continues from previous state

---

# Output Parsing

Claude Code CLI outputs streaming JSON events that Sciorex parses:

## Event Types

| Event | Description |
|-------|-------------|
| `session_init` | Session started, contains session ID and tools |
| `text` | Claude's text output |
| `tool_start` | Tool execution begin |
| `tool_end` | Tool execution result |
| `thinking` | Extended thinking content |
| `subagent_spawn` | Subagent (Task) started |
| `subagent_result` | Subagent completed |
| `result` | Final result with usage summary |
| `error` | Error occurred |
| `permission_denied` | Tool permission denied |
| `system_status` | System messages (compacting, etc.) |

## Structured Output Extraction

For agents with output schemas, Sciorex extracts structured JSON from:

- `result` event data
- Markers in text output (`OUTPUT_START` / `OUTPUT_END`)

---

# Configuration

## CLI Path

Configure the Claude Code executable path in **Settings → API → Claude CLI Path**.

Default: `claude` (assumes it's in your PATH)

## Working Directory

Each session uses your current workspace as the working directory (`--cwd`).

## Environment Variables

Sciorex sets these environment variables for each session:

| Variable | Description |
|----------|-------------|
| `SCIOREX_SESSION_ID` | Sciorex session identifier |
| `SCIOREX_AGENT_ID` | Agent identifier (if applicable) |
| `MAX_THINKING_TOKENS` | Extended thinking budget |

---

# Error Handling

## CLI Not Found

If Claude Code isn't installed or not in PATH:

- Error message displayed
- Sessions cannot start
- Configure path in Settings

## Rate Limits

Claude API rate limits are detected and displayed:

- "5-hour limit reached" messages
- Rate limit errors

## Process Failures

Non-zero exit codes result in:

- `failed` session status
- Error message from stderr
- Automatic cleanup

## Timeouts

Sessions automatically terminate after the default timeout (5 minutes) to prevent resource leaks.

---

# Troubleshooting

## Claude Code Not Detected

**Symptoms**: Error message about CLI not found.

**Solutions**:
1. Install Claude Code: `npm install -g @anthropic-ai/claude-code`
2. Verify installation: `claude --version`
3. Configure custom path in Settings if not in PATH

## No Response from Claude

**Symptoms**: Session starts but nothing happens.

**Solutions**:
1. Check Claude Code is authenticated: `claude auth status`
2. Verify API key is valid
3. Check network connectivity

## Permission Errors

**Symptoms**: Tools fail with permission errors.

**Solutions**:
1. Switch to a less restrictive permission mode
2. Approve tools when prompted
3. Use YOLO mode for trusted operations

## Memory Issues

**Symptoms**: High memory usage, slowdowns.

**Solutions**:
1. Reduce concurrent session limit
2. Close unused sessions
3. Restart the application

---

# Provider-Specific Features

## Claude Code

Claude Code CLI provides the most complete feature set:

- **Full tool execution** - Built-in tool implementations
- **Context management** - Session state handling
- **Workspace awareness** - File system understanding
- **Permission system** - Granular tool control
- **Extended thinking** - All thinking levels supported

## Google Gemini

Gemini CLI provides:

- **Large context windows** - Up to 1M tokens
- **Fast responses** - Optimized for speed
- **Tool execution** - Function calling support
- **Extended thinking** - Think and Think Hard levels

## OpenAI Codex

Codex CLI provides:

- **Code optimization** - Specialized for code tasks
- **Large context** - Up to 400K tokens
- **Tool execution** - Function calling support
- **OSS mode** - Run local GPT-OSS models

## Local Providers

LM Studio and Ollama provide:

- **Complete privacy** - No data leaves your machine
- **Offline capability** - Work without internet
- **Model flexibility** - Choose any compatible model
- **No API costs** - Run unlimited queries

---

# Related Documentation

- [Models Reference](/reference/models) - Available models and providers
- [Chat Interface](/features/chat) - Using the chat UI
- [Creating Agents](/features/agents) - Building custom agents
- [MCP Servers](/features/mcp) - Tool documentation
- [Extended Thinking](/features/agents#extended-thinking) - Thinking modes
