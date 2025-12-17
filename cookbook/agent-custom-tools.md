# Agent with Custom Tools

Configure agents with specific tool permissions and MCP integrations for specialized tasks.

**Difficulty**: Intermediate
**Time**: 10 minutes

## What You'll Build

Learn to:
- Configure tool permissions per agent
- Mix built-in and MCP tools
- Set up auto-approval for trusted operations
- Create specialized agents with focused capabilities

![Agent Tools Configuration](/images/cookbook/agent-custom-tools.svg)
*TBD: Replace with screenshot of agent tool configuration*

## Prerequisites

- Sciorex installed
- Understanding of [Agents](/guide/concepts/agents) and [MCP](/guide/concepts/mcp)

## Understanding Tool Types

### Built-in Claude Tools

These come with Claude Code:

| Tool | Permission Level | Description |
|------|-----------------|-------------|
| `Read` | Safe | Read file contents |
| `Glob` | Safe | Find files by pattern |
| `Grep` | Safe | Search file contents |
| `WebSearch` | Safe | Search the web |
| `WebFetch` | Safe | Fetch URL content |
| `Write` | Dangerous | Create/overwrite files |
| `Edit` | Dangerous | Modify existing files |
| `Bash` | Dangerous | Execute shell commands |

### Sciorex MCP Tools

Built-in MCP servers:

| Server | Tools |
|--------|-------|
| `sciorex-tickets` | Create, update, query tickets |
| `sciorex-interactions` | Ask user, notify, request approval |
| `sciorex-resources` | Manage agents and flows |

## Example 1: Read-Only Research Agent

An agent that can research but never modify anything:

```yaml
name: Research Assistant
description: Searches and summarizes information

systemPrompt: |
  You are a research assistant. Search for information,
  read files, and provide summaries. You cannot modify
  any files or run commands.

model: claude-sonnet-4-5-20250929
thinkingLevel: think

allowedTools:
  - Read
  - Glob
  - Grep
  - WebSearch
  - WebFetch
```

This agent:
- Can read any file
- Can search the codebase
- Can search the web
- Cannot write, edit, or execute commands

## Example 2: Code Editor Agent

An agent that can modify code with some guardrails:

```yaml
name: Code Editor
description: Makes code changes with review

systemPrompt: |
  You are a code editor. Make changes as requested.
  Always explain what you're changing and why.

model: claude-sonnet-4-5-20250929
thinkingLevel: think

allowedTools:
  - Read
  - Glob
  - Grep
  - Write
  - Edit

# These tools are auto-approved (no confirmation needed)
autoApproveTools:
  - Read
  - Glob
  - Grep

# These tools always require confirmation
requiresHumanApproval:
  - Write
  - Edit
```

This agent:
- Can read freely (auto-approved)
- Must ask before writing/editing
- Cannot run shell commands

## Example 3: DevOps Agent

An agent with shell access for operations tasks:

```yaml
name: DevOps Assistant
description: Helps with deployment and operations

systemPrompt: |
  You are a DevOps assistant. Help with:
  - Running tests
  - Building projects
  - Checking logs
  - Deployment tasks

  Always confirm before running destructive commands.

model: claude-opus-4-5-20251101
thinkingLevel: think-hard

allowedTools:
  - Read
  - Glob
  - Grep
  - Bash
  - Write

autoApproveTools:
  - Read
  - Glob
  - Grep

# Patterns for auto-approved bash commands
bashAutoApprove:
  - "npm test"
  - "npm run build"
  - "git status"
  - "git log"
  - "docker ps"
```

## Example 4: Ticket Manager Agent

An agent focused on ticket operations:

```yaml
name: Ticket Manager
description: Creates and manages tickets

systemPrompt: |
  You help manage project tickets. You can:
  - Create new tickets from discussions
  - Update ticket status and details
  - Link related tickets
  - Add subtasks

  Always provide ticket IDs when referencing tickets.

model: claude-sonnet-4-5-20250929

mcpServers:
  - sciorex-tickets

allowedTools:
  - Read
  - Glob
  - Grep
```

This agent:
- Has access to all ticket MCP tools
- Can read code for context
- Cannot modify code directly

## Example 5: Interactive Agent

An agent that can ask for clarification:

```yaml
name: Interactive Helper
description: Asks clarifying questions when needed

systemPrompt: |
  You help with various tasks. When requirements
  are unclear, use the ask_user tool to get
  clarification before proceeding.

  Always confirm before making significant changes.

model: claude-sonnet-4-5-20250929

mcpServers:
  - sciorex-interactions
  - sciorex-tickets

allowedTools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
```

Usage in chat:

```
Agent: I see you want to refactor the auth module.
       There are two approaches:
       1. Extract a separate AuthService class
       2. Use functional composition

       [Asking user for preference...]

User: Let's go with option 1

Agent: Great, I'll create the AuthService class...
```

## Example 6: Full-Stack Agent

An agent with broad capabilities for complex tasks:

```yaml
name: Full-Stack Developer
description: Handles complex development tasks

systemPrompt: |
  You are a senior full-stack developer. You can:
  - Read and modify any code
  - Run build and test commands
  - Create and update tickets
  - Ask for clarification when needed

  Best practices:
  - Run tests after changes
  - Create tickets for follow-up work
  - Ask before making architectural decisions

model: claude-opus-4-5-20251101
thinkingLevel: think-hard

mcpServers:
  - sciorex-tickets
  - sciorex-interactions

allowedTools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - WebSearch

autoApproveTools:
  - Read
  - Glob
  - Grep
  - WebSearch
```

## Tool Permission Strategies

### Least Privilege

Start with minimal tools, add as needed:

```yaml
# Start here
allowedTools:
  - Read
  - Glob
  - Grep

# Add as needed
# - Edit     # After proving reliability
# - Write    # For specific use cases
# - Bash     # Only if necessary
```

### Task-Specific

Match tools to the task:

| Task | Required Tools |
|------|----------------|
| Code review | Read, Glob, Grep |
| Bug fix | Read, Edit, Bash (tests) |
| New feature | Read, Write, Edit, Bash |
| Research | Read, WebSearch, WebFetch |
| Ticket work | sciorex-tickets |

### Progressive Trust

Increase permissions as you verify behavior:

1. **Testing**: Read-only + manual approval for all writes
2. **Development**: Auto-approve safe operations
3. **Production**: Full trust with logging

## Best Practices

1. **Start restrictive**: Begin with minimal tools
2. **Add incrementally**: Grant more access as needed
3. **Use auto-approve wisely**: Only for truly safe operations
4. **Separate concerns**: Create specialized agents
5. **Review regularly**: Audit agent capabilities periodically

## Related

- [Creating Your First Agent](/cookbook/first-agent)
- [Building a Custom MCP Server](/cookbook/custom-mcp)
- [Tool Permissions Reference](/features/agents#tool-permissions)
- [MCP Servers](/features/mcp)
