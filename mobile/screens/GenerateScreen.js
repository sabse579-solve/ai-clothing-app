import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import axios from "axios";

export default function GenerateScreen() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");

  const generate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/design/generate", {
        prompt,
      });

      setImage(res.data.product.imageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Generate AI Clothing Design
      </Text>

      <TextInput
        placeholder="Describe your shirt design..."
        onChangeText={setPrompt}
        value={prompt}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginTop: 20,
        }}
      />

      <TouchableOpacity
        onPress={generate}
        style={{
          backgroundColor: "black",
          padding: 15,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white" }}>Generate</Text>
      </TouchableOpacity>

      {image ? (
        <Image
          source={{ uri: image }}
          style={{ width: 300, height: 300, marginTop: 20 }}
        />
      ) : null}
    </View>
  );
}
