# Quick Start

Get up and running with Sciorex in 5 minutes! 🚀

## Step 1: Create Your First Agent

1. Open Sciorex and select a workspace
2. Click **Agents** in the sidebar
3. Click **New Agent**
4. Configure your agent:

```yaml
Name: Research Assistant
Model: Claude Sonnet
System Prompt: |
  You are a research assistant specialized in finding 
  and summarizing academic papers. Always cite sources.
```

5. Click **Create Agent**

## Step 2: Start a Conversation

1. Go to **Chat** in the sidebar
2. Click **New Chat**
3. Select your "Research Assistant" agent
4. Type a message:

```
Find the latest papers on transformer architectures 
for time series forecasting
```

5. Watch your agent work! 🤖

## Step 3: Create a Ticket

1. Go to **Tickets** in the sidebar
2. Click **New Ticket**
3. Fill in the details:

```yaml
Title: Review transformer papers
Description: Summarize findings from research assistant
Status: Backlog
```

4. Link the ticket to your chat conversation

## Step 4: Build a Simple Flow

1. Go to **Flows** in the sidebar
2. Click **New Flow**
3. Drag nodes onto the canvas:

```
┌──────────┐    ┌────────────────┐    ┌──────────┐
│  Trigger │───▶│ Research Agent │───▶│  Output  │
│ (Manual) │    │                │    │          │
└──────────┘    └────────────────┘    └──────────┘
```

4. Configure the Research Agent node:
   - Select your "Research Assistant" agent
   - Set input: <code v-pre>{{trigger.input}}</code>
5. Save and run the flow!

## What's Next?

Now that you've got the basics, explore more:

### Cookbook Recipes
- [Your First Agent](/cookbook/first-agent) - Detailed agent creation tutorial
- [Code Review Agent](/cookbook/code-review-agent) - Build a practical code reviewer
- [Research Pipeline](/cookbook/research-pipeline) - Multi-agent research workflow

### Learn the Concepts
- [Understanding Agents](/guide/concepts/agents)
- [Understanding Workflows](/guide/concepts/workflows)
- [Understanding Tickets](/guide/concepts/tickets)
- [Understanding MCP Tools](/guide/concepts/mcp)

### Feature Deep Dives
- [AI Agents Reference](/features/agents)
- [Flow Editor Reference](/features/flows/overview)
- [Ticketing System Reference](/features/ticketing)
- [MCP Servers Reference](/features/mcp)

### Reference
- [Models Comparison](/reference/models) - Choose the right Claude model
- [FAQ](/guide/faq) - Common questions answered
- [Troubleshooting](/guide/troubleshooting) - Solve common issues

::: tip Need help?
Join our [Discord community](https://discord.gg/sciorex) for support and tips!
:::
