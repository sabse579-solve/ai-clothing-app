import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import GenerateScreen from "./screens/GenerateScreen";
import SavedDesignsScreen from "./screens/SavedDesignsScreen";
import TryOnScreen from "./screens/TryOnScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Generate" component={GenerateScreen} />
        <Stack.Screen name="Saved" component={SavedDesignsScreen} />
        <Stack.Screen name="TryOn" component={TryOnScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
