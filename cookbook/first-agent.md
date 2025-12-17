# Creating Your First Agent

Learn the basics of creating and using AI agents in Sciorex.

**Difficulty**: Beginner
**Time**: 5 minutes

## What is an Agent?

An agent is a configured AI assistant with:
- A specific **personality** (system prompt)
- Defined **capabilities** (allowed tools)
- Optional **output format** (schema)
- Configurable **thinking depth**

Think of agents as specialized team members - each one has a role and expertise.

## Step 1: Open the Agents Panel

![Agents Panel](/images/cookbook/agents-panel.svg)
*TBD: Replace with screenshot of the agents panel in sidebar*

1. Click **Agents** in the sidebar
2. Click **+ New Agent**

## Step 2: Basic Configuration

Fill in the basic fields:

| Field | Value |
|-------|-------|
| **Name** | Hello World Agent |
| **Description** | A friendly agent that helps with basic tasks |

## Step 3: Write the System Prompt

The system prompt defines your agent's personality and instructions:

```yaml
systemPrompt: |
  You are a helpful, friendly assistant. You:

  - Answer questions clearly and concisely
  - Ask for clarification when needed
  - Provide examples when helpful
  - Admit when you don't know something

  Keep responses brief unless asked for detail.
```

::: tip
Good system prompts are specific about:
- What the agent should do
- How it should communicate
- What it should avoid
:::

## Step 4: Choose a Model

Select the Claude model:

| Model | Best For |
|-------|----------|
| **claude-sonnet-4-5-20250929** | General tasks, good balance of speed and quality (default) |
| **claude-opus-4-5-20251101** | Complex reasoning, creative tasks |
| **claude-haiku-4-5-20251001** | Simple tasks, fastest responses |

For your first agent, start with **Sonnet**.

## Step 5: Save and Test

1. Click **Save**
2. Go to **Chat**
3. Select your **Hello World Agent** from the agent dropdown
4. Send a message:

```
Hi! Can you explain what you can help me with?
```

## The Complete Agent File

Here's what your agent looks like as YAML:

```yaml
name: Hello World Agent
description: A friendly agent that helps with basic tasks

systemPrompt: |
  You are a helpful, friendly assistant. You:

  - Answer questions clearly and concisely
  - Ask for clarification when needed
  - Provide examples when helpful
  - Admit when you don't know something

  Keep responses brief unless asked for detail.

model: claude-sonnet-4-5-20250929
thinkingLevel: off
```

## What's Next?

Now that you've created your first agent, try:

1. **Add tools**: Give your agent access to files with `allowedTools`
2. **Enable thinking**: Set `thinkingLevel: think` for better reasoning
3. **Create a specialist**: Make an agent for code review, writing, or research

## Related

- [Agents Reference](/features/agents) - Full agent configuration options
- [Models Reference](/reference/models) - Choose the right Claude model
- [Tool Permissions](/features/agents#tool-permissions) - Control what agents can do
- [Code Review Agent](/cookbook/code-review-agent) - A practical example
- [Research Pipeline](/cookbook/research-pipeline) - Build a multi-agent flow
