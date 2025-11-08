# Quickstart Guide

## Running the Infinite Canvas App

1. **Install dependencies:**
	 ```bash
	 pnpm install
	 ```
2. **Start the development server:**
	 ```bash
	 pnpm dev --filter apps/web
	 ```
3. **Open the app:**
	 Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Component Documentation

### Canvas (`apps/web/src/components/Canvas.tsx`)
- **Purpose:** Infinite, pannable, zoomable canvas for whiteboarding.
- **Usage:**
	```tsx
	<Canvas />
	```
- **Props:** None (future extensibility planned).
- **Accessibility:**
	- Canvas is focusable and supports keyboard panning (arrow keys) and zooming (+/- keys).
	- ARIA roles and labels provided for assistive tech.
	- High-contrast focus ring for keyboard users.

### NavBar (`apps/web/src/components/NavBar.tsx`)
- **Purpose:** Standard top navigation bar for app actions.
- **Usage:**
	```tsx
	<NavBar />
	```
- **Props:** None (actions are internal for now).
- **Accessibility:**
	- All actions are reachable by Tab/Shift+Tab.
	- ARIA roles and labels for navigation and actions.
	- Visible focus indicators.

### SidePanel (`apps/web/src/components/SidePanel.tsx`)
- **Purpose:** Expandable left panel for tools and controls.
- **Usage:**
	```tsx
	<SidePanel open={open} onClose={handleClose} />
	```
- **Props:**
	- `open` (boolean): Whether the panel is expanded.
	- `onClose` (function): Callback to close the panel.
- **Accessibility:**
	- Hamburger button and panel are keyboard accessible.
	- Panel can be toggled with keyboard shortcut (default: Ctrl+\[).
	- ARIA roles, labels, and focus management for modal behavior.

---

## Testing & Validation

- Run unit tests:
	```bash
	pnpm test --filter apps/web
	```
- See `RESPONSIVE_CROSSBROWSER_CHECKLIST.md` and `CANVAS_PERFORMANCE_PROFILING.md` for manual test steps.

---

## Further Reading

- [Feature Spec](./spec.md)
- [Implementation Plan](./plan.md)
- [Tasks](./tasks.md)
- [Requirements Checklist](./checklists/requirements.md)
# UX Validation Plan & Demo Script

## Purpose
This section provides a step-by-step plan for validating the user experience (UX) of the Infinite Canvas feature, and a demo script for showcasing the feature to stakeholders. It ensures that all critical UX flows, accessibility, and polish requirements are met, as mandated by the project constitution and feature spec.

---

## UX Validation Plan

### 1. Environment Setup
- Ensure the app is running locally (`pnpm dev` in `apps/web`).
- Use a modern browser (Chrome, Firefox, Safari, Edge) and test on both desktop and mobile if possible.

### 2. Core Flows
- **Canvas Interaction:**
  - Pan the canvas with mouse/touch drag.
  - Zoom in/out with mouse wheel/pinch gesture.
  - Confirm smooth, responsive movement (60fps, <100ms input latency).
- **Nav Bar:**
  - Verify the top nav bar is visible, accessible, and does not obstruct the canvas.
  - Tab through nav actions; confirm ARIA roles and focus indicators.
- **Side Panel:**
  - Open/close the left side panel using the hamburger button (mouse and keyboard: Tab, Enter/Space, and shortcut).
  - Confirm panel expands/collapses smoothly and is accessible via keyboard and screen reader.

### 3. Accessibility
- Use keyboard only to navigate all interactive elements (Tab, Shift+Tab, Enter, Space, Escape).
- Use a screen reader (VoiceOver, NVDA, or ChromeVox) to verify ARIA labels, roles, and announcements.
- Confirm color contrast and focus visibility meet WCAG 2.1 AA.

### 4. Responsive & Cross-Browser
- Resize the window and test on mobile device emulators.
- Confirm layout adapts and all controls remain usable.
- Repeat core flows in Chrome, Firefox, Safari, and Edge.

### 5. Performance
- Pan/zoom rapidly and observe for jank or dropped frames.
- Use browser dev tools (Performance tab) to profile input latency and frame rate.

### 6. Error Handling & Edge Cases
- Attempt invalid actions (e.g., zoom out to min, pan far off-canvas) and confirm graceful handling.

---

## Demo Script

1. **Introduction**
	- "This is the Infinite Canvas feature, designed for seamless, accessible, and performant whiteboarding."
2. **Show the Canvas**
	- Pan and zoom the canvas, highlighting smoothness and infinite space.
3. **Nav Bar**
	- Point out the standard top nav bar, demonstrate keyboard navigation.
4. **Side Panel**
	- Open/close the left panel with mouse and keyboard, show shortcut.
5. **Accessibility**
	- Tab through all controls, show focus indicators, and (optionally) demonstrate with a screen reader.
6. **Responsive Design**
	- Resize window, show mobile layout, and repeat key actions.
7. **Performance**
	- Rapidly pan/zoom, open dev tools to show frame rate.
8. **Wrap Up**
	- "All flows are accessible, responsive, and performant as per our requirements."

---

## Acceptance Criteria
- All steps above can be completed without issue.
- Stakeholders can follow the demo script and observe all required behaviors.
- Any issues found are documented and addressed before sign-off.
# Quickstart: UI Infinite Canvas

## Prerequisites
- Node.js (LTS)
- pnpm (workspace root)

## Setup
```bash
pnpm install
```

## Running the Webapp
```bash
cd apps/web
pnpm dev
```

## Running Tests
```bash
# Unit/component tests
cd apps/web
pnpm test

# BDD/E2E tests
cd apps/bdd
pnpm test
```

## Development Notes
- The infinite canvas, nav bar, and left side panel are implemented in the web app (`apps/web`).
- UI state is managed client-side; no backend or persistent storage required for initial implementation.
- For UI changes, update or add components in `apps/web/src/components/`.
- For BDD/E2E, add scenarios in `apps/bdd/features/` and step definitions in `apps/bdd/step_definitions/`.
