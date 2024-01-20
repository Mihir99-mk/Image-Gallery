import React from "react";
import { StyleSheet, View } from "react-native";
import ImagePicker from "../../../components/ImagePicker";
import ImageView from "../../../components/ImageView";

export default function UploadImage() {
  return (
    <View style={styles.container}>
      <ImagePicker />
      <ImageView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, 
    marginBottom:50
  },
});
