# Codebase Structure

**Analysis Date:** 2026-02-02

## Directory Layout

```
sports-frontend/
├── src/                          # Source code
│   ├── assets/                   # Static assets (images, fonts, styles)
│   ├── components/               # React components
│   │   ├── common/              # Shared components
│   │   ├── global-components/    # App-wide layout components
│   │   └── page-components/     # Page-specific feature components
│   ├── redux/                    # Redux state management
│   │   ├── container/           # Feature slices
│   │   └── store/              # Store configuration
│   ├── services/                # API and external service integrations
│   │   └── services-v2/        # Modernized API layer
│   └── utils/                   # Utility functions and helpers
├── public/                      # Public static assets
└── scripts/                     # Build and deployment scripts
```

## Directory Purposes

**`src/assets/`:**
- Purpose: Static resources and styling assets
- Contains: Images, fonts, CSS/SCSS files
- Key files: `assets/scss/main.scss`, `assets/css/theme-colors.css`

**`src/components/`:**
- Purpose: React UI components organized by feature
- Contains: Feature-based component directories
- Key files:
  - `components/common/InlineSVG.js` - Shared SVG component
  - `components/global-components/AppLayout.js` - Main layout wrapper
  - `components/page-components/` - Feature-specific components

**`src/redux/`:**
- Purpose: Redux state management and configuration
- Contains: Feature slices, reducers, store setup
- Key files: `redux/store/configureStore.js`, `redux/store/reducers.js`

**`src/services/` & `src/services-v2/`:**
- Purpose: API communication and external integrations
- Contains: API clients, socket services, utilities
- Key files: `services-v2/api.js`, `services/socket.service.js`

**`src/utils/`:**
- Purpose: Shared utility functions and helpers
- Contains: Common JavaScript functions
- Key files: `utils/common.js`, `utils/user.js`, `utils/env.js`

## Key File Locations

**Entry Points:**
- `src/index.js`: Application entry point with Redux setup
- `src/App.js`: Root component with router and theme management

**Configuration:**
- `package.json`: Project dependencies and scripts
- `jsconfig.json`: JavaScript configuration
- `.prettierrc`: Code formatting rules

**Core Logic:**
- `src/redux/store/configureStore.js`: Redux store configuration
- `src/services-v2/api.js`: API service abstraction

**Testing:**
- No dedicated test directory found
- Test configuration in package.json

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `UserProfile.js`)
- Utilities: camelCase (e.g., `userUtils.js`)
- Slices: PascalCase (e.g., `authSlice.js`)

**Directories:**
- Feature-based: lowercase with hyphens (e.g., `team-profile`)
- Components: lowercase with hyphens (e.g., `global-components`)
- Utilities: lowercase (e.g., `utils`)

**Variables:**
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- Functions: camelCase (e.g., `fetchUserData`)
- Components: PascalCase (e.g., `UserProfile`)

## Where to Add New Code

**New Feature:**
- Primary code: `src/components/page-components/[feature-name]/`
- Tests: No standard location (testing not implemented)
- Redux slice: `src/redux/container/[feature-name]Slice.js`

**New Component/Module:**
- Implementation:
  - Shared: `src/components/common/[ComponentName].js`
  - Feature-specific: `src/components/page-components/[feature]/[ComponentName].js`
  - Global: `src/components/global-components/[area]/[ComponentName].js`

**Utilities:**
- Shared helpers: `src/utils/[helperName].js`
- API utilities: `src/services-v2/[helperName].js`

## Special Directories

**`src/components/page-components/`:**
- Purpose: Feature-based UI components
- Generated: No, manually created
- Committed: Yes
- Structure: Feature folders with index.js exports

**`src/redux/container/`:**
- Purpose: Redux feature slices
- Generated: No, manually created
- Committed: Yes
- Pattern: Feature-based slice organization

**`public/`:**
- Purpose: Static assets served directly
- Generated: No
- Committed: Yes
- Contains: favicon, manifest, static images

---

*Structure analysis: 2026-02-02*