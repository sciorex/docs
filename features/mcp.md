# MCP Servers (Model Context Protocol)

Sciorex includes built-in MCP servers that enable AI agents to interact with your workspace, tickets, and user interface. These servers follow the [Model Context Protocol](https://modelcontextprotocol.io/) standard.

## Overview

MCP servers provide tools that Claude can use during conversations and agent runs. Sciorex includes three built-in servers, plus one internal server for permissions:

| Server | Purpose |
|--------|---------|
| **sciorex-tickets** | Manage tickets, epics, subtasks, and track progress |
| **sciorex-interactions** | Ask questions, send notifications, request approvals |
| **sciorex-resources** | Create, read, update, and delete agents and flows |
| **sciorex-permissions** | *(Internal)* Handle permission prompts when MCP permissions are enabled |

## Built-in Claude Tools

In addition to MCP servers, Claude has access to these built-in tools:

| Tool | Description |
|------|-------------|
| `Bash` | Execute shell commands in your environment |
| `BashOutput` | Retrieve output from background bash shells |
| `Read` | Read contents of files |
| `Write` | Create or overwrite files |
| `Edit` | Make targeted edits to specific files |
| `Glob` | Find files based on pattern matching |
| `Grep` | Search for patterns in file contents |
| `WebFetch` | Fetch content from URLs |
| `WebSearch` | Perform web searches with domain filtering |
| `Task` | Run sub-agents for complex multi-step tasks |
| `TodoWrite` | Create and manage structured task lists |
| `AskUserQuestion` | Ask the user multiple choice questions |
| `NotebookEdit` | Modify Jupyter notebook cells |
| `Skill` | Execute skills within the conversation |
| `SlashCommand` | Run custom slash commands |

---

# sciorex-tickets Server

The **sciorex-tickets** MCP server provides comprehensive ticket and epic management capabilities. This server works directly with the [Ticketing System](/features/ticketing).

## Ticket Tools

### sciorex_create_ticket

Create a new ticket in the current workspace.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | ✅ | Ticket title |
| `description` | string | ❌ | Detailed description in markdown |
| `type` | enum | ❌ | `feature`, `bug`, `task`, `research`, `documentation`, `refactor` |
| `priority` | enum | ❌ | `critical`, `high`, `medium`, `low` |
| `epicId` | string | ❌ | Parent epic ID (e.g., "E-001") |
| `labels` | string[] | ❌ | Tags/labels for the ticket |
| `subtasks` | string[] | ❌ | List of subtask titles to create |

**Example:**
```json
{
  "title": "Implement user authentication",
  "description": "Add OAuth2 login flow with Google and GitHub providers",
  "type": "feature",
  "priority": "high",
  "epicId": "E-001",
  "subtasks": ["Design login UI", "Implement OAuth flow", "Add session management"]
}
```

### sciorex_get_ticket

Get full details of a ticket by ID.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ticketId` | string | ✅ | Ticket ID (e.g., "T-001") |

**Returns:** Complete ticket object including subtasks, history, and relationships.

### sciorex_update_ticket

Update one or more fields of a ticket.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ticketId` | string | ✅ | Ticket ID to update |
| `title` | string | ❌ | New title |
| `description` | string | ❌ | New description |
| `type` | enum | ❌ | New type |
| `priority` | enum | ❌ | New priority |
| `labels` | string[] | ❌ | New labels |
| `epicId` | string \| null | ❌ | New epic ID or null to remove |

### sciorex_change_status

Change the status of a ticket. Validates that the transition is allowed.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ticketId` | string | ✅ | Ticket ID |
| `status` | enum | ✅ | `backlog`, `planned`, `in_progress`, `in_review`, `done`, `cancelled` |
| `comment` | string | ❌ | Optional comment explaining the change |

::: warning Valid Transitions
Status changes must follow the allowed transitions. See [Status Transitions](/features/ticketing#status-transitions) for details.
:::

### sciorex_list_tickets

List tickets with optional filters.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | ❌ | Filter by status |
| `type` | string | ❌ | Filter by type |
| `priority` | string | ❌ | Filter by priority |
| `epicId` | string | ❌ | Filter by epic |
| `limit` | number | ❌ | Max tickets to return (default: 50) |

---

## Epic Tools

### sciorex_create_epic

Create a new epic.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | ✅ | Epic title |
| `description` | string | ❌ | Epic description in markdown |

### sciorex_get_epic

Get an epic by ID with its associated tickets.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `epicId` | string | ✅ | Epic ID (e.g., "E-001") |

**Returns:** Epic details plus list of tickets assigned to it.

### sciorex_list_epics

List all epics with progress statistics.

**Parameters:** None required.

**Returns:** All epics with ticket counts and completion percentages.

### sciorex_update_epic

Update an epic's details.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `epicId` | string | ✅ | Epic ID to update |
| `title` | string | ❌ | New title |
| `description` | string | ❌ | New description |
| `status` | enum | ❌ | `open`, `in_progress`, `completed`, `cancelled` |

---

## Subtask Tools

### sciorex_add_subtask

Add a subtask to a ticket.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ticketId` | string | ✅ | Ticket ID (e.g., "T-001") |
| `title` | string | ✅ | Subtask title |

### sciorex_complete_subtask

Mark a subtask as complete (by ID or title match).

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ticketId` | string | ✅ | Ticket ID |
| `subtaskId` | string | ❌ | Subtask ID (takes precedence) |
| `title` | string | ❌ | Subtask title (used for matching) |
| `completed` | boolean | ❌ | Completion status (default: true) |

::: tip Flexible Matching
You can complete subtasks by providing either the exact ID or a partial title match. Title matching is case-insensitive.
:::

### sciorex_list_subtasks

List all subtasks for a ticket with completion status.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ticketId` | string | ✅ | Ticket ID |

**Returns:** Subtasks with summary statistics (total, completed, pending, percentage).

---

## Query Tools

### sciorex_search_tickets

Search tickets by text in title, description, and ID.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ | Search text (case-insensitive) |
| `limit` | number | ❌ | Max results (default: 20) |

### sciorex_get_ready_tickets

Get tickets that are ready to work on (status = "planned" and no blockers).

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | number | ❌ | Max results (default: 10) |
| `priority` | string | ❌ | Filter by priority |
| `type` | string | ❌ | Filter by type |

### sciorex_get_blocked_tickets

Get tickets that are currently blocked.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | number | ❌ | Max results (default: 10) |

---

## Progress Tools

### sciorex_report_progress

Report progress on a ticket. Creates a history entry.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ticketId` | string | ✅ | Ticket ID |
| `message` | string | ✅ | Progress update message |
| `percentage` | number | ❌ | Optional progress percentage (0-100) |

### sciorex_add_comment

Add a comment to a ticket.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ticketId` | string | ✅ | Ticket ID |
| `comment` | string | ✅ | Comment text |

### sciorex_add_blocker

Add a blocker relationship between tickets.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ticketId` | string | ✅ | The ticket being blocked |
| `blockerTicketId` | string | ✅ | The ticket causing the block |
| `reason` | string | ❌ | Reason for the block |

### sciorex_remove_blocker

Remove a blocker from a ticket.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ticketId` | string | ✅ | The ticket being blocked |
| `blockerTicketId` | string | ✅ | The blocker to remove |

---

# sciorex-interactions Server

The **sciorex-interactions** MCP server enables AI agents to communicate with users during execution.

## sciorex_ask_user

Ask the user a question and wait for their response.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `question` | string | ✅ | The question to ask |
| `context` | string | ❌ | Additional context |
| `responseType` | enum | ❌ | `single` (radio), `multiple` (checkbox), `text` (textarea) |
| `options` | string[] | ❌ | Predefined options for selection |
| `allowCustomText` | boolean | ❌ | Show textarea for custom input (default: true) |
| `urgency` | enum | ❌ | `blocking`, `important`, `optional` |
| `placeholder` | string | ❌ | Placeholder text for textarea |

**Example:**
```json
{
  "question": "Which authentication provider should I implement first?",
  "responseType": "single",
  "options": ["Google OAuth", "GitHub OAuth", "Email/Password"],
  "allowCustomText": true,
  "urgency": "important"
}
```

**Returns:**
- `selectedOptions`: Array of selected option strings
- `customText`: User's custom text input
- `skipped`: Whether user skipped the question

## sciorex_notify_user

Send a notification to the user without waiting for response.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | string | ✅ | Notification message |
| `type` | enum | ❌ | `info`, `warning`, `error`, `success` |
| `details` | string | ❌ | Additional details |

## sciorex_request_approval

Request explicit approval before proceeding with an action.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `action` | string | ✅ | Description of proposed action |
| `reason` | string | ✅ | Why this action is needed |
| `alternatives` | string[] | ❌ | Alternative actions if rejected |
| `impact` | enum | ❌ | `low`, `medium`, `high` |

**Example:**
```json
{
  "action": "Delete the legacy authentication module",
  "reason": "It's no longer used since the new OAuth implementation",
  "alternatives": ["Archive instead of delete", "Keep but mark as deprecated"],
  "impact": "high"
}
```

**Returns:**
- `approved`: Whether user approved
- `selectedAlternative`: Alternative chosen (if any)
- `userComment`: User's additional comments

---

# sciorex-resources Server

The **sciorex-resources** MCP server allows AI agents to create, modify, and manage agents and flows programmatically. This enables dynamic workflow creation and agent self-modification.

## Agent Tools

### sciorex_list_agents

List all available agents in the workspace.

**Parameters:** None required.

**Returns:** Array of agents with `id`, `name`, `description`, and `path`.

### sciorex_get_agent

Get the full YAML definition of an agent.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | ✅ | Agent ID (kebab-case, e.g., "code-reviewer") |

**Returns:** The complete YAML content of the agent definition.

### sciorex_save_agent

Create or update an agent definition.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | ✅ | Agent ID (kebab-case) |
| `content` | string | ✅ | Full YAML content of the agent definition |

**Example:**
```json
{
  "id": "code-reviewer",
  "content": "name: Code Reviewer\ndescription: Reviews code for quality and best practices\nsystemPrompt: |\n  You are a code review expert..."
}
```

::: tip Agent Schema
See [Creating Agents](/features/agents) for the full agent YAML schema and available options.
:::

### sciorex_delete_agent

Delete an agent from the workspace.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | ✅ | Agent ID to delete |

---

## Flow Tools

### sciorex_list_flows

List all available flows in the workspace.

**Parameters:** None required.

**Returns:** Array of flows with `id`, `name`, `description`, and `path`.

### sciorex_get_flow

Get the full JSON definition of a flow.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | ✅ | Flow ID |

**Returns:** The complete JSON content of the flow definition.

### sciorex_save_flow

Create or update a flow definition.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | ✅ | Flow ID (kebab-case) |
| `content` | string | ✅ | Full JSON content of the flow definition |

::: tip Flow Schema
See [Flow Editor](/features/flows/overview) for the flow JSON schema and node types.
:::

### sciorex_delete_flow

Delete a flow from the workspace.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | ✅ | Flow ID to delete |

---

# Enabling MCP Tools

## In Chat Sessions

When starting a chat, you can enable MCP tools using the tool selector:

1. Click the **🔧 Tools** button in the chat input area
2. Toggle on the MCP servers you want to enable
3. Optionally select specific tools from each server

## In Agent Definitions

When creating agents, you can configure allowed tools:

```yaml
# In agent definition
allowedTools:
  - mcp__sciorex-tickets__sciorex_create_ticket
  - mcp__sciorex-tickets__sciorex_change_status
  - mcp__sciorex-tickets__sciorex_complete_subtask
  - mcp__sciorex-interactions__sciorex_ask_user
```

## Tool Name Format

MCP tool names follow this pattern:

```
mcp__{server-name}__{tool-name}
```

Examples:
- `mcp__sciorex-tickets__sciorex_create_ticket`
- `mcp__sciorex-tickets__sciorex_get_epic`
- `mcp__sciorex-interactions__sciorex_notify_user`

---

# Tool Discovery

Sciorex automatically discovers available tools from MCP servers at startup and caches them.

## How It Works

1. **Startup**: Sciorex spawns each configured MCP server
2. **Query**: Sends `tools/list` request to discover available tools
3. **Cache**: Stores tool definitions for quick access
4. **UI**: Updates tool selector with available options

## Refreshing Tools

If you add or modify MCP servers:

1. Restart the application, or
2. Open Settings and the tools will be re-discovered

---

# Adding Custom MCP Servers

You can configure additional MCP servers in your Claude Code configuration:

```json
{
  "mcpServers": {
    "my-custom-server": {
      "command": "node",
      "args": ["/path/to/server.js"],
      "env": {
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

Custom servers will be discovered automatically and their tools will appear in the tool selector.

::: tip MCP Ecosystem
There's a growing ecosystem of MCP servers. Check out the [MCP Registry](https://github.com/modelcontextprotocol/servers) for community-contributed servers.
:::

---

# Use Cases

## Ticket Automation

AI agents can work on tickets autonomously:

```markdown
Agent: "Starting work on ticket T-001"
- Uses sciorex_get_ticket to read requirements
- Uses sciorex_change_status to mark as in_progress
- Implements the feature using Bash, Read, Write, Edit
- Uses sciorex_complete_subtask as it finishes each item
- Uses sciorex_report_progress to log updates
- Uses sciorex_change_status to mark as done
```

## Interactive Development

Agents can ask for clarification:

```markdown
Agent: "I found multiple approaches to implement this..."
- Uses sciorex_ask_user with options for user to choose
- Waits for user response
- Proceeds with selected approach
```

## Progress Tracking

Keep stakeholders informed:

```markdown
Agent: "Task 3 of 5 complete"
- Uses sciorex_notify_user to send progress update
- Uses sciorex_report_progress to log in ticket history
- Continues with next task
```

---

# Related Documentation

- [Ticketing Dashboard](/features/ticketing) - Full ticketing documentation
- [Creating Agents](/features/agents) - Configure agents with MCP tools
- [Extended Thinking](/features/agents#extended-thinking) - AI reasoning capabilities
