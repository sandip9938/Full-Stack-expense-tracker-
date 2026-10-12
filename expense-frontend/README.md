# Expense Tracker Frontend

Angular frontend for the Expense Tracker. Firebase Authentication handles user accounts; authenticated expense data is read from and written to the NestJS backend.

## Requirements

- Node.js and npm
- The Expense Tracker backend running at `http://localhost:3000`
- A Firebase project with Email/Password sign-in enabled

## Install and run

From this directory:

```powershell
npm install
npm start
```

Open the URL printed by Angular CLI, usually `http://localhost:4200`. If that port is busy, Angular may select another available port; the backend allows local `localhost` and `127.0.0.1` origins.

## Firebase configuration

Set the Firebase Web App configuration in `src/app/firebase.config.ts` using the values from Firebase Console → **Project settings** → **Your apps**. Enable Email/Password at Firebase Console → **Authentication** → **Sign-in method**.

The frontend Firebase project must match the Firebase project used by the backend service account. Firebase web configuration is client-side; restrict the API key to the required APIs and approved web origins. Never commit Firebase Admin service-account credentials to this frontend project.

## App flow

1. `src/main.ts` starts the Angular app with providers from `src/app/app.config.ts`.
2. `src/app/app.routes.ts` maps `/login`, `/register`, and `/expenses` to their page components.
3. Login and registration pages call `src/app/services/auth.service.ts`, which uses Firebase Auth.
4. `src/app/auth.guard.ts` checks the Firebase session before allowing access to `/expenses`.
5. `src/app/pages/expenses.component.ts` displays expenses and handles add, edit, and delete actions.
6. `src/app/services/expense.service.ts` sends expense requests to `http://localhost:3000/expenses`.
7. `src/app/token.interceptor.ts` adds the Firebase ID token as a Bearer Authorization header to API requests.

## Backend API

The frontend expects the backend at `http://localhost:3000`. It calls:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/expenses` | List the signed-in user's expenses |
| `GET` | `/expenses/:id` | Read one expense |
| `POST` | `/expenses` | Add an expense |
| `PATCH` | `/expenses/:id` | Update an expense |
| `DELETE` | `/expenses/:id` | Delete an expense |

To use a different backend URL, update the `url` field in `src/app/services/expense.service.ts`. Configure the backend CORS origin to match the frontend URL.

## Build and tests

```powershell
npm run build
npm test
```

`npm run build` writes the production build to `dist/`.

## Troubleshooting

- **Firebase API key error:** Verify the web app config in `src/app/firebase.config.ts`.
- **401 Unauthorized:** Sign in again and verify that frontend and backend use the same Firebase project.
- **CORS error:** Ensure the backend allows the exact frontend origin and restart the backend after changing its configuration.
- **Failed to fetch:** Confirm the backend is running at `http://localhost:3000` and inspect the browser Network tab for the failed API request.
- **Expense not saved:** Check the API response in the browser Network tab and check the backend terminal and PostgreSQL connection.
