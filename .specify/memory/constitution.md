<!--
Sync Impact Report

Version change: TEMPLATE → 1.0.0

Modified principles:
- [PRINCIPLE_1_NAME] → I. User Experience (UX First)
- [PRINCIPLE_2_NAME] → II. Quality: Testing & Tooling
- [PRINCIPLE_3_NAME] → III. Performance & Client-First Rendering
- [PRINCIPLE_4_NAME] → IV. Security & Dependency Minimalism
- [PRINCIPLE_5_NAME] → V. Monorepo, Documentation & Developer Experience

Added sections:
- Technology & Architecture
- Development Workflow & Quality Gates

Removed sections: none

Templates requiring updates:
- .specify/templates/plan-template.md ✅ updated
- .specify/templates/tasks-template.md ✅ updated
- .specify/templates/agent-file-template.md ✅ updated

Follow-up TODOs:
- None. All bracket placeholders replaced.
-->

# whiteboard Constitution

## Core Principles

### I. User Experience (UX First)

Every user-facing feature MUST prioritize a clean, decluttered interface, predictable
interactions, and accessible keyboard-driven controls (hot-keys). UI changes that
affect discoverability, layout, or interaction patterns MUST include a short UX
validation plan (user flow, keyboard/accessibility considerations, and a demo
script). Accessibility (WCAG basics) and keyboard navigation are non-negotiable.

Rationale: The whiteboard is interactive and visual; preserving clarity and
keyboard accessibility ensures broad usability and reduces support burden.

### II. Quality: Testing & Tooling

Quality is enforced through automated tooling and tests. The project MUST use
ESLint (with TypeScript, React, hooks, a11y plugins), Prettier (via
eslint-config-prettier), and the shared `eslint-config` package. Unit tests
MUST be written for each module (Vitest + React Testing Library); the project
maintains a minimum target of 75% unit test coverage. Feature-level BDD tests
(Cucumber.js + Playwright) are REQUIRED for primary user journeys.

Rationale: Automated linting and testing maintain code quality, reduce regressions,
and make refactors safe and low-risk.

### III. Performance & Client-First Rendering

The application MUST prioritize client-side interactivity: drawing, panning, and
real-time updates should be handled in the browser without blocking the main
thread. Performance goals (target frame rates, latency budgets) and profiling
steps MUST be specified in plans for any feature that touches rendering or
input. Releases MUST include performance regression checks for impacted areas.

Rationale: Real-time drawing and manipulation are core to the product; measurable
performance criteria ensure a responsive user experience.

### IV. Security & Dependency Minimalism

The project MUST minimize third-party dependencies and only accept libraries with
active maintenance and broad adoption. All dependencies MUST be reviewed in PRs
and included in the SBOM. Security scans (CodeQL, Dependabot alerts) MUST run
in CI and must be addressed before release. Input validation, least privilege,
and secure defaults are mandatory for server and client code handling user data.

Rationale: Reducing the dependency surface reduces risk and simplifies security
maintenance; automation catches regressions early.

### V. Monorepo, Documentation & Developer Experience

The repository is organized as a monorepo. Packages MUST follow the defined
structure (apps/, packages/) and share common config when applicable (ESLint,
build). Documentation is a first-class artifact (Nextra content). Every feature
MUST include doc updates (quickstart or feature-guides) where user-facing or
developer-facing behavior changes. Releases MUST use semantic versioning and
cannot proceed unless CI, lint, tests, and security gates pass.

Rationale: Centralized structure and documentation reduce onboarding friction
and make it easier to maintain consistency across packages.

## Technology & Architecture

This project uses TypeScript on Node.js with Next.js for the web application, React
with Material UI for UI components, and pnpm workspaces for monorepo management.
Shared packages live under `packages/` (example: `packages/ui`, `packages/eslint-config`).
Build, test, and release pipelines are implemented via GitHub Actions. SBOMs are
maintained using CycloneDX.

## Development Workflow & Quality Gates

Every change MUST follow the pull request workflow: provide a descriptive PR,
link the related spec/plan/tasks, and include updated docs/tests where required.
Before merge, the following gates MUST pass in CI:

- Linting (ESLint + Prettier)
- Unit tests with coverage (target: 75% project-level unit coverage; feature-level
	tests may require higher coverage)
- BDD/integration tests for impacted user journeys
- Security scans (CodeQL, Dependabot issues addressed or triaged)
- Performance/regression checks for changes that touch rendering or input

Plans and specs MUST include a "Constitution Check" section that records how the
proposal satisfies each relevant principle. Any violation of a principle MUST be
justified in the plan with a migration/mitigation strategy.

## Governance

Amendments to this constitution MUST be proposed as a documented pull request.
Each amendment PR MUST include:

- The proposed text change (diff of `.specify/memory/constitution.md`).
- A clear rationale and any migration steps required for existing code or docs.
- Tests or automation changes necessary to enforce the amendment.

Approval rules and versioning:

- Constitutional changes require at least one approving maintainer review and all
	CI gates to pass. (If more than one maintainer exists, project maintainers MAY
	require additional approvals — implementer to document approval policy).
- VERSIONING: The constitution itself follows semantic versioning:
	- MAJOR: Backwards-incompatible governance or principle removals/renames.
	- MINOR: Addition of a principle or material expansion of guidance.
	- PATCH: Clarifications, wording fixes, typos, and non-semantic refinements.

Compliance reviews:

- Feature plans (plan.md) and specs (spec.md) will include a Constitution Check
	and CI will verify that the necessary tests/lint/security checks are present.
- Exceptions are permitted only with a documented, short-lived justification and
	an associated mitigation plan.

**Version**: 1.0.0 | **Ratified**: 2025-11-07 | **Last Amended**: 2025-11-07

