import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { auth, firestore } from "../../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import userStyles from "../../styles/userStyles";

interface Props {
  onBack: () => void;
}

const Communication = ({ onBack }: Props) => {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [emailUpdatesEnabled, setEmailUpdatesEnabled] = useState(false);

  useEffect(() => {
    checkNotificationPermission();
    loadUserPreferences();
  }, []);

  const checkNotificationPermission = async () => {
    const settings = await Notifications.getPermissionsAsync();
    if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.AUTHORIZED) {
      setPushEnabled(true);
    }
  };

  const loadUserPreferences = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(firestore, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setPushEnabled(data.pushNotifications ?? false);
      setEmailUpdatesEnabled(data.emailUpdates ?? false);
    }
  };

  const handleTogglePush = async (value: boolean) => {
    const user = auth.currentUser;
    if (!user) return;

    if (value) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Push notification permission is needed.");
        return;
      }
    }

    setPushEnabled(value);

    await setDoc(
      doc(firestore, "users", user.uid),
      { pushNotifications: value },
      { merge: true }
    );
  };

  const handleToggleEmail = async (value: boolean) => {
    const user = auth.currentUser;
    if (!user) return;

    setEmailUpdatesEnabled(value);

    await setDoc(
      doc(firestore, "users", user.uid),
      { emailUpdates: value },
      { merge: true }
    );
  };

  return (
    <View style={userStyles.container}>
      <View style={userStyles.header}>
        <TouchableOpacity onPress={onBack} style={userStyles.backRow}>
          <Ionicons name="chevron-back" size={24} color="#000" />
          <Text style={userStyles.headerTitle}>Communication</Text>
        </TouchableOpacity>
      </View>

      {/* Push Notifications */}
      <View style={userStyles.arrowRow}>
        <Text style={userStyles.label}>Push Notifications</Text>
        <Switch
          value={pushEnabled}
          onValueChange={handleTogglePush}
          thumbColor={pushEnabled ? "#683AE7" : "#ccc"}
          trackColor={{ true: "#D6C8FA", false: "#eee" }}
        />
      </View>

      {/* Email Notifications */}
      <View style={userStyles.arrowRow}>
        <Text style={userStyles.label}>Email Feature Updates</Text>
        <Switch
          value={emailUpdatesEnabled}
          onValueChange={handleToggleEmail}
          thumbColor={emailUpdatesEnabled ? "#683AE7" : "#ccc"}
          trackColor={{ true: "#D6C8FA", false: "#eee" }}
        />
      </View>
    </View>
  );
};

export default Communication;
