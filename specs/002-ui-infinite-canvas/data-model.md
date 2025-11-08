# Data Model: UI Infinite Canvas

## Entities

### Canvas
- Description: The main interactive area of the webapp.
- Attributes:
  - id: string (unique identifier)
  - content: (future scope, e.g., array of drawable objects)
  - panPosition: { x: number, y: number }
  - zoomLevel: number
- Relationships: None (for initial UI-only scope)

### NavBar
- Description: Standard navigation bar spanning the top of the page.
- Attributes:
  - items: array of { label: string, action: string }
  - visible: boolean
- Relationships: None

### SidePanel
- Description: Expandable/collapsible panel on the left, triggered by hamburger button.
- Attributes:
  - open: boolean
  - content: (future scope, e.g., tools/settings)
- Relationships: None

## Validation Rules
- Canvas must always fill the available screen area.
- NavBar must always be visible and accessible.
- SidePanel must only be open when triggered by the hamburger button.

## State Transitions
- SidePanel: closed → open (on hamburger click), open → closed (on hamburger click or outside click)
- Canvas: pan/zoom state updates on user interaction

## Data Volume / Scale Assumptions
- No persistent data for initial UI scope; all state is client-side and ephemeral.
- Future scope: support for large numbers of drawable objects and real-time collaboration.
