# Chaining Multiple Agents

Create powerful workflows by connecting specialized agents in sequence.

**Difficulty**: Intermediate
**Time**: 15 minutes

## What You'll Build

Learn to:
- Design multi-agent pipelines
- Pass data between agents
- Handle agent failures gracefully
- Optimize for quality and speed

![Agent Chain](/images/cookbook/chaining-agents.svg)
*TBD: Replace with diagram of agent chain*

## Prerequisites

- Sciorex installed
- Understanding of [Agents](/guide/concepts/agents) and [Flows](/guide/concepts/workflows)

## Why Chain Agents?

Single agents can become overloaded with complex tasks. Chaining allows:

| Benefit | Description |
|---------|-------------|
| **Specialization** | Each agent focuses on one task |
| **Quality** | Experts produce better results |
| **Debugging** | Easier to identify issues |
| **Reusability** | Agents can be mixed and matched |
| **Scalability** | Add stages without rewriting |

## Example 1: Content Pipeline

Create a blog post from a topic:

```
┌──────────┐    ┌───────────┐    ┌──────────┐    ┌──────────┐
│ Research │───▶│  Outline  │───▶│  Writer  │───▶│  Editor  │
│  Agent   │    │   Agent   │    │  Agent   │    │  Agent   │
└──────────┘    └───────────┘    └──────────┘    └──────────┘
```

### Agent Definitions

**Researcher:**
```yaml
name: Content Researcher
description: Researches topics and gathers sources

systemPrompt: |
  Research the given topic thoroughly:
  1. Find key facts and statistics
  2. Identify expert opinions
  3. Note recent developments
  4. List credible sources

  Output as structured JSON.

model: claude-sonnet-4-5-20250929
allowedTools:
  - WebSearch
  - WebFetch

outputSchema:
  type: object
  properties:
    keyFacts:
      type: array
      items:
        type: string
    sources:
      type: array
      items:
        type: object
        properties:
          title:
            type: string
          url:
            type: string
```

**Outliner:**
```yaml
name: Content Outliner
description: Creates content structure

systemPrompt: |
  Create a detailed outline based on the research:
  1. Compelling headline
  2. Introduction hook
  3. Main sections with key points
  4. Conclusion

  Structure for reader engagement.

model: claude-sonnet-4-5-20250929
thinkingLevel: think
```

**Writer:**
```yaml
name: Content Writer
description: Writes engaging content

systemPrompt: |
  Write the full article following the outline:
  - Engaging, conversational tone
  - Use research facts naturally
  - Include examples and analogies
  - Aim for 800-1200 words

model: claude-opus-4-5-20251101
thinkingLevel: think-hard
```

**Editor:**
```yaml
name: Content Editor
description: Polishes and fact-checks

systemPrompt: |
  Edit the article for:
  - Grammar and clarity
  - Fact accuracy
  - Flow and readability
  - SEO optimization

  Return the polished version with a summary of changes.

model: claude-sonnet-4-5-20250929
thinkingLevel: think
```

### Flow Configuration

```json
{
  "nodes": [
    {
      "id": "trigger",
      "type": "trigger",
      "data": { "triggerType": "manual" }
    },
    {
      "id": "researcher",
      "type": "agent",
      "data": {
        "agentId": "content-researcher",
        "input": "{{trigger.input.topic}}"
      }
    },
    {
      "id": "outliner",
      "type": "agent",
      "data": {
        "agentId": "content-outliner",
        "input": "Create outline for: {{trigger.input.topic}}\n\nResearch:\n{{nodes.researcher.output}}"
      }
    },
    {
      "id": "writer",
      "type": "agent",
      "data": {
        "agentId": "content-writer",
        "input": "Write article following this outline:\n{{nodes.outliner.output}}\n\nUsing research:\n{{nodes.researcher.output}}"
      }
    },
    {
      "id": "editor",
      "type": "agent",
      "data": {
        "agentId": "content-editor",
        "input": "Edit this article:\n{{nodes.writer.output}}"
      }
    }
  ]
}
```

## Example 2: Code Quality Pipeline

Review and improve code:

```
┌──────────┐    ┌───────────┐    ┌──────────┐    ┌──────────┐
│ Security │───▶│Performance│───▶│  Style   │───▶│ Summary  │
│  Review  │    │  Review   │    │  Review  │    │  Report  │
└──────────┘    └───────────┘    └──────────┘    └──────────┘
```

### Agent Definitions

**Security Reviewer:**
```yaml
name: Security Reviewer
systemPrompt: |
  Review code for security vulnerabilities:
  - Injection attacks (SQL, XSS, command)
  - Authentication/authorization issues
  - Sensitive data exposure
  - Insecure dependencies

  Rate severity: critical, high, medium, low
```

**Performance Reviewer:**
```yaml
name: Performance Reviewer
systemPrompt: |
  Analyze code for performance issues:
  - Algorithm complexity
  - Memory usage
  - Database query efficiency
  - Caching opportunities

  Suggest specific optimizations.
```

**Style Reviewer:**
```yaml
name: Style Reviewer
systemPrompt: |
  Review code style and maintainability:
  - Naming conventions
  - Code organization
  - Documentation
  - Best practices

  Be constructive and specific.
```

**Summary Generator:**
```yaml
name: Review Summarizer
systemPrompt: |
  Compile all reviews into an actionable summary:
  1. Critical issues (must fix)
  2. Important improvements
  3. Nice-to-have suggestions
  4. Overall assessment

  Prioritize by impact.
```

## Example 3: Data Processing Chain

Transform and analyze data:

```
┌──────────┐    ┌───────────┐    ┌──────────┐
│  Fetch   │───▶│ Transform │───▶│ Analyze  │
│  Data    │    │   Data    │    │   Data   │
└──────────┘    └───────────┘    └──────────┘
```

## Passing Data Between Agents

### Using Output Schemas

Define structured output:

```yaml
outputSchema:
  type: object
  properties:
    status:
      type: string
    data:
      type: object
    metadata:
      type: object
```

Access in next agent:

```
{{nodes.previousAgent.output.data}}
```

### Accumulating Context

Each agent receives previous outputs:

```yaml
input: |
  ## Original Request
  {{trigger.input}}

  ## Research Results
  {{nodes.researcher.output}}

  ## Analysis
  {{nodes.analyzer.output}}

  ## Your Task
  Based on the above, provide recommendations.
```

## Error Handling

### Condition Nodes

Check for failures:

```
{{nodes.agent.output}} !== null && !nodes.agent.error
```

### Fallback Paths

```
Agent A → Condition → [Success] → Agent B
              │
              └──────→ [Failure] → Retry/Alert
```

### Retry Logic

```yaml
# In flow configuration
retryOnFailure: true
maxRetries: 2
retryDelay: 5000
```

## Optimization Tips

### Model Selection by Stage

| Stage | Model | Reasoning |
|-------|-------|-----------|
| Data collection | Haiku | Fast, simple task |
| Analysis | Sonnet | Balanced |
| Final output | Opus | Quality matters |

### Parallel Where Possible

Independent analyses can run simultaneously:

```
         ┌─── Security Review ───┐
Input ───┼─── Performance Review ┼─── Merge ─── Summary
         └─── Style Review ──────┘
```

### Cache Intermediate Results

Long pipelines benefit from checkpointing—if a late stage fails, restart from the last checkpoint rather than the beginning.

## Best Practices

1. **Single responsibility**: Each agent does one thing well
2. **Clear interfaces**: Define input/output schemas
3. **Fail gracefully**: Handle errors at each stage
4. **Log everything**: Track outputs for debugging
5. **Test incrementally**: Verify each agent before chaining
6. **Monitor costs**: Chaining multiplies API usage

## Related

- [Research Pipeline](/cookbook/research-pipeline)
- [Simple Sequential Flow](/cookbook/simple-flow)
- [Flows Overview](/features/flows/overview)
