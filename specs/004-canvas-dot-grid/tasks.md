# Tasks: Canvas Dot Grid


## Phase 1: Foundational
- [ ] T003 Add CanvasGrid component scaffold in apps/web/src/components/CanvasGrid.tsx
- [ ] T004 Add grid rendering logic to CanvasGrid (dot spacing, color, visibility)
- [ ] T005 Integrate CanvasGrid into Canvas.tsx background layer

## Phase 2: User Story 1 - Visual Grid for Zoom (P1)
- [ ] T006 [US1] Implement dynamic dot spacing based on zoom level in CanvasGrid.tsx
- [ ] T007 [US1] Add unit tests for grid rendering and zoom responsiveness in CanvasGrid.test.tsx
- [ ] T008 [US1] Add accessibility attributes and keyboard navigation support for zoom controls in CanvasGrid.tsx
- [ ] T009 [US1] Document grid feature and usage in quickstart.md

## Phase 3: User Story 2 - Panning with Hand Tool (P2)
- [ ] T010 [US2] Implement panning logic for grid and content in Canvas.tsx
- [ ] T011 [US2] Add unit tests for panning and grid alignment in Canvas.test.tsx
- [ ] T012 [US2] Add BDD test for panning scenario in e2e/features/whiteboard.feature

## Phase 4: User Story 3 - Zooming with Mouse Wheel (P3)
- [ ] T013 [US3] Implement mouse wheel zoom and grid update in Canvas.tsx
- [ ] T014 [US3] Add unit tests for mouse wheel zoom in Canvas.test.tsx
- [ ] T015 [US3] Add BDD test for zooming scenario in e2e/features/whiteboard.feature

## Final Phase: Polish & Cross-Cutting
- [ ] T016 [P] Refactor CanvasGrid and Canvas for code clarity and maintainability
- [ ] T017 [P] Update documentation and usage examples in quickstart.md
- [ ] T018 [P] Review accessibility and keyboard navigation for all grid interactions
- [ ] T019 [P] Validate accessibility (WCAG) and add accessibility test in CanvasGrid.test.tsx
- [ ] T020 [P] Add performance profiling for grid and panning/zooming in CanvasGrid.tsx and Canvas.tsx
- [ ] T021 [P] Review SBOM/dependency list and update if new dependencies added
- [ ] T022 [P] Final code review and merge to main

## Dependencies
- User Story 1 tasks must be completed before User Story 2 and 3 tasks
- Foundational tasks must be completed before any user story tasks

## Parallel Execution Examples
- T016, T017, T018 can be executed in parallel after all user story tasks are complete

## Implementation Strategy
- MVP: Complete all User Story 1 tasks (T006-T009) for a basic, testable grid feature
- Incremental delivery: Add panning (US2) and zooming (US3) in subsequent phases

## Task Summary
- Total tasks: 22
- User Story 1: 4 tasks
- User Story 2: 3 tasks
- User Story 3: 3 tasks
- Parallel polish: 7 tasks
- Setup/foundational: 5 tasks
