# Codebase Structure

**Analysis Date:** 2025-02-05

## Directory Layout

```
[project-root]/
├── src/                    # Main source code
│   ├── components/         # Reusable UI components
│   ├── config/            # Configuration files
│   ├── constants/         # App constants (colors, routes, etc.)
│   ├── contexts/          # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── navigators/        # Navigation configuration
│   ├── screens/           # Screen components by feature
│   │   ├── auth/          # Authentication screens
│   │   ├── dashboard/     # Dashboard screens
│   │   ├── feed/          # Feed screens
│   │   ├── onboarding/    # Onboarding screens
│   │   └── profile/       # Profile screens
│   ├── services/          # API and data services
│   │   ├── auth/          # Authentication services
│   │   └── storage/       # Storage services
│   ├── theme/             # Theme system
│   │   └── components/    # Themed components
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions (empty)
├── assets/                # Static assets
├── .expo/                 # Expo build cache (generated)
├── .planning/             # Planning documents
├── codebase/              # Existing codebase analysis docs
├── demo/                  # Demo assets
├── node_modules/          # Dependencies (generated)
├── App.tsx                # Main app component
├── index.ts               # Expo entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript config
├── app.json               # Expo app config
└── babel.config.js        # Babel configuration
```

## Directory Purposes

**src/components/:**
- Purpose: Reusable UI components not tied to specific screens
- Contains: Button, TextInput, Avatar components
- Key files: `src/components/Button.tsx`, `src/components/TextInput.tsx`, `src/components/Avatar.tsx`

**src/config/:**
- Purpose: Configuration objects and settings
- Contains: Theme configuration
- Key files: `src/config/theme.ts`

**src/constants/:**
- Purpose: App-wide constants (design tokens, routes)
- Contains: Colors, typography, spacing, indices, route definitions
- Key files: `src/constants/colors.ts`, `src/constants/routes.ts`, `src/constants/typography.ts`, `src/constants/spacing.ts`, `src/constants/indices.ts`

**src/contexts/:**
- Purpose: React Context providers for global state
- Contains: AuthContext, ThemeContext
- Key files: `src/contexts/AuthContext.tsx`, `src/contexts/ThemeContext.tsx`

**src/hooks/:**
- Purpose: Custom React hooks for reusable stateful logic
- Contains: useAuth, useTheme, useBiometric
- Key files: `src/hooks/useAuth.ts`, `src/hooks/useTheme.ts`, `src/hooks/useBiometric.ts`

**src/navigators/:**
- Purpose: Navigation stack configuration
- Contains: RootNavigator, AuthNavigator, AppNavigator
- Key files: `src/navigators/RootNavigator.tsx`, `src/navigators/AuthNavigator.tsx`, `src/navigators/AppNavigator.tsx`

**src/screens/:**
- Purpose: Screen components organized by feature area
- Contains: Feature-organized screen directories
- Key files:
  - `src/screens/auth/LoginScreen.tsx`, `src/screens/auth/SignupScreen.tsx`, `src/screens/auth/WelcomeScreen.tsx`, `src/screens/auth/RoleSelectionScreen.tsx`, `src/screens/auth/ForgotPasswordScreen.tsx`, `src/screens/auth/OtpVerificationScreen.tsx`, `src/screens/auth/SplashScreen.tsx`
  - `src/screens/dashboard/DashboardScreen.tsx`, `src/screens/dashboard/SettingsScreen.tsx`, `src/screens/dashboard/FeedPlaceholderScreen.tsx`, `src/screens/dashboard/LivePlaceholderScreen.tsx`, `src/screens/dashboard/MessagesPlaceholderScreen.tsx`, `src/screens/dashboard/ProfilePlaceholderScreen.tsx`
  - `src/screens/profile/EditProfileScreen.tsx`, `src/screens/profile/PrivacySettingsScreen.tsx`, `src/screens/profile/ProfileScreen.tsx`
  - `src/screens/onboarding/SetupProfileScreen.tsx`
  - `src/screens/feed/SocialFeedScreen.tsx`

**src/services/:**
- Purpose: Business logic, API calls, data persistence
- Contains: Auth services, Storage services
- Key files: `src/services/auth/mockAuth.ts`, `src/services/storage/asyncStorage.ts`, `src/services/storage/secureStorage.ts`

**src/theme/:**
- Purpose: Theme system with multi-theme support
- Contains: Theme definitions, ThemeProvider, themed components
- Key files: `src/theme/index.ts`, `src/theme/ThemeProvider.tsx`, `src/theme/components/ThemedButton.tsx`, `src/theme/components/index.ts`

**src/types/:**
- Purpose: TypeScript type definitions
- Contains: Auth types, navigation types
- Key files: `src/types/auth.ts`, `src/types/navigation.ts`

**src/utils/:**
- Purpose: Utility and helper functions
- Contains: Empty (no files yet)

**assets/:**
- Purpose: Static images and fonts
- Contains: Icon, favicon, adaptive icon, splash screen images

**.planning/:**
- Purpose: Project planning and phase documents
- Contains: Config, phases, navigation, research directories
- Generated: No (committed to git)

**codebase/:**
- Purpose: Existing codebase analysis documents (ARCHITECTURE.md, STACK.md, etc.)
- Contains: Codebase analysis markdown files
- Generated: No (committed to git)

**demo/:**
- Purpose: Demo assets and screenshots
- Contains: Screenshots from Stitch design system
- Generated: No (committed to git)

## Key File Locations

**Entry Points:**
- `index.ts`: Expo registration entry point
- `App.tsx`: Main app component with provider setup

**Configuration:**
- `app.json`: Expo app configuration (bundle ID, permissions, etc.)
- `tsconfig.json`: TypeScript compiler configuration
- `babel.config.js`: Babel transpilation configuration
- `package.json`: Dependencies and npm scripts

**Core Logic:**
- `src/contexts/`: Global state management
- `src/services/`: Business logic and API calls
- `src/hooks/`: Custom React hooks
- `src/navigators/`: App navigation structure

**Testing:**
- No test files present yet
- No test configuration files

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `Button.tsx`, `LoginScreen.tsx`, `RootNavigator.tsx`)
- Utilities/services: camelCase (e.g., `mockAuth.ts`, `asyncStorage.ts`)
- Constants: camelCase (e.g., `colors.ts`, `routes.ts`, `typography.ts`)
- Types: camelCase (e.g., `auth.ts`, `navigation.ts`)

**Directories:**
- Feature-based grouping: lowercase plural (e.g., `components/`, `screens/`, `hooks/`)
- Screen subdirectories: feature name lowercase (e.g., `auth/`, `dashboard/`, `profile/`)

**React Components:**
- Named exports: `export const Button: React.FC<Props> = () => {...}`
- Component files: PascalCase matching component name

**Constants:**
- SCREAMING_CAPS for route constant objects: `AUTH_ROUTES`, `TAB_ROUTES`
- camelCase for design token objects: `colors`, `typography`, `spacing`

**Services:**
- camelCase with descriptive names: `mockAuth`, `asyncStorage`, `secureStorage`
- Service methods: camelCase verbs: `login`, `register`, `getItem`, `setItem`

**Hooks:**
- 'use' prefix: `useAuth`, `useTheme`, `useBiometricAuth`

**Types/Interfaces:**
- PascalCase: `User`, `AuthTokens`, `ThemeColors`, `ButtonProps`
- Props interfaces: Component name + 'Props' suffix

## Where to Add New Code

**New Auth Screen:**
- Primary code: `src/screens/auth/[ScreenName]Screen.tsx`
- Add route constant to `src/constants/routes.ts` in AUTH_ROUTES
- Import and add to AuthNavigator in `src/navigators/AuthNavigator.tsx`

**New App Screen (tab):**
- Primary code: `src/screens/[feature]/[ScreenName]Screen.tsx`
- Add route constant to `src/constants/routes.ts`
- Add nested stack to `src/navigators/AppNavigator.tsx` if needed
- Add tab to Tab.Navigator if top-level tab

**New Component:**
- Implementation: `src/components/[ComponentName].tsx`
- Props interface: `[ComponentName]Props` in same file
- Export: `export const [ComponentName]: React.FC<Props>`

**New Service:**
- Implementation: `src/services/[feature]/[serviceName].ts`
- Follow mock pattern for development, replace with real API later
- Export service object with async methods

**New Hook:**
- Implementation: `src/hooks/use[HookName].ts`
- Export hook function and optionally re-export from context if related

**New Storage Keys:**
- Add to `src/services/storage/asyncStorage.ts` (PREF_KEYS) for non-sensitive
- Add to `src/services/storage/secureStorage.ts` (AUTH_KEYS) for sensitive

**New Theme Variant:**
- Add to `src/theme/index.ts` following existing pattern
- Add ThemeType to union type
- Create theme object with all required properties

**New Type Definition:**
- Add to `src/types/[domain].ts` (e.g., `auth.ts`, `navigation.ts`)
- Export interface and type definitions

**Utilities:**
- Add to `src/utils/[utilityName].ts` (directory currently empty)

## Special Directories

**node_modules/:**
- Purpose: NPM dependencies
- Generated: Yes
- Committed: No (in .gitignore)

**.expo/:**
- Purpose: Expo build cache and web development files
- Generated: Yes
- Committed: No

**.planning/:**
- Purpose: GSD command planning documents
- Generated: No
- Committed: Yes

**codebase/:**
- Purpose: Existing codebase analysis from earlier mapping
- Generated: No
- Committed: Yes

**demo/:**
- Purpose: Demo materials and screenshots
- Generated: No
- Committed: Yes

---

*Structure analysis: 2025-02-05*
