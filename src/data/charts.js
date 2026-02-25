// ─── Histogram (visits / clicks / subs over 25 periods) ─────────────────────
const VISITS_RAW = [0, 420, 900, 1180, 820, 310, 200, 180, 140, 120, 110, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 42, 40, 38, 35, 30];
const CLICKS_RAW = [0, 180, 340, 260, 90, 60, 45, 38, 30, 25, 22, 18, 16, 14, 12, 11, 10, 9, 8, 7, 6, 6, 5, 5, 4, 4];
const SUBS_RAW   = [0, 60, 110, 80, 30, 18, 12, 10, 8, 6, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1];

export const histogramData = Array.from({ length: 26 }, (_, i) => ({
  x:      i,
  visits: VISITS_RAW[i] ?? 30,
  clicks: CLICKS_RAW[i] ?? 4,
  subs:   SUBS_RAW[i]   ?? 1,
}));

// ─── Blocking reasons (radar chart — by weekday) ─────────────────────────────
export const blockLegend = [
  { key: 'Shield Bypassing',    color: '#4a6fa5' },
  { key: 'Desktop Traffic',     color: '#c0392b' },
  { key: 'Failed Interaction',  color: '#e91e8c' },
  { key: 'Bot Detected',        color: '#f1c40f' },
  { key: 'Remotely Controlled', color: '#8bc34a' },
  { key: 'Spoofing',            color: '#b0bec5' },
  { key: 'APK Fraud',           color: '#00bcd4' },
  { key: 'Excessive IP',        color: '#9c27b0' },
];

export const blockReasons = [
  { subject: 'Sun', 'Shield Bypassing': 4200, 'Desktop Traffic': 2100, 'Failed Interaction': 1800, 'Bot Detected': 900,  'Remotely Controlled': 2400, Spoofing: 1200, 'APK Fraud': 800,  'Excessive IP': 600 },
  { subject: 'Mon', 'Shield Bypassing': 3800, 'Desktop Traffic': 2800, 'Failed Interaction': 2200, 'Bot Detected': 1400, 'Remotely Controlled': 1900, Spoofing: 900,  'APK Fraud': 1100, 'Excessive IP': 750 },
  { subject: 'Tue', 'Shield Bypassing': 5100, 'Desktop Traffic': 1900, 'Failed Interaction': 1500, 'Bot Detected': 2000, 'Remotely Controlled': 2800, Spoofing: 1500, 'APK Fraud': 600,  'Excessive IP': 400 },
  { subject: 'Wed', 'Shield Bypassing': 3200, 'Desktop Traffic': 3200, 'Failed Interaction': 2800, 'Bot Detected': 1100, 'Remotely Controlled': 2100, Spoofing: 700,  'APK Fraud': 1300, 'Excessive IP': 880 },
  { subject: 'Thu', 'Shield Bypassing': 4500, 'Desktop Traffic': 2400, 'Failed Interaction': 1200, 'Bot Detected': 1800, 'Remotely Controlled': 3200, Spoofing: 1800, 'APK Fraud': 900,  'Excessive IP': 520 },
  { subject: 'Fri', 'Shield Bypassing': 3900, 'Desktop Traffic': 2700, 'Failed Interaction': 2000, 'Bot Detected': 1300, 'Remotely Controlled': 2500, Spoofing: 1100, 'APK Fraud': 700,  'Excessive IP': 640 },
  { subject: 'Sat', 'Shield Bypassing': 2800, 'Desktop Traffic': 1600, 'Failed Interaction': 1400, 'Bot Detected': 800,  'Remotely Controlled': 1800, Spoofing: 600,  'APK Fraud': 500,  'Excessive IP': 320 },
];

// ─── 30-day reporting trend ───────────────────────────────────────────────────
export const repTrend = Array.from({ length: 30 }, (_, i) => ({
  d:       `Sep ${i + 1}`,
  visits:  Math.floor(Math.sin(i / 4) * 200 + 600 + Math.random() * 80),
  clicks:  Math.floor(Math.sin(i / 4) * 80  + 220 + Math.random() * 30),
  blocked: Math.floor(Math.sin(i / 3) * 40  + 100 + Math.random() * 20),
}));
