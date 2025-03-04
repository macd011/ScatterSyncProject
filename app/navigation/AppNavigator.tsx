import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DashboardScreen from "../dashboard/DashboardScreen";
import DeadlinesScreen from "../deadlines/DeadlinesScreen";
import FocusTimerScreen from "../focus-timer/FocusTimerScreen";
import TaskManagerScreen from "../task-manager/TaskManagerScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName="Dashboard"
    screenOptions={({ route }) => {
      const iconName: keyof typeof Ionicons.glyphMap =
        route.name === "Dashboard" ? "grid" :
        route.name === "Tracker" ? "calendar" :
        route.name === "Focus Timer" ? "timer" :
        route.name === "Deadlines" ? "alarm" :
        "grid";

      return {
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={iconName} size={size} color={color} />
        ),
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
      };
    }}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Focus Timer" component={FocusTimerScreen} />
    <Tab.Screen name="Deadlines" component={DeadlinesScreen} />
    <Tab.Screen name="Tasks" component={TaskManagerScreen} />
  </Tab.Navigator>
);

export default AppNavigator;
