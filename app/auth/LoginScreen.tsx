import React from "react";
import { View, Text, TouchableOpacity, StatusBar, Image, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormInput from "../../components/ui/FormInput";
import { useAuth } from "../../hooks/useAuth";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/AuthNavigator";
import globalStyles from "../../components/styles/globalStyles";

const LoginScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<AuthStackParamList, "Login">>();
  const { email, setEmail, password, setPassword, handleLogin } = useAuth();

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar hidden={true} />

      {/* Logo */}
      <Image
        source={require("../../assets/images/LogoTransparent.png")}
        style={globalStyles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={globalStyles.title}>Login</Text>
      <Text style={globalStyles.subtitle}>Please log in to continue.</Text>

      {/* Input Fields */}
      <FormInput
        label="Email"
        iconName="mail-outline"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <FormInput
        label="Password"
        iconName="lock-closed-outline"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <Text style={globalStyles.text}>
        Don't have an account?
        <Text
          style={globalStyles.link}
          onPress={() => navigation.navigate("Register")}
        >
          {" "}
          Sign Up
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
