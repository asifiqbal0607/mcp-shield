import { useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import { SLATE } from "../../constants/colors";
import { blockReasons, blockLegend } from "../../data/charts";

// ─── Dark tooltip ─────────────────────────────────────────────────────────────
function RadarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#1a1a2e",
        borderRadius: 10,
        padding: "10px 14px",
        boxShadow: "0 8px 24px rgba(0,0,0,.25)",
        minWidth: 190,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: "#fff",
          marginBottom: 8,
          borderBottom: "1px solid rgba(255,255,255,.1)",
          paddingBottom: 6,
        }}
      >
        {label}
      </div>
      {payload.map((p, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 3,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: p.color,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,.65)" }}>
              {p.name}
            </span>
          </div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "monospace",
            }}
          >
            {Number(p.value).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Pill day label — clickable if onDayClick provided ───────────────────────
function DayTick({ x, y, payload, onDayClick }) {
  return (
    <g
      transform={`translate(${x},${y})`}
      onClick={
        onDayClick
          ? (e) => {
              e.stopPropagation();
              onDayClick(payload.value);
            }
          : undefined
      }
      style={{ cursor: onDayClick ? "pointer" : "default" }}
    >
      <rect
        x={-22}
        y={-11}
        width={44}
        height={22}
        rx={11}
        fill="#eff6ff"
        stroke="none"
        strokeWidth={0}
      />
      <text
        x={0}
        y={0}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#1d4ed8"
        fontSize={11}
        fontWeight={700}
      >
        {payload.value}
      </text>
    </g>
  );
}

/**
 * BlockRadarChart
 * @param {number}   height       Chart height in px (default 300)
 * @param {boolean}  showBadge    Show "7-day view" badge (default true)
 * @param {number}   seriesLimit  How many series to show (default 5)
 * @param {function} onChartClick Called only when the radar graph area is clicked
 */
export default function BlockRadarChart({
  height = 300,
  showBadge = true,
  seriesLimit = 5,
  onChartClick,
  onDayClick,
}) {
  const [hidden, setHidden] = useState({});
  const [hovered, setHovered] = useState(null);

  const toggle = (key) => setHidden((h) => ({ ...h, [key]: !h[key] }));
  const series = blockLegend.slice(0, seriesLimit);

  // Sum each series across all days for the hover tooltip
  const totals = series.reduce((acc, b) => {
    acc[b.key] = blockReasons.reduce((sum, day) => sum + (day[b.key] || 0), 0);
    return acc;
  }, {});

  return (
    <div
      style={{
        background: "linear-gradient(145deg,#fafcff,#f0f4ff)",
        borderRadius: 12,
        padding: "16px 16px 12px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#1a1a2e" }}>
            Weekly Block Pattern
          </div>
          <div style={{ fontSize: 11, color: SLATE, marginTop: 2 }}>
            Threat distribution by day of week
          </div>
        </div>
        {showBadge && (
          <div
            style={{
              background: "#1d4ed8",
              color: "#fff",
              borderRadius: 10,
              padding: "5px 12px",
              fontSize: 11,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            7-day view
          </div>
        )}
      </div>

      {/* ── Radar — no wrapper click, button below triggers modal ── */}
      <div style={{ borderRadius: 8, overflow: "hidden" }}>
        <ResponsiveContainer width="100%" height={height}>
          <RadarChart
            data={blockReasons}
            margin={{ top: 16, right: 50, bottom: 16, left: 50 }}
          >
            <PolarGrid
              gridType="polygon"
              stroke="#dde5f5"
              strokeWidth={1}
              strokeDasharray="4 3"
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={<DayTick onDayClick={onDayClick} />}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 5500]}
              tick={{ fontSize: 9, fill: "#94a3b8" }}
              axisLine={false}
              tickCount={4}
            />
            <Tooltip content={<RadarTooltip />} />
            {series.map(
              (b) =>
                !hidden[b.key] && (
                  <Radar
                    key={b.key}
                    name={b.key}
                    dataKey={b.key}
                    stroke={b.color}
                    strokeWidth={2}
                    fill={b.color}
                    fillOpacity={0.18}
                    dot={{ fill: b.color, r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
                  />
                ),
            )}
          </RadarChart>
        </ResponsiveContainer>
      </div>
      {onChartClick && (
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button
            onClick={onChartClick}
            style={{
              background: "none",
              border: "1px solid #e2e8f0",
              borderRadius: 20,
              padding: "4px 16px",
              fontSize: 11,
              fontWeight: 600,
              color: "#1d4ed8",
              cursor: "pointer",
              transition: "all .15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#eff6ff";
              e.currentTarget.style.borderColor = "#1d4ed8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            View Transactions ↗
          </button>
        </div>
      )}

      {/* ── Legend — NOT inside the click zone ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
          marginTop: 4,
          paddingTop: 12,
          borderTop: "1px solid #e8ecf3",
        }}
      >
        {series.map((b) => (
          <div key={b.key} style={{ position: "relative" }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggle(b.key);
              }}
              onMouseEnter={() => setHovered(b.key)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: 20,
                border: "none",
                cursor: "pointer",
                background: hidden[b.key] ? "#f1f5f9" : `${b.color}18`,
                opacity: hidden[b.key] ? 0.45 : 1,
                transition: "all .15s",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: hidden[b.key] ? "#cbd5e1" : b.color,
                  boxShadow: hidden[b.key] ? "none" : `0 0 4px ${b.color}88`,
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: hidden[b.key] ? SLATE : "#334155",
                }}
              >
                {b.key}
              </span>
            </button>

            {/* Hover count tooltip */}
            {hovered === b.key && (
              <div
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 6px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#1a1a2e",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontSize: 11,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 12px rgba(0,0,0,.2)",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,.55)",
                    marginBottom: 2,
                  }}
                >
                  7-day total
                </div>
                <div style={{ color: b.color }}>
                  {totals[b.key]?.toLocaleString() ?? "--"}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: "5px solid #1a1a2e",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
