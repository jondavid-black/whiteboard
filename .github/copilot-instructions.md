# whiteboard Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-11-08

## Constitution Alignment

This document and the generated guidance are intended to align with the
project constitution at `.specify/memory/constitution.md`. Active plans should
record how they satisfy the constitution's principles (UX, Quality, Performance,
Security, Documentation). Any plan that cannot meet a principle MUST include a
short-lived mitigation in the plan and a follow-up task to resolve the gap.

## Active Technologies

- (002-ui-infinite-canvas)

## Project Structure

```text
# Single project
/whiteboard
  |
  |-- /apps
  |    |
  |    |-- /web             <-- Your NextJS whiteboard web application
  |    |    |-- /src
  |    |    |    |-- /components
  |    |    |    |    |-- Header.tsx
  |    |    |    |    |-- Header.test.tsx  <-- (Unit Test)
  |    |    |-- vitest.config.ts
  |    |    |-- next.config.js
  |    |    |-- package.json
  |    |
  |    |-- /docs            <-- Your Nextra documentation site
  |         |-- package.json
  |         |-- next.config.js (configured for Nextra)
  |         |-- /content
  |              |-- _meta.json
  |              |-- index.mdx
  |              |-- getting-started.mdx
  |    |
  |    |-- /e2e                  <-- BDD/E2E Tests
  |         |-- /features         <-- Your Gherkin .feature files
  |         |    |-- whiteboard.feature
  |         |
  |         |-- /steps            <-- Your TypeScript step definitions
  |         |    |-- whiteboard.steps.ts
  |         |
  |         |-- package.json      <-- Has Cucumber & Playwright deps
  |         |-- cucumber.js       <-- Cucumber config
  |         |-- playwright.config.ts  <-- Playwright config
  |
  |-- /packages
  |    |-- /ui
  |    |    |-- /src
  |    |    |    |-- Button.tsx
  |    |    |    |-- Button.test.tsx   <-- (Component Test)
  |    |    |-- vitest.config.ts
  |    |    |-- package.json
  |    |
  |    |-- /eslint-config
  |
  |-- package.json
  |-- pnpm-workspace.yaml
```

## Commands

# Add commands for 

## Code Style

: Follow standard conventions

## Recent Changes

- 002-ui-infinite-canvas: Added

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
