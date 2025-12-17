# Chat Interface

The Chat interface is the primary way to interact with AI in Sciorex. It provides a rich, conversational experience with full access to all AI capabilities, tool controls, and session management.

## Overview

The Chat interface allows you to:

- **Converse with AI** using natural language
- **Control tool access** and permissions per-session
- **Manage conversation history** with labels and filtering
- **Branch conversations** to explore different approaches
- **Link sessions to tickets** for project context
- **Use extended thinking** for complex problems

## Accessing Chat

Navigate to the **Chat** section from the left sidebar. You'll see:

1. **Session List** (left panel) - Your conversation history
2. **Chat View** (center panel) - The active conversation
3. **Input Area** (bottom) - Message composer with controls

---

# Starting a New Chat

## Welcome Screen

When no session is selected, you'll see the welcome screen with a message input. This is where you start new conversations.

## Input Controls

The chat input area includes several selectors:

### Provider & Model Selector

Choose which AI provider and model to use:

**Providers:**
- **Claude Code** - Claude models (Opus, Sonnet, Haiku)
- **Google Gemini** - Gemini models (Pro, Flash)
- **OpenAI Codex** - GPT/Codex models
- **LM Studio** - Local models via LM Studio
- **Ollama** - Local models via Ollama

**Popular Models:**

| Model | Provider | Description |
|-------|----------|-------------|
| **Sonnet 4.5** | Claude | Balanced performance (default) |
| **Opus 4.5** | Claude | Maximum capability |
| **Gemini 2.5 Flash** | Gemini | Fast with large context |
| **GPT-5.1 Codex** | Codex | Code-optimized |
| **qwen2.5-coder** | Local | Privacy-focused coding |

See [Models Reference](/reference/models) for the complete list.

### Permission Mode Selector

Controls how the AI requests permission for tool use:

| Mode | Icon | Description |
|------|------|-------------|
| **Ask for all** | 🛡️ | Prompt for permission on every tool call (safest) |
| **Auto-approve edits** | ⚡ | Auto-approve file edits, ask for bash/dangerous ops |
| **YOLO Mode** | 🚀 | Skip all permission checks (use with caution!) |

::: warning YOLO Mode
YOLO mode bypasses all safety checks. Only use this for trusted, low-risk operations where you're confident in the AI's actions.
:::

### Thinking Level Selector

Enable extended thinking for complex problems:

| Level | Icon | Description | Token Budget |
|-------|------|-------------|--------------|
| **Off** | 💤 | No extended thinking | 0 |
| **Think** | 💭 | Light reasoning | 1,024 |
| **Think Hard** | 🧠 | Deep analysis | 10,000 |
| **Think Harder** | 🔥 | Intensive reasoning | 16,000 |
| **Ultrathink** | ⚡ | Maximum depth | 32,000 |

::: tip Keyboard Shortcuts
- Press `Tab` to cycle through thinking levels
- Press `Shift+Tab` to cycle through permission modes
:::

::: info Customizing Defaults
Change the default thinking level and token budgets in **Settings → AI Providers**.
:::

### Tool Selector

Control which tools the AI can use in this session:

1. Click the **🔧 Tools** button
2. Toggle individual tools on/off
3. Use presets like "Built-in only" or "All tools"

See [MCP Servers](/features/mcp) for detailed tool documentation.

---

# Chat Sessions

## Session List

The left panel shows your conversation history, sorted by most recent first. Each session displays:

- **Title** - Auto-generated from first message or custom title
- **Status** - Running, completed, failed, or cancelled
- **Timestamp** - When the session was last updated
- **Message count** - Number of messages in the conversation
- **Labels** - Colored tags for organization
- **Fork indicators** - Shows if the session is a branch or has branches

## Session Actions

Hover over a session to reveal action buttons:

| Action | Description |
|--------|-------------|
| **Label** | Manage labels for this session |
| **Delete** | Delete or archive the session |

### Archiving Sessions

When deleting a session, you have the option to **archive** it instead:

1. Click the delete button
2. In the modal, select a ticket or epic to link to
3. Click "Archive Chat"

Archived sessions are preserved and accessible from the linked ticket's Sessions tab.

## Session Labels

Labels help organize your conversations:

### Default Labels

Sciorex includes predefined labels that cannot be deleted:

- **Important** - Mark critical conversations
- **Follow-up** - Sessions that need continued attention
- **Reference** - Useful information for later

### Custom Labels

Create your own labels:

1. Click the label button on any session
2. Click "+ Create new label"
3. Enter a name and choose a color
4. The label is automatically assigned

### Filtering by Label

Use the filter controls at the top of the session list:

1. Click on label chips to filter
2. Multiple labels can be selected (OR filter)
3. Click "Clear" to remove filters

### Grouping by Label

Toggle "Group by label" to organize sessions into collapsible sections.

---

# Chat View

## Display Modes

The chat view supports three display modes, accessible via the toggle in the header:

### Extended Mode (Default)

- Full message content displayed
- Tool calls shown with inputs and results
- Best for detailed review and understanding

### Compact Mode

- Condensed message display
- Tool calls collapsed by default
- Good for quick overview of long conversations

### Focus Mode

- Minimal UI distraction
- Only essential information shown
- Ideal for focused work

## Messages

Messages are displayed in conversation order with role indicators:

| Role | Display |
|------|---------|
| **User** | Your messages, right-aligned |
| **Assistant** | Claude's responses, left-aligned |
| **Tool Use** | Tool calls with expandable details |
| **Tool Result** | Results from tool execution |
| **System** | System messages and status updates |

### Tool Call Display

When Claude uses a tool, you'll see:

- **Tool name** with icon
- **Input parameters** (expandable)
- **Execution result** (when complete)
- **Status indicators** for pending/running/completed

#### Supported Tools with Custom Display

The following tools have specialized visualizations:

| Tool | Display Format |
|------|----------------|
| **Read** | File path with syntax highlighting |
| **Write** | File path with content preview |
| **Edit** | File path with diff view (split or unified) |
| **Bash** | Command with `$` prefix, background indicator |
| **BashOutput** | Task ID reference |
| **Glob** | Pattern and path display |
| **Grep** | Search pattern and results |
| **WebFetch** | URL with truncation |
| **WebSearch** | Query display |
| **Task** | Subagent type and description |
| **TodoWrite** | Todo count with expandable list |
| **KillShell** | Task ID being terminated |

#### Diff View Modes

For Edit tool calls, you can toggle between two diff views:

**Split View** (Default)
- Old content shown in red block
- New content shown in green block
- Good for seeing full context

**Unified View**
- Git-style unified diff format
- Lines prefixed with `+` (added) or `-` (removed)
- More compact, shows changes inline

::: tip Changing Default Diff View
Configure your preferred diff view in **Settings → Editor → Default Diff View**.
:::

#### Tool Results

Tool results appear below tool calls with:
- Result content (formatted for readability)
- "Go to call" link to jump to the corresponding tool call
- Expandable for long results

### Thinking Display

When extended thinking is enabled, you'll see Claude's reasoning process:

- Purple-themed collapsible block
- Appears before the main response
- Can be expanded/collapsed
- Shows timestamp
- Long thinking content can be truncated

### Usage Summary

At the end of a response, you may see a usage summary:

| Metric | Description |
|--------|-------------|
| **Cost** | API cost in USD |
| **Duration** | Response time |
| **Speed** | Tokens per second |
| **Tokens** | Input, output, and cached counts |

---

# Session Header

The session header displays key information and provides quick actions:

## Session Info Display

- **Icon** - Agent icon or chat icon for plain chats
- **Title** - Click to edit, auto-saves on blur
- **Start time** - When the session began
- **Duration** - Elapsed time (updates live for running sessions)
- **Model badge** - Which Claude model is being used
- **Permission mode badge** - Current permission setting
- **Status badge** - Running, completed, failed, etc.
- **Linked ticket badge** - If linked to a ticket
- **Linked epic badge** - If linked to an epic

## Session Options Menu

Click the three-dot menu to access:

| Option | Description |
|--------|-------------|
| **Go to Parent** | Navigate to parent session (for forks) |
| **Link to Ticket** | Associate with a ticket |
| **Unlink Ticket** | Remove ticket association |
| **Link to Epic** | Associate with an epic |
| **Unlink Epic** | Remove epic association |
| **Archive** | Archive session with link |
| **Unarchive** | Restore archived session |
| **Delete Chat** | Permanently remove session |

### Linking Behavior

When linking sessions to tickets and epics:

- Linking to a ticket that has an epic automatically links to that epic
- When session is linked to an epic, only tickets from that epic are shown
- Archived sessions require at least one link (ticket or epic)
- Unlinking from an archived session shows a warning

---

# Interaction Requests

Claude can ask questions during execution using the `sciorex_ask_user` tool:

## Question Types

| Type | Description |
|------|-------------|
| **Single** | Radio button selection (pick one) |
| **Multiple** | Checkbox selection (pick many) |
| **Text** | Free-form text input |

## Interaction Modal

When Claude asks a question:

- Question text is displayed prominently
- Context information if provided
- Predefined options (if any)
- Text input field (if enabled)
- Skip option for optional questions
- Urgency indicator (blocking, important, optional)

## Responding

1. Select from predefined options and/or enter custom text
2. Click "Submit" to send your response
3. Claude continues with your input

---

# Retry Functionality

When a session fails or is cancelled, you can retry:

## Retry Indicator

On the last user message, you'll see:
- Red warning indicator
- "Message failed" or "Message stopped" text
- **Retry button** to resend the message

## How Retry Works

1. Click the Retry button on the failed message
2. The same message is sent again
3. A new execution starts from that point
4. Previous failed response is preserved in history

---

# Subagent Display

When Claude spawns a subagent using the Task tool:

## Subagent Block

Subagent conversations are grouped visually:
- Distinct border and background
- Subagent type indicator
- Collapsible child messages
- Result summary when complete

## Nested Conversations

Subagents can:
- Use their own tools
- Have their own thinking blocks
- Return results to parent agent

---

# Permissions System

Sciorex has a sophisticated permission system that balances AI capability with user control.

## Permission Flow Types

There are two permission handling flows:

### Reactive Flow (Default)

The reactive flow waits for Claude to attempt a tool call, then asks for permission:

1. Claude decides to use a tool
2. Execution pauses
3. Permission modal appears
4. You approve or deny
5. Execution continues or stops

### Proactive Flow (MCP Permissions)

When "Use MCP Permissions" is enabled, permissions are handled proactively:

1. Before executing, the MCP server checks permissions
2. If permission needed, request is sent to app
3. Permission modal appears
4. You approve or deny
5. Result is sent back to MCP server

::: info Configuring MCP Permissions
Enable MCP Permissions in **Settings → Chat Defaults → Use MCP Permissions**.
:::

## Permission Modal

When a permission is requested, you'll see a modal with:

- **Tool name** - What Claude wants to use
- **Input details** - What it wants to do
- **Approve button** - Allow this action
- **Deny button** - Block this action
- **Remember checkbox** - Apply decision to future similar requests

## Permission Modes in Detail

### Ask for All (Normal Mode)

Every tool call requires explicit approval:

```
User: "Create a file called hello.txt"
Claude: [Requests Write tool permission]
Modal: "Claude wants to create file: hello.txt. Approve?"
```

**Best for**: Learning Claude's behavior, sensitive codebases, unfamiliar tasks.

### Auto-approve Edits

File operations are auto-approved, but bash commands still require permission:

```
User: "Refactor the login function"
Claude: [Automatically approved: Edit, Write, Read]
Claude: [Requires approval: Bash commands]
```

**Best for**: Active development sessions where you trust Claude's file edits.

### YOLO Mode

All tool calls are auto-approved with no prompts:

```
User: "Set up the entire project"
Claude: [All operations execute without prompts]
```

**Best for**: Trusted tasks, sandboxed environments, or when you want to observe Claude's full autonomous capability.

---

# Branching Conversations

Branching lets you explore alternative approaches without losing your original conversation.

## Types of Branches

### Soft Branch

A soft branch continues from the end of the current conversation:

1. Type your message
2. Click the dropdown arrow on Send
3. Select "Send & Branch"

This creates a new session that continues from the same point.

### Hard Fork

A hard fork branches from a specific message in the conversation:

1. Find the message you want to fork from
2. Click the fork icon on that message
3. Type your new direction
4. The Fork button replaces Send

This creates a branch from that exact point, not the end.

## Navigating Branches

### Fork Indicators

Sessions show fork status:

- **Has branches** - Shows count of sessions forked from this one
- **Is a fork** - Shows indicator that this is a branched session

### Parent Navigation

When viewing a forked session:

- A banner shows "Forked from: [parent session]"
- Click "Go to parent" to navigate to the original

### Context Display

Toggle "Show parent context" to see messages from before the fork point.

---

# Real-time Features

## Live Updates

The chat view updates in real-time:

- New messages appear instantly
- Tool execution progress is shown
- Status changes are reflected immediately

## Scroll Behavior

Smart scrolling keeps you at the bottom during active conversations:

- Auto-scrolls when new content arrives
- Pauses auto-scroll if you scroll up
- "New messages" button appears when you're not at bottom

## Background Tasks

Long-running bash commands show in a dedicated panel:

- Command and description displayed
- Status indicator (running/completed/killed)
- Kill button to terminate

## Todo Tracking

When Claude uses the TodoWrite tool, a todo panel appears:

- Shows current task list
- Progress statistics
- Completion status for each item

---

# Slash Commands

Type `/` to access slash commands:

| Command | Description |
|---------|-------------|
| `/add-dir` | Add a directory to context |
| `/clear` | Clear conversation |
| `/compact` | Toggle compact mode |
| `/config` | Show configuration |
| `/cost` | Show token cost |
| `/doctor` | Run diagnostics |
| `/help` | Show help |
| `/init` | Initialize project |
| `/memory` | Manage memory |
| `/model` | Change model |
| `/pr-comments` | Handle PR comments |
| `/release-notes` | Generate release notes |
| `/review` | Code review |
| `/terminal-setup` | Setup terminal |
| `/vim` | Toggle vim mode |

## Using Slash Commands

1. Type `/` at the start of your message
2. A dropdown appears with available commands
3. Type to filter or use arrow keys to navigate
4. Press Enter to execute

---

# Mentions System

Type `@` to mention files, directories, or URLs:

| Type | Symbol | Description |
|------|--------|-------------|
| **File** | `@` | Reference a specific file |
| **Directory** | `@` | Reference a directory |
| **URL** | `@` | Include content from a URL |

## Using Mentions

1. Type `@` in your message
2. Start typing the path or URL
3. Select from suggestions or continue typing
4. The reference is inserted into your message

Claude will receive the content of mentioned items as context.

---

# Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message (default) |
| `Shift+Enter` | New line |
| `Tab` | Cycle thinking levels |
| `Shift+Tab` | Cycle permission modes |
| `Escape` | Close modals, cancel operations |
| `↑` / `↓` | Navigate dropdowns |

::: tip Customizing Submit Shortcut
Change the submit shortcut in **Settings → Chat Defaults → Submit Shortcut**. Options include Enter, Shift+Enter, Ctrl+Enter, and Cmd+Enter.
:::

---

# Settings & Configuration

## Chat Defaults

Configure in **Settings → AI Providers** and **Settings → Chat**:

| Setting | Location | Description |
|---------|----------|-------------|
| **Default Provider** | AI Providers | AI provider for new chats |
| **Default Model** | AI Providers | Model for new chats |
| **Default Permission Mode** | AI Providers | Initial permission level (Normal, Auto-approve, YOLO) |
| **Default Thinking Level** | AI Providers | Initial thinking depth |
| **Thinking Budgets** | AI Providers | Token limits per thinking level |
| **Display Mode** | Chat | How messages display (Extended, Compact, Focus) |
| **Diff View** | Chat | How edits display (Split, Unified) |
| **Send Shortcut** | Chat | Key combination to send messages |
| **Open Links Externally** | Chat | Open URLs in system browser |

See the full [Settings Reference](/guide/settings) for all options.

---

# Integration with Tickets

## Linking Sessions

Sessions can be linked to tickets:

1. From the session delete modal, choose "Archive"
2. Select a ticket from the dropdown
3. The session is preserved and accessible from the ticket

## Viewing Linked Sessions

In the Ticket Detail panel:

1. Go to the "Sessions" tab
2. See all linked chat and agent sessions
3. Click to open or view archived sessions

See [Linking Sessions to Tickets](/features/ticketing#linking-sessions-to-tickets) for more details.

---

# Notifications

Configure chat notifications in **Settings → Notifications**:

| Setting | Description |
|---------|-------------|
| **Chat Complete** | Notify when Claude finishes responding |
| **Permission Request** | Notify when permission needed |
| **Interaction Request** | Notify when Claude asks a question |
| **Sound** | Play notification sound |
| **Desktop** | Show system notifications |

---

# Troubleshooting

## Common Issues

### Chat Won't Start

**Symptoms**: Clicking send does nothing or shows error.

**Solutions**:
1. Check that your AI provider is configured correctly
2. Verify network connectivity
3. Check Settings → API for path issues

### Messages Not Appearing

**Symptoms**: Sent message but no response visible.

**Solutions**:
1. Check the session status (may be "running")
2. Wait for Claude to respond
3. Scroll to bottom of conversation

### Permission Modal Stuck

**Symptoms**: Permission modal appears but actions don't work.

**Solutions**:
1. Try clicking Approve or Deny again
2. Check for JavaScript errors in console
3. Restart the application

### Tools Not Available

**Symptoms**: Tool selector shows no tools.

**Solutions**:
1. Wait for tool discovery to complete
2. Restart application
3. Check MCP server configuration

---

# Related Documentation

- [MCP Servers](/features/mcp) - Tool documentation and configuration
- [Ticketing Dashboard](/features/ticketing) - Link sessions to tickets
- [Creating Agents](/features/agents) - Configure specialized AI agents
- [Extended Thinking](/features/agents#extended-thinking) - Deep reasoning capabilities
