function SidePanel({ aqi, aqiPercent, todayAstro, today }) {
  return (
    <aside className="sidepanel">
      <div className="panel-card panel-highlight">
        <div className="panel-title">Air Quality Index</div>
        <div className="aqi-wrap">
          <div className="aqi-circle" style={{ "--aqi": `${aqiPercent}%` }}>
            <div className="aqi-value">{aqi ?? "--"}</div>
            <div className="aqi-sub">/ 6</div>
          </div>
          <div>
            <div className="aqi-label">US EPA Index</div>
            <div className="aqi-desc">Satisfactory air quality.</div>
          </div>
        </div>
      </div>

      <div className="panel-card">
        <div className="panel-title">Sunrise / Sunset</div>
        <div className="sun-row">
          <div>
            <div className="sun-label">Sunrise</div>
            <div className="sun-value">{todayAstro?.sunrise || "--"}</div>
          </div>
          <div>
            <div className="sun-label">Sunset</div>
            <div className="sun-value">{todayAstro?.sunset || "--"}</div>
          </div>
        </div>
      </div>

      <div className="panel-card">
        <div className="panel-title">Rain Probability</div>
        <div className="rain-value">
          {today?.day?.daily_chance_of_rain != null ? `${today.day.daily_chance_of_rain}% today` : "--"}
        </div>
        <div className="rain-sub">Based on forecast for current location.</div>
      </div>
    </aside>
  );
}

export default SidePanel;
