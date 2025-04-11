import React from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import FormInput from "../../components/ui/forms/FormInput";
import authStyles from "../../components/styles/authStyles";
import { useAuth } from "../../hooks/useAuth";

const LoginScreen = () => {
  const router = useRouter();
  const { email, setEmail, password, setPassword, handleLogin, loading, error } = useAuth();

  return (
    <View style={authStyles.container}>
      <Image 
        source={require("../../assets/images/LogoTransparent.png")} 
        style={authStyles.logo} 
        resizeMode="contain"
      />
      <Text style={authStyles.title}>Login</Text>
      <Text style={authStyles.subtitle}>Please log in to continue.</Text>

      <View style={authStyles.inputContainer}>
        <FormInput label="Email" iconName="mail-outline" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <View style={{ height: 15 }} />
        <FormInput label="Password" iconName="lock-closed-outline" secureTextEntry value={password} onChangeText={setPassword} />
      </View>

      {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}

      <TouchableOpacity style={authStyles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={authStyles.buttonText}>Login</Text>}
      </TouchableOpacity>

      <View style={authStyles.linkContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/RegisterScreen")}>
          <Text style={authStyles.linkText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
