import { average, formatShortDate } from "../utils/format";

function MonthlyPage({ forecastDays, status, error }) {
  const avgMax = average(forecastDays.map((day) => day.day?.maxtemp_c));
  const avgMin = average(forecastDays.map((day) => day.day?.mintemp_c));
  const warmest = forecastDays.reduce((best, day) => {
    if (!day?.day?.maxtemp_c) return best;
    if (!best || day.day.maxtemp_c > best.day.maxtemp_c) return day;
    return best;
  }, null);
  const coolest = forecastDays.reduce((best, day) => {
    if (!day?.day?.mintemp_c) return best;
    if (!best || day.day.mintemp_c < best.day.mintemp_c) return day;
    return best;
  }, null);

  return (
    <div className="monthly-wrap">
      <div className="monthly-hero">
        <div>
          <div className="monthly-title">Monthly outlook</div>
          <div className="monthly-sub">A quick climate snapshot based on the available forecast window.</div>
        </div>
        <div className="monthly-badge">Premium climate view</div>
      </div>

      {error ? <div className="alert alert-danger">{error}</div> : null}
      {status === "loading" ? <div>Loading...</div> : null}

      <div className="monthly-grid">
        <div className="stat-card monthly-stat">
          <div className="stat-label">Average High</div>
          <div className="stat-value">{avgMax != null ? `${Math.round(avgMax)} C` : "--"}</div>
          <div className="stat-sub">Typical daytime warmth</div>
        </div>
        <div className="stat-card monthly-stat">
          <div className="stat-label">Average Low</div>
          <div className="stat-value">{avgMin != null ? `${Math.round(avgMin)} C` : "--"}</div>
          <div className="stat-sub">Typical overnight chill</div>
        </div>
        <div className="stat-card monthly-stat">
          <div className="stat-label">Warmest Day</div>
          <div className="stat-value">
            {warmest?.day?.maxtemp_c != null ? `${Math.round(warmest.day.maxtemp_c)} C` : "--"}
          </div>
          <div className="stat-sub">{warmest ? formatShortDate(warmest.date) : "--"}</div>
        </div>
        <div className="stat-card monthly-stat">
          <div className="stat-label">Coolest Night</div>
          <div className="stat-value">
            {coolest?.day?.mintemp_c != null ? `${Math.round(coolest.day.mintemp_c)} C` : "--"}
          </div>
          <div className="stat-sub">{coolest ? formatShortDate(coolest.date) : "--"}</div>
        </div>
      </div>

      <div className="panel-card monthly-chart">
        <div className="panel-title">Daily temperature range</div>
        <div className="monthly-bars">
          {forecastDays.map((day) => {
            const min = day?.day?.mintemp_c ?? 0;
            const max = day?.day?.maxtemp_c ?? 0;
            const range = Math.max(max - min, 1);
            const height = Math.min(120, 40 + range * 6);
            return (
              <div className="monthly-bar" key={day.date}>
                <div className="bar-stack" style={{ height: `${height}px` }}>
                  <span className="bar-max">{Math.round(max)} C</span>
                </div>
                <div className="bar-label">{formatShortDate(day.date)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MonthlyPage;
