# Troubleshooting

Common issues and how to fix them. Can't find your issue? [Open a GitHub issue](https://github.com/sciorex/sciorex/issues).

::: tip Quick Fixes
Most issues can be resolved by:
1. Restarting the application
2. Re-authenticating Claude CLI (`claude login`)
3. Checking your internet connection
:::

## Installation Issues

### Claude CLI not found

**Symptom:** Sciorex shows "Claude Code CLI not found" or AI features don't work.

**Solution:**

1. Install Claude Code CLI:
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. Verify it's installed:
   ```bash
   claude --version
   ```

3. If still not found, check your PATH. The CLI needs to be accessible from your terminal.

### Permission errors on Linux (AppImage)

**Symptom:** Cannot run the AppImage file.

**Solution:**
```bash
chmod +x Sciorex-*.AppImage
```

### macOS security warning

**Symptom:** macOS says the app is from an unidentified developer.

**Solution:**
1. Open **System Preferences** → **Security & Privacy**
2. Click **Open Anyway** next to the blocked app message

### Windows Defender blocking

**Symptom:** Windows SmartScreen blocks the installer.

**Solution:**
1. Click **More info**
2. Click **Run anyway**

## Chat and Agent Issues

### Chat won't start

**Possible causes:**
- Claude CLI not installed or not in PATH
- No internet connection
- API authentication expired

**Solutions:**
1. Check Claude CLI is working: `claude --version`
2. Re-authenticate: `claude login`
3. Check your network connection

### Messages not appearing

**Symptom:** You send a message but nothing shows up.

**Check:**
- Session status (should be "running")
- Scroll to bottom of conversation
- Check for error indicators

### Permission modal stuck

**Symptom:** Permission request appears but buttons don't work.

**Solutions:**
1. Click the buttons again
2. Press Escape to close and retry
3. Restart the application

### Agent runs indefinitely

**Symptom:** Agent keeps running without producing output.

**Solutions:**
1. Check the status indicator
2. Cancel the session if needed
3. Some complex tasks legitimately take time, especially with extended thinking enabled

## Ticket Issues

### Tickets not loading

**Check:**
- The `.sciorex/tickets/` directory exists
- YAML files are valid (no syntax errors)
- File permissions allow reading

**Fix invalid YAML:**
Open the ticket file and check for:
- Missing colons after field names
- Incorrect indentation
- Unclosed quotes

### Drag and drop not working

**Possible causes:**
- Invalid status transition (not all moves are allowed)
- Ticket has blockers
- File permission issues

**Check the status transition rules:**
| From | Can move to |
|------|-------------|
| Backlog | Planned, Cancelled |
| Planned | Backlog, In Progress, Cancelled |
| In Progress | Planned, In Review, Done, Cancelled |
| In Review | In Progress, Done, Cancelled |
| Done | In Progress |

### Changes not saving

**Check:**
- Write permissions on `.sciorex/` directory
- Disk space available
- No file locks from other programs

## Flow Issues

### Flow won't run

**Check:**
- Flow has at least one trigger node
- All nodes are connected
- Agent references exist
- No validation errors (check for warnings)

### Flow stuck on a node

**Possible causes:**
- Agent taking a long time
- Wait node expecting input
- Error in previous node

**Solutions:**
1. Check the node status
2. Provide input if it's a Wait node
3. Cancel and check logs for errors

### Data not passing between nodes

**Check your template syntax:**
```
Correct:   {{previousNode.output}}
Correct:   {{nodes.myAgent.output.summary}}
Wrong:     {previousNode.output}
Wrong:     {{previousNode}}
```

## Performance Issues

### Application running slowly

**Try:**
1. Close unused sessions
2. Reduce the number of background tasks
3. Restart the application
4. Check system resources (RAM, CPU)

### Large conversations lagging

Very long conversations can slow down the UI. Consider:
- Starting a new session
- Branching to continue with less context
- Archiving old sessions

## Data and Storage

### Where is my data stored?

All data is in your workspace's `.sciorex/` directory:

```
.sciorex/
├── agents/      # Agent definitions
├── flows/       # Flow definitions
├── tickets/     # Ticket files
├── epics/       # Epic files
├── sessions/    # Chat and agent sessions
└── config/      # Settings
```

### How to back up

Since everything is in `.sciorex/`, you can:
- Commit it to Git (recommended)
- Copy the directory manually
- Use your normal backup tools

### Recovering deleted data

If you committed `.sciorex/` to Git, use `git checkout` to restore files.

Otherwise, check your system's trash/recycle bin, the files might still be there.

## MCP Server Issues

### MCP tools not appearing

**Symptom:** Custom MCP tools don't show up in the tool permissions.

**Solutions:**
1. Check that Claude CLI has the MCP server configured: `claude mcp list`
2. Verify the server is running and accessible
3. Check the MCP server logs for errors
4. Restart the chat session

### MCP server crashes

**Symptom:** Session fails with MCP-related errors.

**Check:**
- Server dependencies are installed
- Server script has execute permissions
- No port conflicts with other services
- Server configuration is valid JSON/YAML

### Sciorex MCP servers not working

The built-in Sciorex MCP servers (`sciorex-tickets`, `sciorex-interactions`, `sciorex-resources`) require:
- A valid workspace to be open
- The `.sciorex/` directory to exist
- Proper file permissions

**Reset MCP servers:**
1. Go to Settings → MCP
2. Click "Reconnect All"
3. If that fails, restart the application

## Git Worktree Issues

### Worktree creation fails

**Symptom:** Cannot create a new worktree for a session.

**Check:**
- You have a Git repository initialized
- The target directory doesn't already exist
- You have write permissions to the parent directory

**Manual fix:**
```bash
# Remove orphan worktree references
git worktree prune

# List current worktrees
git worktree list
```

### Worktree changes not syncing

**Remember:** Worktrees are independent working directories. Changes in one don't automatically appear in others.

**To sync:**
1. Commit changes in the source worktree
2. In the target worktree: `git fetch && git merge origin/branch`

Or use the built-in sync button in the session panel.

## API and Authentication

### "Authentication expired" error

**Solution:**
```bash
claude login
```

Then restart the Sciorex session.

### Rate limiting errors

**Symptom:** Messages fail with rate limit errors.

**Solutions:**
1. Wait a few minutes before retrying
2. Reduce the frequency of requests
3. Check your Anthropic API usage dashboard
4. Consider upgrading your API plan

### Extended thinking not working

**Check:**
- Model supports extended thinking (Opus, Sonnet)
- Agent has thinking level set (`thinkingLevel: think`)
- You have sufficient API credits for extended thinking

## Error Codes

| Error | Meaning | Solution |
|-------|---------|----------|
| `ECLI_NOT_FOUND` | Claude CLI not installed | Install Claude CLI |
| `EAUTH_EXPIRED` | Authentication expired | Run `claude login` |
| `ERATE_LIMIT` | Too many requests | Wait and retry |
| `EMCP_CONNECT` | MCP server connection failed | Check server status |
| `EWORKSPACE` | Workspace not found | Open a valid directory |
| `EPERMISSION` | Insufficient permissions | Check file/tool permissions |

## Debug Mode

For advanced troubleshooting, enable debug mode:

1. Go to **Settings** → **Advanced**
2. Enable **Debug Mode**
3. Restart the application
4. Check the developer console (`Ctrl/Cmd + Shift + I`) for detailed logs

## Log Files

Log files are stored at:

| Platform | Location |
|----------|----------|
| Windows | `%APPDATA%\Sciorex\logs\` |
| macOS | `~/Library/Logs/Sciorex/` |
| Linux | `~/.config/Sciorex/logs/` |

Include relevant log excerpts when filing bug reports.

## Reset Options

### Soft Reset
Clear the current session without losing data:
- Close all sessions
- Restart the application

### Reset Workspace Settings
Delete `.sciorex/config/` to reset workspace-specific settings.

### Full Reset
::: danger
This will delete all Sciorex data for the workspace.
:::

```bash
rm -rf .sciorex/
```

## Getting More Help

If you're still stuck:

1. **Search existing issues**: [GitHub Issues](https://github.com/sciorex/sciorex/issues)
2. **Join the community**: [Discord](https://discord.gg/sciorex)
3. **File a new issue** with:
   - Steps to reproduce
   - Expected vs actual behavior
   - OS and Sciorex version (`Help → About`)
   - Relevant log excerpts
   - Screenshots if applicable

::: tip
Include your Sciorex version number when asking for help. Find it in **Help → About** or the settings panel.
:::
