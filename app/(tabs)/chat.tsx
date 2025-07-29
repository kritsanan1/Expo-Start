import { useState } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface Match {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

const mockMatches: Match[] = [
  {
    id: "1",
    name: "Anna",
    lastMessage: "Hey! How are you doing? 😊",
    timestamp: "2 min ago",
    unreadCount: 2,
    avatar: "👩‍🦰",
  },
  {
    id: "2",
    name: "Niran",
    lastMessage: "That photo was amazing!",
    timestamp: "1 hour ago",
    unreadCount: 0,
    avatar: "👨‍💼",
  },
  {
    id: "3",
    name: "Ploy",
    lastMessage: "Let's meet for coffee sometime ☕",
    timestamp: "3 hours ago",
    unreadCount: 1,
    avatar: "👩‍🎨",
  },
];

const mockMessages: Message[] = [
  { id: "1", text: "Hi there! 👋", timestamp: "10:30 AM", isOwn: false },
  {
    id: "2",
    text: "Hello! Nice to meet you!",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: "3",
    text: "I saw your video profile, you seem really fun!",
    timestamp: "10:33 AM",
    isOwn: false,
  },
  {
    id: "4",
    text: "Thank you! I love your travel photos 📸",
    timestamp: "10:35 AM",
    isOwn: true,
  },
  {
    id: "5",
    text: "Hey! How are you doing? 😊",
    timestamp: "2 min ago",
    isOwn: false,
  },
];

export default function ChatScreen() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const renderMatch = ({ item }: { item: Match }) => (
    <TouchableOpacity
      style={styles.matchItem}
      onPress={() => setSelectedMatch(item)}
    >
      <ThemedText style={styles.avatar}>{item.avatar}</ThemedText>
      <ThemedView style={styles.matchInfo}>
        <ThemedText style={styles.matchName}>{item.name}</ThemedText>
        <ThemedText style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.matchMeta}>
        <ThemedText style={styles.timestamp}>{item.timestamp}</ThemedText>
        {item.unreadCount > 0 && (
          <ThemedView style={styles.unreadBadge}>
            <ThemedText style={styles.unreadCount}>
              {item.unreadCount}
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </TouchableOpacity>
  );

  const renderMessage = ({ item }: { item: Message }) => (
    <ThemedView
      style={[
        styles.messageContainer,
        item.isOwn ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      <ThemedText
        style={[
          styles.messageText,
          item.isOwn ? styles.ownMessageText : styles.otherMessageText,
        ]}
      >
        {item.text}
      </ThemedText>
      <ThemedText style={styles.messageTimestamp}>{item.timestamp}</ThemedText>
    </ThemedView>
  );

  if (selectedMatch) {
    return (
      <LinearGradient colors={["#FF6B6B", "#4ECDC4"]} style={styles.container}>
        {/* Chat Header */}
        <ThemedView style={styles.chatHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedMatch(null)}
          >
            <ThemedText style={styles.backButtonText}>← Back</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.chatTitle}>{selectedMatch.name}</ThemedText>
          <TouchableOpacity style={styles.videoCallButton}>
            <ThemedText style={styles.videoCallText}>📹</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
        />

        {/* Message Input */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.messageInput}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <ThemedText style={styles.sendButtonText}>Send</ThemedText>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#FF6B6B", "#4ECDC4"]} style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Messages 💬
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Chat with your matches
        </ThemedText>
      </ThemedView>

      {/* Matches List */}
      <FlatList
        data={mockMatches}
        renderItem={renderMatch}
        keyExtractor={(item) => item.id}
        style={styles.matchesList}
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
  },
  matchesList: {
    flex: 1,
    marginHorizontal: 20,
  },
  matchItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    fontSize: 40,
    marginRight: 15,
  },
  matchInfo: {
    flex: 1,
  },
  matchName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
  },
  matchMeta: {
    alignItems: "flex-end",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
  },
  unreadBadge: {
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  unreadCount: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 15,
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    color: "#FF6B6B",
    fontWeight: "bold",
  },
  chatTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  videoCallButton: {
    padding: 5,
  },
  videoCallText: {
    fontSize: 24,
  },
  messagesList: {
    flex: 1,
    marginHorizontal: 20,
  },
  messagesContent: {
    paddingVertical: 10,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
    padding: 12,
    borderRadius: 20,
  },
  ownMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4ECDC4",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  messageText: {
    fontSize: 16,
    marginBottom: 5,
  },
  ownMessageText: {
    color: "white",
  },
  otherMessageText: {
    color: "#333",
  },
  messageTimestamp: {
    fontSize: 11,
    color: "#666",
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 10,
    borderRadius: 25,
  },
  messageInput: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#4ECDC4",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
