# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Language / Runtime**: TypeScript on Node.js — use the latest Node LTS at build
time (project-level package.json and CI should pin to the current LTS during a
release build).

**Primary Frameworks & Libraries**: Next.js, React, Material UI (MUI). Use pnpm
workspaces for monorepo package management. Shared packages live under
`packages/` (example: `packages/ui`, `packages/eslint-config`).

**Storage**: File-based storage persisted to a host-mounted volume. Default
container path: `/var/lib/whiteboard/data` (plans may override but MUST document
the chosen path and mount configuration). Do not rely on ephemeral container
filesystem for durable data.

**Testing**: Vitest + React Testing Library for unit/component tests; Cucumber.js
and Playwright for BDD/e2e scenarios. Project target: 75% unit test coverage as
a baseline; feature-level BDD tests required for primary user journeys.

**Target Platform & Packaging**: Linux target platform. The application will be
packaged as a single container image using a Dockerfile-compatible build and
run with Podman. Use UBI (Red Hat Universal Base Image) as the container base
image; the build should install the Node LTS runtime or use a UBI Node image if
available. Plans touching deployment MUST document the container base image tag,
startup command, required volumes, runtime user, and any capabilities.

**Logging**: Applications MUST write logs to stdout/stderr (container-friendly
logging). Do not rely on container-local files for log capture.

**Project Type**: Web application in a monorepo (apps/, packages/).

**Performance Goals**: For features that touch rendering or input (whiteboard
canvas, interactions) include target frame rates, input latency budgets, and any
profiling steps; leave unspecified here unless the plan declares concrete goals.

**Constraints**: Containerized deployment (Podman), file-backed storage (host
volume at `/var/lib/whiteboard/data` by default), Linux runtime assumptions, and
minimal third-party dependencies per constitution.

**Scale / Scope**: Define expected concurrent users and data retention per plan.
If unknown, mark as NEEDS CLARIFICATION.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

This plan MUST include a short "Constitution Check" describing how the proposal
meets each relevant principle in `.specify/memory/constitution.md`. At minimum,
address the following gates when applicable:

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
  |    |-- /web            <-- Your Nextra documentation site
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
