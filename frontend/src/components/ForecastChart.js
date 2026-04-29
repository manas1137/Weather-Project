import { useRef, useState } from "react";
import { formatShortDate } from "../utils/format";

function ForecastChart({ forecastDays }) {

  const [hoverIndex, setHoverIndex] = useState(-1);
  const svgRef = useRef(null);

  if (!forecastDays?.length) {
    return <div className="chart-empty">No forecast data.</div>;
  }

  const series = forecastDays.map((day) => ({
    label: day.date,
    max: day.day?.maxtemp_c ?? 0,
    min: day.day?.mintemp_c ?? 0,
  }));

  const min = Math.min(...series.map((item) => item.min), ...series.map((item) => item.max));
  const max = Math.max(...series.map((item) => item.max), ...series.map((item) => item.min));
  const range = max - min || 1;

  const width = 720;
  const height = 240;
  const paddingX = 36;
  const paddingTop = 24;
  const paddingBottom = 38;
  const plotHeight = height - paddingTop - paddingBottom;
  const step = (width - paddingX * 2) / (series.length - 1 || 1);

  const pointsMax = series.map((item, index) => {
    const x = paddingX + index * step;
    const y = paddingTop + plotHeight * (1 - (item.max - min) / range);
    return { x, y, value: item.max, label: item.label };
  });

  const pointsMin = series.map((item, index) => {
    const x = paddingX + index * step;
    const y = paddingTop + plotHeight * (1 - (item.min - min) / range);
    return { x, y, value: item.min, label: item.label };
  });

  const maxPoint = pointsMax.reduce((best, point) => (point.value > best.value ? point : best), pointsMax[0]);
  const minPoint = pointsMin.reduce((best, point) => (point.value < best.value ? point : best), pointsMin[0]);

  const buildSmoothPath = (pts) => {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i += 1) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const lineMax = buildSmoothPath(pointsMax);
  const lineMin = buildSmoothPath(pointsMin);
  const areaPath = `${lineMax} L ${pointsMin[pointsMin.length - 1].x} ${pointsMin[pointsMin.length - 1].y} ${pointsMin
    .slice(0, -1)
    .reverse()
    .map((point) => `L ${point.x} ${point.y}`)
    .join(" ")} Z`;

  const ticks = 4;
  const tickValues = Array.from({ length: ticks }, (_, i) => {
    const value = min + (range / (ticks - 1)) * i;
    const y = paddingTop + plotHeight * (1 - (value - min) / range);
    return { value, y };
  });

  const activeIndex = hoverIndex >= 0 ? hoverIndex : -1;
  const activeMax = activeIndex >= 0 ? pointsMax[activeIndex] : null;
  const activeMin = activeIndex >= 0 ? pointsMin[activeIndex] : null;

  const handleMove = (event) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * width;
    const index = Math.round((x - paddingX) / step);
    const clamped = Math.min(Math.max(index, 0), pointsMax.length - 1);
    setHoverIndex(clamped);
  };

  return (
    <div className="chart-shell">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="chart-svg"
        role="img"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(-1)}
      >
        <defs>
          <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(15,118,110,0.45)" />
            <stop offset="100%" stopColor="rgba(15,118,110,0.02)" />
          </linearGradient>
          <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(15,118,110,1)" />
            <stop offset="100%" stopColor="rgba(197,163,90,1)" />
          </linearGradient>
        </defs>

        {tickValues.map((tick) => (
          <g key={tick.value} className="chart-grid">
            <line x1={paddingX} x2={width - paddingX} y1={tick.y} y2={tick.y} />
            <text className="chart-axis" x={width - paddingX + 8} y={tick.y + 4}>
              {Math.round(tick.value)}C
            </text>
          </g>
        ))}

        <path className="chart-area" d={areaPath} />
        <path className="chart-line chart-line--max" d={lineMax} />
        <path className="chart-line chart-line--min" d={lineMin} />

        {pointsMax.map((point, index) => (
          <g key={point.label}>
            <circle
              className={`chart-dot${
                point.label === maxPoint.label ? " chart-dot--max" : point.label === minPoint.label ? " chart-dot--min" : ""
              }`}
              cx={point.x}
              cy={point.y}
              r={activeIndex === index ? "6" : "4"}
            />
            <text className="chart-label" x={point.x} y={height - 10} textAnchor="middle">
              {formatShortDate(point.label)}
            </text>
          </g>
        ))}

        {activeMax && activeMin ? (
          <g className="chart-hover">
            <line
              className="chart-crosshair"
              x1={activeMax.x}
              x2={activeMax.x}
              y1={paddingTop}
              y2={height - paddingBottom}
            />
            <rect className="chart-tooltip" x={activeMax.x - 50} y={activeMax.y - 48} width="100" height="40" />
            <text className="chart-tooltip-title" x={activeMax.x} y={activeMax.y - 28} textAnchor="middle">
              {formatShortDate(activeMax.label)}
            </text>
            <text className="chart-tooltip-value" x={activeMax.x} y={activeMax.y - 14} textAnchor="middle">
              High {Math.round(activeMax.value)}C | Low {Math.round(activeMin.value)}C
            </text>
          </g>
        ) : null}

        <text className="chart-peak" x={maxPoint.x} y={maxPoint.y - 12} textAnchor="middle">
          {Math.round(maxPoint.value)}C
        </text>
        <text className="chart-valley" x={minPoint.x} y={minPoint.y + 18} textAnchor="middle">
          {Math.round(minPoint.value)}C
        </text>
      </svg>
    </div>
  );
}

export default ForecastChart;