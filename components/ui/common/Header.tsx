import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  username?: string;
  onProfilePress?: () => void;
  showIcon?: boolean;
}

const Header: React.FC<HeaderProps> = ({ username = "User", onProfilePress, showIcon = true }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Hello, <Text style={styles.username}>{username}</Text></Text>
      {showIcon && (
        <TouchableOpacity onPress={onProfilePress}>
          <Ionicons name="person-circle-outline" size={36} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#683AE7",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
  username: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 20,
  },
});
