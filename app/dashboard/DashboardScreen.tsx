import React from "react";
import { View, Text, SafeAreaView } from "react-native";

const DashboardScreen = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-bold">Welcome to ScatterSync Dashboard</Text>
    </SafeAreaView>
  );
};

export default DashboardScreen;