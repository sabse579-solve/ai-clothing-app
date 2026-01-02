import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';


export default function DesignCard({ item, onPress }) {
return (
<TouchableOpacity onPress={() => onPress(item)}>
<View style={{ margin: 8 }}>
<Image source={{ uri: item.imageUrl }} style={{ width: 180, height: 180 }} />
<Text numberOfLines={2}>{item.prompt}</Text>
</View>
</TouchableOpacity>
);
}