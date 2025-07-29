
import React from 'react';
import { Image } from "expo-image";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#FF6B6B', '#4ECDC4']} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Welcome Header */}
        <ThemedView style={styles.welcomeContainer}>
          <ThemedText type="title" style={styles.welcomeTitle}>
            Welcome to LoveMatch Thailand! 💕
          </ThemedText>
          <HelloWave />
          <ThemedText style={styles.welcomeSubtitle}>
            ค้นหาความรักที่แท้จริงในประเทศไทย
          </ThemedText>
        </ThemedView>

        {/* Quick Stats */}
        <ThemedView style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText type="subtitle" style={styles.statNumber}>2.5M+</ThemedText>
            <ThemedText style={styles.statLabel}>Active Users</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText type="subtitle" style={styles.statNumber}>50K+</ThemedText>
            <ThemedText style={styles.statLabel}>Matches Daily</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText type="subtitle" style={styles.statNumber}>95%</ThemedText>
            <ThemedText style={styles.statLabel}>Success Rate</ThemedText>
          </View>
        </ThemedView>

        {/* Action Buttons */}
        <ThemedView style={styles.actionSection}>
          <TouchableOpacity style={styles.primaryButton}>
            <ThemedText style={styles.buttonText}>🔍 Start Discovering</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <ThemedText style={styles.secondaryButtonText}>✨ Upgrade to Premium</ThemedText>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
    paddingTop: 60,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
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
  actionSection: {
    marginHorizontal: 20,
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
  },
  primaryButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#4ECDC4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoSection: {
    marginHorizontal: 20,
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  videoUploadButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  videoHint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  activitySection: {
    marginHorizontal: 20,
    marginBottom: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
  },
  activityItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
});
