import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import userStyles from "../styles/userStyles";

interface Props {
  onBack: () => void;
}

const ChangePassword = ({ onBack }: Props) => {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleChangePassword = () => {
    if (next !== confirm) {
      alert("Passwords do not match.");
      return;
    }
    alert("Password updated!");
  };

  return (
    <View style={userStyles.container}>
      <View style={userStyles.header}>
        <TouchableOpacity onPress={onBack} style={userStyles.backRow}>
          <Ionicons name="chevron-back" size={24} color="#000" />
          <Text style={userStyles.headerTitle}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <Text style={userStyles.label}>Current Password</Text>
      <TextInput
        style={userStyles.input}
        value={current}
        onChangeText={setCurrent}
        placeholder="Enter current password"
        secureTextEntry
        placeholderTextColor="#555"
      />

      <Text style={userStyles.label}>New Password</Text>
      <TextInput
        style={userStyles.input}
        value={next}
        onChangeText={setNext}
        placeholder="Enter new password"
        secureTextEntry
        placeholderTextColor="#555"
      />

      <Text style={userStyles.label}>Confirm New Password</Text>
      <TextInput
        style={userStyles.input}
        value={confirm}
        onChangeText={setConfirm}
        placeholder="Confirm new password"
        secureTextEntry
        placeholderTextColor="#555"
      />

      <TouchableOpacity style={userStyles.saveBtn} onPress={handleChangePassword}>
        <Text style={userStyles.saveBtnText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;
