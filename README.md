<p align="center">
  <img src="public/logo.png" alt="Sciorex Logo" width="120" />
</p>

<h1 align="center">Sciorex Documentation</h1>

<p align="center">
  Official documentation for <a href="https://sciorex.com">Sciorex</a> — The King of Knowledge
</p>

<p align="center">
  <a href="https://docs.sciorex.com">View Documentation</a> •
  <a href="https://github.com/sciorex/sciorex">Main Repository</a> •
  <a href="https://sciorex.com/#download">Download App</a>
</p>

---

## About

This repository contains the source for the Sciorex documentation website, built with [VitePress](https://vitepress.dev/).

**Live site**: [docs.sciorex.com](https://docs.sciorex.com)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Structure

```
docs/
├── .vitepress/
│   └── config.ts          # VitePress configuration
├── guide/
│   ├── getting-started.md
│   ├── installation.md
│   ├── quick-start.md
│   └── concepts/
├── features/
│   ├── agents.md
│   ├── chat.md
│   ├── ticketing.md
│   ├── mcp.md
│   └── flows/
├── architecture/
│   └── ai-backend.md
├── public/
│   ├── logo.png
│   └── favicon.ico
└── index.md               # Home page
```

## Contributing

By submitting a contribution, you agree to the [Contributor License Agreement](https://github.com/sciorex/sciorex/blob/main/CLA.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b docs/my-update`)
3. Commit your changes (`git commit -m 'docs: update installation guide'`)
4. Push to the branch (`git push origin docs/my-update`)
5. Open a Pull Request

## Links

- **Website**: [sciorex.com](https://sciorex.com)
- **Documentation**: [docs.sciorex.com](https://docs.sciorex.com)
- **Main Repo**: [github.com/sciorex/sciorex](https://github.com/sciorex/sciorex)
- **Twitter**: [@sciorex](https://x.com/sciorex)
- **Discord**: [discord.gg/sciorex](https://discord.gg/sciorex)

## License

Documentation content is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
