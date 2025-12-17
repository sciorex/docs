# Code Review Agent

Create an AI agent that reviews code changes and provides actionable feedback.

**Difficulty**: Beginner
**Time**: 10 minutes

## What You'll Build

An agent that:
- Analyzes code diffs
- Identifies potential bugs and security issues
- Suggests improvements and best practices
- Provides inline comments

![Code Review Agent](/images/cookbook/code-review-agent.svg)
*TBD: Replace with screenshot of code review agent in action*

## Prerequisites

- Sciorex installed and configured
- A workspace with code to review

## Step 1: Create the Agent

1. Navigate to **Agents** in the sidebar
2. Click **+ New Agent**
3. Enter the following configuration:

```yaml
name: Code Reviewer
description: Reviews code for bugs, security issues, and best practices

systemPrompt: |
  You are an expert code reviewer. When reviewing code:

  1. Look for bugs, logic errors, and edge cases
  2. Check for security vulnerabilities (injection, XSS, etc.)
  3. Identify performance issues
  4. Suggest improvements for readability and maintainability
  5. Note any missing error handling
  6. Check for proper typing (if applicable)

  Be constructive and specific. Explain WHY something is an issue
  and HOW to fix it. Use code examples when helpful.

  Format your review with clear sections:
  - 🐛 Bugs
  - 🔒 Security
  - ⚡ Performance
  - 💡 Suggestions

model: claude-sonnet-4-5-20250929
thinkingLevel: think
```

4. Click **Save**

## Step 2: Configure Permissions

For code review, the agent needs read access but shouldn't modify files:

```yaml
allowedTools:
  - Read
  - Glob
  - Grep
```

This ensures the agent can:
- Read files to understand context
- Search for related code
- But NOT make any changes

## Step 3: Use the Agent

### Option A: Chat Interface

1. Go to **Chat**
2. Select your **Code Reviewer** agent from the dropdown
3. Paste a code snippet or ask it to review a file:

```
Please review the changes in src/auth/login.ts
```

### Option B: Link to a Ticket

1. Create a ticket for the code review task
2. Start a chat session linked to that ticket
3. The agent's review becomes part of the ticket history

## Example Output

Here's what a review might look like:

```markdown
## Code Review: src/auth/login.ts

### 🐛 Bugs

**Line 45**: Password comparison uses `==` instead of `===`
```typescript
// Current
if (password == storedHash)

// Fixed
if (password === storedHash)
```

### 🔒 Security

**Line 23**: User input not sanitized before SQL query
- Risk: SQL injection vulnerability
- Fix: Use parameterized queries

### ⚡ Performance

**Line 67-80**: Multiple database calls in a loop
- Consider batching these queries

### 💡 Suggestions

- Add rate limiting to prevent brute force attacks
- Consider adding 2FA support
```

## Advanced: Review Git Diffs

Create a variant that specifically reviews git changes:

```yaml
systemPrompt: |
  You are a code reviewer focusing on git diffs.

  First, run: git diff HEAD~1

  Then analyze only the changed lines, considering:
  - What the change is trying to accomplish
  - Whether the implementation is correct
  - Any risks introduced by the change
```

## Tips

- **Be specific**: Ask the agent to focus on particular aspects (security, performance, etc.)
- **Provide context**: Tell the agent what the code is supposed to do
- **Use thinking mode**: Enable extended thinking for complex reviews
- **Iterate**: Ask follow-up questions about specific issues

## Related

- [Your First Agent](/cookbook/first-agent) - Start here if new to agents
- [Agents Reference](/features/agents) - Full configuration options
- [Models Reference](/reference/models) - Choose the right Claude model
- [Tool Permissions](/features/agents#tool-permissions) - Control what agents can do
- [Extended Thinking](/reference/models#extended-thinking) - Enable deeper reasoning
