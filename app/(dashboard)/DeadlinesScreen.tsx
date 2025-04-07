import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import dashboardStyles from "../../components/styles/dashboardStyles";

const DeadlinesScreen = () => {
  const [username, setUsername] = useState("User");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    getDoc(doc(firestore, "users", user.uid)).then((docSnap) => {
      if (docSnap.exists()) {
        setUsername(docSnap.data().username || "User");
      }
    });
  }, []);

  return (
    <View style={dashboardStyles.container}>
      <View style={dashboardStyles.header}>
        <Text style={dashboardStyles.usernameText}>
          {username.toUpperCase()}'s DEADLINES
        </Text>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default DeadlinesScreen;
