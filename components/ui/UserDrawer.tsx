import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SCREEN_WIDTH = Dimensions.get("window").width;

const UserDrawer = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  const router = useRouter();
  const slideAnim = new Animated.Value(isVisible ? 0 : SCREEN_WIDTH);

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? SCREEN_WIDTH * 0.1 : SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  return (
    <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
      {/* Close Button */}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={30} color="#333" />
      </TouchableOpacity>

      {/* User Details */}
      <Text style={styles.title}>Your Profile</Text>
      <View style={styles.detailContainer}>
        <Ionicons name="person-outline" size={20} color="#007AFF" />
        <Text style={styles.detailText}>John Doe</Text>
      </View>
      <View style={styles.detailContainer}>
        <Ionicons name="calendar-outline" size={20} color="#007AFF" />
        <Text style={styles.detailText}>01 Jan 1990</Text>
      </View>
      <View style={styles.detailContainer}>
        <Ionicons name="mail-outline" size={20} color="#007AFF" />
        <Text style={styles.detailText}>johndoe@email.com</Text>
      </View>

      {/* Settings Button */}
      <TouchableOpacity style={styles.settingsButton} onPress={() => router.push("./(Dashboard)/SettingsScreen")}>
        <Ionicons name="settings-outline" size={24} color="white" />
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "90%",
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 50,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: -2, height: 0 },
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
  },
  settingsButton: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  settingsText: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
});

export default UserDrawer;
