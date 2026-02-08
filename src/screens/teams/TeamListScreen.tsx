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
import { SafeAreaView } from 'react-native-safe-area-context';

const TEAM_COLORS = {
  primary: '#b4fb50',
  backgroundNavy: '#071a36',
  cardDark: '#000c1e',
  accentTeal: '#428389',
  border: 'rgba(255,255,255,0.05)',
  textMuted: '#94a3b8',
  slateBg: 'rgba(30, 41, 59, 0.5)',
  slateBorder: '#475569',
};

const SPORTS = ['Basketball', 'Soccer', 'Volleyball', 'Tennis'];

const LARGE_TEAMS = [
  {
    id: '1',
    name: 'Titan Strikers',
    sport: 'Soccer',
    sportIcon: 'football' as const,
    members: 24,
    badge: 'OPEN TEAM',
    badgeColor: '#b4fb50',
    badgeTextColor: '#071a36',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB1O-DnUXdNrwek5QKcZc2CFZ4BHCXhOSVoJjJiZH_ONuYs6EiXZXj1cXPxZuzBigDWkvusjAVW9sOf6lhOcWZ2Z_9BtRqwtvlcte25Bwn9RV3gGpg9X2Vhm_rU10QbAH2B25Ir1_rJsBopj-GlwepaTSZ8UygAzVWJxK4bZe0KXpmcF5Ee8BSZsqI0T05-ktyDYiPc6iBmOzq3ABFRd616elkrKwH-eGNwj5RraYVPTx8nPsxmpcV9dWTlmxKtMI-IomBGgK0X0Ptl',
    avatarUrls: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB0zPJ2j8BY36Gkww8M29v67aI37p1MlFqNEbDADXztP-NmkRvxlPj3AwZySuymN2Ia3z_7HOQ8Sp1b1zqEfHSbvuuhC2p5uFsss-ZwnB5JdXaLRcl2cRvRZj3c-Lub_4-Xhpx3c7l1ISZNZFM9KQbi6Nzp3d4JfaGR4di1BSgyFWQrKqaOog-5RQLglE99mQ3ivHOyi3MzOJ_cA3KyZU9-oW_N5SU2TG-hVDtY2ELblr1eu8eBB9ovRQ1VFqOMI-lamO0hJacRjqbr',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBG-rpX5YZnPDvLaGYESkiC9vYR2-uNzvzPoLPPwsOAPW59tHdh95mIUATnOGVvJ5GwnPd0Yq1Xys6XKmtr6WrDfnr1W5CzjJ925DJ8dq8T4PEQHGLoUrp1zSfAy3_UypOcdRMkhLe87J_lMKFuYVqYfHJ1xoBsKhLwFALvCp3OOmxEeoQ9VmSNbU677rt1z1RycszhVX5_SJ1-azXUmxmHn_xgahpxFXl6_g9NWsCJn-xj82_2DwEmYjrEXyUqC2W9OnKX_CyR1jfL',
    ],
    extraCount: 12,
    actionLabel: 'Join Team',
  },
  {
    id: '2',
    name: 'Elite Hoops Academy',
    sport: 'Basketball',
    sportIcon: 'basketball' as const,
    members: 12,
    badge: 'INVITE ONLY',
    badgeColor: '#f97316',
    badgeTextColor: '#fff',
    coverUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAP3JSSUPUM39TXTdKdpdUdn4A-MJE3LsKz5U-ot54AAh1s6MEoviwItW8I9tsfZJVNuruwBvu1C_qtHJtU9wyI5VDiQGg-ZiyEfwcMiGR31WeS58VfxK1HLGs2rK7DY4wiR--1IrvWxIeOAgtQukFU4JoqlBZDCyOMea4rH65Y4CspaKaNl1TxTlQuu7jsEYztAc9V0iI3FlC3W8348a6CCrVBBJ3w8HiSJFN2zAyfnB-3oOFpVjIgpJ29OOdFHb4NIWAySQaN1_QC',
    avatarUrls: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDyXrCw1mMUI8_9Awfu0vjB3wEVio4BS2JW9hYBZ7OKqzuESEqDln1z047gW_ajiFMsE5JquZsvn_UlELOFlR6qkaRV4gwmf7Poa8BVIN2qHdeTNvVzko5hmp0OaEWgVNbLYGyuWuLy6-rdztseDVhG0MJXWRoI3b-taT7oDr0pQJxrvHIRvLPnFZuzxlss-wX_BfD2uQ9tYZzggll80f7IRZMgjFI3OtLaByz7XSAtTJGWADH1gN6NSrTMtfskvpEjLj3kMEfhosTy',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDI4dJzjJ7zGVH6r8fv7LxH8XUXgfvTlZj3brsXSA6sHPF18H_1lJx7F-t_3Oo0Zn_DByzLThkmSbWV-s1qebBWnSbObzQd9CNWTx_BtlLrDNkJvziUMdP1Vm5eGptxj6s4J68JH_1FcYifPkRLnoIJX_WxWo5XqY0F91fW9JP3ziwb77oqdgJ1zIj745F_yXODJAUbyPHjJg9JdxGKuZ7rqU6kCtwd1WB0m-v_p5FLSRvaPymk2v4_fIKwkLF_0ER4XVBMaCOqzEWB',
    ],
    extraCount: 5,
    actionLabel: 'Request',
  },
];

const COMPACT_TEAMS = [
  {
    id: '3',
    name: 'Ocean Spike Club',
    sport: 'Volleyball',
    members: 18,
    logoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuArTi29YhWALbrlO7bgtcZ3esChNKd2WShaJDVwKZmbofblkBHqZCy7Mkcj1hwGTLtn_IPjuFbR4WUcrItUzSHm1bP_mKnQ_KokiXD0e7aoO6GNDbepXHJRlK9qLGF8_-JhtoLha8mCUJpeo7xScTgkpZQkL7mfVmY3rL7zMd7I3nn88US6d5r8I8OWGNltJ3S6veJ8jvPqSCtSJIX9tfLj6nMUmymhwF8h4iONXbQ7R4mLX75z-lxpKwSz4WTUNdkdRdkYUzdNj_mi',
  },
];

export const TeamListScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedSport, setSelectedSport] = useState('Basketball');

  return (
    <View style={[styles.container, { backgroundColor: TEAM_COLORS.backgroundNavy }]}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header: search + notifications */}
        <View style={[styles.header, { backgroundColor: TEAM_COLORS.backgroundNavy }]}>
          <View style={styles.searchRow}>
            <View style={[styles.searchWrap, { backgroundColor: TEAM_COLORS.slateBg }]}>
              <Ionicons name="search" size={20} color={TEAM_COLORS.textMuted} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search teams, sports..."
                placeholderTextColor={TEAM_COLORS.textMuted}
                value={search}
                onChangeText={setSearch}
              />
            </View>
            <TouchableOpacity style={[styles.notifBtn, { backgroundColor: TEAM_COLORS.slateBg }]}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
              <View style={styles.notifDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sport chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContent}
          style={styles.chipsScroll}
        >
          {SPORTS.map((sport) => {
            const isActive = selectedSport === sport;
            return (
              <TouchableOpacity
                key={sport}
                onPress={() => setSelectedSport(sport)}
                style={[
                  styles.chip,
                  isActive
                    ? { backgroundColor: TEAM_COLORS.primary }
                    : { backgroundColor: TEAM_COLORS.slateBg, borderColor: TEAM_COLORS.slateBorder },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: isActive ? TEAM_COLORS.backgroundNavy : TEAM_COLORS.textMuted },
                    isActive && styles.chipTextActive,
                  ]}
                >
                  {sport}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Section header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended Teams</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Large team cards */}
          {LARGE_TEAMS.map((team) => (
            <View key={team.id} style={styles.largeCardWrap}>
              <LinearGradient
                colors={[TEAM_COLORS.accentTeal, TEAM_COLORS.cardDark] as any}
                locations={[0, 0.65]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.9, y: 1 }}
                style={[styles.largeCard, { borderColor: TEAM_COLORS.border }]}
              >
                <View style={styles.coverWrap}>
                  <Image source={{ uri: team.coverUrl }} style={styles.cover} resizeMode="cover" />
                  <View style={[styles.badge, { backgroundColor: team.badgeColor }]}>
                    <Text style={[styles.badgeText, { color: team.badgeTextColor }]}>{team.badge}</Text>
                  </View>
                </View>
                <View style={styles.cardBody}>
                  <View style={styles.cardRow}>
                    <View>
                      <Text style={styles.teamName}>{team.name}</Text>
                      <View style={styles.sportRow}>
                        <Ionicons
                          name={team.sportIcon === 'football' ? 'football-outline' : 'basketball-outline'}
                          size={14}
                          color={TEAM_COLORS.textMuted}
                        />
                        <Text style={styles.sportText}>
                          {team.sport} • {team.members} Members
                        </Text>
                      </View>
                    </View>
                    <View style={styles.avatarStack}>
                      {team.avatarUrls.slice(0, 2).map((uri, i) => (
                        <Image
                          key={i}
                          source={{ uri }}
                          style={[styles.stackAvatar, i === 1 && styles.stackAvatarSecond]}
                          resizeMode="cover"
                        />
                      ))}
                      <View style={[styles.stackAvatar, styles.stackAvatarExtra]}>
                        <Text style={styles.stackAvatarText}>+{team.extraCount}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: TEAM_COLORS.primary }]}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.actionBtnText}>{team.actionLabel}</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          ))}

          {/* Compact team row */}
          {COMPACT_TEAMS.map((team) => (
            <TouchableOpacity key={team.id} activeOpacity={0.9} style={styles.compactCardWrap}>
              <LinearGradient
                colors={[TEAM_COLORS.accentTeal, TEAM_COLORS.cardDark] as any}
                locations={[0, 0.65]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.9, y: 1 }}
                style={[styles.compactCard, { borderColor: TEAM_COLORS.border }]}
              >
                <Image source={{ uri: team.logoUrl }} style={styles.compactLogo} resizeMode="cover" />
                <View style={styles.compactContent}>
                  <Text style={styles.compactName}>{team.name}</Text>
                  <Text style={styles.compactMeta}>
                    {team.sport} • {team.members} Members
                  </Text>
                </View>
                <View style={[styles.chevronBtn, { borderColor: TEAM_COLORS.slateBorder }]}>
                  <Ionicons name="chevron-forward" size={22} color={TEAM_COLORS.primary} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
          <View style={{ height: 100 }} />
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
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  searchWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    paddingVertical: 0,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: TEAM_COLORS.backgroundNavy,
  },
  chipsScroll: {
    maxHeight: 44,
  },
  chipsContent: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 8,
    paddingBottom: 24,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextActive: {
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  seeAll: {
    fontSize: 12,
    fontWeight: '600',
    color: TEAM_COLORS.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  largeCardWrap: {
    marginBottom: 24,
  },
  largeCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
  },
  coverWrap: {
    height: 176,
    position: 'relative',
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  cardBody: {
    padding: 20,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  teamName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  sportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sportText: {
    fontSize: 14,
    color: TEAM_COLORS.textMuted,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  stackAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#021021',
    backgroundColor: '#1e293b',
  },
  stackAvatarSecond: {
    marginLeft: -10,
  },
  stackAvatarExtra: {
    marginLeft: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stackAvatarText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  actionBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: TEAM_COLORS.backgroundNavy,
  },
  compactCardWrap: {
    marginBottom: 12,
  },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  compactLogo: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 16,
  },
  compactContent: {
    flex: 1,
  },
  compactName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  compactMeta: {
    fontSize: 12,
    color: TEAM_COLORS.textMuted,
  },
  chevronBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
