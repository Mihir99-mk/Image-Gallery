import { Button, StyleSheet, Text, ToastAndroid, View } from "react-native";
import * as IPicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { firebase } from "../firebase.config";

const ImagePicker = () => {
  const imagePicker = async () => {
    const result = await IPicker.launchImageLibraryAsync({
      mediaTypes: IPicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: IPicker.UIImagePickerControllerQualityType.Medium,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      result.assets.map(async (img) => {
        const { uri } = await FileSystem.getInfoAsync(img.uri);
        const response = await fetch(img.uri);
        const blob = await response.blob();

        const storageRef = firebase.storage().ref();

        const imageRef = storageRef.child(uri);

        const { ref } = await imageRef.put(blob);

        if (ref.name) {
          ToastAndroid.show("uploaded successfully", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("uploaded failed", ToastAndroid.SHORT);
        }
      });
      // }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={imagePicker} />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
  },
});
