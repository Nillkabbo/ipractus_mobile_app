import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Avatar } from '../../components/Avatar';

type TabType = 'posts' | 'media' | 'teams';

export const ProfileScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<TabType>('posts');

  if (!user) {
    return null;
  }

  const tabs = [
    { key: 'posts' as TabType, label: 'Posts' },
    { key: 'media' as TabType, label: 'Media' },
    { key: 'teams' as TabType, label: 'Teams' },
  ];

  const mediaItems = [
    { id: '1', thumbnail: 'https://via.placeholder.com/150' },
    { id: '2', thumbnail: 'https://via.placeholder.com/150' },
    { id: '3', thumbnail: 'https://via.placeholder.com/150' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>My Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings' as any)} style={{ marginRight: 16 }}>
            <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={[styles.profileSection, { backgroundColor: theme.colors.card }]}>
          <View style={styles.avatarContainer}>
            <Avatar uri={user.avatarUri} size={100} />
            <View style={styles.verifiedBadgeLarge}>
              <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary} />
            </View>
          </View>

          <Text style={[styles.userName, { color: theme.colors.text }]}>
            {user.displayName}
          </Text>

          <View style={styles.roleContainer}>
            <Text style={[styles.roleText, { color: theme.colors.textSecondary }]}>
              {user.role === 'coach' ? 'Professional Soccer Coach' : 'Athlete'}
            </Text>
            <Text style={[styles.roleText, { color: theme.colors.textSecondary }]}>
              {' '}• SF Academy
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => navigation.navigate('EditProfile' as any)}
            >
              <Ionicons name="create-outline" size={20} color="#fff" />
              <Text style={[styles.actionButtonText, { color: '#fff' }]}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.colors.surfaceVariant }]}
            >
              <Ionicons name="share-outline" size={20} color={theme.colors.text} />
              <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border }]}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && { borderBottomColor: theme.colors.primary },
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === tab.key ? theme.colors.primary : theme.colors.textSecondary },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'posts' && (
          <View style={[styles.tabContent, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No posts yet
            </Text>
          </View>
        )}

        {activeTab === 'media' && (
          <View style={[styles.tabContent, { backgroundColor: theme.colors.card }]}>
            <View style={styles.mediaHeader}>
              <Text style={[styles.mediaTitle, { color: theme.colors.text }]}>Media Library</Text>
              <TouchableOpacity>
                <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mediaGrid}>
              {mediaItems.map((item) => (
                <TouchableOpacity key={item.id} style={styles.mediaItem}>
                  <View style={[styles.mediaThumbnail, { backgroundColor: theme.colors.surfaceVariant }]}>
                    <Ionicons name="play-circle" size={32} color={theme.colors.text} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'teams' && (
          <View style={[styles.tabContent, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No teams yet
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: theme.colors.card, borderTopColor: theme.colors.border }]}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home-outline" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search-outline" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={[styles.addBtn, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="add" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubbles-outline" size={24} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
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
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedBadge: {
    marginLeft: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  verifiedBadgeLarge: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 24,
  },
  roleText: {
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabContent: {
    padding: 16,
    minHeight: 200,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 40,
  },
  mediaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mediaTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  mediaItem: {
    width: (100 - 16) / 3 + '%',
    aspectRatio: 1,
  },
  mediaThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  navItem: {
    padding: 8,
  },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
