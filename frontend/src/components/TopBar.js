function TopBar({
  query,
  setQuery,
  onSubmit,
  status,
  error,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  onSelectSuggestion,
}) {
  return (
    <nav className="topbar">
      <div className="brand">
        <span className="brand-mark">SkyFall</span>
        <span className="brand-sub">Accurate Forecasts. Beautifully Visualized.</span>
      </div>
      <form className="searchbar" onSubmit={onSubmit}>
        <div className="search-shell">
          <span className="search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img" aria-label="Search">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
          </span>
          <input
            className="form-control search-input"
            placeholder="Search city"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 120);
            }}
          />
          <button className="search-btn" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Loading" : "Search"}
          </button>
        </div>
        {showSuggestions && suggestions.length > 0 ? (
          <div className="suggestion-box">
            {suggestions.slice(0, 6).map((item) => (
              <button
                key={`${item.id}-${item.name}`}
                type="button"
                className="suggestion-item"
                onMouseDown={(event) => {
                  event.preventDefault();
                  onSelectSuggestion(item);
                }}
              >
                <span>{item.name}</span>
                <span className="suggestion-meta">
                  {item.region ? `${item.region}, ` : ""}
                  {item.country}
                </span>
              </button>
            ))}
          </div>
        ) : null}
        {error ? <div className="search-error">{error}</div> : null}
      </form>
      <div className="topbar-pill">Live forecast</div>
    </nav>
  );
}

export default TopBar;
