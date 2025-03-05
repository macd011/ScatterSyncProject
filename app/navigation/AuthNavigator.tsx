import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../auth/LoginScreen";
import RegisterScreen from "../auth/RegisterScreen";
import AppNavigator from "./AppNavigator";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  MainApp: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => (
<Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="MainApp" component={AppNavigator} />
  </Stack.Navigator>
);

export default AuthNavigator;
