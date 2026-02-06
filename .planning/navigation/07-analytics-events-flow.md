# Analytics, Training & Events Flow Documentation

## Overview
Performance tracking, training sessions, and event management screens.

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                   ANALYTICS / TRAINING / EVENTS                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  DASHBOARD                                                          │
│      │                                                              │
│      ├─────────────────┬─────────────────┬─────────────────┐       │
│      ▼                 ▼                 ▼                 ▼       │
│  ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐       │
│  │Athlete  │     │Training │     │  Event  │     │  Live   │       │
│  │ Stats   │     │  Plan   │     │ Details │     │Sports   │       │
│  └────┬────┘     └────┬────┘     └────┬────┘     └────┬────┘       │
│       │               │               │               │             │
│       ▼               ▼               ▼               ▼             │
│  ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐       │
│  │Coach    │     │Session  │     │  RSVP   │     │Go Live  │       │
│  │Analytics│     │Details  │     │         │     │  Setup  │       │
│  └─────────┘     └────┬────┘     └─────────┘     └─────────┘       │
│                      │                                                   │
│                      ▼                                                   │
│                ┌─────────┐                                               │
│                │  Drill  │                                               │
│                │ Detail  │                                               │
│                └────┬────┘                                               │
│                     │                                                   │
│                     ▼                                                   │
│                ┌─────────┐                                               │
│                │   Log   │                                               │
│                │Results  │                                               │
│                └─────────┘                                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Screen Details

### 1. Dashboard (Analytics Hub)
**Files:**
- `ipractus_dashboard.html` (iPractus)
- `pistachio_dashboard__system_v2.html` (Pistachio)
- `pistachio_analytics__system_v2.html`

**Purpose:** Performance overview and quick actions

**iPractus Dashboard:**
```
┌────────────────────────────────────────────────────────┐
│  [Avatar]  Welcome back                              │
│              Hello, Alex!                     [🔔]●   │
├────────────────────────────────────────────────────────┤
│  Continue Learning                                     │
│  ┌────────────────────────────────────────────────┐   │
│  │ [Cover Photo]                                   │   │
│  │ Advanced Clinical Practice                     │   │
│  │ Progress: ████████░░ 75%                       │   │
│  │                    [Resume Module ►]           │   │
│  └────────────────────────────────────────────────┘   │
├────────────────────────────────────────────────────────┤
│  My Progress                                           │
│  ┌────────┐  ┌────────┐                               │
│  │ ⏱ 42h  │  │ ✓12/15 │                               │
│  │ Hours  │  │ Modules│                               │
│  └────────┘  └────────┘                               │
│  ┌────────────────────────────────────────────────┐   │
│  │ 🔥 5 Days                                      │   │
│  │    M T W T F                                   │   │
│  └────────────────────────────────────────────────┘   │
├────────────────────────────────────────────────────────┤
│  Upcoming Tasks                   [View All]           │
│  ┌────────────────────────────────────────────────┐   │
│  │ 📄 Ethics Assessment        High    2 days    │   │
│  └────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────┐   │
│  │ 📝 Clinical Journal         Normal  Friday   │   │
│  └────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

**Pistachio Dashboard:**
```
┌────────────────────────────────────────────────────────┐
│  [Avatar]            Pistachio Dashboard      [🔔]     │
├────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────┐   │
│  │ Current Session: Interval Run                   │   │
│  │ iPrActUS high-performance mode active           │   │
│  │            [▶ Resume Session]                   │   │
│  └────────────────────────────────────────────────┘   │
│  Live Metrics                         System v2.0      │
│  ┌────────┐  ┌────────┐  ┌──────────────────┐        │
│  │ ❤ 142  │  │ ⚡4'32" │  │ ⚡ Recovery       │        │
│  │  BPM   │  │  /km   │  │    88%          │        │
│  │   +2.4%│  │  -1.2% │  │    ████────────  │        │
│  └────────┘  └────────┘  └──────────────────┘        │
│  Weekly Performance                                   │
│  ┌────────────────────────────────────────────────┐   │
│  │ Efficiency Score: 92.4         +5.2% vs last   │   │
│  │     ████                                        │   │
│  │     ██████                                      │   │
│  │     ████████                                    │   │
│  │     ████████████                                │   │
│  │     ████                                        │   │
│  │     ██████                                      │   │
│  │     M  T  W  T  F  S  S                        │   │
│  └────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

**Navigation:**
- Tap course/progress → Course Detail
- Tap task → Task Detail
- Tap resume → Resume Session
- Bottom nav to other sections

---

### 2. Athlete Performance Stats
**File:** `athlete_performance_stats.html`

**Purpose:** Detailed performance metrics for athletes

**Sections:**

#### Overview Cards
```
┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
│ ⏱ Total│  │ 🏆Best  │  │ 📈Avg   │  │ 🔥Streak│
│  Time  │  │  Score  │  │ Score  │  │        │
│  42h  │  │  92.4   │  │  87.2  │  │  5 Days│
└────────┘  └────────┘  └────────┘  └────────┘
```

#### Performance Charts
- Weekly performance graph
- Progress over time
- Comparison with team average
- Personal records tracking

#### Session History
- List of recent sessions
- Drill results
- Performance ratings
- Improvement trends

---

### 3. Coach Performance Analytics
**File:** `coach_performance_analytics.html`

**Purpose:** Team and athlete performance overview for coaches

**Sections:**

#### Team Overview
- Total athletes
- Active sessions
- Team average score
- Improvement percentage

#### Athlete Leaderboard
```
┌────────────────────────────────────────────────────────┐
│  Top Performers This Week                              │
│  ┌────┐ Sarah Miller      92.4  ████────────          │
│  │Avatar│ Mike Johnson      88.7  ██████------------│
│  └────┘ Jordan Smith      85.2  ████---------------│
└────────────────────────────────────────────────────────┘
```

#### Team Progress
- Collective improvement
- Attendance tracking
- Drill completion rates

---

### 4. Training Plan Overview
**File:** `training_plan_overview.html`

**Purpose:** View and manage training plans

**Sections:**

#### Current Plan
- Plan name and duration
- Progress bar
- Next session
- Coach notes

#### Upcoming Sessions
```
┌────────────────────────────────────────────────────────┐
│  This Week                                            │
│  ┌────────┐  Interval Training        Today 3 PM      │
│  │  📋   │                                          │
│  └────────┘                                          │
│  ┌────────┐  Strength Training         Wed 5 PM       │
│  │  💪   │                                          │
│  └────────┘                                          │
│  ┌────────┐  Recovery Session          Fri 10 AM      │
│  │  🧘   │                                          │
│  └────────┘                                          │
└────────────────────────────────────────────────────────┘
```

**Navigation:**
- Tap session → Session Details
- Tap "View Calendar" → Calendar View

---

### 5. Training Session Details
**File:** `training_session_details.html`

**Purpose:** Detailed view of a training session

**Sections:**

#### Session Header
```
┌────────────────────────────────────────────────────────┐
│  [◀]  Interval Training                     [Edit]     │
│       Scheduled: Today, 3:00 PM                         │
│       Coach: Sarah Miller                               │
├────────────────────────────────────────────────────────┤
│  This session focuses on speed and endurance...         │
└────────────────────────────────────────────────────────┘
```

#### Drill List
```
┌────────────────────────────────────────────────────────┐
│  Drills (4)                                           │
│  ┌────────────────────────────────────────────────┐   │
│  │ 🏃 400m Sprint                    10 min       │   │
│  │    Short bursts at maximum speed               │   │
│  └────────────────────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────┐   │
│  │ 💪 Rest Intervals                  5 min        │   │
│  │    Active recovery between sets               │   │
│  └────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

**Navigation:**
- Tap drill → Drill Detail
- Tap Start → Begin Session
- Edit → Edit Session

---

### 6. Practice Drill Detail
**File:** `practice_drill_detail.html`

**Purpose:** Individual drill information

**Sections:**

#### Drill Info
- Name and type
- Duration
- Difficulty level
- Equipment needed

#### Instructions
```
┌────────────────────────────────────────────────────────┐
│  Instructions                                         │
│  1. Start at the baseline...                          │
│  2. Sprint at maximum speed...                        │
│  3. Rest for 30 seconds...                            │
│  4. Repeat for 4 sets...                             │
└────────────────────────────────────────────────────────┘
```

#### Media
- Video demo
- Images
- Audio cues

#### Actions
- Start Drill
- Add to Favorites
- Share

**Navigation:**
- Watch video → Video Player
- Log results → Log Drill Results

---

### 7. Log Drill Results
**Files:**
- `log_drill_results.html`
- `pistachio_log_results__v2.html`

**Purpose:** Record performance after completing a drill

**Form Fields:**
- Completion status
- Time taken
- Repetitions completed
- Rating (1-5 stars)
- Notes

**Design:**
```
┌────────────────────────────────────────────────────────┐
│  [◀]  Log Results                                     │
├────────────────────────────────────────────────────────┤
│  400m Sprint                                          │
│  How did it go?                                      │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                 │
│  │ ★  │ │ ★  │ │ ★  │ │ ☆  │ │ ☆  │                 │
│  └────┘ └────┘ └────┘ └────┘ └────┘                 │
├────────────────────────────────────────────────────────┤
│  Time Taken                               [00:00]     │
│  Reps Completed                         [0]       (+) │
│  Notes                                              │
│  ┌────────────────────────────────────────────────┐  │
│  │                                                 │  │
│  └────────────────────────────────────────────────┘  │
├────────────────────────────────────────────────────────┤
│                    [Save Results]                     │
└────────────────────────────────────────────────────────┘
```

---

### 8. Event Details + RSVP
**File:** `event_details___rsvp.html`

**Purpose:** View event details and manage attendance

**Sections:**

#### Event Header
```
┌────────────────────────────────────────────────────────┐
│  [◀]  Team Event                                      │
│  ┌────────────────────────────────────────────────┐   │
│  │  Warriors vs Titans - Qualifier Match           │   │
│  │  Friday, 7:00 PM • City Center Arena           │   │
│  └────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

#### Event Details
- Date and time
- Location with map
- Description
- Attendees list

#### RSVP Section
```
┌────────────────────────────────────────────────────────┐
│  Going (12)              [Join Event]                  │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                       │
│  │Avatar│Avatar│Avatar│Avatar│ +9 more             │
│  └────┘ └────┘ └────┘ └────┘                       │
└────────────────────────────────────────────────────────┘
```

---

### 9. Live Sports
**File:** `live_sports.html`

**Purpose:** Browse live and upcoming sports events

**Sections:**

#### Live Now
```
┌────────────────────────────────────────────────────────┐
│  🔴 LIVE NOW                                          │
│  ┌────────────────────────────────────────────────┐   │
│  │ [Thumbnail] Lions vs Sharks      2.3k watching  │   │
│  │           [Watch Live ▶]                        │   │
│  └────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

#### Upcoming
- Scheduled events
- Countdown timers
- Set reminders

---

### 10. Go Live Setup
**File:** `go_live_setup.html`

**Purpose:** Configure and start a live stream

**Form Fields:**
- Stream title
- Description
- Privacy setting
- Category
- Thumbnail

**Actions:**
- Camera preview
- Mic check
- Start streaming

---

## Performance Data Models

```typescript
interface Session {
  id: string;
  name: string;
  type: 'training' | 'match' | 'recovery';
  scheduledAt: Date;
  duration: number; // minutes
  coachId: string;
  drills: Drill[];
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}

interface Drill {
  id: string;
  name: string;
  description: string;
  type: DrillType;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment?: string[];
  media?: DrillMedia;
}

interface DrillResult {
  id: string;
  drillId: string;
  userId: string;
  sessionId: string;
  completedAt: Date;
  duration?: number;
  repetitions?: number;
  rating: number; // 1-5
  notes?: string;
  metrics?: Record<string, number>;
}

interface PerformanceStats {
  userId: string;
  period: 'week' | 'month' | 'year';
  totalSessions: number;
  totalTime: number;
  averageScore: number;
  bestScore: number;
  currentStreak: number;
  progress: number; // percentage change
}

interface Event {
  id: string;
  teamId: string;
  title: string;
  type: 'match' | 'practice' | 'meeting';
  scheduledAt: Date;
  location: Location;
  description: string;
  rsvpCount: number;
  attendees: User[];
}
```

---

## Implementation Checklist

### Phase 1: Dashboard & Stats
- [ ] Dashboard screen
- [ ] Athlete stats screen
- [ ] Coach analytics screen
- [ ] Performance charts

### Phase 2: Training
- [ ] Training plan overview
- [ ] Session details
- [ ] Drill detail
- [ ] Log results

### Phase 3: Events
- [ ] Event details
- [ ] RSVP functionality
- [ ] Live sports browser
- [ ] Go live setup

---

## Files to Implement

| Component | File Path | Priority |
|-----------|-----------|----------|
| DashboardScreen | `src/screens/analytics/DashboardScreen.tsx` | P0 |
| AthleteStatsScreen | `src/screens/analytics/AthleteStatsScreen.tsx` | P0 |
| CoachAnalyticsScreen | `src/screens/analytics/CoachAnalyticsScreen.tsx` | P1 |
| TrainingPlanScreen | `src/screens/training/TrainingPlanScreen.tsx` | P0 |
| SessionDetailsScreen | `src/screens/training/SessionDetailsScreen.tsx` | P0 |
| DrillDetailScreen | `src/screens/training/DrillDetailScreen.tsx` | P0 |
| LogResultsScreen | `src/screens/training/LogResultsScreen.tsx` | P0 |
| EventDetailScreen | `src/screens/events/EventDetailScreen.tsx` | P1 |
| LiveSportsScreen | `src/screens/events/LiveSportsScreen.tsx` | P1 |
| GoLiveScreen | `src/screens/events/GoLiveScreen.tsx` | P2 |
