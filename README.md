# Weather Project (React + Express)

A full-stack weather dashboard with a React frontend and an Express backend powered by WeatherAPI.

## Features

- Search cities with typeahead suggestions
- Today, Hourly, 10-Day, Monthly, Graph, and Air Quality views
- Backend caching + basic rate limiting
- Responsive UI (works on mobile/tablet/desktop)

## Tech Stack

- Frontend: React (Create React App), React Router, Bootstrap (CSS)
- Backend: Node.js, Express, Axios
- Weather data: WeatherAPI (`forecast.json` + `search.json`)

## Getting Started (Local)

### 1) Backend

1. Install dependencies:
   - `cd backend`
   - `npm install`
2. Create your env file:
   - Copy `backend/.env.example` -> `backend/.env`
   - Set `API_KEY` to your WeatherAPI key
3. Run:
   - `npm run dev` (recommended) or `npm start`

Backend runs on `http://localhost:5000` by default.

### 2) Frontend

1. Install dependencies:
   - `cd frontend`
   - `npm install`
2. (Optional) Configure API base URL:
   - Copy `frontend/.env.example` -> `frontend/.env`
3. Run:
   - `npm start`

Frontend runs on `http://localhost:3000` by default.

## Environment Variables

### Backend (`backend/.env`)

- `API_KEY` (required): WeatherAPI key
- `PORT` (optional): defaults to `5000`
- `CORS_ORIGIN` (optional): defaults to `*` (allow all). Example: `http://localhost:3000`
- `CACHE_TTL_MS` (optional): cache duration in ms (default: 10 minutes)
- `RATE_LIMIT_WINDOW_MS` (optional): rate limit window (default: 15 minutes)
- `RATE_LIMIT_MAX` (optional): max requests per window (default: 60)

### Frontend (`frontend/.env`)

- `REACT_APP_API_BASE` (optional): backend base URL (default: `http://localhost:5000`)

## API Endpoints

- `GET /api/health` -> `{ status: "ok" }`
- `GET /api/weather/:city` -> WeatherAPI forecast payload (7 days + AQI)
- `GET /api/weather/search?q=...` -> location suggestions

## Project Structure

- `backend/` Express API server
- `frontend/` React app UI

## Notes

- Don't commit secrets: keep `backend/.env` private (it's ignored by git).
- If PowerShell blocks `npm` scripts, run commands from Command Prompt, or prefix with `cmd /c`.
