# Documentation Generator

Generate comprehensive documentation from your code using AI agents.

**Difficulty**: Beginner
**Time**: 10 minutes

## What You'll Build

An agent that:
- Reads your source code
- Generates API documentation
- Creates usage examples
- Outputs in markdown format

![Docs Generator Agent](/images/cookbook/docs-generator.svg)
*TBD: Replace with screenshot of docs generator in action*

## Prerequisites

- Sciorex installed
- A codebase with functions/classes to document

## Step 1: Create the Agent

```yaml
name: Documentation Generator
description: Generates documentation from source code

systemPrompt: |
  You are a technical documentation writer. Given source code:

  1. Analyze the code structure:
     - Functions/methods and their parameters
     - Classes and their properties
     - Exported interfaces/types
     - Dependencies and imports

  2. Generate documentation including:
     - Brief description of purpose
     - Parameter descriptions with types
     - Return value description
     - Usage examples
     - Any important notes or caveats

  3. Format as clean markdown with:
     - Clear headings
     - Code blocks for examples
     - Tables for parameters when appropriate
     - Links between related items

  Write documentation that is:
  - Accurate to the code
  - Easy to understand
  - Practical with real examples
  - Consistent in style

model: claude-sonnet-4-5-20250929
thinkingLevel: think

allowedTools:
  - Read
  - Glob
  - Grep
```

## Step 2: Use the Agent

### Document a Single File

1. Go to **Chat**
2. Select your **Documentation Generator** agent
3. Ask it to document a file:

```
Generate documentation for src/utils/validation.ts
```

### Document a Directory

```
Generate API documentation for all files in src/api/
```

### Generate a README

```
Create a README.md for this project based on the code structure
```

## Example Output

Given this TypeScript file:

```typescript
// src/utils/format.ts
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(
  date: Date | string,
  format: 'short' | 'long' = 'short'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format === 'long'
    ? d.toLocaleDateString('en-US', { dateStyle: 'full' })
    : d.toLocaleDateString();
}
```

The agent generates:

```markdown
# Format Utilities

Utility functions for formatting currencies and dates.

## Functions

### formatCurrency

Formats a number as a currency string.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `amount` | `number` | - | The numeric amount to format |
| `currency` | `string` | `'USD'` | ISO 4217 currency code |
| `locale` | `string` | `'en-US'` | BCP 47 locale string |

**Returns:** `string` - Formatted currency string

**Example:**

\`\`\`typescript
formatCurrency(1234.56)
// => "$1,234.56"

formatCurrency(1234.56, 'EUR', 'de-DE')
// => "1.234,56 €"
\`\`\`

### formatDate

Formats a date as a localized string.

**Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `date` | `Date \| string` | - | Date to format |
| `format` | `'short' \| 'long'` | `'short'` | Output format |

**Returns:** `string` - Formatted date string

**Example:**

\`\`\`typescript
formatDate(new Date('2024-01-15'))
// => "1/15/2024"

formatDate('2024-01-15', 'long')
// => "Monday, January 15, 2024"
\`\`\`
```

## Advanced: Batch Documentation

Create a flow to document an entire codebase:

```
┌──────────┐    ┌───────────┐    ┌──────────┐    ┌──────────┐
│  Glob    │───▶│  For Each │───▶│  Doc Gen │───▶│  Write   │
│  *.ts    │    │   File    │    │   Agent  │    │  Output  │
└──────────┘    └───────────┘    └──────────┘    └──────────┘
```

## Specialized Variants

### API Endpoint Documenter

```yaml
name: API Documenter
systemPrompt: |
  Generate OpenAPI/Swagger-style documentation for REST endpoints.
  Include:
  - HTTP method and path
  - Request parameters and body schema
  - Response schemas for all status codes
  - Authentication requirements
  - Rate limiting info if applicable
```

### Component Documenter (React/Vue)

```yaml
name: Component Documenter
systemPrompt: |
  Generate documentation for UI components including:
  - Props table with types and defaults
  - Events/callbacks
  - Slots (Vue) or children patterns (React)
  - Usage examples with common patterns
  - Accessibility considerations
```

### Database Schema Documenter

```yaml
name: Schema Documenter
systemPrompt: |
  Generate documentation for database schemas:
  - Table descriptions
  - Column types and constraints
  - Relationships and foreign keys
  - Indexes
  - Migration history if available
```

## Tips

- **Be specific**: Ask for documentation of specific files or directories
- **Provide context**: Mention the framework or language conventions you follow
- **Iterate**: Review generated docs and ask for refinements
- **Update regularly**: Re-run documentation when code changes significantly

## Related

- [Creating Your First Agent](/cookbook/first-agent)
- [Code Review Agent](/cookbook/code-review-agent)
- [Agents Reference](/features/agents)
