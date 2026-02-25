# MCP Shield — Professional React Architecture

## Quick Start

```bash
npm install
npm run dev
```

---

## Project Structure

```
mcp-shield/
├── index.html                   # Vite HTML entry, loads fonts
├── vite.config.js               # Vite + React plugin, @ alias
├── package.json
│
└── src/
    ├── main.jsx                 # ReactDOM root, imports global CSS
    ├── App.jsx                  # Root component — owns role + page state
    │
    ├── constants/               # Pure configuration — no JSX, no side-effects
    │   ├── colors.js            # Brand palette + semantic color maps
    │   └── nav.js               # NAV_GROUPS config, ALL_PAGES, groupsForRole()
    │
    ├── data/                    # Mock / seed data (swap for API calls later)
    │   ├── charts.js            # histogramData, blockReasons, blockLegend, repTrend
    │   └── tables.js            # blkRows, apkRows, userRows, svcRows, repReports, channelCards
    │
    ├── styles/
    │   └── global.css           # Reset, scrollbar, animations, utility classes
    │
    ├── components/
    │   ├── ui/                  # Reusable, context-free primitives
    │   │   ├── Card.jsx
    │   │   ├── SectionTitle.jsx
    │   │   ├── Badge.jsx
    │   │   ├── StatusDot.jsx
    │   │   ├── ChartTooltip.jsx
    │   │   └── index.js         # Barrel export
    │   │
    │   └── charts/              # Domain chart components
    │       ├── TaperedGauge.jsx # SVG arc gauge
    │       ├── TinyDonut.jsx    # Recharts mini donut
    │       └── index.js         # Barrel export
    │
    ├── layout/                  # Structural / chrome components
    │   ├── TopNav.jsx           # Sticky header with tabs + dropdowns
    │   ├── FilterSidebar.jsx    # Left-hand filter panel
    │   └── AppLayout.jsx        # Composes TopNav + FilterSidebar + breadcrumb
    │
    ├── pages/                   # One file per route
    │   ├── Overview.jsx
    │   ├── Blocking.jsx
    │   ├── APKs.jsx
    │   ├── Reporting.jsx
    │   ├── Users.jsx
    │   ├── Services.jsx
    │   └── Stub.jsx             # Placeholder for future pages
    │
    └── routes/
        └── index.jsx            # ROUTES map + PageRouter component + aliases
```

---

## Architectural Decisions

### Role-based Navigation
Navigation is data-driven via `src/constants/nav.js`. Each nav item declares a `roles` array.
`groupsForRole(role)` filters the config at render time — no conditional JSX scattered
across components.

### Single Source of Truth for State
`App.jsx` owns `role` and `page`. A single `handleNav(page, role?)` handler is threaded
through `AppLayout → TopNav`, so the role switcher and normal page links share one code path.

### Separation of Concerns

| Layer          | Responsibility                                      |
|----------------|-----------------------------------------------------|
| `constants/`   | Static config — colors, nav shape                  |
| `data/`        | Mock data — trivially swappable with API calls     |
| `styles/`      | Global CSS — resets, animations, utility classes   |
| `components/ui`| Atomic UI primitives (no business logic)           |
| `components/charts` | Recharts wrappers with domain knowledge       |
| `layout/`      | Page chrome — nav, sidebar, breadcrumb             |
| `pages/`       | Full page compositions                             |
| `routes/`      | Route map + resolver (no React Router dependency)  |

### Replacing Mock Data with a Real API
Every page imports from `src/data/`. To wire up a real API:

```js
// Before (mock)
import { userRows } from '../data/tables';

// After (API hook)
import { useUsers } from '../hooks/useUsers';
const { data: userRows, loading } = useUsers();
```

No changes needed in the UI layer.

### Adding a New Page
1. Create `src/pages/MyPage.jsx`
2. Add an entry to `src/routes/index.jsx` → `ROUTES`
3. Add a nav item to `src/constants/nav.js` → `NAV_GROUPS` with appropriate `roles`
4. Done — no changes needed anywhere else.
