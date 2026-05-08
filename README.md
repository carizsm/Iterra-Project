# Iterra

Iterra is a web-first collaborative trip workspace for planning itineraries, managing shared budgets, tracking expenses, splitting costs, and reviewing trips after the journey.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style local components
- lucide-react
- React Hook Form
- Zod
- Recharts
- Supabase Auth and PostgreSQL

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

Without Supabase environment variables, the app runs in demo mode so the main screens can be reviewed.

## Supabase Setup

Run the SQL migration in `supabase/migrations/001_iterra_schema.sql` from the Supabase SQL editor or through the Supabase CLI.

The migration creates:

- `profiles`
- `trips`
- `trip_members`
- `itinerary_items`
- `budget_items`
- `expenses`
- `expense_splits`
- `trip_reviews`

It also enables Row Level Security and adds starter policies so users can only access trips where they are members.

## Main Routes

- `/login`
- `/register`
- `/dashboard`
- `/trips`
- `/trips/new`
- `/trips/join`
- `/trips/[tripId]/overview`
- `/trips/[tripId]/itinerary`
- `/trips/[tripId]/budget`
- `/trips/[tripId]/expenses`
- `/trips/[tripId]/members`
- `/trips/[tripId]/review`

## Product Notes

The MVP prioritizes a calm trip workspace, shared budgeting, equal split calculations, settlement suggestions, and post-trip review. Payment gateway, AI recommendations, native mobile, offline sync, booking, social feed, and complex map routing are intentionally out of scope.
