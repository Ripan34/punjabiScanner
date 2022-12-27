import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { changePassword } from "../service/firebase";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

//supreme being??
const ChangePassword = ({ route, navigation }) => {
  const [focus, setFocus] = useState(false);
  const [focusTwo, setFocusTwo] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
const [error, setError] = useState(false);
  const handleSubmit = async () => {
    try {
      setError(false);
      setLoading(true);
      setSuccess(false);
      if(newPassword.length < 6 || oldPassword.trim() == "") throw new Error("invalid input")
      await changePassword(oldPassword, newPassword);
      setSuccess(true);
    } catch (err) {
        setSuccess(false);
        setError(true);
    } finally {
        setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20 }}>Change Password</Text>
        <TouchableOpacity
          style={{ position: "absolute", top: -3, left: 0, padding: 5 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {!success ? <View style={styles.container}>
        <Text style={{ marginBottom: 8 }}>Old Password</Text>
        <TextInput
          style={{ ...styles.input, borderColor: focus ? "#3461FD" : "black" }}
          placeholder="password"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          secureTextEntry={true}
          onChangeText={setOldPassword}
        />
        <Text style={{ marginBottom: 8 }}>New Password</Text>
        <TextInput
          style={{
            ...styles.input,
            borderColor: focusTwo ? "#3461FD" : "black",
            marginBottom: 4,
          }}
          placeholder="password"
          onFocus={() => setFocusTwo(true)}
          onBlur={() => setFocusTwo(false)}
          secureTextEntry={true}
          onChangeText={setNewPassword}
        />
        <Text style={{ marginBottom: 10, fontWeight: "200", fontSize: 12 }}>
          Must be atleast 6 characters
        </Text>
        <TouchableOpacity onPress={handleSubmit} style={styles.next}>
          <Text style={{ color: "white" }}>
            {loading ? <ActivityIndicator size="small" /> : "Update password"}
          </Text>
        </TouchableOpacity>
        {error && <View style={{ flexDirection: "row", alignContent: "center", marginTop: 10 }}>
              <MaterialIcons
                name="error-outline"
                size={20}
                color="red"
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: "red", marginBottom: 10 }}>
                Invalid input! please try again
              </Text>
            </View>}
      </View> : 
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 50, padding: 18}}>
            <Text style={{fontSize: 20, marginBottom: 30}}>Password updated successfuly!</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.next}>
          <Text style={{ color: "white" }}>
            Back to profile
          </Text>
        </TouchableOpacity>
          </View>}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderBottomColor: '#3461FD',
    borderBottomWidth: 0.5,
    paddingBottom: 10
  },
  wrapper: {
    height: "100%",
    width: "100%",
    backgroundColor: '#F6F5FC'
  },
  title: {
    marginTop: 20,
    marginLeft: 18,
    fontSize: 30,
  },
  container: {
    padding: 18,
    height: "100%",
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
});
export default ChangePassword;
