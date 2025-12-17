# Process Explorer

The Process Explorer shows running processes, background tasks, and resource usage. Use it to monitor what's happening under the hood and manage long-running operations.

## Opening Process Explorer

Access the Process Explorer by:

- Clicking the process indicator in the status bar
- Using the menu: **View → Process Explorer**

::: tip
Configure whether Process Explorer opens as a modal or new window in **Settings → Appearance → Process Explorer Mode**.
:::

## Running Processes

The main panel shows active processes:

| Column | Description |
|--------|-------------|
| **Process** | Name and description |
| **Type** | Chat, Agent, Flow, or Background Task |
| **Status** | Running, Waiting, Completed |
| **Duration** | How long it's been running |
| **Resources** | CPU and memory usage |

## Background Tasks

When Claude runs bash commands in the background, they appear here:

- Command being executed
- Output stream (stdout/stderr)
- Process ID
- Start time

### Managing Background Tasks

| Action | Description |
|--------|-------------|
| **View Output** | See the command's output |
| **Kill** | Terminate the process |
| **Copy Output** | Copy output to clipboard |

## Resource Monitoring

The Process Explorer shows:

- **CPU usage** per process
- **Memory usage** per process
- **Total resources** used by Sciorex

## Claude CLI Processes

Each chat or agent session runs a Claude CLI process. You can see:

- Which sessions have active processes
- Process state (running, waiting for input)
- How long the process has been active

## MCP Servers

The Process Explorer also shows MCP server processes:

- Built-in servers (sciorex-tickets, sciorex-interactions)
- Custom MCP servers you've configured
- Server status and uptime

## Use Cases

**Monitor long-running tasks**: See which background commands are still running.

**Debug stuck sessions**: Identify processes that aren't responding.

**Manage resources**: Kill unnecessary processes to free up resources.

**Track MCP servers**: Ensure your tool servers are running properly.

## Killing Processes

To stop a process:

1. Find it in the Process Explorer
2. Click the **Kill** button
3. Confirm the action

::: warning
Killing a Claude CLI process will cancel the associated chat or agent session. The session will show as "Cancelled".
:::

## Modal vs Window Mode

Choose how Process Explorer opens:

| Mode | Description |
|------|-------------|
| **Modal** | Opens as an overlay in the current window |
| **Window** | Opens in a separate window |

Configure in **Settings → Appearance → Process Explorer Mode**.
