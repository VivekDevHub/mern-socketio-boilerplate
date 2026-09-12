# Socket Chat

A small React and Express authentication app with a minimal chat UI. The `/socket` page is currently a UI-only workspace and does not connect to Socket.IO yet.

## Requirements

- Node.js 18 or newer
- npm
- MongoDB running locally or a MongoDB Atlas connection string

## Project Structure

```text
socket-chat/
  client/   React + Vite frontend
  server/   Express + MongoDB backend
```

## Setup

Open a terminal in the project directory:

```powershell
cd socket-chat
```

### 1. Configure the server

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/socket-chat
JWT_SECRET=replace-this-with-a-long-random-secret
```

For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

Install server dependencies:

```powershell
cd server
npm install
```

### 2. Configure the client

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Install client dependencies:

```powershell
cd ..\client
npm install
```

## Run the Application

Use two terminals.

### Terminal 1: server

```powershell
cd socket-chat\server
npm run dev
```

The API runs at `http://localhost:5000`.

For a normal Node process instead of nodemon:

```powershell
npm start
```

### Terminal 2: client

```powershell
cd socket-chat\client
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

Only start one server process on port `5000`. If you see `EADDRINUSE`, stop the existing server with `Ctrl+C` before starting another one.

## Available Routes

### Frontend routes

- `/login` - sign in
- `/register` - create an account
- `/chat` - protected chat placeholder
- `/socket` - protected socket UI mock

### API routes

- `POST /api/auth/register` - create a user
- `POST /api/auth/login` - log in and receive a JWT
- `GET /api/auth/me` - return the authenticated user

The client stores the JWT in `localStorage` under `token` and sends it as a Bearer token on API requests.

## Build the Client

```powershell
cd socket-chat\client
npm run build
```

To preview the production build:

```powershell
npm run preview
```

## Socket UI Status

The `/socket` page is presentational only. Its rooms, messages, connection indicator, and composer are static UI elements. Add a socket client and event handlers when the real-time backend is ready.

## Environment Safety

Do not commit `.env` files or real credentials. Keep secrets local and use different values for development and production.
