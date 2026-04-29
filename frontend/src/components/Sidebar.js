import { NavLink } from "react-router-dom";

function Sidebar({ menuItems }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Forecast Hub</div>
      <div className="sidebar-section">Explore</div>
      <div className="sidebar-list">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
            end={item.path === "/"}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="sidebar-foot">Data powered by WeatherAPI</div>
    </aside>
  );
}

export default Sidebar;
