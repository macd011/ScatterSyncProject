// components/dashboard/ProductivityGraph.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { auth, firestore } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import dashboardStyles from "../../styles/dashboardStyles";

const { width } = Dimensions.get("window");
const BAR_WIDTH = 6;
const MAX_BAR_HEIGHT = 100;
const BAR_SPACING = 2;

interface LoginData {
  [date: string]: boolean;
}

const ProductivityGraph = () => {
  const [graphData, setGraphData] = useState<number[]>([]);
  const [maxStreak, setMaxStreak] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    fetchUserProductivityData();
  }, []);

  const fetchUserProductivityData = async () => {
    try {
      setDataLoading(true);
      const user = auth.currentUser;
      if (!user) return;

      const userDocRef = doc(firestore, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        const loginHistory = data.loginHistory || {};
        
        const last30Days = getLast30Days();
        const productivityData = last30Days.map(date => 
          loginHistory[date] ? 1 : 0
        );
        
        let currentStreak = 0;
        let maxFound = 0;
        
        for (let i = 0; i < productivityData.length; i++) {
          if (productivityData[i] === 1) {
            currentStreak++;
            maxFound = Math.max(maxFound, currentStreak);
          } else {
            currentStreak = 0;
          }
        }
        
        setGraphData(productivityData);
        setMaxStreak(maxFound);
      }
    } catch (error) {
      console.error("Error fetching productivity data:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const getLast30Days = () => {
    const result = [];
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      result.push(date.toISOString().split("T")[0]);
    }
    return result;
  };

  const getBarHeight = (value: number) => {
    return value ? MAX_BAR_HEIGHT * 0.3 + (Math.random() * MAX_BAR_HEIGHT * 0.7) : 0;
  };

  if (dataLoading) {
    return (
      <View style={dashboardStyles.graphCard}>
        <Text style={dashboardStyles.graphTitle}>Productivity Streak</Text>
        <View style={dashboardStyles.loadingGraph}>
          <Ionicons name="hourglass-outline" size={24} color="#999" />
          <Text style={dashboardStyles.loadingText}>Loading data...</Text>
        </View>
      </View>
    );
  }

  const weeklyData = [];
  for (let i = 0; i < 4; i++) {
    const weekStart = i * 7;
    const weekValues = graphData.slice(weekStart, weekStart + 7);
    const weekSum = weekValues.reduce((sum, val) => sum + val, 0);
    weeklyData.push(weekSum);
  }

  return (
    <View style={dashboardStyles.graphCard}>
      <Text style={dashboardStyles.graphTitle}>Productivity Streak</Text>
      
      <View style={dashboardStyles.graphStatsRow}>
        <View style={dashboardStyles.graphStat}>
          <Text style={dashboardStyles.graphStatValue}>{maxStreak}</Text>
          <Text style={dashboardStyles.graphStatLabel}>Max Streak</Text>
        </View>
        <View style={dashboardStyles.graphStat}>
          <Text style={dashboardStyles.graphStatValue}>
            {graphData.filter(v => v === 1).length}
          </Text>
          <Text style={dashboardStyles.graphStatLabel}>Active Days</Text>
        </View>
      </View>
      
      <View style={dashboardStyles.graphContainer}>
        {graphData.map((value, index) => (
          <View 
            key={index} 
            style={[
              dashboardStyles.graphBar,
              { 
                height: getBarHeight(value),
                backgroundColor: value ? '#683AE7' : '#F0F0F0',
              }
            ]} 
          />
        ))}
      </View>
      
      <View style={dashboardStyles.graphLabels}>
        <Text style={dashboardStyles.graphLabel}>4 Weeks Ago</Text>
        <Text style={dashboardStyles.graphLabel}>3 Weeks Ago</Text>
        <Text style={dashboardStyles.graphLabel}>2 Weeks Ago</Text>
        <Text style={dashboardStyles.graphLabel}>Last Week</Text>
        <Text style={dashboardStyles.graphLabel}>This Week</Text>
      </View>
    </View>
  );
};

export default ProductivityGraph;