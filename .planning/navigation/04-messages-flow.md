# Messages & Chat Flow Documentation

## Overview
Messaging system with chat list, 1-on-1 conversations, and group chats.

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        MESSAGES FLOW                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Messages (Chat List)                     │   │
│  │  • Story carousel (active users)                            │   │
│  │  • Search bar                                               │   │
│  │  • Chat list with unread badges                             │   │
│  │  • FAB: New conversation                                    │   │
│  └────────┬────────────────────────────────────────────────────┘   │
│           │                                                         │
│           ├──────────────┬──────────────┐                          │
│           ▼              ▼              ▼                          │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐              │
│  │  1-on-1      │ │  Group       │ │  Video       │              │
│  │  Chat        │ │  Chat        │ │  Call        │              │
│  └──────────────┘ └──────────────┘ └──────────────┘              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Screen Details

### 1. Messages (Chat List)
**Files:**
- `messages.html` (iPractus)
- `pistachio_messages__system_v2.html` (Pistachio)

**Purpose:** Main hub for all conversations

**TopAppBar:**
```
┌────────────────────────────────────────────────────────┐
│  ◀      Messages                    ⚙️              │
│  [Avatar]                                       [Bell] │
└────────────────────────────────────────────────────────┘
```

**Content Sections:**

#### Story Carousel (Pistachio Design)
- Horizontal scrollable list
- Active user avatars with cyan status dot
- Labels: "Coach", user names
- 80px width per item

#### Search Bar
- Placeholder: "Search athletes and coaches..."
- Search icon in left
- Full width rounded input

#### Chat List
| Element | Description |
|---------|-------------|
| Avatar | 56px circular, online status indicator |
| Name | Bold, 16px |
| Last message | Medium, 14px, truncated |
| Time | Right side, 12px, gray |
| Unread badge | Primary circle with count (if unread) |
| Active state | Left border accent, darker background |

**iPractus Design:**
- Header with "Messages" title
- Back button (if from elsewhere)
- Settings icon

**Pistachio Design:**
- Profile avatar + settings icon
- "Messages" title
- Story carousel above chats

**Navigation:**
- Tap chat → 1-on-1 Chat or Group Chat
- Tap settings → Chat Settings
- Tap FAB → New Conversation / Create Group
- Tap story → User Status

---

### 2. 1-on-1 Message Chat
**Files:**
- `1_on_1_message_chat.html` (iPractus)
- `pistachio_1_on_1_chat__v2.html` (Pistachio)

**Purpose:** Direct messaging with another user

**TopAppBar:**
```
┌────────────────────────────────────────────────────────┐
│  ◀  [Avatar]  Coach Marcus  ● Online    [📹] [ℹ️]    │
└────────────────────────────────────────────────────────┘
```

**AppBar Elements:**
- Left: Back button
- Avatar: 40px circular
- Name: Bold, 16px
- Status: "Online" with green dot
- Right Actions:
  - Video call button
  - Info button

**Content Sections:**

#### Date Divider
- Centered badge: "Today", "Yesterday"
- Background: elevated, rounded full

#### Messages
**Received (Left):**
```
┌─────────────────────────────────────────────┐
│ [Avatar]                                     │
│ ┌───────────────────────────────────────┐   │
│ │ Hey! Ready for practice today?        │   │
│ └───────────────────────────────────────┘   │
│ 10:30 AM                                    │
└─────────────────────────────────────────────┘
```
- Avatar: 28px
- Bubble: `#2d353e`, rounded-bl-none
- Text: `#f1f5f9`, 15px
- Time: `#64748b`, 10px

**Sent (Right):**
```
┌─────────────────────────────────────────────┐
│ ┌───────────────────────────────────────┐   │
│ │        Absolutely! Got gear ready.   │   │
│ └───────────────────────────────────────┘   │
│                                    10:32 AM  │
└─────────────────────────────────────────────┘
```
- Bubble: `#1173d4`, rounded-br-none
- Text: White, 15px
- Time: Right-aligned

**Media Messages:**
```
┌─────────────────────────────────────────────┐
│ ┌───────────────────────────────────────┐   │
│ │  ╔═════════════════════════════════╗  │   │
│ │  ║   [Image Preview]              ║  │   │
│ │  ║                                 ║  │   │
│ │  ╚═════════════════════════════════╝  │   │
│ └───────────────────────────────────────┘   │
│                                    10:33 AM  │
└─────────────────────────────────────────────┘
```
- Aspect ratio 4:3
- Rounded corners
- Download overlay on hover/press

**Input Area (Footer):**
```
┌─────────────────────────────────────────────────────┐
│  [+]  [────── Message ──────────] [😊] [🎤] [⬆]    │
│                   ════                                 │
└─────────────────────────────────────────────────────┘
```
- Left: Add attachment button
- Center: Text input, rounded full
- Right: Emoji, Mic, Send buttons
- Send: Primary circle, appears when typing

**Pistachio Design:**
- Darker background: `#0a0f14`
- Recipient bubble: `#2d353e`
- Primary: `#1173d4`
- Cyan status: `#66D9E8`

**Navigation:**
- Back: Messages List
- Video: Video Call Screen
- Info: Chat Info / Profile

---

### 3. Group Chat Settings
**File:** `group_chat_settings.html`

**Purpose:** Manage group conversation

**Sections:**
- Group name and avatar
- Members list (admin badges)
- Add/remove members
- Notifications toggle
- Media permissions
- Leave group option

---

### 4. Video Call
**Files:**
- `video_call.html` (iPractus)
- `pistachio_video_call__system_v2.html` (Pistachio)

**Purpose:** Video calling interface

**Layout:**
```
┌────────────────────────────────────────────────────────┐
│  [◀]  Coach Marcus                    [📱] [⏹️] [🔄]  │
├────────────────────────────────────────────────────────┤
│                                                        │
│                                                        │
│                   [Remote Video]                       │
│                   Full Width                           │
│                                                        │
│                                                        │
├────────────────────────────────────────────────────────┤
│  [Local Self View - PIP]                               │
│                                                        │
│  [🎤] [📷] [💬] [⏸️]              [📞]  ✚1:23          │
└────────────────────────────────────────────────────────┘
```

**Controls:**
- Mic toggle
- Camera toggle
- Chat (minimized)
- End call
- Participant count

---

## Chat State Management

```typescript
interface Message {
  id: string;
  senderId: string;
  recipientId?: string; // For 1-on-1
  groupId?: string; // For group chats
  content: string;
  type: 'text' | 'image' | 'video' | 'audio';
  mediaUrl?: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  type: 'direct' | 'group';
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  isMuted: boolean;
}

interface ChatState {
  conversations: Conversation[];
  activeConversation: string | null;
  messages: Record<string, Message[]>;
  isTyping: Record<string, boolean>;
}
```

---

## Message List Component

```typescript
const MessageList = () => {
  const { conversations } = useChat();

  const renderConversation = (item: Conversation) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigateToChat(item.id)}
    >
      <View style={styles.avatarContainer}>
        <Avatar src={item.avatar} size={56} />
        {item.isOnline && <OnlineIndicator />}
        {item.unreadCount > 0 && (
          <UnreadBadge count={item.unreadCount} />
        )}
      </View>

      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{formatTime(item.lastMessage.timestamp)}</Text>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage.content}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={conversations}
      renderItem={renderConversation}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<StoryCarousel />}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
};
```

---

## Chat Bubble Component

```typescript
interface ChatBubbleProps {
  message: Message;
  isSent: boolean;
  showAvatar?: boolean;
  senderName?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isSent,
  showAvatar,
  senderName,
}) => {
  return (
    <View style={[styles.container, isSent && styles.sentContainer]}>
      {showAvatar && !isSent && (
        <Avatar src={message.senderAvatar} size={28} style={styles.avatar} />
      )}

      <View
        style={[
          styles.bubble,
          isSent ? styles.sentBubble : styles.receivedBubble,
        ]}
      >
        {senderName && !isSent && (
          <Text style={styles.senderName}>{senderName}</Text>
        )}

        {message.type === 'text' && (
          <Text style={[styles.text, isSent && styles.sentText]}>
            {message.content}
          </Text>
        )}

        {message.type === 'image' && (
          <Image source={{ uri: message.mediaUrl }} style={styles.image} />
        )}

        {message.type === 'video' && (
          <VideoPlayer uri={message.mediaUrl} />
        )}

        <Text style={[styles.time, isSent && styles.sentTime]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sentContainer: {
    justifyContent: 'flex-end',
  },
  avatar: {
    marginRight: 8,
    marginBottom: 20,
  },
  bubble: {
    maxWidth: '85%',
    padding: 12,
    borderRadius: 20,
  },
  receivedBubble: {
    backgroundColor: '#2d353e',
    borderTopLeftRadius: 4,
  },
  sentBubble: {
    backgroundColor: '#1173d4',
    borderTopRightRadius: 4,
  },
  text: {
    color: '#f1f5f9',
    fontSize: 15,
    lineHeight: 20,
  },
  sentText: {
    color: 'white',
  },
  time: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 4,
  },
  sentTime: {
    textAlign: 'right',
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 12,
  },
});
```

---

## Input Area Component

```typescript
const ChatInput = () => {
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.attachButton}>
        <Ionicons name="add-circle" size={28} color="#94a3b8" />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Message..."
          placeholderTextColor="#64748b"
          value={text}
          onChangeText={setText}
          multiline
        />
        <TouchableOpacity onPress={() => setShowEmoji(!showEmoji)}>
          <Ionicons name="happy-outline" size={22} color="#64748b" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.micButton}>
        <Ionicons name="mic" size={26} color="#94a3b8" />
      </TouchableOpacity>

      {text.length > 0 && (
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={22} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};
```

---

## WebSocket Integration

```typescript
// Chat WebSocket connection
const useChatSocket = (conversationId: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const ws = new WebSocket(`wss://api.ipractus.com/chat/${conversationId}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'message':
          setMessages((prev) => [...prev, data.message]);
          break;
        case 'typing':
          handleTypingIndicator(data);
          break;
        case 'read':
          markMessageAsRead(data.messageId);
          break;
      }
    };

    setSocket(ws);

    return () => ws.close();
  }, [conversationId]);

  const sendMessage = (content: string) => {
    socket?.send(JSON.stringify({
      type: 'message',
      content,
      timestamp: new Date().toISOString(),
    }));
  };

  return { messages, sendMessage };
};
```

---

## Implementation Checklist

### Phase 1: Core Chat
- [ ] Messages list screen
- [ ] 1-on-1 chat screen
- [ ] Message bubbles (sent/received)
- [ ] Input area with send
- [ ] Real-time messaging

### Phase 2: Features
- [ ] Media attachments
- [ ] Emoji picker
- [ ] Voice messages
- [ ] Typing indicators
- [ ] Read receipts

### Phase 3: Advanced
- [ ] Group chat
- [ ] Video calling
- [ ] Chat search
- [ ] Message reactions
- [ ] Reply/forward

---

## Files to Implement

| Component | File Path | Priority |
|-----------|-----------|----------|
| MessagesScreen | `src/screens/messages/MessagesScreen.tsx` | P0 |
| ChatScreen | `src/screens/messages/ChatScreen.tsx` | P0 |
| MessageBubble | `src/components/chat/MessageBubble.tsx` | P0 |
| ChatInput | `src/components/chat/ChatInput.tsx` | P0 |
| StoryCarousel | `src/components/chat/StoryCarousel.tsx` | P1 |
| VideoCallScreen | `src/screens/messages/VideoCallScreen.tsx` | P1 |
| ChatContext | `src/contexts/ChatContext.tsx` | P0 |
