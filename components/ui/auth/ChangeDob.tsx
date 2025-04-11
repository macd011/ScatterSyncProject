import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Appearance,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore } from "../../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import userStyles from "../../styles/userStyles";

interface Props {
  onBack: () => void;
}

const ChangeDob = ({ onBack }: Props) => {
  const [date, setDate] = useState(new Date());
  const [confirming, setConfirming] = useState(false);
  const [selected, setSelected] = useState(false);

  const isDark = Appearance.getColorScheme() === "dark";

  useEffect(() => {
    const fetchDob = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userRef = doc(firestore, "users", user.uid);
        const snap = await getDoc(userRef);
        const data = snap.data();
        if (data?.dob) {
          setDate(new Date(data.dob));
        }
      } catch (error) {
        console.error("Error loading DOB:", error);
      }
    };

    fetchDob();
  }, []);

  const handleSave = async () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    try {
      const userRef = doc(firestore, "users", user.uid);
      await setDoc(
        userRef,
        { dob: date.toISOString().split("T")[0] },
        { merge: true }
      );

      onBack(); // Return to info screen
    } catch (error) {
      console.error("Failed to update DOB:", error);
    }
  };

  return (
    <View style={userStyles.container}>
      {/* Header */}
      <View style={userStyles.header}>
        <TouchableOpacity onPress={onBack} style={userStyles.backRow}>
          <Ionicons name="chevron-back" size={24} color="#000" />
          <Text style={userStyles.headerTitle}>Change Date of Birth</Text>
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      <View style={[userStyles.arrowRow, { paddingBottom: 16 }]}>
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={(_, d) => {
            if (d) {
              setDate(d);
              setSelected(true);
            }
          }}
          themeVariant={isDark ? "dark" : "light"}
          textColor="#000"
          style={{ flex: 1 }}
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={userStyles.saveBtn}
        onPress={handleSave}
      >
        <Text style={userStyles.saveBtnText}>
          {confirming ? "Confirm?" : "Save Date of Birth"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangeDob;
