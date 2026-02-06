# Authentication Flow Documentation

## Overview
Login and password recovery flows for existing users.

---

## Flow Diagrams

### Login Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                          LOGIN FLOW                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐                                                   │
│  │   Login      │                                                   │
│  │   Screen     │                                                   │
│  └──────┬───────┘                                                   │
│         │                                                           │
│         ├─────────────┐                                             │
│         │             │                                             │
│         ▼             ▼                                             │
│  ┌──────────────┐  ┌──────────────┐                               │
│  │   Main App   │  │   Forgot     │                               │
│  │   (Feed)     │  │   Password?  │                               │
│  └──────────────┘  └──────┬───────┘                               │
│                          │                                         │
│                          ▼                                         │
│                  ┌──────────────┐                                  │
│                  │  Branch:     │                                  │
│                  │  Old or V2?  │                                  │
│                  └──────┬───────┘                                  │
│                         │                                          │
│          ┌──────────────┴──────────────┐                           │
│          ▼                             ▼                           │
│  ┌──────────────┐              ┌──────────────┐                    │
│  │  Reset       │              │  Forgot      │                    │
│  │  Password    │              │  Password    │                    │
│  │  (Old)       │              │  (V2)        │                    │
│  └──────────────┘              └──────┬───────┘                    │
│         │                             │                            │
│         ▼                             ▼                            │
│  ┌──────────────┐              ┌──────────────┐                    │
│  │  Login       │              │  OTP         │                    │
│  └──────────────┘              │  Verify      │                    │
│                                └──────┬───────┘                    │
│                                       │                            │
│                                       ▼                            │
│                                ┌──────────────┐                    │
│                                │  Reset       │                    │
│                                │  Password    │                    │
│                                │  (V2)        │                    │
│                                └──────┬───────┘                    │
│                                       │                            │
│                                       ▼                            │
│                                ┌──────────────┐                    │
│                                │  Login       │                    │
│                                └──────────────┘                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Screen Details

### 1. Login Screen
**Entry Point:** From app launch (if user has session)

**Key Elements:**
- Logo/Branding
- Email input (with validation)
- Password input (show/hide toggle)
- "Forgot Password?" link
- "Sign In" button
- "Don't have an account? Sign Up" link
- Social login buttons (optional)

**Form Fields:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Email | email | Yes | Valid email format |
| Password | password | Yes | Min 8 chars |

**Navigation:**
- Success: Main App (Feed)
- Forgot Password: Forgot Password Screen
- Sign Up: Onboarding Flow

**State:**
```typescript
interface LoginFormData {
  email: string;
  password: string;
}

const [formData, setFormData] = useState<LoginFormData>({
  email: '',
  password: '',
});
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

**API Call:**
```typescript
POST /api/auth/login
{
  email: string;
  password: string;
}

Response:
{
  token: string;
  user: User;
}
```

---

### 2. Forgot Password (Old Design)
**File:** `forgot_password.html`

**Purpose:** Initiate password recovery (legacy flow)

**Key Elements:**
- Back button
- Headline: "Forgot Password?"
- Email input
- "Send Reset Link" button
- Helper text: "Enter your email and we'll send you instructions"

**Navigation:**
- Back: Login
- Forward: Reset New Password (after email sent)

**API Call:**
```typescript
POST /api/auth/forgot-password
{
  email: string;
}
```

---

### 3. Reset New Password (Old Design)
**File:** `reset_new_password.html`

**Purpose:** Set new password after reset link

**Key Elements:**
- Back button
- Headline: "Create New Password"
- New Password input (with show/hide)
- Confirm Password input
- Password requirements checklist:
  - ✓ At least 8 characters
  - ✓ Includes a number
  - ✓ Includes a special character
- "Update Password" button

**Validation:**
- Passwords must match
- All requirements must be met
- Button disabled until valid

**Navigation:**
- Back: Forgot Password (or Login)
- Success: Login (with success toast)

**State:**
```typescript
interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

const requirements = {
  minLength: false,
  hasNumber: false,
  hasSpecialChar: false,
};
```

**API Call:**
```typescript
POST /api/auth/reset-password
{
  token: string;  // From email link
  newPassword: string;
}
```

---

### 4. Forgot Password (V2 - Pistachio Design)
**File:** `pistachio_forgot_password__v2.html`

**Purpose:** Modern password recovery with OTP

**Key Elements:**
- Back button
- Headline: "FORGOT PASSWORD"
- Subtext: "No worries! Enter your email and we'll send you a code"
- Email input (large, rounded)
- "Send Code" button (full-width, primary)
- Design System v2.0 badge

**Design Specs (Pistachio):**
```typescript
const colors = {
  primary: '#b2f15f',
  obsidian: '#0b132b',
  obsidianElevated: '#1c2541',
};
```

**Navigation:**
- Back: Login
- Forward: OTP Verification (V2)

---

### 5. OTP Verification (V2)
**File:** `pistachio_otp_verify__v2.html`

**Purpose:** Verify identity before password reset

**Key Elements:**
- Back button
- Headline: "VERIFY CODE"
- Subtext: "Enter the 6-digit code sent to your email"
- 6-digit OTP input (styled like onboarding)
- Countdown timer: "Resend code in 55s"
- "Resend Code" link
- "Verify" button

**Navigation:**
- Back: Forgot Password (V2)
- Forward: Reset Password (V2)

---

### 6. Reset Password (V2)
**File:** `pistachio_reset_password__v2.html`

**Purpose:** Set new password after OTP verification

**Key Elements:**
- Back button
- Headline: "NEW PASSWORD"
- Subtext: "Set your new secure credentials to access your iPrActUS profile"
- New Password input (large, rounded)
- Confirm Password input
- Password requirements checklist:
  - ✓ At least 8 characters
  - ✓ Includes a number
  - ○ Includes a special character
- "Update Password" button

**Visual Design:**
- Large rounded inputs (h-16, rounded-full)
- Visibility toggle buttons
- Requirements with check/circle icons
- Subtle gradient accent in background

**Navigation:**
- Back: OTP Verification (V2)
- Success: Login (with success message)

**API Flow:**
```typescript
// Complete reset flow
1. POST /api/auth/forgot-password-v2
   { email: string }

2. POST /api/auth/verify-otp
   { email: string; code: string }

3. POST /api/auth/reset-password-v2
   { email: string; newPassword: string }
```

---

## Implementation Checklist

### Phase 1: Basic Auth
- [ ] Login screen component
- [ ] Email/password validation
- [ ] Login API integration
- [ ] Session storage
- [ ] Forgot password (old flow)

### Phase 2: V2 Password Reset
- [ ] Forgot password V2
- [ ] OTP verification V2
- [ ] Reset password V2
- [ ] API integration

### Phase 3: Security
- [ ] Password strength meter
- [ ] Rate limiting on login
- [ ] Token expiry handling
- [ ] Session timeout
- [ ] Biometric auth (optional)

---

## Authentication State Management

```typescript
// Auth Context
interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  verifyOTP: (email: string, code: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>();
```

---

## Navigation Structure

```typescript
// Auth Stack (when not authenticated)
const AuthStack = createStackNavigator({
  Login: LoginScreen,
  ForgotPassword: ForgotPasswordScreen,
  ResetPassword: ResetPasswordScreen,
  ForgotPasswordV2: ForgotPasswordV2Screen,
  OTPVerifyV2: OTPVerifyV2Screen,
  ResetPasswordV2: ResetPasswordV2Screen,
});

// Main Stack (when authenticated)
const MainStack = createBottomTabNavigator({
  Feed: FeedScreen,
  Messages: MessagesScreen,
  Teams: TeamsScreen,
  Profile: ProfileScreen,
});

// Root navigation
const RootNavigator = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <MainStack /> : <AuthStack />;
};
```

---

## Password Requirements

```typescript
export const validatePassword = (password: string): PasswordValidation => {
  const requirements = {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
  };

  const isValid = Object.values(requirements).every(Boolean);

  return { isValid, requirements };
};

interface PasswordValidation {
  isValid: boolean;
  requirements: {
    minLength: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
    hasUpperCase: boolean;
  };
}
```

---

## Error Handling

| Error | Message | Action |
|-------|---------|--------|
| Invalid credentials | "Email or password is incorrect" | Show inline error |
| User not found | "No account found with this email" | Show inline, link to signup |
| Weak password | "Password doesn't meet requirements" | Show requirement checklist |
| Invalid OTP | "Invalid or expired code" | Show inline, enable resend |
| Rate limited | "Too many attempts. Try again later" | Disable button, show countdown |
| Network error | "Connection failed. Check your internet" | Show toast, enable retry |

---

## Files to Implement

| Component | File Path | Priority |
|-----------|-----------|----------|
| LoginScreen | `src/screens/auth/LoginScreen.tsx` | P0 |
| ForgotPasswordScreen | `src/screens/auth/ForgotPasswordScreen.tsx` | P0 |
| ResetPasswordScreen | `src/screens/auth/ResetPasswordScreen.tsx` | P0 |
| ForgotPasswordV2Screen | `src/screens/auth/ForgotPasswordV2Screen.tsx` | P1 |
| OTPVerifyV2Screen | `src/screens/auth/OTPVerifyV2Screen.tsx` | P1 |
| ResetPasswordV2Screen | `src/screens/auth/ResetPasswordV2Screen.tsx` | P1 |
| AuthContext | `src/contexts/AuthContext.tsx` | P0 |
