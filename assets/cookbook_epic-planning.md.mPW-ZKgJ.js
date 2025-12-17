import{_ as a,c as n,o as i,ag as e}from"./chunks/framework.CQuhCYrb.js";const p="/images/cookbook/epic-planning.svg",g=JSON.parse('{"title":"Epic Planning with AI","description":"","frontmatter":{},"headers":[],"relativePath":"cookbook/epic-planning.md","filePath":"cookbook/epic-planning.md"}'),l={name:"cookbook/epic-planning.md"};function t(h,s,r,c,k,o){return i(),n("div",null,[...s[0]||(s[0]=[e('<h1 id="epic-planning-with-ai" tabindex="-1">Epic Planning with AI <a class="header-anchor" href="#epic-planning-with-ai" aria-label="Permalink to &quot;Epic Planning with AI&quot;">​</a></h1><p>Use AI agents to break down large projects into manageable epics and tickets.</p><p><strong>Difficulty</strong>: Intermediate <strong>Time</strong>: 20 minutes</p><h2 id="what-you-ll-build" tabindex="-1">What You&#39;ll Build <a class="header-anchor" href="#what-you-ll-build" aria-label="Permalink to &quot;What You&#39;ll Build&quot;">​</a></h2><p>A workflow to:</p><ul><li>Analyze project requirements</li><li>Create structured epics</li><li>Generate detailed tickets</li><li>Estimate and prioritize work</li></ul><p><img src="'+p+`" alt="Epic Planning"><em>TBD: Replace with screenshot of epic planning session</em></p><h2 id="prerequisites" tabindex="-1">Prerequisites <a class="header-anchor" href="#prerequisites" aria-label="Permalink to &quot;Prerequisites&quot;">​</a></h2><ul><li>Sciorex installed</li><li>Understanding of <a href="/guide/concepts/tickets.html">Epics and Tickets</a></li><li>Familiarity with <a href="/guide/concepts/agents.html">Agents</a></li></ul><h2 id="what-is-an-epic" tabindex="-1">What is an Epic? <a class="header-anchor" href="#what-is-an-epic" aria-label="Permalink to &quot;What is an Epic?&quot;">​</a></h2><p>Epics are large bodies of work containing multiple tickets:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Epic: User Authentication System</span></span>
<span class="line"><span>├── T-001: Design auth database schema</span></span>
<span class="line"><span>├── T-002: Implement login/logout API</span></span>
<span class="line"><span>├── T-003: Create login UI</span></span>
<span class="line"><span>├── T-004: Add password reset flow</span></span>
<span class="line"><span>├── T-005: Implement OAuth providers</span></span>
<span class="line"><span>├── T-006: Add 2FA support</span></span>
<span class="line"><span>└── T-007: Write auth documentation</span></span></code></pre></div><h2 id="step-1-create-a-planning-agent" tabindex="-1">Step 1: Create a Planning Agent <a class="header-anchor" href="#step-1-create-a-planning-agent" aria-label="Permalink to &quot;Step 1: Create a Planning Agent&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Project Planner</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Breaks down projects into epics and tickets</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">systemPrompt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  You are an experienced technical project manager and architect.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  When given a project or feature description:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  1. **Understand Scope**</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Identify core requirements</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Note technical constraints</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Consider dependencies</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  2. **Create Epics**</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Group related work</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Define clear boundaries</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Keep epics focused (2-4 weeks of work)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  3. **Generate Tickets**</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Break epics into actionable tickets</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Each ticket = 1-3 days of work</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Include clear acceptance criteria</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  4. **Sequence Work**</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Identify dependencies</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Suggest priority order</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Note parallelization opportunities</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  5. **Estimate**</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Provide relative sizing (S/M/L/XL)</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Flag high-risk items</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     - Note unknowns</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  Output structured plans that can be directly imported.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">claude-opus-4-5-20251101</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">thinkingLevel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">think-hard</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">mcpServers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sciorex-tickets</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">sciorex-interactions</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">allowedTools</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Read</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Glob</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Grep</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">WebSearch</span></span></code></pre></div><h2 id="step-2-plan-a-project" tabindex="-1">Step 2: Plan a Project <a class="header-anchor" href="#step-2-plan-a-project" aria-label="Permalink to &quot;Step 2: Plan a Project&quot;">​</a></h2><h3 id="start-the-planning-session" tabindex="-1">Start the Planning Session <a class="header-anchor" href="#start-the-planning-session" aria-label="Permalink to &quot;Start the Planning Session&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>You: I need to add a complete notification system to our app.</span></span>
<span class="line"><span>     Users should receive notifications for:</span></span>
<span class="line"><span>     - New messages</span></span>
<span class="line"><span>     - @mentions</span></span>
<span class="line"><span>     - Task assignments</span></span>
<span class="line"><span>     - System announcements</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     Notifications should be:</span></span>
<span class="line"><span>     - Real-time (in-app)</span></span>
<span class="line"><span>     - Email (digest and immediate)</span></span>
<span class="line"><span>     - Push (mobile)</span></span>
<span class="line"><span>     - Configurable per user</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     We use React frontend, Node.js backend, PostgreSQL database.</span></span></code></pre></div><h3 id="agent-creates-the-plan" tabindex="-1">Agent Creates the Plan <a class="header-anchor" href="#agent-creates-the-plan" aria-label="Permalink to &quot;Agent Creates the Plan&quot;">​</a></h3><p>The agent analyzes and produces:</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># Notification System - Project Plan</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Overview</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Building a multi-channel notification system with real-time,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">email, and push capabilities.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Epics</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### Epic 1: Core Notification Infrastructure</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**Duration**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 2 weeks</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**Priority**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Critical (blocks all other work)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Tickets:</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **Database Schema Design**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (M)</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Notifications table</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> User preferences table</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Delivery tracking</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **Notification Service**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (L)</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Create/read/update/delete notifications</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Batch operations</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Cleanup jobs</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **Event System**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (M)</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Event types enum</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Publisher interface</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Subscriber pattern</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### Epic 2: Real-time In-App Notifications</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**Duration**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 1.5 weeks</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**Priority**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: High</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Tickets:</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **WebSocket Setup**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (M)</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Socket.io integration</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Authentication</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Reconnection handling</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **Notification Bell UI**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (S)</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Badge counter</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Dropdown list</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Mark as read</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **Toast Notifications**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (S)</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Non-blocking alerts</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Auto-dismiss</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Action buttons</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### Epic 3: Email Notifications</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**Duration**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 1 week</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**Priority**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Medium</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### Epic 4: Push Notifications</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**Duration**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 1 week</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**Priority**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Medium</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### Epic 5: User Preferences</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**Duration**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: 1 week</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**Priority**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: Medium</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">...</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Dependency Graph</span></span></code></pre></div><p>Epic 1 (Core) ──┬──▶ Epic 2 (Real-time) │ ├──▶ Epic 3 (Email) │ └──▶ Epic 4 (Push) │ Epic 5 (Preferences) ◀────┘</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>## Risk Assessment</span></span>
<span class="line"><span></span></span>
<span class="line"><span>| Risk | Mitigation |</span></span>
<span class="line"><span>|------|------------|</span></span>
<span class="line"><span>| WebSocket scaling | Consider Redis pub/sub |</span></span>
<span class="line"><span>| Email deliverability | Use established service (SendGrid) |</span></span>
<span class="line"><span>| Push token management | Clear documentation |</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Recommended Approach</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. Start with Epic 1 (foundation)</span></span>
<span class="line"><span>2. Parallel: Epic 2 + Epic 3</span></span>
<span class="line"><span>3. Epic 4 (can start after Epic 2 patterns established)</span></span>
<span class="line"><span>4. Epic 5 (depends on understanding all channels)</span></span></code></pre></div><h2 id="step-3-create-tickets-from-plan" tabindex="-1">Step 3: Create Tickets from Plan <a class="header-anchor" href="#step-3-create-tickets-from-plan" aria-label="Permalink to &quot;Step 3: Create Tickets from Plan&quot;">​</a></h2><h3 id="manual-creation" tabindex="-1">Manual Creation <a class="header-anchor" href="#manual-creation" aria-label="Permalink to &quot;Manual Creation&quot;">​</a></h3><p>Review the plan and create tickets manually:</p><ol><li>Go to <strong>Tickets</strong></li><li>Create each epic</li><li>Add tickets to epics</li></ol><h3 id="automated-creation" tabindex="-1">Automated Creation <a class="header-anchor" href="#automated-creation" aria-label="Permalink to &quot;Automated Creation&quot;">​</a></h3><p>Ask the agent to create tickets directly:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>You: This plan looks good. Create the epics and tickets in Sciorex.</span></span>
<span class="line"><span>     Start with Epic 1.</span></span></code></pre></div><p>The agent uses MCP tools:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Agent: I&#39;ll create Epic 1 and its tickets.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Creating Epic: Core Notification Infrastructure]</span></span>
<span class="line"><span>Created: E-001</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Creating Ticket: Database Schema Design]</span></span>
<span class="line"><span>Created: T-001, linked to E-001</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Creating Ticket: Notification Service]</span></span>
<span class="line"><span>Created: T-002, linked to E-001</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Creating Ticket: Event System]</span></span>
<span class="line"><span>Created: T-003, linked to E-001</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Epic 1 is ready. Should I continue with Epic 2?</span></span></code></pre></div><h2 id="step-4-refine-and-adjust" tabindex="-1">Step 4: Refine and Adjust <a class="header-anchor" href="#step-4-refine-and-adjust" aria-label="Permalink to &quot;Step 4: Refine and Adjust&quot;">​</a></h2><h3 id="add-details" tabindex="-1">Add Details <a class="header-anchor" href="#add-details" aria-label="Permalink to &quot;Add Details&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>You: Expand T-002 (Notification Service) with more specific</span></span>
<span class="line"><span>     acceptance criteria and technical requirements.</span></span></code></pre></div><h3 id="adjust-estimates" tabindex="-1">Adjust Estimates <a class="header-anchor" href="#adjust-estimates" aria-label="Permalink to &quot;Adjust Estimates&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>You: T-003 seems too large. Can you break it into smaller tickets?</span></span></code></pre></div><h3 id="reorder-priorities" tabindex="-1">Reorder Priorities <a class="header-anchor" href="#reorder-priorities" aria-label="Permalink to &quot;Reorder Priorities&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>You: Actually, we need email notifications before real-time.</span></span>
<span class="line"><span>     Adjust the priority order.</span></span></code></pre></div><h2 id="planning-prompts" tabindex="-1">Planning Prompts <a class="header-anchor" href="#planning-prompts" aria-label="Permalink to &quot;Planning Prompts&quot;">​</a></h2><h3 id="for-new-features" tabindex="-1">For New Features <a class="header-anchor" href="#for-new-features" aria-label="Permalink to &quot;For New Features&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Plan the implementation of [feature].</span></span>
<span class="line"><span>Consider our current stack: [technologies].</span></span>
<span class="line"><span>Break into epics of 2-4 weeks each.</span></span></code></pre></div><h3 id="for-technical-debt" tabindex="-1">For Technical Debt <a class="header-anchor" href="#for-technical-debt" aria-label="Permalink to &quot;For Technical Debt&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>We need to refactor [component/system].</span></span>
<span class="line"><span>Current issues: [problems].</span></span>
<span class="line"><span>Create a phased approach with minimal disruption.</span></span></code></pre></div><h3 id="for-bug-backlogs" tabindex="-1">For Bug Backlogs <a class="header-anchor" href="#for-bug-backlogs" aria-label="Permalink to &quot;For Bug Backlogs&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Triage and organize these bugs: [list]</span></span>
<span class="line"><span>Group into themes, prioritize by impact.</span></span>
<span class="line"><span>Create a sprint plan.</span></span></code></pre></div><h3 id="for-migrations" tabindex="-1">For Migrations <a class="header-anchor" href="#for-migrations" aria-label="Permalink to &quot;For Migrations&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Plan migration from [old] to [new].</span></span>
<span class="line"><span>Requirements: zero downtime, data integrity.</span></span>
<span class="line"><span>Include rollback strategy.</span></span></code></pre></div><h2 id="epic-templates" tabindex="-1">Epic Templates <a class="header-anchor" href="#epic-templates" aria-label="Permalink to &quot;Epic Templates&quot;">​</a></h2><h3 id="feature-epic" tabindex="-1">Feature Epic <a class="header-anchor" href="#feature-epic" aria-label="Permalink to &quot;Feature Epic&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Feature Name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">epic</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ## Goal</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  [What this achieves]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ## Success Metrics</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  - [Metric 1]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  - [Metric 2]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ## Scope</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ### In Scope</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  - [Item]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ### Out of Scope</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  - [Item]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ## Dependencies</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  - [Dependency]</span></span></code></pre></div><h3 id="technical-epic" tabindex="-1">Technical Epic <a class="header-anchor" href="#technical-epic" aria-label="Permalink to &quot;Technical Epic&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Technical Initiative</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">epic</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ## Problem</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  [Current issue]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ## Solution</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  [Proposed approach]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ## Impact</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  - Performance: [improvement]</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  - Maintenance: [improvement]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  ## Risks</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  - [Risk and mitigation]</span></span></code></pre></div><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><h3 id="epic-sizing" tabindex="-1">Epic Sizing <a class="header-anchor" href="#epic-sizing" aria-label="Permalink to &quot;Epic Sizing&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Size</th><th>Duration</th><th>Tickets</th></tr></thead><tbody><tr><td>Small</td><td>1 week</td><td>3-5</td></tr><tr><td>Medium</td><td>2 weeks</td><td>5-8</td></tr><tr><td>Large</td><td>3-4 weeks</td><td>8-12</td></tr></tbody></table><p>Avoid epics longer than 4 weeks—split them.</p><h3 id="ticket-quality" tabindex="-1">Ticket Quality <a class="header-anchor" href="#ticket-quality" aria-label="Permalink to &quot;Ticket Quality&quot;">​</a></h3><p>Good tickets have:</p><ul><li>Clear title (action + target)</li><li>Detailed description</li><li>Acceptance criteria (checkboxes)</li><li>Estimated size</li><li>Dependencies noted</li></ul><h3 id="progressive-detailing" tabindex="-1">Progressive Detailing <a class="header-anchor" href="#progressive-detailing" aria-label="Permalink to &quot;Progressive Detailing&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1. High-level plan (epics only)</span></span>
<span class="line"><span>2. First epic detailed (full tickets)</span></span>
<span class="line"><span>3. Detail next epic when current is 50% done</span></span>
<span class="line"><span>4. Adjust based on learnings</span></span></code></pre></div><h3 id="review-cycles" tabindex="-1">Review Cycles <a class="header-anchor" href="#review-cycles" aria-label="Permalink to &quot;Review Cycles&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Weekly: Review epic progress</span></span>
<span class="line"><span>Bi-weekly: Adjust priorities</span></span>
<span class="line"><span>Monthly: Revisit long-term plan</span></span></code></pre></div><h2 id="example-complete-planning-session" tabindex="-1">Example: Complete Planning Session <a class="header-anchor" href="#example-complete-planning-session" aria-label="Permalink to &quot;Example: Complete Planning Session&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>You: We&#39;re building a marketplace. Sellers list products,</span></span>
<span class="line"><span>     buyers purchase them. We need:</span></span>
<span class="line"><span>     - Product listings with images</span></span>
<span class="line"><span>     - Shopping cart</span></span>
<span class="line"><span>     - Checkout with Stripe</span></span>
<span class="line"><span>     - Order management</span></span>
<span class="line"><span>     - Seller dashboard</span></span>
<span class="line"><span>     - Reviews and ratings</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Agent: I&#39;ll create a comprehensive plan for the marketplace.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Thinking deeply about architecture, user flows,</span></span>
<span class="line"><span> and technical requirements...]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Here&#39;s my recommended breakdown:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Phase 1: Foundation (4 weeks)</span></span>
<span class="line"><span>- Epic: Product Catalog (2 weeks)</span></span>
<span class="line"><span>- Epic: User Accounts &amp; Roles (2 weeks)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Phase 2: Commerce (4 weeks)</span></span>
<span class="line"><span>- Epic: Shopping Cart (1.5 weeks)</span></span>
<span class="line"><span>- Epic: Checkout &amp; Payments (2.5 weeks)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Phase 3: Operations (3 weeks)</span></span>
<span class="line"><span>- Epic: Order Management (1.5 weeks)</span></span>
<span class="line"><span>- Epic: Seller Dashboard (1.5 weeks)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Phase 4: Engagement (2 weeks)</span></span>
<span class="line"><span>- Epic: Reviews &amp; Ratings (2 weeks)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Total: ~13 weeks to MVP</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Shall I detail Phase 1 with full ticket breakdowns?</span></span></code></pre></div><h2 id="related" tabindex="-1">Related <a class="header-anchor" href="#related" aria-label="Permalink to &quot;Related&quot;">​</a></h2><ul><li><a href="/cookbook/ticket-driven-dev.html">Ticket-Driven Development</a></li><li><a href="/cookbook/chat-ticket-linking.html">Linking Chats to Tickets</a></li><li><a href="/features/ticketing.html">Tickets Reference</a></li><li><a href="/cookbook/research-pipeline.html">Research Pipeline</a></li></ul>`,67)])])}const E=a(l,[["render",t]]);export{g as __pageData,E as default};
