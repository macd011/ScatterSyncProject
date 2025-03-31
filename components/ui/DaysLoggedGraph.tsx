import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DaysLoggedGraph = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Days Logged</Text>
      <View style={styles.graph}>
        <Text style={styles.graphText}>Graph Coming Soon</Text>
      </View>
      <View style={styles.labels}>
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(month => (
          <Text key={month} style={styles.label}>{month}</Text>
        ))}
      </View>
    </View>
  );
};

export default DaysLoggedGraph;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  graph: {
    height: 100,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  graphText: {
    color: "#999",
    fontSize: 13,
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
});
