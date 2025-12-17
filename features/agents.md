# AI Agents

Agents are the core of Sciorex. Each agent is a specialized AI assistant with its own configuration, tools, permissions, and personality. Agents can operate independently or as part of automated [Flows](/features/flows/overview).

## Overview

An agent in Sciorex is a pre-configured AI persona that:

- **Has a specific purpose** defined by its system prompt
- **Uses specific tools** based on its allowed tool list
- **Connects to MCP servers** for extended capabilities
- **Follows permission rules** for tool execution
- **Can be used in Flows** as processing nodes

Agents are powered by [multiple AI providers](/architecture/ai-backend) including Claude Code, Gemini, OpenAI Codex, LM Studio, and Ollama.

## Agent Definition

Each agent has the following configuration properties:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier (auto-generated from name) |
| `name` | `string` | Display name for the agent |
| `description` | `string` | What this agent does |
| `icon` | `string` | Emoji or icon identifier |
| `systemPrompt` | `string` | Instructions that define agent behavior |
| `model` | `string` | AI model to use |
| `provider` | `string` | AI provider (`claude-code`, `google-gemini`, `openai-codex`, `lmstudio`, `ollama`) |
| `temperature` | `number` | Creativity (0-1, default 0.7) |
| `maxTokens` | `number` | Max response tokens (default 4096) |
| `inputSchema` | `JSONSchema` | Expected input structure |
| `outputSchema` | `JSONSchema` | Expected output structure |
| `allowedTools` | `ToolPermission[]` | Tools the agent can use |
| `mcpServers` | `string[]` | MCP servers to connect |
| `autoApprove` | `boolean` | Auto-approve all tool calls |
| `autoApproveTools` | `string[]` | Specific tools to auto-approve |
| `requiresHumanApproval` | `string[]` | Tools requiring manual approval |
| `labelIds` | `string[]` | Labels for organization |

## Available Models

Sciorex supports models from multiple providers. See [Models Reference](/reference/models) for the complete list.

### Claude (claude-code)

| Model ID | Display Name |
|----------|--------------|
| `claude-sonnet-4-5-20250929` | Sonnet 4.5 (Default) |
| `claude-opus-4-5-20251101` | Opus 4.5 |
| `claude-haiku-4-5-20251001` | Haiku 4.5 |

### Gemini (google-gemini)

| Model ID | Display Name |
|----------|--------------|
| `gemini-2.5-pro` | Gemini 2.5 Pro |
| `gemini-2.5-flash` | Gemini 2.5 Flash |
| `gemini-2.5-flash-lite` | Gemini 2.5 Flash Lite |

### OpenAI Codex (openai-codex)

| Model ID | Display Name |
|----------|--------------|
| `gpt-5.1-codex-max` | GPT-5.1 Codex Max |
| `gpt-5.1-codex` | GPT-5.1 Codex |
| `gpt-5.2` | GPT-5.2 |

### Local Models (lmstudio / ollama)

Local models are fetched dynamically from your LM Studio or Ollama server. Popular options include:

- `qwen2.5-coder` - Code generation
- `deepseek-coder-v2` - Advanced coding
- `llama3.2` - General tasks

::: tip Model Selection
- **Claude Opus / GPT-5.2**: Best for complex reasoning and critical tasks
- **Claude Sonnet / Gemini Pro / GPT Codex**: Balanced performance (recommended)
- **Claude Haiku / Gemini Flash / Local**: Fast responses for simple tasks

Change the default model in **Settings → AI Providers**.
:::

## Creating an Agent

### Via the UI

1. Navigate to **Agents** in the sidebar
2. Click **New Agent**
3. Complete the creation wizard:
   - **Identity**: Name, description, icon
   - **Instructions**: System prompt (can be AI-generated)
   - **Tools**: Select allowed tools and permissions
   - **Parameters**: Define input parameters
   - **Settings**: Model, temperature, response length

### Agent File Structure

Agents are stored as YAML files in `.sciorex/agents/`:

```yaml
# .sciorex/agents/researcher.yaml
id: research-assistant
name: Research Assistant
description: Specialized in academic papers and research
icon: 📚

systemPrompt: |
  You are a research assistant specialized in academic papers.
  Always cite your sources with proper academic formatting.
  Be thorough but concise in your summaries.

provider: claude-code
model: claude-sonnet-4-5-20250929
temperature: 0.7
maxTokens: 4096

inputSchema:
  type: object
  properties:
    query:
      type: string
      description: Research query or topic
  required:
    - query

outputSchema:
  type: object
  properties:
    summary:
      type: string
    sources:
      type: array
      items:
        type: string

allowedTools:
  - tool: Read
    allowed: true
  - tool: WebSearch
    allowed: true
  - tool: Write
    allowed: true

mcpServers:
  - sciorex-tickets
  - arxiv-mcp

autoApprove: false
requiresHumanApproval:
  - Write
  - Bash

version: "1.0"
```

## Advanced Settings {#advanced-settings}

The Advanced tab in the agent creation wizard provides fine-tuning options. **Most users can skip these** — the defaults work well for typical use cases.

### Provider

The **Provider** determines which AI backend powers the agent:

| Provider | Description |
|----------|-------------|
| `claude-code` | Claude models via Claude Code CLI |
| `google-gemini` | Gemini models via Gemini CLI |
| `openai-codex` | OpenAI/Codex models via Codex CLI |
| `lmstudio` | Local models via LM Studio server |
| `ollama` | Local models via Ollama server |

Each provider has different capabilities and features. See [Models Reference](/reference/models) for details.

### Model Selection

Choose which model powers your agent. Available models depend on the selected provider. See [Available Models](#available-models) for the full list.

::: tip Quick Guide
- **High-capability models** (Opus, GPT-5.2, Gemini Pro): Complex reasoning, code review
- **Balanced models** (Sonnet, Codex, Gemini Flash): Most tasks (recommended)
- **Fast models** (Haiku, Flash Lite, local): Simple, routine tasks
:::

### MCP Servers

MCP (Model Context Protocol) servers extend agent capabilities. When you enable an MCP server, its tools become available to your agent.

**Built-in MCP Servers:**

| Server | Description |
|--------|-------------|
| `sciorex-tickets` | Ticket and epic management tools |
| `sciorex-interactions` | User interaction tools (ask, notify, approve) |
| `sciorex-resources` | Agent and flow management tools |

::: info Automatic Sync
Enabling an MCP server in Advanced settings automatically enables its tools in Permissions, and vice versa.
:::

### Creativity Level (Temperature)

Controls how creative vs. deterministic the agent's responses are:

- **0.0 - 0.3**: Very precise, deterministic (good for code, data analysis)
- **0.4 - 0.6**: Balanced (good for most tasks)
- **0.7 - 1.0**: More creative, varied (good for brainstorming, writing)

Default: **0.7**

### Response Length

Sets the maximum tokens for agent responses:

| Setting | Tokens | Use Case |
|---------|--------|----------|
| Short | 1,024 | Quick answers, simple tasks |
| Medium | 4,096 | Most tasks (default) |
| Long | 8,192 | Detailed analysis, documentation |
| Very Long | 16,384 | Extensive code generation |

### Tool Constraints (Developer Feature)

For developers who need fine-grained control, you can add JSON constraints to individual tools. Enable "Show constraints" in the Permissions sidebar to access this feature.

Example constraints:

```json
// For Read/Write/Edit tools
{"respectGitignore": true, "disallowedPaths": ["node_modules/**", ".git/**"]}

// For Bash tool
{"allowedCommands": ["git", "npm", "npx"], "disallowedCommands": ["rm -rf", "sudo"]}

// For WebFetch/WebSearch
{"allowedDomains": ["github.com", "docs.anthropic.com"]}
```

See [Tool Constraints](#tool-constraints) for more details.

## Tool Permissions

Each tool permission has:

| Field | Type | Description |
|-------|------|-------------|
| `tool` | `string` | Tool name or pattern (e.g., `Read`, `Bash:*`) |
| `allowed` | `boolean` | Whether the tool is allowed |
| `constraints` | `object` | Tool-specific constraints |

### Available Tools

Tools are organized by category:

**File Operations:**
- `Read` - View file contents
- `Write` - Create and modify files
- `Edit` - Make targeted edits to files
- `MultiEdit` - Edit multiple files

**System Commands:**
- `Bash` - Execute shell commands
- `Glob` - Search file patterns
- `Grep` - Search file contents

**Web Access:**
- `WebFetch` - Fetch web page content
- `WebSearch` - Search the web

**Integration:**
- `Task` - Create and manage sub-tasks
- `TodoWrite` - Track work items

### Tool Constraints

You can add constraints to limit tool behavior:

```yaml
allowedTools:
  - tool: Bash
    allowed: true
    constraints:
      allowedCommands:
        - git
        - npm
        - eslint
      blockedCommands:
        - rm -rf
        - sudo
```

## Community Agents

Sciorex provides access to a community marketplace with pre-configured agents you can install:

| Agent | Purpose |
|-------|---------|
| `orchestrator` | Coordinates complex multi-step tasks |
| `planner` | Creates implementation plans |
| `executor` | Implements code changes |
| `tester` | Writes and runs tests |
| `documenter` | Creates documentation |
| `reviewer` | Reviews code for issues |
| `ticket-manager` | Manages tickets and epics |

::: info
Community agents cannot be modified directly. Duplicate them to create customized versions.
:::

## Agent Sessions

When you start a conversation with an agent, a **session** is created:

```typescript
interface AgentSession {
  id: string;           // Unique session ID
  agentId?: string;     // Agent ID (undefined for plain chat)
  status: AgentSessionStatus;
  input: any;           // Input provided to agent
  output: any;          // Structured output
  messages: AgentMessage[];
  claudeCodeSessionId?: string;  // For branching/continuation
  linkedTicketId?: string;       // Linked ticket
  linkedEpicId?: string;         // Linked epic
  previousSessionId?: string;    // Parent session (for forks)
  startedAt: string;
  completedAt: string | null;
}
```

### Session Statuses

| Status | Description |
|--------|-------------|
| `initializing` | Session is starting |
| `running` | Agent is actively working |
| `paused` | Execution paused |
| `waiting_input` | Waiting for user input |
| `waiting_permission` | Waiting for tool approval |
| `completed` | Finished successfully |
| `failed` | Ended with error |
| `cancelled` | User cancelled |

### Session Operations

**Start New Session:**
```typescript
const { sessionId } = await ipc.invoke('agent:start', {
  agentId: 'my-agent',
  prompt: 'Analyze this codebase',
  context: { /* additional context */ }
});
```

**Continue Session (Same Session):**
```typescript
await ipc.invoke('agent:resume-session', {
  sessionId: existingSessionId,
  message: 'Now focus on the tests'
});
```

**Fork Session (New Branch):**
```typescript
const { sessionId } = await ipc.invoke('agent:branch-from-message', {
  sessionId: existingSessionId,
  messageId: targetMessageId,
  message: 'Try a different approach'
});
```

## Extended Thinking

Agents support Claude's extended thinking capabilities:

| Level | Token Budget | Description |
|-------|-------------|-------------|
| `off` | 0 | No extended thinking |
| `think` | 1,024 | Light reasoning |
| `think-hard` | 10,000 | Deep analysis |
| `think-harder` | 16,000 | Intensive reasoning |
| `ultrathink` | 32,000 | Maximum depth |

Configure in agent definition:

```yaml
thinkingLevel: think-hard
```

::: tip
Customize the default thinking level and token budgets in **Settings → AI Providers**.
:::

## MCP Server Integration

Agents can connect to [MCP servers](/features/mcp) for extended capabilities:

```yaml
mcpServers:
  - sciorex-tickets        # Built-in ticket management
  - sciorex-interactions   # Built-in user interactions
  - arxiv-mcp              # Custom: Academic paper search
  - github-mcp             # Custom: GitHub integration
```

The `sciorex-tickets` server is included by default, giving agents access to ticket management tools.

## Example Agents

### Paper Researcher

```yaml
name: Paper Researcher
provider: claude-code
model: claude-sonnet-4-5-20250929
icon: 📄
description: Finds and analyzes academic papers

systemPrompt: |
  You find and analyze academic papers. For each paper:
  1. Summarize the key contributions
  2. Identify methodology
  3. Note limitations
  4. Suggest related work

allowedTools:
  - tool: WebSearch
    allowed: true
  - tool: Read
    allowed: true
  - tool: Write
    allowed: true

mcpServers:
  - arxiv-mcp
  - semantic-scholar-mcp
```

### Code Reviewer

```yaml
name: Code Reviewer
provider: claude-code
model: claude-opus-4-5-20251101
icon: 🔍
description: Reviews code for quality, security, and best practices

systemPrompt: |
  You review code for quality, security, and best practices.
  Focus on:
  - Security vulnerabilities
  - Performance issues
  - Code maintainability
  - Test coverage
  
  Provide actionable feedback with specific line references.

allowedTools:
  - tool: Read
    allowed: true
  - tool: Grep
    allowed: true
  - tool: Bash
    allowed: true
    constraints:
      allowedCommands:
        - git
        - npm
        - eslint
        - tsc

thinkingLevel: think-hard
```

### Data Analyst

```yaml
name: Data Analyst
provider: google-gemini
model: gemini-2.5-flash
icon: 📊
description: Analyzes datasets and produces insights

systemPrompt: |
  You analyze datasets and produce insights.
  Always visualize findings when possible.
  Use statistical methods appropriately.
  Explain your methodology clearly.

mcpServers:
  - pandas-mcp
  - matplotlib-mcp

allowedTools:
  - tool: Read
    allowed: true
  - tool: Write
    allowed: true
  - tool: Bash
    allowed: true
    constraints:
      allowedCommands:
        - python
        - pip
```

## Best Practices

::: tip Keep prompts focused
Each agent should have a clear, specific purpose. Create multiple specialized agents rather than one generalist.
:::

::: tip Use input/output schemas
Define schemas to ensure consistent data flow, especially when using agents in Flows.
:::

::: warning Tool permissions
Be careful with auto-approve settings. Only enable for safe, read-only tools. Always require approval for:
- `Write` - File modifications
- `Bash` - Shell commands
- `Edit` / `MultiEdit` - Code changes
:::

::: tip Organize with labels
Use labels to categorize agents by purpose (research, coding, review) or project.
:::

## Using Agents in Flows

Agents can be used as nodes in [Flows](/features/flows/overview) for automated pipelines:

```
Trigger (Daily)
    ↓
Paper Researcher Agent
    ↓
Summarizer Agent
    ↓
Create Ticket (sciorex_create_ticket)
```

See [Flow Nodes](/features/flows/nodes) for details on configuring agent nodes.

## Next Steps

- [AI Backend Architecture](/architecture/ai-backend) - How agents execute
- [MCP Servers](/features/mcp) - Extend agent capabilities
- [Flow Editor](/features/flows/overview) - Automate agent workflows
- [Chat Interface](/features/chat) - Interactive agent conversations
