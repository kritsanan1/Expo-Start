
import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, PanGestureHandler, State } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const { width: screenWidth } = Dimensions.get('window');

const mockProfiles = [
  {
    id: 1,
    name: 'Anna',
    age: 25,
    bio: 'Love traveling and Thai food 🍜',
    location: 'Bangkok',
    videoUrl: 'https://example.com/video1',
    interests: ['Travel', 'Food', 'Photography'],
  },
  {
    id: 2,
    name: 'Niran',
    age: 28,
    bio: 'Photographer and coffee enthusiast ☕',
    location: 'Chiang Mai',
    videoUrl: 'https://example.com/video2',
    interests: ['Photography', 'Coffee', 'Art'],
  },
  {
    id: 3,
    name: 'Ploy',
    age: 24,
    bio: 'Dancer and music lover 🎵',
    location: 'Phuket',
    videoUrl: 'https://example.com/video3',
    interests: ['Dancing', 'Music', 'Beach'],
  },
];

export default function DiscoverScreen() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles] = useState(mockProfiles);
  
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const currentProfile = profiles[currentProfileIndex];

  const onSwipeComplete = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      console.log('Liked:', currentProfile.name);
    } else {
      console.log('Passed:', currentProfile.name);
    }
    
    // Move to next profile
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0); // Reset to first profile
    }
    
    // Reset card position
    translateX.value = 0;
    translateY.value = 0;
    scale.value = 1;
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = withSpring(0.95);
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: (event) => {
      const shouldSwipe = Math.abs(event.translationX) > screenWidth * 0.3;
      
      if (shouldSwipe) {
        const direction = event.translationX > 0 ? 'right' : 'left';
        translateX.value = withSpring(event.translationX > 0 ? screenWidth : -screenWidth);
        runOnJS(onSwipeComplete)(direction);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
      
      scale.value = withSpring(1);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotateZ = (translateX.value / screenWidth) * 30;
    
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotateZ}deg` },
        { scale: scale.value },
      ],
    };
  });

  if (!currentProfile) {
    return (
      <LinearGradient colors={['#FF6B6B', '#4ECDC4']} style={styles.container}>
        <ThemedView style={styles.noMoreCards}>
          <ThemedText type="title" style={styles.noMoreText}>No more profiles!</ThemedText>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => setCurrentProfileIndex(0)}
          >
            <ThemedText style={styles.resetButtonText}>Start Over</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#FF6B6B', '#4ECDC4']} style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>Discover</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Swipe right to like, left to pass</ThemedText>
      </ThemedView>

      {/* Profile Card */}
      <View style={styles.cardContainer}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.card, animatedStyle]}>
            <View style={styles.videoContainer}>
              <ThemedText style={styles.videoPlaceholder}>📹 Video Profile</ThemedText>
              <ThemedText style={styles.videoHint}>Tap to play</ThemedText>
            </View>
            
            <View style={styles.profileInfo}>
              <ThemedText type="title" style={styles.profileName}>
                {currentProfile.name}, {currentProfile.age}
              </ThemedText>
              <ThemedText style={styles.profileLocation}>📍 {currentProfile.location}</ThemedText>
              <ThemedText style={styles.profileBio}>{currentProfile.bio}</ThemedText>
              
              <View style={styles.interestsContainer}>
                {currentProfile.interests.map((interest, index) => (
                  <View key={index} style={styles.interestTag}>
                    <ThemedText style={styles.interestText}>{interest}</ThemedText>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.passButton]}
          onPress={() => onSwipeComplete('left')}
        >
          <ThemedText style={styles.actionButtonText}>❌</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.superLikeButton]}
        >
          <ThemedText style={styles.actionButtonText}>⭐</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.likeButton]}
          onPress={() => onSwipeComplete('right')}
        >
          <ThemedText style={styles.actionButtonText}>💕</ThemedText>
        </TouchableOpacity>
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
    width: screenWidth - 40,
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    overflow: 'hidden',
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholder: {
    fontSize: 48,
    marginBottom: 10,
  },
  videoHint: {
    fontSize: 16,
    color: '#666',
  },
  profileInfo: {
    padding: 20,
    backgroundColor: 'white',
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
    gap: 20,
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
    backgroundColor: '#FF6B6B',
  },
  superLikeButton: {
    backgroundColor: '#FFD700',
  },
  likeButton: {
    backgroundColor: '#4ECDC4',
  },
  actionButtonText: {
    fontSize: 24,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 20,
    borderRadius: 20,
  },
  noMoreText: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
