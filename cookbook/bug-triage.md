# Bug Triage System

Automate bug categorization, priority assignment, and routing with AI agents.

**Difficulty**: Intermediate
**Time**: 15 minutes

## What You'll Build

A flow that:
- Analyzes incoming bug reports
- Categorizes by type (UI, API, Performance, Security, etc.)
- Assigns priority based on severity and impact
- Routes to appropriate team or creates tickets

![Bug Triage Flow](/images/cookbook/bug-triage.svg)
*TBD: Replace with screenshot of the bug triage flow*

## Prerequisites

- Sciorex installed
- Understanding of [Agents](/guide/concepts/agents) and [Flows](/guide/concepts/workflows)
- Familiarity with [Tickets](/guide/concepts/tickets)

## Overview

```
┌──────────┐    ┌───────────┐    ┌──────────┐    ┌────────────┐
│  New Bug │───▶│  Analyze  │───▶│ Prioritize│───▶│  Create    │
│  Report  │    │   Agent   │    │   Agent   │    │  Ticket    │
└──────────┘    └───────────┘    └──────────┘    └────────────┘
```

## Step 1: Create the Agents

### Bug Analyzer Agent

```yaml
name: Bug Analyzer
description: Analyzes bug reports and categorizes them

systemPrompt: |
  You are a bug triage specialist. Given a bug report:

  1. Identify the type of bug:
     - UI/UX: Visual issues, layout problems
     - API: Backend errors, data issues
     - Performance: Slow responses, memory leaks
     - Security: Vulnerabilities, auth issues
     - Data: Corruption, sync problems
     - Integration: Third-party service issues

  2. Extract key information:
     - Affected component/feature
     - Steps to reproduce
     - Expected vs actual behavior
     - Environment details

  3. Identify any missing information needed for debugging

  Return structured analysis that can be used for prioritization.

model: claude-sonnet-4-5-20250929
thinkingLevel: think

outputSchema:
  type: object
  properties:
    category:
      type: string
      enum: [ui, api, performance, security, data, integration, other]
    component:
      type: string
    severity:
      type: string
      enum: [critical, high, medium, low]
    reproducible:
      type: boolean
    missingInfo:
      type: array
      items:
        type: string
    summary:
      type: string
```

### Priority Assigner Agent

```yaml
name: Priority Assigner
description: Assigns priority and routes bugs

systemPrompt: |
  You are responsible for bug prioritization. Given the analysis:

  Assign priority based on:
  - **Critical**: System down, data loss, security breach
  - **High**: Major feature broken, significant user impact
  - **Medium**: Feature degraded, workaround exists
  - **Low**: Minor issues, cosmetic problems

  Consider:
  - Number of users affected
  - Business impact
  - Security implications
  - Whether there's a workaround

  Recommend the appropriate team:
  - frontend: UI/UX issues
  - backend: API/data issues
  - platform: Performance/infrastructure
  - security: Security vulnerabilities

model: claude-sonnet-4-5-20250929
thinkingLevel: think

outputSchema:
  type: object
  properties:
    priority:
      type: string
      enum: [critical, high, medium, low]
    team:
      type: string
    estimatedEffort:
      type: string
      enum: [small, medium, large]
    reasoning:
      type: string
```

## Step 2: Build the Flow

1. Go to **Flows** → **+ New Flow**
2. Name it "Bug Triage"

### Add Nodes

1. **Trigger Node** - "New Bug Report" (Manual or Ticket Created)
2. **Agent Node** - Bug Analyzer
3. **Agent Node** - Priority Assigner
4. **Condition Node** - Check if critical
5. **Ticket Action Node** - Create triaged ticket

### Connect Nodes

```
Trigger → Analyzer → Prioritizer → Condition
                                      │
                    ┌─────────────────┴─────────────────┐
                    ▼                                   ▼
              [Critical]                          [Not Critical]
                    │                                   │
                    ▼                                   ▼
            Notify + Create                       Create Ticket
              High-Pri Ticket
```

### Configure the Condition

Check if the bug is critical:
```
{{nodes.prioritizer.output.priority}} === "critical"
```

## Step 3: Configure Ticket Creation

For the Ticket Action node:

```json
{
  "title": "{{trigger.input.title}}",
  "type": "bug",
  "priority": "{{nodes.prioritizer.output.priority}}",
  "description": "## Analysis\n{{nodes.analyzer.output.summary}}\n\n## Category\n{{nodes.analyzer.output.category}}\n\n## Team\n{{nodes.prioritizer.output.team}}",
  "labels": ["triaged", "{{nodes.analyzer.output.category}}"]
}
```

## Step 4: Test the Flow

1. Click **Run** in the flow editor
2. Enter a sample bug report:

```json
{
  "title": "Login page crashes on mobile",
  "description": "When I try to log in on my iPhone, the page freezes and then crashes. This happens every time. I'm using Safari on iOS 17.",
  "reporter": "user@example.com"
}
```

3. Watch the flow categorize, prioritize, and create a ticket

## Example Output

After running the flow:

**Analyzer Output:**
```json
{
  "category": "ui",
  "component": "authentication/login",
  "severity": "high",
  "reproducible": true,
  "missingInfo": ["iOS version", "App version"],
  "summary": "Mobile Safari login crash affecting iOS users"
}
```

**Prioritizer Output:**
```json
{
  "priority": "high",
  "team": "frontend",
  "estimatedEffort": "medium",
  "reasoning": "Login is critical functionality. Mobile users are blocked from using the app."
}
```

## Variations

### Add Duplicate Detection

Insert a node before analysis to check for similar existing bugs:

```yaml
name: Duplicate Checker
systemPrompt: |
  Search existing tickets for similar issues.
  Return any potential duplicates with similarity score.
```

### Add Auto-Assignment

Extend the flow to automatically assign based on team:

```
Prioritizer → Condition (by team) → Assign to team lead
```

### Integrate with Slack

Add a notification node for critical bugs:

```yaml
# Requires Slack MCP server
mcpServers:
  - slack-mcp
```

## Tips

- **Tune the prompts**: Adjust categorization based on your project's structure
- **Add context**: Include your codebase structure to improve component identification
- **Review regularly**: Check triage accuracy and refine prompts
- **Handle edge cases**: Add conditions for incomplete bug reports

## Related

- [Creating Your First Agent](/cookbook/first-agent)
- [Ticket-Driven Development](/cookbook/ticket-driven-dev)
- [Flows Overview](/features/flows/overview)
- [MCP Servers](/features/mcp)
