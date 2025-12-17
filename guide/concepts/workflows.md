# Understanding Workflows (Flows)

Flows let you chain agents together into automated pipelines. Instead of manually running each step, you define the sequence once and let it run on its own.

## What is a Flow?

A flow is a visual diagram that defines:

1. **When to start** (trigger)
2. **What to do** (agents and actions)
3. **How to decide** (conditions)
4. **Where to go next** (connections)

```
┌──────────┐      ┌─────────────┐      ┌─────────────┐
│  Trigger │─────▶│ Agent: Find │─────▶│ Agent: Write│
│  (Daily) │      │   Papers    │      │   Summary   │
└──────────┘      └─────────────┘      └─────────────┘
```

## Common Use Cases

| Flow Type | Example |
|-----------|---------|
| **Research Pipeline** | Find papers → Summarize → Create ticket |
| **Code Review** | Analyze code → Check security → Wait for approval → Merge |
| **Data Processing** | Fetch data → Clean → Analyze → Generate report |
| **Ticket Automation** | New ticket → Triage → Assign → Notify team |

## Building Blocks

### Triggers

Every flow starts with a trigger:

| Trigger | When it fires |
|---------|---------------|
| **Manual** | You click "Run" |
| **Schedule** | At specific times (daily, hourly, etc.) |
| **Ticket Created** | When a new ticket is created |
| **Ticket Updated** | When a ticket changes |

### Nodes

Nodes are the steps in your flow:

| Node Type | What it does |
|-----------|--------------|
| **Agent** | Runs an AI agent with input/output |
| **Condition** | Routes based on a test (if/else) |
| **Wait** | Pauses for human approval or input |
| **Parallel** | Splits into multiple branches |
| **Merge** | Joins branches back together |
| **Ticket Action** | Creates or updates tickets |
| **Transform** | Modifies data between steps |

### Connections

Lines between nodes show the execution order. For condition nodes, you'll have two paths: one for "yes" and one for "no".

## Creating Your First Flow

1. Go to **Flows** in the sidebar
2. Click **New Flow**
3. Drag a **Trigger** node onto the canvas
4. Drag an **Agent** node and connect it
5. Configure each node's settings
6. Click **Save**
7. Click **Run** to test

## Passing Data Between Nodes

Each node can access data from previous nodes using template syntax:

```
{{trigger.input}}           // What started the flow
{{previousNode.output}}     // Output from the last node
{{nodes.myAgent.output}}    // Output from a specific node
```

## Controlling Execution

While a flow runs, you can:

- **Pause** it to inspect progress
- **Resume** after pausing
- **Cancel** to stop entirely
- **Inject data** when a Wait node needs input

## Best Practices

**Start simple.** Build a linear flow first, then add conditions and parallelism.

**Name nodes clearly.** "Summarize Papers" is better than "Agent 1".

**Test incrementally.** Run after adding each node to catch problems early.

**Handle errors.** Add condition nodes to check for failures and respond appropriately.

::: warning Avoid infinite loops
If you create cycles in your flow, make sure there's a condition that eventually exits the loop.
:::

## Next Steps

- [Research Pipeline](/cookbook/research-pipeline) - Build a multi-agent flow
- [Flow Editor reference](/features/flows/overview)
- [Node types in detail](/features/flows/overview#node-types)
- [Example flows](/features/flows/overview#example-flows)
