import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = () => {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
        <Ionicons name="arrow-back" size={24} color="#007AFF" />
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Settings</Text>
      <Text>Theme Settings (Dark/Light Mode)</Text>
      <Text>Notification Preferences</Text>
      <Text>Account Details</Text>
    </View>
  );
};

export default SettingsScreen;
