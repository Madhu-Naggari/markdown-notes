# Markdown Notes Application

A simple full-stack Markdown Notes app built with React, Node.js, Express, and PostgreSQL.

## Features

- User registration and login
- JWT authentication handled in the backend
- Password hashing using bcrypt
- Single JWT token stored in client cookies
- Create, edit, and delete notes
- Live Markdown preview
- Light mode and dark mode
- Toast messages for note and auth actions
- Responsive layout for mobile, tablet, and desktop
- Plain CSS styling without Tailwind

## Project Structure

```text
Notes_Application/
  backend/
    db/
    src/
      config/
      controllers/
      middleware/
      routes/
      services/
      utils/
  frontend/
    src/
      app/
      components/
      pages/
      services/
      styles/
      utils/
```

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: PostgreSQL

## Backend Setup

1. Go to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file using `.env.example`:

   ```env
   PORT=3000
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/markdown_notes
   CLIENT_URL=http://localhost:5173
   JWT_SECRET=your_secret_key
   ACCESS_TOKEN_EXPIRES_IN=1d
   BCRYPT_SALT_ROUNDS=10
   DATABASE_SSL=false
   DATABASE_SSL_REJECT_UNAUTHORIZED=true
   ```

4. Create the PostgreSQL database:

   ```sql
   CREATE DATABASE markdown_notes;
   ```

5. Run the SQL file inside `backend/db/init.sql`.
   This creates the `users` table and the `notes` table.

6. Start the backend server:

   ```bash
   npm run dev
   ```

## Frontend Setup

1. Go to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file using `frontend/.env.example`:

   ```env
   VITE_API_URL=/api
   VITE_APP_NAME=Markdown Notes
   VITE_ACCESS_TOKEN_COOKIE=notes_access_token
   VITE_PROXY_TARGET=http://localhost:3000
   ```

4. Start the frontend:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:

   ```text
   http://localhost:5173
   ```

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/notes`
- `GET /api/notes/:id`
- `POST /api/notes`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

## Notes

- The frontend uses a Vite proxy in development, so API requests to `/api` go to the Express backend.
- The dev proxy target is `http://localhost:3000` by default because `localhost:5000` is often used by macOS system services like AirTunes.
- The UI stores the selected theme in local storage.
- JWT tokens expire in 1 day.
- Tokens are stored in client cookies using `js-cookie`.
- If your database password contains characters like `@`, `#`, or `:`, encode them inside `DATABASE_URL`.
- For hosted PostgreSQL providers with managed certificates, set `DATABASE_SSL=true`. If the provider uses a chain that Node cannot verify locally, set `DATABASE_SSL_REJECT_UNAUTHORIZED=false`.
- The code is intentionally kept simple and beginner-friendly.
