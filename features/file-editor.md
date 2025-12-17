# File Editor

Sciorex includes an integrated code editor for viewing and editing files in your workspace. You can review agent changes, make quick edits, or work alongside AI sessions.

## Opening Files

Open files by:

- Clicking a file in the **File Tree** (left panel)
- Clicking file links in chat messages or tool results
- Double-clicking to open in a new tab (or single-click if enabled in settings)

## Editor Features

### Syntax Highlighting

The editor automatically detects file types and applies syntax highlighting for:

- JavaScript, TypeScript, JSX, TSX
- Python, Ruby, Go, Rust
- HTML, CSS, SCSS, JSON, YAML
- Markdown and many more

### Tabs

Open multiple files in tabs:

- Click the X to close a tab
- Middle-click to close
- Drag tabs to reorder
- Modified files show a dot indicator

### Split Views

Work with multiple files side by side:

- **Vertical split**: Files appear left and right
- **Horizontal split**: Files appear top and bottom
- Drag the divider to resize

### Minimap

A code overview appears on the right side of the editor, showing a zoomed-out view of your file. Click anywhere on the minimap to jump to that location.

::: tip
Toggle the minimap in **Settings → Editor → Minimap**.
:::

## Editing

### Basic Operations

| Action | Shortcut |
|--------|----------|
| Save | Ctrl+S |
| Save All | Ctrl+Shift+S |
| Undo | Ctrl+Z |
| Redo | Ctrl+Shift+Z |
| Find | Ctrl+F |
| Find and Replace | Ctrl+H |
| Go to Line | Ctrl+G |

### Selection and Editing

| Action | Shortcut |
|--------|----------|
| Select Next Occurrence | Ctrl+D |
| Toggle Comment | Ctrl+/ |
| Delete Line | Ctrl+Shift+K |
| Move Line Up | Alt+Up |
| Move Line Down | Alt+Down |
| Toggle Word Wrap | Alt+Z |

### Vim Mode

Enable vim-style keybindings in **Settings → Editor → Vim Mode**.

When enabled, you can use:
- `h`, `j`, `k`, `l` for navigation
- `i`, `a`, `o` to enter insert mode
- `v` for visual selection
- `dd`, `yy`, `p` for delete, yank, paste
- `:w` to save, `:q` to close

## File Tree

The file tree on the left shows your workspace structure.

### Navigation

- Click folders to expand/collapse
- Click files to open them
- Use arrow keys to navigate

### Context Menu

Right-click files or folders for options:

| Option | Description |
|--------|-------------|
| **Reveal in Explorer** | Open in system file manager |
| **Copy Path** | Copy the file path to clipboard |
| **Rename** | Rename the file (F2) |
| **Delete** | Move to trash (Delete key) |
| **Copy** | Copy file (Ctrl+C) |
| **Cut** | Cut file (Ctrl+X) |
| **Paste** | Paste file (Ctrl+V) |

### Filtering

The file tree respects your exclude settings:

- Files matching `.gitignore` patterns are hidden (if enabled)
- Custom exclude patterns hide additional files/folders

Configure in **Settings → Files**.

## Preview Mode

### Markdown Preview

Markdown files can be viewed in preview mode:

- Toggle between edit and preview
- Live preview updates as you type
- Rendered with GitHub-flavored markdown

## Editor Settings

Customize the editor in **Settings → Editor**:

| Setting | Description |
|---------|-------------|
| **Vim Mode** | Enable vim keybindings |
| **Editor Theme** | Color scheme (Tokyo Night, GitHub Light, High Contrast) |
| **Insert Spaces** | Use spaces instead of tabs |
| **Tab Size** | Spaces per indentation (2, 4, 8) |
| **Word Wrap** | Wrap long lines |
| **Line Numbers** | Show line numbers |
| **Minimap** | Show code overview |
| **Single Click Open** | Open files with single click |

## Integration with Chat

When Claude edits files, you can:

- See the changes in the chat as diffs
- Click file links to open the edited file
- Review changes before they're applied (depending on permission mode)

The editor and chat work together so you always know what's being modified.
