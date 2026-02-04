# Technology Stack

**Analysis Date:** 2026-02-02

## Languages

**Primary:**
- JavaScript ES6+ - Application logic throughout src/
- JSX - UI components in src/components/ and src/pages/
- SCSS - Styling in src/assets/scss/

**Secondary:**
- HTML - Template structures
- CSS - Component styling

## Runtime

**Environment:**
- Node.js 16+ - React development server
- Browser - Client-side execution

**Package Manager:**
- npm - Dependency management
- Lockfile: package-lock.json present

## Frameworks

**Core:**
- React 17.0.2 - UI framework
- React-DOM 17.0.2 - DOM rendering
- React Router 5.3.0 - Client-side routing

**State Management:**
- Redux 4.1.2 - State container
- Redux Toolkit 1.8.0 - Redux development toolkit
- Redux Thunk 2.4.1 - Async middleware
- Redux Persist 6.0.0 - State persistence

**UI Components:**
- Bootstrap 5.1.3 - CSS framework
- React Bootstrap 2.2.0 - Bootstrap components
- Styled Components 5.3.3 - CSS-in-JS
- Emotion 11.8.1 - CSS-in-JS library

**Testing:**
- Jest 27.0.6 - Testing framework
- React Testing Library 12.1.4 - React testing utilities
- @testing-library/jest-dom 5.16.2 - Jest DOM matchers

## Key Dependencies

**Critical:**
- Axios 0.24.0 - HTTP client for API calls
- Socket.io-client 4.4.1 - Real-time communication
- Redux Thunk 2.4.1 - Async actions

**Infrastructure:**
- AWS S3 integration via react-s3 1.3.1 - File storage
- Stripe 1.9.0 - Payment processing
- Socket.io 4.4.1 - Real-time features

## Configuration

**Environment:**
- .env.example configuration with:
  - REACT_APP_BASE - Base URL
  - REACT_APP_API_BASE - API endpoint
  - REACT_APP_S3AWS - S3 bucket URL
  - REACT_APP_GOOGLE_MAP_KEY - Google Maps API
  - AWS credentials for S3

**Build:**
- React Scripts 5.0.0 - Build tooling
- ESLint - Code linting
- Prettier 2.7.1 - Code formatting
- SASS 1.49.9 - CSS preprocessor

## Platform Requirements

**Development:**
- Node.js 16+
- npm

**Production:**
- Modern browser support (Chrome, Firefox, Safari)
- Content delivery network (CDN) support

---

*Stack analysis: 2026-02-02*
```