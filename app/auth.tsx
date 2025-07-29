import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!isLogin && (!name || !age)) {
      Alert.alert("Error", "Please provide your name and age");
      return;
    }

    if (!isLogin && (parseInt(age) < 18 || parseInt(age) > 100)) {
      Alert.alert("Error", "Age must be between 18 and 100");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        router.replace("/(tabs)");
      } else {
        await signUp(email, password, {
          name,
          age: parseInt(age),
          bio: "Tell everyone about yourself...",
          location: "Bangkok, Thailand",
          interests: [],
          social_connections: {},
        });
        Alert.alert(
          "Success",
          "Account created! Please check your email to verify your account.",
        );
        setIsLogin(true);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#FF6B6B", "#4ECDC4"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ThemedView style={styles.formContainer}>
          <ThemedText type="title" style={styles.title}>
            LoveMatch Thailand 💕
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            {isLogin ? "Welcome back!" : "Find your perfect match"}
          </ThemedText>

          <View style={styles.form}>
            {!isLogin && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Age"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  maxLength={2}
                />
              </>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {!isLogin && (
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            )}

            <TouchableOpacity
              style={styles.authButton}
              onPress={handleAuth}
              disabled={loading}
            >
              <ThemedText style={styles.authButtonText}>
                {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setIsLogin(!isLogin)}
            >
              <ThemedText style={styles.switchButtonText}>
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </ThemedText>
            </TouchableOpacity>
          </View>

          <ThemedView style={styles.socialLogin}>
            <ThemedText style={styles.socialTitle}>
              Or continue with:
            </ThemedText>
            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={[styles.socialButton, styles.facebookButton]}
              >
                <ThemedText style={styles.socialButtonText}>
                  📘 Facebook
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialButton, styles.googleButton]}
              >
                <ThemedText style={styles.socialButtonText}>
                  🔍 Google
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </ThemedView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 30,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6B6B",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "white",
  },
  authButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  authButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchButton: {
    alignItems: "center",
  },
  switchButtonText: {
    color: "#4ECDC4",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialLogin: {
    alignItems: "center",
  },
  socialTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  socialButton: {
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  facebookButton: {
    backgroundColor: "#1877F2",
  },
  googleButton: {
    backgroundColor: "#EA4335",
  },
  socialButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
