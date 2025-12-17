# Understanding MCP Tools

MCP (Model Context Protocol) is how agents interact with external systems. It's the bridge between "the AI wants to do something" and "the thing actually gets done."

## What is MCP?

MCP servers provide tools that agents can use. Think of them as plugins:

- **sciorex-tickets** gives agents the ability to create and manage tickets
- **sciorex-interactions** lets agents ask you questions
- **sciorex-resources** lets agents create and modify other agents and flows
- A GitHub MCP could let agents create pull requests
- A Slack MCP could let agents send messages

## Built-in MCP Servers

Sciorex includes three MCP servers out of the box, plus one internal server for permissions:

### sciorex-tickets

Tools for working with your ticket system:

| Tool | What it does |
|------|--------------|
| `sciorex_create_ticket` | Create a new ticket |
| `sciorex_get_ticket` | Get ticket details |
| `sciorex_update_ticket` | Modify a ticket |
| `sciorex_change_status` | Move ticket through workflow |
| `sciorex_add_subtask` | Add a subtask |
| `sciorex_complete_subtask` | Mark subtask done |
| `sciorex_list_tickets` | Find tickets with filters |
| `sciorex_search_tickets` | Search by text |

### sciorex-interactions

Tools for communicating with you:

| Tool | What it does |
|------|--------------|
| `sciorex_ask_user` | Ask a question and wait for your answer |
| `sciorex_notify_user` | Send a notification |
| `sciorex_request_approval` | Request approval before proceeding |

### sciorex-resources

Tools for managing agents and flows programmatically:

| Tool | What it does |
|------|--------------|
| `sciorex_list_agents` | List all available agents |
| `sciorex_get_agent` | Get an agent's YAML definition |
| `sciorex_save_agent` | Create or update an agent |
| `sciorex_delete_agent` | Delete an agent |
| `sciorex_list_flows` | List all available flows |
| `sciorex_get_flow` | Get a flow's JSON definition |
| `sciorex_save_flow` | Create or update a flow |
| `sciorex_delete_flow` | Delete a flow |

## How Agents Use Tools

When an agent needs to do something, it calls a tool:

```
Agent: "I need to create a ticket for this bug."
       → calls sciorex_create_ticket with title and description
       → ticket T-007 is created
       → agent continues with the ticket ID
```

You control which tools each agent can access in the agent configuration.

## Enabling Tools in Chat

When chatting directly (not using a specific agent), you can toggle tools:

1. Click the **Tools** button in the chat input
2. Enable or disable specific tools
3. Tools you enable become available for that session

## Permission Modes

You decide how much autonomy agents have:

| Mode | Behavior |
|------|----------|
| **Ask for all** | Every tool call requires your approval |
| **Auto-approve edits** | File operations are automatic, commands need approval |
| **YOLO Mode** | Everything runs automatically (use with caution) |

## Adding Custom MCP Servers

You can add MCP servers from the community or build your own. Configure them in your Claude Code settings:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/server.js"]
    }
  }
}
```

Once configured, the tools appear in Sciorex automatically.

## Common MCP Servers

The MCP ecosystem is growing. Some popular options:

| Server | Capabilities |
|--------|--------------|
| **GitHub** | Issues, PRs, repositories |
| **Slack** | Messages, channels |
| **PostgreSQL** | Database queries |
| **Filesystem** | Extended file operations |

Check the [MCP registry](https://github.com/modelcontextprotocol/servers) for community servers.

## Best Practices

**Start with built-in tools.** The ticket and interaction tools cover most needs.

**Limit tool access.** Only give agents the tools they actually need.

**Require approval for destructive actions.** Creating is safer than deleting.

**Test custom MCPs carefully.** Make sure they handle errors gracefully.

## Next Steps

- [Full MCP reference](/features/mcp)
- [Configuring agent tools](/features/agents#tool-permissions)
- [MCP in flows](/features/flows/overview#agent-node)
