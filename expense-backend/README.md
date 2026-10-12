# Expense Tracker Backend

NestJS REST API for the Expense Tracker. It verifies Firebase Authentication ID tokens, validates expense requests, and stores each user's expenses in PostgreSQL.

## Requirements

- Node.js and npm
- PostgreSQL
- A Firebase project with Email/Password sign-in enabled
- A Firebase Admin service-account JSON for that same Firebase project

## Install

From this directory:

```powershell
npm install
```

## Configure PostgreSQL

Create a PostgreSQL database, then create `expense-backend/.env`:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASS=your_postgres_password
DB_NAME=expense_tracker
```

Use your actual local PostgreSQL credentials and database name. Keep `.env` private and do not commit it.

## Configure Firebase Admin

Download a service-account key from Firebase Console → **Project settings** → **Service accounts**. Save it at the backend project root as:

```text
serviceAccountKey.json
```

The service account must belong to the same Firebase project as the frontend's Firebase Web App configuration. This file grants privileged server access: never commit it, expose it in the frontend, or share it publicly.

## Run the API

Start PostgreSQL first, then from the backend directory run:

```powershell
npm run start:dev
```

The API listens at `http://localhost:3000`. The development CORS configuration permits `localhost` and `127.0.0.1` origins on any port. Set `FRONTEND_ORIGIN` in `.env` to allow an additional exact origin, for example:

```dotenv
FRONTEND_ORIGIN=https://your-frontend.example.com
```

The Angular frontend normally runs at `http://localhost:4200`; if Angular selects another local port, the local CORS rule also allows it. Restart the backend after changing its environment or CORS configuration.

## Authentication

All `/expenses` endpoints require a Firebase ID token:

```http
Authorization: Bearer <firebase-id-token>
```

The `FirebaseAuthGuard` verifies the token with Firebase Admin. The API takes the owner's UID from the verified token, not from the request body.

## Expense API

Base URL: `http://localhost:3000/expenses`

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/expenses` | List expenses owned by the signed-in user |
| `GET` | `/expenses/:id` | Get one expense owned by the signed-in user |
| `POST` | `/expenses` | Create an expense for the signed-in user |
| `PATCH` | `/expenses/:id` | Update an expense owned by the signed-in user |
| `DELETE` | `/expenses/:id` | Delete an expense owned by the signed-in user |

Example `POST /expenses` body:

```json
{
  "title": "Lunch",
  "amount": 250,
  "category": "Food",
  "date": "2026-10-12",
  "note": "Optional note"
}
```

`title` and `category` must be non-empty strings, `amount` must be at least `0.01`, and `date` must be a valid ISO date string. `note` is optional. Do not send `userId`; the server assigns it from the verified Firebase token.

## Database behavior

TypeORM loads the expense entity and creates/updates the schema automatically because `synchronize: true` is enabled in `src/app.module.ts`. This is intended for development only. Use reviewed migrations and disable automatic synchronization before production deployment.

## Build and test

```powershell
npm run build
npm test
npm run test:e2e
```

Other available scripts include `npm run start:debug`, `npm run test:watch`, `npm run test:cov`, and `npm run lint`.

## Troubleshooting

- **Backend does not start:** Check the terminal for PostgreSQL connection errors and verify `.env` values and that PostgreSQL is running.
- **`serviceAccountKey.json` not found:** Put the Firebase Admin key in the backend project root and start the process from the backend directory.
- **401 Unauthorized:** Sign in again and ensure the frontend Firebase project matches the backend service-account project.
- **CORS error:** Confirm the exact frontend origin is allowed; set `FRONTEND_ORIGIN` if needed and restart the API.
- **Failed to fetch:** Confirm the API is reachable at `http://localhost:3000` and inspect the browser Network tab for the request's status and response.
- **Expense validation error:** Check the request body against the required fields and constraints above.
