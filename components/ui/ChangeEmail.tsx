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
import userStyles from "../styles/userStyles";
import { auth, firestore } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { updateEmail } from "firebase/auth";

interface Props {
  onBack: () => void;
}

const ChangeEmail = ({ onBack }: Props) => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (user?.email) {
      setAuthEmail(user.email);
    }
    setLoading(false);
  }, []);

  const handleChangeEmail = async () => {
    if (loading) {
      Alert.alert("Please wait", "Still loading user information.");
      return;
    }

    if (!confirming) {
      setConfirming(true);
      return;
    }

    if (!authEmail || currentEmail.trim().toLowerCase() !== authEmail.toLowerCase()) {
      Alert.alert("Incorrect Current Email", "The current email you entered does not match your account.");
      return;
    }

    if (newEmail.trim() !== confirmEmail.trim()) {
      Alert.alert("Mismatch", "New emails do not match.");
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    try {
      // Update email in Firebase Auth
      await updateEmail(user, newEmail.trim());

      // Also update it in Firestore
      const userRef = doc(firestore, "users", user.uid);
      await setDoc(userRef, { email: newEmail.trim() }, { merge: true });

      Alert.alert("Success", "Your email has been updated.");
      onBack();
    } catch (err: any) {
      console.error("Email update error:", err);
      Alert.alert("Error", err.message || "Failed to update email.");
    }

    setConfirming(false);
  };

  return (
    <View style={userStyles.container}>
      <View style={userStyles.header}>
        <TouchableOpacity onPress={onBack} style={userStyles.backRow}>
          <Ionicons name="chevron-back" size={24} color="#000" />
          <Text style={userStyles.headerTitle}>Change Email</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#683AE7" style={{ marginTop: 30 }} />
      ) : (
        <>
          <Text style={userStyles.label}>Current Email</Text>
          <TextInput
            style={userStyles.input}
            value={currentEmail}
            onChangeText={setCurrentEmail}
            placeholder="e.g. johndoe@email.com"
            placeholderTextColor="#555"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={userStyles.label}>New Email</Text>
          <TextInput
            style={userStyles.input}
            value={newEmail}
            onChangeText={setNewEmail}
            placeholder="e.g. newemail@email.com"
            placeholderTextColor="#555"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={userStyles.label}>Confirm New Email</Text>
          <TextInput
            style={userStyles.input}
            value={confirmEmail}
            onChangeText={setConfirmEmail}
            placeholder="Confirm new email"
            placeholderTextColor="#555"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TouchableOpacity style={userStyles.saveBtn} onPress={handleChangeEmail}>
            <Text style={userStyles.saveBtnText}>
              {confirming ? "Confirm?" : "Update Email"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ChangeEmail;
