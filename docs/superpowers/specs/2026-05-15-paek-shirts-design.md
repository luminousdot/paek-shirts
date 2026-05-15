# Paek Shirts — Design Spec

**Date:** 2026-05-15  
**Project:** paek-shirts  
**Status:** Approved

---

## Overview

A Next.js 14 web app for the Niš Climbing Club to collect t-shirt orders online. Users pick a shirt design, select a size, enter their name and email, and submit. Orders are stored in Supabase and trigger email notifications via Resend — one to the organizer, one to the customer.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (Postgres)
- **Email:** Resend
- **Deployment:** Vercel
- **Version Control:** Git + GitHub

---

## Architecture

The page is a Server Component. The interactive order form is extracted into a `"use client"` Client Component. Submission calls a Next.js Server Action directly — no API route. The Server Action runs server-side, keeping all secrets out of the browser.

### Project Structure

```
paek-shirts/
├── app/
│   ├── page.tsx                  ← order page (Server Component)
│   ├── layout.tsx                ← root layout
│   └── actions/
│       └── submitOrder.ts        ← Server Action: Supabase insert + Resend email
├── components/
│   └── OrderForm.tsx             ← interactive form ("use client")
├── lib/
│   ├── supabase.ts               ← Supabase server client
│   └── resend.ts                 ← Resend client
├── public/
│   └── designs/                  ← shirt design images
│       ├── topo-division.jpg
│       ├── urban-boulder-men.jpg
│       ├── urban-boulder-women.jpg
│       └── planet-boulder.jpg
└── .env.local                    ← local secrets (not committed)
```

---

## Data Model

**Table: `orders`** (Supabase / Postgres)

| Column       | Type          | Notes                        |
|--------------|---------------|------------------------------|
| `id`         | `uuid`        | Primary key, auto-generated  |
| `created_at` | `timestamptz` | Auto-set by Supabase         |
| `name`       | `text`        | Customer full name           |
| `email`      | `text`        | Customer email               |
| `model`      | `text`        | Shirt design name            |
| `type`       | `text`        | Unisex / Muška / Ženska      |
| `size`       | `text`        | XS / S / M / L / XL / XXL   |
| `note`       | `text`        | Optional note, nullable      |

**Row Level Security:** RLS enabled with no public policies. The Server Action uses the Supabase service role key, which bypasses RLS entirely — no anon insert policy needed. All access restricted to service role (Supabase dashboard) only.

---

## Order Submission Flow

1. User fills out the form and clicks "Pošalji porudžbinu"
2. Server Action fires:
   - Inserts order row into `orders` table via Supabase service role client
   - On success, calls Resend to send two emails:
     - **Organizer email:** full order details (name, email, model, type, size, note)
     - **Customer confirmation email:** friendly confirmation that their order was received
3. Form shows success or error state based on Server Action result

---

## Email

- **Provider:** Resend (free tier: 3,000 emails/month)
- **Sending domain:** verified domain required for production; Resend shared domain usable for testing
- **Organizer email:** set via `ORGANIZER_EMAIL` environment variable
- **Two emails per order:**
  - To organizer: structured order summary
  - To customer: confirmation receipt

---

## Deployment

1. Initialize Git repo locally, push to GitHub
2. Connect GitHub repo to Vercel — auto-detects Next.js, no config needed
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `ORGANIZER_EMAIL`
4. Every push to `main` triggers auto-deploy

---

## Out of Scope

- Custom admin dashboard (Supabase table view is sufficient)
- Payment processing
- Order editing or cancellation flow
- Multi-language support
