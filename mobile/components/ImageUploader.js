// Placeholder: On real apps use `react-native-image-picker` to pick an image and upload to backend
import React from 'react';
import { View, Button } from 'react-native';


export default function ImageUploader({ onUpload }) {
return (
<View>
<Button title="Upload (placeholder)" onPress={() => alert('Use image picker in production')} />
</View>
);
}