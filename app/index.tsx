import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

const Main = () => {

  
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.view}>
        <Text style={styles.mainText}>Hello</Text>
        {/* <Link href={"/dashboard/"} asChild> */}
        <TouchableOpacity style={styles.signup} onPress={()=>router.push("/signup")}>
          <Text style={styles.signupText}>Sign-Up</Text>
        </TouchableOpacity>
        {/* </Link> */}
        <TouchableOpacity style={styles.signup}  onPress={()=>router.push("/signin")}>
          <Text style={styles.signupText}>Sign-In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#112D4E",
    // color: "#EEF5FF",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  view:{
    marginTop: 50,
    alignItems: "center"
  },
  // #176B87
  // #86B6F6

  mainText: {
    color: "#F9F7F7",
    fontSize: 50,
    marginBottom: 80,
    fontFamily: "SpaceMono",
  },
  signup:{
    paddingVertical: 16,
    paddingHorizontal: 90,
    borderRadius: 4,
    backgroundColor: "#3F72AF",
    marginBottom: 18
  },
  signupText:{
    fontWeight: "500",
    color: "#F9F7F7",
    fontSize: 16
  }
});
