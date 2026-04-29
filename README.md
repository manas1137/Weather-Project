# 🌦️ Weather Intelligence Dashboard

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=260&color=0:0d1117,50:1f6feb,100:0d1117&text=Weather%20Forecast%20Dashboard&fontColor=ffffff&fontSize=48&fontAlignY=38&desc=Smart%20Weather%20Insights%20%7C%20Powered%20by%20MERN%20Stack&descAlignY=58&animation=fadeIn"/>
</p>

<p align="center">
  <b>A modern full-stack weather platform delivering real-time forecasts, analytics, and environmental insights.</b>
</p>

<p align="center">
  🌍 Real-time Data • 📊 Visual Insights • ⚡ Fast API • 📱 Responsive UI
</p>

---

## 🚀 Overview

This project is a **full-stack Weather Dashboard** built using the **MERN stack (React + Express)** that provides:

- Real-time weather updates  
- Advanced forecast visualizations  
- Air quality insights  
- Smart caching for performance optimization  

---

## ✨ Features

- 🔍 City Search with Autocomplete  
- 🌤️ Current Weather (Today View)  
- ⏱️ Hourly Forecast  
- 📅 10-Day & Monthly Forecast  
- 📊 Graph-based Weather Visualization  
- 🌫️ Air Quality Index (AQI)  
- ⚡ Backend Caching  
- 🛡️ Rate Limiting  
- 📱 Fully Responsive UI  

---

## 🧠 Tech Stack

### 🎨 Frontend
- React (Create React App)  
- React Router  
- Bootstrap  

### ⚙️ Backend
- Node.js  
- Express.js  
- Axios  

### 🌐 API
- WeatherAPI (`forecast.json`, `search.json`)  

---

## 🏗️ Project Structure

```
weather-project/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── public/
│
└── README.md
```

---

## ⚙️ Getting Started

### 🔹 Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
API_KEY=your_weatherapi_key
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|------------|
| API_KEY | WeatherAPI key |
| PORT | Server port |
| CORS_ORIGIN | Allowed origin |
| CACHE_TTL_MS | Cache duration |
| RATE_LIMIT_WINDOW_MS | Rate limit window |
| RATE_LIMIT_MAX | Max requests |

---

### Frontend (`frontend/.env`)

| Variable | Description |
|----------|------------|
| REACT_APP_API_BASE | Backend base URL |

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/weather/:city` | Weather forecast |
| GET | `/api/weather/search?q=` | City suggestions |

---

## ⚡ Performance

- Smart caching reduces API calls  
- Fast response times  
- Rate limiting for protection  

---

## 📸 Preview

_Add screenshots here_

---

## 🛠️ Future Enhancements

- 🌍 Geolocation weather  
- 🔔 Alerts & notifications  
- 🌙 Dark mode  
- 📊 Advanced analytics  
- 📡 Live radar  

---

## ⚠️ Notes

- Do NOT commit `.env` files  
- Use `.env.example` for sharing  
- If PowerShell blocks npm:
  - Use Command Prompt  
  - OR run: `cmd /c npm start`  

---

## 👨‍💻 Author

**Manas Kadam**  
*MERN Stack Developer | UI/UX Focused Engineer*

---

## ⭐ Support

If you like this project:

- ⭐ Star the repo  
- 🍴 Fork it  
- 🚀 Use in your portfolio  

---

## 🔥 Tagline Ideas

- Next-Level Weather Intelligence  
- Forecasting Meets Intelligence  
- Smart Weather, Smarter Decisions  
- Your Personal Weather Analytics Engine  
