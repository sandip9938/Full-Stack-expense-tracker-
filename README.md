# Expense Tracker

An expense-tracking app with an Angular frontend, a NestJS REST API, Firebase Authentication, and PostgreSQL storage. Users sign in with Firebase; the API verifies their Firebase ID token and stores expenses under that user's ID.

## Features

- Email/password registration, login, and logout with Firebase Authentication
- Authenticated expense listing, creation, editing, and deletion
- Expense totals displayed in INR
- Per-user expense ownership enforced by the backend
- Request validation on the API

## Project structure

```text
expense-tracker/
├── expense-frontend/   # Angular app
└── expense-backend/    # NestJS API
```

## Requirements

- Node.js and npm
- PostgreSQL
- A Firebase project with **Email/Password** sign-in enabled
- A Firebase service-account credential for the backend

## Configuration

### Frontend Firebase settings

Set the Firebase Web App configuration in `expense-frontend/src/app/firebase.config.ts`. Use the values from Firebase Console → **Project settings** → **Your apps**. Ensure the frontend and backend Firebase settings refer to the same Firebase project.

Do not commit private credentials or paste them into issue reports. Firebase web configuration is used by the client; restrict its API key to the required APIs and web origins in Google Cloud Console.

### Backend environment

Create `expense-backend/.env` with your local PostgreSQL connection settings:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASS=your_postgres_password
DB_NAME=expense_tracker
```

Create the PostgreSQL database named in `DB_NAME` before starting the API.

Place the Firebase Admin service-account JSON at:

```text
expense-backend/serviceAccountKey.json
```

The service account must belong to the same Firebase project as the frontend. Keep `.env` and `serviceAccountKey.json` private; do not commit them.

The API accepts local development origins on `localhost` and `127.0.0.1` using any port. To specify one additional/production frontend origin, set `FRONTEND_ORIGIN` in the backend environment, for example:

```dotenv
FRONTEND_ORIGIN=https://your-frontend.example.com
```

## Run locally

Open separate terminals from the `expense-tracker` directory.

### 1. Start the backend

```powershell
cd .\expense-backend
npm install
npm run start:dev
```

The API listens at `http://localhost:3000`.

### 2. Start the frontend

```powershell
cd .\expense-frontend
npm install
npm start
```

Open the URL printed by Angular CLI (usually `http://localhost:4200`). Angular may choose a different port when the default is busy; local CORS configuration supports that.

## API

All expense endpoints require a Firebase ID token in the header:

```http
Authorization: Bearer <firebase-id-token>
```

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/expenses` | List the signed-in user's expenses |
| `GET` | `/expenses/:id` | Get one of the signed-in user's expenses |
| `POST` | `/expenses` | Create an expense |
| `PATCH` | `/expenses/:id` | Update an expense |
| `DELETE` | `/expenses/:id` | Delete an expense |

Example create request body:

```json
{
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "date": "2026-10-12",
  "note": "Optional note"
}
```

The API gets the owner's Firebase UID from the verified token; clients should not send `userId`.

## Build and tests

Frontend:

```powershell
cd .\expense-frontend
npm run build
npm test
```

Backend:

```powershell
cd .\expense-backend
npm run build
npm test
```

## Troubleshooting

- **CORS error:** Open the exact Angular URL printed in its terminal. The backend permits local `localhost`/`127.0.0.1` ports; restart the backend after configuration changes.
- **401 Unauthorized:** Sign in again and check that the frontend Firebase project and backend service-account project match.
- **API unavailable / Failed to fetch:** Confirm the backend is running at `http://localhost:3000` and inspect the backend terminal for startup errors.
- **Database connection failure:** Verify PostgreSQL is running and that the `.env` values and database name are correct.
- **Firebase auth error:** Check the Firebase Web App configuration and enable Email/Password under Firebase Authentication sign-in providers.

> `synchronize: true` is enabled in the backend for development. Use database migrations and review schema changes before deploying to production.