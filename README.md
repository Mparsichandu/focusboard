# FocusBoard

A responsive, single-user task management dashboard built with **React**, **Vite**, and **Lucide React** based on the FocusBoard Figma design specification.

## Live Demo & Repository
- **Hosted Application URL:** `<ADD_YOUR_VERCEL_OR_NETLIFY_URL_HERE>`
- **GitHub Repository:** `<ADD_YOUR_GITHUB_REPO_URL_HERE>`

## Key Features Implemented
- **Dashboard Overview & Derived Statistics:** Real-time calculation of Total Tasks, In-Progress Tasks, Completed Tasks, and Completion Percentage without hardcoded values.
- **3-Slide Focus Notes Carousel:** Interactive carousel featuring all three Figma Focus Notes slides (`Make today count.`, `Small steps, big progress.`, and `Celebrate the wins.`) with Previous/Next controls and clickable slide indicators.
- **Full Task CRUD Operations:** Create new tasks with validation, edit existing tasks in a reusable modal form, update task statuses inline (`To do`, `In progress`, `Completed`), and delete tasks with confirmation.
- **Combined Search & Filtering:** Case-insensitive title search paired with status tabs (`All`, `To do`, `In progress`, `Completed`) and priority filtering (`All`, `High`, `Medium`, `Low`).
- **Browser Persistence (`localStorage`):** Automatically saves all task changes under `focusboard_tasks` and initializes with 6 sample tasks only on first visit.
- **Responsive & Accessible UI:** Tested across `1440px` (Desktop), `768px` (Tablet), and `390px` (Mobile) with semantic HTML, ARIA attributes, and keyboard support.

## Project Structure
```text
focusboard/
├── public/
├── screenshots/
├── src/
│   ├── components/
│   │   ├── FilterTabs.jsx
│   │   ├── FocusNotes.jsx
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
│   ├── data/
│   │   └── sampleTasks.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── AI_USAGE.md
├── README.md
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## State Management & Persistence Choice
FocusBoard uses **React built-in Hooks (`useState`, `useMemo`, `useEffect`)** combined with a custom `useLocalStorage` hook in `App.jsx` as the single source of truth. Because this is a single-user dashboard without multi-route nested prop drilling, local React state keeps mutations immutable and predictable while derived values (overview statistics and filtered task lists) are computed automatically via `useMemo` whenever `tasks`, `searchQuery`, `statusFilter`, or `priorityFilter` change.

## Scope & Placeholders
In accordance with the assessment scope, secondary sidebar navigation items (`My tasks`, `Calendar`, `Settings`) and the header notification bell act as visual layout placeholders while keeping focus on the single-screen dashboard and 3-slide Focus Notes carousel.
