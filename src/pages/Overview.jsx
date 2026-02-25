import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  SectionTitle,
  ChartTooltip,
  TransactionsModal,
} from "../components/ui";
import { TaperedGauge, TinyDonut, BlockRadarChart } from "../components/charts";
import { BLUE, GREEN, AMBER, SLATE } from "../constants/colors";
import { histogramData } from "../data/charts";
import { channelCards } from "../data/tables";

const SERIES = [
  { key: "visits", color: GREEN },
  { key: "clicks", color: AMBER },
  { key: "subs", color: BLUE },
];

// Reusable click-to-open helper styles
const clickable = {
  cursor: "pointer",
  transition: "box-shadow .15s, transform .15s",
};
const hoverOn = (e) => {
  e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,.12)";
  e.currentTarget.style.transform = "translateY(-2px)";
};
const hoverOff = (e) => {
  e.currentTarget.style.boxShadow = "";
  e.currentTarget.style.transform = "";
};

export default function PageOverview() {
  const [active, setActive] = useState({
    visits: true,
    clicks: true,
    subs: true,
  });
  const toggle = (k) => setActive((prev) => ({ ...prev, [k]: !prev[k] }));
  const [modal, setModal] = useState(null); // stores the title string when open

  const open = (title) => setModal(title);
  const close = () => setModal(null);

  return (
    <div>
      {/* ── Row 1: KPI cards + gauge + line chart ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 150px 1fr 1.55fr",
          gap: 14,
          marginBottom: 16,
        }}
      >
        {/* KPI summary — each stat clickable */}
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {/* Total Visits */}
          <div
            onClick={() => open("Total Visits — Transactions")}
            style={{
              ...clickable,
              padding: "18px 18px 14px",
              borderBottom: "1px solid #f1f5f9",
            }}
            onMouseEnter={hoverOn}
            onMouseLeave={hoverOff}
          >
            <div
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: "#1a1a2e",
                letterSpacing: -1,
                fontFamily: "Georgia,serif",
                lineHeight: 1,
              }}
            >
              1.5m
            </div>
            <div
              style={{
                fontSize: 11,
                color: SLATE,
                fontWeight: 600,
                marginTop: 4,
              }}
            >
              Total Visits
            </div>
            <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}>
              View Transactions ↗
            </div>
          </div>
          {/* Sub-stats */}
          <div
            style={{
              padding: "12px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[
              ["500k", "Total Clicks"],
              ["170", "Unique Apps"],
            ].map(([v, l]) => (
              <div
                key={l}
                onClick={() => open(`${l} — Transactions`)}
                style={{
                  ...clickable,
                  padding: "8px 10px",
                  borderRadius: 8,
                  background: "#f8fafc",
                }}
                onMouseEnter={hoverOn}
                onMouseLeave={hoverOff}
              >
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    fontFamily: "Georgia,serif",
                  }}
                >
                  {v}
                </div>
                <div style={{ fontSize: 11, color: SLATE }}>{l}</div>
                <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}>
                  View Transactions ↗
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Clicked Clean */}
        <div
          onClick={() => open("Clicked Clean — Transactions")}
          style={{
            background: "linear-gradient(145deg,#22c55e,#16a34a)",
            borderRadius: 14,
            padding: "20px 16px",
            boxShadow: "0 6px 24px rgba(34,197,94,.28)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            ...clickable,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.boxShadow = "0 10px 32px rgba(34,197,94,.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(34,197,94,.28)";
          }}
        >
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: -2,
              fontFamily: "Georgia,serif",
              lineHeight: 1,
            }}
          >
            50k
          </div>
          <div
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,.85)",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            Clicked Clean
          </div>
          <div
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,.65)",
              marginTop: 2,
            }}
          >
            View Transactions ↗
          </div>
        </div>

        {/* Gauge — each legend item clickable */}
        <Card style={{ padding: "18px 14px 12px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 800, color: "#1a1a2e" }}>
              Page Clicks
            </span>
            <span
              style={{
                fontSize: 12,
                color: SLATE,
                fontFamily: "monospace",
                letterSpacing: 1,
              }}
            >
              5,00,437
            </span>
          </div>
          <TaperedGauge />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginTop: 2,
            }}
          >
            {[
              ["#43a84a", "Clean"],
              ["#ffc107", "Low Risk"],
              ["#f44336", "High Risk"],
            ].map(([c, l]) => (
              <div
                key={l}
                onClick={() => open(`${l} — Transactions`)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 11,
                  color: "#475569",
                  fontWeight: 600,
                  ...clickable,
                  padding: "4px 8px",
                  borderRadius: 8,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f1f5f9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 3,
                    background: c,
                  }}
                />
                {l}
                <span style={{ fontSize: 9, color: "#94a3b8" }}>↗</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Line chart — each series toggle still works; chart area itself clickable */}
        <Card style={{ padding: "18px 18px 12px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 800, color: "#1a1a2e" }}>
              Visits, Clicks &amp; Subscriptions
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              {SERIES.map(({ key, color }) => (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "4px 9px",
                    borderRadius: 20,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 10,
                    fontWeight: 700,
                    background: active[key] ? `${color}18` : "#f1f5f9",
                    color: active[key] ? color : SLATE,
                    outline: active[key] ? `1.5px solid ${color}` : "none",
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: active[key] ? color : "#cbd5e1",
                      display: "inline-block",
                    }}
                  />
                  {key[0].toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div
            onClick={() =>
              open("Visits, Clicks & Subscriptions — Transactions")
            }
            style={{ ...clickable }}
          >
            <ResponsiveContainer width="100%" height={188}>
              <LineChart
                data={histogramData}
                margin={{ top: 5, right: 5, bottom: 0, left: -30 }}
              >
                <XAxis
                  dataKey="x"
                  tick={{ fontSize: 9, fill: "#cbd5e1" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: "#cbd5e1" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<ChartTooltip />} />
                {active.visits && (
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke={GREEN}
                    strokeWidth={2.5}
                    dot={false}
                    name="Visits"
                  />
                )}
                {active.clicks && (
                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke={AMBER}
                    strokeWidth={1.5}
                    dot={false}
                    name="Clicks"
                  />
                )}
                {active.subs && (
                  <Line
                    type="monotone"
                    dataKey="subs"
                    stroke={BLUE}
                    strokeWidth={1.5}
                    dot={false}
                    name="Subs"
                    strokeDasharray="4 2"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
            <div
              style={{
                textAlign: "center",
                fontSize: 9,
                color: "#94a3b8",
                marginTop: 4,
              }}
            >
              Click chart to view transactions ↗
            </div>
          </div>
        </Card>
      </div>

      {/* ── Row 2: Block Reasons radar + channel donuts ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 350px",
          gap: 14,
          alignItems: "stretch",
        }}
      >
        {/* Radar — side stats clickable, radar itself clickable */}
        <Card>
          <SectionTitle>Block Reasons — Past Week</SectionTitle>
          <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
            {/* Side stats — each clickable */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                minWidth: 140,
              }}
            >
              <div
                onClick={() => open("Overall Blocks — Transactions")}
                style={{
                  background: BLUE,
                  borderRadius: 10,
                  padding: "14px 16px",
                  color: "#fff",
                  ...clickable,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = ".88";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    marginBottom: 3,
                    opacity: 0.85,
                  }}
                >
                  Overall
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 900,
                    fontFamily: "Georgia,serif",
                  }}
                >
                  1,511,786
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,.6)",
                    marginTop: 4,
                  }}
                >
                  View Transactions ↗
                </div>
              </div>
              {[
                ["Apps", "2,26,767", "#22c55e"],
                ["Browsing", "2,26,767", "#f59e0b"],
                ["In-App", "1,89,034", "#1d4ed8"],
              ].map(([l, v, c]) => (
                <div
                  key={l}
                  onClick={() => open(`${l} — Transactions`)}
                  style={{
                    padding: "10px 14px",
                    borderLeft: `3px solid ${c}`,
                    background: "#f8fafc",
                    borderRadius: "0 8px 8px 0",
                    ...clickable,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#eff6ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f8fafc";
                  }}
                >
                  <div style={{ fontSize: 11, color: SLATE, fontWeight: 600 }}>
                    {l}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 900,
                      color: "#1a1a2e",
                      fontFamily: "Georgia,serif",
                    }}
                  >
                    {v}
                  </div>
                  <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}>
                    View Transactions ↗
                  </div>
                </div>
              ))}
            </div>
            {/* Radar — onChartClick passed so only the graph triggers the modal */}
            <div style={{ flex: 1 }}>
              <BlockRadarChart
                height={300}
                showBadge={false}
                onChartClick={() => open("Weekly Block Pattern — Transactions")}
                onDayClick={(day) =>
                  open(`${day} Block Pattern — Transactions`)
                }
              />
            </div>
          </div>
        </Card>

        {/* Channel cards — title + each metric individually clickable */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 12,
          }}
        >
          {channelCards.map((c, i) => (
            <Card
              key={i}
              style={{
                padding: 16,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Title — opens full transactions */}
              <div
                onClick={() => open(`${c.name} — Transactions`)}
                style={{
                  ...clickable,
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#1a1a2e",
                  paddingBottom: 8,
                  marginBottom: 10,
                  borderBottom: `2.5px solid ${c.color}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                {c.name}
                <span
                  style={{ fontSize: 9, color: "#94a3b8", fontWeight: 400 }}
                >
                  ↗
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <div>
                  {/* Clicks */}
                  <div
                    onClick={() => open(`${c.name} Clicks — Transactions`)}
                    style={{
                      ...clickable,
                      padding: "5px 7px",
                      borderRadius: 7,
                      marginBottom: 4,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f1f5f9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div
                      style={{ fontSize: 10, color: SLATE, marginBottom: 1 }}
                    >
                      Clicks
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 900,
                        color: "#f97316",
                        fontFamily: "Georgia,serif",
                      }}
                    >
                      {c.clicks.toLocaleString()}
                    </div>
                    <div
                      style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}
                    >
                      View Transactions ↗
                    </div>
                  </div>
                  {/* Visits */}
                  <div
                    onClick={() => open(`${c.name} Visits — Transactions`)}
                    style={{
                      ...clickable,
                      padding: "5px 7px",
                      borderRadius: 7,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f1f5f9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div
                      style={{ fontSize: 10, color: SLATE, marginBottom: 1 }}
                    >
                      Visits
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 900,
                        color: "#0d9488",
                        fontFamily: "Georgia,serif",
                      }}
                    >
                      {c.visits.toLocaleString()}
                    </div>
                    <div
                      style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}
                    >
                      View Transactions ↗
                    </div>
                  </div>
                </div>
                <TinyDonut pct={c.pct} color={c.color} />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Transactions modal */}
      {modal && <TransactionsModal title={modal} onClose={close} />}
    </div>
  );
}
