
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface UserProfile {
  name: string;
  age: number;
  bio: string;
  location: string;
  interests: string[];
  photos: string[];
  socialConnections: {
    facebook: boolean;
    tiktok: boolean;
    instagram: boolean;
    twitter: boolean;
  };
  settings: {
    showAge: boolean;
    showDistance: boolean;
    allowMessages: boolean;
    pushNotifications: boolean;
  };
  premium: boolean;
  stats: {
    profileViews: number;
    matches: number;
    likes: number;
  };
}

const currentUser: UserProfile = {
  name: 'คุณ',
  age: 25,
  bio: 'รักการเดินทาง ชอบดูหนัง และหาเพื่อนคุยที่ใช่ ❤️',
  location: 'กรุงเทพฯ',
  interests: ['เดินทาง', 'ดูหนัง', 'กาแฟ', 'อ่านหนังสือ'],
  photos: ['📸', '🎬', '🌅', '☕'],
  socialConnections: {
    facebook: true,
    tiktok: false,
    instagram: true,
    twitter: false,
  },
  settings: {
    showAge: true,
    showDistance: true,
    allowMessages: true,
    pushNotifications: true,
  },
  premium: false,
  stats: {
    profileViews: 1250,
    matches: 45,
    likes: 320,
  },
};

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>(currentUser);
  const [activeSection, setActiveSection] = useState<'profile' | 'settings' | 'premium'>('profile');

  const handleEditProfile = () => {
    Alert.alert('แก้ไขโปรไฟล์', 'ฟีเจอร์แก้ไขโปรไฟล์จะเปิดใช้งานเร็วๆ นี้!');
  };

  const handleSocialConnect = (platform: keyof UserProfile['socialConnections']) => {
    setProfile(prev => ({
      ...prev,
      socialConnections: {
        ...prev.socialConnections,
        [platform]: !prev.socialConnections[platform],
      },
    }));
    
    const platformNames = {
      facebook: 'Facebook',
      tiktok: 'TikTok',
      instagram: 'Instagram',
      twitter: 'Twitter',
    };
    
    Alert.alert(
      `${platformNames[platform]} Integration`,
      profile.socialConnections[platform] 
        ? `ยกเลิกการเชื่อมต่อ ${platformNames[platform]} แล้ว`
        : `เชื่อมต่อ ${platformNames[platform]} สำเร็จ!`
    );
  };

  const handleUpgradePremium = () => {
    Alert.alert(
      '✨ อัปเกรดเป็น Premium',
      'คุณต้องการอัปเกรดเป็นสมาชิก Premium หรือไม่?\n\n• ดูใครถูกใจคุณ\n• Super Like ไม่จำกัด\n• Boost รายเดือน\n• ไม่มีโฆษณา',
      [
        { text: 'ยกเลิก', style: 'cancel' },
        { text: 'อัปเกรด', onPress: () => Alert.alert('Premium', 'กำลังดำเนินการ...') },
      ]
    );
  };

  const renderProfileSection = () => (
    <ScrollView style={styles.sectionContainer}>
      {/* Profile Header */}
      <ThemedView style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>👤</Text>
          <TouchableOpacity style={styles.editAvatarButton}>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
        
        <ThemedText type="title" style={styles.userName}>
          {profile.name}, {profile.age}
        </ThemedText>
        <ThemedText style={styles.userLocation}>📍 {profile.location}</ThemedText>
        
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <ThemedText style={styles.editButtonText}>แก้ไขโปรไฟล์</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Stats */}
      <ThemedView style={styles.statsContainer}>
        <View style={styles.statItem}>
          <ThemedText type="subtitle" style={styles.statNumber}>
            {profile.stats.profileViews}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Profile Views</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText type="subtitle" style={styles.statNumber}>
            {profile.stats.matches}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Matches</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText type="subtitle" style={styles.statNumber}>
            {profile.stats.likes}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Likes</ThemedText>
        </View>
      </ThemedView>

      {/* Bio */}
      <ThemedView style={styles.bioSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>เกี่ยวกับฉัน</ThemedText>
        <ThemedText style={styles.bioText}>{profile.bio}</ThemedText>
      </ThemedView>

      {/* Interests */}
      <ThemedView style={styles.interestsSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>ความสนใจ</ThemedText>
        <View style={styles.interestsContainer}>
          {profile.interests.map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <ThemedText style={styles.interestText}>{interest}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      {/* Photos */}
      <ThemedView style={styles.photosSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>รูปภาพ</ThemedText>
        <View style={styles.photosGrid}>
          {profile.photos.map((photo, index) => (
            <View key={index} style={styles.photoItem}>
              <Text style={styles.photoIcon}>{photo}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.addPhotoButton}>
            <Text style={styles.addPhotoIcon}>➕</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Social Connections */}
      <ThemedView style={styles.socialSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>เชื่อมต่อโซเชียล</ThemedText>
        
        <TouchableOpacity 
          style={styles.socialItem}
          onPress={() => handleSocialConnect('facebook')}
        >
          <Text style={styles.socialIcon}>📘</Text>
          <ThemedText style={styles.socialName}>Facebook</ThemedText>
          <ThemedText style={[styles.socialStatus, profile.socialConnections.facebook && styles.connected]}>
            {profile.socialConnections.facebook ? 'เชื่อมต่อแล้ว' : 'เชื่อมต่อ'}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.socialItem}
          onPress={() => handleSocialConnect('instagram')}
        >
          <Text style={styles.socialIcon}>📷</Text>
          <ThemedText style={styles.socialName}>Instagram</ThemedText>
          <ThemedText style={[styles.socialStatus, profile.socialConnections.instagram && styles.connected]}>
            {profile.socialConnections.instagram ? 'เชื่อมต่อแล้ว' : 'เชื่อมต่อ'}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.socialItem}
          onPress={() => handleSocialConnect('tiktok')}
        >
          <Text style={styles.socialIcon}>🎵</Text>
          <ThemedText style={styles.socialName}>TikTok</ThemedText>
          <ThemedText style={[styles.socialStatus, profile.socialConnections.tiktok && styles.connected]}>
            {profile.socialConnections.tiktok ? 'เชื่อมต่อแล้ว' : 'เชื่อมต่อ'}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.socialItem}
          onPress={() => handleSocialConnect('twitter')}
        >
          <Text style={styles.socialIcon}>🐦</Text>
          <ThemedText style={styles.socialName}>Twitter</ThemedText>
          <ThemedText style={[styles.socialStatus, profile.socialConnections.twitter && styles.connected]}>
            {profile.socialConnections.twitter ? 'เชื่อมต่อแล้ว' : 'เชื่อมต่อ'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );

  const renderSettingsSection = () => (
    <ScrollView style={styles.sectionContainer}>
      <ThemedView style={styles.settingsGroup}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>การแสดงผล</ThemedText>
        
        <View style={styles.settingItem}>
          <ThemedText style={styles.settingLabel}>แสดงอายุ</ThemedText>
          <Switch
            value={profile.settings.showAge}
            onValueChange={(value) => 
              setProfile(prev => ({
                ...prev,
                settings: { ...prev.settings, showAge: value }
              }))
            }
            trackColor={{ false: '#767577', true: '#FF6B6B' }}
            thumbColor={profile.settings.showAge ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <ThemedText style={styles.settingLabel}>แสดงระยะทาง</ThemedText>
          <Switch
            value={profile.settings.showDistance}
            onValueChange={(value) => 
              setProfile(prev => ({
                ...prev,
                settings: { ...prev.settings, showDistance: value }
              }))
            }
            trackColor={{ false: '#767577', true: '#FF6B6B' }}
            thumbColor={profile.settings.showDistance ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
      </ThemedView>

      <ThemedView style={styles.settingsGroup}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>การติดต่อ</ThemedText>
        
        <View style={styles.settingItem}>
          <ThemedText style={styles.settingLabel}>อนุญาตให้ส่งข้อความ</ThemedText>
          <Switch
            value={profile.settings.allowMessages}
            onValueChange={(value) => 
              setProfile(prev => ({
                ...prev,
                settings: { ...prev.settings, allowMessages: value }
              }))
            }
            trackColor={{ false: '#767577', true: '#4ECDC4' }}
            thumbColor={profile.settings.allowMessages ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <ThemedText style={styles.settingLabel}>การแจ้งเตือน</ThemedText>
          <Switch
            value={profile.settings.pushNotifications}
            onValueChange={(value) => 
              setProfile(prev => ({
                ...prev,
                settings: { ...prev.settings, pushNotifications: value }
              }))
            }
            trackColor={{ false: '#767577', true: '#4ECDC4' }}
            thumbColor={profile.settings.pushNotifications ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
      </ThemedView>

      <ThemedView style={styles.settingsGroup}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>บัญชี</ThemedText>
        
        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionIcon}>🔒</Text>
          <ThemedText style={styles.actionText}>ความเป็นส่วนตัว</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionIcon}>🛡️</Text>
          <ThemedText style={styles.actionText}>ความปลอดภัย</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <Text style={styles.actionIcon}>❓</Text>
          <ThemedText style={styles.actionText}>ช่วยเหลือ</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionItem, styles.dangerAction]}>
          <Text style={styles.actionIcon}>🚪</Text>
          <ThemedText style={[styles.actionText, styles.dangerText]}>ออกจากระบบ</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );

  const renderPremiumSection = () => (
    <ScrollView style={styles.sectionContainer}>
      <ThemedView style={styles.premiumHeader}>
        <Text style={styles.premiumIcon}>✨</Text>
        <ThemedText type="title" style={styles.premiumTitle}>
          LoveMatch Premium
        </ThemedText>
        <ThemedText style={styles.premiumSubtitle}>
          ปลดล็อคฟีเจอร์พิเศษทั้งหมด
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.premiumFeatures}>
        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>👀</Text>
          <View style={styles.featureContent}>
            <ThemedText style={styles.featureTitle}>ดูใครถูกใจคุณ</ThemedText>
            <ThemedText style={styles.featureDescription}>
              ดูรายชื่อคนที่กด Like คุณทั้งหมด
            </ThemedText>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>⭐</Text>
          <View style={styles.featureContent}>
            <ThemedText style={styles.featureTitle}>Super Like ไม่จำกัด</ThemedText>
            <ThemedText style={styles.featureDescription}>
              ใช้ Super Like ได้ไม่จำกัดจำนวน
            </ThemedText>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🚀</Text>
          <View style={styles.featureContent}>
            <ThemedText style={styles.featureTitle}>Boost รายเดือน</ThemedText>
            <ThemedText style={styles.featureDescription}>
              เพิ่มการเห็นโปรไฟล์ของคุณ 10 เท่า
            </ThemedText>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Text style={styles.featureIcon}>🚫</Text>
          <View style={styles.featureContent}>
            <ThemedText style={styles.featureTitle}>ไม่มีโฆษณา</ThemedText>
            <ThemedText style={styles.featureDescription}>
              ใช้งานได้อย่างเต็มที่โดยไม่มีการรบกวน
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgradePremium}>
        <ThemedText style={styles.upgradeButtonText}>
          อัปเกรดเป็น Premium - ฿299/เดือน
        </ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <LinearGradient colors={['#FF6B6B', '#4ECDC4']} style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Profile 👤
        </ThemedText>
        {!profile.premium && (
          <TouchableOpacity style={styles.premiumBadge} onPress={handleUpgradePremium}>
            <ThemedText style={styles.premiumBadgeText}>✨ Premium</ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>

      {/* Tab Navigation */}
      <ThemedView style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'profile' && styles.activeTab]}
          onPress={() => setActiveSection('profile')}
        >
          <ThemedText style={[styles.tabText, activeSection === 'profile' && styles.activeTabText]}>
            โปรไฟล์
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeSection === 'settings' && styles.activeTab]}
          onPress={() => setActiveSection('settings')}
        >
          <ThemedText style={[styles.tabText, activeSection === 'settings' && styles.activeTabText]}>
            ตั้งค่า
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeSection === 'premium' && styles.activeTab]}
          onPress={() => setActiveSection('premium')}
        >
          <ThemedText style={[styles.tabText, activeSection === 'premium' && styles.activeTabText]}>
            Premium
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Content */}
      {activeSection === 'profile' && renderProfileSection()}
      {activeSection === 'settings' && renderSettingsSection()}
      {activeSection === 'premium' && renderPremiumSection()}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  premiumBadgeText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#FF6B6B',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: 'white',
  },
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  // Profile Section Styles
  profileHeader: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 25,
    borderRadius: 15,
    marginBottom: 15,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    fontSize: 80,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4ECDC4',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 14,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  bioSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  interestsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  interestTag: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  interestText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  photosSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  photoItem: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoIcon: {
    fontSize: 30,
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
  },
  addPhotoIcon: {
    fontSize: 24,
    color: '#666',
  },
  socialSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  socialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  socialIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  socialName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  socialStatus: {
    fontSize: 14,
    color: '#666',
  },
  connected: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  // Settings Section Styles
  settingsGroup: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  actionText: {
    fontSize: 16,
    color: '#333',
  },
  dangerAction: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: '#FF4444',
  },
  // Premium Section Styles
  premiumHeader: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 30,
    borderRadius: 15,
    marginBottom: 15,
  },
  premiumIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  premiumSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  premiumFeatures: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  upgradeButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  upgradeButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
