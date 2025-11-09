# Feature Specification: Canvas Shapes Toolbar

**Feature Branch**: `003-canvas-shapes-toolbar`  
**Created**: 2025-11-08  
**Status**: Draft  
**Input**: User description: "Add the ability to create content in the whiteboard canvas. Start with only basic shapes (rectangle, circle, line, text) and an eraser. Add a floating toolbar as a floating oval at the bottom of the canvas where users can select the desired action. The toolbar should include actions as well such as a hand for panning and zooming the canvas."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Draw Basic Shapes (Priority: P1)

As a user, I want to select a shape tool (rectangle, circle, line, or text) from a floating toolbar and draw that shape on the whiteboard canvas by clicking and dragging (or tapping and dragging on touch devices).

**Why this priority**: Drawing shapes is the core value of a whiteboard and enables all other content creation.

**Independent Test**: Can be fully tested by selecting each tool and drawing the corresponding shape on the canvas.

**Acceptance Scenarios**:
1. **Given** the canvas is empty, **When** the user selects the rectangle tool and drags on the canvas, **Then** a rectangle appears at the specified location and size.
2. **Given** the canvas is empty, **When** the user selects the circle tool and drags on the canvas, **Then** a circle appears at the specified location and size.
3. **Given** the canvas is empty, **When** the user selects the line tool and drags on the canvas, **Then** a line appears at the specified location and length.
4. **Given** the canvas is empty, **When** the user selects the text tool and clicks on the canvas, **Then** a text input appears and the entered text is placed at that location.

---

### User Story 2 - Erase Shapes (Priority: P2)

As a user, I want to select the eraser tool from the toolbar and remove shapes or text from the canvas by clicking/tapping on them.

**Why this priority**: Erasing is essential for correcting mistakes and managing content.

**Independent Test**: Can be fully tested by drawing a shape, selecting the eraser, and clicking/tapping the shape to remove it.

**Acceptance Scenarios**:
1. **Given** a shape exists on the canvas, **When** the user selects the eraser and clicks/taps the shape, **Then** the shape is removed from the canvas.
2. **Given** multiple shapes exist, **When** the user erases one, **Then** only the selected shape is removed and others remain.

---

### User Story 3 - Pan and Zoom Canvas (Priority: P3)

As a user, I want to select the hand tool from the toolbar to pan and zoom the canvas, so I can navigate and work on different areas.

**Why this priority**: Panning and zooming are critical for working on large or detailed whiteboards.

**Independent Test**: Can be fully tested by selecting the hand tool and panning/zooming the canvas with mouse/touch/trackpad.

**Acceptance Scenarios**:
1. **Given** the hand tool is active, **When** the user drags the canvas, **Then** the view pans accordingly.
2. **Given** the hand tool is active, **When** the user scrolls or pinches, **Then** the canvas zooms in or out.

---

### User Story 4 - Floating Toolbar (Priority: P1)

As a user, I want a floating oval toolbar at the bottom of the canvas that allows me to select between shape tools, eraser, and hand tool.

**Why this priority**: The toolbar is the main entry point for all actions and must be easily accessible.

**Independent Test**: Can be fully tested by verifying the toolbar is always visible, floating, and all tools are selectable.

**Acceptance Scenarios**:
1. **Given** the canvas is visible, **When** the user looks at the bottom, **Then** the toolbar is present as a floating oval.
2. **Given** the toolbar is visible, **When** the user selects a tool, **Then** that tool becomes active and the previous tool is deactivated.

---

## Functional Requirements

1. The canvas must allow users to create rectangles, circles, lines, and text.
2. The canvas must allow users to erase shapes/text with the eraser tool.
3. The canvas must allow users to pan and zoom using a hand tool.
4. A floating oval toolbar must be present at the bottom of the canvas, allowing tool selection.
5. The toolbar must include icons for each tool (rectangle, circle, line, text, eraser, hand).
6. Only one tool can be active at a time.
7. The UI must be accessible and responsive.

## Success Criteria

- Users can create each shape type and text on the canvas.
- Users can erase shapes/text with the eraser tool.
- Users can pan/zoom the canvas with the hand tool.
- The toolbar is always visible, floating at the bottom, and all tools are selectable.
- All actions are accessible via keyboard and screen reader.
- 95% of users in usability testing can complete basic drawing and erasing tasks without assistance.

## Key Entities

- **Shape**: type, position, size, color, text
- **Canvas**: list of shapes, pan/zoom state
- **Toolbar**: list of tools, active tool

## Assumptions

- Only basic shape creation is required (no grouping, layering, or advanced editing).
- No persistence or collaboration in this version.
- Toolbar floats above the canvas, does not obstruct drawing area.

### Edge Cases

- What happens if the user tries to draw outside the canvas bounds? The shape should be clipped to the visible area.

