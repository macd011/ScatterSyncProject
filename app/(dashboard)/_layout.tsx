import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hides the default header for all screens
        tabBarActiveTintColor: '#683AE7', // Active tab icon and label colour
        tabBarInactiveTintColor: '#8e8e93', // Inactive tab icon and label colour
        tabBarStyle: {
          height: 65,
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          backgroundColor: '#fff', // Tab bar background
        },
      }}
    >
      {/* Dashboard tab */}
      <Tabs.Screen
        name="DashboardScreen"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Dashboard',
        }}
      />

      {/* Task Manager tab */}
      <Tabs.Screen
        name="TaskManagerScreen"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Tasks',
        }}
      />

      {/* Focus Timer tab */}
      <Tabs.Screen
        name="FocusTimerScreen"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alarm-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Timer',
        }}
      />

      {/* Daily Schedule tab */}
      <Tabs.Screen
        name="DailyScheduleScreen"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Calendar',
        }}
      />
    </Tabs>
  );
}
