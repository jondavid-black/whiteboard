# GitHub Copilot Instructions — Whiteboard

Purpose: Provide clear, repository-specific guidance so Copilot (and other
AI-assisted code suggestions) produce results that align with the project's
constitution and engineering expectations.

Primary rule: All generated code or suggestions MUST comply with the
`./.specify/memory/constitution.md` (the project constitution). When in doubt,
prefer conservative, testable, and well-documented changes.

## Quick contract (inputs / outputs / error modes)

- Inputs: feature description, plan/spec, open file context, or active editor file.
- Outputs: focused code suggestions, short patch proposals, small test cases,
  and suggested docs updates.
- Error modes: If required project context is missing (e.g., no plan or unclear
  storage path), Copilot MUST either (a) prompt for clarification, or (b)
  generate code guarded with TODO comments that describe the assumption.

## Hard rules (MUST / MUST NOT)

- MUST follow the Constitution principles in `/.specify/memory/constitution.md`:
  - UX-first: propose keyboard-accessible UI and accessibility bake-ins for
    user-facing components.
  - Quality: include unit tests (Vitest + React Testing Library) for new
    modules; aim for the project coverage target and add BDD scenarios for
    primary journeys when relevant.
  - Performance: for rendering/input code (canvas, event loops) include
    profiling guidance or non-blocking approaches.
  - Security: avoid introducing unvetted dependencies; if a new dependency is
    proposed, include a short justification and mention SBOM inclusion.
- MUST use the latest Node LTS at build time (do not hard-code older Node
  versions unless plan specifies a pinned version).
- MUST assume the container base is UBI (document exact tag in the plan).
- MUST assume file-backed storage with default mount `/var/lib/whiteboard/data`
  (plans may override with documented rationale).
- MUST write logs to stdout/stderr (no local-only logging assumptions).
- MUST provide Dockerfile-compatible container build instructions (Podman will
  be used to build/run in CI/deployment).
- MUST add or update documentation (Nextra docs / quickstart) for non-trivial
  changes that affect developer or user workflows.
- MUST NOT include secrets, API keys, credentials, or private tokens in any
  generated suggestion or example file.

## Best practices for suggestions

- Prefer small, reviewable diffs: keep changes limited to the minimum needed to
  implement the feature or fix.
- Always include at least one unit test for new logic. If UI code is added,
  include component tests that exercise behavior and accessibility where
  applicable.
- If proposing a new dependency, include a short justification block with:
  - Purpose of the dependency
  - Maintenance/activity rationale (e.g., widely used, actively maintained)
  - Any alternatives considered
- For containerization suggestions, include:
  - a small Dockerfile-compatible example snippet
  - expected build args or environment variables
  - recommended volumes (default `/var/lib/whiteboard/data`) and ports
- For deployment/run examples, favor Podman-compatible commands, but keep
  examples Dockerfile-compatible (e.g., `podman build -f Containerfile|Dockerfile ...`).

## Testing and CI expectations

- Any change that affects runtime behavior MUST update or include tests and
  mention relevant CI gates (lint, unit tests, BDD tests, security scans).
- Suggest test names and exact file paths (e.g., `apps/web/src/components/Button.test.tsx`).
- If a new plan or feature is required, the suggestion SHOULD include the
  `Constitution Check` section content to be added to `plan.md`.

## Templates and docs

- When generating or updating specs/plans, include the minimal `Constitution
  Check` entries required by the constitution (UX, Quality, Performance,
  Security, Documentation).
- When changing task or plan templates, ensure template text stays generic and
  does not reference a specific AI assistant (e.g., avoid agent names like
  "CLAUDE"). Use neutral phrasing: "the assistant" or "the speckit tool".

## When unsure — ask or safelist TODOs

- If a required detail is missing (e.g., exact mount path, Node LTS major),
  prefer to generate an assumption and label it clearly with `TODO(<FIELD>)`
  and an instruction on how to replace it.
- If asked to make a high-risk or wide-reaching change (e.g., large refactor,
  policy/gov change), prefer to generate a PR description + checklist rather
  than a direct mass-edit.

## Example short checklist for generated PRs

- [ ] Includes unit tests (Vitest) for new logic
- [ ] Updates docs/quickstart or relevant Nextra page if UX/behavior changed
- [ ] Mentions container base image and mount path if deployment affected
- [ ] Adds or updates `Constitution Check` in plan.md when applicable
- [ ] No secrets included

## Where to look for canonical guidance

- Constitution: `/.specify/memory/constitution.md`
- Plan template: `/.specify/templates/plan-template.md`
- Tasks template: `/.specify/templates/tasks-template.md`

## Footer

This file is advisory guidance to align Copilot's suggestions to project policy.
If you'd like, I can (a) convert these checks into a small linter script, or
(b) add a CI job that verifies `plan.md` files include a Constitution Check.
