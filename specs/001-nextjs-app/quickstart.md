# Quickstart: Whiteboard Next.js App

## Prerequisites
- Node.js (v18+ recommended)
- pnpm (v8+ recommended)

## Setup
1. Clone the repository and checkout the feature branch:
   ```bash
   git clone https://github.com/jondavid-black/whiteboard.git
   cd whiteboard
   git checkout 001-nextjs-app
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev --filter ./apps/web
   ```
4. Run tests:
   ```bash
   pnpm vitest run --filter ./apps/web
   ```

## Acceptance Criteria
- Landing page loads and displays MVP welcome message
- Header shows logo, name, and colors
- Responsive layout adapts to desktop, tablet, and mobile
- Navigation and branding are accessible
- All unit and accessibility tests pass

## Onboarding
- See `/apps/web/README.md` for setup and usage details
- See `/specs/001-nextjs-app/spec.md` for feature specification
- See `/specs/001-nextjs-app/tasks.md` for implementation checklist
# Quickstart: Initial NextJS App

## Prerequisites
- Node.js (latest LTS)
- pnpm (workspace root)

## Setup Steps
1. Clone the repository and checkout branch `001-nextjs-app`
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Navigate to the web app directory:
   ```bash
   cd apps/web
   ```
4. Run the development server:
   ```bash
   pnpm dev
   ```
5. Access the app at `http://localhost:3000`

## Testing
- Run unit tests:
  ```bash
  pnpm test
  ```
- Run BDD/e2e tests (if present):
  ```bash
  pnpm cucumber
  pnpm playwright test
  ```

## Notes
- The landing page should display whiteboard branding and be responsive.
- No user data or authentication is included in this MVP.
