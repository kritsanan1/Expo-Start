
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Match {
  id: string;
  user: {
    name: string;
    age: number;
    avatar: string;
    online: boolean;
  };
  lastMessage: {
    text: string;
    timestamp: string;
    isRead: boolean;
  };
  unreadCount: number;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  type: 'text' | 'image' | 'video';
}

const sampleMatches: Match[] = [
  {
    id: '1',
    user: {
      name: 'นิภา',
      age: 25,
      avatar: '🌸',
      online: true,
    },
    lastMessage: {
      text: 'สวัสดีค่ะ! ยินดีที่ได้รู้จักนะคะ 😊',
      timestamp: '10:30',
      isRead: false,
    },
    unreadCount: 2,
  },
  {
    id: '2',
    user: {
      name: 'ศิริ',
      age: 28,
      avatar: '💝',
      online: false,
    },
    lastMessage: {
      text: 'ขอบคุณสำหรับการแชร์รูปภาพนะคะ',
      timestamp: 'เมื่อวาน',
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: '3',
    user: {
      name: 'มณี',
      age: 24,
      avatar: '🌺',
      online: true,
    },
    lastMessage: {
      text: 'ไปดูหนังกันไหมคะ?',
      timestamp: '14:45',
      isRead: false,
    },
    unreadCount: 1,
  },
];

const sampleMessages: Message[] = [
  {
    id: '1',
    text: 'สวัสดีครับ! ยินดีที่ได้รู้จักนะครับ',
    timestamp: '10:25',
    isOwn: true,
    type: 'text',
  },
  {
    id: '2',
    text: 'สวัสดีค่ะ! ยินดีที่ได้รู้จักนะคะ 😊',
    timestamp: '10:30',
    isOwn: false,
    type: 'text',
  },
  {
    id: '3',
    text: 'วันนี้เป็นยังไงบ้างครับ?',
    timestamp: '10:35',
    isOwn: true,
    type: 'text',
  },
];

export default function ChatScreen() {
  const [activeTab, setActiveTab] = useState<'matches' | 'chat'>('matches');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString('th-TH', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isOwn: true,
        type: 'text',
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleVideoCall = () => {
    Alert.alert('📹 วิดีโอคอล', 'ฟีเจอร์วิดีโอคอลจะเปิดใช้งานเร็วๆ นี้!');
  };

  const handleVoiceCall = () => {
    Alert.alert('📞 โทรศัพท์', 'ฟีเจอร์โทรศัพท์จะเปิดใช้งานเร็วๆ นี้!');
  };

  const renderMatchItem = (match: Match) => (
    <TouchableOpacity
      key={match.id}
      style={styles.matchItem}
      onPress={() => {
        setSelectedMatch(match);
        setActiveTab('chat');
      }}
    >
      <View style={styles.matchAvatar}>
        <Text style={styles.avatarText}>{match.user.avatar}</Text>
        {match.user.online && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.matchInfo}>
        <View style={styles.matchHeader}>
          <ThemedText style={styles.matchName}>
            {match.user.name}, {match.user.age}
          </ThemedText>
          <ThemedText style={styles.timestamp}>
            {match.lastMessage.timestamp}
          </ThemedText>
        </View>
        
        <View style={styles.lastMessageRow}>
          <ThemedText 
            style={[
              styles.lastMessage,
              !match.lastMessage.isRead && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {match.lastMessage.text}
          </ThemedText>
          {match.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <ThemedText style={styles.unreadCount}>
                {match.unreadCount}
              </ThemedText>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isOwn ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          message.isOwn ? styles.ownBubble : styles.otherBubble,
        ]}
      >
        <ThemedText style={styles.messageText}>{message.text}</ThemedText>
        <ThemedText style={styles.messageTime}>{message.timestamp}</ThemedText>
      </View>
    </View>
  );

  if (activeTab === 'chat' && selectedMatch) {
    return (
      <LinearGradient colors={['#FF6B6B', '#4ECDC4']} style={styles.container}>
        {/* Chat Header */}
        <ThemedView style={styles.chatHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setActiveTab('matches');
              setSelectedMatch(null);
            }}
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.chatUserInfo}>
            <Text style={styles.chatAvatar}>{selectedMatch.user.avatar}</Text>
            <View>
              <ThemedText style={styles.chatUserName}>
                {selectedMatch.user.name}
              </ThemedText>
              <ThemedText style={styles.chatUserStatus}>
                {selectedMatch.user.online ? 'ออนไลน์' : 'ออฟไลน์'}
              </ThemedText>
            </View>
          </View>
          
          <View style={styles.callButtons}>
            <TouchableOpacity style={styles.callButton} onPress={handleVoiceCall}>
              <Text style={styles.callIcon}>📞</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton} onPress={handleVideoCall}>
              <Text style={styles.callIcon}>📹</Text>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Messages */}
        <ScrollView style={styles.messagesContainer}>
          {messages.map(renderMessage)}
        </ScrollView>

        {/* Message Input */}
        <ThemedView style={styles.messageInput}>
          <TextInput
            style={styles.textInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="พิมพ์ข้อความ..."
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </ThemedView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#FF6B6B', '#4ECDC4']} style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Messages 💬
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          แชทกับคนที่คุณสนใจ
        </ThemedText>
      </ThemedView>

      {/* Matches List */}
      <ScrollView style={styles.matchesList}>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            New Matches 🔥
          </ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.newMatchesContainer}>
              {sampleMatches.filter(m => m.unreadCount > 0).map((match) => (
                <TouchableOpacity
                  key={match.id}
                  style={styles.newMatchItem}
                  onPress={() => {
                    setSelectedMatch(match);
                    setActiveTab('chat');
                  }}
                >
                  <View style={styles.newMatchAvatar}>
                    <Text style={styles.avatarText}>{match.user.avatar}</Text>
                    {match.user.online && <View style={styles.onlineIndicator} />}
                  </View>
                  <ThemedText style={styles.newMatchName}>
                    {match.user.name}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Messages
          </ThemedText>
          {sampleMatches.map(renderMatchItem)}
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
  matchesList: {
    flex: 1,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  newMatchesContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  newMatchItem: {
    alignItems: 'center',
    width: 80,
  },
  newMatchAvatar: {
    position: 'relative',
    marginBottom: 8,
  },
  newMatchName: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  matchItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  matchAvatar: {
    position: 'relative',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 50,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 16,
    height: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  matchInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  matchName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  lastMessageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: '#333',
  },
  unreadBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Chat Screen Styles
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 15,
  },
  backButton: {
    marginRight: 15,
  },
  backIcon: {
    fontSize: 24,
    color: '#FF6B6B',
  },
  chatUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chatAvatar: {
    fontSize: 40,
    marginRight: 12,
  },
  chatUserName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chatUserStatus: {
    fontSize: 12,
    color: '#4CAF50',
  },
  callButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  callButton: {
    backgroundColor: '#f0f0f0',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIcon: {
    fontSize: 18,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messageContainer: {
    marginBottom: 15,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 15,
    borderRadius: 20,
  },
  ownBubble: {
    backgroundColor: '#FF6B6B',
    borderBottomRightRadius: 5,
  },
  otherBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  messageTime: {
    fontSize: 11,
    color: '#666',
    alignSelf: 'flex-end',
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4ECDC4',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    fontSize: 18,
    color: 'white',
  },
});
