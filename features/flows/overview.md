# Visual Flow Editor

The Visual Flow Editor lets you design complex multi-agent workflows using a node-based interface. Flows automate tasks by connecting triggers, agents, conditions, and actions into executable pipelines.

## What is a Flow?

A **Flow** is an automated workflow that:

- **Triggers** based on events, schedules, or manual activation
- **Executes** one or more agents in sequence or parallel
- **Processes** data between steps with conditions and transformations
- **Outputs** results to tickets, files, or notifications

Flows enable powerful automation like:
- Daily research summaries
- Automated code reviews on PRs
- Multi-stage document processing
- Ticket triage and assignment

## Flow Architecture

### Flow Definition

```typescript
interface Flow {
  id: string;           // Unique identifier (e.g., "flow-xxx")
  name: string;         // Display name
  description: string;  // What the flow does
  nodes: FlowNodeData[];  // All nodes in the flow
  edges: FlowEdge[];      // Connections between nodes
  variables: Record<string, JSONSchema>;  // Flow-level variables
  labelIds: string[];     // Labels for organization
  builtIn?: boolean;      // System-provided vs user-created
  createdAt: Date;
  updatedAt: Date;
}
```

### Flow Storage

Flows are persisted as JSON files:

- **User flows**: `.sciorex/flows/{flow-id}.json`
- **Built-in flows**: `resources/flows/` (read-only)

## Flow Editor Interface

```
┌─────────────────────────────────────────────────────────────┐
│  Flow: Research Pipeline                    [Save] [Run]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────┐      ┌──────────────┐      ┌──────────┐     │
│   │ Trigger  │─────▶│ Paper Finder │─────▶│Summarizer│     │
│   │ (Cron)   │      │    Agent     │      │  Agent   │     │
│   └──────────┘      └──────────────┘      └────┬─────┘     │
│                                                 │           │
│                                                 ▼           │
│                                           ┌──────────┐     │
│                                           │  Create  │     │
│                                           │  Ticket  │     │
│                                           └──────────┘     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Node Properties                                            │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Agent: Summarizer                                     │ │
│  │ Input: {{previousNode.output}}                        │ │
│  │ Timeout: 5 minutes                                    │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

The editor provides:

- **Canvas**: Drag-and-drop node placement with zoom/pan
- **Minimap**: Overview navigation for large flows
- **Sidebar**: Node palette and property editor
- **Toolbar**: Save, run, validate, and execution controls
- **Alignment Guides**: Smart snapping for node alignment

## Node Types

### Trigger Node

Every flow starts with a trigger that initiates execution.

```typescript
interface TriggerNodeData {
  type: 'trigger';
  triggerType: 'manual' | 'ticket-created' | 'ticket-updated' | 'schedule';
  triggerConfig: {
    cron?: string;           // For schedule triggers
    ticketFilter?: object;   // For ticket triggers
  };
}
```

| Trigger Type | Description | Configuration |
|--------------|-------------|---------------|
| `manual` | Run on-demand via UI or API | None required |
| `schedule` | Cron-based scheduling | `cron: "0 9 * * *"` (daily at 9am) |
| `ticket-created` | When a ticket is created | Optional ticket filter |
| `ticket-updated` | When a ticket is updated | Optional ticket filter |

### Agent Node

Executes an [AI agent](/features/agents) with input/output mapping.

```typescript
interface AgentNodeData {
  type: 'agent';
  agentId: string;
  inputMapping: Record<string, string>;   // Map context to input
  outputMapping: Record<string, string>;  // Map output to context
}
```

**Input Mapping Examples:**
```javascript
{
  "query": "$.trigger.searchTerm",
  "context": "$.nodes.previousAgent.output"
}
```

**Output Mapping Examples:**
```javascript
{
  "$.results": "summary",
  "$.metadata.sources": "sources"
}
```

### Condition Node

Routes execution based on context data evaluation.

```typescript
interface ConditionNodeData {
  type: 'condition';
  conditions: FlowCondition[];
  logicOperator: 'and' | 'or';  // How to combine conditions
}

interface FlowCondition {
  path: string;      // JSONPath to value (e.g., "$.results.score")
  operator: string;  // eq, ne, gt, lt, gte, lte, contains, matches
  value: unknown;    // Value to compare against
}
```

**Operators:**

| Operator | Description | Example |
|----------|-------------|---------|
| `eq` | Equals | `score eq 100` |
| `ne` / `neq` | Not equals | `status ne "failed"` |
| `gt` | Greater than | `count gt 5` |
| `gte` | Greater or equal | `priority gte 3` |
| `lt` | Less than | `age lt 30` |
| `lte` | Less or equal | `version lte 2` |
| `contains` | String contains | `title contains "urgent"` |
| `matches` | Regex match | `email matches ".*@company.com"` |

Conditions evaluate to:
- **Match edge**: Follows when conditions are true
- **Default edge**: Follows when conditions are false

### Wait Node

Pauses execution for human input or approval.

```typescript
interface WaitNodeData {
  type: 'wait';
  waitType: 'approval' | 'input' | 'timeout';
  prompt?: string;           // Message to display
  timeoutMs?: number;        // Auto-continue timeout
  inputSchema?: JSONSchema;  // Schema for input collection
}
```

| Wait Type | Description |
|-----------|-------------|
| `approval` | Pause until user approves/rejects |
| `input` | Pause until user provides input |
| `timeout` | Pause for specified duration |

### Parallel Node

Splits execution into multiple concurrent branches.

```typescript
interface ParallelNodeData {
  type: 'parallel';
  branches: string[];  // Node IDs to execute in parallel
}
```

### Merge Node

Joins parallel branches back together.

```typescript
interface MergeNodeData {
  type: 'merge';
  mergeStrategy: 'all' | 'any' | 'first';
  sourceNodes: string[];  // Node IDs to wait for
}
```

| Strategy | Description |
|----------|-------------|
| `all` | Wait for all branches to complete |
| `any` | Continue when any branch completes |
| `first` | Continue when first branch completes |

### Transform Node

Transforms data in the execution context.

```typescript
interface TransformNodeData {
  type: 'transform';
  transformType: 'jq' | 'template' | 'script';
  expression: string;  // Transform expression
}
```

| Transform | Description | Example |
|-----------|-------------|---------|
| `jq` | JQ query syntax | `.items \| map(.name)` |
| `template` | Template string | <code v-pre>{{nodes.agent.output.summary}}</code> |
| `script` | JavaScript code | `return data.map(x => x * 2)` |

### Ticket Action Node

Performs actions on [tickets](/features/ticketing).

```typescript
interface TicketActionNodeData {
  type: 'ticket_action';
  action: 'create' | 'update_status' | 'add_comment' | 'assign' | 'add_label';
  actionParams: Record<string, unknown>;
}
```

### End Node

Marks the end of a flow execution path.

```typescript
interface EndNodeData {
  type: 'end';
  endType?: 'success' | 'failure' | 'cancelled';
}
```

## Flow Edges

Edges connect nodes and define execution order:

```typescript
interface FlowEdge {
  id: string;
  source: string;       // Source node ID
  target: string;       // Target node ID
  sourceHandle?: string; // Output handle (for conditions)
  targetHandle?: string; // Input handle
  label?: string;        // Edge label
}
```

For condition nodes, edges use handles:
- `match` - Condition is true
- `default` - Condition is false

## Flow Execution

### Execution States

```typescript
enum FlowExecutionStatus {
  Pending = 'pending',
  Running = 'running',
  Paused = 'paused',
  Completed = 'completed',
  Failed = 'failed',
  Cancelled = 'cancelled',
}

enum NodeExecutionStatus {
  Pending = 'pending',
  Running = 'running',
  Completed = 'completed',
  Failed = 'failed',
  Skipped = 'skipped',
  Waiting = 'waiting',
}
```

### Execution Context

Each execution maintains a shared context:

```typescript
interface FlowExecution {
  id: string;
  flowId: string;
  status: FlowExecutionStatus;
  context: Record<string, unknown>;     // Shared data
  nodeResults: Map<string, NodeExecutionResult>;
  currentNodeIds: string[];             // Currently executing
  startedAt: Date;
  completedAt?: Date;
  error?: string;
}
```

### Context Paths

Access data using JSONPath-like syntax:

```javascript
// Trigger input
{{trigger.input}}
{{$.trigger.searchQuery}}

// Previous node output
{{previousNode.output}}

// Specific node output
{{nodes.paperFinder.output}}
{{$.nodes.summarizer.output.summary}}

// Flow metadata
{{$.flowMeta.flowId}}
{{$.flowMeta.flowName}}
```

### Execution Algorithm

The flow executor uses topological ordering:

1. **Start**: Create execution context from trigger
2. **Find Ready Nodes**: Nodes whose dependencies are complete
3. **Execute in Parallel**: Run ready nodes concurrently
4. **Update Context**: Store node outputs
5. **Repeat**: Until all paths reach end nodes

```typescript
async executeFlow(executionId: string): Promise<void> {
  while (true) {
    // Check cancellation/pause
    if (state.cancelRequested) return handleCancellation();
    if (state.pauseRequested) return handlePause();
    
    // Find and execute ready nodes
    const executableNodes = findExecutableNodes(state);
    if (executableNodes.length === 0 && runningNodes.size === 0) {
      return isFlowComplete(state) ? handleCompletion() : handleStuck();
    }
    
    // Execute nodes in parallel
    await Promise.race(executableNodes.map(nodeId => executeNode(state, nodeId)));
  }
}
```

## Creating a Flow

### Step 1: Add a Trigger

1. Open the Flow Editor
2. Drag a **Trigger** node onto the canvas
3. Configure the trigger type and settings

### Step 2: Add Processing Nodes

Connect nodes to build your workflow:

1. Drag nodes from the sidebar
2. Connect nodes by dragging from output to input handles
3. Configure each node's properties

### Step 3: Configure Data Flow

Use template expressions to pass data:

```javascript
// Reference trigger input
{{trigger.input}}

// Reference previous node output
{{previousNode.output}}

// Reference specific node by name
{{nodes.paperFinder.output}}

// Extract specific fields
{{nodes.summarizer.output.summary}}
```

### Step 4: Save and Run

- Click **Save** to store the flow
- Click **Run** for manual execution
- View execution status in real-time

## Flow Controls

During execution, you can:

| Action | Description |
|--------|-------------|
| **Pause** | Pause at next safe point |
| **Resume** | Continue paused execution |
| **Cancel** | Stop execution entirely |
| **Inject Data** | Provide input to waiting nodes |

## Example Flows

### Research Pipeline

```
Trigger (Daily @ 9am)
    ↓
Paper Finder Agent
    ↓
Summarizer Agent
    ↓
Create Ticket (sciorex_create_ticket)
```

**Use Case**: Daily digest of new research papers

### Code Review with Approval

```
Trigger (ticket-created, labels: "review")
    ↓
Code Analyzer Agent
    ↓
Security Scanner Agent
    ↓
Wait (Human Approval)
    ↓
  ┌─────┴─────┐
  ↓           ↓
Approve     Reject
  ↓           ↓
Merge PR   Request Changes
```

**Use Case**: Automated code review with human oversight

### Parallel Processing

```
Trigger (Manual)
    ↓
┌───────────────────┐
│    Parallel       │
│  ┌─────┐ ┌─────┐  │
│  │ A1  │ │ A2  │  │
│  └─────┘ └─────┘  │
└───────────────────┘
    ↓
Merge (strategy: all)
    ↓
Combine Results
    ↓
Output
```

**Use Case**: Process data with multiple agents concurrently

### Conditional Routing

```
Trigger (ticket-updated)
    ↓
Triage Agent
    ↓
Condition (priority > 3)
    ├─ match → Urgent Handler Agent
    └─ default → Standard Handler Agent
    ↓
Update Ticket Status
```

**Use Case**: Route tickets based on priority

## Flow Validation

Flows are validated before execution:

| Check | Description |
|-------|-------------|
| **Has Trigger** | At least one trigger node required |
| **No Orphans** | All nodes must be connected |
| **Unique IDs** | Node IDs must be unique |
| **Valid Edges** | Edges must reference existing nodes |
| **No Cycles** | Cycles trigger a warning (feedback loops must be intentional) |
| **Valid Agents** | Agent nodes must reference existing agents |

## Flow Events

The flow engine emits events for monitoring:

| Event | Description |
|-------|-------------|
| `flow:started` | Flow execution began |
| `flow:completed` | Flow finished successfully |
| `flow:failed` | Flow ended with error |
| `flow:paused` | Flow paused |
| `flow:resumed` | Flow resumed |
| `node:started` | Node began executing |
| `node:completed` | Node finished successfully |
| `node:failed` | Node ended with error |
| `node:waiting` | Node waiting for input |

## Best Practices

::: tip Start simple
Begin with linear flows before adding conditions and parallelism.
:::

::: tip Use descriptive names
Name your nodes clearly (e.g., "Summarize Papers" not "Agent 1").
:::

::: tip Handle errors
Add error handling nodes for critical workflows. Consider using condition nodes to check for errors.
:::

::: tip Test incrementally
Run flows after adding each node to catch issues early.
:::

::: warning Avoid infinite loops
Be careful with cycles - ensure they have proper exit conditions.
:::

## Integration with Tickets

Flows integrate deeply with the [ticketing system](/features/ticketing):

- **Trigger on ticket events**: Start flows when tickets are created/updated
- **Create tickets from flows**: Use Ticket Action nodes
- **Update ticket status**: Modify tickets during execution
- **Link sessions**: Flow agent sessions can be linked to tickets

## API Operations

### Create Flow
```typescript
const flow = await flowService.createFlow({
  name: 'My Workflow',
  description: 'Automated pipeline',
  nodes: [...],
  edges: [...]
});
```

### Execute Flow
```typescript
const execution = await flowExecutor.startFlow(flow, {
  searchQuery: 'machine learning'  // Initial context
});
```

### Control Execution
```typescript
flowExecutor.pauseExecution(executionId);
flowExecutor.resumeExecution(executionId);
flowExecutor.cancelExecution(executionId);
```

### Inject Data
```typescript
await flowExecutor.injectData(executionId, nodeId, {
  userInput: 'approved'
});
```

## Next Steps

- [AI Agents](/features/agents) - Configure agents for flows
- [MCP Servers](/features/mcp) - Extend flow capabilities
- [Ticketing System](/features/ticketing) - Integrate with tickets
- [AI Backend](/architecture/ai-backend) - How agents execute
