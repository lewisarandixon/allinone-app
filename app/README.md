# daybook.ai

Production-grade multi-tenant SaaS for accountancy firms. Built with Next.js App Router, Prisma, BullMQ, Stripe, OpenAI, and Xero/QBO adapters.

## Quick start

- Copy `.env.example` to `.env.local` and fill at least `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.
- Install deps: `pnpm install`
- Generate Prisma client: `pnpm prisma:generate`
- Push schema to DB (dev): `pnpm db:push`
- Run unit tests: `pnpm test`
- Dev server: `pnpm dev`

Docs in `src/docs/SETUP.md` and `src/docs/OPERATIONS.md`.
