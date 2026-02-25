import { useState, useRef, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Card, SectionTitle, Badge } from "../components/ui";
import { BLUE, GREEN, AMBER, ROSE, SLATE } from "../constants/colors";
import { repTrend } from "../data/charts";
import { userRows } from "../data/tables";

const USER_TYPES = [
  "All",
  "Admins",
  "C-Admins",
  "Supper Clients",
  "Clients",
  "Client Partner",
  "Sub Account",
  "Publisher",
  "Mirrored",
  "Operations",
];

const TYPE_COLORS = {
  Admins: "#1d4ed8",
  "C-Admins": "#7c3aed",
  "Supper Clients": "#0891b2",
  Clients: "#16a34a",
  "Client Partner": "#d97706",
  "Sub Account": "#dc2626",
  Publisher: "#db2777",
  Mirrored: "#6366f1",
  Operations: "#0f766e",
};

const TYPE_COUNTS = [
  { label: "Admins", count: 12, color: "#1d4ed8" },
  { label: "C-Admins", count: 8, color: "#7c3aed" },
  { label: "Supper Clients", count: 15, color: "#0891b2" },
  { label: "Clients", count: 34, color: "#16a34a" },
  { label: "Client Partner", count: 9, color: "#d97706" },
  { label: "Sub Account", count: 21, color: "#dc2626" },
  { label: "Publisher", count: 7, color: "#db2777" },
  { label: "Mirrored", count: 5, color: "#6366f1" },
  { label: "Operations", count: 11, color: "#0f766e" },
];

const TOTAL_USERS = TYPE_COUNTS.reduce((s, t) => s + t.count, 0);

const STATUS_COLOR = (s) =>
  s === "active" ? GREEN : s === "warning" ? AMBER : ROSE;

// ─── Partner: sub-accounts, each with their own assigned services ─────────────
const PARTNER_SUB_ACCOUNTS = [
  {
    id: "TDG4240",
    name: "TDG4240",
    type: "SP Account For Details",
    lastLogin: "- -",
    lastAccessed: "- -",
    status: true,
    services: [
      "Noble Horo - 4240002 - True",
      "Horo Mine - 4240003 - True",
      "Horo Majestic - 4240004 - True",
      "Majestic 2 Horo - 4240005 - True",
      "Horo Symbolic - 4240006 - True",
      "Horo Habits - 4240007 - True",
      "Horo Veiled - 4240008 - True",
      "Horosard DD - 4240009 - True",
      "Taro Horo - 4240010 - True",
      "Super Wow Horo - 4240011 - True",
      "Good Health D - 4240012 - True",
      "Health Happy - 4240013 - True",
      "Morning Health - 4240014 - True",
      "Hi Healthy - 4240015 - True",
      "Healthy Fine - 4240016 - True",
      "Healthy Mine - 4240017 - True",
      "Healthy Eat - 4240018 - True",
      "Healthy Habits - 4240019 - True",
      "Healthy Meals - 4240020 - True",
      "Healthy Style - 4240021 - True",
    ],
  },
  {
    id: "CLT8821",
    name: "CLT8821",
    type: "Client Account",
    lastLogin: "Feb 24, 11:30",
    lastAccessed: "192.168.1.44",
    status: true,
    services: [
      "Shield Core - 8821001 - True",
      "Click Pro - 8821002 - True",
      "APK Scan Lite - 8821003 - True",
      "Fraud Guard - 8821004 - True",
    ],
  },
  {
    id: "PRT3310",
    name: "PRT3310",
    type: "Sub Account",
    lastLogin: "Feb 23, 09:12",
    lastAccessed: "10.0.0.15",
    status: false,
    services: [
      "Basic Tracker - 3310001 - False",
      "Geo Resolver - 3310002 - True",
    ],
  },
  {
    id: "AGT9902",
    name: "AGT9902",
    type: "Agent Account",
    lastLogin: "Today 08:55",
    lastAccessed: "89.46.20.11",
    status: true,
    services: [
      "Premium Shield - 9902001 - True",
      "APK Vault - 9902002 - True",
      "Network Guard - 9902003 - True",
      "DataSync - 9902004 - True",
      "Event Logger - 9902005 - True",
    ],
  },
];

// ─── Action definitions ───────────────────────────────────────────────────────
const PRIMARY_ACTIONS = [
  { key: "view", icon: "👁", title: "View", color: "#0891b2" },
  { key: "edit", icon: "✏️", title: "Edit", color: "#1d4ed8" },
  { key: "loginAs", icon: "🔑", title: "Login As", color: "#7c3aed" },
];

const MORE_ACTIONS = [
  { key: "ninjaUser", label: "Ninja User", icon: "🥷", color: "#0f172a" },
  { key: "loginAs", label: "Login As", icon: "🔑", color: "#7c3aed" },
  { key: "updatePlans", label: "Update Plans", icon: "📋", color: "#0891b2" },
  { key: "makeStatus", label: "Make Status", icon: "🔄", color: "#d97706" },
  { key: "clearHistory", label: "Clear History", icon: "🗑", color: "#dc2626" },
  {
    key: "updateHistory",
    label: "User Update History",
    icon: "📜",
    color: "#16a34a",
  },
];

function UserActions({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isBlocked = user.status === "blocked";

  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {/* Primary icon buttons */}
      {PRIMARY_ACTIONS.map((a) => (
        <button
          key={a.key}
          title={a.title}
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: `${a.color}15`,
            color: a.color,
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background .15s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = `${a.color}30`)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = `${a.color}15`)
          }
        >
          {a.icon}
        </button>
      ))}

      {/* Block / Unblock */}
      <button
        title={isBlocked ? "Unblock" : "Block"}
        style={{
          padding: "4px 10px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          fontSize: 11,
          fontWeight: 700,
          background: isBlocked ? "#dcfce7" : "#fee2e2",
          color: isBlocked ? "#16a34a" : "#dc2626",
          transition: "opacity .15s",
        }}
      >
        {isBlocked ? "✓ Unblock" : "⊘ Block"}
      </button>

      {/* ⋯ More dropdown */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setOpen((o) => !o)}
          title="More actions"
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: open ? "#f1f5f9" : "#fff",
            cursor: "pointer",
            fontSize: 16,
            color: "#64748b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            letterSpacing: 1,
          }}
        >
          ⋯
        </button>

        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 36,
              zIndex: 200,
              background: "#fff",
              borderRadius: 12,
              border: "1px solid #e8ecf3",
              boxShadow: "0 12px 36px rgba(0,0,0,.14)",
              minWidth: 200,
              padding: "6px 0",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "6px 14px 8px",
                borderBottom: "1px solid #f1f5f9",
                marginBottom: 4,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, color: "#1a1a2e" }}>
                {user.name}
              </div>
              <div style={{ fontSize: 10, color: "#94a3b8" }}>{user.email}</div>
            </div>

            {MORE_ACTIONS.map((a) => (
              <button
                key={a.key}
                onClick={() => setOpen(false)}
                style={{
                  width: "100%",
                  padding: "9px 14px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "background .1s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f8fafc")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: `${a.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {a.icon}
                </span>
                <span
                  style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}
                >
                  {a.label}
                </span>
              </button>
            ))}

            {/* Divider + danger zone */}
            <div style={{ borderTop: "1px solid #f1f5f9", margin: "4px 0" }} />
            <button
              onClick={() => setOpen(false)}
              style={{
                width: "100%",
                padding: "9px 14px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: 10,
                transition: "background .1s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#fef2f2")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "#fee2e2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                🗑
              </span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#dc2626" }}>
                Delete User
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Active / Inactive tab toggle ────────────────────────────────────────────
function ActiveInactiveTabs({ value, onChange, activeCount, inactiveCount }) {
  const tabs = [
    {
      key: "active",
      label: "Active",
      count: activeCount,
      color: "#16a34a",
      bg: "#dcfce7",
      dot: "#22c55e",
    },
    {
      key: "inactive",
      label: "Inactive",
      count: inactiveCount,
      color: "#d9060d",
      bg: "#fef3c7",
      dot: "#f59e0b",
    },
  ];
  return (
    <div style={{ display: "flex", borderBottom: "2px solid #f1f5f9", gap: 0 }}>
      {tabs.map(({ key, label, count, color, bg, dot }) => {
        const on = value === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 22px",
              border: "none",
              cursor: "pointer",
              background: "transparent",
              fontWeight: 700,
              fontSize: 13,
              color: on ? color : "#94a3b8",
              borderBottom: on
                ? `2.5px solid ${color}`
                : "2.5px solid transparent",
              marginBottom: -2,
              transition: "all .15s",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: on ? dot : "#cbd5e1",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            {label}
            <span
              style={{
                padding: "2px 9px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 800,
                background: on ? bg : "#f1f5f9",
                color: on ? color : "#94a3b8",
              }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function PageUsers({ role = "admin" }) {
  const [activeType, setActiveType] = useState("All");
  const [query, setQuery] = useState("");
  const [statusTab, setStatusTab] = useState("active"); // 'active' | 'inactive'

  const isActiveStatus = (u) => u.status === "active";
  const isInactiveStatus = (u) => u.status !== "active";

  const filtered = userRows.filter((u) => {
    const matchStatus =
      statusTab === "active" ? isActiveStatus(u) : isInactiveStatus(u);
    const matchType = activeType === "All" || u.role === activeType;
    const matchQuery =
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase());
    return matchStatus && matchType && matchQuery;
  });

  const activeUsersCount = userRows.filter(isActiveStatus).length;
  const inactiveUsersCount = userRows.filter(isInactiveStatus).length;

  const isPartner = role === "partner";

  // ── Partner view: sub-accounts with collapsible services ────────────────────
  const [expandedAccounts, setExpandedAccounts] = useState({});
  const [partnerTab, setPartnerTab] = useState("active");
  const toggleAccount = (id) =>
    setExpandedAccounts((p) => ({ ...p, [id]: !p[id] }));
  const SERVICES_PREVIEW = 4;

  const filteredPartnerAccounts = PARTNER_SUB_ACCOUNTS.filter((u) =>
    partnerTab === "active" ? u.status === true : u.status === false,
  );
  const activePartnerCount = PARTNER_SUB_ACCOUNTS.filter(
    (u) => u.status === true,
  ).length;
  const inactivePartnerCount = PARTNER_SUB_ACCOUNTS.filter(
    (u) => u.status === false,
  ).length;

  if (isPartner) {
    return (
      <div>
        {/* Header */}
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            border: "1px solid #e8ecf3",
            marginBottom: 16,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 20px",
            }}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e" }}>
                My Sub-Accounts
              </div>
              <div style={{ fontSize: 12, color: SLATE, marginTop: 2 }}>
                {PARTNER_SUB_ACCOUNTS.length} accounts ·{" "}
                {PARTNER_SUB_ACCOUNTS.reduce(
                  (s, u) => s + u.services.length,
                  0,
                )}{" "}
                total services
              </div>
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 18px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                background: "#0d9488",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              ⊕ New Account
            </button>
          </div>
          <ActiveInactiveTabs
            value={partnerTab}
            onChange={setPartnerTab}
            activeCount={activePartnerCount}
            inactiveCount={inactivePartnerCount}
          />
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filteredPartnerAccounts.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: 40,
                color: SLATE,
                fontSize: 13,
                background: "#fff",
                borderRadius: 14,
                border: "1px solid #e8ecf3",
              }}
            >
              No {partnerTab} accounts found.
            </div>
          )}
          {filteredPartnerAccounts.map((u) => {
            const isExpanded = !!expandedAccounts[u.id];
            const preview = u.services.slice(0, SERVICES_PREVIEW);
            const rest = u.services.slice(SERVICES_PREVIEW);

            return (
              <div
                key={u.id}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  border: `1px solid ${u.status ? "#e8ecf3" : "#fee2e2"}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,.05)",
                  overflow: "hidden",
                  transition: "box-shadow .15s",
                }}
              >
                {/* Card header row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "200px 200px 160px 180px 80px 1fr auto",
                    alignItems: "center",
                    padding: "0",
                    borderBottom: isExpanded ? "1px solid #f1f5f9" : "none",
                    background: u.status ? "#fff" : "#fff9f9",
                  }}
                >
                  {/* User name + avatar */}
                  <div
                    style={{
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        flexShrink: 0,
                        background: u.status
                          ? "linear-gradient(135deg,#0d9488,#0891b2)"
                          : "#f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 800,
                        color: u.status ? "#fff" : "#94a3b8",
                      }}
                    >
                      {u.name.slice(0, 3)}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 800,
                          color: "#1a1a2e",
                        }}
                      >
                        {u.name}
                      </div>
                      <div style={{ fontSize: 10, color: SLATE, marginTop: 1 }}>
                        ID: {u.id}
                      </div>
                    </div>
                  </div>

                  {/* Account type */}
                  <div style={{ padding: "16px 12px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: 20,
                        fontSize: 11,
                        fontWeight: 700,
                        background: "#f0fdfa",
                        color: "#0d9488",
                        border: "1px solid #99f6e4",
                      }}
                    >
                      {u.type}
                    </span>
                  </div>

                  {/* Last login */}
                  <div style={{ padding: "16px 12px" }}>
                    <div
                      style={{ fontSize: 11, color: SLATE, marginBottom: 2 }}
                    >
                      Last Login
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#334155",
                      }}
                    >
                      {u.lastLogin}
                    </div>
                  </div>

                  {/* Last accessed */}
                  <div style={{ padding: "16px 12px" }}>
                    <div
                      style={{ fontSize: 11, color: SLATE, marginBottom: 2 }}
                    >
                      Last Accessed From
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontFamily: "monospace",
                        color: "#334155",
                      }}
                    >
                      {u.lastAccessed}
                    </div>
                  </div>

                  {/* Status toggle */}
                  <div style={{ padding: "16px 12px" }}>
                    <div
                      style={{
                        width: 44,
                        height: 24,
                        borderRadius: 12,
                        cursor: "pointer",
                        background: u.status ? "#0d9488" : "#cbd5e1",
                        position: "relative",
                        transition: "background .2s",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 3,
                          left: u.status ? 23 : 3,
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "#fff",
                          boxShadow: "0 1px 4px rgba(0,0,0,.25)",
                          transition: "left .2s",
                        }}
                      />
                    </div>
                  </div>

                  {/* Services preview (first 4 inline) */}
                  <div
                    style={{
                      padding: "14px 12px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    {preview.map((svc) => (
                      <span
                        key={svc}
                        style={{
                          padding: "3px 9px",
                          borderRadius: 6,
                          fontSize: 10,
                          fontWeight: 600,
                          background: "#0d9488",
                          color: "#fff",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {svc}
                      </span>
                    ))}
                    {rest.length > 0 && (
                      <button
                        onClick={() => toggleAccount(u.id)}
                        style={{
                          padding: "3px 10px",
                          borderRadius: 6,
                          fontSize: 10,
                          fontWeight: 700,
                          border: "1.5px dashed #0d9488",
                          background: "transparent",
                          color: "#0d9488",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isExpanded ? "▲ Less" : `+${rest.length} more`}
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div
                    style={{ padding: "16px 18px", display: "flex", gap: 6 }}
                  >
                    <button
                      title="View"
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        border: "none",
                        cursor: "pointer",
                        background: "#f0fdfa",
                        color: "#0d9488",
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      👁
                    </button>
                    <button
                      title="Edit"
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        border: "none",
                        cursor: "pointer",
                        background: "#eff6ff",
                        color: "#1d4ed8",
                        fontSize: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ✏️
                    </button>
                  </div>
                </div>

                {/* Expanded: all services in a grid */}
                {isExpanded && (
                  <div
                    style={{ padding: "14px 20px 16px", background: "#f8fafc" }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: SLATE,
                        marginBottom: 10,
                        textTransform: "uppercase",
                        letterSpacing: ".6px",
                      }}
                    >
                      All Services ({u.services.length})
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(220px, 1fr))",
                        gap: 6,
                      }}
                    >
                      {u.services.map((svc) => {
                        const isTrue = svc.endsWith("True");
                        return (
                          <div
                            key={svc}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "7px 12px",
                              borderRadius: 8,
                              fontSize: 11,
                              fontWeight: 600,
                              background: "#fff",
                              border: `1px solid ${isTrue ? "#99f6e4" : "#fecaca"}`,
                              color: "#334155",
                            }}
                          >
                            <span>{svc.replace(/ - (True|False)$/, "")}</span>
                            <span
                              style={{
                                padding: "2px 8px",
                                borderRadius: 20,
                                fontSize: 10,
                                fontWeight: 700,
                                background: isTrue ? "#0d9488" : "#dc2626",
                                color: "#fff",
                                marginLeft: 8,
                                flexShrink: 0,
                              }}
                            >
                              {isTrue ? "True" : "False"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Admin view: full user directory ─────────────────────────────────────────
  return (
    <div>
      {/* Summary stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
          marginBottom: 20,
        }}
      >
        {[
          { label: "Total Users", value: TOTAL_USERS, color: BLUE },
          {
            label: "Active",
            value: userRows.filter((u) => u.status === "active").length,
            color: GREEN,
          },
          {
            label: "Inactive",
            value: userRows.filter((u) => u.status === "warning").length,
            color: AMBER,
          },
          {
            label: "Blocked",
            value: userRows.filter((u) => u.status === "blocked").length,
            color: ROSE,
          },
        ].map(({ label, value, color }) => (
          <Card
            key={label}
            style={{ textAlign: "center", borderTop: `4px solid ${color}` }}
          >
            <div
              style={{
                fontSize: 34,
                fontWeight: 900,
                color,
                fontFamily: "Georgia",
              }}
            >
              {value}
            </div>
            <div style={{ fontSize: 12, color: SLATE, fontWeight: 600 }}>
              {label}
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 14,
          marginBottom: 20,
        }}
      >
        <Card>
          <SectionTitle>Login &amp; Action Activity</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={repTrend}>
              <XAxis dataKey="d" />
              <YAxis />
              <Tooltip />
              <Line dataKey="visits" stroke="#2563eb" strokeWidth={2} />
              <Line
                dataKey="clicks"
                stroke="#22c55e"
                strokeWidth={2}
                strokeDasharray="4 2"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle>Users by Type</SectionTitle>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <PieChart width={110} height={110}>
                <Pie
                  data={TYPE_COUNTS}
                  dataKey="count"
                  cx={52}
                  cy={52}
                  innerRadius={28}
                  outerRadius={50}
                  paddingAngle={2}
                >
                  {TYPE_COUNTS.map((t, i) => (
                    <Cell key={i} fill={t.color} />
                  ))}
                </Pie>
              </PieChart>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  fontSize: 14,
                  fontWeight: 900,
                  color: "#1a1a2e",
                  textAlign: "center",
                  lineHeight: 1,
                }}
              >
                {TOTAL_USERS}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                flex: 1,
                overflow: "hidden",
              }}
            >
              {TYPE_COUNTS.map((t) => (
                <div
                  key={t.label}
                  style={{ display: "flex", alignItems: "center", gap: 7 }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: t.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#1a1a2e",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.count}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: SLATE,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* User directory */}
      <Card>
        {/* Title row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <SectionTitle>User Directory</SectionTitle>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: 12,
                outline: "none",
              }}
            />
            <button className="btn-success">+ Add User</button>
          </div>
        </div>

        {/* Active / Inactive tab bar */}
        <ActiveInactiveTabs
          value={statusTab}
          onChange={(v) => {
            setStatusTab(v);
            setActiveType("All");
          }}
          activeCount={activeUsersCount}
          inactiveCount={inactiveUsersCount}
        />

        {/* Type filter tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginTop: 16,
            marginBottom: 16,
            paddingBottom: 14,
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          {USER_TYPES.map((t) => {
            const isActive = activeType === t;
            const color = t === "All" ? BLUE : TYPE_COLORS[t];
            return (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                style={{
                  padding: "5px 14px",
                  borderRadius: 20,
                  border: isActive
                    ? `1.5px solid ${color}`
                    : "1.5px solid #e2e8f0",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  background: isActive ? color : "#fff",
                  color: isActive ? "#fff" : "#64748b",
                  transition: "all .15s",
                }}
              >
                {t}
              </button>
            );
          })}
        </div>

        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
              {[
                "User",
                "Email",
                "Type",
                "Region",
                "Sessions",
                "Last Login",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: 10,
                    fontSize: 11,
                    color: SLATE,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr
                key={i}
                style={{ borderBottom: "1px solid #f8fafc" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f8fafc")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <td style={{ padding: 10 }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: TYPE_COLORS[u.role]
                          ? `${TYPE_COLORS[u.role]}22`
                          : "#e2e8f0",
                        border: `2px solid ${TYPE_COLORS[u.role] || "#cbd5e1"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        color: TYPE_COLORS[u.role] || "#334155",
                        fontSize: 13,
                      }}
                    >
                      {u.name[0]}
                    </div>
                    <span style={{ fontWeight: 700 }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ padding: 10, color: "#64748b" }}>{u.email}</td>
                <td style={{ padding: 10 }}>
                  <Badge color={TYPE_COLORS[u.role] || BLUE}>{u.role}</Badge>
                </td>
                <td style={{ padding: 10 }}>{u.region}</td>
                <td style={{ padding: 10 }}>{u.sessions}</td>
                <td style={{ padding: 10, color: "#64748b" }}>{u.lastLogin}</td>
                <td style={{ padding: 10 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: STATUS_COLOR(u.status),
                      display: "inline-block",
                      marginRight: 6,
                    }}
                  />
                  <span
                    style={{ fontWeight: 600, textTransform: "capitalize" }}
                  >
                    {u.status}
                  </span>
                </td>
                <td style={{ padding: "8px 10px" }}>
                  <UserActions user={u} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    padding: 30,
                    textAlign: "center",
                    color: SLATE,
                    fontSize: 13,
                  }}
                >
                  No {statusTab} users found
                  {activeType !== "All" ? ` for ${activeType}` : ""}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
