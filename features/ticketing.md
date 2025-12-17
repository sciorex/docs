# Ticketing Dashboard

The Ticketing Dashboard is the central hub for managing your work in Sciorex. It provides a powerful Kanban-style board and list view to track tickets, epics, and their linked AI sessions.

## Overview

The Ticket Board allows you to:

- **Create and manage tickets** of various types (features, bugs, tasks, research, documentation, refactors)
- **Organize work into Epics** for larger initiatives
- **Track progress** with subtasks and status transitions
- **Link AI sessions** to tickets for complete context
- **View activity history** to understand what happened and when

::: tip AI Agent Integration
AI agents can manage tickets programmatically using the [sciorex-tickets MCP server](/features/mcp#sciorex-tickets-server). This enables autonomous ticket creation, status updates, subtask management, and progress tracking.
:::

## Views

### Kanban Board View

The Kanban board presents your tickets organized by status columns:

| Column | Description |
|--------|-------------|
| **Backlog** | Tickets waiting to be scheduled |
| **Planned** | Tickets scheduled for work |
| **In Progress** | Tickets actively being worked on |
| **In Review** | Tickets awaiting review |
| **Done** | Completed tickets |

Each ticket card displays:
- Type icon (✨ Feature, 🐛 Bug, 📋 Task, 🔬 Research, 📄 Documentation, 🔧 Refactor)
- Ticket ID in monospace format
- Priority indicator (colored dot)
- Title (up to 2 lines)
- Epic badge (if assigned)
- Blocker warning (if blocked by other tickets)
- Linked session count
- Subtask progress bar

**Drag and Drop**: You can drag tickets between columns to change their status. Valid transitions are enforced automatically.

### List View

The List view shows tickets in a sortable table with the following columns:

| Column | Sortable | Description |
|--------|----------|-------------|
| ID | ✅ | Unique ticket identifier |
| Title | ✅ | Ticket title with description preview |
| Status | ✅ | Current workflow status |
| Priority | ✅ | Priority level (Critical, High, Medium, Low) |
| Type | ✅ | Ticket type with icon |
| Epic | ✅ | Parent epic (if any) |
| Sessions | ❌ | Number of linked AI sessions |
| Updated | ✅ | Last modification date |

Click any column header to sort. Click again to reverse the order.

## Filtering

The filter bar at the top of the board provides powerful filtering options:

### Search
Type in the search box to filter tickets by:
- Title (partial match)
- Description (partial match)
- Ticket ID

::: tip Fast Search
The search is debounced (300ms delay) for performance. Start typing and results update automatically.
:::

### Filter Dropdowns

| Filter | Options |
|--------|---------|
| **Epic** | Filter by specific epic, or "All Epics" |
| **Type** | Feature, Bug, Task, Research, Documentation, Refactor |
| **Priority** | Critical, High, Medium, Low |

### Clear Filters
Click the **Clear** button to reset all filters at once.

---

# Creating Tickets

## Via the New Button

1. Click the **+ New** button in the filter bar
2. Select **Ticket** from the dropdown
3. Fill in the ticket form:

### Ticket Form Fields

| Field | Required | Description |
|-------|----------|-------------|
| **Title** | ✅ | Brief, descriptive title |
| **Type** | ❌ | Default: Task. Choose from dropdown |
| **Priority** | ❌ | Default: Medium. Choose from dropdown |
| **Epic** | ❌ | Optionally assign to an epic |
| **Description** | ❌ | Detailed description, acceptance criteria, notes |
| **Subtasks** | ❌ | Break work into smaller items |

### Adding Subtasks

When creating a new ticket:
1. Type subtask title in the input field
2. Press **Enter** or click **Add**
3. Repeat for additional subtasks
4. Click ✕ to remove a subtask before creating

::: info Subtasks After Creation
Once the ticket is created, you can still add, remove, and toggle subtasks from the ticket detail panel.
:::

---

# Epics

Epics are containers for grouping related tickets. They help organize larger initiatives or projects.

## Creating an Epic

1. Click **+ New** → **Epic**
2. Enter the epic title (required)
3. Add an optional description
4. Click **Create Epic**

## Epic Progress

Each epic automatically tracks its progress:
- **Total tickets** assigned to the epic
- **Completed tickets** (status = "Done")
- **Percentage** shown in the filter dropdown

Example display: `Authentication System (4/7)` means 4 of 7 tickets are complete.

## Assigning Tickets to Epics

You can assign tickets to epics:
- **When creating**: Select from the Epic dropdown in the ticket form
- **When editing**: Open the ticket detail panel, click the epic badge, and select a new epic

---

# Ticket Detail Panel

Click any ticket to open its detail panel. This panel provides full control over the ticket.

## Header Section

The header displays:
- **Ticket ID** (e.g., `T-001`)
- **Status dropdown** - Click to transition to an allowed status
- **Type dropdown** - Change the ticket type
- **Priority dropdown** - Adjust priority level
- **Edit/Save buttons** - Toggle edit mode for title and description
- **Epic badge** - Click to change or add to epic

### Status Transitions

Not all status changes are allowed. Valid transitions are:

| From | Allowed To |
|------|------------|
| Backlog | Planned, Cancelled |
| Planned | Backlog, In Progress, Cancelled |
| In Progress | Planned, In Review, Done, Cancelled |
| In Review | In Progress, Done, Cancelled |
| Done | In Progress |
| Cancelled | Backlog |

## Tabs

The detail panel has three tabs:

### Details Tab

Contains:
- **Description** - View or edit the ticket description
- **Subtasks** - Toggle completion, add new, or remove subtasks
- **Relationships** - Add tickets that block this one, or related tickets
- **Metadata** - Created date, updated date, and completion date

### Sessions Tab

Shows all AI sessions linked to this ticket:

| Information | Description |
|-------------|-------------|
| **Session type icon** | 🤖 Agent Session or 💬 Chat Session |
| **Title** | Session title or first 15 words of first message |
| **Last updated** | When the session was last active |
| **Message count** | Number of messages in the session |
| **Archived badge** | Shows if the session is archived |

**Click a session** to open it:
- Active agent sessions → Opens in Agent Runs view
- Active chat sessions → Opens in Chat view
- Archived sessions → Opens in a review modal

::: tip Linking Sessions
Sessions are linked from the Chat view when you have a ticket context. This creates a complete audit trail of AI work.
:::

### Activity Tab

The activity timeline shows the complete history of changes:

| Action | Icon | Example |
|--------|------|---------|
| Created | ➕ | "Ticket created" |
| Updated | ✏️ | "Updated description" |
| Status changed | 🔄 | "Status changed from backlog to in_progress" |
| Blocker added | 🚫 | "Added blocker: T-003" |
| Blocker removed | ✅ | "Removed blocker: T-003" |
| Subtask added | 📝 | "Added subtask: Review PR" |
| Subtask completed | ✓ | "Completed subtask: Write tests" |
| Epic changed | 🎯 | "Assigned to epic: Authentication" |
| Agent started | ▶️ | "Agent session started" |
| Agent completed | ✅ | "Agent session completed" |
| Agent failed | ❌ | "Agent session failed: timeout" |

Each entry shows:
- Action description
- Time ago / date
- Actor (User, AI Agent, or System)
- Link to session (if applicable)

## Footer Actions

- **Delete ticket** - Permanently removes the ticket (confirmation required)
- **Run Flow** - Launch a flow to automate work on this ticket

---

# Linking Sessions to Tickets

One of Sciorex's most powerful features is the ability to link AI conversations directly to tickets. This creates complete traceability of all work done.

## How It Works

1. **From Chat View**: When you start a conversation, you can select an associated ticket
2. **Session records**: All messages, tool uses, and outputs are captured
3. **Ticket linkage**: The session appears in the ticket's Sessions tab
4. **Activity tracking**: Agent start/complete/fail events are recorded in ticket history

## Session Types

| Type | Description | View Location |
|------|-------------|---------------|
| **Chat Session** | Manual conversation with AI | Chat page |
| **Agent Session** | Automated agent run with tool use | Agent Runs page |
| **Archived Session** | Past session (no longer active) | Modal viewer |

## Viewing Linked Sessions

From the ticket detail:
1. Click the **Sessions** tab
2. See all linked sessions sorted by most recent
3. Click any session to view its full content

The session card shows:
- Type indicator (Agent or Chat)
- Title or first message preview
- Last updated date
- Message count
- Archived status

---

# Archive of Sessions

Archived sessions are historical records of completed or abandoned AI interactions. They remain linked to their tickets for future reference.

## Archive Features

- **Full message history** - All user and AI messages
- **Tool execution logs** - What tools were called and their results
- **Timestamps** - When each action occurred
- **Link preservation** - Always accessible from the linked ticket

## Accessing Archived Sessions

Archived sessions can be accessed:
1. From the ticket's Sessions tab (marked with "Archived" badge)
2. From the Agent Runs history
3. From the Chat session history

When you click an archived session, it opens in a modal viewer that shows:
- Complete conversation history
- Tool calls and results
- Final status (completed, failed, cancelled)

---

# Subtasks

Subtasks allow you to break tickets into smaller, trackable items.

## Managing Subtasks

From the ticket detail panel:

### Adding Subtasks
1. Click **+ Add subtask** below the subtask list
2. Type the subtask title
3. Press **Enter** or click **Add**

### Completing Subtasks
- Click the checkbox next to any subtask
- The progress bar updates automatically
- Completion is recorded in the activity timeline

### Removing Subtasks
- Hover over a subtask
- Click the ✕ button that appears

## Progress Tracking

The subtask section shows:
- **Progress bar** - Visual fill based on completion percentage
- **Counter** - e.g., "3/5" meaning 3 of 5 complete

On ticket cards in the Kanban board, a mini progress bar shows the same information.

---

# Relationships

Tickets can have relationships with other tickets to model dependencies and associations.

## Blocked By

Use "Blocked By" when this ticket cannot proceed until another ticket is completed.

Example: Bug fix T-015 is blocked by T-012 (the root cause investigation).

**Visual indicator**: Tickets with blockers show:
- A red left border on the Kanban card
- A warning icon (⚠️) in the bottom-left

## Related To

Use "Related To" for general associations without dependency:
- Reference tickets
- Similar issues
- Related features

## Adding Relationships

1. Open the ticket detail panel
2. Scroll to the Relationships section
3. Click **+ Add** next to "Blocked By" or "Related To"
4. Enter the ticket ID (e.g., `T-003`)
5. Press **Enter** or click **Add**

## Removing Relationships

1. Hover over the relationship
2. Click the ✕ button

---

# Ticket Types

Choose the appropriate type to categorize your work:

| Type | Icon | Use For |
|------|------|---------|
| **Feature** | ✨ | New functionality or enhancements |
| **Bug** | 🐛 | Defects and issues to fix |
| **Task** | 📋 | General work items |
| **Research** | 🔬 | Investigation, analysis, discovery |
| **Documentation** | 📄 | Docs, guides, comments |
| **Refactor** | 🔧 | Code improvements without behavior change |

## Default Type

When creating tickets without specifying a type, **Task** is used as the default.

---

# Priority Levels

Priority helps you focus on what matters most:

| Priority | Color | Urgency |
|----------|-------|---------|
| **Critical** | 🔴 Red | Blocker, needs immediate attention |
| **High** | 🟠 Orange | Important, should be done soon |
| **Medium** | 🟡 Yellow | Normal, can be scheduled |
| **Low** | ⚪ Gray | Minor, nice to have |

## Visual Indicators

- Priority appears as a colored dot on ticket cards
- Higher priorities sort first within each Kanban column
- Filter by priority using the board filter dropdown

---

# Customizing Ticket & Epic IDs

You can customize the naming convention for tickets and epics to match your team's preferences.

## Accessing Settings

1. Click the **⚙️ Settings** icon in the sidebar (or press `Ctrl/Cmd + ,`)
2. Select the **Tickets** category from the sidebar
3. Find the **Ticket Configuration** section

## Available Options

### Ticket Prefix

The prefix used for ticket IDs. By default, this is `T`, resulting in IDs like `T-001`, `T-002`, etc.

**Examples of custom prefixes:**
- `TASK` → `TASK-001`, `TASK-002`
- `ISSUE` → `ISSUE-001`, `ISSUE-002`
- `#` → `#-001`, `#-002`
- Your project abbreviation: `APP` → `APP-001`

::: tip Maximum Length
Prefixes can be up to 5 characters long.
:::

### Epic Prefix

The prefix used for epic IDs. By default, this is `E`, resulting in IDs like `E-001`, `E-002`, etc.

**Examples:**
- `EPIC` → `EPIC-001`
- `PRJ` → `PRJ-001`
- `MILESTONE` → `MILEST-001` (truncated to 5 chars)

### Auto-Increment Start Number

The starting number for newly created tickets and epics. Default is `1`.

Change this if you:
- Are migrating from another system with existing IDs
- Want to continue numbering from a specific point
- Prefer a different starting number (e.g., `100`)

## How to Change

1. Open **Settings** → **Tickets**
2. Modify the **Ticket Prefix** field (e.g., change `T` to `TASK`)
3. Modify the **Epic Prefix** field (e.g., change `E` to `EPIC`)
4. Optionally adjust the **Auto-increment Start Number**
5. Click **Save** at the bottom of the settings panel

## Important Notes

::: warning Existing Tickets
Changing the prefix **does not** rename existing tickets. Only new tickets will use the new prefix. Your existing `T-001` will remain `T-001`.
:::

::: info File Names
The YAML file names in `.sciorex/tickets/` will also reflect the new prefix for new tickets (e.g., `TASK-001.yaml`).
:::

## Configuration File

These settings are stored in your workspace configuration and can be changed in **Settings → Tickets**.

See the full [Settings Reference](/guide/settings#tickets) for all ticket options.

---

# Data Storage

Sciorex stores all ticket data locally in your project's `.sciorex/` directory.

## File Structure

```
.sciorex/
├── tickets/
│   ├── T-001.yaml        # Individual ticket files
│   ├── T-002.yaml
│   └── ...
├── epics/
│   ├── E-001.yaml        # Individual epic files
│   └── ...
├── sessions/
│   ├── session-abc123.json   # Session data with messages
│   └── ...
└── config/
    └── settings.yaml     # Project-level settings
```

## Ticket File Format

Each ticket is stored as a YAML file:

```yaml
# .sciorex/tickets/T-001.yaml
id: T-001
title: Implement user authentication
description: |
  Add login/logout functionality with JWT tokens.
  Must support OAuth providers.
type: feature
priority: high
status: in_progress
labels:
  - backend
  - security
epicId: E-001
parentId: null
blockedBy: []
relatesTo:
  - T-002
subtasks:
  - id: sub-001
    title: Design API endpoints
    completed: true
    completedAt: "2024-12-06T10:30:00Z"
  - id: sub-002
    title: Implement JWT middleware
    completed: false
    completedAt: null
assignedFlowId: null
lastSessionId: session-abc123
createdAt: "2024-12-01T09:00:00Z"
updatedAt: "2024-12-06T15:45:00Z"
completedAt: null
history:
  - timestamp: "2024-12-01T09:00:00Z"
    action: created
    details: {}
    actor:
      type: user
      id: default
  - timestamp: "2024-12-05T14:00:00Z"
    action: status_changed
    details:
      from: backlog
      to: in_progress
    actor:
      type: user
      id: default
```

## Epic File Format

```yaml
# .sciorex/epics/E-001.yaml
id: E-001
title: User Management System
description: Complete user auth and profile management
status: in_progress
createdAt: "2024-12-01T08:00:00Z"
updatedAt: "2024-12-06T15:45:00Z"
completedAt: null
```

::: tip Version Control
The `.sciorex/` directory can be committed to Git. This allows team collaboration and history tracking with standard Git workflows.
:::

---

# Dashboard Integration

Tickets integrate with the Sciorex dashboard to provide an overview of your work.

## Quick Access List

The dashboard shows your most recently updated items, including:
- Recent tickets with their current status
- Active flows
- Configured agents

Each item displays:
- Type icon (ticket, flow, or agent)
- Title
- Current status badge
- Time since last update

Click any item to navigate directly to it.

## Stats Cards

Dashboard stats may include ticket metrics such as:
- **Total Tickets** - Overall count with breakdown by status
- **In Progress** - Active work items
- **Completed This Week** - Recent accomplishments
- **Blocked Tickets** - Items needing attention

## Navigation

From the dashboard, you can:
- Click "View All" on any section to go to the full view
- Click individual items to open their details
- See change indicators (+/- since last period)

---

# Real-Time Updates

Sciorex automatically watches for changes to ticket files and updates the UI in real-time.

## How It Works

1. **File Watching**: The application monitors the `.sciorex/` directory
2. **Change Detection**: When a `.yaml` file is modified, created, or deleted
3. **Automatic Refresh**: The ticket board reloads affected data
4. **UI Update**: New data appears without manual refresh

## Scenarios

| Change Type | Result |
|-------------|--------|
| Edit ticket in external editor | Board updates automatically |
| Git pull with ticket changes | Board refreshes on file change |
| Another process modifies files | Changes appear in UI |
| Create ticket via file | Ticket appears on board |

## Subscription Events

The UI subscribes to these events:
- `ticket` category changes → Ticket list reload
- `epic` category changes → Epic list reload
- `config` category changes → Full configuration reload

::: warning External Edits
If you edit `.yaml` files directly, ensure they remain valid YAML. Invalid syntax will cause load errors.
:::

---

# Troubleshooting

## Common Issues

### Tickets Not Loading

**Symptoms**: Board shows loading spinner indefinitely or displays error.

**Solutions**:
1. Check that `.sciorex/` directory exists in your project
2. Verify YAML files are valid (no syntax errors)
3. Check console for specific error messages
4. Try reloading the application

### Drag and Drop Not Working

**Symptoms**: Tickets don't move when dragged between columns.

**Solutions**:
1. Ensure you're dragging to a valid status transition
2. Check if the ticket has blockers (blocked tickets may have restricted transitions)
3. Verify you have write access to the ticket file

### Sessions Not Appearing

**Symptoms**: Linked sessions don't show in the Sessions tab.

**Solutions**:
1. Ensure the session has `linkedTicketId` set correctly
2. Check that the session file exists in `.sciorex/sessions/`
3. Try switching tabs and back to trigger a reload

### Changes Not Persisting

**Symptoms**: Edits seem to save but revert after refresh.

**Solutions**:
1. Check file permissions on `.sciorex/` directory
2. Look for error notifications in the UI
3. Check console for IPC errors
4. Verify disk space is available

### Filters Not Working

**Symptoms**: Filtering doesn't narrow down the ticket list.

**Solutions**:
1. Click "Clear" to reset all filters
2. Check that filtered values actually exist in your tickets
3. Search terms must match title, description, or ID

## Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| "Failed to load tickets" | IPC call failed | Restart application |
| "Ticket not found" | Missing .yaml file | Check file exists |
| "Invalid status transition" | Workflow rule violation | Use allowed transitions |
| "Failed to create ticket" | Write permission issue | Check directory permissions |

## Getting Help

If issues persist:
1. Check the application logs in the Settings → Debug panel
2. Report issues on [GitHub](https://github.com/sciorex)
3. Join the community [Discord](https://discord.gg/sciorex)

---

# Keyboard Shortcuts

| Shortcut | Action | Context |
|----------|--------|---------|
| `Escape` | Close ticket detail panel | When panel is open |
| `Ctrl/Cmd + ,` | Open Settings | Global |

::: info Future Shortcuts
More keyboard shortcuts are planned for a future release, including quick navigation between tickets and rapid status transitions.
:::

---

# Best Practices

## Ticket Management

::: tip Keep tickets focused
Each ticket should represent a single, deliverable piece of work. If a ticket feels too large, break it into subtasks or split it into multiple tickets.
:::

::: tip Write clear titles
Use descriptive, action-oriented titles. "Fix login bug" is better than "Bug #42".
:::

::: tip Add context in descriptions
Include acceptance criteria, steps to reproduce (for bugs), or technical requirements. This helps AI agents understand the task better.
:::

## Using Epics

::: tip Use epics for themes
Group related tickets under epics to track larger initiatives. This makes reporting and progress tracking much easier.
:::

::: warning Clean up completed epics
When all tickets in an epic are done, mark the epic as completed to keep your workspace organized.
:::

## Session Linking

::: tip Link your sessions
Always link AI conversations to relevant tickets. This creates an invaluable record of research, decisions, and implementation details.
:::

::: tip Review session history
Before starting new work on a ticket, review linked sessions to understand previous context and decisions.
:::

## Workflow Tips

::: tip Update status regularly
Move tickets through the Kanban board as work progresses. This keeps the board accurate and helps you see the true state of your project.
:::

::: tip Use blockers wisely
Only mark tickets as blocked when there's a genuine dependency. Overusing blockers creates unnecessary complexity.
:::

---

# Next Steps

- [Creating Agents](/features/agents) - Set up AI agents to work on your tickets
- [Visual Flow Editor](/features/flows/overview) - Build automated workflows
- [Getting Started Guide](/guide/getting-started) - Complete setup walkthrough

