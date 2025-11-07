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
