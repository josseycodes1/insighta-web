# Insighta Labs+ Web Portal

Next.js web portal for non-technical Insighta Labs+ users. The portal uses the same backend APIs as the CLI, giving analysts and admins a browser-based interface for profile intelligence workflows.

## Live URL

- Web portal: `https://insighta-web-azure.vercel.app`
- Backend API: `https://rofile--ntegration-adewumijosephine3516-kodp7ruz.leapcell.dev`

## Repository Role

This repository is the web interface in the three-repository Stage 3 architecture:

- Backend API: authentication, RBAC, profiles, search, export, logging.
- CLI: terminal interface for engineers and power users.
- Web portal: browser interface for analysts and internal stakeholders.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Product entry screen |
| `/login` | Email/password and GitHub OAuth login |
| `/signup` | Access request / registration |
| `/auth/callback` | OAuth token callback handler |
| `/dashboard` | Metrics, profile list, filters, search, create/delete/export controls |
| `/profiles/[id]` | Profile detail view |
| `/search` | Dedicated natural language search page |
| `/account` | Role and session controls |

## Authentication Flow

1. User clicks "Continue with GitHub" on `/login`.
2. Browser redirects to backend `GET /auth/github`.
3. Backend generates PKCE and state, stores HttpOnly validation cookies, and redirects to GitHub.
4. GitHub redirects to `GET /auth/github/callback`.
5. Backend validates state/PKCE, creates or retrieves the user, issues tokens, and sets HttpOnly token cookies.
6. The portal stores the role for UI display and sends authenticated requests with cookies and/or bearer tokens.

The intended production security model is HTTP-only cookies with CSRF protection so tokens are not exposed to JavaScript.

## Backend API Contract

All profile API calls include:

```http
X-API-Version: 1
```

The portal uses:

- `/api/profiles/` for profile lists, filters, sorting, pagination, and admin profile creation.
- `/api/profiles/search/` for natural language search.
- `/api/profiles/{id}/` for profile detail and admin deletion.
- `/api/profiles/export/` for admin CSV export.

## Role Enforcement

| Role | Web behavior |
| --- | --- |
| `admin` | Can create, delete, export, list, and search |
| `analyst` | Can list and search |

The UI hides admin-only controls for analysts. The backend still enforces permissions on every request.

## Natural Language Search

Search accepts plain English and delegates parsing to the backend rule-based parser.

Examples:

```text
young males from nigeria
females above 30
adult males from kenya
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, set `NEXT_PUBLIC_API_URL` to the deployed backend URL.

## Local Setup

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Quality Checks

```bash
npm run lint
npm test
npm run build
```

## CI/CD

GitHub Actions workflow: `.github/workflows/ci.yml`

Runs on pull requests and pushes to `main`:

- `npm ci`
- `npm run lint`
- `npm test`
- `npm run build`

## Engineering Standards

- Use conventional commits, for example `feat(web): add dashboard filters`.
- Open pull requests before merging to `main`.
- Keep backend URLs in environment variables.
