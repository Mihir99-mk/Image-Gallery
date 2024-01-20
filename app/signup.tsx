import { Formik } from "formik";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";
import { get, save } from "../utils/store";

function signup() {
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email required!"),
    password: Yup.string().min(2, "minimum 2 value need").max(20, "value cannot be maximum then 20").required("password required!"),
  });

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async({email,password}) => {
            if (email && password) {
                await save("signup", {
                    email: email,
                    password: password
                })
            }


            const data = await get("signup")
            console.log(data)
        }}
      >
        {({
          errors,
          touched,
          values,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <View>
            <Text
              style={{ textAlign: "center", fontSize: 25, marginBottom: 10 }}
            >
              Sign-Up Now
            </Text>
            <View>
              <TextInput
                mode="outlined"
                label={"Email Address"}
                placeholder="Enter email address"
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}

              />
              {touched.email && errors.email && <Text style={{paddingLeft: 20, color:"red", fontWeight: "700"}}>{errors.email}</Text>}
            </View>

            <View>
              <TextInput
                mode="outlined"
                label={"Password"}
                placeholder="Enter password"
                secureTextEntry
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}

              />
              {touched.password && errors.password && <Text style={{paddingLeft: 20, color:"red", fontWeight: "700"}} >{errors.password}</Text>}
            </View>
            <TouchableOpacity
              style={{
                width: "auto",
                height: 50,
                marginTop: 10,
                backgroundColor: "black",
                marginHorizontal: 20,
                borderRadius: 6,
              }}
              onPress={() => handleSubmit()}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 18,
                  paddingTop: 8,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

export default signup;

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
