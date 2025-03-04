import React from "react";
import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, useColorScheme } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import type { AuthStackParamList } from "../navigation/AuthNavigator";

type NavigationProps = StackNavigationProp<AuthStackParamList, "Login">;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-6">Welcome</Text>
      <Image source={require("../../assets/images/LogoHighRes.png")} style={{ width: 100, height: 100, marginBottom: 20 }} resizeMode="contain"/>

      <TextInput className="w-full border-b border-gray-300 p-3 mb-4 text-lg" placeholder="Email" />
      <TextInput className="w-full border-b border-gray-300 p-3 text-lg" placeholder="Password" secureTextEntry />

      <TouchableOpacity className="w-full py-3 rounded-lg bg-blue-500" onPress={() => navigation.replace("MainApp")}>
        <Text className="text-white text-center text-lg font-bold">LOGIN</Text>
      </TouchableOpacity>

      <Text className="text-gray-500 mt-6">
        Don't have an account?
        <Text className="text-blue-500" onPress={() => navigation.navigate("Register")}> Sign Up</Text>
      </Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
