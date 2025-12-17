# Changelog

All notable changes to Sciorex are documented here.

For the latest releases and downloads, see [GitHub Releases](https://github.com/sciorex/sciorex/releases).

## [0.0.1] - Alpha Release

*Initial alpha release*

### Features

- **Chat Interface**
  - Real-time streaming responses
  - Multi-session support
  - Session branching and history
  - Tool permission management

- **Agents**
  - Custom agent creation with YAML
  - Model selection (Opus, Sonnet, Haiku)
  - Extended thinking support
  - Output schemas for structured responses
  - Tool permissions per agent

- **Ticket Management**
  - Kanban board with drag-and-drop
  - YAML-based ticket storage
  - Epic and sub-ticket relationships
  - Status workflow (backlog → done)
  - Link tickets to chat sessions

- **Flows**
  - Visual flow editor
  - Agent nodes with input/output
  - Conditional branching
  - Loop constructs
  - Manual triggers

- **Git Worktrees**
  - Isolated worktree per session
  - Branch management
  - Change review before merge

- **Parallel Chats**
  - Launch multiple sessions simultaneously
  - Compare outputs side-by-side
  - Multi-Chat Launcher

- **MCP Integration**
  - Built-in Sciorex MCP servers
  - Support for external MCP servers
  - Dynamic tool registration

### Known Issues

- Large conversation history may cause UI lag
- Some keyboard shortcuts may conflict on certain systems
- Flow execution preview limited to basic visualizations

---

## Versioning

Sciorex follows [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes

## Update Notifications

Sciorex checks for updates automatically. When a new version is available:
1. You'll see a notification in the app
2. Click to download the latest version
3. Install and restart

For critical security updates, Sciorex may require an update before continuing.

## Release Channels

| Channel | Stability | Updates |
|---------|-----------|---------|
| **Stable** | Production-ready | Monthly |
| **Beta** | Feature complete, testing | Bi-weekly |
| **Alpha** | Experimental | Frequent |

Currently, only the **Alpha** channel is available.

## Reporting Issues

Found a bug in a new release?

1. Check if it's already reported: [GitHub Issues](https://github.com/sciorex/sciorex/issues)
2. If not, [create a new issue](https://github.com/sciorex/sciorex/issues/new/choose)
3. Include:
   - Version number
   - Steps to reproduce
   - Expected vs actual behavior
   - System information
