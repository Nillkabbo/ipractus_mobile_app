# Phase 2: Social Feed + Teams - Context

**Gathered:** 2026-02-04
**Status:** Ready for planning
**Source:** Follows Stitch project (15416072341346391054) design patterns

## Phase Boundary

Social content sharing through posts with text, images, and videos; and team-based communities where users can browse, join, and post within teams.

## Implementation Decisions

### Feed Layout
- **Design reference:** Follow Stitch Social Feed design exactly (project 15416072341346391054)
- **Content visibility:** Full content visible inline — author info, all content visible, expand to see comments
- **Media display:** Achieve from Stitch design — follow pattern for images/videos in feed
- **Metadata:** Full metadata on each post — user avatar, name, timestamp, like/comment counts visible
- **Loading behavior:** Infinite scroll for loading more posts
- **Refresh:** Pull-to-refresh to see new posts
- **Empty state:** Friendly empty state with graphic + "Follow people to see posts" message
- **Ordering:** Chronological — most recent first
- **Team posts:** Filter icon to toggle between All Posts and Team Posts (not separate tabs)
- **Post separation:** Follow Stitch pattern for visual separation between posts
- **Multiple images:** Apply best practice for displaying multiple images in a post
- **Video preview:** Caption with thumbnail overlay showing play icon

### Post Creation
- **Creation experience:** Full post creation screen (not modal/sheet)
- **Flow:** Text-primary flow — text first, then attach media
- **Media attachment:** Inline media buttons to attach images/videos with text
- **Preview:** Live preview shows exactly how post will appear before publishing

### Interactions
- **Liking:** Double-tap to like + heart button to like/unlike
- **Comments:** Inline comments shown below post, expand to view all
- **Comment threading:** Threaded comments support nested replies (like Instagram)
- **Post editing:** Edit and delete allowed on own posts

### Team Discovery
- **Browse display:** Achieve from Stitch design
- **Finding teams:** Search + filters (category filters for Sports, Location, Skill Level)
- **Team card info:** Full card info — team name, logo, sport, member count, location
- **Joining:** Request workflow — tap "Request to Join", await approval notification

### Claude's Discretion
- Exact spacing and typography for post components
- Loading skeleton design
- Error state handling
- Maximum character limits for posts and comments
- Comment depth limits for threading
- Video thumbnail sizing and aspect ratios
- Image carousel/swipe behavior for multiple images
- Notification types and badges for requests

## Specific Ideas

- Use Stitch project (15416072341346391054) as the primary design reference
- Design theme: DARK mode, #137fec primary color, Lexend font, 8px roundness
- Double-tap to like (Instagram-style)
- Threaded comment replies
- Filter icon for team posts vs. all posts

## Deferred Ideas

None — discussion stayed within phase scope.

---

*Phase: 02-social-feed-teams*
*Context gathered: 2026-02-04*
