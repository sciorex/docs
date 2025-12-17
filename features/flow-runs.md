# Flow Runs

The Flow Runs view shows the execution history of your automated workflows. Track which flows have run, see their results, and debug issues.

## Accessing Flow Runs

Click **Flow Runs** in the sidebar or press `Ctrl+7` to open the view.

## Execution List

The main panel shows all flow executions with:

| Column | Description |
|--------|-------------|
| **Flow** | Which flow ran |
| **Status** | Current execution state |
| **Trigger** | What started the flow (Manual, Schedule, Ticket event) |
| **Started** | When execution began |
| **Duration** | Total execution time |
| **Nodes** | Progress indicator (completed/total nodes) |

### Execution Statuses

| Status | Meaning |
|--------|---------|
| **Pending** | Queued but not started |
| **Running** | Currently executing |
| **Paused** | Waiting for user input |
| **Completed** | Finished successfully |
| **Failed** | Ended with an error |
| **Cancelled** | Stopped by user |

## Execution Details

Click an execution to view its details:

### Execution View

Opens the Flow Execution View showing:

- **Visual flow diagram** with node status indicators
- **Current position** highlighting the active node
- **Node results** for completed nodes
- **Error details** for failed nodes

### Timeline Tab

Shows a chronological list of events:

- Node start/complete times
- Data passed between nodes
- Errors and warnings
- User inputs (for Wait nodes)

### Context Tab

Shows the execution context:

- Trigger input data
- Node outputs
- Flow variables
- Current state

## Real-time Monitoring

For running flows:

- Node status updates in real-time
- Progress bar shows overall completion
- Active nodes are highlighted
- Errors appear immediately

## Flow Controls

While a flow is running:

| Action | Description |
|--------|-------------|
| **Pause** | Pause at the next safe point |
| **Resume** | Continue a paused execution |
| **Cancel** | Stop the execution entirely |
| **Inject Data** | Provide input to a waiting node |

## Filtering

Filter the execution list by:

| Filter | Options |
|--------|---------|
| **Flow** | Show executions for a specific flow |
| **Status** | Filter by status |
| **Trigger Type** | Manual, Scheduled, Ticket event |
| **Time** | Today, This Week, This Month, All |

## Re-running Flows

To re-run a flow:

1. Find a previous execution
2. Click **Re-run** from the options menu
3. Optionally modify the trigger input
4. The flow starts a new execution

## Debugging Failed Flows

When a flow fails:

1. Open the execution details
2. Find the failed node (marked in red)
3. Check the error message and stack trace
4. Review the node's input data
5. Fix the issue in the flow editor
6. Re-run the flow

## Scheduled Flow History

For flows with schedule triggers:

- Each scheduled run appears as a separate execution
- View the pattern of runs over time
- Identify missed executions
- Check for recurring failures

## Related

- [Flow Editor](/features/flows/overview) for creating and editing flows
- [Flow Execution View](#execution-view) for real-time monitoring
- [Agents](/features/agents) for the agents used in flows
