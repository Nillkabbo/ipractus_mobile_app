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
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CHAT_COLORS = {
  primary: '#b4fb50',
  secondary: '#E5F1AF',
  backgroundNavy: '#071a36',
  cardDark: '#000c1e',
  accentTeal: '#428389',
  border: 'rgba(255,255,255,0.1)',
  textMuted: 'rgba(255,255,255,0.5)',
  textMutedLight: 'rgba(255,255,255,0.7)',
};

const PROFILE_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDtOA_zWkK2Ozuj69Klp68cCSa9EaEXtupYiItgAqrLMTYAB7c8tMWtriWujfNhwWEVnNsG3pBPIT78xApfKDMh-rv89Hl8wXSQH_NgOZGnfEBNDIOpoqvNXv4aTengzZsua5QSFYomda7c7r5DjrvDEVTZwQ6PLymrMDqDewOUMiUIQdIr6nMSPUVGaN_pKP8Rz8-UHgjhMReEPeKPt3lbFCnehAcxIkGL-ak_qUyqoFx0azd5HehOjkUEahCGMADUdAGp35TMnGZf';

type ChatItem = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  isGroup?: boolean;
  groupSender?: string;
  avatar?: string | null;
  icon?: 'football' | 'stadium';
  iconColor?: string;
  online?: boolean;
  unread?: number;
  muted?: boolean;
};

const CHATS: ChatItem[] = [
  {
    id: '1',
    name: 'Coach Miller',
    lastMessage: 'Great practice today! See you at the session tomorrow.',
    time: '2m ago',
    avatar: PROFILE_AVATAR,
    online: true,
    unread: 1,
  },
  {
    id: '2',
    name: 'Varsity Team',
    lastMessage: 'Update on the game schedule for...',
    time: '1h ago',
    isGroup: true,
    groupSender: 'Alex:',
    icon: 'football',
    iconColor: '#60a5fa',
    online: true,
  },
  {
    id: '3',
    name: 'Sarah Jenks',
    lastMessage: 'Are you coming to the meet on Friday at...',
    time: 'Yesterday',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLrMpuco3aRVbr1aoWfXWtmdiQHQ9MHpR_ORTW1oYz9bh31T3HS1xCnAlrjT2_GtuG3K-GaEtYjmBhi4qQv7hHqgecabrXMTEbPOJ-jEi6v2TDNXJnW0rwdaQkRy6WDpBNVf4GgXKTHC43DXWrqJCZ49Mz0XeaOdt5hQFuMeQdqstoF0risueuaLlvetH4SL4tilQ6-FeA9q4FzrlaTPUgIwh6hnQGTeqewQASaIl6h1_6YWoFrnmBoAiMrVKKTk6NEcXufXIWURjR',
    online: false,
    muted: true,
  },
  {
    id: '4',
    name: 'Mark Thompson',
    lastMessage: 'Check out these stats from the last race!',
    time: 'Tuesday',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDLPG5Hy913eW1XsIoc9r0nLC3YyhfDCDwZlCqsOcQKU10pvOmM8GRiQCpNnZePH3JDswkbct2l9q7wLkHEdqFh4xHlR-FK6nzza729fEzy6M2WL2e1b0hVPN9PugkkaesnCrHnAmxDYcq-OYxELQ7KZnz5r3NDCzADYtdJ0cePtief7g2_fJTWILeMNs0iSVCE8oRK3Pst1x0KR1Fxz4zUri7qdfKjiHjKAGyoyd6sj2JzzRjuP-awjWbZZ47B82G0uVn9PIB9bp2P',
  },
  {
    id: '5',
    name: 'Fans Community',
    lastMessage: 'Welcome to the official iPrActUS...',
    time: 'Oct 24',
    isGroup: true,
    groupSender: 'Admin:',
    icon: 'stadium',
    iconColor: '#34d399',
  },
];

function ChatCard({
  item,
  onPress,
}: {
  item: ChatItem;
  onPress: () => void;
}) {
  const renderAvatar = () => {
    if (item.avatar) {
      return (
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: item.avatar }}
            style={[styles.avatar, item.muted && styles.avatarMuted]}
            resizeMode="cover"
          />
          {item.online !== undefined && (
            <View
              style={[
                styles.onlineDot,
                item.online ? styles.onlineDotActive : styles.onlineDotInactive,
              ]}
            />
          )}
        </View>
      );
    }
    if (item.icon) {
      const iconName = item.icon === 'football' ? 'football-outline' : 'business-outline';
      return (
        <View style={styles.avatarWrap}>
          <View
            style={[
              styles.iconAvatar,
              { backgroundColor: `${item.iconColor || CHAT_COLORS.accentTeal}20`, borderColor: `${item.iconColor || CHAT_COLORS.accentTeal}50` },
            ]}
          >
            <Ionicons name={iconName as any} size={28} color={item.iconColor || CHAT_COLORS.accentTeal} />
          </View>
          {item.online !== undefined && item.online && (
            <View style={[styles.onlineDot, styles.onlineDotActive]} />
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress} style={styles.chatCardWrap}>
      <LinearGradient
        colors={[CHAT_COLORS.accentTeal, CHAT_COLORS.cardDark] as any}
        locations={[0, 0.65]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={[styles.chatCard, { borderColor: CHAT_COLORS.border }]}
      >
        {renderAvatar()}
        <View style={styles.chatContent}>
          <View style={styles.chatRow}>
            <View style={styles.chatNameRow}>
              <Text style={styles.chatName} numberOfLines={1}>
                {item.name}
              </Text>
              {item.isGroup && (
                <Ionicons name="people-outline" size={14} color="rgba(255,255,255,0.3)" style={styles.groupIcon} />
              )}
            </View>
            <Text
              style={[
                styles.chatTime,
                item.unread ? styles.chatTimeUnread : { color: CHAT_COLORS.textMuted },
              ]}
            >
              {item.time.toUpperCase()}
            </Text>
          </View>
          <Text style={[styles.chatPreview, { color: item.muted ? CHAT_COLORS.textMuted : CHAT_COLORS.textMutedLight }]} numberOfLines={1}>
            {item.groupSender ? (
              <>
                <Text style={styles.chatSender}>{item.groupSender} </Text>
                {item.lastMessage}
              </>
            ) : (
              item.lastMessage
            )}
          </Text>
        </View>
        {item.unread != null && item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export const MessagesScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');

  const filteredChats = CHATS.filter(
    (c) => !search.trim() || c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: CHAT_COLORS.backgroundNavy }]}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: CHAT_COLORS.backgroundNavy }]}>
          <View style={styles.headerLeft}>
            <View style={[styles.headerAvatarWrap, { borderColor: CHAT_COLORS.border }]}>
              <Image
                source={{ uri: user?.avatarUri || PROFILE_AVATAR }}
                style={styles.headerAvatar}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.headerTitle}>Messages</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.settingsBtn}
          >
            <Ionicons name="settings-outline" size={24} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={20} color="rgba(255,255,255,0.4)" style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { borderColor: CHAT_COLORS.border }]}
            placeholder="Search athletes, teams..."
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Chat list */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {filteredChats.map((item) => (
            <ChatCard
              key={item.id}
              item={item}
              onPress={() => {}}
            />
          ))}
        </ScrollView>

        {/* FAB */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.fab, { backgroundColor: CHAT_COLORS.primary }]}
        >
          <Ionicons name="create-outline" size={28} color={CHAT_COLORS.backgroundNavy} />
        </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
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
    borderWidth: 1,
    overflow: 'hidden',
  },
  headerAvatar: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.5,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrap: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 36,
    top: 14,
    zIndex: 1,
  },
  searchInput: {
    height: 44,
    paddingLeft: 44,
    paddingRight: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    fontSize: 14,
    color: '#fff',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 120,
  },
  chatCardWrap: {
    marginBottom: 12,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  avatarWrap: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: CHAT_COLORS.border,
  },
  avatarMuted: {
    opacity: 0.7,
  },
  iconAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: CHAT_COLORS.cardDark,
  },
  onlineDotActive: {
    backgroundColor: CHAT_COLORS.primary,
    shadowColor: CHAT_COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  onlineDotInactive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  chatContent: {
    flex: 1,
    minWidth: 0,
  },
  chatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  chatNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  groupIcon: {
    marginLeft: 2,
  },
  chatTime: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 8,
  },
  chatTimeUnread: {
    color: CHAT_COLORS.primary,
  },
  chatPreview: {
    fontSize: 14,
    fontWeight: '500',
  },
  chatSender: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: CHAT_COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    shadowColor: CHAT_COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadText: {
    fontSize: 10,
    fontWeight: '700',
    color: CHAT_COLORS.backgroundNavy,
  },
  fab: {
    position: 'absolute',
    bottom: 96,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CHAT_COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});
