# Multi-Model Comparison

Compare outputs from different Claude models side-by-side to find the best fit for your use case.

**Difficulty**: Beginner
**Time**: 5 minutes

## What You'll Build

Use Sciorex's parallel chat feature to:
- Run the same prompt across multiple models
- Compare response quality, speed, and style
- Make informed decisions about which model to use

![Model Comparison](/images/cookbook/model-comparison.svg)
*TBD: Replace with screenshot of parallel chats comparing models*

## Prerequisites

- Sciorex installed
- Understanding of [available models](/reference/models)

## Method 1: Multi-Chat Launcher

The fastest way to compare models.

### Step 1: Open Multi-Chat Launcher

1. Go to **Chat** in the sidebar
2. Click the **Multi-Chat** button (or press `Ctrl/Cmd + Shift + N`)

### Step 2: Configure Variants

Create three chat variants:

| Variant | Model | Thinking |
|---------|-------|----------|
| 1 | Opus 4.5 | Think Hard |
| 2 | Sonnet 4.5 | Think |
| 3 | Haiku 4.5 | Off |

### Step 3: Run the Comparison

1. Enter your prompt in the shared input
2. Click **Send to All**
3. Watch responses stream in side-by-side

### Step 4: Analyze Results

Compare:
- **Quality**: Which answer is most accurate/complete?
- **Speed**: How fast did each model respond?
- **Style**: Which writing style fits your needs?
- **Cost**: Consider the token usage difference

## Method 2: Using Agents

Create dedicated agents for each model to compare with specific system prompts.

### Create Model-Specific Agents

**Opus Agent:**
```yaml
name: Opus Evaluator
description: Uses Opus for maximum quality
model: claude-opus-4-5-20251101
thinkingLevel: think-hard
systemPrompt: |
  Provide thorough, well-reasoned responses.
  Take your time to analyze all aspects.
```

**Sonnet Agent:**
```yaml
name: Sonnet Evaluator
description: Uses Sonnet for balanced performance
model: claude-sonnet-4-5-20250929
thinkingLevel: think
systemPrompt: |
  Provide clear, practical responses.
  Balance depth with efficiency.
```

**Haiku Agent:**
```yaml
name: Haiku Evaluator
description: Uses Haiku for speed
model: claude-haiku-4-5-20251001
thinkingLevel: off
systemPrompt: |
  Provide concise, direct responses.
  Prioritize speed and clarity.
```

### Run Parallel Sessions

1. Use Multi-Chat Launcher
2. Select each agent for a different variant
3. Compare outputs

## Comparison Criteria

### For Code Generation

| Criteria | What to Look For |
|----------|------------------|
| Correctness | Does the code work? |
| Completeness | Are edge cases handled? |
| Style | Is it idiomatic? Well-structured? |
| Efficiency | Is the algorithm optimal? |
| Documentation | Are comments helpful? |

### For Analysis Tasks

| Criteria | What to Look For |
|----------|------------------|
| Depth | How thorough is the analysis? |
| Accuracy | Are facts correct? |
| Reasoning | Is logic sound? |
| Actionability | Are recommendations practical? |

### For Creative Tasks

| Criteria | What to Look For |
|----------|------------------|
| Originality | Fresh ideas or generic? |
| Voice | Appropriate tone? |
| Coherence | Logical flow? |
| Engagement | Interesting to read? |

## Example: Code Review Comparison

**Prompt:**
```
Review this function for bugs and improvements:

function calculateDiscount(price, discount) {
  return price - (price * discount);
}
```

**Opus Response:**
> Detailed analysis with edge cases (negative prices, discount > 1), type safety concerns, precision issues with floating point, and suggested improvements with TypeScript...

**Sonnet Response:**
> Solid review covering main issues: no input validation, potential NaN, suggests adding bounds checking...

**Haiku Response:**
> Quick points: add validation, consider rounding, handle edge cases.

**Conclusion:** For thorough code reviews, Opus provides the most comprehensive analysis. Sonnet offers good balance. Haiku is suitable for quick sanity checks.

## When to Use Each Model

Based on your comparisons, build a mental model:

| Task Type | Recommended Model |
|-----------|-------------------|
| Critical decisions | Opus |
| Daily coding | Sonnet |
| Quick lookups | Haiku |
| Complex debugging | Opus |
| Documentation | Sonnet |
| Formatting/refactoring | Haiku |

## Saving Your Findings

Create a reference ticket documenting your findings:

```yaml
title: Model Selection Guidelines
type: documentation
description: |
  ## Code Review
  - Use Opus for security-critical code
  - Use Sonnet for regular PRs

  ## Research
  - Use Opus for deep analysis
  - Use Sonnet for summaries

  ## Quick Tasks
  - Use Haiku for formatting
  - Use Haiku for simple questions
```

## Tips

- **Same prompt, different models**: Always use identical prompts for fair comparison
- **Multiple trials**: Run comparisons several times—results can vary
- **Consider cost**: Opus is ~5x more expensive than Sonnet
- **Match task complexity**: Don't use Opus for simple tasks
- **Document findings**: Keep notes on which models work best for your use cases

## Related

- [Models Reference](/reference/models)
- [Parallel Chats](/features/parallel-chats)
- [Extended Thinking](/features/agents#extended-thinking)
