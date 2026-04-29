import { formatTime } from "../utils/format";

function HourlyPage({ today, status, error }) {
  const hours = today?.hour || [];
  const upcoming = hours.slice(0, 12);

  return (
    <div className="hourly-wrap">
      <div className="hourly-hero">
        <div>
          <div className="hourly-title">Hourly forecast</div>
          <div className="hourly-sub">Your next 12 hours at a glance.</div>
        </div>
        <div className="hourly-badge">Live hourly</div>
      </div>

      {error ? <div className="alert alert-danger">{error}</div> : null}
      {status === "loading" ? <div>Loading...</div> : null}

      <div className="hourly-grid">
        {upcoming.map((hour) => (
          <div className="hour-card" key={hour.time}>
            <div className="hour-top">
              <div className="hour-time">{formatTime(hour.time)}</div>
              <div className="hour-temp">{Math.round(hour.temp_c)} C</div>
            </div>
            <div className="hour-meta">{hour.condition?.text || "—"}</div>
            <div className="hour-row-mini">
              <span>Rain</span>
              <strong>{hour.chance_of_rain ?? 0}%</strong>
            </div>
            <div className="hour-row-mini">
              <span>Wind</span>
              <strong>{hour.wind_kph != null ? `${Math.round(hour.wind_kph)} km/h` : "--"}</strong>
            </div>
          </div>
        ))}
      </div>

      {!upcoming.length ? <div className="chart-empty">No hourly data available.</div> : null}
    </div>
  );
}

export default HourlyPage;
