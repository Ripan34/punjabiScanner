import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import MontserratText from "./montserratText";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {sendResetPasswordEmail} from '../service/firebase';

const ForgotPassword = ({navigation}) => {
  const [focus, setFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      setError(false);
      setLoading(true);
      setSuccess(false);
      await sendResetPasswordEmail(email);
      //await logInWithEmailAndPassword(email, password);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError(true);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <MontserratText style={styles.title} val={"Forgot password"} />
      {!success ? <View style={styles.container}>
        <Text style={{ fontSize: 21, marginBottom: 8 }}>
          Please enter your email
        </Text>
        <Text style={{ fontSize: 15, marginBottom: 8 }}>
          Reset password email will be sent to your email
        </Text>
        <TextInput
          style={{ ...styles.input, borderColor: focus ? "#3461FD" : "black" }}
          placeholder="email"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChangeText={setEmail}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.next}>
          <Text style={{ color: "white" }}>
            {loading ? <ActivityIndicator size="small" /> : "Submit"}
          </Text>
        </TouchableOpacity>
        {error && (
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              marginTop: 10,
            }}
          >
            <MaterialIcons
              name="error-outline"
              size={20}
              color="red"
              style={{ marginRight: 5 }}
            />
            <Text style={{ color: "red", marginBottom: 10 }}>
              Please enter a valid email
            </Text>
          </View>
        )}
      </View>: 
      <View style={styles.container}>
        <Text style={{marginBottom: 10, fontSize: 20}}>Email sent successfuly. Please check your email</Text>
        <TouchableOpacity onPress={() => {navigation.navigate("welcome")}} style={styles.next}>
          <Text style={{ color: "white" }}>
            Go back to login
          </Text>
        </TouchableOpacity>
        </View>}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
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
    backgroundColor: "white",
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
});
export default ForgotPassword;
