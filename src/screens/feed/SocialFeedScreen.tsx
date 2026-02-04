import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const POSTS = [
  {
    id: '1',
    author: 'Alex Rivera',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQW7DdRQCJr8y3p-NmQYMgroRfhRwCoxoubrJI-PzVFMohEkKraE6Y6G9ngvi-I6-0UBFjhsc8Ca0Pa5eu5FVRGluWqvyLs1HSmIP4hO5TBkGUQta7Id1JmflG0L3M1eNuYZE3e5tJua1yTeU7eL59QtzCCK-aEwTj_P8oewGLErfRLQAemswA6MitwtqLynMm57SmWq9UDBQQDDGmD-mWUHsaZeirIhF5XMlP0MLwXifFxC-noexm0a7b9P07fJbnFpf2i7WmWWgO',
    badge: 'Athlete',
    badgeColor: '#137fec',
    badgeBg: 'rgba(19, 127, 236, 0.1)',
    time: '2h ago',
    location: 'Pro League',
    content: 'Just finished a great morning session! Working on my explosive power today. Feels good to be back on the grind. #iPractus #TrainingDay',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfZYLIZ8FQnPnHGdBtWwowLS0h8TIA1pDFZ_rlwYZH4s0X2f5ZJU6I5HXxLl_SQPwOGpIu-cGhcxMYnOuJJE1WSlj41S9tEdT9EvaK_kWMsHMWkyFYGiRzEzADVCCTTe_X0kFW2pvHxmGPBeT77hTiooP2pZxMu1KdIDaS3LmQJ8wx_Q2bNr-6Ua7bfCB5YtJ9mAwmpekFYQtqcNr953N9itBVCh1LMof_LbYdHBxfBddrfKSRydENwmAYF3RYA6j-urmcPgpZhuuO',
    likes: 24,
    comments: 5,
    likeIcon: 'favorite',
    likeType: 'like',
  },
  {
    id: '2',
    author: 'Coach Sarah Jenkins',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChVMRRR7B1quJUa-Zvdya8PCTDkEoq0S_rxNbKb57CUDxqQVEkLShKXPFMJwamokXSBMFK5XY5Ic6DN3AE421Pae6S2RYbVsKElQzLuTdmjP4UR-5mm8w5yMjHDCvrvhA9k8p-DyKnAo2LI3DChLrCLdSQ1pYgq-R9_0lQKvk0tXadQ4LLi8mODt3oPl3JAXUZBMuEODCDboggLZxNxFx7fliQwgr4f0WRKJg8v5M7aBQd4qGmpG4OSIt94KKnyfhdwUOJgeUtfjRm',
    badge: 'Coach',
    badgeColor: '#10b981',
    badgeBg: 'rgba(16, 185, 129, 0.1)',
    time: '4h ago',
    location: 'High Performance',
    content: 'Quick tip for all my athletes: Consistency is key. Even on the days you don\'t feel like it, show up for your future self. Discipline over motivation, always. 🏀',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx43sWg63Bn5z4r1xe4RLgGYETSkDPHXgf-wa12q1QV1oF8Hlzi1NURnTuFmc5mUXgN5onCD5l-FOhm9wcxIsaJSQqlk7ex47JFvNA78iXitGaO0E67p5F5NEqbfNru3Fs9bifhAVXfFjp2VhhDaFSzQAJlSUEzpMtq0L3R1Pbw4i46z1pGlzqAvzfZLPObk3Cuf4OtzA4X9EpDIRQaRmB22YutXdi-yX-6RA6H975hQqM_84fy_JKHam_MjwuvLk4ydUHmVn9hovQ',
    isVideo: true,
    likes: 56,
    comments: 12,
    shares: 3,
    likeIcon: 'thumb_up',
    likeType: 'helpful',
  },
  {
    id: '3',
    author: 'James Wilson',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkQp6sU7L-CyWZ2m5Lsxz6jQgu4hryx3MvS59pEI1W9ah51sljgppOWK3wZBKOhWRjh0degwJeD_IrLKcu53_DYEDhDhoZxLThwIg3MT05vgCOHSDkIcYihhb9OZwZUrh7Z9rQT2lpVkOueks65vgFrPLW-7fsDfea4zANu4VCy90B-hG6LB5yFuRaeXxdLPWVDP0Y_euVw42QLhfSiCp13Lr8M8-iBH3Xc8XjBWTi-S1zVdxzJRLrV_TUzwKLlq6L2Rq45bCbtF_X',
    badge: 'Fan',
    badgeColor: '#f97316',
    badgeBg: 'rgba(249, 115, 22, 0.1)',
    time: '6h ago',
    location: 'Stadium Vibes',
    content: 'Unbelievable game tonight! The atmosphere was electric. Who else was there to witness that buzzer beater? 🏟️🔥',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkPhIemepRA3xOiQWumjgUKlVa5jPzSQh9NBm7YsnCbY007iakZDof9joyyWtlq-vOB7t2awGCbbslHGsXYFFeRgzMCZTmFv62SVkw9M-lanpKPuXwUA4Tonnr0O6bo91EP47S3BiO8KywN_FbM_3tE__Zklg_2VICq_B7Ctl4AYty77mcmieGZQZ-m_elTZs60ZY8UhMuXhayUAVSkbJUqlqRXPd3rqdTiihrUQVVl9dTfV4Ui06efbZj7utYNPLFDoRMG1pYwbAk',
    likes: 102,
    comments: 42,
    likeIcon: 'favorite',
    likeType: 'cheer',
  },
];

type TabType = 'home' | 'discover' | 'teams' | 'profile';

export const SocialFeedScreen: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const renderPost = (post: typeof POSTS[0]) => {
    const isLiked = likedPosts.has(post.id);

    return (
      <View key={post.id} style={[styles.postCard, { backgroundColor: theme.mode === 'dark' ? '#1a242d' : '#fff' }]}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.authorInfo}>
            <Image source={{ uri: post.avatar }} style={styles.avatar} />
            <View style={styles.authorDetails}>
              <View style={styles.authorNameRow}>
                <Text style={[styles.authorName, { color: theme.mode === 'dark' ? '#fff' : '#111418' }]}>
                  {post.author}
                </Text>
                <View style={[styles.badge, { backgroundColor: post.badgeBg }]}>
                  <Text style={[styles.badgeText, { color: post.badgeColor }]}>
                    {post.badge}
                  </Text>
                </View>
              </View>
              <Text style={[styles.postMeta, { color: '#617589' }]}>
                {post.time} • {post.location}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={24} color="#617589" />
          </TouchableOpacity>
        </View>

        {/* Post Content */}
        <Text style={[styles.postContent, { color: theme.mode === 'dark' ? '#d1d5db' : '#111418' }]}>
          {post.content}
        </Text>

        {/* Media */}
        <View style={[styles.mediaContainer, { aspectRatio: post.isVideo ? 4/3 : 16/9 }]}>
          <Image source={{ uri: post.image }} style={styles.mediaImage} resizeMode="cover" />
          {post.isVideo && (
            <View style={styles.videoOverlay}>
              <View style={styles.playButton}>
                <Ionicons name="play" size={32} color="#fff" />
              </View>
            </View>
          )}
        </View>

        {/* Interaction Stats */}
        <View style={styles.statsRow}>
          <View style={styles.likeAvatars}>
            <View style={[styles.likeAvatar, { backgroundColor: '#137fec' }]}>
              <Ionicons name={post.likeIcon as any} size={10} color="#fff" />
            </View>
            {post.id === '1' && (
              <View style={[styles.likeAvatar, { backgroundColor: '#60a5fa' }]}>
                <Ionicons name="thumb_up" size={10} color="#fff" />
              </View>
            )}
          </View>
          <View style={styles.statsNumbers}>
            <Text style={[styles.statText, { color: '#617589' }]}>
              {post.likes} likes
            </Text>
            <Text style={[styles.statText, { color: '#617589' }]}>
              {post.comments} comments
            </Text>
            {post.shares && (
              <Text style={[styles.statText, { color: '#617589' }]}>
                {post.shares} shares
              </Text>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={[styles.actionsRow, { borderTopColor: theme.mode === 'dark' ? '#374151' : '#f3f4f6' }]}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => toggleLike(post.id)}
          >
            <Ionicons
              name={isLiked ? (post.likeIcon === 'favorite' ? 'heart' : 'thumb_up') as any : post.likeIcon as any}
              size={20}
              color={isLiked ? '#137fec' : '#617589'}
            />
            <Text style={[styles.actionText, { color: '#617589' }]}>
              {post.likeType.charAt(0).toUpperCase() + post.likeType.slice(1)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#617589" />
            <Text style={[styles.actionText, { color: '#617589' }]}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={20} color="#617589" />
            <Text style={[styles.actionText, { color: '#617589' }]}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.mode === 'dark' ? '#101922' : '#f6f7f8' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.mode === 'dark' ? 'rgba(16, 25, 34, 0.8)' : 'rgba(255, 255, 255, 0.8)', borderBottomColor: theme.mode === 'dark' ? '#374151' : '#dbe0e6' }]}>
        <View style={styles.headerLeft}>
          <Ionicons name="trophy" size={28} color="#137fec" />
          <Text style={[styles.headerTitle, { color: '#137fec' }]}>iPractus</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={theme.mode === 'dark' ? '#fff' : '#111418'} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Composer */}
      <View style={[styles.composer, { backgroundColor: theme.mode === 'dark' ? '#1a242d' : '#fff' }]}>
        <View style={styles.composerAvatar} />
        <View style={[styles.composerInput, { backgroundColor: theme.mode === 'dark' ? 'rgba(55, 65, 81, 0.5)' : '#f6f7f8' }]}>
          <Text style={[styles.composerPlaceholder, { color: '#617589' }]}>What's on your mind?</Text>
        </View>
        <TouchableOpacity style={[styles.composerImageButton, { backgroundColor: 'rgba(19, 127, 236, 0.1)' }]}>
          <Ionicons name="image-outline" size={20} color="#137fec" />
        </TouchableOpacity>
      </View>

      {/* Posts Feed */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {POSTS.map((post) => renderPost(post))}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: theme.mode === 'dark' ? 'rgba(26, 36, 45, 0.95)' : 'rgba(255, 255, 255, 0.95)', borderTopColor: theme.mode === 'dark' ? '#374151' : '#dbe0e6' }]}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('home')}
        >
          <Ionicons
            name={activeTab === 'home' ? 'home' : 'home-outline'}
            size={24}
            color={activeTab === 'home' ? '#137fec' : '#617589'}
          />
          <Text style={[styles.navLabel, { color: activeTab === 'home' ? '#137fec' : '#617589', fontWeight: activeTab === 'home' ? '700' : '500' }]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('discover')}
        >
          <Ionicons
            name={activeTab === 'discover' ? 'compass' : 'compass-outline'}
            size={24}
            color={activeTab === 'discover' ? '#137fec' : '#617589'}
          />
          <Text style={[styles.navLabel, { color: activeTab === 'discover' ? '#137fec' : '#617589', fontWeight: '500' }]}>
            Discover
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <View style={[styles.addBtn, { backgroundColor: '#137fec', shadowColor: '#137fec' }]}>
            <Ionicons name="add" size={24} color="#fff" />
          </View>
          <Text style={[styles.navLabel, { color: '#617589', fontWeight: '500' }]}>
            Post
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('teams')}
        >
          <Ionicons
            name={activeTab === 'teams' ? 'people' : 'people-outline'}
            size={24}
            color={activeTab === 'teams' ? '#137fec' : '#617589'}
          />
          <Text style={[styles.navLabel, { color: activeTab === 'teams' ? '#137fec' : '#617589', fontWeight: '500' }]}>
            Teams
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('profile')}
        >
          <Ionicons
            name={activeTab === 'profile' ? 'person' : 'person-outline'}
            size={24}
            color={activeTab === 'profile' ? '#137fec' : '#617589'}
          />
          <Text style={[styles.navLabel, { color: activeTab === 'profile' ? '#137fec' : '#617589', fontWeight: '500' }]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  notificationButton: {
    position: 'relative',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    marginBottom: 8,
  },
  composerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
  },
  composerInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  composerPlaceholder: {
    fontSize: 14,
  },
  composerImageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postCard: {
    marginBottom: 8,
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  authorDetails: {
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  postMeta: {
    fontSize: 12,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  mediaContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  likeAvatars: {
    flexDirection: 'row',
  },
  likeAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  statsNumbers: {
    flexDirection: 'row',
    gap: 12,
  },
  statText: {
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    paddingTop: 8,
    borderTopWidth: 1,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontSize: 10,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 4,
    borderColor: '#fff',
  },
});
