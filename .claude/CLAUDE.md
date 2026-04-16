# Project: Proply

## What This Is
AI-powered commercial real estate chatbot SaaS.
Floating chat widget embedded on property websites via script tag or WordPress plugin.
Multi-tenant — every query must be scoped to a tenant_id.

## Tech Stack
- Frontend: Next.js 15 (App Router, Server Components)
- CSS framework: TailwindCSS v4
- Backend: Bun + Hono (REST API + SSE streaming)
- Database: Supabase (Postgres + Auth + Storage)
- Cache: Upstash Redis
- AI: OpenAI API
- Deploy: Vercel (frontend) + Railway (backend)
- Monorepo: Turborepo

## Repo Structure
/apps/web        → Next.js dashboard + widget UI
/apps/api        → Bun + Hono backend
/apps/wp-plugin  → WordPress PHP plugin
/packages/types  → Shared TypeScript types
/packages/db     → Prisma schema + migrations

## Coding Rules
- TypeScript strict mode always — no `any` types
- Never use `var` — only `const` and `let`
- Always handle errors explicitly — no silent catches
- No console.log in production code — use a logger
- All API responses follow this shape:
  { success: boolean, data?: T, error?: string }
- Every database query must include tenant_id filter
- Never expose tenant data across boundaries

## Naming Conventions
- Components: PascalCase (PropertyCard.tsx)
- Hooks: camelCase prefixed with use (useChat.ts)
- API routes: kebab-case (/api/property-search)
- DB tables: snake_case (conversation_messages)
- Env variables: SCREAMING_SNAKE_CASE

## Database Rules
- Never query without tenant_id — multi-tenancy is non-negotiable
- Never delete records — use soft deletes (is_deleted, deleted_at)
- All tables must have: id, tenant_id, created_at, updated_at
- Never write raw SQL — use Prisma ORM only
- Always paginate list queries — default limit 20

## AI / OpenAI API Rules
- Never change the model without asking first
- Always include system prompt from /lib/prompts/system.ts
- Tool definitions live in /lib/tools/index.ts — never inline them
- Never log message content — privacy sensitive
- Always stream responses via SSE — never wait for full response

## Generative UI Rules
- Only 3 tools at MVP: render_property_cards, render_mortgage_calculator, render_booking_form
- Tool components live in /components/chat/tools/
- Never render arbitrary HTML from AI output — whitelist only
- Each tool component must handle loading and error states

## API Rules
- All routes require X-Tenant-ID header — reject without it
- Rate limit per tenant — 100 requests/min via Upstash Redis
- Never return stack traces to client — log server side only
- Auth via Supabase JWT — validate on every protected route

## Environment Variables
- Never hardcode secrets — always use process.env
- Never commit .env files
- All required env vars must be documented in .env.example

## What NOT To Do
- Do not install new packages without asking first
- Do not change the database schema without asking first
- Do not modify the system prompt without asking first
- Do not add new AI tools without asking first
- Do not refactor working code unless asked
- Do not use any as a TypeScript type
- Do not write tests unless explicitly asked
- Do not add comments that just restate the code

## Current MVP Scope
In scope:
- Floating chat widget
- OpenAI tool calling (3 components)
- Lead capture
- Client dashboard (leads + conversations)
- WordPress plugin (script tag embed)
- Multi-tenant auth

Out of scope (do not build yet):
- RAG / PDF upload
- CRM integrations
- WhatsApp handoff
- Analytics charts
- Multilingual support
- OpenUI framework
