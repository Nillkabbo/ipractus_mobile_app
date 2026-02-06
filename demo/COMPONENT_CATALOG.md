# iPractus - Visual Component Catalog

> Component-by-Component breakdown with exact measurements and styles from the HTML screens

---

## Quick Index

- [Buttons](#buttons)
- [Form Inputs](#form-inputs)
- [Cards](#cards)
- [Navigation](#navigation)
- [Avatars & Badges](#avatars--badges)
- [Status Indicators](#status-indicators)
- [Charts & Metrics](#charts--metrics)
- [Chat Components](#chat-components)
- [Achievement System](#achievement-system)

---

## Buttons

### Primary Button

**Classic Theme:**
```
Height: 56px
Border Radius: 28px (fully circular)
Background: #137fec
Text: #ffffff
Font Size: 16px
Font Weight: 600
Padding Horizontal: 24px
Shadow: 0 4px 12px rgba(19, 127, 236, 0.25)
Active Scale: 0.98
```

**Pistachio Theme:**
```
Height: 56px
Border Radius: 28px
Background: #B2F15f
Text: #0B132B
Font Size: 18px
Font Weight: 700
Glow Shadow: 0 0 20px rgba(178, 241, 98, 0.3)
```

### Secondary/Outline Button
```
Height: 36px
Border Radius: 8px (classic) / 12px (pistachio)
Border: 1px solid #e5e7eb
Background: transparent
Text: #137fec
Min Width: 96px
```

### Icon Button (Circular)
```
Size: 40px (regular) / 48px (header)
Border Radius: full
Background: transparent or #f3f4f6
Icon Size: 24px
```

### FAB (Floating Action Button) - Pistachio
```
Size: 56px
Border Radius: 28px
Background: #B2F15f
Icon: add, 32px
Position: center, bottom, -24px offset
Shadow: 0 4px 16px rgba(178, 241, 98, 0.2)
```

---

## Form Inputs

### Standard Text Input
```
Height: 56px
Border Radius: 12px (classic) / 16px (pistachio)
Border: 1px solid #e5e7eb
Background: #ffffff (light) / #1c2127 (dark)
Padding Horizontal: 16px
Icon: 20px, 12px left padding
Font Size: 16px
Placeholder: #9dabb9
Focus Border: #137fec, 2px
```

### Search Bar
```
Height: 48px (Find Teams) / 40px (Connections)
Border Radius: 12px
Background: #ffffff / #1c2127
Left Icon: search, 20px
Right Icon: tune/filter, 20px
Padding: 4px left/right, 16px center
```

### OTP Input Group
```
Input Count: 6 digits
Input Width: 44-56px each
Input Height: 56px
Gap Between: 8px
Border: Bottom only, 2px
Border Color Default: #d1d5db
Border Color Focus: #137fec
Text Align: center
Font Size: 20px
Font Weight: 600
Auto-focus next on input
Backspace focus previous
```

### Text Area
```
Min Height: 80px
Border Radius: 12px
Padding: 16px
Font Size: 15px (chat)
Resize: none
```

---

## Cards

### Team Card (Full)
```
Border Radius: 12px
Background: #ffffff / #1c2127
Shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
Border: 1px solid #f3f4f6 / #374151

Header Image:
  Aspect Ratio: 16/9
  Gradient Overlay: from-black/60 to-transparent
  Badge: 12px top, 12px left, 8px padding, 4px radius

Content Padding: 16px
Title Font: 18px, bold
Subtitle Font: 14px, normal, #9dabb9

Action Area:
  Avatar Stack: 32px each, -8px overlap
  Button: 36px height, 8px radius, 100px min-width
```

### Stat Card
```
Min Width: 150px
Flex: 1
Border Radius: 16px (pistachio) / 12px (classic)
Padding: 20px (pistachio) / 24px (classic)
Background: elevated surface
Gap: 12px (pistachio) / 8px (classic)

Label: 14px, medium
Value: 30px, bold (48px for large)
Change Indicator: 12px, colored
```

### Achievement Badge Card
```
Width: 1/3 of container (3-column grid)
Aspect Ratio: 1:1 (square)
Border Radius: full
Gradient: corner-to-corner
Shadow: colored glow
Icon: 60% of container
Label: 12px, bold, center

Locked State:
  Opacity: 0.5
  Filter: grayscale 100%
  Lock Icon: centered, 24px
```

---

## Navigation

### Top App Bar
```
Height: auto (44px + padding)
Padding: 16px horizontal, 12px vertical
Background: 80% opacity white
Backdrop Blur: 20px
Border: 1px bottom

Left Area:
  Back Button: 40-48px
  Avatar: 40px, circular, 2px border

Center:
  Title: 18px, bold, flex-1, center

Right Area:
  Icon Button: 40-48px
  Notification Badge: 8px, red, top-right
```

### Bottom Tab Bar
```
Height: 68px + safe area
Background: 80% opacity white
Backdrop Blur: 20px (lg)
Border: 1px top
Padding: 12px top, 24px sides
Gap: even distribution

Tab Item:
  Column direction
  Gap: 4px
  Icon: 24px
  Label: 10px, medium

Active Color: #137fec
Inactive Color: #9ca3af
Indicator: 4px dot below icon (Pistachio)
```

### Segment Control (Toggle)
```
Height: 40px
Border Radius: 8px
Background: #f3f4f6 / #1f2937
Padding: 4px all around

Option:
  Flex: 1
  Border Radius: 8px
  Active: white background, shadow
  Text: 14px, medium

Text Color:
  Active: #137fec
  Inactive: #617589
```

---

## Avatars & Badges

### Avatar Sizes
```
XS: 24px - status indicators
SM: 32px - chat headers, lists
MD: 40px - cards, headers
LG: 56px - profile previews
XL: 64px - team headers
2XL: 80px - profile headers
```

### Avatar Styling
```
Border: 2px of primary/10 or white/10
Border Radius: full
Shadow: none (flat) or 2px elevation
Status Dot: 30% of size, 2px border
```

### Status Dot
```
Online: #22c55e (green)
Offline: #9ca3af (gray)
Away: #f59e0b (yellow)
Busy: #ef4444 (red)

Size: 14-16px
Animation: pulse for online
Glow: colored shadow
```

### Achievement Badge
```
Size: responsive to container
Border Radius: full
Background: gradient (2 colors)
Shadow: matching color glow
Icon: centered, 60% size
Lock Overlay: centered, black/10

Gradients:
  Blue: from-blue-500 to-indigo-600
  Orange: from-orange-400 to-red-500
  Yellow: from-yellow-400 to-amber-600
  Purple: from-purple-500 to-pink-600
```

---

## Status Indicators

### Online Status
```
Size: 8px (chat list)
Border Radius: full
Color: #22c55e
Animation: pulse (keyframe)
```

### Progress Bar
```
Height: 6px (1.5 in Tailwind)
Border Radius: full
Background: #e5e7eb / #1f2937
Fill: primary color
Width: percentage
```

### Rank/Level Badge
```
Background: primary/10
Border: 1px primary/30
Padding: 4px 12px
Border Radius: full
Text: 12px, bold, uppercase
Letter Spacing: 0.1em
```

### Notification Badge
```
Size: 16-20px
Border Radius: full
Background: #ef4444
Text: 10-12px, bold, white
Position: top-right of parent
```

---

## Charts & Metrics

### Weekly Bar Chart
```
Height: 160px
Gap: 8px between bars
Bar Width: flex-1, equal
Border Radius: 4px top

Active Bar: primary/80
Inactive Bar: secondary/20
Hover: primary/40

Label: 11px, bold, 60% opacity
Below bar, center
```

### Metric Display
```
Large Value: 36px, bold, tight tracking
Unit: 14px, normal, 60% opacity
Trend: 12px, colored, semibold
Change Icon: 16px, matched color

Layout:
  Vertical: value, unit, trend
  Horizontal: value left, trend right
```

### Donut/Ring Progress
```
Size: 120-160px
Stroke Width: 12-16px
Background: surface color
Fill: primary or stormy-blue
Center Text: large value
Radius calculation: circumference * percentage
```

---

## Chat Components

### Message Bubble (Sent)
```
Max Width: 85%
Border Radius: 20px
Bottom Right: 0 radius (corner)
Background: #137fec (classic) / #B2F15f (pistachio)
Text: #ffffff
Padding: 10px 16px (2.5 4 in Tailwind)
Font Size: 15px
Shadow: lg with colored tint
```

### Message Bubble (Received)
```
Max Width: 85%
Border Radius: 20px
Bottom Left: 0 radius
Background: #2d353e (dark chat bubble)
Text: #f3f4f6
Padding: 10px 16px
Font Size: 15px
Border: 1px white/5
```

### Chat Input Bar
```
Height: auto (44px + padding)
Padding: 16px
Background: elevated surface
Border: 1px top

Components:
  Add Button: 40px, transparent
  Input: flex-1, full, 56px, circular
  Emoji Button: 24px, gray-500
  Mic Button: 40px, gray-400
  Send Button: 44px, primary, circular, elevation-4
```

### Chat Header
```
Height: auto
Padding: 16px
Background: elevated/95
Backdrop Blur: 20px

Avatar: 40px
Name: 16px, semibold
Status: flex row, dot + text
Icon Buttons: 40px, spaced
```

---

## Achievement System

### Achievement Badge Grid
```
Columns: 3
Gap: 16px (4 in Tailwind)
Padding: 16px sides

Badge:
  Aspect: square
  Radius: full
  Padding: none
  Center content
```

### Bottom Sheet (Achievement Detail)
```
Position: fixed bottom
Background: white/dark
Border Radius: 16px top
Padding: 24px all, 48px bottom

Handle: 6px height, 48px width, centered, rounded-full
Badge Image: 96px, centered
Title: 24px, bold, centered
Description: 16px, gray-400, centered, max-w-xs
Earned Date: badge style, primary/10
Button: full-width, primary, 48px, circular
```

### Stats Cards (Achievement Screen)
```
Layout: flex wrap, gap 16px
Card: min-w 158px, flex-1

Content:
  Label: 14px, medium, gray-400
  Value: 30px, bold, primary
  Change: 14px, green-600, bold
  Progress: 6px height, rounded-full
```

---

## Color Quick Reference

### Classic Blue
```javascript
{
  primary: '#137fec',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6'
}
```

### Chat Blue
```javascript
{
  primary: '#1173d4',
  bubble: '#2d353e',
  background: '#0a0f14',
  elevated: '#1a2129'
}
```

### Pistachio Green
```javascript
{
  primary: '#B2F15f',
  obsidian: '#0B132B',
  elevated: '#1C2541',
  stormy: '#4E7D96',
  paleYellow: '#E5F1AF',
  cyan: '#66D9E8'
}
```

---

## Spacing Quick Reference

```
4px  - xs, tight gaps
8px  - sm, icon padding, compact gaps
12px - md, card padding
16px - lg, default padding, section gaps
20px - xl, larger padding
24px - 2xl, container padding
32px - 3xl, large gaps
48px - 4xl, section separation
```

---

**Companion to:** REACT_NATIVE_CONVERSION_REFERENCE.md
**Last Updated:** 2025-02-04
