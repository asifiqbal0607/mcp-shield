// ─── Blocking reasons table ───────────────────────────────────────────────────
export const blkRows = [
  { reason: 'Shield Bypassing',        count: '4,28,120', pct: 28, trend: '+12%', sev: 'High',     color: '#4a6fa5' },
  { reason: 'Desktop Traffic',         count: '2,98,450', pct: 20, trend: '+4%',  sev: 'Medium',   color: '#c0392b' },
  { reason: 'Failed Interaction',      count: '2,14,780', pct: 14, trend: '-2%',  sev: 'Medium',   color: '#e91e8c' },
  { reason: 'Bot Detected',            count: '1,87,230', pct: 12, trend: '+8%',  sev: 'High',     color: '#f1c40f' },
  { reason: 'Remotely Controlled Fraud', count: '1,54,900', pct: 10, trend: '+15%', sev: 'Critical', color: '#8bc34a' },
  { reason: 'Spoofing',                count: '1,12,340', pct:  7, trend: '+1%',  sev: 'Medium',   color: '#b0bec5' },
  { reason: 'APK Fraud',               count: '98,760',   pct:  6, trend: '+22%', sev: 'Critical', color: '#00bcd4' },
  { reason: 'Excessive IP',            count: '45,230',   pct:  3, trend: '-5%',  sev: 'Low',      color: '#9c27b0' },
];

// ─── APK directory ────────────────────────────────────────────────────────────
export const apkRows = [
  { rank: 1, name: 'com.whatsapp',              pkg: 'WhatsApp',  installs: '2,84,120', clicks: '1,20,430', clean: '96%', risk: 'Low',    status: 'active'  },
  { rank: 2, name: 'com.instagram.android',     pkg: 'Instagram', installs: '2,10,890', clicks: '98,320',   clean: '93%', risk: 'Low',    status: 'active'  },
  { rank: 3, name: 'com.facebook.katana',       pkg: 'Facebook',  installs: '1,98,450', clicks: '87,210',   clean: '88%', risk: 'Medium', status: 'warning' },
  { rank: 4, name: 'com.google.android.youtube',pkg: 'YouTube',   installs: '1,76,230', clicks: '74,560',   clean: '97%', risk: 'Low',    status: 'active'  },
  { rank: 5, name: 'com.twitter.android',       pkg: 'Twitter/X', installs: '1,43,780', clicks: '62,100',   clean: '91%', risk: 'Low',    status: 'active'  },
  { rank: 6, name: 'com.snapchat.android',      pkg: 'Snapchat',  installs: '1,21,440', clicks: '54,870',   clean: '85%', risk: 'Medium', status: 'warning' },
  { rank: 7, name: 'com.tiktok.android',        pkg: 'TikTok',    installs: '98,760',   clicks: '44,230',   clean: '79%', risk: 'High',   status: 'blocked' },
  { rank: 8, name: 'com.netflix.mediaclient',   pkg: 'Netflix',   installs: '87,320',   clicks: '38,940',   clean: '98%', risk: 'Low',    status: 'active'  },
];

// ─── User directory ───────────────────────────────────────────────────────────
export const userRows = [
  { id: 'USR-001', name: 'Amara Nkosi',    email: 'amara@shield.io',    role: 'Admins',         region: 'ZA', lastLogin: 'Today 08:42',  sessions: 1240, status: 'active'  },
  { id: 'USR-002', name: 'Liam Patel',     email: 'liam@shield.io',     role: 'C-Admins',       region: 'ZA', lastLogin: 'Today 07:11',  sessions: 980,  status: 'active'  },
  { id: 'USR-003', name: 'Sophie Chen',    email: 'sophie@shield.io',   role: 'Supper Clients', region: 'EU', lastLogin: 'Yesterday',    sessions: 430,  status: 'active'  },
  { id: 'USR-004', name: 'Omar Diallo',    email: 'omar@shield.io',     role: 'Clients',        region: 'ZA', lastLogin: '3 days ago',   sessions: 210,  status: 'warning' },
  { id: 'USR-005', name: 'Maria Santos',   email: 'maria@shield.io',    role: 'Client Partner', region: 'US', lastLogin: 'Today 09:00',  sessions: 1870, status: 'active'  },
  { id: 'USR-006', name: 'James Okafor',   email: 'james@shield.io',    role: 'Sub Account',    region: 'ZA', lastLogin: '1 week ago',   sessions: 55,   status: 'blocked' },
  { id: 'USR-007', name: 'Fatima Al-Sayed',email: 'fatima@shield.io',   role: 'Publisher',      region: 'AE', lastLogin: 'Today 10:15',  sessions: 780,  status: 'active'  },
  { id: 'USR-008', name: 'Chen Wei',       email: 'chen@shield.io',     role: 'Mirrored',       region: 'CN', lastLogin: '2 days ago',   sessions: 340,  status: 'active'  },
  { id: 'USR-009', name: 'David Osei',     email: 'david@shield.io',    role: 'Operations',     region: 'GH', lastLogin: 'Today 06:30',  sessions: 920,  status: 'active'  },
  { id: 'USR-010', name: 'Sara Mensah',    email: 'sara@shield.io',     role: 'Admins',         region: 'KE', lastLogin: 'Yesterday',    sessions: 670,  status: 'active'  },
  { id: 'USR-011', name: 'Ravi Kumar',     email: 'ravi@shield.io',     role: 'Clients',        region: 'IN', lastLogin: '4 days ago',   sessions: 120,  status: 'warning' },
  { id: 'USR-012', name: 'Nina Petrova',   email: 'nina@shield.io',     role: 'Publisher',      region: 'EU', lastLogin: 'Today 11:00',  sessions: 550,  status: 'active'  },
];

// ─── Service registry ─────────────────────────────────────────────────────────
export const svcRows = [
  { id: 'SVC-01', name: 'Shield Core API', type: 'API',      uptime: '99.98%', latency: '12ms',  calls: '4.2M', status: 'active',  region: 'ZA' },
  { id: 'SVC-02', name: 'Click Tracker',   type: 'Tracker',  uptime: '99.91%', latency: '8ms',   calls: '2.8M', status: 'active',  region: 'ZA' },
  { id: 'SVC-03', name: 'APK Scanner',     type: 'Scanner',  uptime: '98.40%', latency: '340ms', calls: '1.1M', status: 'warning', region: 'EU' },
  { id: 'SVC-04', name: 'Fraud Detector',  type: 'ML Model', uptime: '99.75%', latency: '55ms',  calls: '3.4M', status: 'active',  region: 'ZA' },
  { id: 'SVC-05', name: 'Export Engine',   type: 'Worker',   uptime: '97.10%', latency: '820ms', calls: '48K',  status: 'warning', region: 'US' },
  { id: 'SVC-06', name: 'Geo Resolver',    type: 'API',      uptime: '99.99%', latency: '4ms',   calls: '5.1M', status: 'active',  region: 'ZA' },
];

// ─── Reports list ─────────────────────────────────────────────────────────────
export const repReports = [
  { name: 'Traffic Overview',    type: 'Scheduled', freq: 'Daily',  lastRun: 'Today 06:00', rows: '1,24,320', status: 'active' },
  { name: 'Block Summary',       type: 'On-demand', freq: 'Manual', lastRun: 'Yesterday',   rows: '87,450',   status: 'active' },
  { name: 'APK Health Report',   type: 'Scheduled', freq: 'Weekly', lastRun: 'Sep 22',      rows: '42,100',   status: 'active' },
  { name: 'Fraud Detection Log', type: 'On-demand', freq: 'Manual', lastRun: 'Sep 20',      rows: '31,450',   status: 'paused' },
];

// ─── Channel cards (Overview page) ───────────────────────────────────────────
import { BLUE, GREEN, AMBER, ROSE } from '../constants/colors';

export const channelCards = [
  { name: 'In-App',     clicks: 302357, visits: 1209429, color: BLUE,  pct: 25 },
  { name: 'Browser',    clicks: 302357, visits: 1209429, color: GREEN, pct: 40 },
  { name: 'Google',     clicks: 302357, visits: 1209429, color: AMBER, pct: 60 },
  { name: 'Non Google', clicks: 302357, visits: 1209429, color: ROSE,  pct: 15 },
];

// ─── Top 10 APKs — Trusted & Clean pie data ──────────────────────────────────
export const trustedApkPie = [
  { name: 'com.shopee.id (Shopee)',                value: 18.7, color: '#4e79a7' },
  { name: 'com.lotte.lotteon (Lotte)',             value: 15.8, color: '#f28e2b' },
  { name: 'com.facebook.orca (Messenger)',         value: 12.4, color: '#e15759' },
  { name: 'com.lazada.android (Lazada)',           value: 10.1, color: '#76b7b2' },
  { name: 'com.google.android.gm (Gmail)',         value:  8.9, color: '#59a14f' },
  { name: 'com.xiaomi.smarthome (Xiaomi)',         value:  7.6, color: '#edc948' },
  { name: 'com.tokopedia.tkpd (Tokopedia)',        value:  6.8, color: '#b07aa1' },
  { name: 'com.grab.driver (Grab)',                value:  5.3, color: '#ff9da7' },
  { name: 'com.bukalapak.android (Bukalapak)',     value:  4.2, color: '#9c755f' },
  { name: 'com.gojek.app (GoJek)',                 value: 10.2, color: '#1a1a2e' },
];

export const cleanApkPie = [
  { name: 'com.whatsapp (WhatsApp)',                      value: 22.9, color: '#4e79a7' },
  { name: 'com.discord (Discord)',                        value: 14.6, color: '#f28e2b' },
  { name: 'com.instagram.android (Instagram)',            value: 11.3, color: '#e15759' },
  { name: 'com.facebook.katana (Facebook)',               value:  9.8, color: '#76b7b2' },
  { name: 'com.twitter.android (Twitter/X)',              value:  8.7, color: '#59a14f' },
  { name: 'com.snapchat.android (Snapchat)',              value:  7.4, color: '#edc948' },
  { name: 'com.google.android.youtube (YouTube)',         value:  6.5, color: '#b07aa1' },
  { name: 'com.netflix.mediaclient (Netflix)',            value:  5.9, color: '#ff9da7' },
  { name: 'com.spotify.music (Spotify)',                  value:  4.3, color: '#9c755f' },
  { name: 'com.samsung.android.messaging (Samsung)',      value:  8.6, color: '#1a1a2e' },
];

export const specifiedApkPie = [
  { name: 'com.viber.voip (Viber)',                       value: 42.5, color: '#4e79a7' },
  { name: 'com.google.android.dialer (Phone)',            value: 12.2, color: '#f28e2b' },
  { name: 'com.huawei.appmarket (AppGallery)',            value:  9.1, color: '#e15759' },
  { name: 'com.truecaller (Truecaller)',                  value:  6.8, color: '#76b7b2' },
  { name: 'com.imo.android.imoim (imo)',                  value:  5.4, color: '#59a14f' },
  { name: 'com.wework (WeWork)',                          value:  4.9, color: '#edc948' },
  { name: 'abherunterladen.com.whatsappspecial (WA Mod)', value:  4.1, color: '#b07aa1' },
  { name: 'com.linecorp.lineforwifi (LINE)',              value:  3.8, color: '#ff9da7' },
  { name: 'com.beyondidentity.authenticator (BeyondID)',  value:  3.1, color: '#9c755f' },
  { name: 'idle.internet.tycoon.empire (Tycoon)',         value:  2.7, color: '#f43f5e' },
  { name: 'com.robosoft.puzzlegame (Puzzle)',             value:  2.5, color: '#06b6d4' },
  { name: 'com.yobo.browser (Yobo)',                     value:  2.9, color: '#8b5cf6' },
];

export const hiddenApkPie = [
  { name: 'com.hdfc.selfie.loans (HDFC)',                         value: 26.7, color: '#4e79a7' },
  { name: 'com.CompanionsGlide (Companions)',                     value: 15.4, color: '#f28e2b' },
  { name: 'com.bettercall.android (BetterCall)',                  value:  9.8, color: '#e15759' },
  { name: 'ultimatepower.cheat.freefiremax (FreeFire)',           value:  7.6, color: '#76b7b2' },
  { name: 'com.ble.safe.indicator (BLE)',                         value:  6.3, color: '#59a14f' },
  { name: 'downloadier.chrous.documentreader (DocReader)',        value:  5.4, color: '#edc948' },
  { name: 'com.sos.android.app (SOS)',                           value:  4.8, color: '#b07aa1' },
  { name: 'com.sun.android.app.slovenian (Sun)',                 value:  4.1, color: '#ff9da7' },
  { name: 'com.android.settings (Settings)',                     value:  3.6, color: '#9c755f' },
  { name: 'com.facebook.banana (FB Banana)',                     value:  3.4, color: '#f43f5e' },
  { name: 'org.telegram.messenger (Telegram)',                   value:  4.7, color: '#1a1a2e' },
  { name: 'com.simply.browser (Simply)',                         value: 30.4, color: '#6366f1' },
];

// ─── Device stats pie data ───────────────────────────────────────────────────
export const devicesPie = [
  { name: 'SM-G9750 (17.7%)',    value: 17.7, color: '#4e79a7' },
  { name: 'CPH1969 (12.4%)',     value: 12.4, color: '#f28e2b' },
  { name: 'STK-L21 (7.9%)',      value:  7.9, color: '#e15759' },
  { name: 'TNO-L31 (5.3%)',      value:  5.3, color: '#76b7b2' },
  { name: 'Vivo 1819 (4.1%)',    value:  4.1, color: '#59a14f' },
  { name: 'CPH1723 (4.9%)',      value:  4.9, color: '#edc948' },
  { name: 'Vivo Y91 (3.8%)',     value:  3.8, color: '#b07aa1' },
  { name: 'iPhone 11 (3.2%)',    value:  3.2, color: '#ff9da7' },
  { name: 'Other (319,986)',     value: 36.7, color: '#1a1a2e' },
];

export const osPie = [
  { name: 'Android (54.6%)',  value: 54.6, color: '#1a1a2e' },
  { name: 'Chrome OS (21.9%)',value: 21.9, color: '#4e79a7' },
  { name: 'Windows (10.7%)',  value: 10.7, color: '#f28e2b' },
  { name: 'Mac OS X (10.7%)', value: 10.7, color: '#e15759' },
  { name: 'Linux (1.4%)',     value:  1.4, color: '#76b7b2' },
  { name: 'iOS (0.6%)',       value:  0.6, color: '#59a14f' },
];

export const browsersPie = [
  { name: 'Liberate Mobile (51.1%)',          value: 51.1, color: '#1a1a2e' },
  { name: 'Chrome Mobile WebView (20.4%)',    value: 20.4, color: '#4e79a7' },
  { name: 'Mobile Safari (10.6%)',            value: 10.6, color: '#f28e2b' },
  { name: 'Samsung Internet (7.3%)',          value:  7.3, color: '#e15759' },
  { name: 'Facebook (1.7%)',                  value:  1.7, color: '#76b7b2' },
  { name: 'Crawler (1.2%)',                   value:  1.2, color: '#59a14f' },
  { name: 'Mobile Safari (1.2%)',             value:  1.2, color: '#edc948' },
];

export const networksPie = [
  { name: 'Rain Company Limited (39.9%)',                                          value: 39.9, color: '#1a1a2e' },
  { name: 'Roninhouse Company Limited (19.7%)',                                    value: 19.7, color: '#4e79a7' },
  { name: 'Al Ittihad Telecommunication (13.9%)',                                  value: 13.9, color: '#f28e2b' },
  { name: 'Naqafi Amalgamated Company for Communications (12.5%)',                 value: 12.5, color: '#e15759' },
  { name: 'Jamhurif Telecommunications Plc (11.8%)',                               value: 11.8, color: '#76b7b2' },
  { name: 'MCA INTERNET (11.1%)',                                                  value: 11.1, color: '#59a14f' },
  { name: 'SatMeth Telecommunications Employment Thailand & Services (11.2%)',     value: 11.2, color: '#edc948' },
  { name: 'Total Access Communication PLC (10.9%)',                                value: 10.9, color: '#b07aa1' },
];

// ─── Geo spread data ─────────────────────────────────────────────────────────
export const geoData = [
  { country: 'South Africa', code: 'ZA', value: 326547, lat: -28.5, lng: 24.7,  color: '#ef4444' },
  { country: 'United States', code: 'US', value: 48320,  lat: 39.5,  lng: -98.4, color: '#3b82f6' },
  { country: 'India',         code: 'IN', value: 38210,  lat: 20.6,  lng: 78.9,  color: '#3b82f6' },
  { country: 'Nigeria',       code: 'NG', value: 29840,  lat:  9.1,  lng:  8.7,  color: '#3b82f6' },
  { country: 'Brazil',        code: 'BR', value: 18540,  lat: -14.2, lng: -51.9, color: '#3b82f6' },
  { country: 'UK',            code: 'GB', value: 14200,  lat: 55.4,  lng:  -3.4, color: '#3b82f6' },
  { country: 'Indonesia',     code: 'ID', value: 12800,  lat:  -0.8, lng: 113.9, color: '#3b82f6' },
  { country: 'Kenya',         code: 'KE', value: 11200,  lat:  -1.3, lng:  36.8, color: '#3b82f6' },
  { country: 'Germany',       code: 'DE', value:  9800,  lat: 51.2,  lng:  10.5, color: '#3b82f6' },
  { country: 'Philippines',   code: 'PH', value:  8400,  lat: 12.9,  lng: 121.8, color: '#3b82f6' },
  { country: 'Thailand',      code: 'TH', value:  7300,  lat: 15.9,  lng: 100.9, color: '#3b82f6' },
  { country: 'Ghana',         code: 'GH', value:  6100,  lat:  7.9,  lng:  -1.0, color: '#3b82f6' },
  { country: 'Pakistan',      code: 'PK', value:  5800,  lat: 30.4,  lng:  69.3, color: '#3b82f6' },
  { country: 'Tanzania',      code: 'TZ', value:  4900,  lat:  -6.4, lng:  34.9, color: '#3b82f6' },
  { country: 'Zimbabwe',      code: 'ZW', value:  4200,  lat: -19.0, lng:  29.2, color: '#3b82f6' },
];


// ─── APK Pie Charts ───────────────────────────────────────────────────────────
export const trustedApkData = [
  { name: 'com.whatsapp',                   value: 18.7 },
  { name: 'com.instagram.android',          value: 14.3 },
  { name: 'com.facebook.katana',            value: 11.4 },
  { name: 'com.google.android.youtube',     value: 9.8  },
  { name: 'com.twitter.android',            value: 7.2  },
  { name: 'com.snapchat.android',           value: 6.1  },
  { name: 'com.netflix.mediaclient',        value: 5.4  },
  { name: 'com.spotify.music',              value: 4.9  },
  { name: 'com.amazon.mShop.android',       value: 3.8  },
  { name: 'com.google.android.gm',          value: 18.4 },
];

export const cleanApkData = [
  { name: 'com.imo.mobile.imoimoim',        value: 21.9 },
  { name: 'com.viber.voip',                 value: 16.4 },
  { name: 'com.skype.raider',               value: 13.2 },
  { name: 'com.discord',                    value: 9.7  },
  { name: 'com.telegram.messenger',         value: 8.3  },
  { name: 'com.zhiliaoapp.musically',       value: 7.5  },
  { name: 'com.linkedin.android',           value: 5.9  },
  { name: 'com.pinterest',                  value: 4.8  },
  { name: 'com.google.android.apps.maps',   value: 3.2  },
  { name: 'com.google.android.googlequicksearchbox', value: 9.1 },
];

export const specifiedApkData = [
  { name: 'com.adient.browser',             value: 21.6 },
  { name: 'com.yoo.android.phonehelper.lite.free', value: 12.5 },
  { name: 'com.huawei.appmarket',           value: 10.9 },
  { name: 'albrowser.adblock.privatebrowser.chromebook', value: 8.4 },
  { name: 'com.ba.appsbrowse',              value: 7.2  },
  { name: 'com.conduitallthewaydown.homescreen', value: 6.1 },
  { name: 'com.android.browser.browserapp.webbrowser', value: 5.3 },
  { name: 'lite.internet.download.manager', value: 4.4  },
  { name: 'com.comodo.browser',             value: 3.8  },
  { name: 'com.tiktok.android',             value: 19.8 },
];

export const hiddenApkData = [
  { name: 'com.helper.bg',                  value: 26.7 },
  { name: 'com.analytics.goodshare',        value: 20.4 },
  { name: 'com.heliapp.browser',            value: 9.8  },
  { name: 'com.facebook.orca',              value: 5.9  },
  { name: 'com.BrowserFront.OpenTabBrowser.animedown', value: 1.9 },
  { name: 'com.ConsortiumDyOn.FreeChargeRider', value: 1.6 },
  { name: 'com.lonasband.cleanslate3',      value: 1.4  },
  { name: 'com.bomi.phone.gov',             value: 2.3  },
  { name: 'downloadar.chrome.discountcoupon', value: 1.9 },
  { name: 'com.sie.android.app.storemore',  value: 1.7  },
  { name: 'org.telegram.messenger',         value: 4.7  },
  { name: 'com.facebook.katana',            value: 3.9  },
];

// ─── Device Stats ─────────────────────────────────────────────────────────────
export const topDevicesData = [
  { name: 'iPhone 11',          value: 315988 },
  { name: 'infinix X6515',     value: 13.64   },
  { name: 'itel A662L',        value: 12.64   },
  { name: 'TECNO LD7',         value: 12.29   },
  { name: 'vivo 1906',         value: 10.49   },
  { name: 'Vivo Y21',          value: 10.36   },
  { name: 'vivo 1920',         value: 12.2    },
  { name: 'infinix X6833B',    value: 12.76   },
  { name: 'ZTE ZMAX10',        value: 11.74   },
];

export const topOsData = [
  { name: 'Android',   value: 314.8 },
  { name: 'iOS',        value: 10.4  },
  { name: 'Mac OS X',   value: 40.7  },
  { name: 'Windows',    value: 15.7  },
  { name: 'Chrome OS',  value: 20.9  },
];

export const topBrowsersData = [
  { name: 'Likuoo Mobile',      value: 311.1 },
  { name: 'Chrome Mobile WebView', value: 20.4 },
  { name: 'Mobile Safari',      value: 21.7  },
  { name: 'Facebook',           value: 21.7  },
  { name: 'Twitter',            value: 21.2  },
  { name: 'Mobile Safari (UIW)', value: 21.2 },
  { name: 'Samsung Internet',   value: 10.8  },
];

export const topNetworksData = [
  { name: 'Rain Forest Company Limited', value: 139.98 },
  { name: 'Rainforest Company Limited',  value: 179.96 },
  { name: 'Al Aneen Telecommunication',  value: 11.2   },
  { name: 'Nawah Telecommunication',     value: 11.2   },
  { name: 'Sudan Amalgamated Company',   value: 11.3   },
  { name: 'ONLY INTERNET Co.',           value: 11.08  },
  { name: 'Safrilink Telecommunications', value: 11.7  },
  { name: 'Total Access Communications', value: 149.98 },
];

// ─── Geo Spread ───────────────────────────────────────────────────────────────
export const geoSpreadData = [
  { country: 'Sudan',           code: 'SD', visits: 326547, clicks: 142300, pct: 62.4 },
  { country: 'South Africa',    code: 'ZA', visits: 48210,  clicks: 21400,  pct: 9.2  },
  { country: 'Nigeria',         code: 'NG', visits: 31450,  clicks: 14800,  pct: 6.0  },
  { country: 'Ethiopia',        code: 'ET', visits: 24780,  clicks: 10200,  pct: 4.7  },
  { country: 'Kenya',           code: 'KE', visits: 18320,  clicks: 8100,   pct: 3.5  },
  { country: 'Egypt',           code: 'EG', visits: 15640,  clicks: 6900,   pct: 3.0  },
  { country: 'Ghana',           code: 'GH', visits: 12890,  clicks: 5400,   pct: 2.5  },
  { country: 'Tanzania',        code: 'TZ', visits: 10230,  clicks: 4300,   pct: 2.0  },
  { country: 'Uganda',          code: 'UG', visits: 8760,   clicks: 3700,   pct: 1.7  },
  { country: 'Zambia',          code: 'ZM', visits: 7430,   clicks: 3100,   pct: 1.4  },
  { country: 'United States',   code: 'US', visits: 6210,   clicks: 2800,   pct: 1.2  },
  { country: 'Other',           code: 'OT', visits: 19230,  clicks: 7900,   pct: 2.4  },
];

// ─── Transactions (Clicked Clean popup) ──────────────────────────────────────
export const transactionRows = [
  { id: 'sskbb9692d834f1fe323f7f706a62995536', time: 'Feb 25, 04:14:22', network: 'Total Access Communication PLC.', apk: 'com.kaerosduplicatescleaner', userIp: '1.46.69.91',       msisdn: '',    status: 'Block', reasons: ['MCPS-2000'],               interaction: 'false' },
  { id: 'ssk5779a238b672edb6ec2c60a2db9efea0', time: 'Feb 25, 04:14:21', network: 'Total Access Communication PLC.', apk: 'com.deepvision.shortdrama',    userIp: '1.46.220.46',      msisdn: '',    status: 'Block', reasons: ['MCPS-2000'],               interaction: 'false' },
  { id: 'sskde02a3363258e4bd5e57e284d999ea76', time: 'Feb 25, 04:14:20', network: 'Total Access Communication PLC.', apk: 'com.prisor.hyper.adopter',      userIp: '1.46.31.24',       msisdn: '',    status: 'Block', reasons: ['MCPS-2000'],               interaction: 'false' },
  { id: 'ssk4f6b214b2fd4714d92de159e6e22f1c8', time: 'Feb 25, 04:14:18', network: 'Total Access Communication PLC.', apk: 'com.annel.sweepclean',          userIp: '1.47.19.193',      msisdn: '',    status: 'Block', reasons: ['MCPS-1300', 'AMCPS-1310'], interaction: 'false' },
  { id: 'sska743a1353ad8106a621d28915223aba4', time: 'Feb 25, 04:14:17', network: 'Al Atheer Telecommunication-Iraq Co. Ltd.',  apk: '',           userIp: '151.236.179.100',  msisdn: '',    status: 'Block', reasons: ['MCPS-1300'],               interaction: 'false' },
  { id: 'sskad99d0e3a323fbb5914f47b0b4748aeb', time: 'Feb 25, 04:14:15', network: 'Total Access Communication PLC.', apk: '',                               userIp: '1.46.18.9',        msisdn: '',    status: 'Block', reasons: ['MCPS-1300', 'AMCPS-1310'], interaction: 'false' },
  { id: 'ssk4335b6f923793e0d09b5b3932e09c719', time: 'Feb 25, 04:14:13', network: 'TRUE INTERNET Co.,Ltd.',          apk: '',                               userIp: '223.24.143.7',     msisdn: '',    status: 'Block', reasons: ['MCPS-1300', 'AMCPS-1310'], interaction: 'false' },
  { id: 'sskf290992608b1bb180dc6d2d0fa6ecdfc', time: 'Feb 25, 04:14:12', network: 'TRUE INTERNET Co.,Ltd.',          apk: '',                               userIp: '223.24.142.184',   msisdn: '',    status: 'Block', reasons: ['MCPS-1300', 'AMCPS-1310'], interaction: 'false' },
  { id: 'ssk5bfc5a96098427a75e09f296f5244de0', time: 'Feb 25, 04:14:11', network: 'Total Access Communication PLC.', apk: 'com.deepvision.shortdrama',    userIp: '1.46.29.92',       msisdn: '',    status: 'Block', reasons: ['MCPS-1300', 'AMCPS-1310'], interaction: 'false' },
  { id: 'sskc9b56cd3846f4e87dc4fddb9028ec2d6', time: 'Feb 25, 04:14:10', network: 'Total Access Communication PLC.', apk: '',                               userIp: '1.46.14.55',       msisdn: '',    status: 'Block', reasons: ['MCPS-2000'],               interaction: 'false' },
  { id: 'ssk1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6', time: 'Feb 25, 04:14:08', network: 'Zain Iraq Telecommunications',    apk: 'com.whatsapp',                  userIp: '185.22.143.12',    msisdn: '9647801234567', status: 'Block', reasons: ['MCPS-1300'], interaction: 'false' },
  { id: 'ssk9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l', time: 'Feb 25, 04:14:06', network: 'Asiacell Telecommunications',     apk: 'com.facebook.katana',           userIp: '94.200.115.33',    msisdn: '9647701234567', status: 'Block', reasons: ['AMCPS-1310'],interaction: 'false' },
];
