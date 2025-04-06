import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebaseConfig";
import dashboardStyles from "./dashboardStyles";
import BottomTab from "../../components/navigation/BottomTab";
import UserDrawer from "../../components/ui/UserDrawer";
import CalendarCard from "./CalendarCard";

const DashboardScreen = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [username, setUsername] = useState("User");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchUsernameAndStreak = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUsername(data.username || "User");

          const today = new Date().toISOString().split("T")[0];
          const lastLogin = data.lastLogin || "";
          const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
          let currentStreak = data.streak || 0;

          if (lastLogin === yesterday) {
            currentStreak += 1;
          } else if (lastLogin !== today) {
            currentStreak = 1;
          }

          setStreak(currentStreak);
          await setDoc(userDocRef, { lastLogin: today, streak: currentStreak }, { merge: true });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUsernameAndStreak();
  }, []);

  const quickMenuItems = [
    { icon: "checkbox-outline", title: "Tasks", color: "#007AFF" },
    { icon: "alarm-outline", title: "Focus Timer", color: "#FF3B30" },
    { icon: "calendar-outline", title: "Deadlines", color: "#34C759" },
  ];

  const productivityMessage = () => {
    if (streak >= 3) {
      return `You've stayed consistent ${streak} days in a row. Keep it up!`;
    } else if (streak > 0) {
      return `Congrats! Keep building your streak, you're on day ${streak}!`;
    } else {
      return "You've not logged anything today. Time to get productive!";
    }
  };

  return (
    <View style={dashboardStyles.container}>
      <View style={dashboardStyles.header}>
        <Text style={dashboardStyles.usernameText}>
          {username.toUpperCase()}'s DASHBOARD
        </Text>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={dashboardStyles.scrollContent}>
        <View style={dashboardStyles.bigCard}>
          <Text style={dashboardStyles.bigCardTitle}>Your Productivity Summary</Text>
          <Text style={dashboardStyles.bigCardText}>
            {productivityMessage()}
          </Text>
        </View>

        <CalendarCard />

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
