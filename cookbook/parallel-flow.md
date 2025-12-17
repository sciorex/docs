# Parallel Execution

Run multiple agents simultaneously for faster results.

**Difficulty**: Intermediate
**Time**: 15 minutes

## What You'll Build

A flow that:
- Runs multiple agents in parallel
- Merges results from all branches
- Optimizes execution time

![Parallel Flow](/images/cookbook/parallel-flow.svg)
*TBD: Replace with screenshot of parallel flow*

## Prerequisites

- Completed [Simple Sequential Flow](/cookbook/simple-flow)
- Understanding of flow basics

## Why Parallel Execution?

**Sequential (slow):**
```
A → B → C → D
Time: 4 units
```

**Parallel (fast):**
```
    ┌─ B ─┐
A → ┼─ C ─┼ → D
    └─ D ─┘
Time: 2 units
```

When tasks are independent, run them simultaneously.

## Step 1: Identify Independent Tasks

Tasks can run in parallel if they:
- Don't depend on each other's output
- Can execute simultaneously
- Don't have shared state conflicts

**Good for parallel:**
- Multiple code reviews (security, style, performance)
- Searching multiple sources
- Generating multiple variations

**Not good for parallel:**
- Sequential transformations
- Tasks that need previous output
- Order-dependent operations

## Step 2: Create a Parallel Flow

### Example: Multi-Aspect Code Review

1. Go to **Flows** → **+ New Flow**
2. Name it "Comprehensive Code Review"

### Flow Structure

```
              ┌── Security Review ──┐
              │                     │
Trigger ──────┼── Performance Review┼── Merge ── Summary
              │                     │
              └── Style Review ─────┘
```

### Agent Definitions

**Security Reviewer:**
```yaml
name: Security Reviewer
model: claude-sonnet-4-5-20250929
thinkingLevel: think
systemPrompt: |
  Focus exclusively on security issues:
  - Injection vulnerabilities
  - Authentication flaws
  - Data exposure risks
  - Insecure dependencies
```

**Performance Reviewer:**
```yaml
name: Performance Reviewer
model: claude-sonnet-4-5-20250929
thinkingLevel: think
systemPrompt: |
  Focus exclusively on performance:
  - Algorithm efficiency
  - Memory usage
  - Database queries
  - Caching opportunities
```

**Style Reviewer:**
```yaml
name: Style Reviewer
model: claude-haiku-4-5-20251001
systemPrompt: |
  Focus exclusively on code style:
  - Naming conventions
  - Code organization
  - Documentation
  - Best practices
```

## Step 3: Configure the Flow

### Trigger Node

```yaml
triggerType: manual
inputSchema:
  type: object
  properties:
    code:
      type: string
      description: Code to review
    context:
      type: string
      description: Additional context
```

### Parallel Branches

From the trigger, create three connections to three agent nodes.

**Each agent input:**
```yaml
input: |
  Review this code:
  {{trigger.input.code}}

  Context: {{trigger.input.context}}
```

### Merge Node

Add a **Merge** node that waits for all branches:

```yaml
waitFor: all  # Wait for all branches
timeout: 60000  # 60 second timeout
```

### Summary Agent

After the merge, add a final agent:

```yaml
name: Review Summarizer
model: claude-sonnet-4-5-20250929
input: |
  Compile these reviews into a single report:

  ## Security Review
  {{nodes.securityReview.output}}

  ## Performance Review
  {{nodes.performanceReview.output}}

  ## Style Review
  {{nodes.styleReview.output}}

  Prioritize issues by severity.
```

## Merge Strategies

### Wait for All

```yaml
waitFor: all
```
Continues only when ALL branches complete.

### Wait for Any

```yaml
waitFor: any
```
Continues when ANY branch completes (race condition).

### Wait for N

```yaml
waitFor: 2  # Wait for 2 branches
```
Continues when N branches complete.

## Accessing Parallel Results

After merge, access each branch's output:

```javascript
// Individual outputs
nodes.securityReview.output
nodes.performanceReview.output
nodes.styleReview.output

// All outputs as array
merge.outputs  // [{nodeId, output}, ...]
```

## Example: Research from Multiple Sources

```
              ┌── Academic Search ──┐
              │                     │
Query ────────┼── News Search ──────┼── Merge ── Synthesize
              │                     │
              └── Technical Blogs ──┘
```

**Academic Search Agent:**
```yaml
name: Academic Searcher
allowedTools:
  - WebSearch
systemPrompt: |
  Search for academic papers and research.
  Focus on peer-reviewed sources.
```

**News Search Agent:**
```yaml
name: News Searcher
allowedTools:
  - WebSearch
systemPrompt: |
  Search for recent news articles.
  Focus on reputable publications.
```

**Blog Search Agent:**
```yaml
name: Blog Searcher
allowedTools:
  - WebSearch
systemPrompt: |
  Search technical blogs and forums.
  Focus on practical experiences.
```

## Error Handling in Parallel

### Individual Branch Errors

Handle errors per branch:

```yaml
# After merge
condition: nodes.securityReview.error !== null
  → [true] → Handle security review failure
  → [false] → Continue normally
```

### Partial Results

Continue with available results:

```yaml
waitFor: all
continueOnError: true  # Don't fail if one branch errors
```

Then filter out errors:

```javascript
const validResults = merge.outputs.filter(o => !o.error);
```

## Performance Optimization

### Right-Size Models

Use appropriate models per task:

| Task Complexity | Model |
|-----------------|-------|
| Simple classification | Haiku |
| Standard analysis | Sonnet |
| Complex reasoning | Opus |

### Limit Parallelism

Don't parallelize everything:

```yaml
maxConcurrent: 5  # Limit simultaneous executions
```

### Timeout Management

```yaml
branchTimeout: 30000  # 30s per branch
totalTimeout: 120000  # 2min total
```

## Complex Parallel Patterns

### Fan-Out / Fan-In

```
       ┌── Process 1 ──┐
       │               │
Split ─┼── Process 2 ──┼── Merge
       │               │
       └── Process 3 ──┘
```

### Parallel with Conditions

```
       ┌── [fast path] ── Quick Analysis ──┐
Input ─┤                                    ├── Merge
       └── [deep path] ── Deep Analysis ───┘
```

### Nested Parallel

```
       ┌── Branch A ──┬── A1 ──┬── Merge A ──┐
       │              └── A2 ──┘              │
Main ──┤                                      ├── Final Merge
       │              ┌── B1 ──┐              │
       └── Branch B ──┴── B2 ──┴── Merge B ──┘
```

## Tips

- **Identify independence**: Only parallelize truly independent tasks
- **Balance load**: Don't create too many parallel branches
- **Handle failures**: Plan for partial failures
- **Monitor timing**: Track which branches are slow
- **Test thoroughly**: Parallel flows can have subtle timing issues

## Related

- [Simple Sequential Flow](/cookbook/simple-flow)
- [Conditional Branching](/cookbook/conditional-flow)
- [Chaining Multiple Agents](/cookbook/chaining-agents)
- [Flows Overview](/features/flows/overview)
