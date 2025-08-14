# Setup

1. Copy `.env.example` to `.env.local` and set values.
2. Create PostgreSQL and Redis instances.
3. Run `pnpm prisma:generate` then `pnpm db:push`.
4. Start dev server: `pnpm dev`.

The default UI ships with a dark, professional theme inspired by finance/accounting dashboards similar to the screenshots. The product name is `daybook.ai`.

## Environment Variables

- DATABASE_URL, REDIS_URL
- NEXTAUTH_URL, NEXTAUTH_SECRET
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
- AZURE_AD_CLIENT_ID, AZURE_AD_TENANT_ID, AZURE_AD_CLIENT_SECRET
- STRIPE_SECRET_KEY, STRIPE_PRICE_PRO, STRIPE_WEBHOOK_SECRET
- OPENAI_API_KEY, PDFCO_API_KEY
- S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET, S3_REGION
- XERO_CLIENT_ID, XERO_CLIENT_SECRET, XERO_REDIRECT_URI
- QBO_CLIENT_ID, QBO_CLIENT_SECRET, QBO_REDIRECT_URI
- SENTRY_DSN, ENCRYPTION_KEY

## OAuth Callbacks

- NextAuth auth callbacks: `${NEXTAUTH_URL}/api/auth/callback/google` and `${NEXTAUTH_URL}/api/auth/callback/azure-ad}`.
- Xero redirect: `${NEXTAUTH_URL}/api/connect/xero/callback`
- QBO redirect: `${NEXTAUTH_URL}/api/connect/qbo/callback`

## Notes

- When keys are missing, features are stubbed with graceful fallbacks.
- For local file storage, S3 utilities return `file://local/...` URLs.