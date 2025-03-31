import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebaseConfig";

import dashboardStyles from "./dashboardStyles";
import BottomTab from "../../components/navigation/BottomTab";
import UserDrawer from "../../components/ui/UserDrawer";

const DashboardScreen = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.username) setUsername(data.username);
          }
        }
      } catch (err) {
        console.error("Failed to fetch username:", err);
      }
    };

    fetchUsername();
  }, []);

  const quickMenuItems = [
    { icon: "checkbox-outline", title: "Tasks", color: "#007AFF" },
    { icon: "alarm-outline", title: "Focus Timer", color: "#FF3B30" },
    { icon: "calendar-outline", title: "Deadlines", color: "#34C759" },
  ];

  return (
    <View style={dashboardStyles.container}>
      {/* Header */}
      <View style={dashboardStyles.header}>
        <View>
          <Text style={dashboardStyles.helloText}>Hello,</Text>
          <Text style={dashboardStyles.usernameText}>{username}</Text>
        </View>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={dashboardStyles.scrollContent}>
        {/* Big Card */}
        <View style={dashboardStyles.bigCard}>
          <Text style={dashboardStyles.bigCardTitle}>Your Productivity Summary</Text>
          <Text style={dashboardStyles.bigCardText}>
            You’ve stayed consistent 3 days in a row. Keep up the good work!
          </Text>
        </View>

        {/* Calendar Card */}
        <View style={dashboardStyles.calendarCard}>
          <Text style={dashboardStyles.calendarText}>📅 Calendar Coming Soon</Text>
        </View>

        {/* Quick Menu */}
        <Text style={dashboardStyles.quickMenuTitle}>Quick Menu</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={quickMenuItems}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View style={dashboardStyles.quickCard}>
              <Ionicons name={item.icon as any} size={26} color={item.color} />
              <Text style={dashboardStyles.quickCardText}>{item.title}</Text>
            </View>
          )}
        />

        {/* Tip Card */}
        <View style={dashboardStyles.tipBox}>
          <Text style={dashboardStyles.tipTitle}>Reminder for Today</Text>
          <Text style={dashboardStyles.tipText}>
            Take a break! Your brain needs rest to stay productive. ☕
          </Text>
        </View>
      </ScrollView>

      <BottomTab />

      {drawerVisible && (
        <UserDrawer isVisible={drawerVisible} onClose={() => setDrawerVisible(false)} />
      )}
    </View>
  );
};

export default DashboardScreen;