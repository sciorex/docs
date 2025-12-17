# Linking Chats to Tickets

Connect conversations to tickets for complete work history and context.

**Difficulty**: Beginner
**Time**: 5 minutes

## What You'll Learn

How to:
- Link chat sessions to tickets
- Set ticket context before chatting
- Archive sessions to tickets
- View linked conversations

![Chat-Ticket Linking](/images/cookbook/chat-ticket-linking.svg)
*TBD: Replace with screenshot of linked chat and ticket*

## Prerequisites

- Sciorex installed
- At least one ticket created

## Why Link Chats to Tickets?

| Benefit | Description |
|---------|-------------|
| **Context** | Agents understand what they're working on |
| **History** | See all conversations about a ticket |
| **Handoff** | Others can review AI discussions |
| **Audit** | Track how decisions were made |

## Method 1: Set Context Before Chatting

### Step 1: Open or Create a Ticket

1. Go to **Tickets** in the sidebar
2. Open an existing ticket or create a new one
3. Note the ticket ID (e.g., T-042)

### Step 2: Start a Linked Chat

1. Click **Start Chat** from the ticket view

   Or:

1. Go to **Chat**
2. Click **New Chat**
3. Click the **Link to Ticket** button
4. Select your ticket

### Step 3: Chat with Context

Your agent now has ticket context:

```
You: Help me implement this feature

Agent: I see this is for ticket T-042: "Add user profile avatar upload"

Based on the requirements:
- Accept JPEG, PNG, GIF (max 5MB)
- Crop to square aspect ratio
...

Let me start by examining the existing file upload component...
```

The agent automatically:
- Reads ticket details
- References requirements
- Understands the scope

## Method 2: Archive Session to Ticket

Link an existing conversation after the fact.

### Step 1: Complete Your Chat

Have a productive conversation without linking first.

### Step 2: Archive the Session

1. Click the **Archive** button in the chat header
2. In the dialog:
   - Select **Link to Ticket**
   - Choose the relevant ticket
   - Add optional notes
3. Click **Archive**

### Step 3: View in Ticket

The session now appears in the ticket's **Sessions** tab.

## Viewing Linked Sessions

### From Ticket View

1. Open a ticket
2. Click the **Sessions** tab
3. See all linked conversations
4. Click any session to view/resume

### From Chat View

1. Linked tickets show in the chat header
2. Click the ticket ID to jump to ticket view

## Agent Access to Tickets

When linked, agents can:

### Read Ticket Details

The ticket content is available in context:
- Title and description
- Requirements and acceptance criteria
- Subtasks and their status
- Related tickets

### Update Tickets via MCP

With `sciorex-tickets` MCP server:

```yaml
mcpServers:
  - sciorex-tickets
```

Agents can:
- Update ticket status
- Mark subtasks complete
- Add comments
- Create related tickets

### Example Conversation

```
You: What's left to do on this ticket?

Agent: Looking at ticket T-042, here are the remaining subtasks:

☐ Add image processing (pending)
☐ Update profile display components (pending)
☐ Write tests (pending)

The upload UI and backend endpoint are already complete.
Should I start with image processing?

You: Yes, and mark it in progress

Agent: I'll update the subtask status and begin implementing...
[Uses sciorex_update_subtask to mark "Add image processing" as in_progress]

Looking at the requirements, we need to generate thumbnails
at 64px, 128px, and 256px...
```

## Multiple Sessions Per Ticket

Tickets can have multiple linked sessions:

```
T-042: Avatar Upload Feature
├── Session 1: Initial planning (archived)
├── Session 2: Backend implementation (archived)
├── Session 3: Frontend work (active)
└── Session 4: Code review (upcoming)
```

This creates a complete history of how the work evolved.

## Best Practices

### Link Early

Set ticket context at the start of meaningful work:

```
✓ "Help me implement T-042"
✗ "Help me with some file upload thing"
```

### Use Descriptive Archives

When archiving, add notes:

```
Archive note: "Completed backend API, ready for frontend"
```

### Review Before Closing

Check all sessions before marking a ticket done:

```
1. Open ticket
2. Review all linked sessions
3. Verify work is complete
4. Change status to Done
```

### Create Sub-Sessions

For complex tickets, create focused sessions:

```
Session 1: "Plan T-042 implementation"
Session 2: "Implement T-042 backend"
Session 3: "Implement T-042 frontend"
Session 4: "Test T-042"
```

## Automatic Linking

### From Ticket Triggers

Flows triggered by tickets are automatically linked:

```yaml
trigger:
  type: ticketCreated
  # Sessions started by this flow link to the triggering ticket
```

### From Ticket Mentions

Mention a ticket in chat to create a reference:

```
You: This relates to T-042 but is a separate concern

Agent: I'll note the relationship to T-042.
[Adds reference without full linking]
```

## Troubleshooting

### Chat Not Seeing Ticket Context

Check:
- Session is properly linked (look for ticket badge)
- Agent has Read tool enabled
- Ticket file exists and is valid YAML

### Can't Link to Ticket

Check:
- Ticket exists and isn't archived
- You have write permissions
- Ticket ID is correct

### Agent Can't Update Ticket

Check:
- `sciorex-tickets` MCP server is enabled
- Agent has the MCP server configured
- Session has appropriate permissions

## Related

- [Ticket-Driven Development](/cookbook/ticket-driven-dev)
- [Epic Planning with AI](/cookbook/epic-planning)
- [Tickets Reference](/features/ticketing)
- [Chat Reference](/features/chat)
