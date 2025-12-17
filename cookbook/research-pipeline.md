# Research Pipeline

Build an automated research workflow that fetches information, summarizes findings, and extracts key insights.

**Difficulty**: Intermediate
**Time**: 20 minutes

## What You'll Build

A flow that:
- Takes a research topic as input
- Searches for relevant information
- Summarizes findings
- Extracts actionable insights
- Outputs a structured report

![Research Pipeline Flow](/images/cookbook/research-pipeline.svg)
*TBD: Replace with screenshot of the research pipeline in the flow editor*

## Prerequisites

- Sciorex installed
- Understanding of [Flows](/features/flows/overview)
- (Optional) Web search MCP server configured

## Overview

```
┌─────────┐    ┌──────────┐    ┌───────────┐    ┌────────────┐
│  Input  │───▶│  Search  │───▶│ Summarize │───▶│  Extract   │
│  Topic  │    │  Agent   │    │   Agent   │    │  Insights  │
└─────────┘    └──────────┘    └───────────┘    └────────────┘
                                                       │
                                                       ▼
                                               ┌────────────┐
                                               │   Output   │
                                               │   Report   │
                                               └────────────┘
```

## Step 1: Create the Agents

### Search Agent

```yaml
name: Research Searcher
description: Searches for information on a topic

systemPrompt: |
  You are a research assistant. Given a topic:

  1. Use web search to find relevant, authoritative sources
  2. Focus on recent information (last 2 years preferred)
  3. Gather at least 5 different sources
  4. For each source, note:
     - Title and URL
     - Key points
     - Publication date
     - Credibility assessment

  Return structured data that can be processed further.

model: claude-sonnet-4-5-20250929
allowedTools:
  - WebSearch
  - WebFetch
```

### Summarizer Agent

```yaml
name: Research Summarizer
description: Summarizes research findings

systemPrompt: |
  You are an expert at synthesizing research. Given multiple sources:

  1. Identify common themes and consensus views
  2. Note any contradictions or debates
  3. Highlight the most important findings
  4. Organize by relevance, not source

  Write a clear, comprehensive summary that someone unfamiliar
  with the topic could understand.

model: claude-sonnet-4-5-20250929
thinkingLevel: think
```

### Insight Extractor Agent

```yaml
name: Insight Extractor
description: Extracts actionable insights from research

systemPrompt: |
  You are an analyst who extracts actionable insights. Given research:

  1. Identify key takeaways
  2. Note practical applications
  3. Highlight risks or concerns
  4. Suggest next steps or areas for deeper research

  Format as a structured report with clear sections.

model: claude-sonnet-4-5-20250929
thinkingLevel: think-hard

outputSchema:
  type: object
  properties:
    keyTakeaways:
      type: array
      items:
        type: string
    applications:
      type: array
      items:
        type: string
    risks:
      type: array
      items:
        type: string
    nextSteps:
      type: array
      items:
        type: string
```

## Step 2: Build the Flow

1. Go to **Flows** → **+ New Flow**
2. Name it "Research Pipeline"

### Add Nodes

Drag these nodes onto the canvas:

1. **Input Node** - Starting point
2. **Agent Node** - Research Searcher
3. **Agent Node** - Research Summarizer
4. **Agent Node** - Insight Extractor
5. **Output Node** - Final report

### Connect Nodes

Connect them in sequence:
```
Input → Searcher → Summarizer → Extractor → Output
```

### Configure Input

Set up the input node:
```json
{
  "topic": {
    "type": "string",
    "description": "Research topic to investigate"
  },
  "depth": {
    "type": "string",
    "enum": ["quick", "standard", "deep"],
    "default": "standard"
  }
}
```

## Step 3: Run the Pipeline

1. Click **Run** in the flow editor
2. Enter your research topic:
   ```json
   {
     "topic": "Current state of AI code assistants in 2025",
     "depth": "standard"
   }
   ```
3. Watch the execution progress through each stage

## Example Output

```json
{
  "keyTakeaways": [
    "AI code assistants have reached mainstream adoption with 70%+ developer usage",
    "Code quality improvements of 15-30% reported across studies",
    "Security concerns remain around training data and generated code"
  ],
  "applications": [
    "Automated code review and bug detection",
    "Documentation generation",
    "Test case creation",
    "Legacy code modernization"
  ],
  "risks": [
    "Over-reliance leading to skill atrophy",
    "Potential for introducing subtle bugs",
    "License and copyright considerations"
  ],
  "nextSteps": [
    "Evaluate specific tools for your tech stack",
    "Establish code review processes for AI-generated code",
    "Monitor emerging research on AI code quality"
  ]
}
```

## Variations

### Add Parallel Sources

Modify the flow to search multiple source types in parallel:

```
                ┌─── Academic Search ───┐
Input ──────────┼─── News Search ───────┼──── Merge ──── Summarize
                └─── Technical Blogs ───┘
```

### Add Fact Checking

Insert a verification step:

```
Summarize ──── Fact Checker ──── Extract Insights
```

### Export to Ticket

Add an output node that creates a ticket with the research findings.

## Tips

- **Start narrow**: Begin with specific topics before broad ones
- **Check sources**: Review the searcher's sources for quality
- **Iterate**: Run multiple times with refined prompts
- **Save outputs**: Link to tickets for future reference

## Related

- [Flow Editor Overview](/features/flows/overview)
- [Agent Outputs](/features/agents#output-schema)
- [MCP Servers](/features/mcp)
