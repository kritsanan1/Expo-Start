import { useState, useRef } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  Dimensions,
  Animated,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width, height } = Dimensions.get('window');

interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  distance: string;
  image: string;
  interests: string[];
}

const sampleProfiles: Profile[] = [
  {
    id: '1',
    name: 'นิภา',
    age: 25,
    bio: 'รักการเดินทาง ชอบดูหนัง และหาเพื่อนคุยที่ใช่ ❤️',
    distance: '2 กม.',
    image: '🌸',
    interests: ['เดินทาง', 'ดูหนัง', 'กาแฟ']
  },
  {
    id: '2', 
    name: 'ศิริ',
    age: 28,
    bio: 'อาจารย์มหาวิทยาลัย ชอบอ่านหนังสือ และทำอาหาร 🍳',
    distance: '5 กม.',
    image: '💝',
    interests: ['อ่านหนังสือ', 'ทำอาหาร', 'โยคะ']
  },
  {
    id: '3',
    name: 'มณี',
    age: 24,
    bio: 'นักเต้น รักดนตรี และชอบแมว 🐱',
    distance: '1 กม.',
    image: '🌺',
    interests: ['เต้นรำ', 'ดนตรี', 'แมว']
  }
];

export default function DiscoverScreen() {
  const [profiles, setProfiles] = useState(sampleProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;

  const handleSwipe = (direction: 'left' | 'right') => {
    const toValue = direction === 'left' ? -width : width;

    Animated.timing(pan, {
      toValue: { x: toValue, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      // Reset position and move to next profile
      pan.setValue({ x: 0, y: 0 });
      setCurrentIndex((prevIndex) => 
        prevIndex + 1 >= profiles.length ? 0 : prevIndex + 1
      );
    });
  };

  const currentProfile = profiles[currentIndex];

  if (!currentProfile) {
    return (
      <LinearGradient colors={['#FF6B6B', '#4ECDC4']} style={styles.container}>
        <ThemedView style={styles.emptyContainer}>
          <ThemedText type="title" style={styles.emptyTitle}>
            ไม่มีโปรไฟล์ใหม่! 🎉
          </ThemedText>
          <ThemedText style={styles.emptyText}>
            กลับมาดูใหม่ภายหลังนะ
          </ThemedText>
        </ThemedView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#FF6B6B', '#4ECDC4']} style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Discover 💕
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          ค้นหาคนที่ใช่สำหรับคุณ
        </ThemedText>
      </ThemedView>

      {/* Profile Card */}
      <View style={styles.cardContainer}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                { translateX: pan.x },
                { translateY: pan.y },
                { scale: scale }
              ]
            }
          ]}
        >
          <View style={styles.imageContainer}>
            <Text style={styles.profileImage}>{currentProfile.image}</Text>
          </View>

          <View style={styles.profileInfo}>
            <ThemedText type="subtitle" style={styles.profileName}>
              {currentProfile.name}, {currentProfile.age}
            </ThemedText>
            <ThemedText style={styles.distance}>
              📍 {currentProfile.distance}
            </ThemedText>
            <ThemedText style={styles.bio}>
              {currentProfile.bio}
            </ThemedText>

            <View style={styles.interestsContainer}>
              {currentProfile.interests.map((interest, index) => (
                <View key={index} style={styles.interestTag}>
                  <ThemedText style={styles.interestText}>{interest}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.passButton]}
          onPress={() => handleSwipe('left')}
        >
          <Text style={styles.actionIcon}>❌</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.superLikeButton}>
          <Text style={styles.actionIcon}>⭐</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.likeButton]}
          onPress={() => handleSwipe('right')}
        >
          <Text style={styles.actionIcon}>💕</Text>
        </TouchableOpacity>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {profiles.length}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: width * 0.85,
    height: height * 0.65,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  imageContainer: {
    height: '50%',
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    fontSize: 120,
  },
  profileInfo: {
    padding: 20,
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  distance: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    marginBottom: 15,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  interestText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    gap: 25,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  passButton: {
    backgroundColor: '#FF4458',
  },
  likeButton: {
    backgroundColor: '#66D7A2',
  },
  superLikeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4FC3F7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  actionIcon: {
    fontSize: 24,
  },
  progressContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  progressText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});