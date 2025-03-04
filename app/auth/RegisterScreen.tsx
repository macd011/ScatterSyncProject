import React from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import type { AuthStackParamList } from "../navigation/AuthNavigator";
import { useNavigation } from "@react-navigation/native";

type NavigationProps = StackNavigationProp<AuthStackParamList, "Register">;

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView className="flex-1 p-4 bg-gray-100 justify-center items-center">
      <Text className="text-2xl font-bold mb-6">Create an Account</Text>
      
      <TextInput className="border p-2 w-3/4 mb-4" placeholder="Name" />
      <TextInput className="border p-2 w-3/4 mb-4" placeholder="Email" />
      <TextInput className="border p-2 w-3/4 mb-4" placeholder="Password" secureTextEntry />
      
      <TouchableOpacity 
        className="w-3/4 bg-blue-500 py-3 rounded-lg mt-4"
        onPress={() => navigation.replace("MainApp")}> 
        <Text className="text-white text-center text-lg font-bold">REGISTER</Text>
      </TouchableOpacity>
      
      <Text className="text-gray-500 mt-6">
        Already have an account? 
        <Text className="text-blue-500" onPress={() => navigation.navigate("Login")}>
          Login
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default RegisterScreen;