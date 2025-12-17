# Parallel Chats

Sciorex lets you run multiple chat sessions simultaneously, each in its own isolated environment. This is powerful for comparing approaches, running experiments, or working on multiple tasks at once.

## Overview

Parallel chats use [worktrees](/guide/concepts/worktrees) to give each session its own copy of your codebase. Changes made in one session don't affect the others until you explicitly merge them.

## Multi-Chat Launcher

The Multi-Chat Launcher lets you start several chat variants at once with different configurations.

### Opening the Launcher

Access the Multi-Chat Launcher from:

- The Chat view toolbar
- **File → New Parallel Chats**

### Configuration Options

For each chat variant, you can set:

| Option | Description |
|--------|-------------|
| **Prompt** | The initial message (can be same or different) |
| **Model** | Which Claude model to use |
| **Thinking Level** | Extended thinking depth |
| **System Prompt** | Custom instructions for this variant |

### Use Cases

**Compare models**: Send the same prompt to Opus, Sonnet, and Haiku to see how they differ.

**Test approaches**: Ask the same question different ways to find the best approach.

**A/B testing**: Try different system prompts to see which produces better results.

**Parallel exploration**: Work on multiple parts of a problem simultaneously.

### Launching

1. Configure your chat variants
2. Click **Launch All**
3. Each chat starts in its own worktree
4. Monitor progress in the Multi-Worktree Dashboard

## Multi-Chat Comparison

After running parallel chats, use the comparison view to see differences side by side.

### Opening Comparison

From the Multi-Worktree Dashboard, click **Compare** to open the comparison view.

### Comparison Features

| Feature | Description |
|---------|-------------|
| **Side-by-side view** | See responses from each variant |
| **Diff highlighting** | See what's different between responses |
| **File diffs** | Compare file changes across worktrees |
| **Output comparison** | Compare structured outputs |

### Evaluating Results

The comparison view helps you:

- Identify which approach produced better results
- See where different models diverged
- Find the most complete or accurate response
- Decide which changes to keep

## Multi-Worktree Dashboard

The dashboard shows all your parallel sessions and their worktrees.

### Dashboard Features

| Feature | Description |
|---------|-------------|
| **Session list** | All parallel sessions with status |
| **Worktree status** | Which worktree each session uses |
| **File changes** | Summary of changes in each worktree |
| **Comparison links** | Quick access to compare any two sessions |

### Managing Worktrees

From the dashboard you can:

- **View changes**: See what files each session modified
- **Compare**: Open side-by-side comparison
- **Merge**: Bring changes from a worktree into your main branch
- **Discard**: Delete a worktree and its changes
- **Continue**: Resume a paused session

## Worktree Indicator

When viewing a chat, the header shows which worktree it's using:

- **Main** indicates the session is using your main working directory
- **wt-abc123** indicates a dedicated worktree

Click the indicator to see worktree details or switch to the dashboard.

## Workflow Example

Here's a typical parallel chat workflow:

1. **Start**: Launch 3 variants with different models
2. **Monitor**: Watch progress in the dashboard
3. **Compare**: When done, open the comparison view
4. **Evaluate**: Review the approaches and outputs
5. **Merge**: Bring the best changes into your main branch
6. **Clean up**: Discard worktrees you no longer need

## Requirements

Parallel chats require:

- **Worktrees enabled** in Settings → Worktrees
- **Git repository** (worktrees are a Git feature)
- **Sufficient disk space** for multiple working copies

## Settings

Configure parallel chat behavior in **Settings → Worktrees**:

| Setting | Description |
|---------|-------------|
| **Enable Worktrees** | Turn parallel sessions on/off |
| **Directory Prefix** | Prefix for worktree folders |
| **Git Path** | Path to Git executable |

## Best Practices

**Start with a clean state.** Commit or stash your changes before launching parallel chats.

**Use meaningful prompts.** When comparing approaches, make sure your prompts clearly describe what you want.

**Review before merging.** Always review changes before bringing them into your main branch.

**Clean up regularly.** Old worktrees take disk space. Remove them when you're done.

## Related

- [Understanding Worktrees](/guide/concepts/worktrees)
- [Chat Interface](/features/chat)
- [Settings → Worktrees](/guide/settings#worktrees)
