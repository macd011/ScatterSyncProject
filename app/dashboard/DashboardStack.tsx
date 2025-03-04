import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DashboardScreen from "./DashboardScreen";

const Stack = createStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
  </Stack.Navigator>
);

export default DashboardStack;
