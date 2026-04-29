import ForecastChart from "../components/ForecastChart";

function RadarPage({ forecastDays, status, error }) {
  return (
    <div className="graph-wrap">
      <div className="graph-hero">
        <div>
          <div className="graph-title">Forecast Graph</div>
          <div className="graph-sub">Visualize the temperature trend for the coming days.</div>
        </div>
        <div className="graph-badge">Trend view</div>
      </div>

      {error ? <div className="alert alert-danger">{error}</div> : null}
      {status === "loading" ? <div>Loading...</div> : null}

      <div className="panel-card graph-card">
        <div className="panel-title">Temperature curve</div>
        <ForecastChart forecastDays={forecastDays} />
        <div className="graph-note">Data source: WeatherAPI forecast window.</div>
      </div>

      <div className="panel-card graph-info">
        <div className="panel-title">About this graph</div>
        <div className="graph-info-text">
          The line shows expected daily highs. Use it to spot warming or cooling trends at a glance.
        </div>
      </div>
    </div>
  );
}

export default RadarPage;
