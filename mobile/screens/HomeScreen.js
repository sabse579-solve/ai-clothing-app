import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>AI Clothing App</Text>

      <TouchableOpacity
        style={{ backgroundColor: "black", padding: 15, marginTop: 20 }}
        onPress={() => navigation.navigate("Generate")}
      >
        <Text style={{ color: "white" }}>Generate Design</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: "gray", padding: 15, marginTop: 20 }}
        onPress={() => navigation.navigate("Saved")}
      >
        <Text style={{ color: "white" }}>Saved Designs</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: "purple", padding: 15, marginTop: 20 }}
        onPress={() => navigation.navigate("TryOn")}
      >
        <Text style={{ color: "white" }}>AI Try-On</Text>
      </TouchableOpacity>
    </View>
  );
}
