import React from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import FormInput from "../../components/ui/FormInput";
import authStyles from "./authStyles";
import { useAuth } from "../../hooks/useAuth";

const RegisterScreen = () => {
  const router = useRouter();
  const {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleRegister,
    loading,
    error,
  } = useAuth();

  return (
    <View style={authStyles.container}>
      {/* Logo */}
      <Image
        source={require("../../assets/images/LogoTransparent.png")}
        style={authStyles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={authStyles.title}>Register</Text>
      <Text style={authStyles.subtitle}>Create an account to get started</Text>

      {/* Form Inputs */}
      <View style={authStyles.inputContainer}>
        <FormInput
          label="Username"
          iconName="person-outline"
          value={username}
          onChangeText={setUsername}
        />
        <View style={{ height: 15 }} />

        <FormInput
          label="Email"
          iconName="mail-outline"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View style={{ height: 15 }} />

        <FormInput
          label="Password"
          iconName="lock-closed-outline"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={{ height: 15 }} />

        <FormInput
          label="Confirm Password"
          iconName="lock-closed-outline"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Error Message */}
      {error ? <Text style={{ color: "red", marginTop: 10 }}>{error}</Text> : null}

      {/* Submit Button */}
      <TouchableOpacity
        style={authStyles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={authStyles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Link to Login */}
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
