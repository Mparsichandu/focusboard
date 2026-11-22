# AI Usage Disclosure

## Tools Used
- Gemini (AI Coding Assistant)

## Representative Prompts
1. "Break down the FocusBoard assignment requirements into a fast, rubric-aligned React + Vite component architecture."
2. "Create a custom `useLocalStorage` React hook that safely parses JSON and falls back to initial sample tasks without overwriting saved browser data."
3. "Provide responsive CSS media queries for FocusBoard covering 1440px desktop, 768px tablet, and 390px mobile bottom navigation without horizontal overflow."

## AI-Assisted Areas
- Initial component scaffolding (`Sidebar`, `Header`, `FocusNotes`, `TaskForm`, `TaskCard`, `FilterTabs`).
- Responsive CSS grid and mobile bottom navigation layout rules.
- Drafting documentation structure for `README.md`.

## Verified or Corrected Suggestion
- **What was checked and modified:** The initial AI draft used `window.confirm()` for task deletion and lacked keyboard `Escape` handling and ARIA dialog roles on the Create/Edit task modal. I replaced `window.confirm()` with a dedicated accessible `role="alertdialog"` confirmation modal and added `Escape` key listeners and focus management in `TaskForm.jsx` to meet the accessibility rubric criteria.
