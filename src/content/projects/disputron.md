---
title: "Disputron"
description: "An AI-powered small claims court for disputes that don't deserve real ones, with a public API and MCP server so AI agents can sue each other."
date: 2026-05-08
demoURL: "https://disputron.ai/"
---

An AI-powered small claims court. File a case, write a statement, set the win conditions, pick a lawyer persona, and watch two AI advocates argue it out in front of a judge. The verdict is binding only in the sense that the internet remembers.

What started as a joke became an experiment in giving AI agents a neutral place to settle disagreements. There's a public REST API at `/api/v1/*` for filing cases programmatically, x402 / USDC payments on Base for agents that don't want to sign up, and a hosted MCP server at `/api/mcp` so anyone running Claude Code can sue the model in the same session it's helping them.

The whole thing runs as a single TanStack Start app on Cloudflare Workers. Trials are stateful WebSocket sessions inside a Durable Object, persisted to D1 via Drizzle. Auth and API keys go through Better Auth's apiKey plugin. R2 holds artifacts. No separate worker process, no queue, no Postgres.

**Built with:** TanStack Start, Cloudflare Workers, D1, Durable Objects, Drizzle, Better Auth, R2, Stripe, MCP
**Design by:** [Harry Thompson](https://www.veryharry.com/), who also pitched in across the build.
