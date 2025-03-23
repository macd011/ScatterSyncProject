import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const PlaceholderScreen = ({ title }: { title: string }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
);

const BottomTab = () => {
  const router = useRouter();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          height: 65,
        },
        tabBarShowLabel: false, 
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Dashboard") iconName = "home-outline";
          else if (route.name === "Tasks") iconName = "checkbox-outline";
          else if (route.name === "Focus Timer") iconName = "alarm-outline";
          else if (route.name === "Deadlines") iconName = "calendar-outline";
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={() => PlaceholderScreen({ title: "Dashboard" })} />
      <Tab.Screen name="Tasks" component={() => PlaceholderScreen({ title: "Tasks" })} />
      <Tab.Screen name="Focus Timer" component={() => PlaceholderScreen({ title: "Focus Timer" })} />
      <Tab.Screen name="Deadlines" component={() => PlaceholderScreen({ title: "Deadlines" })} />
    </Tab.Navigator>
  );
};

export default BottomTab;
