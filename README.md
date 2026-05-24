<div align="center">

# 🍽️ Delectable

### *Discover, explore, and cook with the help of AI*

**Delectable** is a full-stack AI-powered recipe discovery platform. Search millions of recipes with plain English, get real-time cooking guidance from an embedded AI copilot, and explore a curated global catalog — all in a fast, responsive, beautifully themed interface.

<br />

[![CI](https://github.com/Engraya/Delectable/actions/workflows/ci.yml/badge.svg)](https://github.com/Engraya/Delectable/actions/workflows/ci.yml)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)
![Hono](https://img.shields.io/badge/Hono-4.6-E36002?logo=hono&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-AI-4285F4?logo=google&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/license-Private%20%2F%20Portfolio-lightgrey)

<br />

[Live Demo](#deployment) · [Features](#features) · [Quick Start](#getting-started) · [API Docs](#api-documentation) · [AI Features](#ai-capabilities)

</div>

---

## Overview

Delectable solves a real everyday problem: people know what they *feel like eating* but struggle to translate that into a concrete recipe. Traditional search requires exact keywords — ingredient names, dish titles, cuisine types — and returns overwhelming, unfiltered results.

Delectable replaces that friction with two AI-native experiences:

- **Smart Search** — type anything in plain English ("something spicy and vegetarian under 30 minutes") and Gemini parses your intent into precise Spoonacular API filters automatically.
- **Recipe Copilot** — once you open a recipe, an AI assistant with full recipe context is ready to answer cooking questions: substitutions, scaling, technique explanations, dietary adaptations, and more.

The backend is a lightweight Hono API server that keeps all secrets server-side, applies sensible rate limits, and gracefully handles third-party network failures — including corporate proxy environments.

---

## Features

### 🔍 Recipe Discovery
- **Trending Recipes** — a curated grid of popular recipes refreshed on every visit
- **Cuisine Explorer** — browse recipes by cuisine type (Italian, Asian, Mexican, Mediterranean, and more) via an interactive chip selector
- **Vegetarian Catalog** — dedicated view for plant-based meals, zero configuration required
- **Standard Search** — keyword-based recipe search with instant results
- **Complex Filters** — combine cuisine, diet, intolerances, and maximum cook time for refined results

### 🤖 AI Capabilities
- **Natural Language Smart Search** — Gemini extracts structured filter parameters from free-text queries, no keywords required
- **Recipe Copilot** — context-aware conversational assistant embedded on every recipe page; understands the full recipe before you ask your first question
- **Structured Output** — search parsing uses Gemini's JSON mode for reliable, schema-validated output
- **Graceful Degradation** — all AI features fail silently and clearly if `GEMINI_API_KEY` is not configured; the rest of the app remains fully functional

### ⚡ Performance
- **Code-Split Routes** — every page is lazy-loaded; only the current route's JavaScript is sent to the browser
- **TanStack Query Caching** — recipe responses are cached client-side (trending data held for 10 minutes)
- **Skeleton Loading States** — content placeholders during every fetch; no layout shift
- **Retry Logic (API)** — the backend retries transient DNS and timeout failures (up to 3 attempts) before returning an error

### 🎨 User Experience
- **Dark Mode** — full theme switching with CSS variable tokens, persisted to `localStorage`, respects system preference on first load
- **Responsive Design** — mobile-first layout; navigation collapses to a slide-in drawer on small screens
- **Export Tools** — download recipe as a PDF or save the hero image directly from the recipe page
- **Sanitized HTML** — all recipe summaries and instructions from Spoonacular are passed through DOMPurify before render

### 🔒 Security & Reliability
- **Secrets Stay Server-Side** — Spoonacular and Gemini API keys are never exposed to the browser
- **Zod Validation** — every API boundary (request bodies, external API responses) is validated with Zod schemas
- **CORS Allowlist** — the API only accepts requests from explicitly configured origins
- **IP-Based Rate Limiting** — in-memory sliding-window rate limiter on AI endpoints (30 req/min for copilot, 20 req/min for search parsing)
- **Corporate Proxy Support** — configurable `HTTPS_PROXY` for environments where outbound fetch is blocked

### 🧑‍💻 Developer Experience
- **Monorepo** — `apps/api` and `apps/web` managed as npm workspaces with a single `npm install` and `npm run dev`
- **End-to-End TypeScript** — strict TypeScript across both packages; shared type inference from Zod schemas
- **GitHub Actions CI** — lint → typecheck → test → build on every push and pull request
- **Vitest + React Testing Library** — component-level tests co-located with source files

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18.3 + Vite 6 |
| **Language** | TypeScript 5.6 (strict, both packages) |
| **Routing** | React Router v6 (lazy-loaded routes) |
| **Data Fetching / Cache** | TanStack Query v5 |
| **Styling** | Tailwind CSS 3.4 + CSS custom properties theme |
| **Typography** | DM Sans · Fraunces · JetBrains Mono |
| **Backend Framework** | Hono 4.6 |
| **Runtime** | Node.js 22 |
| **AI Provider** | Google Generative AI (Gemini) |
| **Recipe Data** | Spoonacular Food API |
| **Schema Validation** | Zod |
| **HTTP Client (API)** | Undici (proxy-aware) |
| **HTML Sanitization** | DOMPurify |
| **PDF Export** | jsPDF |
| **Icons** | React Icons (HeroIcons v2) |
| **Testing** | Vitest + React Testing Library |
| **Linting** | ESLint 9 (flat config) |
| **CI/CD** | GitHub Actions |

---

## Architecture

Delectable is a **monorepo** with two independent packages — a frontend SPA and a backend API server — sharing a single `npm install` and development command.

```
Delectable/
├── apps/
│   ├── api/                        # Hono API server
│   │   └── src/
│   │       ├── index.ts            # Server entrypoint, all routes
│   │       ├── env.ts              # Zod-validated environment config
│   │       ├── schemas.ts          # Zod schemas for Spoonacular responses
│   │       ├── spoonacular.ts      # API client with retry logic
│   │       ├── gemini.ts           # Gemini wrapper (structured output + error handling)
│   │       ├── rateLimit.ts        # Sliding-window in-memory rate limiter
│   │       └── bootstrapEnv.ts     # .env loader (root + apps/api)
│   │
│   └── web/                        # React + Vite frontend
│       └── src/
│           ├── app/                # App shell (router, providers, error boundary)
│           ├── features/           # Feature-based modules
│           │   ├── landing/        # Hero, AI feature showcase, how-it-works
│           │   ├── recipes/        # Trending, details, card, vegetarian, export
│           │   ├── cuisines/       # Cuisine browser + recipe list
│           │   ├── search/         # Search UI + natural-language AI search
│           │   └── ai/             # Recipe Copilot chat component
│           ├── shared/
│           │   ├── api/            # Typed API call functions + Zod schemas
│           │   ├── ui/             # Reusable design-system components
│           │   ├── layout/         # Page container
│           │   └── lib/            # fetchJson, sanitize, cn, brand constants
│           └── layouts/            # NavBar, Footer, DarkModeToggle
│
├── .env.example                    # Environment variable reference
├── .github/workflows/ci.yml        # GitHub Actions CI pipeline
├── package.json                    # Monorepo root (npm workspaces)
└── CLAUDE.md                       # AI-assisted development guide
```

### Data Flow

```
Browser → Vite (dev proxy) → Hono API
                                 ├── /api/recipes/* → Spoonacular API
                                 └── /api/ai/*      → Google Gemini API
```

In production, the web app is deployed as a static bundle and the API runs as a Node.js process. The `VITE_API_BASE_URL` variable points the frontend at the remote API host.

---

## Getting Started

### Prerequisites

- **Node.js 20+** (CI runs on 22)
- A free **[Spoonacular](https://spoonacular.com/food-api)** API key
- Optional: a **[Google AI Studio](https://aistudio.google.com/apikey)** Gemini API key for AI features

### 1 — Clone the repository

```bash
git clone https://github.com/Engraya/Delectable.git
cd Delectable
```

### 2 — Install dependencies

```bash
npm install
```

This installs dependencies for the monorepo root, `apps/api`, and `apps/web` in one step.

### 3 — Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your keys (see [Environment Variables](#environment-variables) below). At minimum, set `SPOONACULAR_API_KEY`.

### 4 — Start the development servers

```bash
npm run dev
```

This starts both servers concurrently:

| Service | URL |
|---|---|
| Web (Vite) | http://localhost:5173 |
| API (Hono) | http://localhost:8787 |

The Vite dev server automatically proxies all `/api/*` requests to the Hono server — no CORS configuration needed during development.

### 5 — Production build

```bash
npm run build
```

- API compiled to `apps/api/dist/index.js`
- Web compiled to `apps/web/dist/` (static files ready to serve)

```bash
# Start the API in production
node apps/api/dist/index.js
```

Serve `apps/web/dist/` from any static host (Vercel, Netlify, S3, nginx). Set `VITE_API_BASE_URL` to the public API URL before building.

---

## Environment Variables

All variables are loaded from the **repo root `.env`** or **`apps/api/.env`** (the `apps/api/.env` file takes precedence if a variable appears in both). The web app only reads variables prefixed with `VITE_`.

```bash
# ─────────────────────────────────────────────
# REQUIRED
# ─────────────────────────────────────────────

# Your Spoonacular API key — get one free at https://spoonacular.com/food-api
SPOONACULAR_API_KEY=

# ─────────────────────────────────────────────
# AI FEATURES (optional — app works without these)
# ─────────────────────────────────────────────

# Google Gemini API key — get one at https://aistudio.google.com/apikey
# Enables: Recipe Copilot + Natural Language Smart Search
GEMINI_API_KEY=

# Override the Gemini model ID (default: gemini-3-flash-preview)
# If you see a 404 on generateContent, pick an active model ID from AI Studio
# GEMINI_MODEL=gemini-3-flash-preview

# ─────────────────────────────────────────────
# SERVER
# ─────────────────────────────────────────────

# Port the Hono API server listens on (default: 8787)
PORT=8787

# Comma-separated list of browser origins allowed to call the API (CORS)
# In production, set this to your deployed frontend URL
ALLOWED_ORIGINS=http://localhost:5173

# ─────────────────────────────────────────────
# CORPORATE PROXY (optional)
# ─────────────────────────────────────────────

# If Spoonacular or Gemini fail with "fetch failed" / DNS errors on a corporate
# network, Node.js does not use the system proxy automatically. Configure it here.
# HTTPS_PROXY=http://user:pass@proxy.company.com:8080
# NO_PROXY=localhost,127.0.0.1

# ─────────────────────────────────────────────
# WEB (apps/web) — optional
# ─────────────────────────────────────────────

# Leave empty in development (Vite proxies /api to localhost:8787 automatically)
# In production, set this to the public URL of your deployed API server
# VITE_API_BASE_URL=https://your-api-host.example.com
```

---

## API Documentation

The Hono API server exposes recipe and AI endpoints under `/api`. All endpoints return JSON. AI endpoints require `GEMINI_API_KEY` to be configured.

### Recipe Endpoints

#### `GET /api/recipes/trending`

Returns a set of random/trending recipes.

| Query Param | Type | Default | Description |
|---|---|---|---|
| `number` | number | `50` | Number of recipes to return |

```json
// Response
{
  "recipes": [
    { "id": 716429, "title": "Pasta with Garlic...", "image": "https://..." }
  ]
}
```

---

#### `GET /api/recipes/vegetarian`

Returns recipes filtered to vegetarian only.

| Query Param | Type | Default | Description |
|---|---|---|---|
| `number` | number | `50` | Number of recipes to return |

---

#### `GET /api/recipes/search`

Simple keyword recipe search.

| Query Param | Type | Required | Description |
|---|---|---|---|
| `q` | string | ✅ | Search query |
| `number` | number | | Max results (default: `16`) |

---

#### `GET /api/recipes/complex`

Advanced search with multiple filters.

| Query Param | Type | Description |
|---|---|---|
| `query` | string | Keyword or ingredient |
| `cuisine` | string | e.g. `italian`, `mexican` |
| `diet` | string | e.g. `vegetarian`, `vegan`, `gluten-free` |
| `intolerances` | string | e.g. `gluten`, `dairy`, `peanut` |
| `maxReadyTime` | number | Max cook time in minutes |
| `number` | number | Max results |

---

#### `GET /api/recipes/by-cuisine`

Returns recipes for a specific cuisine.

| Query Param | Type | Required | Description |
|---|---|---|---|
| `cuisine` | string | ✅ | Cuisine type (e.g. `italian`) |
| `number` | number | | Results per page (default: `20`) |

---

#### `GET /api/recipes/:id`

Returns full recipe details including ingredients, instructions, health scores, and dietary flags.

```json
// Response (abbreviated)
{
  "id": 716429,
  "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
  "image": "https://...",
  "readyInMinutes": 45,
  "healthScore": 19,
  "vegetarian": false,
  "vegan": false,
  "glutenFree": false,
  "summary": "<p>Pasta with Garlic...</p>",
  "instructions": "<ol><li>...</li></ol>",
  "extendedIngredients": [
    { "id": 1001, "name": "butter", "amount": 2, "unit": "tablespoons" }
  ]
}
```

---

#### `GET /health`

Health check endpoint.

```json
{ "status": "ok" }
```

---

### AI Endpoints

> **Note:** Both AI endpoints require `GEMINI_API_KEY`. Requests without a configured key return `503 Service Unavailable`.

#### `POST /api/ai/recipe-assist`

Context-aware cooking assistant. Accepts the current recipe and the full conversation history, responds with a cooking tip or answer.

Rate limit: **30 requests / minute** per IP.

**Request Body**

```json
{
  "recipe": {
    "id": 716429,
    "title": "Pasta with Garlic...",
    "summary": "...",
    "instructions": "...",
    "extendedIngredients": [...]
  },
  "messages": [
    { "role": "user", "content": "Can I substitute the butter with olive oil?" }
  ]
}
```

**Response**

```json
{
  "reply": "Yes — olive oil is a great substitute for butter here. Use the same quantity (2 tablespoons). The dish will have a slightly lighter texture and a more pronounced olive flavor, which pairs well with the garlic."
}
```

---

#### `POST /api/ai/search-parse`

Parses a natural-language query into structured Spoonacular filter parameters.

Rate limit: **20 requests / minute** per IP.

**Request Body**

```json
{
  "query": "something spicy and vegetarian under 30 minutes"
}
```

**Response**

```json
{
  "query": "spicy",
  "diet": "vegetarian",
  "maxReadyTime": 30,
  "cuisine": null,
  "intolerances": null
}
```

The response is passed directly to `GET /api/recipes/complex` to fetch matching recipes.

---

## AI Capabilities

Delectable integrates **Google Gemini** for two distinct AI workflows, each designed around a specific user problem.

### Smart Search

When a user types a free-text query into the Smart Search input (e.g. *"low-carb chicken dinner ready in 20 minutes"*), the query is sent to `POST /api/ai/search-parse`. Gemini is configured with a **JSON response schema** matching Spoonacular's complex search parameters — this means the model returns machine-readable, schema-validated output rather than prose.

The extracted parameters are then used directly to call the Spoonacular complex search endpoint, giving the user the most accurate results for their intent without requiring them to know filter terminology.

**Gemini configuration for search parsing:**
- Temperature: default (balanced)
- Response mode: structured JSON (`responseMimeType: "application/json"`)
- Output schema: `{ query, diet, cuisine, intolerances, maxReadyTime }`
- Fallback: if Gemini returns malformed JSON, the server attempts balanced-bracket extraction before failing

### Recipe Copilot

Every recipe detail page includes an embedded chat interface powered by `POST /api/ai/recipe-assist`. The full recipe object (title, summary, instructions, and ingredient list) is injected into the system prompt, giving Gemini complete context before the user types anything.

This means the copilot can answer questions that require recipe-specific knowledge — *"how do I know when the onions are ready?"*, *"what can I use instead of ricotta?"*, *"how do I scale this to 6 servings?"* — without the user having to paste in any context.

**Gemini configuration for copilot:**
- Temperature: `0.4` (consistent, factual cooking guidance)
- Response mode: plain text
- System prompt: recipe context + "you are a cooking assistant" framing
- Disclaimer: the UI surfaces a note that this is cooking help, not dietary/medical advice

---

## Performance Optimizations

| Optimization | Implementation |
|---|---|
| **Route-level code splitting** | All pages wrapped in `React.lazy()` + `Suspense` |
| **Query caching** | TanStack Query with per-endpoint stale times |
| **Skeleton loading** | `RecipeGridSkeleton`, `Skeleton` component on all async views |
| **Backend retry logic** | Spoonacular client retries DNS/timeout errors up to 3× |
| **In-memory rate limiting** | Sliding window prevents AI endpoint abuse |
| **DOMPurify sanitization** | Strips unsafe HTML from external recipe content |
| **Responsive images** | Native `loading="lazy"` on all recipe images |
| **Proxy-aware HTTP** | Undici supports `HTTPS_PROXY` for corporate environments |

---

## Deployment

### Frontend — Static Hosting

The web app builds to a static bundle and can be deployed to any static host.

**Vercel (recommended)**

```bash
# Set VITE_API_BASE_URL to your API domain in Vercel project settings
npm run build -w @delectable/web
# Deploy apps/web/dist/
```

**Other static hosts (Netlify, S3, GitHub Pages)**

```bash
VITE_API_BASE_URL=https://your-api.example.com npm run build -w @delectable/web
```

Ensure your host is configured to serve `index.html` for all non-asset routes (client-side routing).

---

### Backend — Node.js Server

```bash
npm run build -w @delectable/api
node apps/api/dist/index.js
```

**Environment checklist for production:**

```bash
SPOONACULAR_API_KEY=your_key
GEMINI_API_KEY=your_key          # optional
PORT=8787
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

**Platforms:** Railway, Render, Fly.io, any VPS, or a containerized environment.

---

### CI/CD — GitHub Actions

The included pipeline runs automatically on every push and pull request to `main` / `master`:

```
Install → Lint → Typecheck → Test → Build (API + Web)
```

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml) for the full configuration.

---

## Development Scripts

Run all scripts from the **monorepo root** unless noted.

| Script | Description |
|---|---|
| `npm run dev` | Start API (port 8787) + Vite (port 5173) concurrently |
| `npm run build` | Build both `apps/api` and `apps/web` |
| `npm run test` | Run Vitest tests (web package) |
| `npm run lint` | ESLint across both packages |
| `npm run typecheck` | TypeScript `--noEmit` check across both packages |

---

## Screenshots

> *Screenshots can be added here once the app is deployed. Replace the placeholders below.*

| View | Preview |
|---|---|
| **Landing Page** | ![Landing Page](./docs/screenshots/landing.png) |
| **Trending Recipes** | ![Trending](./docs/screenshots/trending.png) |
| **Recipe Details + Copilot** | ![Recipe Details](./docs/screenshots/recipe-details.png) |
| **Smart Search** | ![Smart Search](./docs/screenshots/smart-search.png) |
| **Cuisine Explorer** | ![Cuisines](./docs/screenshots/cuisines.png) |
| **Dark Mode** | ![Dark Mode](./docs/screenshots/dark-mode.png) |
| **Mobile View** | ![Mobile](./docs/screenshots/mobile.png) |

---

## Developer Notes

### Architecture Decisions

- **Hono over Express** — Hono has a smaller footprint, first-class TypeScript types, and a familiar middleware API. Its performance characteristics are better suited for an API proxy that does minimal computation.

- **Feature-based folder structure** — `apps/web/src/features/` groups components, data-fetching, and types by product feature rather than by technical role. This makes it easier to locate all code related to a given capability and delete features cleanly.

- **Zod at every boundary** — all external API responses (Spoonacular, Gemini) and all incoming request bodies are validated with Zod schemas. This catches upstream API changes at runtime and provides fully inferred TypeScript types without duplication.

- **TanStack Query over raw `useEffect`** — data fetching, caching, loading states, error states, and background refetching are handled declaratively. Components stay focused on rendering.

- **No user authentication** — the app is a discovery tool, not a user data platform. Rate limiting is applied per IP on AI endpoints. This keeps complexity low and deployment simple.

- **CSS variable theme system** — rather than using Tailwind's built-in dark mode utilities throughout, the theme is defined as CSS custom properties in `index.css`. This makes the design system easier to modify in one place and keeps component markup clean.

### Conventions

- Components named in PascalCase, co-located with their tests (`ComponentName.test.tsx`)
- API query functions live in `shared/api/` and return Zod-validated typed data
- Shared UI components accept standard HTML props via `React.HTMLAttributes` spread
- The `cn()` utility (classnames merge) is used everywhere for conditional classes

---

## Future Improvements

Based on the current architecture, these would be natural next steps:

- **User accounts** — save favourite recipes, persist search history, sync preferences across devices
- **Meal planning** — weekly meal planner with automatic shopping list generation
- **Ingredient-based search** — "what can I make with chicken, garlic, and lemon?"
- **Gemini streaming** — stream the copilot response token-by-token instead of waiting for the full reply
- **Persistent chat** — save copilot conversation history per recipe to `localStorage`
- **PWA support** — offline access to previously viewed recipes
- **Nutrition dashboard** — aggregate nutritional data across a planned meal
- **Vector search / RAG** — embed a curated recipe corpus for copilot answers grounded in high-quality content
- **Redis rate limiting** — replace in-memory rate limits with Redis for multi-instance deployments

---

## Contributing

Contributions are welcome. To get started:

1. **Fork** the repository and create a feature branch from `master`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Install** dependencies
   ```bash
   npm install
   ```

3. **Make your changes.** Follow the existing patterns:
   - TypeScript strict mode — no `any`
   - Zod schemas for all new API boundaries
   - Co-locate tests with components

4. **Run the full check suite** before committing
   ```bash
   npm run lint && npm run typecheck && npm run test && npm run build
   ```

5. **Open a pull request** with a clear description of the change and why it's needed.

For significant changes, please open an issue first to discuss the approach.

---

## License

Private / portfolio use. All rights reserved.

---

<div align="center">

Built with React, Hono, Tailwind CSS, and Google Gemini.

</div>
