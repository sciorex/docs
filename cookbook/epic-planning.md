# Epic Planning with AI

Use AI agents to break down large projects into manageable epics and tickets.

**Difficulty**: Intermediate
**Time**: 20 minutes

## What You'll Build

A workflow to:
- Analyze project requirements
- Create structured epics
- Generate detailed tickets
- Estimate and prioritize work

![Epic Planning](/images/cookbook/epic-planning.svg)
*TBD: Replace with screenshot of epic planning session*

## Prerequisites

- Sciorex installed
- Understanding of [Epics and Tickets](/guide/concepts/tickets)
- Familiarity with [Agents](/guide/concepts/agents)

## What is an Epic?

Epics are large bodies of work containing multiple tickets:

```
Epic: User Authentication System
├── T-001: Design auth database schema
├── T-002: Implement login/logout API
├── T-003: Create login UI
├── T-004: Add password reset flow
├── T-005: Implement OAuth providers
├── T-006: Add 2FA support
└── T-007: Write auth documentation
```

## Step 1: Create a Planning Agent

```yaml
name: Project Planner
description: Breaks down projects into epics and tickets

systemPrompt: |
  You are an experienced technical project manager and architect.

  When given a project or feature description:

  1. **Understand Scope**
     - Identify core requirements
     - Note technical constraints
     - Consider dependencies

  2. **Create Epics**
     - Group related work
     - Define clear boundaries
     - Keep epics focused (2-4 weeks of work)

  3. **Generate Tickets**
     - Break epics into actionable tickets
     - Each ticket = 1-3 days of work
     - Include clear acceptance criteria

  4. **Sequence Work**
     - Identify dependencies
     - Suggest priority order
     - Note parallelization opportunities

  5. **Estimate**
     - Provide relative sizing (S/M/L/XL)
     - Flag high-risk items
     - Note unknowns

  Output structured plans that can be directly imported.

model: claude-opus-4-5-20251101
thinkingLevel: think-hard

mcpServers:
  - sciorex-tickets
  - sciorex-interactions

allowedTools:
  - Read
  - Glob
  - Grep
  - WebSearch
```

## Step 2: Plan a Project

### Start the Planning Session

```
You: I need to add a complete notification system to our app.
     Users should receive notifications for:
     - New messages
     - @mentions
     - Task assignments
     - System announcements

     Notifications should be:
     - Real-time (in-app)
     - Email (digest and immediate)
     - Push (mobile)
     - Configurable per user

     We use React frontend, Node.js backend, PostgreSQL database.
```

### Agent Creates the Plan

The agent analyzes and produces:

```markdown
# Notification System - Project Plan

## Overview
Building a multi-channel notification system with real-time,
email, and push capabilities.

## Epics

### Epic 1: Core Notification Infrastructure
**Duration**: 2 weeks
**Priority**: Critical (blocks all other work)

Tickets:
1. **Database Schema Design** (M)
   - Notifications table
   - User preferences table
   - Delivery tracking

2. **Notification Service** (L)
   - Create/read/update/delete notifications
   - Batch operations
   - Cleanup jobs

3. **Event System** (M)
   - Event types enum
   - Publisher interface
   - Subscriber pattern

### Epic 2: Real-time In-App Notifications
**Duration**: 1.5 weeks
**Priority**: High

Tickets:
1. **WebSocket Setup** (M)
   - Socket.io integration
   - Authentication
   - Reconnection handling

2. **Notification Bell UI** (S)
   - Badge counter
   - Dropdown list
   - Mark as read

3. **Toast Notifications** (S)
   - Non-blocking alerts
   - Auto-dismiss
   - Action buttons

### Epic 3: Email Notifications
**Duration**: 1 week
**Priority**: Medium

...

### Epic 4: Push Notifications
**Duration**: 1 week
**Priority**: Medium

...

### Epic 5: User Preferences
**Duration**: 1 week
**Priority**: Medium

...

## Dependency Graph

```
Epic 1 (Core) ──┬──▶ Epic 2 (Real-time)
                │
                ├──▶ Epic 3 (Email)
                │
                └──▶ Epic 4 (Push)
                          │
Epic 5 (Preferences) ◀────┘
```

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| WebSocket scaling | Consider Redis pub/sub |
| Email deliverability | Use established service (SendGrid) |
| Push token management | Clear documentation |

## Recommended Approach

1. Start with Epic 1 (foundation)
2. Parallel: Epic 2 + Epic 3
3. Epic 4 (can start after Epic 2 patterns established)
4. Epic 5 (depends on understanding all channels)
```

## Step 3: Create Tickets from Plan

### Manual Creation

Review the plan and create tickets manually:

1. Go to **Tickets**
2. Create each epic
3. Add tickets to epics

### Automated Creation

Ask the agent to create tickets directly:

```
You: This plan looks good. Create the epics and tickets in Sciorex.
     Start with Epic 1.
```

The agent uses MCP tools:

```
Agent: I'll create Epic 1 and its tickets.

[Creating Epic: Core Notification Infrastructure]
Created: E-001

[Creating Ticket: Database Schema Design]
Created: T-001, linked to E-001

[Creating Ticket: Notification Service]
Created: T-002, linked to E-001

[Creating Ticket: Event System]
Created: T-003, linked to E-001

Epic 1 is ready. Should I continue with Epic 2?
```

## Step 4: Refine and Adjust

### Add Details

```
You: Expand T-002 (Notification Service) with more specific
     acceptance criteria and technical requirements.
```

### Adjust Estimates

```
You: T-003 seems too large. Can you break it into smaller tickets?
```

### Reorder Priorities

```
You: Actually, we need email notifications before real-time.
     Adjust the priority order.
```

## Planning Prompts

### For New Features

```
Plan the implementation of [feature].
Consider our current stack: [technologies].
Break into epics of 2-4 weeks each.
```

### For Technical Debt

```
We need to refactor [component/system].
Current issues: [problems].
Create a phased approach with minimal disruption.
```

### For Bug Backlogs

```
Triage and organize these bugs: [list]
Group into themes, prioritize by impact.
Create a sprint plan.
```

### For Migrations

```
Plan migration from [old] to [new].
Requirements: zero downtime, data integrity.
Include rollback strategy.
```

## Epic Templates

### Feature Epic

```yaml
name: [Feature Name]
type: epic
description: |
  ## Goal
  [What this achieves]

  ## Success Metrics
  - [Metric 1]
  - [Metric 2]

  ## Scope
  ### In Scope
  - [Item]

  ### Out of Scope
  - [Item]

  ## Dependencies
  - [Dependency]
```

### Technical Epic

```yaml
name: [Technical Initiative]
type: epic
description: |
  ## Problem
  [Current issue]

  ## Solution
  [Proposed approach]

  ## Impact
  - Performance: [improvement]
  - Maintenance: [improvement]

  ## Risks
  - [Risk and mitigation]
```

## Best Practices

### Epic Sizing

| Size | Duration | Tickets |
|------|----------|---------|
| Small | 1 week | 3-5 |
| Medium | 2 weeks | 5-8 |
| Large | 3-4 weeks | 8-12 |

Avoid epics longer than 4 weeks—split them.

### Ticket Quality

Good tickets have:
- Clear title (action + target)
- Detailed description
- Acceptance criteria (checkboxes)
- Estimated size
- Dependencies noted

### Progressive Detailing

```
1. High-level plan (epics only)
2. First epic detailed (full tickets)
3. Detail next epic when current is 50% done
4. Adjust based on learnings
```

### Review Cycles

```
Weekly: Review epic progress
Bi-weekly: Adjust priorities
Monthly: Revisit long-term plan
```

## Example: Complete Planning Session

```
You: We're building a marketplace. Sellers list products,
     buyers purchase them. We need:
     - Product listings with images
     - Shopping cart
     - Checkout with Stripe
     - Order management
     - Seller dashboard
     - Reviews and ratings

Agent: I'll create a comprehensive plan for the marketplace.

[Thinking deeply about architecture, user flows,
 and technical requirements...]

Here's my recommended breakdown:

## Phase 1: Foundation (4 weeks)
- Epic: Product Catalog (2 weeks)
- Epic: User Accounts & Roles (2 weeks)

## Phase 2: Commerce (4 weeks)
- Epic: Shopping Cart (1.5 weeks)
- Epic: Checkout & Payments (2.5 weeks)

## Phase 3: Operations (3 weeks)
- Epic: Order Management (1.5 weeks)
- Epic: Seller Dashboard (1.5 weeks)

## Phase 4: Engagement (2 weeks)
- Epic: Reviews & Ratings (2 weeks)

Total: ~13 weeks to MVP

Shall I detail Phase 1 with full ticket breakdowns?
```

## Related

- [Ticket-Driven Development](/cookbook/ticket-driven-dev)
- [Linking Chats to Tickets](/cookbook/chat-ticket-linking)
- [Tickets Reference](/features/ticketing)
- [Research Pipeline](/cookbook/research-pipeline)
