import { formatDate } from "../utils/format";

function TenDayPage({ forecastDays, status, error }) {
  return (
    <div className="tenday-wrap">
      <div className="tenday-hero">
        <div>
          <div className="tenday-title">10-day forecast</div>
          <div className="tenday-sub">Day-by-day outlook with highs, lows, and rain chances.</div>
        </div>
        <div className="tenday-badge">Extended view</div>
      </div>

      {error ? <div className="alert alert-danger">{error}</div> : null}
      {status === "loading" ? <div>Loading...</div> : null}

      <div className="tenday-grid">
        {forecastDays.map((day) => (
          <div className="tenday-card" key={day.date}>
            <div className="tenday-date">{formatDate(day.date)}</div>
            <div className="tenday-temp">
              <span>{Math.round(day.day.maxtemp_c)}C</span>
              <span className="text-muted">{Math.round(day.day.mintemp_c)}C</span>
            </div>
            <div className="tenday-text">{day.day.condition.text}</div>
            <div className="tenday-meta">
              <span>Rain</span>
              <strong>{day.day.daily_chance_of_rain}%</strong>
            </div>
            <div className="tenday-meta">
              <span>Wind</span>
              <strong>{Math.round(day.day.maxwind_kph)} km/h</strong>
            </div>
          </div>
        ))}
      </div>

      {forecastDays.length < 10 ? (
        <div className="chart-empty">Only {forecastDays.length} days available from API.</div>
      ) : null}
    </div>
  );
}

export default TenDayPage;
