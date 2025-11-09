# Tasks: Canvas Shapes Toolbar

## Phase 1: User Story 1 - Draw Basic Shapes (P1)
- [ ] T007 [US1] Implement rectangle drawing tool in apps/web/src/components/Canvas.tsx
- [ ] T008 [US1] Implement circle drawing tool in apps/web/src/components/Canvas.tsx
- [ ] T009 [US1] Implement line drawing tool in apps/web/src/components/Canvas.tsx
- [ ] T010 [US1] Implement text tool (input and placement) in apps/web/src/components/Canvas.tsx
- [ ] T011 [P] [US1] Add unit tests for shape drawing in apps/web/src/components/Canvas.test.tsx

## Phase 2: User Story 2 - Erase Shapes (P2)
- [ ] T012 [US2] Implement eraser tool in apps/web/src/components/Canvas.tsx
- [ ] T013 [P] [US2] Add unit tests for eraser tool in apps/web/src/components/Canvas.test.tsx

## Phase 3: User Story 3 - Pan and Zoom Canvas (P3)
- [ ] T014 [US3] Implement hand tool for panning in apps/web/src/components/Canvas.tsx
- [ ] T015 [US3] Implement zoom in/out (mouse, touch) in apps/web/src/components/Canvas.tsx
- [ ] T016 [P] [US3] Add unit tests for pan/zoom in apps/web/src/components/Canvas.test.tsx

## Phase 4: User Story 4 - Floating Toolbar (P1)
- [ ] T017 [US4] Implement floating oval toolbar in apps/web/src/components/Toolbar.tsx
- [ ] T018 [US4] Add tool selection logic and UI in apps/web/src/components/Toolbar.tsx
- [ ] T019 [P] [US4] Add unit tests for toolbar in apps/web/src/components/Toolbar.test.tsx

## Final Phase: Polish & Cross-Cutting Concerns
- [ ] T020 Add accessibility (ARIA, keyboard navigation) to toolbar and canvas in apps/web/src/components/Toolbar.tsx and Canvas.tsx
- [ ] T021 Add documentation for new components in apps/web/README.md
- [ ] T022 Update SBOM and dependency documentation in root README.md

## BDD/E2E & Accessibility Validation
- [ ] T023 [P] [US1] Add BDD/e2e test for drawing shapes in apps/bdd/features/canvas-shapes.feature
- [ ] T024 [P] [US2] Add BDD/e2e test for erasing shapes in apps/bdd/features/canvas-shapes.feature
- [ ] T025 [P] [US3] Add BDD/e2e test for pan/zoom in apps/bdd/features/canvas-shapes.feature
- [ ] T026 [P] [US4] Add BDD/e2e test for toolbar selection in apps/bdd/features/canvas-shapes.feature
- [ ] T027 [P] Add accessibility validation test for toolbar and canvas in apps/web/src/components/Canvas.test.tsx

## Dependencies
- US1 and US4 are both P1 and can be developed in parallel after foundational tasks
- US2 depends on US1 completion
- US3 depends on US1 completion
- Polish phase depends on all user stories

## Parallel Execution Examples
- T005 (utils) and T006 (toolbar state) can be done in parallel
- T007–T010 (shape tools) can be developed in parallel with T017–T018 (toolbar UI)
- All [P] marked test tasks can be run in parallel with their implementation

## Implementation Strategy
- MVP: Complete US1 (basic shapes) and US4 (toolbar) for first demo
- Incremental: Add eraser (US2), then pan/zoom (US3), then polish

## Format Validation
- All tasks use strict checklist format: `- [ ] T001 [P] [US1] Description with file path`
- Each user story phase is independently testable
- All tasks have unique IDs and file paths
