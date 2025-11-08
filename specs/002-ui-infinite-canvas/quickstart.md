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
