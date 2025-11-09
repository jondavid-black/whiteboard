
# Implementation Plan: Canvas Shapes Toolbar


**Branch**: `003-canvas-shapes-toolbar` | **Date**: 2025-11-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-canvas-shapes-toolbar/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.


## Summary

Enable users to create content in the whiteboard canvas by drawing basic shapes (rectangle, circle, line, text) and erasing them, with a floating oval toolbar at the bottom for tool selection (including a hand tool for pan/zoom). Built using React, Next.js, and Material UI in the existing monorepo structure. No persistence or collaboration in this version.


## Technical Context

- **Language / Runtime**: TypeScript on Node.js (latest LTS)
- **Frameworks & Libraries**: Next.js, React, Material UI (MUI), pnpm workspaces
- **Storage**: Not required for this feature (no persistence)
- **Testing**: Vitest + React Testing Library (unit/component), Cucumber.js + Playwright (BDD/e2e); 75% unit test coverage target
- **Platform & Packaging**: Linux, Docker/Podman, UBI base image
- **Logging**: stdout/stderr (container-friendly)
- **Project Type**: Web app in monorepo (apps/, packages/)
- **Performance Goals**: 60fps target for canvas interactions, <100ms input latency for drawing/erasing, profiling with browser dev tools
- **Constraints**: Containerized, minimal dependencies, Linux runtime
- **Scale / Scope**: Single-user, no persistence, no collaboration


## Constitution Check

**User Experience (UX):**
- Toolbar and all tools are keyboard accessible and screen reader friendly
- Toolbar floats at bottom, does not obstruct drawing
- All actions have visible focus indicators and ARIA labels
- UX validation plan and demo script will be included

**Quality & Tooling:**
- ESLint, Prettier, and shared config enforced
- Unit tests for all new modules (75%+ coverage)
- BDD tests for primary user journeys (drawing, erasing, tool selection)

**Performance:**
- Target 60fps for canvas interactions
- <100ms input latency for drawing/erasing
- Profiling steps included in quickstart

**Security:**
- No new third-party dependencies beyond MUI
- All dependencies reviewed and SBOM updated
- CodeQL and Dependabot active

**Documentation & DX:**
- Quickstart and component docs updated
- Monorepo structure unchanged; new components in `apps/web/src/components/`

All constitution gates are met; no deviations required.

- User Experience (UX): Describe accessibility and keyboard/hotkey considerations,
  any UX validation steps, and changes to discoverability or layout.
- Quality & Tooling: List required linting, unit tests, coverage targets (project
  target: 75% unit coverage), and any BDD/integration tests for the user journeys.
- Performance: Provide performance goals or budgets (fps/latency) and profiling
  steps for features touching rendering or input.
- Security: List third-party dependencies introduced by the feature and the
  security review actions (SBOM entry, dependency vetting, CodeQL expectations).
- Documentation & DX: Indicate required documentation updates (quickstart, guides,
  or component docs) and package structure changes if any.

Any deviation from a principle MUST be justified and include a mitigation or
temporary exception plan.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Single project
/whiteboard
  |
  |-- /apps
  |    |
  |    |-- /web
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

**Structure Decision**: This project will be maintained as a single mono-repo.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
