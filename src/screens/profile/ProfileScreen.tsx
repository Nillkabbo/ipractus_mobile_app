import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PROFILE_COLORS = {
  primary: '#b4fb50',
  backgroundNavy: '#071a36',
  cardDark: '#13233c',
  accentTeal: '#428389',
  border: 'rgba(255,255,255,0.05)',
  textMuted: '#94a3b8',
};

const COVER_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDVc55r8cmQnsITXUpsM5UFPlXqKfwAid8l_OuPDsDIpir7-QcQlgO1EQKn9pJ6OiYVeFARyMYRwsyhTIc8rkqfQg6m2si-8lsRLUociU-JL8BCkpojX0yLaxcTsQwedc4LgjiH8NolDcceK3nneYmgCNviyX_x7RN_X68BrJ9fAJlkLr5ioK1K_AXqeBzK87476GuOjgRJAOFlj5XKH0nq8OxRI5vuIkWmRfDITxmweDXsx_roHYySMzXzz4w-S-PokIfK-IgYcKPN';
const AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAf4F_VZZkVIYjyimadMThaVW7S3cNkHFzzRsoObqwo6HpxOizGpy0c6GdwklUe5mIu-VYE0Yi8-VOMcBaQOInJZBq1SYfwtxUyjfYsVOvl5ErfzGmlMTIgegpzioLW4rE9Ro_nTbDScQQsHtgkHCWoiSwblRZoPcNxgD2gDp1lMcuQDQhse62hV8bvVJl7jhrUlDxgiV2pE';

const ANNOUNCEMENTS = [
  {
    id: '1',
    author: 'Coach Marcus Rivera',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6CsGOiXc3Nkt5dwyKbwlP3XYjack4HX7GE5Uma95YATJKKlq8ZdRVvb-KSYk-_iTZ3HAmM2Md8BMJhggXddb3YEAHt4izIFDvKHbJ3CJrG_VX0KG3bEB0g05L9V14Pz2zcpOkJCq-j_Mc9C7Re5GIZwIc0ocvHXfi8uqjrLxVX77k1xSbLE_IwKnYlFiVT3oV0zI2lpHf9bTp9svK53K4KYlmifGQzIItiYnQxqNfSR8pyYhJ0a-NKpKgvGsjYe8Md_gs8ktruq7',
    time: '2 hours ago',
    content:
      "Great practice session today, team! The focus on defensive rotations was exactly what we needed before Friday's qualifier. Keep that energy up! 🔥",
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuLEeQvL7Sf3ZLfbmqRGMMU1XJ9_46p9AwFrRwCzRG1CoHzxHkCRport14cyQaD647_1F3-RTWKXlgp1-hjpfQoZrRmZaqj-8T_ip4SETY7OPSYuC9MbMM6n__SnCrjY7J0gmLDjMephHgf4PM_aQXYdlPqVTFF_0Zvkt5fClotWzjWTdpF9QLMwld_l-AL1GNAbmytoYGGXzfbjsOdVypQ65rc-fzFEwMz12HuOH3SjarslLyR2WHc1oztmoz7sJ8JkQfDWEkpVTFF_0Zvkt5fClotWzjWTdpF9QLMwld_l-AL1GNAbmytoYGGXzfbjsOdVypQ65rc-fzFEwMz12HuOH3SjarslLyR2WHc1oztmoz7sJ8JkQfDWEkpVTFF_0Zvkt5fClotWzjWTdpF9QLMwld_l-AL1GNAbmytoYGGXzfbjsOdVypQ65rc-fzFEwMz12HuOH3SjarslLyR2WHc1oztmoz7sJ8JkQfDWEkpVTFF_0Zvkt5fClotWzjWTdpF9QLMwld_l-AL1GNAbmytoYGGXzfbjsOdVypQ65rc-fzFEwMz12HuOH3SjarslLyR2WHc1oztmoz7sJ8JkQfDWEkpVTFF',
    likes: 124,
    comments: 18,
  },
  {
    id: '2',
    author: 'Warriors Athletic Club',
    time: 'Yesterday at 4:15 PM',
    content:
      "Next home game: Friday, 7:00 PM at the City Center. Tickets are now available in the shop section. Let's pack the house!",
    eventLabel: 'Event Qualifier',
    eventTitle: 'Warriors vs. Titans',
    iconBg: 'blue',
  },
];

type TabType = 'feed' | 'roster' | 'media';

export const ProfileScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<TabType>('feed');

  const displayName = user?.displayName || 'Warriors Athletic Club';
  const subtitle = user?.role
    ? `${user.role === 'coach' ? 'Coach' : user.role === 'athlete' ? 'Athlete' : 'Fan'} • iPrActUS`
    : 'Professional Sports Team • New York, USA';
  const bio =
    "Official iPrActUS profile. Pursuing excellence through discipline and community. #GoWarriors";

  const tabs: { key: TabType; label: string }[] = [
    { key: 'feed', label: 'Feed' },
    { key: 'roster', label: 'Roster' },
    { key: 'media', label: 'Media' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: PROFILE_COLORS.backgroundNavy }]}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: PROFILE_COLORS.backgroundNavy }]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={[styles.headerBtn, { backgroundColor: 'rgba(255,255,255,0.1)' }]}
          >
            <Ionicons name="settings-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Team Profile</Text>
          <TouchableOpacity
            style={[styles.headerBtn, { backgroundColor: 'rgba(255,255,255,0.1)' }]}
          >
            <Ionicons name="share-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          {/* Cover + Avatar */}
          <View style={styles.coverSection}>
            <Image source={{ uri: COVER_URL }} style={styles.cover} resizeMode="cover" />
            <View style={styles.avatarWrapper}>
              <View style={[styles.avatarContainer, { borderColor: PROFILE_COLORS.backgroundNavy }]}>
                <Image source={{ uri: user?.avatarUri || AVATAR_URL }} style={styles.avatar} resizeMode="contain" />
              </View>
            </View>
          </View>

          {/* Name, verified, subtitle, bio */}
          <View style={styles.infoSection}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{displayName}</Text>
              <Ionicons name="checkmark-circle" size={22} color="#60a5fa" style={styles.verified} />
            </View>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.bio}>{bio}</Text>
          </View>

          {/* Follow + Message */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.followBtn, { backgroundColor: PROFILE_COLORS.primary }]} activeOpacity={0.8}>
              <Text style={styles.followBtnText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.messageBtn, { borderColor: PROFILE_COLORS.border }]}
              activeOpacity={0.8}
            >
              <Text style={styles.messageBtnText}>Message</Text>
            </TouchableOpacity>
          </View>

          {/* Stats grid */}
          <View style={styles.statsRow}>
            <LinearGradient
              colors={[PROFILE_COLORS.accentTeal, '#000c1e'] as any}
              locations={[0, 0.65]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.9, y: 1 }}
              style={[styles.statCard, { borderColor: PROFILE_COLORS.border }]}
            >
              <Text style={styles.statLabel}>Members</Text>
              <Text style={styles.statValue}>1.2k</Text>
            </LinearGradient>
            <LinearGradient
              colors={[PROFILE_COLORS.accentTeal, '#000c1e'] as any}
              locations={[0, 0.65]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.9, y: 1 }}
              style={[styles.statCard, { borderColor: PROFILE_COLORS.border }]}
            >
              <Text style={styles.statLabel}>Posts</Text>
              <Text style={styles.statValue}>450</Text>
            </LinearGradient>
            <LinearGradient
              colors={[PROFILE_COLORS.accentTeal, '#000c1e'] as any}
              locations={[0, 0.65]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.9, y: 1 }}
              style={[styles.statCard, { borderColor: PROFILE_COLORS.border }]}
            >
              <Text style={styles.statLabel}>Trophies</Text>
              <Text style={styles.statValue}>12</Text>
            </LinearGradient>
          </View>

          {/* Tabs */}
          <View style={[styles.tabBar, { borderColor: PROFILE_COLORS.border }]}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tab, activeTab === tab.key && styles.tabActive]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: activeTab === tab.key ? '#fff' : PROFILE_COLORS.textMuted },
                    activeTab === tab.key && styles.tabTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Announcements */}
          <View style={styles.announcementsSection}>
            <View style={styles.announcementsHeader}>
              <Text style={styles.announcementsTitle}>Recent Announcements</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            {ANNOUNCEMENTS.map((item) => (
              <View key={item.id} style={styles.announcementCard}>
                <LinearGradient
                  colors={[PROFILE_COLORS.accentTeal, '#000c1e'] as any}
                  locations={[0, 0.65]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.9, y: 1 }}
                  style={[styles.announcementInner, { borderColor: PROFILE_COLORS.border }]}
                >
                  <View style={styles.announcementTop}>
                    <View style={styles.announcementAuthor}>
                      {'avatar' in item ? (
                        <Image source={{ uri: item.avatar }} style={styles.announcementAvatar} />
                      ) : (
                        <View
                          style={[
                            styles.announcementIcon,
                            { backgroundColor: 'rgba(59, 130, 246, 0.2)' },
                          ]}
                        >
                          <Ionicons name="megaphone-outline" size={20} color="#60a5fa" />
                        </View>
                      )}
                      <View>
                        <Text style={styles.announcementAuthorName}>{item.author}</Text>
                        <Text style={styles.announcementTime}>{item.time}</Text>
                      </View>
                    </View>
                    <TouchableOpacity>
                      <Ionicons name="ellipsis-horizontal" size={20} color={PROFILE_COLORS.textMuted} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.announcementContent}>{item.content}</Text>
                  {'image' in item && item.image ? (
                    <Image source={{ uri: item.image }} style={styles.announcementImage} resizeMode="cover" />
                  ) : null}
                  {'eventLabel' in item && item.eventLabel ? (
                    <View style={[styles.eventCta, { borderColor: PROFILE_COLORS.border }]}>
                      <View>
                        <Text style={styles.eventLabel}>{item.eventLabel}</Text>
                        <Text style={styles.eventTitle}>{item.eventTitle}</Text>
                      </View>
                      <TouchableOpacity style={[styles.rsvpBtn, { backgroundColor: PROFILE_COLORS.primary }]}>
                        <Text style={styles.rsvpBtnText}>RSVP</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  {'likes' in item ? (
                    <View style={styles.announcementFooter}>
                      <View style={styles.footerActions}>
                        <TouchableOpacity style={styles.footerBtn}>
                          <Ionicons name="heart" size={18} color="#ef4444" />
                          <Text style={styles.footerBtnText}>{item.likes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.footerBtn}>
                          <Ionicons name="chatbubble-outline" size={18} color={PROFILE_COLORS.textMuted} />
                          <Text style={styles.footerBtnText}>{item.comments}</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity>
                        <Ionicons name="bookmark-outline" size={20} color={PROFILE_COLORS.textMuted} />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </LinearGradient>
              </View>
            ))}
          </View>
          <View style={{ height: 24 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  scroll: {
    flex: 1,
  },
  coverSection: {
    position: 'relative',
    width: '100%',
    height: 224,
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  avatarWrapper: {
    position: 'absolute',
    bottom: -48,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 16,
    borderWidth: 4,
    overflow: 'hidden',
    backgroundColor: PROFILE_COLORS.cardDark,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    marginTop: 64,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  verified: {
    marginLeft: 2,
  },
  subtitle: {
    fontSize: 14,
    color: PROFILE_COLORS.textMuted,
    marginTop: 4,
  },
  bio: {
    fontSize: 14,
    color: 'rgba(203, 213, 225, 1)',
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 360,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    marginTop: 24,
  },
  followBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  messageBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    marginTop: 32,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: PROFILE_COLORS.textMuted,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 32,
    padding: 4,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    fontWeight: '700',
  },
  announcementsSection: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  announcementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  announcementsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: PROFILE_COLORS.primary,
  },
  announcementCard: {
    marginBottom: 16,
  },
  announcementInner: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    padding: 16,
  },
  announcementTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  announcementAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  announcementAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(180, 251, 80, 0.2)',
  },
  announcementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  announcementAuthorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  announcementTime: {
    fontSize: 10,
    color: PROFILE_COLORS.textMuted,
    marginTop: 2,
  },
  announcementContent: {
    fontSize: 14,
    color: 'rgba(226, 232, 240, 1)',
    marginTop: 12,
    lineHeight: 22,
  },
  announcementImage: {
    width: '100%',
    height: 224,
    marginTop: 16,
    borderRadius: 12,
  },
  eventCta: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#60a5fa',
    textTransform: 'uppercase',
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginTop: 4,
  },
  rsvpBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  rsvpBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000',
  },
  announcementFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
  },
  footerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  footerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerBtnText: {
    fontSize: 12,
    color: PROFILE_COLORS.textMuted,
    fontWeight: '500',
  },
});
