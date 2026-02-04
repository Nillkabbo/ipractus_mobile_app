# Architecture

**Analysis Date:** 2026-02-02

## Pattern Overview

**Overall:** Component-based Redux architecture with React Router

**Key Characteristics:**
- Feature-based component organization
- Redux Toolkit for state management with persistence
- API abstraction layer with mock support
- Responsive design with Bootstrap integration
- Real-time features with Socket.IO

## Layers

**Presentation Layer:**
- Purpose: UI components and user interaction
- Location: `src/components/`
- Contains: React components organized by feature
- Depends on: Redux store, props, hooks
- Used by: React Router routes

**State Management:**
- Purpose: Centralized application state
- Location: `src/redux/`
- Contains: Redux slices, store configuration, reducers
- Depends on: API services, localStorage
- Used by: React components via selectors

**Service Layer:**
- Purpose: API communication and business logic
- Location: `src/services/`, `src/services-v2/`
- Contains: API clients, socket services, utilities
- Depends on: Axios, external APIs
- Used by: Redux thunks, components

**Utility Layer:**
- Purpose: Shared functions and helpers
- Location: `src/utils/`
- Contains: Common utilities, helpers, constants
- Depends on: Native JavaScript, external libraries
- Used by: All layers

**Assets Layer:**
- Purpose: Static resources and styling
- Location: `src/assets/`
- Contains: Images, fonts, styles, themes
- Depends on: Build system
- Used by: Components globally

## Data Flow

**User Action Flow:**

1. User interacts with UI component
2. Component dispatches Redux action
3. Redux middleware (thunk) may call API service
4. API service makes external request or returns cached data
5. Redux slice updates state
6. Components re-render via React-Redux connect
7. UI updates to reflect new state

**API Flow:**

1. Component or thunk calls API service method
2. API service creates Axios request with config
3. Request processed with authentication/headers
4. Response handled or error thrown
5. Data normalized and dispatched to Redux
6. State updates trigger UI re-render

**State Management:**
- Redux store with persisted auth/user data
- Thunk middleware for async operations
- Selectors for derived state
- Actions for state mutations

## Key Abstractions

**Redux Slice:**
- Purpose: Feature-specific state container
- Examples: `src/redux/container/authSlice.js`, `src/redux/container/teamSlice.js`
- Pattern: CreateSlice with reducers, thunks, selectors

**API Service:**
- Purpose: Centralized HTTP communication
- Examples: `src/services-v2/api.js`, `src/services/socket.service.js`
- Pattern: Axios instances with interceptors, mock support

**Component Hierarchy:**
- Purpose: Feature-based UI organization
- Examples: `src/components/page-components/teamProfile/`, `src/components/global-components/`
- Pattern: Feature folders with index.js exports

**Layout Component:**
- Purpose: Consistent application structure
- Examples: `src/components/global-components/AppLayout.js`
- Pattern: Wrapper with sidebar, navigation, content area

## Entry Points

**Application:**
- Location: `src/index.js`
- Triggers: React DOM render
- Responsibilities: Redux provider setup, root component mounting

**Root Component:**
- Location: `src/App.js`
- Triggers: Router rendering, theme setup
- Responsibilities: Route management, theme switching, online/offline detection

**Router Configuration:**
- Location: Not found (likely in Routes.js but missing)
- Triggers: Route-based rendering
- Responsibilities: Navigation, route protection, lazy loading

## Error Handling

**Strategy:** Centralized error handling with fallback UI

**Patterns:**
- Redux actions for error states
- Toast notifications for user feedback
- Fallback components for errors
- Retry mechanisms for failed requests

## Cross-Cutting Concerns

**Logging:** Console logging in development, structured logging integration possible
**Validation:** Form validation with Yup, input validation components
**Authentication:** JWT-based with Redux state persistence
**Internationalization:** Not implemented, hardcoded English strings
**Performance:** React.memo, useMemo where applicable, code splitting

---

*Architecture analysis: 2026-02-02*