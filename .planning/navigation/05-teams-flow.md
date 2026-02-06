# Teams Flow Documentation

## Overview
Team discovery, profiles, and management screens.

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          TEAMS FLOW                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Find Teams / Teams Hub                   │   │
│  │  • Your Teams (horizontal scroll)                           │   │
│  │  • Recommended Teams                                        │   │
│  │  • Categories                                               │   │
│  │  • Search                                                   │   │
│  └────────┬────────────────────────────────────────────────────┘   │
│           │                                                         │
│           ├──────────────┬──────────────┐                          │
│           ▼              ▼              ▼                          │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐              │
│  │  Team        │ │  Team        │ │  Create      │              │
│  │  Profile     │ │  Roster      │ │  New Team    │              │
│  │  (Tabs)      │ │  Management  │ │              │              │
│  └──────────────┘ └──────────────┘ └──────────────┘              │
│         │                                                             │
│         ▼                                                             │
│  ┌──────────────┐                                                    │
│  │  Team        │                                                    │
│  │  Settings    │                                                    │
│  └──────────────┘                                                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Screen Details

### 1. Find Teams / Teams Hub
**Files:**
- `find_teams.html`
- `pistachio_teams__system_v2.html`

**Purpose:** Discover and manage teams

**TopAppBar:**
```
┌────────────────────────────────────────────────────────┐
│  ◀      Teams                          [🔍] [⚙️]      │
└────────────────────────────────────────────────────────┘
```

**Content Sections:**

#### Your Teams (Horizontal Scroll)
```
┌────────────────────────────────────────────────────────┐
│  Your Teams                                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐               │
│  │ [Logo]  │  │ [Logo]  │  │ [Logo]  │               │
│  │ Tigers  │  │ Sharks  │  │ Giants  │               │
│  │ ●Active │  │         │  │         │               │
│  └─────────┘  └─────────┘  └─────────┘               │
└────────────────────────────────────────────────────────┘
```

**Team Card Design:**
- Size: 140px min-width
- Logo: Aspect square, rounded
- Name: Bold, 14px
- Sport/League: Gray, 12px
- Active badge (if applicable)
- Border accent for active team

#### Recommended Teams
- Grid layout (2 columns)
- Team cards with follow button
- Sport category tags
- Member counts

#### Categories
- Sports types: Soccer, Basketball, Tennis, etc.
- Skill levels: Beginner, Intermediate, Pro
- Location-based

**Navigation:**
- Tap team card → Team Profile
- Tap "Create Team" → Create Team Flow
- Tap category → Category Filter
- Tap search → Search Teams

---

### 2. Team Profile
**File:** `team_profile.html`

**Purpose:** View team details and activities

**TopAppBar:**
```
┌────────────────────────────────────────────────────────┐
│  ◀              Team Profile                 [📤]       │
└────────────────────────────────────────────────────────┘
```

**Hero Section:**
```
┌────────────────────────────────────────────────────────┐
│  [Cover Photo - 192px height]                          │
│   ┌────────────┐                                       │
│   │            │   Warriors Athletic Club ✓            │
│   │  [Logo]    │   Professional Sports Team            │
│   │            │   New York, USA                       │
│   └────────────┘   Official iPractus profile...       │
│                  [Follow] [Message]                    │
└────────────────────────────────────────────────────────┘
```

**Stats Bar:**
```
┌────────────────────────────────────────────────────────┐
│  ┌─────────┐  ┌─────────┐  ┌─────────┐               │
│  │ Members │  │ Posts   │  │ Trophies│               │
│  │  1.2k   │  │  450    │  │   12    │               │
│  └─────────┘  └─────────┘  └─────────┘               │
└────────────────────────────────────────────────────────┘
```

**Tabbed Navigation:**
```
┌────────────────────────────────────────────────────────┐
│  ┌──────┐  ┌──────┐  ┌──────┐                        │
│  │ Feed │  │Roster│  │Media │                        │
│  └──────┘  └──────┘  └──────┘                        │
└────────────────────────────────────────────────────────┘
```

#### Feed Tab
- Team announcements
- Posts by members
- Event updates
- Performance highlights

#### Roster Tab
- Coach/Staff section
- Player list
- Roles and positions
- Join requests (if admin)

#### Media Tab
- Photo grid
- Video highlights
- Match recordings
- Document sharing

**Design Specs:**
- Cover height: 192px
- Logo size: 112x112px
- Logo offset: -48px from cover bottom
- White card background with shadow

**Navigation:**
- Back: Teams List
- Share: Share Team
- Tap post: Post Detail
- Tap member: Member Profile
- Tap follow: Toggle Follow

---

### 3. Team Roster Management
**File:** `team_roster_management.html`

**Purpose:** Manage team members (admin only)

**Sections:**

#### Staff Section
- Head Coach
- Assistant Coaches
- Trainers
- Support staff

#### Players Section
- Active roster
- Injured list
- Reserved players

#### Pending Requests
- Join requests with Accept/Decline
- Invite sent status

**Actions:**
- Add member
- Remove member
- Promote to admin
- Send invitation

---

### 4. Create Team Flow
**Purpose:** Create a new team

**Steps:**
1. Team Info
   - Name
   - Sport
   - League/Division
   - Location

2. Branding
   - Logo upload
   - Cover photo
   - Team colors
   - Description

3. Settings
   - Privacy (public/private)
   - Join approval (auto/invite only)
   - Member roles

4. Invite Members
   - From contacts
   - From iPractus users
   - Share invite link

---

### 5. Team Settings
**File:** `group_chat_settings.html` (similar structure)

**Options:**
- Edit team info
- Privacy settings
- Notification preferences
- Member management
- Leave team / Delete team

---

## Team Data Models

```typescript
interface Team {
  id: string;
  name: string;
  logo: string;
  coverPhoto: string;
  sport: Sport;
  league?: string;
  location: Location;
  description: string;
  isPublic: boolean;
  memberCount: number;
  postCount: number;
  verified: boolean;
  createdAt: Date;
}

interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: 'owner' | 'admin' | 'coach' | 'player' | 'fan';
  status: 'active' | 'inactive' | 'pending';
  joinedAt: Date;
}

interface TeamPost {
  id: string;
  teamId: string;
  authorId: string;
  content: string;
  media?: Media[];
  type: 'announcement' | 'update' | 'highlight' | 'general';
  createdAt: Date;
  likes: number;
  comments: number;
}

interface TeamEvent {
  id: string;
  teamId: string;
  title: string;
  date: Date;
  location: string;
  type: 'match' | 'practice' | 'meeting' | 'other';
  rsvpCount: number;
}
```

---

## Team Profile Component

```typescript
const TeamProfileScreen = () => {
  const { teamId } = useRouteParams();
  const [activeTab, setActiveTab] = useState<'feed' | 'roster' | 'media'>('feed');
  const { data: team } = useTeam(teamId);

  return (
    <ScrollView style={styles.container}>
      {/* Cover Photo */}
      <ImageBackground
        source={{ uri: team.coverPhoto }}
        style={styles.cover}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.coverGradient}
        />
      </ImageBackground>

      {/* Logo & Info */}
      <View style={styles.hero}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: team.logo }} style={styles.logo} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{team.name}</Text>
            {team.verified && (
              <Ionicons name="checkmark-circle" size={20} color="#137fec" />
            )}
          </View>

          <Text style={styles.sport}>{team.sport} • {team.location}</Text>
          <Text style={styles.description}>{team.description}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button style={styles.followButton}>
            Follow
          </Button>
          <Button style={styles.messageButton} variant="outline">
            Message
          </Button>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <StatCard label="Members" value={formatNumber(team.memberCount)} />
        <StatCard label="Posts" value={formatNumber(team.postCount)} />
        <StatCard label="Trophies" value="12" />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Tab
          label="Feed"
          active={activeTab === 'feed'}
          onPress={() => setActiveTab('feed')}
        />
        <Tab
          label="Roster"
          active={activeTab === 'roster'}
          onPress={() => setActiveTab('roster')}
        />
        <Tab
          label="Media"
          active={activeTab === 'media'}
          onPress={() => setActiveTab('media')}
        />
      </View>

      {/* Tab Content */}
      {activeTab === 'feed' && <TeamFeed teamId={teamId} />}
      {activeTab === 'roster' && <TeamRoster teamId={teamId} />}
      {activeTab === 'media' && <TeamMedia teamId={teamId} />}
    </ScrollView>
  );
};
```

---

## Team Card Component

```typescript
interface TeamCardProps {
  team: Team;
  isActive?: boolean;
  onPress: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isActive && styles.activeCard]}
      onPress={onPress}
    >
      <Image
        source={{ uri: team.logo }}
        style={styles.logo}
      />

      {isActive && (
        <View style={styles.activeBadge}>
          <Text style={styles.activeBadgeText}>ACTIVE</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{team.name}</Text>
        <Text style={styles.details}>
          {team.sport} • {team.league || 'Independent'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 140,
    backgroundColor: '#f6f7f8',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  activeCard: {
    borderWidth: 2,
    borderColor: '#137fec',
    backgroundColor: 'white',
  },
  logo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  activeBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#137fec',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111418',
  },
  details: {
    fontSize: 12,
    color: '#617589',
  },
});
```

---

## Implementation Checklist

### Phase 1: Discovery
- [ ] Teams hub screen
- [ ] Your Teams carousel
- [ ] Team cards
- [ ] Search functionality
- [ ] Category filters

### Phase 2: Team Profile
- [ ] Team profile screen
- [ ] Hero section with cover
- [ ] Stats bar
- [ ] Tab navigation
- [ ] Feed tab content
- [ ] Roster tab content
- [ ] Media tab content

### Phase 3: Management
- [ ] Create team flow
- [ ] Team settings
- [ ] Member management
- [ ] Invite system

---

## Files to Implement

| Component | File Path | Priority |
|-----------|-----------|----------|
| TeamsScreen | `src/screens/teams/TeamsScreen.tsx` | P0 |
| TeamProfileScreen | `src/screens/teams/TeamProfileScreen.tsx` | P0 |
| TeamRosterScreen | `src/screens/teams/TeamRosterScreen.tsx` | P1 |
| CreateTeamScreen | `src/screens/teams/CreateTeamScreen.tsx` | P1 |
| TeamSettingsScreen | `src/screens/teams/TeamSettingsScreen.tsx` | P1 |
| TeamCard | `src/components/teams/TeamCard.tsx` | P0 |
| TeamFeed | `src/components/teams/TeamFeed.tsx` | P0 |
| TeamRoster | `src/components/teams/TeamRoster.tsx` | P1 |
