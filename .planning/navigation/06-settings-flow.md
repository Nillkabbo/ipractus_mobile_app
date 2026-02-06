# Settings Flow Documentation

## Overview
User settings, preferences, and account management screens.

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          SETTINGS FLOW                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                        Settings                             │   │
│  │  • Profile card (tap → Edit Profile)                        │   │
│  │  • Connectivity section                                     │   │
│  │  • Performance Preferences                                   │   │
│  │  • Privacy & Data                                            │   │
│  │  • Log Out button                                            │   │
│  └───┬─────────────────────────────────────────────────────────┘   │
│      │                                                             │
│      ├────────┬────────┬────────┬────────┬────────┬────────┐      │
│      ▼        ▼        ▼        ▼        ▼        ▼        ▼      │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐           │
│  │Edit│ │Priv│ │Bloc│ │Help│ │About│ │Term│ │Refe│           │
│  │Prof│ │acy │ │ked │ │ &  │ │iPrac│ │s of│ │r a │           │
│  │ile │ │Set │ │Use │ │Supp│ │tus  │ │Serv│ │Frie│           │
│  │    │ │tin │ │rs  │ │ort │ │     │ │ice │ │nd  │           │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Screen Details

### 1. Settings (Main)
**Files:**
- `settings.html` (iPractus)
- `pistachio_settings__system_v2.html` (Pistachio)

**Purpose:** Central hub for all settings

**TopAppBar:**
```
┌────────────────────────────────────────────────────────┐
│  ◀              Settings                              │
└────────────────────────────────────────────────────────┘
```

**Content Sections:**

#### Profile Section
```
┌────────────────────────────────────────────────────────┐
│  Profile                                               │
│  ┌────┐  Alex Rivera                    ──────────►   │
│  │Avatar│  Pro Athlete Tier                           │
│  └────┘                                              │
└────────────────────────────────────────────────────────┘
```
- Avatar: 64x64px, with primary border
- Name: Bold, 16px
- Badge: Primary color, uppercase
- Tap: Edit Profile

#### Connectivity Section (Pistachio)
```
┌────────────────────────────────────────────────────────┐
│  Connectivity                                         │
│  ┌────┐  Bluetooth Sensors        3 Connected  ─────►│
│  │    │                                                │
│  └────┘                                              │
│  ┌────┐  Heart Rate Monitor            ──────────►   │
│  │    │                                                │
│  └────┘                                              │
└────────────────────────────────────────────────────────┘
```
- Bluetooth Sensors: Shows connected count
- Heart Rate Monitor: Device status
- Tap: Device configuration

#### Performance Preferences (Pistachio)
```
┌────────────────────────────────────────────────────────┐
│  Performance Preferences                               │
│  ┌────┐  High-Performance Mode         [Toggle ON]    │
│  │    │                                                │
│  └────┘                                              │
│  ┌────┐  Bio-Feedback Alerts          [Toggle OFF]   │
│  │    │                                                │
│  └────┘                                              │
│  ┌────┐  Metric Units               km/h, kg    ─────►│
│  │    │                                                │
│  └────┘                                              │
└────────────────────────────────────────────────────────┘
```

#### Privacy & Data Section
```
┌────────────────────────────────────────────────────────┐
│  Privacy & Data                                        │
│  ┌────┐  Data Privacy Shield            ──────────►   │
│  │    │                                                │
│  └────┘                                              │
│  ┌────┐  Terms of Service                ──────────►│
│  │    │                                                │
│  └────┘                                              │
└────────────────────────────────────────────────────────┘
```

#### Danger Zone
```
┌────────────────────────────────────────────────────────┐
│                                                         │
│     [  🚪  LOG OUT  ]                                 │
│                                                         │
│           System v2.4.1 (Obsidian)                     │
└────────────────────────────────────────────────────────┘
```
- Red/danger color scheme
- Full-width button
- Logout confirmation

**Design Specs (Pistachio):**
```typescript
const colors = {
  primary: '#b2f15f',
  obsidian: '#0B132B',
  obsidianLight: '#1C2541',
  danger: '#FF4D4D',
};
```

---

### 2. Edit Profile
**File:** `edit_profile.html`

**Purpose:** Update user profile information

**Form Fields:**
- Display Name (text)
- Username (text, unique check)
- Bio (textarea, 500 char limit)
- Location (text)
- Website (url)
- Profile Photo (upload)
- Cover Photo (upload)

**Save Behavior:**
- Validates all fields
- Shows loading state
- Success toast on save
- Error messages inline

---

### 3. Privacy Settings
**File:** `privacy_settings.html`

**Sections:**

#### Profile Privacy
- Account Type: Public / Private
- Show Activity Status: Toggle
- Allow DMs: Everyone / Following / None

#### Data & Activity
- Activity Status: Toggle
- Read Receipts: Toggle
- Online Status: Toggle
- Profile Photo Visibility

#### Blocking
- Blocked Users list → Blocked Users Screen
- Muted Users list

---

### 4. Blocked Users
**File:** `blocked_users.html`

**Content:**
- List of blocked users
- Unblock button per user
- Empty state illustration
- Search blocked users

---

### 5. Help & Support
**File:** `help___support.html`

**Sections:**
- FAQs (accordion)
- Contact Support
- Report a Problem
- App Version
- Terms links

---

### 6. About iPractus
**File:** `about_ipractus.html`

**Content:**
- App description
- Version number
- Team info
- Social links
- Licenses

---

### 7. Terms of Service
**File:** `terms_of_service.html`

**Content:**
- Full legal text
- Scrollable content
- Accept button (if needed)

---

### 8. Privacy Policy
**File:** `privacy_policy.html`

**Content:**
- Data collection practices
- User rights
- Contact info
- Last updated date

---

### 9. Refer a Friend
**File:** `refer_a_friend.html`

**Content:**
- Referral code display
- Copy code button
- Share options
- Rewards info
- Referral history

---

### 10. iPractus Pro Upgrade
**File:** `ipractus_pro_upgrade.html`

**Purpose:** Premium subscription

**Sections:**
- Feature comparison
- Pricing tiers
- Subscribe button
- Trial offer

---

## Settings Component Structure

```typescript
const SettingsScreen = () => {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <Section title="Profile">
        <TouchableOpacity
          style={styles.profileCard}
          onPress={() => navigate('EditProfile')}
        >
          <Avatar src={user.avatar} size={64} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{user.displayName}</Text>
            <Text style={styles.badge}>{user.tier}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#94a3b8" />
        </TouchableOpacity>
      </Section>

      {/* Connectivity (Pistachio only) */}
      <Section title="Connectivity">
        <SettingsItem
          icon="bluetooth"
          label="Bluetooth Sensors"
          value="3 Connected"
          onPress={() => navigate('BluetoothSettings')}
        />
        <SettingsItem
          icon="heartbeat"
          label="Heart Rate Monitor"
          onPress={() => navigate('HRMSettings')}
        />
      </Section>

      {/* Performance Preferences */}
      <Section title="Performance Preferences">
        <SettingsToggle
          icon="bolt"
          label="High-Performance Mode"
          value={settings.highPerformance}
          onToggle={setHighPerformance}
        />
        <SettingsToggle
          icon="notifications"
          label="Bio-Feedback Alerts"
          value={settings.bioFeedback}
          onToggle={setBioFeedback}
        />
        <SettingsItem
          icon="straighten"
          label="Metric Units"
          value="km/h, kg"
          onPress={() => navigate('UnitsSettings')}
        />
      </Section>

      {/* Privacy & Data */}
      <Section title="Privacy & Data">
        <SettingsItem
          icon="shield"
          label="Data Privacy Shield"
          onPress={() => navigate('PrivacySettings')}
        />
        <SettingsItem
          icon="document"
          label="Terms of Service"
          onPress={() => navigate('TermsOfService')}
        />
      </Section>

      {/* Danger Zone */}
      <View style={styles.dangerZone}>
        <Button
          variant="danger"
          icon="logout"
          onPress={handleLogout}
        >
          LOG OUT
        </Button>
      </View>

      <Text style={styles.versionText}>
        System v2.4.1 (Obsidian)
      </Text>
    </ScrollView>
  );
};
```

---

## Settings Item Component

```typescript
interface SettingsItemProps {
  icon: string;
  label: string;
  value?: string;
  badge?: string;
  onPress: () => void;
  color?: string;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  label,
  value,
  badge,
  onPress,
  color = '#b2f15f',
}) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${color}10` }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>

      <Text style={styles.label}>{label}</Text>

      {value && <Text style={styles.value}>{value}</Text>}
      {badge && <Badge text={badge} />}

      <Ionicons name="chevron-forward" size={24} color="#94a3b8" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#111418',
  },
  value: {
    fontSize: 14,
    color: '#94a3b8',
    marginRight: 8,
  },
});
```

---

## Settings Toggle Component

```typescript
interface SettingsToggleProps {
  icon: string;
  label: string;
  value: boolean;
  onToggle: (value: boolean) => void;
  color?: string;
}

const SettingsToggle: React.FC<SettingsToggleProps> = ({
  icon,
  label,
  value,
  onToggle,
  color = '#b2f15f',
}) => {
  return (
    <View style={styles.item}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}10` }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>

      <Text style={styles.label}>{label}</Text>

      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#cbd5e1', true: color }}
        thumbColor={value ? 'white' : 'white'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#111418',
  },
});
```

---

## Settings State Management

```typescript
interface SettingsState {
  // Preferences
  highPerformance: boolean;
  bioFeedback: boolean;
  metricUnits: 'metric' | 'imperial';

  // Privacy
  profilePrivacy: 'public' | 'private';
  showActivityStatus: boolean;
  allowDMs: 'everyone' | 'following' | 'none';
  readReceipts: boolean;

  // Notifications
  pushNotifications: boolean;
  emailNotifications: boolean;
  quietHours: { start: string; end: string } | null;

  // Theme
  theme: 'light' | 'dark' | 'auto';
}

export const SettingsContext = createContext<{
  settings: SettingsState;
  updateSettings: (updates: Partial<SettingsState>) => Promise<void>;
  resetSettings: () => Promise<void>;
}>();
```

---

## Implementation Checklist

### Phase 1: Core Settings
- [ ] Settings main screen
- [ ] Profile section
- [ ] Settings item component
- [ ] Settings toggle component
- [ ] Logout functionality

### Phase 2: Sub-pages
- [ ] Edit Profile
- [ ] Privacy Settings
- [ ] Help & Support
- [ ] About iPractus

### Phase 3: Advanced
- [ ] Bluetooth connectivity
- [ ] Device management
- [ ] Refer a friend
- [ ] Pro upgrade flow
- [ ] Data export

---

## Files to Implement

| Component | File Path | Priority |
|-----------|-----------|----------|
| SettingsScreen | `src/screens/settings/SettingsScreen.tsx` | P0 |
| EditProfileScreen | `src/screens/settings/EditProfileScreen.tsx` | P0 |
| PrivacySettingsScreen | `src/screens/settings/PrivacySettingsScreen.tsx` | P0 |
| BlockedUsersScreen | `src/screens/settings/BlockedUsersScreen.tsx` | P1 |
| HelpSupportScreen | `src/screens/settings/HelpSupportScreen.tsx` | P1 |
| AboutScreen | `src/screens/settings/AboutScreen.tsx` | P1 |
| SettingsItem | `src/components/settings/SettingsItem.tsx` | P0 |
| SettingsToggle | `src/components/settings/SettingsToggle.tsx` | P0 |
| SettingsContext | `src/contexts/SettingsContext.tsx` | P0 |
