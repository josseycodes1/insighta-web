# Insighta Labs+ — Web Portal

Next.js 14 frontend for the Profile Intelligence System.

## Pages

| Route            | Description                   |
| ---------------- | ----------------------------- |
| `/`              | Landing page                  |
| `/login`         | Email/password + GitHub OAuth |
| `/signup`        | Register new account          |
| `/auth/callback` | GitHub OAuth token handler    |
| `/dashboard`     | Main profile management UI    |

## Setup

```bash
cp .env.example .env.local
# Edit .env.local with your backend URL

npm install
npm run dev
```

## Auth Flow

### GitHub OAuth (browser)

1. User clicks "Continue with GitHub" on `/login`
2. Redirected to `{API_BASE}/accounts/github/login/?process=login`
3. Allauth handles OAuth dance → calls your `GitHubLogin` view
4. Backend redirects to `https://insighta-web-azure.vercel.app/auth/callback?access=...&refresh=...&role=...`
5. `/auth/callback` stores tokens and redirects to `/dashboard`

### Email/Password (cookie-based)

1. POST to `/api/v1/auth/login/` with `{email, password}`
2. Backend (`CookieLoginView`) sets HTTP-only cookies: `access_token` + `refresh_token`
3. All subsequent requests use `credentials: "include"` to send cookies automatically

## Role Enforcement (UI)

- **Analyst**: Can view profiles, create profiles, use NLP search
- **Admin**: Everything above + delete profiles + export CSV

The role is returned in the login response body and stored in `localStorage` for UI display. The **actual enforcement** happens on the backend.

## API Calls

All requests use `credentials: "include"` for cookie-based auth.  
Falls back to `Authorization: Bearer <token>` header if a token is in `localStorage`.

## Environment Variables

| Variable              | Description |
| --------------------- | ----------- |
| `NEXT_PUBLIC_API_URL` | backend URL |
