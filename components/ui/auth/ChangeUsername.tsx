import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import userStyles from "../../styles/userStyles";
import { auth, firestore } from "../../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface Props {
  onBack: () => void;
}

const ChangeUsername = ({ onBack }: Props) => {
  const [currentInput, setCurrentInput] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [confirmUsername, setConfirmUsername] = useState("");
  const [storedUsername, setStoredUsername] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setStoredUsername(data.username || "");
        } else {
          console.warn("No user data found.");
        }
      } catch (err) {
        console.error("Failed to fetch username:", err);
      } finally {
        // Give the UI time to breathe even if fast:
        setTimeout(() => setLoading(false), 300); // short delay
      }
    };

    fetchUsername();
  }, []);

  const handleChangeUsername = async () => {
    if (loading) {
      Alert.alert("Loading", "Please wait for user data to load...");
      return;
    }

    if (!confirming) {
      setConfirming(true);
      return;
    }

    if (!storedUsername) {
      Alert.alert("Error", "Your current username could not be found.");
      return;
    }

    if (currentInput.trim() !== storedUsername) {
      Alert.alert("Incorrect Username", "The current username does not match our records.");
      return;
    }

    if (newUsername.trim() !== confirmUsername.trim()) {
      Alert.alert("Mismatch", "New usernames do not match.");
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    try {
      const userRef = doc(firestore, "users", user.uid);
      await setDoc(
        userRef,
        { username: newUsername.trim() },
        { merge: true }
      );
      Alert.alert("Success", "Your username has been updated.");
      onBack();
    } catch (err) {
      console.error("Username update error:", err);
      Alert.alert("Error", "Failed to update username. Please try again.");
    }

    setConfirming(false);
  };

  return (
    <View style={userStyles.container}>
      <View style={userStyles.header}>
        <TouchableOpacity onPress={onBack} style={userStyles.backRow}>
          <Ionicons name="chevron-back" size={24} color="#000" />
          <Text style={userStyles.headerTitle}>Change Username</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#683AE7" style={{ marginTop: 30 }} />
      ) : (
        <>
          <Text style={userStyles.label}>Current Username</Text>
          <TextInput
            style={userStyles.input}
            value={currentInput}
            onChangeText={setCurrentInput}
            placeholder="e.g. johndoe"
            placeholderTextColor="#555"
            autoCapitalize="none"
          />

          <Text style={userStyles.label}>New Username</Text>
          <TextInput
            style={userStyles.input}
            value={newUsername}
            onChangeText={setNewUsername}
            placeholder="Enter new username"
            placeholderTextColor="#555"
            autoCapitalize="none"
          />

          <Text style={userStyles.label}>Confirm New Username</Text>
          <TextInput
            style={userStyles.input}
            value={confirmUsername}
            onChangeText={setConfirmUsername}
            placeholder="Confirm new username"
            placeholderTextColor="#555"
            autoCapitalize="none"
          />

          <TouchableOpacity style={userStyles.saveBtn} onPress={handleChangeUsername}>
            <Text style={userStyles.saveBtnText}>
              {confirming ? "Confirm?" : "Update Username"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ChangeUsername;
