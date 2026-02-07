import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
const FEED_COLORS = {
  primary: '#b4fb50',
  backgroundNavy: '#071a36',
  cardDark: '#000c1e',
  accentTeal: '#428389',
  border: 'rgba(255,255,255,0.1)',
  textMuted: '#9ca3af',
};

const POSTS = [
  {
    id: '1',
    author: 'Alex Rivera',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfoAFpf2-Cob8RsKf5FX1QxLiNH9p26Wgtsuayce7R5un-HsCskV7fI2TpYWpY0s5gjTiIwXOD0spUBBv1GT3aZeadXuyxUTwTFS7SEE3KRmKQR3bX-l12YoC_I_AXDqGk7P2RG_rAarp2HS136O62ppr0oyH8NpKFU_72A03llKkXghp3zDeIU99mq5t-O9eDlz2vjr8gu6zI0Wkuco8DWcOYqM_tvgePFwbicGTn944ra9CzYEPfzuseogOmYc4AtW6en20Caqmw',
    badge: 'Athlete',
    badgeColor: '#60a5fa',
    badgeBg: 'rgba(59, 130, 246, 0.2)',
    time: '2h ago',
    location: 'Pro League',
    content: "Just finished a great morning session! Working on my explosive power today. Feels good to be back on the grind. #iPrActUS #TrainingDay",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4kCowaqWO_4m7nKa3VV5MF-1xsiULYJ9GchPVx8bCfDcWb1S3NTYPRae67ivS5RyJLuifn0lIMjbGbQKFfrAfd-pgZfXiOD_szCsO2jxi4k5UaphqNFQ-mN7hQFUIp5ILMxY2BlLI_jWznyVkTqegZTufLbHm-K6Uge8foMfZxg2-9SjRNErYmrdapGRRnVtg8p-cbkXCfSG1xPtXTvqgMsjz01-j0t5aY_uJbHR5kmh-Pxvauh85683I9wPGsiMpknkV9iBTiLvE',
    aspectRatio: 4 / 3,
    likes: 24,
    comments: 5,
    isVideo: false,
    likeLabel: 'Like',
    statsIcon: 'thumbs-up',
  },
  {
    id: '2',
    author: 'Coach Sarah Jenkins',
    avatar: null,
    badge: 'Coach',
    badgeColor: '#34d399',
    badgeBg: 'rgba(16, 185, 129, 0.2)',
    time: '4h ago',
    location: 'High Performance',
    content: "Quick tip for all my athletes: Consistency is key. Even on the days you don't feel like it, show up for your future self. 🏀",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALaDh-6DWXPmGruY0Li2lxzHkyVmvUV545Ln2721ZPPEB1jM6QfPvUmN4Pdf3H3J7iX_G_NIGOONQ3i3Vfe6LyLqOwarLLva2vHw-97LolS-n9GJrxmFwK4mEAKHfhJnEhESpUgKWOBawBA4dSfGWU1kLDoscGFEtDRPx8mptZ3fXjKKyTxG87paHPDk4W2l6bM7ivea0foIDeH0vGpO9VSbv8DixOsajerCL-ZZhSwa_J6zwyw-RCBdlz9-S9uqBKbAJCMKPABGGp',
    aspectRatio: 16 / 9,
    likes: 56,
    comments: 12,
    shares: 3,
    isVideo: true,
    likeLabel: 'Helpful',
    statsIcon: 'thumbs-up',
  },
];

type TabType = 'home' | 'teams' | 'feed' | 'profile';

export const SocialFeedScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
  };

  const renderPost = (post: typeof POSTS[0]) => {
    const isLiked = likedPosts.has(post.id);

    return (
      <View key={post.id} style={styles.card}>
        <LinearGradient
          colors={[FEED_COLORS.accentTeal, FEED_COLORS.cardDark] as any}
          locations={[0, 0.65]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.cardInner}>
          {/* Header */}
          <View style={styles.postHeader}>
            <View style={styles.authorRow}>
              {post.avatar ? (
                <Image source={{ uri: post.avatar }} style={styles.avatar} />
              ) : (
                <View style={[styles.avatarPlaceholder, { backgroundColor: FEED_COLORS.accentTeal }]}>
                  <Ionicons name="person" size={24} color="#fff" />
                </View>
              )}
              <View>
                <View style={styles.nameBadgeRow}>
                  <Text style={styles.authorName}>{post.author}</Text>
                  <View style={[styles.badge, { backgroundColor: post.badgeBg }]}>
                    <Text style={[styles.badgeText, { color: post.badgeColor }]}>{post.badge}</Text>
                  </View>
                </View>
                <Text style={styles.postMeta}>{post.time} • {post.location}</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="ellipsis-horizontal" size={22} color={FEED_COLORS.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.contentWrap}>
            <Text style={styles.contentText}>{post.content}</Text>
          </View>

          {/* Media */}
          <View style={[styles.mediaWrap, { aspectRatio: post.aspectRatio }]}>
            <Image source={{ uri: post.image }} style={[styles.mediaImage, post.isVideo && { opacity: 0.6 }]} resizeMode="cover" />
            {post.isVideo && (
              <View style={styles.videoOverlay}>
                <View style={styles.playBtn}>
                  <Ionicons name="play" size={36} color="#fff" />
                </View>
              </View>
            )}
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.likesRow}>
              <Ionicons name={post.statsIcon as any} size={18} color={FEED_COLORS.primary} />
              <Text style={styles.statsText}>
                {post.likes} {post.likes === 1 ? 'like' : post.id === '2' ? 'people liked this' : 'likes'}
              </Text>
            </View>
            <Text style={styles.statsText}>
              {post.comments} comments
              {post.shares ? ` • ${post.shares} shares` : ''}
            </Text>
          </View>

          {/* Actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => toggleLike(post.id)}>
              <Ionicons
                name={isLiked ? 'thumbs-up' : 'thumbs-up-outline'}
                size={22}
                color={isLiked ? FEED_COLORS.primary : FEED_COLORS.textMuted}
              />
              <Text style={[styles.actionLabel, { color: isLiked ? FEED_COLORS.primary : FEED_COLORS.textMuted }]}>
                {post.likeLabel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="chatbubble-outline" size={22} color={FEED_COLORS.textMuted} />
              <Text style={[styles.actionLabel, { color: FEED_COLORS.textMuted }]}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons name="share-outline" size={22} color={FEED_COLORS.textMuted} />
              <Text style={[styles.actionLabel, { color: FEED_COLORS.textMuted }]}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const Header = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.headerAvatarWrap}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfoAFpf2-Cob8RsKf5FX1QxLiNH9p26Wgtsuayce7R5un-HsCskV7fI2TpYWpY0s5gjTiIwXOD0spUBBv1GT3aZeadXuyxUTwTFS7SEE3KRmKQR3bX-l12YoC_I_AXDqGk7P2RG_rAarp2HS136O62ppr0oyH8NpKFU_72A03llKkXghp3zDeIU99mq5t-O9eDlz2vjr8gu6zI0Wkuco8DWcOYqM_tvgePFwbicGTn944ra9CzYEPfzuseogOmYc4AtW6en20Caqmw' }}
            style={styles.headerAvatar}
          />
        </View>
        <Text style={styles.brandLogo}>
          <Text style={styles.brandPart}>iPR</Text><Text style={styles.brandSlash}>/</Text><Text style={styles.brandPart}>ACT</Text><Text style={styles.brandSlash}>:</Text><Text style={styles.brandPart}>US</Text>
        </Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity>
          <Ionicons name="search" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notifBtn}>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
          <View style={styles.notifBadge} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const Composer = () => (
    <View style={styles.composer}>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfoAFpf2-Cob8RsKf5FX1QxLiNH9p26Wgtsuayce7R5un-HsCskV7fI2TpYWpY0s5gjTiIwXOD0spUBBv1GT3aZeadXuyxUTwTFS7SEE3KRmKQR3bX-l12YoC_I_AXDqGk7P2RG_rAarp2HS136O62ppr0oyH8NpKFU_72A03llKkXghp3zDeIU99mq5t-O9eDlz2vjr8gu6zI0Wkuco8DWcOYqM_tvgePFwbicGTn944ra9CzYEPfzuseogOmYc4AtW6en20Caqmw' }}
        style={styles.composerAvatar}
      />
      <TextInput
        style={styles.composerInput}
        placeholder="What's on your mind?"
        placeholderTextColor="#9ca3af"
        editable={false}
      />
      <TouchableOpacity>
        <Ionicons name="image-outline" size={28} color={FEED_COLORS.primary} />
      </TouchableOpacity>
    </View>
  );

  const BottomNav = () => (
    <View style={[styles.bottomNav, { paddingBottom: Math.max(32, insets.bottom) }]}>
      {([
        { key: 'home', icon: activeTab === 'home' ? 'home' : 'home-outline', label: 'Home' },
        { key: 'teams', icon: activeTab === 'teams' ? 'people' : 'people-outline', label: 'Teams' },
      ] as const).map(({ key, icon, label }) => (
        <TouchableOpacity key={key} style={styles.navItem} onPress={() => setActiveTab(key)}>
          <Ionicons name={icon as any} size={28} color={activeTab === key ? FEED_COLORS.primary : FEED_COLORS.textMuted} />
          <Text style={[styles.navLabel, { color: activeTab === key ? FEED_COLORS.primary : FEED_COLORS.textMuted }]}>{label}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.addBtnWrap}>
        <View style={styles.addBtn}>
          <Ionicons name="add" size={32} color={FEED_COLORS.backgroundNavy} />
        </View>
      </TouchableOpacity>
      {([
        { key: 'feed', icon: activeTab === 'feed' ? 'newspaper' : 'newspaper-outline', label: 'Feed' },
        { key: 'profile', icon: activeTab === 'profile' ? 'person-circle' : 'person-circle-outline', label: 'Profile' },
      ] as const).map(({ key, icon, label }) => (
        <TouchableOpacity key={key} style={styles.navItem} onPress={() => setActiveTab(key)}>
          <Ionicons name={icon as any} size={28} color={activeTab === key ? FEED_COLORS.primary : FEED_COLORS.textMuted} />
          <Text style={[styles.navLabel, { color: activeTab === key ? FEED_COLORS.primary : FEED_COLORS.textMuted }]}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeTop} />
      <Header />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Composer />
        <View style={styles.feedList}>
          {POSTS.map((p) => (
            <View key={p.id} style={styles.cardSpacer}>
              {renderPost(p)}
            </View>
          ))}
        </View>
        <View style={{ height: 110 }} />
      </ScrollView>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FEED_COLORS.backgroundNavy,
  },
  safeTop: { backgroundColor: 'transparent' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: FEED_COLORS.border,
    backgroundColor: 'rgba(7, 26, 54, 0.9)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerAvatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: FEED_COLORS.primary,
    overflow: 'hidden',
  },
  headerAvatar: {
    width: '100%',
    height: '100%',
  },
  brandLogo: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
    fontStyle: 'italic',
  },
  brandPart: { color: FEED_COLORS.primary },
  brandSlash: { color: 'rgba(255,255,255,0.8)', marginHorizontal: 2 },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  notifBtn: {
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: FEED_COLORS.primary,
    borderWidth: 1,
    borderColor: FEED_COLORS.backgroundNavy,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  composerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  composerInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#fff',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 16 },
  feedList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cardSpacer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: FEED_COLORS.border,
    overflow: 'hidden',
  },
  cardInner: {},
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  postMeta: {
    fontSize: 12,
    color: FEED_COLORS.textMuted,
  },
  contentWrap: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(229, 231, 235, 1)',
  },
  mediaWrap: {
    width: '100%',
    backgroundColor: '#000',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  likesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statsText: {
    fontSize: 12,
    color: FEED_COLORS.textMuted,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: 12,
    paddingBottom: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 90,
    paddingBottom: 32,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(7, 26, 54, 0.95)',
    borderTopWidth: 1,
    borderTopColor: FEED_COLORS.border,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  addBtnWrap: {
    alignItems: 'center',
    marginTop: -16,
  },
  addBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: FEED_COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: FEED_COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
      },
      android: { elevation: 12 },
    }),
  },
});
