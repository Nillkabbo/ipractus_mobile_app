# Onboarding Flow Documentation

## Overview
New user onboarding sequence that guides users from initial app launch to their first session.

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ONBOARDING FLOW                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐        │
│  │   Welcome    │───▶│ Choose Role  │───▶│  Setup       │        │
│  │   to iPractus│    │  (Step 1/4)  │    │  Your        │        │
│  └──────────────┘    └──────────────┘    │  Profile     │        │
│                                           └──────────────┘        │
│                                                    │                │
│                                                    ▼                │
│                                           ┌──────────────┐        │
│                                           │  OTP         │        │
│                                           │  Verification│        │
│                                           └──────────────┘        │
│                                                    │                │
│                                                    ▼                │
│                                           ┌──────────────┐        │
│                                           │  Success/    │        │
│                                           │  Achievement │        │
│                                           └──────────────┘        │
│                                                    │                │
│                                                    ▼                │
│                                           ┌──────────────┐        │
│                                           │   Main App   │        │
│                                           │   (Feed)     │        │
│                                           └──────────────┘        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Screen Details

### 1. Welcome to iPractus
**File:** `welcome_to_ipractus.html`

**Purpose:** App splash screen with welcome message

**Key Elements:**
- Logo/Branding
- Welcome headline
- "Get Started" or "Sign Up" CTA
- "Already have an account? Sign In" link

**Navigation:**
- Forward: Choose Your Role

**State:** None (entry point)

---

### 2. Choose Your Role (Step 1 of 4)
**Files:**
- `choose_your_role.html` (iPractus design)
- `pistachio_onboarding__system_v2.html` (Pistachio design)

**Purpose:** Select user type to personalize experience

**Key Elements:**
- Page indicators (● ○ ○ ○)
- Progress: "Step 1: Define Your Identity"
- Radio cards for roles:
  - **Athlete** (default selected): Track performance and hit your goals
  - **Coach**: Manage teams and analyze athlete data
  - **Fan**: Follow your favorite stars and teams
- "Continue" button (full-width, primary color)

**Design Specs:**
- **iPractus:** Blue (#137fec), Lexend font
- **Pistachio:** Green (#b2f15f), Inter font, darker background (#0B132B)

**Navigation:**
- Back: arrow_back_ios_new
- Forward: Set Up Your Profile

**State:**
```typescript
type UserRole = 'athlete' | 'coach' | 'fan';
const [selectedRole, setSelectedRole] = useState<UserRole>('athlete');
```

**Validation:** Role must be selected before continuing

---

### 3. Set Up Your Profile
**File:** `set_up_your_profile.html`

**Purpose:** Collect basic user information

**Key Elements:**
- Page indicators (○ ● ○ ○) - Step 2 of 4
- Form fields:
  - Display Name (text input)
  - Email Display (readonly or editable)
  - Role badge (auto-filled from previous step)
  - Bio (textarea, optional)
- Privacy settings toggle
- "Continue" button

**Form Fields:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Display Name | text | Yes | Min 2 chars, alphanumeric |
| Email | email | Yes | Valid email format |
| Bio | textarea | No | Max 500 chars |
| Privacy Profile | toggle | No | Public/Private |

**Navigation:**
- Back: Choose Your Role
- Forward: OTP Verification

**State:**
```typescript
interface ProfileSetup {
  displayName: string;
  email: string;
  role: UserRole;
  bio: string;
  isPublicProfile: boolean;
}
```

---

### 4. OTP Verification
**Files:**
- `otp_verification.html` (iPractus design)
- `pistachio_otp_verify__v2.html` (Pistachio design)

**Purpose:** Verify user's email/phone with one-time code

**Key Elements:**
- Page indicators (○ ○ ● ○) - Step 3 of 4
- Headline: "Verify Your Account"
- Subtext: "Enter the 6-digit code sent to your email"
- 6-digit OTP input boxes (single digit each)
- Countdown timer: "Resend code in 55s"
- "Resend Code" link (disabled during countdown)
- "Verify" button

**OTP Input Behavior:**
- Auto-focus next input on digit entry
- Auto-verify when all 6 digits entered
- Backspace deletes and moves to previous input
- Only numeric input allowed (0-9)

**Countdown Timer:**
- Starts at 55 seconds
- Updates every second
- Enables "Resend Code" when reaches 0
- Resets timer on resend

**Design Specs:**
```
OTP Box: 48x48px, rounded, centered digit
Gap between boxes: 8px
Active state: Primary border, shadow
Filled state: Primary background, white text
```

**Navigation:**
- Back: Set Up Your Profile
- Forward: Success / Achievement (on valid OTP)

**State:**
```typescript
const [otp, setOtp] = useState(['', '', '', '', '', '']);
const [countdown, setCountdown] = useState(55);
const [canResend, setCanResend] = useState(false);
```

**API Calls:**
```typescript
// Verify OTP
POST /api/auth/verify-otp
{
  email: string;
  code: string;
}

// Resend OTP
POST /api/auth/resend-otp
{
  email: string;
}
```

---

### 5. Success / Achievement
**File:** `success___achievement.html`

**Purpose:** Celebrate onboarding completion and guide to main app

**Key Elements:**
- Success animation/icon
- Headline: "Welcome to iPractus!"
- Achievement badge unlocked
- "Get Started" button

**Navigation:**
- Forward: Main App (Social Feed)
- No back button (flow complete)

**Post-Onboarding Actions:**
- Create user session
- Store auth token
- Fetch initial data
- Navigate to main feed

---

## Implementation Checklist

### Phase 1: Basic Flow
- [ ] Create all 5 screen components
- [ ] Implement navigation stack
- [ ] Role selection state
- [ ] Form validation
- [ ] OTP input behavior

### Phase 2: API Integration
- [ ] Email verification endpoint
- [ ] OTP send/verify endpoints
- [ ] Profile creation endpoint
- [ ] Session management

### Phase 3: Polish
- [ ] Animations between screens
- [ ] Progress indicator animations
- [ ] Success celebration animation
- [ ] Error handling
- [ ] Loading states

---

## Design Tokens

### iPractus Design System
```typescript
const colors = {
  primary: '#137fec',
  backgroundLight: '#f6f7f8',
  backgroundDark: '#101922',
};
const fontFamily = 'Lexend';
```

### Pistachio Design System
```typescript
const colors = {
  primary: '#b2f15f',
  obsidian: '#0B132B',
  obsidianElevated: '#1C2541',
  cyanAccent: '#66D9E8',
};
const fontFamily = 'Inter';
```

---

## Navigation Structure (React Navigation)

```typescript
// Stack Navigator
const OnboardingStack = createStackNavigator({
  Welcome: WelcomeScreen,
  ChooseRole: ChooseRoleScreen,
  SetupProfile: SetupProfileScreen,
  OTPVerification: OTPVerificationScreen,
  Success: SuccessScreen,
});

// Initial route
const initialRouteName = 'Welcome';
```

---

## State Management

```typescript
// Onboarding Context
interface OnboardingContextValue {
  role: UserRole | null;
  profile: ProfileSetup | null;
  isVerified: boolean;
  setRole: (role: UserRole) => void;
  setProfile: (profile: ProfileSetup) => void;
  setVerified: (verified: boolean) => void;
  reset: () => void;
}

export const OnboardingContext = createContext<OnboardingContextValue>();
```

---

## Testing Scenarios

### Happy Path
1. User launches app → Welcome screen
2. Taps "Get Started" → Role selection
3. Selects "Athlete" → Profile setup
4. Fills form → OTP verification
5. Enters valid code → Success screen
6. Taps "Get Started" → Main feed

### Edge Cases
- Role not selected (Continue button disabled)
- Invalid email format
- OTP expires (resend flow)
- Network errors during verification
- User goes back and changes role

---

## Files to Implement

| Component | File Path | Priority |
|-----------|-----------|----------|
| WelcomeScreen | `src/screens/onboarding/WelcomeScreen.tsx` | P0 |
| ChooseRoleScreen | `src/screens/onboarding/ChooseRoleScreen.tsx` | P0 |
| SetupProfileScreen | `src/screens/onboarding/SetupProfileScreen.tsx` | P0 |
| OTPVerificationScreen | `src/screens/auth/OtpVerificationScreen.tsx` | P0 (already exists) |
| SuccessScreen | `src/screens/onboarding/SuccessScreen.tsx` | P0 |
| OnboardingContext | `src/contexts/OnboardingContext.tsx` | P1 |
