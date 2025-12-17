---
layout: home

hero:
  name: "Sciorex"
  text: "AI-Powered Development Companion"
  tagline: Orchestrate AI agent swarms, design visual workflows, and manage projects with intelligent ticket tracking. 100% local, 100% private.
  image:
    src: /logo.png
    alt: Sciorex
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Download
      link: https://sciorex.com/#download
    - theme: alt
      text: GitHub
      link: https://github.com/sciorex/sciorex

features:
  - icon: 🤖
    title: AI Agent Orchestration
    details: Create specialized agents with unique prompts, tool permissions, and MCP configurations. Each agent has its own personality and expertise.
    link: /features/agents
  - icon: 🔀
    title: Visual Flow Editor
    details: Design complex multi-agent pipelines with a node-based editor. Chain agents, add conditions, parallel execution, and data transformation.
    link: /features/flows/overview
  - icon: 📋
    title: Ticket & Kanban
    details: Track work across agents with a powerful ticket system. Link conversations to tickets and see the full history of agent interactions.
    link: /features/ticketing
  - icon: 🧠
    title: Extended Thinking
    details: Enable Claude's extended thinking for complex problems. Configure thinking depth from light reasoning to deep multi-step analysis with custom token budgets.
    link: /features/agents#extended-thinking
  - icon: 🌳
    title: Git Worktrees
    details: Run multiple chat sessions in parallel, each with its own isolated copy of your codebase. Explore different approaches without conflicts.
    link: /guide/concepts/worktrees
  - icon: 💬
    title: Parallel Chats
    details: Launch multiple chat variants simultaneously with different models, prompts, or settings. Compare results side-by-side and merge the best changes.
    link: /features/parallel-chats
  - icon: 🔌
    title: MCP Tool Protocol
    details: Configure different MCP servers per agent. Need Slack alerts? Database access? Custom APIs? Just add the right MCP.
    link: /features/mcp
  - icon: 🔬
    title: Research Pipelines
    details: Build automated research workflows - paper fetching, summarization, hypothesis generation, experimentation, and verification.
    link: /features/flows/overview
  - icon: 🔒
    title: 100% Local & Private
    details: All data stays on your machine. No data collection, no tracking. Your AI interactions remain completely private.
---

<div class="hero-screenshot">

![Sciorex Dashboard](/images/hero-dashboard.svg)
*TBD: Replace with screenshot showing the main dashboard with agents, chat, and tickets visible*

</div>

## Quick Links

<div class="grid cards">

- **[📖 Getting Started](/guide/getting-started)**

  New to Sciorex? Start here for installation and first steps.

- **[🍳 Cookbook](/cookbook/)**

  Practical recipes and tutorials for common tasks.

- **[🤖 Agents Reference](/features/agents)**

  Create and configure AI agents for your workflows.

- **[📊 Models Comparison](/reference/models)**

  Compare Claude models - Opus, Sonnet, and Haiku.

</div>

## See It In Action

<div class="screenshot-grid">

### Chat Interface
![Chat Interface](/images/feature-chat.svg)
*TBD: Replace with screenshot of chat interface with AI response and tool calls*

### Visual Flow Editor
![Flow Editor](/images/feature-flows.svg)
*TBD: Replace with screenshot of flow editor with connected nodes*

### Kanban Board
![Kanban Board](/images/feature-kanban.svg)
*TBD: Replace with screenshot of ticket kanban board*

</div>

<style>
.hero-screenshot {
  margin: 2rem auto;
  max-width: 900px;
  text-align: center;
}

.hero-screenshot img {
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  border: 1px solid var(--vp-c-divider);
}

.hero-screenshot em {
  display: block;
  margin-top: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

.grid.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.grid.cards > * {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1.25rem;
}

.grid.cards a {
  font-weight: 600;
}

.screenshot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.screenshot-grid h3 {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.screenshot-grid img {
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border: 1px solid var(--vp-c-divider);
  width: 100%;
}

.screenshot-grid em {
  display: block;
  margin-top: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}
</style>
