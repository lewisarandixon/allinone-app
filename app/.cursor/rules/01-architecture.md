# daybook.ai Architecture & House Rules

This document codifies architectural decisions and conventions for the daybook.ai multi-tenant SaaS.

## Core Stack
- Next.js (App Router) + React + TypeScript (strict)
- Prisma + PostgreSQL
- Auth.js (NextAuth) with Google & Azure AD providers
- Stripe for billing (Checkout + Customer Portal)
- BullMQ + Redis for background jobs
- OpenAI API
- Microsoft Graph + Gmail API for email
- Xero (xero-node) + QuickBooks (node-quickbooks)
- PDF.co via REST (axios)
- File storage: S3 (with local dev stub)
- UI: TailwindCSS + shadcn-style components + lucide-react
- Tests: Vitest + Playwright
- Observability: Sentry + request/queue logging

## Folder Layout
- `/app` — routes, RSC pages
- `/components` — UI components
- `/lib` — provider adapters, services, utils
- `/server` — db, jobs, auth, tenancy
- `/jobs` — BullMQ processors and worker entry
- `/schemas` — Zod schemas for external payloads
- `/tests` — unit and e2e tests
- `/scripts` — scripts
- `/config` — env loader and app config

## Multi-tenancy
- Every business entity includes `orgId`. All queries must be scoped by `orgId`.
- Use `requireOrg(session)` helper to gate routes and ensure tenancy scope.

## Environment & Config
- Environment variables are read once via `/config/env.ts` using Zod. No secrets in code.

## Background Jobs
- Jobs must be idempotent.
- Idempotency key: `hash(orgId + supplier + invoiceNo + date + total)`.
- Retries with exponential backoff, DLQ, and logging context `{jobName, orgId, provider, correlationId}`.

## Error Handling
- Never throw raw provider errors. Normalize to `AppError { code, message, cause? }`.

## Logging
- Lightweight logger (console in dev) with contextual fields.

## Security
- Encrypt refresh tokens at rest using Node crypto with env key.
- Validate MIME types and limit upload sizes.
- Do not store full email bodies indefinitely.

## Accessibility & UX
- Keyboard-friendly, sensible empty states, and toasts for success/failure.

## Testing & CI
- Vitest unit tests for parsers, mappers, adapters (mocks).
- Playwright e2e happy path scaffold.
- GitHub Actions for typecheck, build, tests.

## Zod Validation
- Validate all external payloads (webhooks, PDF.co, email where relevant) with Zod in `/schemas`.