# Operations

## Queues
- email:poll — poll mailboxes for new messages
- email:reply — send replies
- parse:invoice — parse documents via PDF.co
- post:xero — post bill to Xero
- post:qbo — post bill to QuickBooks
- notify — user notifications

Default retries: 5 with exponential backoff.

## Idempotency
Key format: `sha256(orgId + supplier + invoiceNo + date + total)`.

## Exceptions
- Parsing or posting failures set `Document.status = failed`. Surface in dashboard.
- Use `pnpm queues:drain` to clear DLQ in development.