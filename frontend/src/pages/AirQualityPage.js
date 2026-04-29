function AirQualityPage({ current, status, error }) {
  const air = current?.air_quality;

  return (
    <div className="aqi-page">
      <div className="aqi-hero">
        <div>
          <div className="aqi-title">Air Quality Index</div>
          <div className="aqi-sub">Know what you are breathing before stepping outside.</div>
        </div>
        <div className="aqi-badge">Health snapshot</div>
      </div>

      {error ? <div className="alert alert-danger">{error}</div> : null}
      {status === "loading" ? <div>Loading...</div> : null}

      <div className="aqi-grid">
        {[
          { label: "US EPA", value: air?.["us-epa-index"], note: "Scale 1-6" },
          { label: "GB Defra", value: air?.["gb-defra-index"], note: "Scale 1-10" },
          { label: "PM2.5", value: air?.pm2_5 ? `${air.pm2_5.toFixed(1)} ug/m3` : null, note: "Fine particles" },
          { label: "PM10", value: air?.pm10 ? `${air.pm10.toFixed(1)} ug/m3` : null, note: "Coarse particles" },
          { label: "CO", value: air?.co ? `${air.co.toFixed(1)} ug/m3` : null, note: "Carbon Monoxide" },
          { label: "NO2", value: air?.no2 ? `${air.no2.toFixed(1)} ug/m3` : null, note: "Nitrogen Dioxide" },
        ].map((item) => (
          <div className="stat-card aqi-card" key={item.label}>
            <div className="stat-label">{item.label}</div>
            <div className="stat-value">{item.value ?? "--"}</div>
            <div className="stat-sub">{item.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AirQualityPage;
