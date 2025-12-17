# Models Reference

Sciorex supports multiple AI providers, giving you flexibility to choose the best model for your use case.

## Supported Providers

| Provider | Type | Best For |
|----------|------|----------|
| **Claude Code** | Cloud | Complex reasoning, coding, analysis |
| **Google Gemini** | Cloud | Fast responses, multimodal, large context |
| **OpenAI Codex** | Cloud | Code generation, general tasks |
| **LM Studio** | Local | Privacy, offline, experimentation |
| **Ollama** | Local | Privacy, custom models, self-hosted |

::: tip Setup Instructions
See **Settings → AI Providers** in the app for setup instructions for each provider.
:::

## Claude Models

Claude models excel at complex reasoning, coding tasks, and nuanced understanding.

| Model | ID | Capabilities | Context |
|-------|-----|--------------|---------|
| **Claude Opus 4.5** | `claude-opus-4-5-20251101` | Reasoning, Vision, Tools, PDF, Code | 200K |
| **Claude Sonnet 4.5** | `claude-sonnet-4-5-20250929` | Fast, Reasoning, Vision, Tools, PDF, Code | 200K |
| **Claude Haiku 4.5** | `claude-haiku-4-5-20251001` | Fast, Vision, Tools, Code | 200K |
| **Claude Opus 4.1** | `claude-opus-4-1-20250805` | Reasoning, Vision, Tools, PDF, Code | 200K |
| **Claude Opus 4** | `claude-opus-4-20250514` | Reasoning, Vision, Tools, PDF, Code | 200K |
| **Claude Sonnet 4** | `claude-sonnet-4-20250514` | Reasoning, Vision, Tools, PDF, Code | 200K |
| **Claude Haiku 3.5** | `claude-3-5-haiku-20241022` | Fast, Vision, Tools, Code | 200K |

::: tip Default Choice
**Claude Sonnet 4.5** is the recommended default for most coding tasks.
:::

## Gemini Models

Gemini models offer fast responses and excellent multimodal capabilities.

| Model | ID | Capabilities | Context |
|-------|-----|--------------|---------|
| **Gemini 2.5 Pro** | `gemini-2.5-pro` | Reasoning, Vision, Tools, PDF, Code | 1M |
| **Gemini 2.5 Flash** | `gemini-2.5-flash` | Fast, Vision, Tools, PDF, Code | 1M |
| **Gemini 2.5 Flash Lite** | `gemini-2.5-flash-lite` | Fast, Tools, Code | 128K |

::: tip Large Context
Gemini 2.5 Pro and Flash support up to **1M tokens** context window.
:::

## OpenAI Codex Models

OpenAI Codex models provide strong coding capabilities with large context windows.

### Codex Models

| Model | ID | Capabilities | Context |
|-------|-----|--------------|---------|
| **GPT-5.1 Codex Max** | `gpt-5.1-codex-max` | Reasoning, Tools, PDF, Code | 400K |
| **GPT-5.1 Codex** | `gpt-5.1-codex` | Reasoning, Tools, PDF, Code | 400K |
| **GPT-5.1 Codex Mini** | `gpt-5.1-codex-mini` | Fast, Tools, Code | 400K |
| **GPT-5 Codex** | `gpt-5-codex` | Reasoning, Tools, PDF, Code | 400K |
| **GPT-5 Codex Mini** | `gpt-5-codex-mini` | Fast, Tools, Code | 400K |

### GPT Models

| Model | ID | Capabilities | Context |
|-------|-----|--------------|---------|
| **GPT-5.2** | `gpt-5.2` | Reasoning, Vision, Tools, PDF, Code | 400K |
| **GPT-5.1** | `gpt-5.1` | Reasoning, Vision, Tools, PDF, Code | 400K |
| **GPT-5** | `gpt-5` | Reasoning, Vision, Tools, PDF, Code | 400K |

### GPT-OSS Models (Local)

These models run locally via Codex CLI with the `--oss` flag.

| Model | ID | Capabilities | Context |
|-------|-----|--------------|---------|
| **GPT-OSS 120B** | `openai/gpt-oss-120b` | Reasoning, Code, Tools | 128K |
| **GPT-OSS 20B** | `openai/gpt-oss-20b` | Fast, Code, Tools | 128K |

## Local Models (LM Studio & Ollama)

Run models locally for privacy, offline work, or cost savings. Models are fetched dynamically from your local server.

### LM Studio

Popular models for LM Studio:

| Model | Parameters | Best For | VRAM Required |
|-------|------------|----------|---------------|
| **Qwen 2.5 Coder** | 7B / 32B | Code generation | 8GB / 24GB |
| **DeepSeek Coder V2** | 16B | Advanced coding | 12GB |
| **CodeLlama** | 7B / 34B | Code completion | 8GB / 24GB |
| **Llama 3.2** | 3B / 11B | General tasks | 4GB / 12GB |

### Ollama

Popular models for Ollama:

| Model | Best For |
|-------|----------|
| **qwen2.5-coder** | Code generation |
| **deepseek-coder-v2** | Advanced coding |
| **codellama** | Code tasks |
| **llama3.2** | General tasks |
| **mistral** | Fast responses |

::: warning Hardware Requirements
- **7B models**: 8GB+ VRAM
- **13B models**: 16GB+ VRAM
- **34B+ models**: 24GB+ VRAM
:::

## Model Capabilities

| Capability | Description |
|------------|-------------|
| **Fast** | Optimized for speed |
| **Vision** | Can analyze images |
| **Reasoning** | Advanced reasoning capabilities |
| **Tools** | Can use tools and function calling |
| **PDF** | Can read and analyze PDFs |
| **Code** | Optimized for code generation |
| **Long Context** | Large context window |
| **Image Gen** | Can generate images |

## Provider Comparison

### By Use Case

| Use Case | Recommended Provider | Recommended Model |
|----------|---------------------|-------------------|
| Complex architecture | Claude | Opus 4.5 |
| General coding | Claude / Gemini | Sonnet 4.5 / Gemini 2.5 Flash |
| Quick tasks | Gemini / Codex | Gemini 2.5 Flash Lite / Codex Mini |
| Code review | Claude | Sonnet 4.5 |
| Privacy-sensitive | Local | LM Studio / Ollama |
| Offline work | Local | Any local model |
| Long context | Gemini / Codex | Gemini 2.5 Pro (1M) / GPT-5.1 (400K) |

### By Feature

| Feature | Claude | Gemini | Codex | Local |
|---------|--------|--------|-------|-------|
| Extended Thinking | ✅ | ✅ | ✅ | ❌ |
| Tool Use | ✅ | ✅ | ✅ | Varies |
| Vision/Images | ✅ | ✅ | ✅ | Varies |
| Max Context | 200K | 1M | 400K | Varies |
| Offline | ❌ | ❌ | ❌ | ✅ |

## Extended Thinking

| Level | Token Budget | Claude | Gemini | Codex |
|-------|-------------|--------|--------|-------|
| **Off** | 0 | ✅ | ✅ | ✅ |
| **Think** | 1,024 | ✅ | ✅ | ✅ |
| **Think Hard** | 10,000 | ✅ | ✅ | ✅ |
| **Think Harder** | 16,000 | ✅ | - | - |
| **Ultrathink** | 32,000 | ✅ | - | - |

## Configuring in Agents

```yaml
name: Code Reviewer
provider: claude-code
model: claude-sonnet-4-5-20250929
thinkingLevel: think
```

```yaml
name: Fast Analyzer
provider: google-gemini
model: gemini-2.5-flash
```

```yaml
name: Local Formatter
provider: ollama
model: qwen2.5-coder
```

## Pricing

### Claude

| Model | Input | Output |
|-------|-------|--------|
| Opus 4.5 | $15/1M | $75/1M |
| Sonnet 4.5 | $3/1M | $15/1M |
| Haiku 4.5 | $1/1M | $5/1M |
| Haiku 3.5 | $0.80/1M | $4/1M |

### Gemini

| Model | Input | Output |
|-------|-------|--------|
| Gemini 2.5 Pro | $1.25/1M | $5/1M |
| Gemini 2.5 Flash | $0.075/1M | $0.30/1M |
| Gemini 2.5 Flash Lite | $0.019/1M | $0.075/1M |

### Codex

| Model | Input | Output |
|-------|-------|--------|
| GPT-5.2 | $1.75/1M | $14/1M |
| GPT-5.1 Codex Max | $1.25/1M | $10/1M |
| GPT-5.1 Codex Mini | $0.25/1M | $2/1M |

## Best Practices

### For Agents

```yaml
# Complex analysis
name: Senior Reviewer
provider: claude-code
model: claude-opus-4-5-20251101
thinkingLevel: think-hard

# Fast local tasks
name: Code Formatter
provider: ollama
model: qwen2.5-coder

# Quick cloud analysis
name: Quick Analyzer
provider: google-gemini
model: gemini-2.5-flash
```

### For Flows

- Use **local models** or **Gemini Flash** for transformation nodes
- Use **Claude Sonnet** or **GPT-5.1** for decision nodes
- Use **Claude Opus** for critical analysis nodes

## Related

- [Agents Configuration](/features/agents)
- [Extended Thinking](/features/agents#extended-thinking)
- [Parallel Chats](/features/parallel-chats)
- [Settings](/guide/settings)
