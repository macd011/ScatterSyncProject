import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import BottomTab from "../../components/navigation/BottomTab";
import dashboardStyles from "./dashboardStyles";
import { Ionicons } from "@expo/vector-icons";
import UserDrawer from "../../components/ui/UserDrawer";

const DashboardScreen = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={dashboardStyles.header}>
        <Text style={dashboardStyles.headerText}>Dashboard</Text>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="person-circle-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={dashboardStyles.content}>
        <View style={dashboardStyles.card}>
          <Ionicons name="checkbox-outline" size={24} color="#007AFF" />
          <View style={dashboardStyles.cardTextContainer}>
            <Text style={dashboardStyles.cardTitle}>Tasks</Text>
            <Text style={dashboardStyles.cardSubtitle}>Manage your daily tasks</Text>
          </View>
        </View>

        <View style={dashboardStyles.card}>
          <Ionicons name="alarm-outline" size={24} color="#FF3B30" />
          <View style={dashboardStyles.cardTextContainer}>
            <Text style={dashboardStyles.cardTitle}>Focus Timer</Text>
            <Text style={dashboardStyles.cardSubtitle}>Boost your productivity</Text>
          </View>
        </View>

        <View style={dashboardStyles.card}>
          <Ionicons name="calendar-outline" size={24} color="#34C759" />
          <View style={dashboardStyles.cardTextContainer}>
            <Text style={dashboardStyles.cardTitle}>Deadlines</Text>
            <Text style={dashboardStyles.cardSubtitle}>Keep track of due dates</Text>
          </View>
        </View>

        {/* Encouragement Section */}
        <View style={dashboardStyles.tipBox}>
          <Text style={dashboardStyles.tipTitle}>Reminder for Today</Text>
          <Text style={dashboardStyles.tipText}>
            Take a break! Your brain needs rest to stay productive. ☕
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomTab />

      {/* Right-Side Drawer */}
      {drawerVisible && <UserDrawer isVisible={drawerVisible} onClose={() => setDrawerVisible(false)} />}
    </View>
  );
};

export default DashboardScreen;
