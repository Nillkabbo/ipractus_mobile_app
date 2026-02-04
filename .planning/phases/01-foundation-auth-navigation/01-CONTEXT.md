# Phase 1: Foundation + Auth + Navigation - Context

**Gathered:** 2026-02-04
**Status:** Ready for planning
**Source:** Synced with Stitch designs (project: 15416072341346391054)

<domain>
## Phase Boundary

Project scaffolding with React Native Expo SDK 52, authentication system (email/password + biometric), user profile management with avatar upload, theme system (dark/light), and bottom tab navigation infrastructure.

**Stitch Design Reference:** 35 screens already designed in Google Stitch project
**Project URL:** https://stitch.withgoogle.com/projects/15416072341346391054
</domain>

<decisions>
## Implementation Decisions

### Navigation Structure
Based on Stitch screens, the app uses **bottom tab navigation** with the following tabs:

| Tab | Screen | Icon |
|-----|--------|------|
| 1 | iPrActUS Dashboard | Home |
| 2 | Social Feed | Feed |
| 3 | Live Sports / Go Live | Live/Broadcast |
| 4 | Messages | Chat |
| 5 | My Profile | User |

**Navigation hierarchy:**
- Bottom tabs provide access to main sections
- Each tab has its own stack navigation
- Settings accessible from profile tab
- Deep screens (team profiles, media, etc.) accessed through navigation

### Auth Flow & Onboarding

**Onboarding Flow (new users):**
1. **Welcome to iPractus** (`6fb248d7...`) - App introduction (1832px height)
2. **Choose Your Role** (`22c9e4f5...`) - Select Athlete/Coach/Fan (1768px height)
3. **Set Up Your Profile** (`d7f60a0c...`) - Initial profile creation (1768px height)

**Authentication flow (returning users):**
- Login screen with email/password
- Biometric authentication (Face ID/Touch ID) prompt
- Password reset via email
- Session persistence across app restarts

**Roles available:**
- Athlete - For sports participants
- Coach - For team coaches/trainers
- Fan - For supporters and spectators

### Profile Management

**Profile screens:**
1. **My Profile** (`1da93382...`) - Main profile view (2246px height)
   - Avatar image
   - Display name
   - Bio/description
   - Sport specialization
   - Role badge (Athlete/Coach/Fan)
   - Stats and achievements

2. **Edit Profile** (`576102fe...`) - Profile editing (2918px height)
   - Avatar upload with image picker
   - Name editing
   - Bio editing
   - Sport selection
   - Privacy settings link

3. **Privacy Settings** (`46362400...`) - Privacy controls (1888px height)
   - Profile visibility
   - Data sharing preferences
   - Blocked users management

**Profile fields:**
- Avatar (uploadable, square crop)
- Display name (required)
- Username/handle
- Bio/description
- Sport specialization
- Role (Athlete/Coach/Fan)
- Location (optional)
- Website/social links (optional)

### Settings & Preferences

**Settings screen** (`cd9f2627...`):
- Theme toggle (Dark/Light)
- Notification preferences
- Account settings
- Privacy settings
- Help & Support
- Logout

**Additional settings screens:**
- **Privacy Settings** (`46362400...`) - Privacy controls
- **Notification Center** (`1eec614a...`) - Notification list (1836px height)
- **Activity Alerts** (`6dab58e6...`) - Alert preferences (2660px height)
- **Blocked Users** (`67916e2c...`) - Blocked users list (1768px height)

### Theme System

**Design Theme (from Stitch project settings):**
```
Color Mode: DARK (primary)
Custom Color: #137fec (primary blue accent)
Font: LEXEND
Roundness: ROUND_EIGHT (8px)
Saturation: 2
Device Type: MOBILE (390px base width)
```

**Theme options:**
- Dark mode (default)
- Light mode
- System-aware (follows device theme)

**Theme implementation:**
- Theme toggle in Settings
- Preference persists across app restarts
- Smooth theme transition animation

### Messaging & Connections (Foundation)

**Messaging infrastructure:**
- **Messages** (`08a7bc4a...`) - Message list screen (1768px height)
- **Connections** (`9151f16e...`) - Network/contacts list (1768px height)
- **Video Call** (`afafb10a...`) - Video call interface (1768px height)

**Message features (Phase 1 - infrastructure only):**
- Conversation list
- Contact/connections list
- Video call UI placeholder (full implementation in Phase 3)

### Help & Support

**Help screens:**
- **Help & Support** (`b89453e3...`) - Main help screen (2226px height)
- **Help & Support (alt)** (`93cba0c2...`) - Alternative help layout (2168px height)

### Dashboard (Main Hub)

**iPrActUS Dashboard** (`1155c0a6...`) - Main home screen (2380px height)
- Quick access to all features
- Activity overview
- Navigation hub
- Role-specific content based on user type

</decisions>

<design_tokens>
## Design Tokens

### Colors
```javascript
{
  primary: '#137fec',      // Blue accent
  background: '#000000',   // Dark theme base
  surface: '#1a1a1a',      // Card/surface color
  text: '#ffffff',         // Primary text
  textSecondary: '#a0a0a0', // Secondary text
  border: '#333333',       // Border color
  error: '#ff4444',
  success: '#00cc66',
  warning: '#ffaa00'
}
```

### Typography
```javascript
{
  fontFamily: 'Lexend',
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
}
```

### Spacing
```javascript
{
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
}
```

### Border Radius
```javascript
{
  sm: 4,
  md: 8,   // Default from Stitch
  lg: 16,
  xl: 24,
  round: 9999
}
```

### Screen Dimensions
```javascript
{
  width: 390,  // Base width (iPhone size)
  heights: {
    compact: 1768,    // Standard screens
    medium: 1832-2380, // Content screens
    large: 2444-3726   // Feed/long content
  }
}
```

</design_tokens>

<screen_inventory>
## Complete Screen Inventory (Phase 1)

### Authentication & Onboarding
| Screen ID | Title | Height | Screenshot |
|-----------|-------|--------|------------|
| `6fb248d7...` | Welcome to iPractus | 1832px | [View](https://lh3.googleusercontent.com/aida/AOfcidWm4rFcLWRXiBfJVeeMmEyoEjgGDrQiG1BmruEGf2tuJDUennnrlczucc-6-Z0a-IqY-AsZ_lYkqhJh6f0RVDo0LMN4vjiEVASVc3YY2OKMjEovxZVQ2yqsBAMq8sk9ypE_NmSC7ETkhloymZgZailYuFEELFgAvYo4UD79R7yIaW76LoVwTUZGADubcUTKXex9j5tyD736RL7OLsHovPc_GF_gdBx33Tcb7envWhZfOx90jNSA) |
| `22c9e4f5...` | Choose Your Role | 1768px | [View](https://lh3.googleusercontent.com/aida/AOfcidUC3zM8bPRvUxYngbv6lvFrh5qBxM2gZrzhY0qVBW_o6IYaQA5JSZ5DE6WJmyDxGtMYNAmeL3PqnV86J5GYqb9eZ-aRYe2zynsA8wheI2LJN1IFUXGe8SvG2YIpHLBcSQ3_RtBU5Td4UTtpo3GL6OHdLo8mZFROV9q9XBBanVasMbw00J6xYeLiDrOyu8reepoT0m3JkfX_b-Bub26PccXjLgVA0d4eDztu3M_6RV8o5393IYoN1HYW22bb) |
| `d7f60a0c...` | Set Up Your Profile | 1768px | [View](https://lh3.googleusercontent.com/aida/AOfcidUCC8GebR1CC5LR6QGiqI_TdU3l8V38QaK0l8MBlZT_Gl4FI6bxvi3iQXOYwUoug69XAmkEdmgPQQDnfI7cJl6gWXPvyzNkr1ykEpFbpRNfVlF5nOZipdojOfxa4t3nzesRE4hBajHG4hwK9IwdW_xEYTpNrS8rqQSpIh3PDtehxWkdD0sq3841daLFUAZlIsL7M63daprF6JL9HH7BE0l-IOpB-6rVok4MFvCp7BQF0QPwCba6pfsDSr6h) |

### Profile & Settings
| Screen ID | Title | Height | Screenshot |
|-----------|-------|--------|------------|
| `1da93382...` | My Profile | 2246px | [View](https://lh3.googleusercontent.com/aida/AOfcidWGGG2s8b60bfZgesyinM0z2g6oUCGSAMKgFXFu23AC6nSKjBg75m6NKenZB1tIYuhTshWb7c8gr5UaUnU6oVt535Aa9kG5np2xmAULoKH29kpCbAwxD_UhSEDy5p2euK1k4uLFxwiF3GET2Ve9nIkLpiPijfBQld4g0LodohPL1p_ch3pX1I85-5_7AXhcd77zlp7G_v93QqBlLNKpw7MmAwPD-DF9ruRx3U9z4auiVMy7-leVZSmVmxcd) |
| `576102fe...` | Edit Profile | 2918px | [View](https://lh3.googleusercontent.com/aida/AOfcidU7iS_vD44_yxC01vq3tF1sGZpK_b3P6BS43s2hbBClGvcr8eI2OZ-RjnFs9aa4yzCLwzJyvTHiqBSeAR6mBfdrq0N6cnfpo08ZmTGWJ_MBD5donK5oF1KWGssj2K2UKysiJ19vRUpjsE2wAgNry3AVgA19gGqVEq_yzFlLPvVfzm3nZRoSNeUhNgCjuPfnC6Xx7QL8n0gWBPyjVS3gwnaNFHBExN4Jv86V409tjQ9ai3uwVW7P515pDQbF) |
| `cd9f2627...` | Settings | 1768px | [View](https://lh3.googleusercontent.com/aida/AOfcidX3gnRnSkFOHxnJjOG4ycHdu2lszO27mH6akek1F1iFhynnExnU_6zvrcE7D0wgV2lNjGWtenRWSekeM_xidkJN4Dh3niRm221jSBqnUTJyCC4I_jHQnguWGqYGmvM-2LLvo5i4gREwPFGsPglFLSyfqd3E5sQtKQvc-qvoL5OpvWGzjqF9hCZc_ySxG-DLQmKfMN0N-2j7oT8mBbnRE351fdMn1lOZ3R50VWmiKPlp60u6zgzFUGxZCzc0) |
| `46362400...` | Privacy Settings | 1888px | [View](https://lh3.googleusercontent.com/aida/AOfcidUnA__eqbnrBs2OJ6KMh-N9Ira7m_vfX4PYbeXtIj6aaQJI-bd06aHOkUV5fp1E9dyTgsMTVovbwUBgpvOLC236HI76ioJUECy3UXxcRY66C2X30HbNt1YkL-euSjbOntfJsxYIR8P5dhxGueXFgyuTE67KxeUTF1rVk51MABH8GNWYF9jmHwg04C2DR8qoFS1fZtl56Qorh57ug0OFxfIO-9QFp9sHeei7-Lm8BKjT1owrygtW3FG0gN1d) |

### Navigation & Hub
| Screen ID | Title | Height | Screenshot |
|-----------|-------|--------|------------|
| `1155c0a6...` | iPrActUS Dashboard | 2380px | [View](https://lh3.googleusercontent.com/aida/AOfcidV9etrKd2j4bp8M-Jh9lVkYHvniWYq_VOIbC_oNR6BhuyGuQ98IHy5LcRTA0r4om9dvna1Us0_JRFuMfkFbVO7fqIAXfXVjMYYvgubvFakcs_p1OPHF-HmonCTn0V4648RYc7wOKmtKyHI4gB0dwq9-K2C98IOPJjxECurTr1a96jOIzLLKSqcfilBYnVep3XvjEnxZGMDslGhprJre47LeafXVJ3Aiy3mQRWX8Z4_C-mP05yfi0Iy9IERF) |
| `08a7bc4a...` | Messages | 1768px | [View](https://lh3.googleusercontent.com/aida/AOfcidX-3giYvrZcRYsAvCqj0qBhDUpKwa4inZujhqh2GisL3U_hL_MOhG1g9i5V7-0AUGAxoi3XHnURKNkz8YmLqS8TdUb2DwDd45eVuLkzmNKsA3hnMfHSm8u8lBy2Pupxqdqf3wzSJMmgckgXHW5Ypd6TCy4yu0-kp5-fkfizWp281sq_O5ER4hh2Y_cxAqrl9F45p3BjXpxku4bDcfJKFCSpvOKImSRmtk42GCUxFTa8jFbX26jMhDZssbnl) |
| `9151f16e...` | Connections | 1768px | [View](https://lh3.googleusercontent.com/aida/AOfcidVv2W0ogOkfCxHlreg8l6kloGjiaCqRNIbd906vfpcf1zfwcqnhnDzxlXkHFMBY9eHhrePRlw6E1PdPWJfsrhg9zbdGWpmfoiCBYzt93Z3_3i7wxGTjN23NCYZoBp9ZMh4AMNvf7b1elc_7juXDEYItobQqyawpXeL3R-hqv_d9DpqQkl7wpojvdguttnxH32StAAVng_7lWN6U_640O14Wj5EB3jHLC2mTHiD2DpfI_Yyba_8KteHqH0LK) |

### Notifications & Alerts
| Screen ID | Title | Height | Screenshot |
|-----------|-------|--------|------------|
| `1eec614a...` | Notification Center | 1836px | [View](https://lh3.googleusercontent.com/aida/AOfcidUryQwyzYPTgW2CtrDuE-FFaLlefI5glckZgZMSjq-pDvgUmD4ZNAJBJtHjZhSmZcKkoCrl0p0F4z0b-LPosCtIb2J3rlxeiUWt838ESIfV18ZSKqTvk73TKb_QL-f14xBqDQg15dizmqxakvTkU-yuIM0mX0NEgVDXcZhBIjiqyHd11pi7TEWS6GWSwArJwEbDBeRZ4qa7Z5_fne8sNqML_3n7BKy_FZ2BDmydZkihPdInwjAigjnEz1k) |
| `6dab58e6...` | Activity Alerts | 2660px | [View](https://lh3.googleusercontent.com/aida/AOfcidWAg5gxfEZgP5aTputfbX4ADWaCJwno-HscFV8Vn2xRrNKhJQu1Dpipy0agHUwXZhWVsw8pV2g4moKEw8njgkNiwD0LRb_FS2257kCX6rAgMXQmF1nbMgFlwCvUSjh8hG_aMhnVoTvmGUA7mu6iPisruztOyGJQaWUQ82Caut6dMPdQAW9ok4BF0TU1W8n94ZdYhhja0jo7xGwYl2Saz0YipvXvf-u7DcHwJvRU_qUwzikvcYWsa_E_mipx) |

### Moderation & Support
| Screen ID | Title | Height | Screenshot |
|-----------|-------|--------|------------|
| `67916e2c...` | Blocked Users | 1768px | [View](https://lh3.googleusercontent.com/aida/AOfcidWp5fkjPENAB7L5k5F0zsbKFkrlbs_mA5mA63b-Yxn5CEsWc-LGaYf7Kzoty5mZY8dlivVuPBFQO2v3SsPW5nyCXbHjU9jegBRz0IBMg_4u_CvdRQHNvCqrMJOClPh70MGHkRFkpSPnXel0-gady6eccw0Pw4-7uY6cmIln9n-PfGUV837wYi6uK0YkRKOuP08YmR0QkVh7n-7hKpiyuV37Tho9XhcDQZH5zMvQqgHIqw-6RovCTNqq70w) |
| `b89453e3...` | Help & Support | 2226px | [View](https://lh3.googleusercontent.com/aida/AOfcidWAlA96rypCjG6UAz-7u07jVZR3dPI60_3_21Rh8ChDmFOehYHY_fUslU2Tbn-IaMOX_REYqPSxTF2Yw5DGGCwq-gIKg70REvOYNmbBowY6Wel7U5zjBmyYKoubZEzsB88q5Udr8yNBKVSfiU55nOx7LgZOZRhjkvDXK1QrPSHM-gUbm5_bf5vWPm2U8syfx5kBQLcp8dEqXDh1rDrwWEu0I_5eQJlM9L9EMHBELml6rSEI9T3gWREls4c) |
| `93cba0c2...` | Help & Support (alt) | 2168px | [View](https://lh3.googleusercontent.com/aida/AOfcidXFgB5wOM7hS3gVzlbduNrETqAOTwN3trmR_yfoBwX_TG6lKJC3lGQM0xXBqi89aYirVGruqtFETdrMDCWTBoIMlxptC6PcjaE_oFCIp3Grm0vYqMEjkRhxE9FPgjWafJ0evcYacZ9mYKlsjSMS0JFMcdMOEQcMarzHDRyodEKx5dhokAYGiesHgO5tauuC9GqZTa3gRZvvlbByRxJyLhMj4IYn-N4hWtJ_NnlSiTWidFkvzIcXQbhJaio) |

### Video Calling (Infrastructure)
| Screen ID | Title | Height | Screenshot |
|-----------|-------|--------|------------|
| `afafb10a...` | Video Call | 1768px | [View](https://lh3.googleusercontent.com/aida/AOfcidX2wbzTq-kJMnDTc1WyCcWLromLse1TA5uaERmjR96wYu0D2CAzowPxsj_eKz5scR1ExX-nWFc6ZKyhNXoXCMAPfr__F4dLlZsZCo0nitqD3DJf1_AJRRjpEz8faE_y-4zDne1-AaDQBUl2Yun-vUaGpLz1_dvpawH3ssXoE903Bq4SQDjYRGGAgxc--mczQy1waluEJigBzukrRwsUaQ1GlXPHwft-cCYIVKeEbllpSOOBuFf37tqH8Gbc) |

</screen_inventory>

<stitch_mapping>
## Complete Stitch Screen Mapping by Phase

### Phase 1: Foundation + Auth + Navigation (14 screens)
**These screens are in scope for Phase 1:**

| Screen ID | Title | Category | Height |
|-----------|-------|----------|--------|
| `6fb248d7...` | Welcome to iPractus | Onboarding | 1832px |
| `22c9e4f5...` | Choose Your Role | Onboarding | 1768px |
| `d7f60a0c...` | Set Up Your Profile | Onboarding | 1768px |
| `1da93382...` | My Profile | Profile | 2246px |
| `576102fe...` | Edit Profile | Profile | 2918px |
| `cd9f2627...` | Settings | Settings | 1768px |
| `46362400...` | Privacy Settings | Settings | 1888px |
| `1155c0a6...` | iPrActUS Dashboard | Navigation | 2380px |
| `08a7bc4a...` | Messages | Navigation | 1768px |
| `9151f16e...` | Connections | Navigation | 1768px |
| `1eec614a...` | Notification Center | Notifications | 1836px |
| `6dab58e6...` | Activity Alerts | Notifications | 2660px |
| `67916e2c...` | Blocked Users | Moderation | 1768px |
| `b89453e3...` / `93cba0c2...` | Help & Support | Support | 2226px / 2168px |

### Phase 2: Social Feed + Teams (8 screens)
**These screens are in scope for Phase 2:**

| Screen ID | Title | Category | Height |
|-----------|-------|----------|--------|
| `0ddee675...` | Social Feed | Feed | 3726px |
| `d998a24c...` | Social Feed (alt) | Feed | 3562px |
| `03460db8...` | Explore iPractus | Discovery | 3474px |
| `29aab5bd...` | Find Teams | Teams | 2288px |
| `d3d8511e...` | Team Profile | Teams | 3218px |
| `01bb8008...` | Team Roster Management | Teams | 2048px |
| `8b7619a8...` | Team Schedule | Teams | 1768px |
| `47ee3ff0...` | Coach Management Dashboard | Coach | 1940px |

### Phase 3: Chat + Agora Video Calling (1 screen)
**This screen is in scope for Phase 3:**

| Screen ID | Title | Category | Height |
|-----------|-------|----------|--------|
| `afafb10a...` | Video Call | Calling | 1768px |

### Phase 4: Media Library + Polish + Builds (5 screens)
**These screens are in scope for Phase 4:**

| Screen ID | Title | Category | Height |
|-----------|-------|----------|--------|
| `fd6e936c...` | Media Library | Media | 1768px |
| `a93734ad...` | Media Albums | Media | 2444px |
| `ee982ab1...` | Go Live Setup | Live | 1884px |
| `0d7d17ac...` | Streamer Dashboard | Live | 1768px |
| `02e07515...` | Live Sports | Live | 1876px |

### Advanced Features (7 screens) - Future Roadmap Consideration
**These screens represent features beyond current Phase 1-4 scope:**

| Screen ID | Title | Category | Height |
|-----------|-------|----------|--------|
| `3d1fd52b...` | Practice Drill Detail | Training | 2480px |
| `ea3f784f...` | Athlete Performance Stats | Analytics | 2846px |
| `28265704...` | Coach Performance Analytics | Analytics | 2354px |
| `fc1950ee...` | Drill Video Player | Training | 1768px |
| `5055f85d...` | Log Drill Results | Training | 1768px |
| `7e13e9cc...` | Event Details & RSVP | Events | 2368px |
| `3ba2d5c3...` | Success & Achievement | Gamification | 1972px |

### Uncategorized Screens
**Additional screens that need phase assignment:**

| Screen ID | Title | Height | Notes |
|-----------|-------|--------|-------|
| `32fcbe89...` | Stream Summary | 1768px | Possibly Phase 4 |
| `3ba2d5c3...` | Success & Achievement | 1972px | Gamification - Future |

</stitch_mapping>

<deferred>
## Deferred Ideas

The following screens represent features beyond the current 4-phase roadmap:

**Training & Drills Module (Future Phase):**
- Practice Drill Detail
- Drill Video Player
- Log Drill Results

**Analytics Module (Future Phase):**
- Athlete Performance Stats
- Coach Performance Analytics

**Events Module (Future Phase):**
- Event Details & RSVP

**Gamification Module (Future Phase):**
- Success & Achievement

**Streaming Features (Consider for Phase 4):**
- Stream Summary
- Go Live Setup
- Streamer Dashboard
- Live Sports

These can be added to the roadmap backlog for future milestones.
</deferred>

---

*Phase: 01-foundation-auth-navigation*
*Context gathered: 2026-02-04*
*Source: Google Stitch project 15416072341346391054*
*Design theme: Dark mode with #137fec accent, Lexend font, 8px radius*
