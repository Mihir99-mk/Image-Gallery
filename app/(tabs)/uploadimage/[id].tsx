import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { firebase } from "../../../firebase.config";

const ImageId = () => {
  const id = useLocalSearchParams();
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchUrl = async () => {
    const storageRef = firebase.storage().refFromURL(
      "gs://image-gallery-e6c7b.appspot.com/file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540mihir99%252FnativePractice/ImagePicker"
    );

    try {
      const list = await storageRef.listAll();
      const urlArray = await Promise.all(
        list.items.map(async (url) => {
          const item = await url.getDownloadURL();
          return item;
        })
      );

      setUrls(urlArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  const handleDelete = async (imageUrl: string) => {
    try {

      const storageRef = firebase.storage().refFromURL(imageUrl);
      await storageRef.delete()

      setUrls(urls.filter((url) => url !== imageUrl));
    } catch (error) {
      console.error("Error deleting images:", error);
      setLoading(false);
    }
  };

  const imageUrl = urls[Number(id.id)];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Details</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : imageUrl ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              handleDelete(imageUrl)
            }}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>No image found for the given ID</Text>
      )}

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "SpaceMono",
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "70%",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "70%",
  },
  deleteButton: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    height: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ImageId;
