import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, firestore } from "../../firebaseConfig";
import {
  doc,
  getDoc,
  getDocFromCache,
  setDoc,
} from "firebase/firestore";
import userStyles from "../styles/userStyles";

interface Props {
  onBack: () => void;
  onChangePasswordPress: () => void;
  onChangeUsernamePress: () => void;
  onChangeDobPress: () => void;
}

const UserInfo = ({
  onBack,
  onChangePasswordPress,
  onChangeUsernamePress,
  onChangeDobPress,
}: Props) => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("---");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [confirming, setConfirming] = useState(false);

  const passwordLength = "---";

  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(firestore, "users", user.uid);

      try {
        const cachedSnap = await getDocFromCache(userRef);
        if (cachedSnap.exists()) {
          applyUserData(cachedSnap.data(), user.email);
        }
      } catch {
        console.log("No cached user data found.");
      }

      try {
        const serverSnap = await getDoc(userRef);
        if (serverSnap.exists()) {
          applyUserData(serverSnap.data(), user.email);
        }
      } catch (err) {
        console.warn("Failed to fetch live user data:", err);
      }
    };

    const applyUserData = (data: any, fallbackEmail: string | null) => {
      setFirstName(data.firstName || "");
      setSurname(data.lastName || "");
      setUsername(data.username || "");
      setEmail(fallbackEmail || "---");
      setDob(data.dob || "");
      setAddress(data.address || "");
      setPhone(data.phone || "");
    };

    loadUserData();
  }, []);

  const handleSave = async () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(firestore, "users", user.uid);
    await setDoc(
      userRef,
      {
        firstName,
        lastName: surname,
        username,
        dob,
        address,
        phone,
      },
      { merge: true }
    );

    alert("Profile updated!");
    setConfirming(false);
  };

  return (
    <ScrollView style={userStyles.container}>
      {/* Header */}
      <View style={userStyles.header}>
        <TouchableOpacity onPress={onBack} style={userStyles.backRow}>
          <Ionicons name="chevron-back" size={24} color="#000" />
          <Text style={userStyles.headerTitle}>User Information</Text>
        </TouchableOpacity>
      </View>

      {/* Name Fields */}
      <View style={userStyles.row}>
        <View style={userStyles.flexInput}>
          <Text style={userStyles.label}>First Name</Text>
          <TextInput
            style={userStyles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="e.g. John"
            placeholderTextColor="#555"
          />
        </View>
        <View style={userStyles.flexInput}>
          <Text style={userStyles.label}>Surname</Text>
          <TextInput
            style={userStyles.input}
            value={surname}
            onChangeText={setSurname}
            placeholder="e.g. Smith"
            placeholderTextColor="#555"
          />
        </View>
      </View>

      {/* Email */}
      <View style={userStyles.arrowRow}>
        <View>
          <Text style={userStyles.label}>Email</Text>
          <Text style={userStyles.disabledInput}>{email}</Text>
        </View>
      </View>

      {/* Username */}
      <TouchableOpacity style={userStyles.arrowRow} onPress={onChangeUsernamePress}>
        <View>
          <Text style={userStyles.label}>Username</Text>
          <Text style={userStyles.disabledInput}>{username || "---"}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </TouchableOpacity>

      {/* Password */}
      <TouchableOpacity style={userStyles.arrowRow} onPress={onChangePasswordPress}>
        <View>
          <Text style={userStyles.label}>Password</Text>
          <Text style={userStyles.disabledInput}>{passwordLength}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </TouchableOpacity>

      {/* DOB */}
      <TouchableOpacity style={userStyles.arrowRow} onPress={onChangeDobPress}>
        <View>
          <Text style={userStyles.label}>Date of Birth</Text>
          <Text style={userStyles.disabledInput}>{dob || "---"}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </TouchableOpacity>

      {/* Address */}
      <Text style={userStyles.label}>Address</Text>
      <TextInput
        style={userStyles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="e.g. 123 High Street"
        placeholderTextColor="#555"
      />

      {/* Phone */}
      <Text style={userStyles.label}>Phone</Text>
      <TextInput
        style={userStyles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="e.g. +44 1234 567890"
        placeholderTextColor="#555"
      />

      {/* Save Changes Button */}
      <TouchableOpacity style={userStyles.saveBtn} onPress={handleSave}>
        <Text style={userStyles.saveBtnText}>
          {confirming ? "Confirm?" : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserInfo;
