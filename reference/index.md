# Reference

Quick reference documentation for Sciorex.

## Models

- [Models Comparison](/reference/models) - Choose the right Claude model

## Configuration

- [Agent YAML Schema](/features/agents#configuration-reference) - Full agent configuration
- [Flow JSON Schema](/features/flows/overview#flow-schema) - Flow definition format
- [Settings Reference](/guide/settings) - Application settings

## Tools

### Built-in Claude Tools

| Tool | Description |
|------|-------------|
| `Bash` | Execute shell commands |
| `Read` | Read file contents |
| `Write` | Create or overwrite files |
| `Edit` | Make targeted edits |
| `Glob` | Find files by pattern |
| `Grep` | Search file contents |
| `WebFetch` | Fetch URL content |
| `WebSearch` | Search the web |
| `Task` | Run sub-agents |
| `TodoWrite` | Manage task lists |

### Sciorex MCP Tools

| Tool | Server | Description |
|------|--------|-------------|
| `sciorex_create_ticket` | sciorex-tickets | Create a ticket |
| `sciorex_update_ticket` | sciorex-tickets | Update ticket fields |
| `sciorex_change_status` | sciorex-tickets | Change ticket status |
| `sciorex_ask_user` | sciorex-interactions | Ask user a question |
| `sciorex_notify_user` | sciorex-interactions | Send notification |
| `sciorex_save_agent` | sciorex-resources | Create/update agent |
| `sciorex_save_flow` | sciorex-resources | Create/update flow |

See [MCP Servers](/features/mcp) for full documentation.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Enter` | Send message |
| `Ctrl/Cmd + K` | Open command palette |
| `Ctrl/Cmd + /` | Toggle sidebar |
| `Ctrl/Cmd + N` | New chat |
| `Ctrl/Cmd + ,` | Open settings |
| `Escape` | Cancel current action |

## Status Codes

### Ticket Status

| Status | Description |
|--------|-------------|
| `backlog` | Not yet planned |
| `planned` | Ready to work on |
| `in_progress` | Currently being worked on |
| `in_review` | Awaiting review |
| `done` | Completed |
| `cancelled` | Won't be done |

### Session Status

| Status | Description |
|--------|-------------|
| `idle` | Ready for input |
| `running` | Processing |
| `paused` | Temporarily stopped |
| `completed` | Finished successfully |
| `failed` | Ended with error |
| `cancelled` | Manually stopped |
