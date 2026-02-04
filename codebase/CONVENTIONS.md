# Coding Conventions

**Analysis Date:** 2026-02-02

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `Card.js`, `Loading.js`)
- Utilities: camelCase (e.g., `common.js`, `user.js`)
- Services: camelCase (e.g., `api.js`)
- SCSS: kebab-case (e.g., `main.scss`)

**Functions:**
- Components: PascalCase (e.g., `function Loading()`)
- Utility functions: camelCase (e.g., `function debounce()`)
- React hooks: camelCase (e.g., `useState`, `useEffect`)
- Exported functions: camelCase (e.g., `export function createCollection()`)

**Variables:**
- React state: camelCase (e.g., `const [isOnline, setIsOnline]`)
- Local variables: camelCase (e.g., `const currentTheme`)
- Constants: UPPER_SNAKE_CASE (e.g., `const SAVE_INTERVAL_MS = 5000`)

**Types:**
- React components: PascalCase
- Custom hooks: camelCase starting with "use" (e.g., `useTheme`)
- Classes: PascalCase
- Interfaces: PascalCase (if TypeScript were used)

## Code Style

**Formatting:**
- Tool: Prettier
- Tab width: 2 spaces
- Use semicolons: true
- Quotes: Double quotes
- Trailing commas: ES5 style

**Indentation:**
- Use 2 spaces for indentation (tabs not used)
- Consistent indentation across all files

**Line Length:**
- No strict line length limit enforced
- Break lines for readability as needed

## Import Organization

**Order:**
1. React imports (e.g., `import React from "react"`)
2. Third-party library imports (e.g., `import { useState } from "react"`)
3. Internal imports (e.g., `import { getUser } from "./user"`)
4. Relative imports (e.g., `import Card from "../components/Card"`)

**Path Aliases:**
- Configured in `jsconfig.json` with `"baseUrl": "src"`
- Absolute imports from `src/` directory (e.g., `import Card from "components/Card"`)

**Grouping:**
- Related imports grouped together
- Each import on separate line

## Error Handling

**Patterns:**
- Try-catch blocks for async operations
- Error boundaries for React components
- Graceful fallback UI for error states
- Console.error for critical errors
- User-friendly error messages

**Example:**
```javascript
function Loading({ error, retry }) {
  if (error) {
    return (
      <div>
        Error! <button onClick={retry}>Retry</button>
      </div>
    );
  }
  // ... loading UI
}
```

## Logging

**Framework:** console.log, console.error
**Patterns:**
- Use console.log for debugging in development
- Use console.error for errors
- Remove or wrap debug logs in dev-only checks
- No structured logging framework implemented

## Comments

**When to Comment:**
- Complex business logic
- TODO items for future improvements
- Configuration explanations
- Non-obvious behavior

**JSDoc/TSDoc:**
- Used for utility functions and complex components
- Example:
```javascript
/**
 * Debounce function to limit rate of execution
 * @param {Function} func - Function to debounce
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, timeout = 500) {
  // ...
}
```

## Function Design

**Size:**
- Keep functions under 50 lines when possible
- Break down complex functions into smaller, focused functions
- Single responsibility principle

**Parameters:**
- Use destructuring for objects (e.g., `{ pastDelay, retry, timedOut }`)
- Default parameter values where appropriate
- Avoid more than 3-4 parameters when possible

**Return Values:**
- Use consistent return types
- For async functions, always return promises
- Return meaningful values (not just undefined)

## Module Design

**Exports:**
- Default export for components
- Named exports for utilities and constants
- Barrel files for grouping related exports (minimal use)

**Component Structure:**
```javascript
import React from 'react';

function ComponentName({ prop1, prop2 }) {
  // State
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);

  // Render
  return <div>{/* JSX */}</div>;
}

export default ComponentName;
```

**State Management:**
- Local state for component-specific data
- Redux Toolkit for global state
- Redux Persist for state persistence
- Memoization for performance optimization

---

*Convention analysis: 2026-02-02*
```