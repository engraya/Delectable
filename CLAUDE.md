# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Delectable** is an AI-assisted recipe discovery application built as a monorepo with two main workspaces:

- **`apps/web`**: React 18 + Vite + TypeScript frontend (port 5173)
- **`apps/api`**: Hono Node.js backend (port 8787)

The app integrates with **Spoonacular API** for recipe data and optionally with **Google Gemini** for AI-powered features (recipe copilot and natural-language search parsing).

## Tech Stack

### Frontend (`apps/web`)
- **Framework**: React 18.3.1 with Vite 5.4
- **Routing**: React Router v6
- **Data Fetching**: TanStack Query v5
- **Styling**: Tailwind CSS 3.4 with custom theme tokens (dark mode support via `class` strategy)
- **Validation**: Zod
- **Icons**: React Icons (HeroIcons v2)
- **HTML Sanitization**: DOMPurify
- **PDF Export**: jsPDF
- **SVG Support**: vite-plugin-svgr
- **Testing**: Vitest + Testing Library

### Backend (`apps/api`)
- **Runtime**: Node.js ES modules
- **Framework**: Hono 4.6 (lightweight web framework)
- **HTTP Server**: @hono/node-server
- **Validation**: Zod
- **AI Integration**: @google/generative-ai (Gemini API)
- **Environment**: dotenv-based config
- **HTTP Client**: Undici (built-in to Node.js)

### Development & Build Tools
- **Package Manager**: npm workspaces
- **TypeScript**: 5.6 (strict mode)
- **Linting**: ESLint 9 (shared config)
- **Dev Server**: tsx watch (API), Vite (web)
- **CI/CD**: GitHub Actions (Node.js 22)

## Directory Structure

```
Delectable/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── index.ts              # Hono app + route definitions
│   │   │   ├── env.ts                # Environment loading & validation
│   │   │   ├── schemas.ts            # Zod schemas for all API responses
│   │   │   ├── spoonacular.ts        # Spoonacular API client + HTML stripping
│   │   │   ├── gemini.ts             # Google Generative AI client
│   │   │   └── rateLimit.ts          # Simple in-memory rate limiter
│   │   └── [config files]            # tsconfig.json, eslint.config.js
│   └── web/
│       ├── src/
│       │   ├── app/
│       │   │   ├── main.tsx           # React entry point
│       │   │   ├── App.tsx            # Route definitions & layout wrapper
│       │   │   ├── providers.tsx      # Context providers (TanStack Query)
│       │   │   ├── ErrorBoundary.tsx  # Error handling wrapper
│       │   │   └── HashScroll.tsx     # Hash-based scroll behavior
│       │   ├── features/              # Feature-based code organization
│       │   │   ├── landing/           # Home page + content
│       │   │   ├── recipes/           # Recipe listing, details, PDF export
│       │   │   ├── cuisines/          # Cuisine browsing pages
│       │   │   ├── search/            # Search UI + natural language parsing
│       │   │   └── ai/                # Recipe copilot chat UI
│       │   ├── shared/
│       │   │   ├── api/               # API client functions & response schemas
│       │   │   ├── ui/                # Reusable button, card, spinner components
│       │   │   ├── layout/            # NavBar, Footer, PagesContainer
│       │   │   └── lib/               # Utilities (http, sanitize, cn, brand)
│       │   ├── layouts/               # Dark mode toggle provider
│       │   ├── index.css              # Global styles + Tailwind directives
│       │   └── vite-env.d.ts          # Vite type definitions
│       └── [config files]             # vite.config.ts, tailwind.config.js, etc.
└── [root config files]                # package.json, .env.example, CI workflows
```

## Key Commands

### Root Level (Monorepo)
```bash
npm install                  # Install all dependencies
npm run dev                  # Run API + web concurrently (Ctrl+C to stop both)
npm run build                # Build both API (dist/) and web (dist/)
npm run test                 # Run web tests (Vitest)
npm run lint                 # Lint both API and web
npm run typecheck            # TypeScript check (both packages, no emit)
```

### Individual Workspace
```bash
npm run dev -w @delectable/web          # Vite dev server only (port 5173)
npm run dev -w @delectable/api          # Hono server only (port 8787)
npm run build -w @delectable/web        # Build web (dist/)
npm run build -w @delectable/api        # Build API (dist/)
npm run test -w @delectable/web         # Run Vitest
npm run lint -w @delectable/web         # Lint web code
```

### Web-Specific
```bash
cd apps/web
npm run test -- [pattern]                # Run tests matching pattern
npm run test -- --ui                     # Vitest UI browser
npm run preview                          # Preview production build locally
```

### API-Specific
```bash
cd apps/api
npm start                                # Run compiled dist/index.js (production)
```

## Architecture & Data Flow

### API Design (Backend)

The Hono server proxies three categories of endpoints:

1. **Recipe Endpoints** (via Spoonacular):
   - `GET /api/recipes/trending` → random recipes
   - `GET /api/recipes/vegetarian` → vegetarian recipes
   - `GET /api/recipes/search?q=...` → simple search (maps to complexSearch)
   - `GET /api/recipes/complex?query=...&cuisine=...&diet=...&intolerances=...&maxReadyTime=...&number=...` → filtered search
   - `GET /api/recipes/by-cuisine?cuisine=...` → recipes by cuisine
   - `GET /api/recipes/:id` → full recipe details

2. **AI Endpoints** (require Gemini API key, optional):
   - `POST /api/ai/recipe-assist` → Recipe copilot conversation
     - Rate limit: 30 requests per IP per 60 seconds
     - Accepts chat messages + recipe context
   - `POST /api/ai/search-parse` → Natural-language search to Spoonacular filters
     - Rate limit: 20 requests per IP per 60 seconds
     - Uses Gemini's structured output schema to parse user intent

3. **Health Check**:
   - `GET /health` → `{ ok: true }`

**Error Handling**:
- Spoonacular/Gemini network errors → 503 Service Unavailable
- Invalid request schema → 400 Bad Request
- Rate limit exceeded → 429 Too Many Requests
- Recipe not found → 404 (from Spoonacular)
- Server error → 500 Internal Server Error

**CORS**: Configured via `ALLOWED_ORIGINS` env var (comma-separated list of origins, defaults to `http://localhost:5173`).

### Frontend Architecture

**Routing** (React Router v6, hash-based):
- `/` → Landing page with hero search
- `/trending` → Trending recipes grid
- `/vegetarian` → Vegetarian-only recipes
- `/cuisines` → Cuisine browser
- `/cuisines/:type` → Recipes for specific cuisine
- `/search?q=...&cuisine=...&...` → Search results (supports all Spoonacular complex filters)
- `/recipe/:id` → Full recipe details + copilot chat
- `*` → 404 page

**Data Fetching Pattern**:
All data fetching is done via TanStack Query (React Query):
- `useQuery` for GET requests (recipes, recipe details)
- Query keys follow pattern: `["recipes"]`, `["recipe", id]`, etc.
- All API calls go through `fetchJson()` utility in `src/shared/lib/http.ts`
- API URLs built via `apiUrl()` which reads `VITE_API_BASE_URL` env var
- Responses validated against Zod schemas in `src/shared/api/schemas.ts`

**State Management**:
- Query cache for recipes managed by TanStack Query
- Local component state for UI (search input, chat messages, loading states)
- Theme state in `layouts/DarkMode/` context

**API Client Organization** (`src/shared/api/`):
- `recipes.ts` → all recipe query functions
- `ai.ts` → AI endpoints (recipeAssist, parseNaturalLanguageSearch)
- `schemas.ts` → Zod schemas for request/response validation
- `types.ts` → TypeScript types derived from Zod schemas
- `http.ts` → low-level `fetchJson()` utility with auto-retry logic

**UI Components** (`src/shared/ui/`):
- Button, Card, Spinner, QueryError (error boundary for async queries), Skeleton
- Styled with Tailwind + custom color tokens (see tailwind.config.js)

### Environment Variables

**Shared (repo root `.env` or `apps/api/.env`)**:
- `SPOONACULAR_API_KEY` – Spoonacular API key (required for recipe endpoints)
- `GEMINI_API_KEY` – Google Generative AI key (optional, enables AI features)
- `GEMINI_MODEL` – Gemini model ID (default: `gemini-3-flash-preview`)
- `HTTPS_PROXY` / `NO_PROXY` – Corporate proxy settings if needed

**API Only**:
- `PORT` – Server port (default: 8787)
- `ALLOWED_ORIGINS` – CORS whitelist (default: `http://localhost:5173`)

**Web Only** (`.env.production`):
- `VITE_API_BASE_URL` – Remote API base URL (optional; defaults to relative `/api`)

**Legacy CRA names still supported**:
- `REACT_APP_API_KEY` → maps to `SPOONACULAR_API_KEY`
- `GOOGLE_GENERATIVE_AI_API_KEY` → maps to `GEMINI_API_KEY`

## Validation & Schema Patterns

**All API responses are validated at boundaries**:

1. **Backend** (`apps/api/src/schemas.ts`):
   - Zod schemas for Spoonacular responses (recipes, details)
   - Request body schemas for AI endpoints
   - Structured output schema for Gemini (JSON parsing guardrails)

2. **Frontend** (`apps/web/src/shared/api/schemas.ts`):
   - Mirrors backend schemas
   - Derived TypeScript types via `z.infer<typeof schema>`

This ensures type safety and early error detection if external APIs change.

## Development Workflow

### Running Locally

```bash
# 1. Set up environment
cp .env.example .env
# Edit .env to add SPOONACULAR_API_KEY and optional GEMINI_API_KEY

# 2. Install
npm install

# 3. Run dev servers
npm run dev
# Web: http://localhost:5173
# API: http://localhost:8787
```

In dev mode:
- Vite proxies `/api/*` requests to the backend (see `vite.config.ts`)
- Frontend can be accessed at `http://localhost:5173`
- No need to set `VITE_API_BASE_URL`

### Production Build

```bash
npm run build              # Builds both API and web
npm run build -w @delectable/web  # Web only → apps/web/dist/

# Serve web from static host (e.g., Vercel, Netlify)
# Set VITE_API_BASE_URL to your API domain
# Ensure API has ALLOWED_ORIGINS = your frontend domain
```

### Debugging

- **API errors**: Check `apps/api/src/index.ts` onError handler; network errors logged to console
- **Spoonacular failures**: Verify API key; check rate limits (5K/month free tier)
- **Gemini failures**: Verify key and model ID in AI Studio; check VPN/proxy settings
- **CORS errors**: Ensure frontend origin is in `ALLOWED_ORIGINS` env var

### Code Quality

```bash
npm run lint              # Check both packages
npm run typecheck         # Full TS check
npm run test              # Web tests (Vitest)
```

**Linting rules**:
- ESLint 9 with flat config (`eslint.config.js`)
- Max warnings: 0 (strict enforcement)
- TypeScript strict mode enabled in both packages
- Unused variables/parameters flagged in web build

## Feature Highlights

### Recipe Copilot (AI-Assisted Cooking)
- Located in `src/features/ai/RecipeCopilot.tsx`
- Sends recipe context (title, ingredients, instructions) + chat messages to `/api/ai/recipe-assist`
- Gemini returns cooking tips, substitutions, modifications
- Rate-limited to 30 requests/minute per IP
- Uses low temperature (0.4) for consistent, helpful responses

### Natural-Language Search
- UI in `src/features/search/SearchRecipe.tsx`
- User types natural language (e.g., "high protein meals under 30 minutes")
- `/api/ai/search-parse` parses intent → Spoonacular filter params
- Uses Gemini structured output (JSON schema) for reliable parsing
- Results redirect to `/search` page with filter params in URL

### Recipe Export
- Recipe details page has "Download as PDF" button
- Uses jsPDF to generate PDF with image + metadata
- Located in `src/features/recipes/RecipeDetailsPage.tsx`

## Common Tasks

### Adding a New Recipe Filter

1. **Backend** (`apps/api`):
   - Add parameter to `GET /api/recipes/complex` query validation (Zod)
   - Pass to `spoonacularFetch()` call
   - Add to Gemini schema in `searchParseGeminiSchema` if user-facing

2. **Frontend** (`apps/web`):
   - Update `searchRecipesComplex()` args in `src/shared/api/recipes.ts`
   - Update `SearchResultsPage` to display/filter by new param
   - Optionally add to natural-language parsing prompt in API

### Adding a New Route

1. Add lazy-loaded component in `src/app/App.tsx`:
   ```tsx
   const MyPage = lazy(() =>
     import("@/features/myfeature/MyPage").then((m) => ({
       default: m.MyPage,
     }))
   );
   ```

2. Add route:
   ```tsx
   <Route path="/mypage" element={<MyPage />} />
   ```

3. Create feature directory: `src/features/myfeature/`

### Testing a Single Feature

```bash
cd apps/web
npm run test -- recipes  # Run tests matching "recipes"
npm run test -- --ui     # Open Vitest UI, click tests to run/debug
```

Test files are co-located with components (`*.test.tsx` or `.test.ts`).

### Proxy Setup for Corporate Networks

If API fails with "fetch failed" on a proxy network:

```env
# apps/api/.env or repo root .env
HTTPS_PROXY=http://user:pass@proxy.company.com:8080
NO_PROXY=localhost,127.0.0.1
```

Then restart `npm run dev`.
