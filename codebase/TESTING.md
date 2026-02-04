# Testing Patterns

**Analysis Date:** 2026-02-02

## Test Framework

**Runner:**
- React Scripts (via create-react-app)
- Config: Built-in configuration
- Command: `npm test` or `react-scripts test`

**Assertion Library:**
- Jest DOM testing utilities
- chai for additional assertions (not heavily used)
- Jest matchers for truthy, equality, etc.

**Test Libraries:**
- `@testing-library/react` for component testing
- `@testing-library/jest-dom` for DOM assertions
- `@testing-library/user-event` for user interaction simulation
- `lodash` for test utilities

**Run Commands:**
```bash
npm test                    # Run all tests
npm run test -- --watch    # Watch mode
npm run test -- --coverage  # Coverage report
```

## Test File Organization

**Location:**
- Co-located with source files (e.g., `utils.spec.js` alongside `utils.js`)
- Test files in same directory as implementation
- Naming convention: `[filename].spec.js`

**Naming:**
- Test files use `.spec.js` extension
- Test cases use descriptive names (e.g., "get returns data correctly")
- Nesting: `describe` blocks for modules, `it` blocks for tests

## Test Structure

**Suite Organization:**
```javascript
describe('utils', () => {
  describe('createCollection', () => {
    const test_data = [
      createDatum('item1'),
      createDatum('item2'),
    ];

    it('get returns data correctly', async () => {
      // Test implementation
      expect(result).toEqual(expected);
    });
  });
});
```

**Patterns:**
- Async/await pattern for promises
- beforeEach/afterEach for setup/teardown when needed
- Test data factories for complex objects
- Clear separation of concerns in test descriptions

## Mocking

**Framework:** Jest built-in mocks

**Patterns:**
```javascript
// Mock modules
jest.mock('some-module');

// Mock functions
const mockFunction = jest.fn();
mockFunction.mockReturnValue(mockValue);

// Timer mocks
jest.useFakeTimers();
jest.advanceTimersByTime(1000);
```

**What to Mock:**
- External dependencies (API calls, timers)
- DOM APIs (window, localStorage)
- Complex third-party libraries
- Functions with side effects

**What NOT to Mock:**
- Pure utility functions
- React components (test directly)
- Built-in JavaScript methods
- Redux store actions

## Fixtures and Factories

**Test Data:**
```javascript
function createDatum(item, id = uuidv4()) {
  return {
    id,
    item,
  };
}

const testData = [
  createDatum('item1'),
  createDatum('item2'),
];
```

**Location:**
- Test data created within test files
- No centralized test factory directory
- Helper functions for complex data generation

## Coverage

**Requirements:** Not strictly enforced
- No minimum coverage threshold set
- Coverage reports available via `--coverage` flag

**View Coverage:**
```bash
npm run test -- --coverage
```
- Shows coverage by file and by function
- Line coverage available in HTML report

## Test Types

**Unit Tests:**
- Focus: Individual functions and components in isolation
- Scope: Small, pure components
- Mocks: Heavy use of mocks for dependencies
- Examples: `utils.spec.js`, service layer tests

**Integration Tests:**
- Focus: Component interactions and data flow
- Scope: Multi-component scenarios
- Mocks: Minimal, real data when possible
- Examples: Component composition tests

**E2E Tests:**
- Framework: Not implemented
- Status: No end-to-end tests present
- Recommendation: Add Cypress or Playwright for E2E

## Common Patterns

**Async Testing:**
```javascript
it('returns data correctly', async () => {
  const result = await someAsyncFunction();
  expect(result).toEqual(expectedData);
});
```

**Error Testing:**
```javascript
it('handles errors gracefully', () => {
  expect(() => {
    throw new Error('Test error');
  }).toThrow('Test error');
});
```

**Component Testing:**
```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders with correct text', () => {
  render(<MyComponent />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

**Redux Testing:**
- No specific Redux testing patterns found
- Recommend: @testing-library/react-redux for provider testing
- Recommend: Redux mock store for action testing

**Test Utilities:**
- lodash for data manipulation in tests
- uuid for generating unique test IDs
- No custom test utilities library

## Testing Gaps

**Untested Areas:**
- Component integration
- User interaction flows
- Error scenarios
- Performance testing
- Accessibility testing

**Recommendations:**
1. Add integration tests for component compositions
2. Implement E2E tests for critical user flows
3. Add error boundary tests
4. Include accessibility tests
5. Set up minimum coverage thresholds

---

*Testing analysis: 2026-02-02*
```