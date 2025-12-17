# Agent Runs

The Agent Runs view shows the history of all agent sessions in your workspace. It's where you track what your agents have done, review their outputs, and manage session history.

## Accessing Agent Runs

Click **Agent Runs** in the sidebar or press `Ctrl+6` to open the view.

## Session List

The main panel shows all agent sessions with:

| Column | Description |
|--------|-------------|
| **Agent** | Which agent ran (with icon) |
| **Status** | Current state of the session |
| **Started** | When the session began |
| **Duration** | How long it ran |
| **Linked Ticket** | Associated ticket (if any) |

### Session Statuses

| Status | Meaning |
|--------|---------|
| **Running** | Agent is currently working |
| **Completed** | Finished successfully |
| **Failed** | Ended with an error |
| **Cancelled** | Stopped by user |
| **Waiting** | Paused for input or approval |

## Session Details

Click a session to view its details:

### Messages Tab

Shows the full conversation:

- User prompts
- Agent responses
- Tool calls with inputs and results
- Thinking blocks (if extended thinking was enabled)

### Output Tab

Shows the structured output from the agent (if the agent has an output schema defined).

### Activity Tab

Shows a timeline of events:

- When the session started
- Tool executions
- Permission requests
- Errors or warnings
- When it completed

## Actions

### Continue Session

If a session is waiting for input or was paused, click **Continue** to resume it.

### Fork Session

Create a new branch from any point in the session:

1. Find the message you want to branch from
2. Click the fork icon
3. Enter your new prompt
4. A new session starts from that point

### Link to Ticket

Associate a session with a ticket:

1. Click the session options menu
2. Select **Link to Ticket**
3. Choose a ticket from the dropdown

The session will appear in the ticket's Sessions tab.

### Archive

Archive completed sessions to keep your workspace clean:

1. Click the session options menu
2. Select **Archive**
3. Optionally link to a ticket for reference

Archived sessions remain accessible from linked tickets.

## Filtering

Filter the session list by:

| Filter | Options |
|--------|---------|
| **Agent** | Show sessions for a specific agent |
| **Status** | Filter by status (Running, Completed, Failed, etc.) |
| **Time** | Today, This Week, This Month, All |
| **Ticket** | Show sessions linked to a specific ticket |

## Bulk Actions

Select multiple sessions to:

- Archive them together
- Delete them
- Export their outputs

## Comparison with Chat

Agent Runs and Chat both show conversations with Claude, but:

| Agent Runs | Chat |
|------------|------|
| Sessions with defined agents | Free-form conversations |
| Structured input/output | Natural conversation |
| Often automated or triggered | Always user-initiated |
| Shows in Agent Runs view | Shows in Chat view |

Both can be linked to tickets and both support branching.

## Related

- [AI Agents](/features/agents) for creating and configuring agents
- [Tickets](/features/ticketing) for linking sessions to work items
- [Chat](/features/chat) for free-form conversations
