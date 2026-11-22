# AgriMatch — Farmer Government Scheme Discovery (MERN)

**Assignment-ready student project | React + Vite + Node.js + Express + MongoDB**

AgriMatch helps farmers discover potentially relevant Central Government and Madhya Pradesh agriculture schemes using a simple farmer profile, state-aware catalogue filters, and transparent matching explanations.

> **Important:** AgriMatch is an educational discovery tool, not a government portal. A match means “potentially relevant”, not “approved” or “eligible”. Scheme rules, application windows, quotas, crop notifications, documents and benefit amounts can change. Always verify details on the linked official source or with the relevant department before applying.

## Included features

- Register/login using JWT and bcrypt
- Farmer profile (state, district, landholding, crop, irrigation and farming interests)
- Scheme catalogue with Central/State, state, category and text filters
- Official-source links and last-checked metadata on each scheme
- Explainable “potentially relevant” matching; no automatic legal eligibility decision
- Seed data for selected Central schemes and Madhya Pradesh schemes
- Project synopsis, report structure, architecture diagrams, test cases and PPT outline under `docs/`
- Responsive React UI and Express REST API

## Project structure

```text
agrimatch-mern/
├── client/                 # React + Vite frontend
├── server/                 # Express + MongoDB backend
│   └── src/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── seed.js
├── docs/
│   ├── ASSIGNMENT_SYNOPSIS.md
│   ├── FINAL_REPORT_TEMPLATE.md
│   ├── ARCHITECTURE_AND_DIAGRAMS.md
│   ├── TEST_CASES.md
│   ├── PPT_OUTLINE.md
│   └── SCHEME_DATA_SOURCES.md
└── README.md
```

## Requirements

- Node.js 20 or later (Node.js 18.18+ may work with the included Vite version)
- npm
- MongoDB Atlas free cluster or local MongoDB
- Git and GitHub account

## 1. Configure the backend

Open a terminal in the project root:

```bash
cd server
npm install
```

Copy `server/.env.example` to `server/.env` and fill in your MongoDB connection string and a long random JWT secret.

Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

macOS/Linux:
```bash
cp .env.example .env
```

Seed the verified-source catalogue:
```bash
npm run seed
```

Start the API:
```bash
npm run dev
```

API: `http://localhost:5000`  
Health check: `http://localhost:5000/api/health`

## 2. Run the frontend

Open a second terminal from the project root:

```bash
cd client
npm install
```

Copy `client/.env.example` to `client/.env`.

Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

macOS/Linux:
```bash
cp .env.example .env
```

Start React:
```bash
npm run dev
```

Open `http://localhost:5173`.

## 3. Test the project

1. Register a test account using a non-sensitive email.
2. Save a farmer profile. Use fictional/test details for a classroom demo.
3. Open **Scheme directory** and test the search and filters.
4. Open **My matches** and read the reasons and verification reminders.
5. Open the official source link on each scheme card.

Do not enter Aadhaar numbers, bank-account numbers, passwords used elsewhere, or other sensitive personal information.

## 4. GitHub

Create an empty GitHub repository named `agrimatch`. From the project root:

```bash
git init
git add .
git commit -m "Build AgriMatch MERN assignment project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/agrimatch.git
git push -u origin main
```

Never upload `.env` files. The `.gitignore` file excludes them.

## 5. MongoDB Atlas

1. Create a free MongoDB Atlas cluster.
2. Create a database user with a strong unique password.
3. Add your development IP in Network Access.
4. Copy the Node.js connection string.
5. Put it in `server/.env` as `MONGO_URI=...`.
6. Do not share your connection string or commit it to GitHub.

For a deployed app, configure the network access rules carefully. Avoid leaving a database publicly accessible unless you understand the implications.

## 6. Deploy backend on Render

- Create a Web Service and connect your GitHub repository.
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment variables:
  - `MONGO_URI` — Atlas connection string
  - `JWT_SECRET` — long random secret
  - `CLIENT_URL` — deployed frontend URL
  - `NODE_ENV` — `production`

Deploy and copy the service URL, e.g. `https://your-api.onrender.com`.

## 7. Deploy frontend on Vercel

- Import the same GitHub repository.
- Root Directory: `client`
- Framework: Vite
- Environment variable:
  - `VITE_API_URL=https://your-api.onrender.com/api`

Deploy. Then set `CLIENT_URL` on Render to the exact Vercel URL and redeploy the backend.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API health |
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |
| GET | `/api/profile` | Get farmer profile |
| PUT | `/api/profile` | Save farmer profile |
| GET | `/api/schemes` | Browse/filter schemes |
| GET | `/api/schemes/:id` | Scheme details |
| GET | `/api/matches` | Potentially relevant schemes for logged-in farmer |

## Scheme data and future expansion

The seed contains a small, curated starter catalogue, not every scheme in India. The schema supports:
- `governmentLevel`: `Central` or `State`
- `applicableStates`: `["All India"]` or one/more state names
- categories, crops, irrigation and farmer profile hints
- official source URL, source name, verification status and `lastVerifiedAt`

To add more schemes, add a record to `server/src/seed.js` and run `npm run seed`. The seed script upserts by `schemeCode`, so it can safely be re-run without creating duplicate scheme records.

Before adding a new record, verify its current official notification, state applicability, application window, benefit, exclusions and documents. If you cannot confirm a detail, write “Check official notification” instead of guessing.

## Assignment material

Start with `docs/ASSIGNMENT_SYNOPSIS.md`. Use the report template, diagrams, test cases and presentation outline as a base. Add your own name, roll number, guide name, screenshots, implementation observations and actual test results.

## Known limitations / future scope

- The initial data set is intentionally small and curated.
- No automatic live scraping of government portals.
- No admin dashboard yet; adding secure admin role-based CRUD is a suitable next module.
- No SMS/email alerts, multilingual UI or application submission.
- Some schemes have seasonal notifications, district targets or changing quotas.
- Matching is a discovery aid only; the government department decides final eligibility.
