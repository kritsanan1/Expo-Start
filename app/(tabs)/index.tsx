
import { Image } from "expo-image";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#FF6B6B', '#4ECDC4']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>LoveMatch Thailand 💕</ThemedText>
          <ThemedText style={styles.subtitle}>Active Matches: 1,000+</ThemedText>
        </ThemedView>

        {/* Quick Match Section */}
        <ThemedView style={styles.quickMatchSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Match</ThemedText>
          <TouchableOpacity style={styles.quickMatchButton}>
            <ThemedText style={styles.buttonText}>Find Your Match Now ✨</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Social Media Sync */}
        <ThemedView style={styles.socialSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Connect Your Social Media</ThemedText>
          
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
              <ThemedText style={styles.socialButtonText}>📘 Facebook</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.socialButton, styles.tiktokButton]}>
              <ThemedText style={styles.socialButtonText}>🎵 TikTok</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.socialButton, styles.instagramButton]}>
              <ThemedText style={styles.socialButtonText}>📷 Instagram</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.socialButton, styles.twitterButton]}>
              <ThemedText style={styles.socialButtonText}>🐦 Twitter</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Video Profile Section */}
        <ThemedView style={styles.videoSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Your Video Profile</ThemedText>
          <TouchableOpacity style={styles.videoUploadButton}>
            <ThemedText style={styles.buttonText}>📹 Upload Video Intro</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.videoHint}>Record a 10-30 second video to showcase your personality!</ThemedText>
        </ThemedView>

        {/* Recent Activity */}
        <ThemedView style={styles.activitySection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Activity</ThemedText>
          <View style={styles.activityItem}>
            <ThemedText>🔥 3 new profile views today</ThemedText>
          </View>
          <View style={styles.activityItem}>
            <ThemedText>💝 2 new matches waiting</ThemedText>
          </View>
          <View style={styles.activityItem}>
            <ThemedText>💬 1 new message received</ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  quickMatchSection: {
    marginHorizontal: 20,
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  quickMatchButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialSection: {
    marginHorizontal: 20,
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  socialButton: {
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
  tiktokButton: {
    backgroundColor: '#000000',
  },
  instagramButton: {
    backgroundColor: '#E4405F',
  },
  twitterButton: {
    backgroundColor: '#1DA1F2',
  },
  socialButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  videoSection: {
    marginHorizontal: 20,
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  videoUploadButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  videoHint: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  activitySection: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
});
