import { formatTime } from "../utils/format";

function TodayPage({
  location,
  current,
  today,
  status,
  error,
  quickCities,
  setQuery,
  setCity,
}) {
  return (
    <>
      <div className="hero-card">
        <div className="hero-grid">
          <div className="hero-main">
            <div className="hero-header">
              <div>
                <div className="hero-location">
                  {location ? `${location.name}, ${location.region || location.country}` : "Loading location..."}
                </div>
                <div className="hero-time">
                  As of {current?.last_updated ? formatTime(current.last_updated) : "--"}
                </div>
              </div>
              <div className="hero-meta">{location?.country || "--"}</div>
            </div>

            <div className="hero-body">
              <div className="hero-temp">{current?.temp_c != null ? `${Math.round(current.temp_c)} C` : "--"}</div>
              <div className="hero-condition">{current?.condition?.text || "Fetching conditions..."}</div>
              <div className="hero-range">
                Day {today?.day?.maxtemp_c != null ? Math.round(today.day.maxtemp_c) : "--"} C | Night{" "}
                {today?.day?.mintemp_c != null ? Math.round(today.day.mintemp_c) : "--"} C
              </div>
              <div className="hero-tags">
                <span>Feels like {current?.feelslike_c != null ? `${Math.round(current.feelslike_c)} C` : "--"}</span>
                <span>Humidity {current?.humidity != null ? `${current.humidity}%` : "--"}</span>
                <span>Wind {current?.wind_kph != null ? `${Math.round(current.wind_kph)} km/h` : "--"}</span>
              </div>
            </div>
          </div>

          <div className="hero-aside">
            <div className="hero-icon-card">
              {current?.condition?.icon ? (
                <img
                  src={`https:${current.condition.icon}`}
                  alt={current.condition.text}
                  className="hero-icon"
                />
              ) : null}
              <div className="hero-icon-text">Live conditions</div>
            </div>
            <div className="hero-mini-grid">
              <div>
                <div className="mini-label">UV Index</div>
                <div className="mini-value">{current?.uv ?? "--"}</div>
              </div>
              <div>
                <div className="mini-label">Visibility</div>
                <div className="mini-value">{current?.vis_km != null ? `${current.vis_km} km` : "--"}</div>
              </div>
              <div>
                <div className="mini-label">Pressure</div>
                <div className="mini-value">{current?.pressure_mb != null ? `${current.pressure_mb} mb` : "--"}</div>
              </div>
              <div>
                <div className="mini-label">Cloud</div>
                <div className="mini-value">{current?.cloud != null ? `${current.cloud}%` : "--"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chip-row">
        {quickCities.map((item) => (
          <button
            key={item}
            className="chip"
            type="button"
            onClick={() => {
              setQuery(item);
              setCity(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {error ? (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      ) : null}

      <div className="card-grid">
        {[
          { label: "Feels Like", value: current?.feelslike_c != null ? `${Math.round(current.feelslike_c)} C` : "--" },
          { label: "Humidity", value: current?.humidity != null ? `${current.humidity}%` : "--" },
          { label: "Wind", value: current?.wind_kph != null ? `${Math.round(current.wind_kph)} km/h` : "--" },
          { label: "Pressure", value: current?.pressure_mb != null ? `${current.pressure_mb} mb` : "--" },
          { label: "Visibility", value: current?.vis_km != null ? `${current.vis_km} km` : "--" },
          { label: "UV Index", value: current?.uv ?? "--" },
        ].map((item) => (
          <div className="stat-card" key={item.label}>
            <div className="stat-label">{item.label}</div>
            <div className="stat-value">{item.value}</div>
          </div>
        ))}
      </div>

      {status === "loading" ? <div className="panel-card">Loading data...</div> : null}
    </>
  );
}

export default TodayPage;
