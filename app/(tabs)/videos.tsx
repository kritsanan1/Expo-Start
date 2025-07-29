
import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width, height } = Dimensions.get('window');

interface VideoProfile {
  id: string;
  user: {
    name: string;
    age: number;
    location: string;
    avatar: string;
  };
  videoUrl: string;
  thumbnail: string;
  duration: number;
  likes: number;
  comments: number;
  shares: number;
  description: string;
  hashtags: string[];
}

const sampleVideos: VideoProfile[] = [
  {
    id: '1',
    user: {
      name: 'นิภา',
      age: 25,
      location: 'กรุงเทพฯ',
      avatar: '🌸',
    },
    videoUrl: 'sample-video-1.mp4',
    thumbnail: '🎥',
    duration: 15,
    likes: 1250,
    comments: 89,
    shares: 45,
    description: 'รักการเดินทาง ชอบดูหนัง มาทำความรู้จักกันนะ ❤️',
    hashtags: ['#เดินทาง', '#ดูหนัง', '#หาแฟน'],
  },
  {
    id: '2',
    user: {
      name: 'ศิริ',
      age: 28,
      location: 'เชียงใหม่',
      avatar: '💝',
    },
    videoUrl: 'sample-video-2.mp4',
    thumbnail: '📹',
    duration: 20,
    likes: 890,
    comments: 56,
    shares: 23,
    description: 'อาจารย์มหาวิทยาลัย ชอบอ่านหนังสือ และทำอาหาร 🍳',
    hashtags: ['#อาจารย์', '#ทำอาหาร', '#อ่านหนังสือ'],
  },
  {
    id: '3',
    user: {
      name: 'มณี',
      age: 24,
      location: 'ภูเก็ต',
      avatar: '🌺',
    },
    videoUrl: 'sample-video-3.mp4',
    thumbnail: '🎬',
    duration: 12,
    likes: 2100,
    comments: 145,
    shares: 78,
    description: 'นักเต้น รักดนตรี และชอบแมว 🐱',
    hashtags: ['#เต้นรำ', '#ดนตรี', '#แมว'],
  },
];

export default function VideosScreen() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);

  const currentVideo = sampleVideos[currentVideoIndex];

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Here you would typically update the backend
  };

  const handleComment = () => {
    Alert.alert('แสดงความคิดเห็น', 'ฟีเจอร์ความคิดเห็นจะเปิดใช้งานเร็วๆ นี้!');
  };

  const handleShare = () => {
    Alert.alert('แชร์วิดีโอ', 'ฟีเจอร์แชร์จะเปิดใช้งานเร็วๆ นี้!');
  };

  const handleMatch = () => {
    Alert.alert('💕 It\'s a Match!', `คุณสนใจ ${currentVideo.user.name} แล้ว!`);
  };

  const handleUploadVideo = () => {
    setShowUploadOptions(true);
  };

  const handleRecordVideo = () => {
    Alert.alert('📹 บันทึกวิดีโอ', 'เปิดกล้องเพื่อบันทึกวิดีโอแนะนำตัว');
    setShowUploadOptions(false);
  };

  const handleSelectFromGallery = () => {
    Alert.alert('📁 เลือกจากแกลเลอรี่', 'เลือกวิดีโอจากอุปกรณ์ของคุณ');
    setShowUploadOptions(false);
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => 
      prev + 1 >= sampleVideos.length ? 0 : prev + 1
    );
    setIsLiked(false);
  };

  const previousVideo = () => {
    setCurrentVideoIndex((prev) => 
      prev - 1 < 0 ? sampleVideos.length - 1 : prev - 1
    );
    setIsLiked(false);
  };

  return (
    <View style={styles.container}>
      {/* Video Player Area */}
      <View style={styles.videoContainer}>
        <LinearGradient
          colors={['#FF6B6B', '#4ECDC4']}
          style={styles.videoPlaceholder}
        >
          <Text style={styles.videoIcon}>{currentVideo.thumbnail}</Text>
          <Text style={styles.durationBadge}>{currentVideo.duration}s</Text>
        </LinearGradient>

        {/* Navigation Arrows */}
        <TouchableOpacity style={styles.prevButton} onPress={previousVideo}>
          <Text style={styles.navIcon}>⬆️</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.nextButton} onPress={nextVideo}>
          <Text style={styles.navIcon}>⬇️</Text>
        </TouchableOpacity>
      </View>

      {/* Right Side Actions */}
      <View style={styles.actionsContainer}>
        {/* Profile Avatar */}
        <TouchableOpacity style={styles.avatarContainer}>
          <Text style={styles.avatar}>{currentVideo.user.avatar}</Text>
          <View style={styles.followButton}>
            <Text style={styles.followIcon}>➕</Text>
          </View>
        </TouchableOpacity>

        {/* Like Button */}
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Text style={[styles.actionIcon, isLiked && styles.liked]}>
            {isLiked ? '❤️' : '🤍'}
          </Text>
          <Text style={styles.actionCount}>
            {currentVideo.likes + (isLiked ? 1 : 0)}
          </Text>
        </TouchableOpacity>

        {/* Comment Button */}
        <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionCount}>{currentVideo.comments}</Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Text style={styles.actionIcon}>📤</Text>
          <Text style={styles.actionCount}>{currentVideo.shares}</Text>
        </TouchableOpacity>

        {/* Match Button */}
        <TouchableOpacity style={styles.matchButton} onPress={handleMatch}>
          <Text style={styles.matchIcon}>💕</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Info */}
      <View style={styles.bottomInfo}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            @{currentVideo.user.name}, {currentVideo.user.age}
          </Text>
          <Text style={styles.userLocation}>📍 {currentVideo.user.location}</Text>
        </View>

        <Text style={styles.description}>{currentVideo.description}</Text>
        
        <View style={styles.hashtagsContainer}>
          {currentVideo.hashtags.map((hashtag, index) => (
            <Text key={index} style={styles.hashtag}>
              {hashtag}
            </Text>
          ))}
        </View>
      </View>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadVideo}>
        <Text style={styles.uploadIcon}>➕</Text>
      </TouchableOpacity>

      {/* Upload Options Modal */}
      {showUploadOptions && (
        <View style={styles.uploadModal}>
          <View style={styles.modalContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>
              สร้างวิดีโอโปรไฟล์
            </ThemedText>
            
            <TouchableOpacity style={styles.modalOption} onPress={handleRecordVideo}>
              <Text style={styles.modalIcon}>📹</Text>
              <ThemedText style={styles.modalText}>บันทึกวิดีโอใหม่</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modalOption} onPress={handleSelectFromGallery}>
              <Text style={styles.modalIcon}>📁</Text>
              <ThemedText style={styles.modalText}>เลือกจากแกลเลอรี่</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalCancel} 
              onPress={() => setShowUploadOptions(false)}
            >
              <ThemedText style={styles.modalCancelText}>ยกเลิก</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoIcon: {
    fontSize: 120,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  prevButton: {
    position: 'absolute',
    top: '20%',
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    position: 'absolute',
    bottom: '30%',
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
  },
  actionsContainer: {
    position: 'absolute',
    right: 15,
    bottom: 100,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    fontSize: 50,
    marginBottom: 5,
  },
  followButton: {
    backgroundColor: '#FF6B6B',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  followIcon: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 5,
  },
  liked: {
    transform: [{ scale: 1.2 }],
  },
  actionCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  matchButton: {
    backgroundColor: '#FF6B6B',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  matchIcon: {
    fontSize: 28,
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 100,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  userInfo: {
    marginBottom: 10,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userLocation: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  description: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hashtag: {
    color: '#4ECDC4',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 5,
  },
  uploadButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#4ECDC4',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  uploadIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  uploadModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    width: width * 0.8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#333',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    marginBottom: 15,
    width: '100%',
  },
  modalIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
  modalCancel: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  modalCancelText: {
    color: '#666',
    fontSize: 16,
  },
});
