import { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SidePanel from "./components/SidePanel";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import AirQualityPage from "./pages/AirQualityPage";
import HourlyPage from "./pages/HourlyPage";
import MonthlyPage from "./pages/MonthlyPage";
import RadarPage from "./pages/RadarPage";
import TenDayPage from "./pages/TenDayPage";
import TodayPage from "./pages/TodayPage";

const DEFAULT_CITY = "Pune";
const QUICK_CITIES = ["Pune", "Mumbai", "Delhi", "Bengaluru", "London", "New York"];
const MENU_ITEMS = [
  { label: "Today", path: "/" },
  { label: "Hourly", path: "/hourly" },
  { label: "10 Day", path: "/10-day" },
  { label: "Monthly", path: "/monthly" },
  { label: "Graph", path: "/radar" },
  { label: "Air Quality Index", path: "/air-quality" },
];

function App() {
  const [query, setQuery] = useState(DEFAULT_CITY);
  const [city, setCity] = useState(DEFAULT_CITY);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const apiBase = useMemo(() => {
    return process.env.REACT_APP_API_BASE || "http://localhost:5000";
  }, []);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadWeather = async () => {
      setStatus("loading");
      setError("");
      setData(null);
      try {
        const response = await fetch(
          `${apiBase}/api/weather/${encodeURIComponent(city)}`,
          { signal: controller.signal }
        );
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.error?.message || payload?.message || "Failed to load weather.");
        }
        if (isActive) {
          setData(payload);
          setStatus("success");
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        if (isActive) {
          setStatus("error");
          setError(err.message);
          setData(null);
        }
      }
    };

    loadWeather();
    return () => {
      isActive = false;
      controller.abort();
    };
  }, [apiBase, city]);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `${apiBase}/api/weather/search?q=${encodeURIComponent(query.trim())}`,
          { signal: controller.signal }
        );
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.message || "Failed to load suggestions.");
        }
        setSuggestions(Array.isArray(payload) ? payload : []);
      } catch (err) {
        if (err.name === "AbortError") return;
        setSuggestions([]);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [apiBase, query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setCity(trimmed);
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (item) => {
    const label = `${item.name}, ${item.region ? `${item.region}, ` : ""}${item.country}`;
    setQuery(label);
    setCity(label);
    setShowSuggestions(false);
  };

  const location = data?.location;
  const current = data?.current;
  const forecastDays = data?.forecast?.forecastday || [];
  const today = forecastDays[0];
  const todayAstro = today?.astro;
  const aqi = current?.air_quality?.["us-epa-index"];
  const aqiPercent = aqi ? Math.min((aqi / 6) * 100, 100) : 0;

  return (
    <Router>
      <div className="app">
        <TopBar
          query={query}
          setQuery={setQuery}
          onSubmit={handleSubmit}
          status={status}
          error={error}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          onSelectSuggestion={handleSelectSuggestion}
        />

        <div className="layout container-fluid">
          <Sidebar menuItems={MENU_ITEMS} />

          <main className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <TodayPage
                    location={location}
                    current={current}
                    today={today}
                    status={status}
                    error={error}
                    quickCities={QUICK_CITIES}
                    setQuery={setQuery}
                    setCity={setCity}
                  />
                }
              />
              <Route path="/hourly" element={<HourlyPage today={today} status={status} error={error} />} />
              <Route
                path="/10-day"
                element={<TenDayPage forecastDays={forecastDays} status={status} error={error} />}
              />
              <Route
                path="/monthly"
                element={<MonthlyPage forecastDays={forecastDays} status={status} error={error} />}
              />
              <Route
                path="/radar"
                element={<RadarPage forecastDays={forecastDays} status={status} error={error} />}
              />
              <Route
                path="/air-quality"
                element={<AirQualityPage current={current} status={status} error={error} />}
              />
            </Routes>
          </main>

          <SidePanel aqi={aqi} aqiPercent={aqiPercent} todayAstro={todayAstro} today={today} />
        </div>
      </div>
    </Router>
  );
}

export default App;
