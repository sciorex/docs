# Building a Custom MCP Server

Create your own MCP server to extend agent capabilities with custom integrations.

**Difficulty**: Advanced
**Time**: 30 minutes

## What You'll Build

A custom MCP server that:
- Exposes tools to Claude agents
- Integrates with external services
- Handles requests and returns structured data

![Custom MCP Server](/images/cookbook/custom-mcp.svg)
*TBD: Replace with diagram of MCP architecture*

## Prerequisites

- Node.js 18+ installed
- Understanding of [MCP concepts](/guide/concepts/mcp)
- Basic TypeScript/JavaScript knowledge

## Overview

MCP (Model Context Protocol) allows agents to call external tools. You'll create a server that:

1. Defines available tools
2. Handles tool calls from agents
3. Returns results

## Step 1: Project Setup

Create a new project:

```bash
mkdir my-mcp-server
cd my-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

## Step 2: Create the Server

Create `src/index.ts`:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

// Define your tool schemas
const WeatherInputSchema = z.object({
  city: z.string().describe("City name to get weather for"),
  units: z.enum(["celsius", "fahrenheit"]).optional().default("celsius"),
});

// Create the server
const server = new Server(
  {
    name: "weather-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_weather",
        description: "Get current weather for a city",
        inputSchema: {
          type: "object",
          properties: {
            city: {
              type: "string",
              description: "City name to get weather for",
            },
            units: {
              type: "string",
              enum: ["celsius", "fahrenheit"],
              default: "celsius",
            },
          },
          required: ["city"],
        },
      },
      {
        name: "get_forecast",
        description: "Get 5-day weather forecast for a city",
        inputSchema: {
          type: "object",
          properties: {
            city: {
              type: "string",
              description: "City name",
            },
            days: {
              type: "number",
              description: "Number of days (1-5)",
              default: 5,
            },
          },
          required: ["city"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "get_weather": {
      const { city, units } = WeatherInputSchema.parse(args);

      // In a real implementation, call a weather API here
      const weather = await fetchWeather(city, units);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(weather, null, 2),
          },
        ],
      };
    }

    case "get_forecast": {
      const { city, days } = args as { city: string; days?: number };

      const forecast = await fetchForecast(city, days ?? 5);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(forecast, null, 2),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Mock implementations (replace with real API calls)
async function fetchWeather(city: string, units: string) {
  return {
    city,
    temperature: units === "celsius" ? 22 : 72,
    units,
    condition: "Partly cloudy",
    humidity: 65,
    windSpeed: 12,
  };
}

async function fetchForecast(city: string, days: number) {
  return {
    city,
    days: Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      high: 25 + Math.random() * 5,
      low: 15 + Math.random() * 5,
      condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
    })),
  };
}

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP server running");
}

main().catch(console.error);
```

## Step 3: Build and Test

Build the server:

```bash
npx tsc
```

Test locally:

```bash
node dist/index.js
```

## Step 4: Register with Claude Code

Add to your Claude Code configuration (`~/.claude/settings.json`):

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/path/to/my-mcp-server/dist/index.js"]
    }
  }
}
```

## Step 5: Use in Sciorex

The tools automatically appear in Sciorex:

1. Create an agent with the weather tools enabled:

```yaml
name: Weather Assistant
description: Provides weather information
model: claude-sonnet-4-5-20250929

mcpServers:
  - weather

systemPrompt: |
  You help users with weather information.
  Use the get_weather and get_forecast tools to provide accurate data.
```

2. Chat with your agent:

```
What's the weather like in Tokyo?
```

## Real-World Examples

### Database Query Server

```typescript
// Tools: query_database, list_tables, describe_table
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "query_database") {
    const { sql } = request.params.arguments as { sql: string };

    // Validate SQL (prevent dangerous operations)
    if (sql.toLowerCase().includes("drop") ||
        sql.toLowerCase().includes("delete")) {
      throw new Error("Destructive queries not allowed");
    }

    const results = await db.query(sql);
    return { content: [{ type: "text", text: JSON.stringify(results) }] };
  }
});
```

### GitHub Integration

```typescript
// Tools: list_issues, create_issue, add_comment
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "list_issues") {
    const { repo, state } = request.params.arguments as {
      repo: string;
      state?: "open" | "closed";
    };

    const [owner, repoName] = repo.split("/");
    const { data } = await octokit.issues.listForRepo({
      owner,
      repo: repoName,
      state: state || "open",
    });

    return {
      content: [{
        type: "text",
        text: JSON.stringify(data.map(i => ({
          number: i.number,
          title: i.title,
          state: i.state,
        })))
      }]
    };
  }
});
```

### Slack Notifications

```typescript
// Tools: send_message, list_channels
import { WebClient } from "@slack/web-api";

const slack = new WebClient(process.env.SLACK_TOKEN);

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "send_message") {
    const { channel, text } = request.params.arguments as {
      channel: string;
      text: string;
    };

    await slack.chat.postMessage({ channel, text });

    return {
      content: [{ type: "text", text: "Message sent successfully" }]
    };
  }
});
```

## Best Practices

### Security

- **Validate all inputs** using Zod or similar
- **Limit permissions** - don't expose destructive operations
- **Use environment variables** for secrets
- **Log tool calls** for auditing

### Error Handling

```typescript
try {
  const result = await externalApi.call(params);
  return { content: [{ type: "text", text: JSON.stringify(result) }] };
} catch (error) {
  return {
    content: [{
      type: "text",
      text: `Error: ${error.message}`,
    }],
    isError: true,
  };
}
```

### Documentation

Always provide clear descriptions:

```typescript
{
  name: "create_task",
  description: "Creates a new task in the project management system. Returns the task ID.",
  inputSchema: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "Task title (max 100 chars)",
      },
      priority: {
        type: "string",
        enum: ["low", "medium", "high"],
        description: "Task priority level",
      },
    },
    required: ["title"],
  },
}
```

## Debugging

Enable debug logging:

```typescript
console.error("Received request:", JSON.stringify(request, null, 2));
```

Check Claude Code logs:

```bash
# View MCP server logs
claude mcp logs weather
```

## Tips

- **Start simple**: Begin with one tool, then expand
- **Test thoroughly**: Use unit tests for tool handlers
- **Handle timeouts**: External APIs may be slow
- **Version your API**: Use semantic versioning
- **Document usage**: Add examples to tool descriptions

## Related

- [MCP Servers Overview](/features/mcp)
- [Agent with Custom Tools](/cookbook/agent-custom-tools)
- [Anthropic MCP Documentation](https://modelcontextprotocol.io)
