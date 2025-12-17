# Understanding Agents

Agents are specialized AI assistants you configure for specific tasks. Think of them as team members with different expertise: one for research, another for code review, another for writing documentation.

## What Makes an Agent?

Each agent has:

| Component | Purpose |
|-----------|---------|
| **System Prompt** | Instructions that define its personality and expertise |
| **Model** | Which Claude model powers it (Sonnet, Opus, or Haiku) |
| **Tools** | What actions it can perform (read files, search web, run commands) |
| **Permissions** | Which actions need your approval before executing |

## When to Use Agents vs Plain Chat

| Use Agents when... | Use Plain Chat when... |
|--------------------|------------------------|
| You have a recurring task type | You have a one-off question |
| You want consistent behavior | You want flexibility |
| You're building automated flows | You're exploring ideas |
| Multiple people need the same assistant | You're just you |

## Creating Your First Agent

1. Go to **Agents** in the sidebar
2. Click **New Agent**
3. Give it a name and description
4. Write a system prompt explaining what it should do
5. Select which tools it can use
6. Save

**Example prompt for a research agent:**

```
You are a research assistant. When given a topic:
1. Search for recent papers and articles
2. Summarize the key findings
3. Note any controversies or open questions
4. Suggest further reading

Always cite your sources.
```

## Tool Permissions

Agents can use various tools, but you control which ones:

**Safe to auto-approve:**
- `Read` (viewing files)
- `Glob` (finding files)
- `Grep` (searching in files)
- `WebSearch` (searching online)

**Require approval:**
- `Write` (creating/modifying files)
- `Edit` (changing existing files)
- `Bash` (running shell commands)

::: warning
Be cautious with auto-approving `Bash` commands. An agent with unrestricted shell access can modify your system.
:::

## Community Agents

Sciorex provides access to a community marketplace with pre-configured agents you can install:

| Agent | What it does |
|-------|--------------|
| **Orchestrator** | Breaks down complex tasks and coordinates work |
| **Planner** | Creates step-by-step implementation plans |
| **Executor** | Implements code changes |
| **Tester** | Writes and runs tests |
| **Documenter** | Creates documentation |
| **Reviewer** | Reviews code for issues |

You cannot edit community agents directly, but you can duplicate them as a starting point for your own.

## Sessions and History

Every conversation with an agent creates a **session**. Sessions:

- Save the full conversation history
- Can be linked to tickets for tracking
- Can be branched to explore different approaches
- Are stored locally in your workspace

## Next Steps

- [Your First Agent](/cookbook/first-agent) - Step-by-step tutorial
- [Code Review Agent](/cookbook/code-review-agent) - Practical example
- [Full agent configuration reference](/features/agents)
- [Models comparison](/reference/models) - Choose the right model
- [Using agents in automated flows](/guide/concepts/workflows)
