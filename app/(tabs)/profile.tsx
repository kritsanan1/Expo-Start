import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Your Name",
    age: "25",
    bio: "Tell everyone about yourself...",
    location: "Bangkok, Thailand",
    interests: ["Travel", "Food", "Photography"],
    socialConnected: {
      facebook: true,
      tiktok: false,
      instagram: true,
      twitter: false,
    },
    premium: false,
    notifications: true,
    showAge: true,
    showLocation: true,
  });

  const toggleSocialConnection = (
    platform: keyof typeof profile.socialConnected,
  ) => {
    setProfile((prev) => ({
      ...prev,
      socialConnected: {
        ...prev.socialConnected,
        [platform]: !prev.socialConnected[platform],
      },
    }));
  };

  const addInterest = (interest: string) => {
    if (interest && !profile.interests.includes(interest)) {
      setProfile((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }));
    }
  };

  const removeInterest = (interest: string) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  return (
    <LinearGradient colors={["#FF6B6B", "#4ECDC4"]} style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Profile 👤
          </ThemedText>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <ThemedText style={styles.editButtonText}>
              {isEditing ? "Save" : "Edit"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Profile Photo & Video */}
        <ThemedView style={styles.mediaSection}>
          <TouchableOpacity style={styles.profilePhotoContainer}>
            <ThemedText style={styles.profilePhoto}>📸</ThemedText>
            <ThemedText style={styles.mediaLabel}>Add Photo</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.videoContainer}>
            <ThemedText style={styles.videoIcon}>🎬</ThemedText>
            <ThemedText style={styles.mediaLabel}>Video Profile</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Basic Info */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Basic Information</ThemedText>

          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Name</ThemedText>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(text) =>
                  setProfile((prev) => ({ ...prev, name: text }))
                }
                placeholder="Your name"
              />
            ) : (
              <ThemedText style={styles.value}>{profile.name}</ThemedText>
            )}
          </ThemedView>

          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Age</ThemedText>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.age}
                onChangeText={(text) =>
                  setProfile((prev) => ({ ...prev, age: text }))
                }
                placeholder="Your age"
                keyboardType="numeric"
              />
            ) : (
              <ThemedText style={styles.value}>{profile.age}</ThemedText>
            )}
          </ThemedView>

          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Location</ThemedText>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.location}
                onChangeText={(text) =>
                  setProfile((prev) => ({ ...prev, location: text }))
                }
                placeholder="Your location"
              />
            ) : (
              <ThemedText style={styles.value}>{profile.location}</ThemedText>
            )}
          </ThemedView>

          <ThemedView style={styles.inputGroup}>
            <ThemedText style={styles.label}>Bio</ThemedText>
            {isEditing ? (
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={profile.bio}
                onChangeText={(text) =>
                  setProfile((prev) => ({ ...prev, bio: text }))
                }
                placeholder="Tell everyone about yourself..."
                multiline
                numberOfLines={4}
              />
            ) : (
              <ThemedText style={styles.value}>{profile.bio}</ThemedText>
            )}
          </ThemedView>
        </ThemedView>

        {/* Interests */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Interests</ThemedText>
          <ThemedView style={styles.interestsContainer}>
            {profile.interests.map((interest, index) => (
              <TouchableOpacity
                key={index}
                style={styles.interestTag}
                onPress={() => isEditing && removeInterest(interest)}
              >
                <ThemedText style={styles.interestText}>
                  {interest} {isEditing && "×"}
                </ThemedText>
              </TouchableOpacity>
            ))}
            {isEditing && (
              <TouchableOpacity
                style={[styles.interestTag, styles.addInterestTag]}
                onPress={() => addInterest("New Interest")}
              >
                <ThemedText style={styles.addInterestText}>+ Add</ThemedText>
              </TouchableOpacity>
            )}
          </ThemedView>
        </ThemedView>

        {/* Social Media Connections */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Social Media</ThemedText>

          {Object.entries(profile.socialConnected).map(
            ([platform, connected]) => (
              <ThemedView key={platform} style={styles.socialItem}>
                <ThemedText style={styles.socialPlatform}>
                  {platform === "facebook" && "📘 Facebook"}
                  {platform === "tiktok" && "🎵 TikTok"}
                  {platform === "instagram" && "📷 Instagram"}
                  {platform === "twitter" && "🐦 Twitter"}
                </ThemedText>
                <Switch
                  value={connected}
                  onValueChange={() =>
                    toggleSocialConnection(
                      platform as keyof typeof profile.socialConnected,
                    )
                  }
                  trackColor={{ false: "#ccc", true: "#4ECDC4" }}
                  thumbColor={connected ? "#fff" : "#f4f3f4"}
                />
              </ThemedView>
            ),
          )}
        </ThemedView>

        {/* Privacy Settings */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Privacy Settings</ThemedText>

          <ThemedView style={styles.settingItem}>
            <ThemedText style={styles.settingLabel}>Show Age</ThemedText>
            <Switch
              value={profile.showAge}
              onValueChange={(value) =>
                setProfile((prev) => ({ ...prev, showAge: value }))
              }
              trackColor={{ false: "#ccc", true: "#4ECDC4" }}
              thumbColor={profile.showAge ? "#fff" : "#f4f3f4"}
            />
          </ThemedView>

          <ThemedView style={styles.settingItem}>
            <ThemedText style={styles.settingLabel}>Show Location</ThemedText>
            <Switch
              value={profile.showLocation}
              onValueChange={(value) =>
                setProfile((prev) => ({ ...prev, showLocation: value }))
              }
              trackColor={{ false: "#ccc", true: "#4ECDC4" }}
              thumbColor={profile.showLocation ? "#fff" : "#f4f3f4"}
            />
          </ThemedView>

          <ThemedView style={styles.settingItem}>
            <ThemedText style={styles.settingLabel}>
              Push Notifications
            </ThemedText>
            <Switch
              value={profile.notifications}
              onValueChange={(value) =>
                setProfile((prev) => ({ ...prev, notifications: value }))
              }
              trackColor={{ false: "#ccc", true: "#4ECDC4" }}
              thumbColor={profile.notifications ? "#fff" : "#f4f3f4"}
            />
          </ThemedView>
        </ThemedView>

        {/* Premium Section */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            LoveMatch Premium ⭐
          </ThemedText>
          <ThemedText style={styles.premiumDescription}>
            Unlock unlimited swipes, video editing tools, and see who viewed
            your profile!
          </ThemedText>
          <TouchableOpacity style={styles.premiumButton}>
            <ThemedText style={styles.premiumButtonText}>
              {profile.premium ? "Manage Premium" : "Upgrade to Premium"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Account Actions */}
        <ThemedView style={styles.section}>
          <TouchableOpacity style={styles.actionButton}>
            <ThemedText style={styles.actionButtonText}>
              Report a Problem
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <ThemedText style={styles.actionButtonText}>
              Privacy Policy
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.dangerButton]}>
            <ThemedText style={[styles.actionButtonText, styles.dangerText]}>
              Delete Account
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 15,
    borderRadius: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  editButton: {
    backgroundColor: "#4ECDC4",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  mediaSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  profilePhotoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "48%",
  },
  profilePhoto: {
    fontSize: 40,
    marginBottom: 10,
  },
  videoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "48%",
  },
  videoIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  mediaLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  bioInput: {
    height: 100,
    textAlignVertical: "top",
  },
  value: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 5,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestTag: {
    backgroundColor: "#4ECDC4",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  addInterestTag: {
    backgroundColor: "#FF6B6B",
  },
  addInterestText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  socialItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  socialPlatform: {
    fontSize: 16,
    color: "#333",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingLabel: {
    fontSize: 16,
    color: "#333",
  },
  premiumDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    lineHeight: 20,
  },
  premiumButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  premiumButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  actionButtonText: {
    fontSize: 16,
    color: "#4ECDC4",
  },
  dangerButton: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: "#FF6B6B",
  },
});
