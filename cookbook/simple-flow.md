# Simple Sequential Flow

Build your first flow with a linear sequence of steps.

**Difficulty**: Beginner
**Time**: 10 minutes

## What You'll Build

A basic flow that:
- Triggers manually
- Runs an agent
- Outputs the result

![Simple Flow](/images/cookbook/simple-flow.svg)
*TBD: Replace with screenshot of simple flow in editor*

## Prerequisites

- Sciorex installed
- At least one [agent created](/cookbook/first-agent)

## Step 1: Create a New Flow

1. Go to **Flows** in the sidebar
2. Click **+ New Flow**
3. Name it "My First Flow"
4. Click **Create**

## Step 2: Add a Trigger Node

Every flow starts with a trigger.

1. From the node palette, drag **Trigger** onto the canvas
2. Click the node to configure:

```yaml
triggerType: manual
inputSchema:
  type: object
  properties:
    topic:
      type: string
      description: Topic to research
  required:
    - topic
```

The trigger defines:
- **When** the flow runs (manual = you click Run)
- **What input** it accepts (a topic string)

## Step 3: Add an Agent Node

1. Drag **Agent** node onto the canvas
2. Connect the Trigger to the Agent (drag from output to input)
3. Configure the agent node:

```yaml
agent: research-assistant  # Your agent ID
input: "{{trigger.input.topic}}"
```

## Step 4: Add an Output Node

1. Drag **Output** node onto the canvas
2. Connect Agent → Output
3. Configure:

```yaml
output: "{{nodes.agent.output}}"
```

## Step 5: Save and Run

1. Click **Save** in the toolbar
2. Click **Run**
3. Enter input when prompted:

```json
{
  "topic": "Latest developments in quantum computing"
}
```

4. Watch the flow execute!

## Understanding the Flow

Your flow looks like this:

```
┌──────────┐    ┌───────────┐    ┌──────────┐
│  Manual  │───▶│  Research │───▶│  Output  │
│ Trigger  │    │   Agent   │    │          │
└──────────┘    └───────────┘    └──────────┘
```

**Data flow:**
1. Trigger provides `{topic: "..."}`
2. Agent receives topic via <code v-pre>{{trigger.input.topic}}</code>
3. Agent runs and produces output
4. Output node captures the result

## Template Syntax

Access data from other nodes using double curly braces:

| Expression | Meaning |
|------------|---------|
| <code v-pre>{{trigger.input}}</code> | All trigger input |
| <code v-pre>{{trigger.input.topic}}</code> | Specific field |
| <code v-pre>{{nodes.agent.output}}</code> | Agent's full output |
| <code v-pre>{{nodes.myNode.output.field}}</code> | Specific output field |

## Common Patterns

### Add a Second Agent

```
Trigger → Agent 1 → Agent 2 → Output
```

Agent 2 input:
```yaml
input: |
  Based on this research:
  {{nodes.agent1.output}}

  Provide a summary.
```

### Add Logging

Insert a Transform node to log intermediate data:

```
Trigger → Agent → Transform (log) → Output
```

Transform configuration:
```javascript
console.log("Agent output:", input);
return input; // Pass through unchanged
```

### Add Error Handling

Wrap with a condition:

```
Agent → Condition → [Success] → Output
              └───→ [Error] → Error Handler
```

## Flow Settings

Configure in the flow settings panel:

| Setting | Description |
|---------|-------------|
| **Name** | Flow identifier |
| **Description** | What the flow does |
| **Timeout** | Max execution time |
| **On Error** | Stop, continue, or retry |

## Debugging

### View Execution

Click **Runs** to see execution history:
- Input received
- Each node's output
- Timing information
- Any errors

### Test Incrementally

1. Run with just the trigger
2. Add one node, run again
3. Verify output at each step

## Example: Daily Report Flow

```yaml
name: Daily Report
description: Generates a daily summary

trigger:
  type: schedule
  cron: "0 9 * * *"  # 9 AM daily

nodes:
  - id: gather
    type: agent
    agent: data-gatherer
    input: "Gather metrics for {{today}}"

  - id: summarize
    type: agent
    agent: summarizer
    input: "{{nodes.gather.output}}"

  - id: output
    type: output
    value: "{{nodes.summarize.output}}"
```

## Tips

- **Start simple**: Get a basic flow working before adding complexity
- **Name nodes clearly**: "Research Agent" not "Agent 1"
- **Test with sample data**: Use realistic inputs
- **Check the runs tab**: See exactly what happened

## Next Steps

- [Conditional Branching](/cookbook/conditional-flow) - Add if/else logic
- [Parallel Execution](/cookbook/parallel-flow) - Run nodes simultaneously
- [Flows Reference](/features/flows/overview) - Full documentation

## Related

- [Creating Your First Agent](/cookbook/first-agent)
- [Chaining Multiple Agents](/cookbook/chaining-agents)
- [Flows Overview](/features/flows/overview)
