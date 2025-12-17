# Ticket-Driven Development

Use tickets to guide AI agents through structured development workflows.

**Difficulty**: Intermediate
**Time**: 15 minutes

## What You'll Build

A workflow that:
- Uses tickets to define work
- Has agents implement changes
- Tracks progress automatically
- Links conversations to tickets

![Ticket-Driven Development](/images/cookbook/ticket-driven-dev.svg)
*TBD: Replace with screenshot of ticket-driven workflow*

## Prerequisites

- Sciorex installed
- Understanding of [Tickets](/guide/concepts/tickets)
- Familiarity with [Agents](/guide/concepts/agents)

## The Workflow

```
┌──────────┐    ┌───────────┐    ┌──────────┐    ┌──────────┐
│  Create  │───▶│   Plan    │───▶│ Implement│───▶│  Review  │
│  Ticket  │    │   Agent   │    │   Agent  │    │   Agent  │
└──────────┘    └───────────┘    └──────────┘    └──────────┘
      │               │               │               │
      └───────────────┴───────────────┴───────────────┘
                      All linked to ticket
```

## Step 1: Create a Well-Structured Ticket

Good tickets guide agents effectively.

### Ticket Structure

```yaml
id: T-042
title: Add user profile avatar upload
type: feature
priority: medium
status: planned

description: |
  ## Overview
  Users should be able to upload and change their profile avatar.

  ## Requirements
  - Accept JPEG, PNG, GIF (max 5MB)
  - Crop to square aspect ratio
  - Store in cloud storage
  - Display in header and profile page

  ## Technical Notes
  - Use existing FileUpload component
  - Store in S3 bucket
  - Generate thumbnails (64px, 128px, 256px)

  ## Acceptance Criteria
  - [ ] User can upload image from profile settings
  - [ ] Image is cropped to square
  - [ ] Thumbnails are generated
  - [ ] Avatar displays throughout app
  - [ ] Old avatar is replaced on re-upload

subtasks:
  - title: Design upload UI
    status: pending
  - title: Implement backend upload endpoint
    status: pending
  - title: Add image processing
    status: pending
  - title: Update profile display components
    status: pending
  - title: Write tests
    status: pending
```

## Step 2: Create Development Agents

### Planning Agent

```yaml
name: Technical Planner
description: Creates implementation plans from tickets

systemPrompt: |
  You are a senior developer creating implementation plans.

  Given a ticket:
  1. Analyze requirements thoroughly
  2. Break down into concrete tasks
  3. Identify dependencies and order
  4. Note potential challenges
  5. Estimate complexity

  Output a detailed, actionable plan.

model: claude-opus-4-5-20251101
thinkingLevel: think-hard

mcpServers:
  - sciorex-tickets

allowedTools:
  - Read
  - Glob
  - Grep
```

### Implementation Agent

```yaml
name: Feature Developer
description: Implements features based on plans

systemPrompt: |
  You are a skilled developer implementing features.

  Follow the plan closely:
  - Write clean, tested code
  - Follow existing patterns
  - Update subtask status as you progress
  - Ask for clarification when needed

model: claude-sonnet-4-5-20250929
thinkingLevel: think

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
```

### Review Agent

```yaml
name: Code Reviewer
description: Reviews implementations against requirements

systemPrompt: |
  You are a thorough code reviewer.

  Check implementations against:
  - Ticket requirements
  - Acceptance criteria
  - Code quality standards
  - Test coverage

  Provide specific, actionable feedback.

model: claude-sonnet-4-5-20250929
thinkingLevel: think

mcpServers:
  - sciorex-tickets
```

## Step 3: The Development Session

### Start with Planning

1. Open a chat with **Technical Planner**
2. Link to the ticket
3. Request a plan:

```
Plan the implementation for ticket T-042 (avatar upload feature).
Review the existing codebase for relevant patterns.
```

The agent will:
- Read the ticket details
- Explore the codebase
- Create a detailed plan

### Implement with Tracking

1. Switch to **Feature Developer**
2. Continue in the same ticket context:

```
Implement the plan for T-042. Start with the first subtask.
Update subtask status as you complete each one.
```

The agent will:
- Follow the plan
- Write code
- Mark subtasks complete via MCP
- Ask questions when stuck

### Review Before Completion

1. Switch to **Code Reviewer**
2. Request review:

```
Review the implementation for T-042 against the requirements.
Check all acceptance criteria are met.
```

## Step 4: Automate with a Flow

Create a flow for repeatable ticket processing:

```
┌────────────┐    ┌──────────┐    ┌───────────┐    ┌────────────┐
│ Ticket     │───▶│ Planner  │───▶│ Developer │───▶│ Condition  │
│ Created    │    │ Agent    │    │ Agent     │    │ (passed?)  │
└────────────┘    └──────────┘    └───────────┘    └────────────┘
                                                         │
                                        ┌────────────────┼────────────────┐
                                        ▼                                 ▼
                                   [passed]                          [failed]
                                        │                                 │
                                        ▼                                 ▼
                                 ┌──────────┐                      ┌──────────┐
                                 │ Mark Done│                      │ Fix Loop │
                                 └──────────┘                      └──────────┘
```

### Flow Configuration

```yaml
name: Ticket Development Pipeline
trigger:
  type: ticketStatusChanged
  fromStatus: planned
  toStatus: in_progress

nodes:
  - id: plan
    type: agent
    agent: technical-planner
    input: "Create implementation plan for ticket {{trigger.ticket.id}}"

  - id: implement
    type: agent
    agent: feature-developer
    input: |
      Implement based on this plan:
      {{nodes.plan.output}}

      Ticket: {{trigger.ticket.id}}

  - id: review
    type: agent
    agent: code-reviewer
    input: "Review implementation for {{trigger.ticket.id}}"

  - id: checkPassed
    type: condition
    expression: "nodes.review.output.passed === true"

  - id: markDone
    type: ticketAction
    action: changeStatus
    ticketId: "{{trigger.ticket.id}}"
    status: done
```

## Best Practices

### Ticket Quality

| Element | Purpose |
|---------|---------|
| Clear title | Quick identification |
| Detailed description | Full context |
| Acceptance criteria | Definition of done |
| Technical notes | Implementation hints |
| Subtasks | Progress tracking |

### Agent Instructions

- Reference ticket explicitly: "for ticket T-042"
- Request status updates: "mark subtasks complete"
- Ask for ticket context: "read the ticket requirements"

### Session Linking

Always link sessions to tickets:
1. Set ticket context before starting
2. Or archive completed sessions to tickets

## Example: Bug Fix Workflow

```yaml
# Ticket
id: T-099
title: Fix login timeout on slow connections
type: bug
priority: high

description: |
  Users on slow connections get logged out unexpectedly.

  ## Steps to Reproduce
  1. Throttle network to 3G
  2. Attempt login
  3. Wait 10 seconds

  ## Expected
  Login completes successfully

  ## Actual
  Session times out, user sees error

  ## Technical Context
  - Auth timeout is 5 seconds
  - Should be increased or made configurable
```

**Agent conversation:**

```
You: Fix bug T-099. Read the ticket and investigate the issue.

Agent: I've read ticket T-099. The issue is a 5-second auth timeout.
       Let me search for the timeout configuration...

       Found it in src/config/auth.ts:15
       The AUTH_TIMEOUT is hardcoded at 5000ms.

       I'll make this configurable with a higher default.
       [Makes changes]

       Done. I've:
       1. Added AUTH_TIMEOUT to environment config
       2. Set default to 30000ms (30 seconds)
       3. Updated the auth service to use the config

       Marking ticket as ready for review.
```

## Tips

- **Write good tickets**: Garbage in, garbage out
- **Use subtasks**: Break work into trackable pieces
- **Link everything**: Sessions, commits, discussions
- **Review before closing**: Verify requirements are met
- **Update status**: Keep tickets current

## Related

- [Linking Chats to Tickets](/cookbook/chat-ticket-linking)
- [Epic Planning with AI](/cookbook/epic-planning)
- [Tickets Reference](/features/ticketing)
- [MCP Servers](/features/mcp)
