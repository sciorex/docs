import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Sciorex",
  description: "The King of Knowledge - AI Agent Orchestration Platform",
  ignoreDeadLinks: true,
  srcExclude: ['**/README.md'],

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#5c7cfa' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Sciorex Docs' }],
  ],

  // Multi-language configuration
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    es: {
      label: 'Español',
      lang: 'es',
      link: '/es/',
    },
  },

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'Sciorex Docs',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Features', link: '/features/dashboard' },
      { text: 'Cookbook', link: '/cookbook/' },
      { text: 'Reference', link: '/reference/' },
      { text: 'Architecture', link: '/architecture/ai-backend' },
      {
        text: 'More',
        items: [
          { text: 'FAQ', link: '/guide/faq' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Download', link: 'https://sciorex.com/#download' },
        ]
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Agents', link: '/guide/concepts/agents' },
            { text: 'Workflows', link: '/guide/concepts/workflows' },
            { text: 'Tickets', link: '/guide/concepts/tickets' },
            { text: 'MCP Tools', link: '/guide/concepts/mcp' },
            { text: 'Worktrees', link: '/guide/concepts/worktrees' },
          ]
        },
        {
          text: 'Reference',
          items: [
            { text: 'Settings', link: '/guide/settings' },
            { text: 'Troubleshooting', link: '/guide/troubleshooting' },
            { text: 'FAQ', link: '/guide/faq' },
          ]
        },
      ],
      '/cookbook/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Overview', link: '/cookbook/' },
            { text: 'Your First Agent', link: '/cookbook/first-agent' },
          ]
        },
        {
          text: 'Agents',
          collapsed: false,
          items: [
            { text: 'Code Review Agent', link: '/cookbook/code-review-agent' },
            { text: 'Documentation Generator', link: '/cookbook/docs-generator' },
            { text: 'Agent with Custom Tools', link: '/cookbook/agent-custom-tools' },
            { text: 'Chaining Agents', link: '/cookbook/chaining-agents' },
          ]
        },
        {
          text: 'Flows',
          collapsed: false,
          items: [
            { text: 'Simple Sequential Flow', link: '/cookbook/simple-flow' },
            { text: 'Conditional Branching', link: '/cookbook/conditional-flow' },
            { text: 'Parallel Execution', link: '/cookbook/parallel-flow' },
            { text: 'Research Pipeline', link: '/cookbook/research-pipeline' },
            { text: 'Bug Triage System', link: '/cookbook/bug-triage' },
          ]
        },
        {
          text: 'Tickets',
          collapsed: false,
          items: [
            { text: 'Ticket-Driven Development', link: '/cookbook/ticket-driven-dev' },
            { text: 'Linking Chats to Tickets', link: '/cookbook/chat-ticket-linking' },
            { text: 'Epic Planning with AI', link: '/cookbook/epic-planning' },
          ]
        },
        {
          text: 'Advanced',
          collapsed: false,
          items: [
            { text: 'Multi-Model Comparison', link: '/cookbook/model-comparison' },
            { text: 'Custom MCP Server', link: '/cookbook/custom-mcp' },
          ]
        },
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'Overview', link: '/reference/' },
            { text: 'Models', link: '/reference/models' },
          ]
        },
      ],
      '/features/': [
        {
          text: 'Overview',
          collapsed: false,
          items: [
            { text: 'Dashboard', link: '/features/dashboard' },
            { text: 'Activity Feed', link: '/features/activity' },
          ]
        },
        {
          text: 'Chat Interface',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/features/chat' },
            { text: 'Session Management', link: '/features/chat#chat-sessions' },
            { text: 'Display Modes', link: '/features/chat#display-modes' },
            { text: 'Permissions', link: '/features/chat#permissions-system' },
            { text: 'Branching', link: '/features/chat#branching-conversations' },
            { text: 'Slash Commands', link: '/features/chat#slash-commands' },
            { text: 'Parallel Chats', link: '/features/parallel-chats' },
          ]
        },
        {
          text: 'AI Agents',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/features/agents' },
            { text: 'Creating Agents', link: '/features/agents#creating-an-agent' },
            { text: 'Tool Permissions', link: '/features/agents#tool-permissions' },
            { text: 'Extended Thinking', link: '/features/agents#extended-thinking' },
            { text: 'Agent Runs', link: '/features/agent-runs' },
          ]
        },
        {
          text: 'Flow Editor',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/features/flows/overview' },
            { text: 'Node Types', link: '/features/flows/overview#node-types' },
            { text: 'Creating Flows', link: '/features/flows/overview#creating-a-flow' },
            { text: 'Examples', link: '/features/flows/overview#example-flows' },
            { text: 'Flow Runs', link: '/features/flow-runs' },
          ]
        },
        {
          text: 'Ticket Management',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/features/ticketing' },
            { text: 'Kanban Board', link: '/features/ticketing#kanban-board-view' },
            { text: 'Epics', link: '/features/ticketing#epics' },
            { text: 'Subtasks', link: '/features/ticketing#subtasks' },
            { text: 'Linking Sessions', link: '/features/ticketing#linking-sessions-to-tickets' },
          ]
        },
        {
          text: 'MCP Servers',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/features/mcp' },
            { text: 'Ticket Tools', link: '/features/mcp#ticket-tools' },
            { text: 'User Interactions', link: '/features/mcp#vibe-interactions-server' },
            { text: 'Custom Servers', link: '/features/mcp#adding-custom-mcp-servers' },
          ]
        },
        {
          text: 'Tools',
          collapsed: false,
          items: [
            { text: 'File Editor', link: '/features/file-editor' },
            { text: 'VS Code Integration', link: '/features/vscode-integration' },
            { text: 'Process Explorer', link: '/features/process-explorer' },
          ]
        },
      ],
      '/architecture/': [
        {
          text: 'Architecture',
          items: [
            { text: 'AI Backend', link: '/architecture/ai-backend' },
            { text: 'Claude Code CLI', link: '/architecture/ai-backend#claude-code-cli' },
            { text: 'Supported Features', link: '/architecture/ai-backend#supported-claude-code-features' },
            { text: 'MCP Integration', link: '/architecture/ai-backend#mcp-server-integration' },
            { text: 'Permission System', link: '/architecture/ai-backend#permission-system' },
            { text: 'Process Management', link: '/architecture/ai-backend#process-management' },
            { text: 'Output Parsing', link: '/architecture/ai-backend#output-parsing' },
          ]
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sciorex/sciorex' },
      { icon: 'x', link: 'https://x.com/sciorex' },
      { icon: 'discord', link: 'https://discord.gg/sciorex' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-2025 Sciorex'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/sciorex/docs/edit/main/:path',
      text: 'Edit this page on GitHub'
    },
  }
})
