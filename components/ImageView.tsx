import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { firebase } from "../firebase.config";
import { ActivityIndicator } from "react-native-paper";
import { router } from "expo-router";

const ImageView = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  const fetchUrl = async () => {
    const storageRef = firebase.storage().refFromURL(
      "gs://image-gallery-e6c7b.appspot.com/file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540mihir99%252FnativePractice/ImagePicker"
    );

    try {
      const list = await storageRef.listAll();
      const urlArray = await Promise.all(
        list.items.map(async (urls) => {
          const item = await urls.getDownloadURL();
          return item;
        })
      );

      setUrls(urlArray);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchUrl();
    } finally {
      setRefreshing(false);
    }
  };

  const { width } = Dimensions.get("window");
  const imageWidth = (width - 20) / 2;

  useEffect(() => {
    fetchUrl();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploaded Images</Text>
      {loading ? ( 
        <ActivityIndicator size="large" color="#0000ff" />
      ) : urls.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No images found</Text>
        </View>
      ) : (
        <FlatList
          data={urls}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ width: "50%", height: "100%" }}
              onPress={() => {
                router.push(`/(tabs)/uploadimage/${index}`);
              }}
            >
              <Image source={{ uri: item }} style={styles.image} />
            </TouchableOpacity>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
  image: {
    width: 160,
    height: 200,
    margin: 5,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    padding: 12,
    fontSize: 25,
    fontWeight: "700",
    fontFamily: "SpaceMono",
  },
});

export default ImageView;
