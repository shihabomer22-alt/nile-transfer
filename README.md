# Nile Transfer (Website + Admin Dashboard)

## 1) Requirements
- Node.js 18+

## 2) Setup Supabase
1. Create a Supabase project
2. In **SQL Editor**, run `supabase.sql`
3. Enable **Auth > Providers > Email** (default)
4. Create an admin user: **Auth > Users > Add user** (email + password)

## 3) Environment variables
Copy `.env.example` to `.env.local` and fill values:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

## 4) Run locally
```bash
npm install
npm run dev
```

## 5) Deploy to Vercel
- Push this project to GitHub
- Import in Vercel
- Add the same env vars in Vercel Project Settings
