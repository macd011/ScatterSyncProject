import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import FormInput from "../../components/ui/FormInput";
import authStyles from "./authStyles";
import { useAuth } from "../../hooks/useAuth";

const RegisterScreen = () => {
  const router = useRouter();
  const { email, setEmail, password, setPassword, handleRegister, loading, error } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    handleRegister();
  };

  return (
    <View style={authStyles.container}>
      <Image 
        source={require("../../assets/images/LogoTransparent.png")} 
        style={authStyles.logo} 
        resizeMode="contain"
      />
      <Text style={authStyles.title}>Register</Text>
      <Text style={authStyles.subtitle}>Create an account to get started.</Text>

      <View style={authStyles.inputContainer}>
        <FormInput label="Email" iconName="mail-outline" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <View style={{ height: 15 }} />
        <FormInput label="Password" iconName="lock-closed-outline" secureTextEntry value={password} onChangeText={setPassword} />
        <View style={{ height: 15 }} />
        <FormInput label="Confirm Password" iconName="lock-closed-outline" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      </View>

      {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}

      <TouchableOpacity style={authStyles.button} onPress={handleRegisterPress} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={authStyles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>

      <View style={authStyles.linkContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/LoginScreen")}>
          <Text style={authStyles.linkText}> Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
