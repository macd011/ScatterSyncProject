import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#683AE7',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarStyle: {
          height: 65,
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          backgroundColor: '#fff',
        },
      }}
    >
      <Tabs.Screen
        name="DashboardScreen"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="TaskManagerScreen" 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Tasks',
        }}
      />
      <Tabs.Screen
        name="FocusTimerScreen"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alarm-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Timer',
        }}
      />
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