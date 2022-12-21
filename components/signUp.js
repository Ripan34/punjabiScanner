import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  
  import React, { useState } from "react";
  import MontserratText from "./montserratText";
  import { MaterialIcons } from "@expo/vector-icons";

  const SignUp = ({ navigation }) => {
    const [focus, setFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const validateEmail = () => {
    setEmailError(false);
    const res = String(email)
      .toLowerCase()
      .trim()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    setEmailError(!res);
    return true;
  };
  return (
      <SafeAreaView style={styles.wrapper}>
        <MontserratText style={styles.title} val={"Sign up"} />
        <View style={styles.container}>
          <Text style={{ fontSize: 22, marginBottom: 8 }}>Email</Text>
          <TextInput
            onChangeText={setEmail}
            style={{
              ...styles.input,
              borderColor: focus ? "#3461FD" : "black",
            }}
            placeholder="email"
            keyboardType="email-address"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
          {emailError && (
            <View style={{ flexDirection: "row", alignContent: "center" }}>
              <MaterialIcons
                name="error-outline"
                size={20}
                color="red"
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: "red", marginBottom: 10 }}>
                Please enter a valid email address
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.next}
            onPress={() => {
              validateEmail() && navigation.navigate("name", { email });
            }}
          >
            <Text style={{ color: "white" }}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: '#FFEEEB'

  },
  title: {
    marginTop: 20,
    marginLeft: 18,
    fontSize: 30,
  },
  container: {
    padding: 18,
  },
  input: {
    padding: 15,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 15,
    marginBottom: 10,
  },
  next: {
    padding: 15,
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3461FD",
  },
  checkbox: {
    marginBottom: 15,
    marginRight: 10,
  },
});
  export default SignUp;