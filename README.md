# Delectable

AI-assisted recipe discovery app: React (Vite + TypeScript) frontend and a small Node API that proxies **Spoonacular** and optional **Google Gemini** calls so secrets stay off the client.

## Prerequisites

- Node.js 20+ (CI uses 22)
- [Spoonacular](https://spoonacular.com/food-api) API key
- Optional: [Google AI Studio](https://aistudio.google.com/apikey) **Gemini** API key for recipe copilot and natural-language search

## Quick start

1. Set **`SPOONACULAR_API_KEY`** in either the **repo root** `.env` or `apps/api/.env` (see [`.env.example`](./.env.example)). The API loads both; `apps/api/.env` wins if a variable is set in both. A root **`REACT_APP_API_KEY`** from the old CRA setup is still accepted as the Spoonacular key. Add **`GEMINI_API_KEY`** if you want AI features (optional **`GEMINI_MODEL`**, default `gemini-1.5-flash`). If Gemini returns **fetch failed**, check VPN/firewall/proxy, set **`HTTPS_PROXY`** if required, or try **`GEMINI_MODEL=gemini-2.0-flash`**.

2. Install and run API + web together:

```bash
npm install
npm run dev
```

- Web: [http://localhost:5173](http://localhost:5173) (Vite proxies `/api` to the API in dev)
- API: [http://localhost:8787](http://localhost:8787)

3. Production-style web pointing at a remote API:

```bash
# apps/web/.env.production
VITE_API_BASE_URL=https://your-api-host.example.com
```

```bash
npm run build -w @delectable/web
```

Serve `apps/web/dist` from any static host; ensure `ALLOWED_ORIGINS` on the API includes that host.

## Workspace scripts

| Script        | Description                                      |
| ------------- | ------------------------------------------------ |
| `npm run dev` | API + Vite dev servers (concurrently)            |
| `npm run build` | Build API (`dist/`) then web (`dist/`)         |
| `npm run test` | Vitest (web)                                    |
| `npm run lint` | ESLint (web + api)                              |
| `npm run typecheck` | TypeScript `--noEmit` (both packages)      |

## Architecture

- [`apps/web`](./apps/web): feature-based UI, TanStack Query, Zod-validated API responses, DOMPurify for recipe HTML, lazy-loaded routes.
- [`apps/api`](./apps/api): Hono server — `/api/recipes/*`, `/api/ai/recipe-assist`, `/api/ai/search-parse` (Gemini), CORS, simple rate limits on AI routes.

Legacy Create React App sources under the repo root have been superseded by `apps/web`; use the workspace commands above.

### Spoonacular or Gemini “network / DNS / fetch failed”

Node does **not** use the Windows **system proxy** for outbound `fetch` by default. If the browser works but the API cannot reach `api.spoonacular.com` or Google, set **`HTTPS_PROXY`** (and **`NO_PROXY=localhost,127.0.0.1`**) in `apps/api/.env` or the repo root `.env`, then restart `npm run dev`. The API also retries transient DNS errors a few times.

## License

Private / portfolio use — adjust as needed.
