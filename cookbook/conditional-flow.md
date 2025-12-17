# Conditional Branching

Add decision logic to your flows with conditions and branches.

**Difficulty**: Intermediate
**Time**: 15 minutes

## What You'll Build

A flow that:
- Evaluates conditions
- Routes to different paths
- Handles multiple outcomes

![Conditional Flow](/images/cookbook/conditional-flow.svg)
*TBD: Replace with screenshot of conditional flow*

## Prerequisites

- Completed [Simple Sequential Flow](/cookbook/simple-flow)
- Understanding of flow basics

## Understanding Conditions

Condition nodes evaluate expressions and route to different paths:

```
           ┌──── [true] ──── Path A
Condition ─┤
           └──── [false] ─── Path B
```

## Step 1: Create the Flow

1. Go to **Flows** → **+ New Flow**
2. Name it "Support Ticket Router"

## Step 2: Add Initial Nodes

```
┌──────────┐    ┌───────────┐    ┌───────────┐
│  Trigger │───▶│  Analyze  │───▶│ Condition │
│          │    │   Agent   │    │           │
└──────────┘    └───────────┘    └───────────┘
```

**Trigger:**
```yaml
triggerType: manual
inputSchema:
  type: object
  properties:
    message:
      type: string
    priority:
      type: string
      enum: [low, medium, high, critical]
```

**Analyzer Agent:**
```yaml
name: Ticket Analyzer
systemPrompt: |
  Analyze support tickets and categorize:
  - type: bug, feature, question, billing
  - sentiment: positive, neutral, negative, angry
  - complexity: simple, moderate, complex

model: claude-haiku-4-5-20251001

outputSchema:
  type: object
  properties:
    type:
      type: string
    sentiment:
      type: string
    complexity:
      type: string
```

## Step 3: Add the Condition

1. Drag a **Condition** node after the Analyzer
2. Configure the condition expression:

```javascript
nodes.analyzer.output.sentiment === "angry" ||
trigger.input.priority === "critical"
```

This checks if the ticket needs urgent attention.

## Step 4: Create Branch Paths

**True path (Urgent):**
```
Condition ─── [true] ─── Escalation Agent ─── Notify Manager
```

**False path (Normal):**
```
Condition ─── [false] ─── Standard Response Agent ─── Queue
```

### Escalation Path

```yaml
name: Escalation Handler
systemPrompt: |
  Handle urgent tickets with care:
  - Acknowledge the urgency
  - Provide immediate assistance
  - Escalate to human if needed

model: claude-opus-4-5-20251101
thinkingLevel: think
```

### Standard Path

```yaml
name: Standard Responder
systemPrompt: |
  Respond to routine tickets:
  - Answer questions clearly
  - Provide helpful resources
  - Offer next steps

model: claude-sonnet-4-5-20250929
```

## Step 5: Complete Flow Diagram

```
                              ┌── Escalation ── Notify ──┐
Trigger → Analyze → Condition ┤                          ├→ Output
                              └── Standard ── Queue ─────┘
```

## Multiple Conditions

For more than two outcomes, chain conditions:

```
                ┌── [critical] ── Immediate Response
Condition 1 ────┤
                └── Condition 2 ──┬── [high] ── Priority Queue
                                  └── [other] ── Standard Queue
```

### Chained Condition Configuration

**Condition 1:**
```javascript
trigger.input.priority === "critical"
```

**Condition 2:**
```javascript
trigger.input.priority === "high"
```

## Switch-Style Routing

For many branches, use a Transform node with routing logic:

```yaml
# Transform node
const type = nodes.analyzer.output.type;

switch(type) {
  case "bug": return { route: "bug-handler" };
  case "feature": return { route: "feature-handler" };
  case "billing": return { route: "billing-handler" };
  default: return { route: "general-handler" };
}
```

Then use conditions to route:
```javascript
nodes.router.output.route === "bug-handler"
```

## Condition Expressions

### Comparison Operators

| Operator | Meaning |
|----------|---------|
| `===` | Equals (strict) |
| `!==` | Not equals |
| `>`, `<` | Greater/less than |
| `>=`, `<=` | Greater/less or equal |

### Logical Operators

| Operator | Meaning |
|----------|---------|
| `&&` | AND |
| `\|\|` | OR |
| `!` | NOT |

### Examples

```javascript
// Check priority
trigger.input.priority === "high"

// Check multiple conditions
nodes.analyzer.output.type === "bug" &&
nodes.analyzer.output.complexity === "complex"

// Check for presence
nodes.researcher.output.sources?.length > 0

// String matching
nodes.analyzer.output.category.includes("security")
```

## Handling Nulls

Safely handle missing data:

```javascript
// Optional chaining
nodes.analyzer.output?.sentiment === "angry"

// Default values
(nodes.analyzer.output?.priority || "low") === "high"

// Null check
nodes.analyzer.output !== null &&
nodes.analyzer.output.type === "bug"
```

## Merge Branches

Rejoin branches with a Merge node:

```
Path A ───┐
          ├─── Merge ─── Final Output
Path B ───┘
```

The merge node waits for whichever path executed.

## Error Conditions

Add error handling branches:

```javascript
// Check for error
nodes.analyzer.error !== null

// Check for empty output
!nodes.analyzer.output || nodes.analyzer.output === ""
```

## Example: Content Moderation Flow

```
                              ┌── [flagged] ── Human Review
Input → Moderation Agent → ──┤
                              └── [safe] ── Publish
```

**Moderation condition:**
```javascript
nodes.moderator.output.flagged === true ||
nodes.moderator.output.confidence < 0.8
```

## Tips

- **Keep conditions simple**: Complex logic is hard to debug
- **Test both paths**: Verify all branches work
- **Handle edge cases**: What if data is missing?
- **Use meaningful names**: "Is Urgent" not "Condition 1"
- **Document logic**: Add notes explaining decisions

## Related

- [Simple Sequential Flow](/cookbook/simple-flow)
- [Parallel Execution](/cookbook/parallel-flow)
- [Flows Overview](/features/flows/overview)
