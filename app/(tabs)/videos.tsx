import { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const { width } = Dimensions.get("window");

interface VideoProfile {
  id: string;
  userId: string;
  userName: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  views: number;
  likes: number;
  description: string;
}

const sampleVideos: VideoProfile[] = [
  {
    id: "1",
    userId: "1",
    userName: "นิภา",
    thumbnailUrl: "🌸",
    videoUrl: "",
    duration: 15,
    views: 124,
    likes: 23,
    description: "สวัสดีค่ะ ฉันนิภา ชอบเดินทางและถ่ายรูป",
  },
  {
    id: "2",
    userId: "2",
    userName: "ศิริ",
    thumbnailUrl: "💝",
    videoUrl: "",
    duration: 20,
    views: 89,
    likes: 15,
    description: "Hello! ฉันเป็นอาจารย์มหาวิทยาลัย รักการอ่านหนังสือ",
  },
  {
    id: "3",
    userId: "3",
    userName: "มณี",
    thumbnailUrl: "🌺",
    videoUrl: "",
    duration: 12,
    views: 156,
    likes: 31,
    description: "นักเต้นมืออาชีพ รักดนตรีและแมว 🐱",
  },
];

export default function VideoProfilesScreen() {
  const [videos, setVideos] = useState(sampleVideos);
  const [selectedVideo, setSelectedVideo] = useState<VideoProfile | null>(null);

  const handleVideoPress = (video: VideoProfile) => {
    setSelectedVideo(video);
    Alert.alert(`วิดีโอของ ${video.userName}`, video.description, [
      { text: "ปิด", style: "cancel" },
      { text: "ดูเต็มจอ", onPress: () => console.log("Play video") },
    ]);
  };

  const handleUploadVideo = () => {
    Alert.alert("อัปโหลดวิดีโอ", "เลือกวิธีการอัปโหลดวิดีโอของคุณ", [
      { text: "ยกเลิก", style: "cancel" },
      { text: "ถ่ายใหม่", onPress: () => console.log("Record new video") },
      {
        text: "เลือกจากแกลเลอรี่",
        onPress: () => console.log("Choose from gallery"),
      },
    ]);
  };

  const renderVideoItem = ({ item }: { item: VideoProfile }) => (
    <TouchableOpacity
      style={styles.videoItem}
      onPress={() => handleVideoPress(item)}
    >
      <View style={styles.thumbnail}>
        <ThemedText style={styles.thumbnailEmoji}>
          {item.thumbnailUrl}
        </ThemedText>
        <View style={styles.durationBadge}>
          <ThemedText style={styles.durationText}>{item.duration}s</ThemedText>
        </View>
      </View>

      <View style={styles.videoInfo}>
        <ThemedText style={styles.userName}>{item.userName}</ThemedText>
        <ThemedText style={styles.description} numberOfLines={2}>
          {item.description}
        </ThemedText>

        <View style={styles.stats}>
          <ThemedText style={styles.statText}>👁️ {item.views}</ThemedText>
          <ThemedText style={styles.statText}>❤️ {item.likes}</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#FF6B6B", "#4ECDC4"]} style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Video Profiles 🎬
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          ดูวิดีโอแนะนำตัวและอัปโหลดของคุณ
        </ThemedText>
      </ThemedView>

      {/* Upload Video Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadVideo}>
        <ThemedText style={styles.uploadButtonText}>
          📹 อัปโหลดวิดีโอของคุณ
        </ThemedText>
      </TouchableOpacity>

      {/* Video Grid */}
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.videoGrid}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  uploadButton: {
    backgroundColor: "#4ECDC4",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  videoGrid: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  videoItem: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    margin: 5,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    height: 120,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  thumbnailEmoji: {
    fontSize: 50,
  },
  durationBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  videoInfo: {
    padding: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
    marginBottom: 8,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statText: {
    fontSize: 11,
    color: "#999",
  },
});
