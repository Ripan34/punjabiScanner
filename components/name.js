import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ImageBackground
  } from "react-native";
  import React, { useState } from "react";
import MontserratText from "./montserratText";
import { MaterialIcons } from "@expo/vector-icons";

const Name = ({route, navigation}) => {
    const {email} = route.params;
    const [focus, setFocus] = useState(false);
    const [name, setName] = useState("");
    const [isChecked, setChecked] = useState(false);
    const [nameError, setNameError] = useState(false);

    const handleSubmit = () => {
      try{
        setNameError(false);
        if(name.trim().length < 2) throw new Error("Invalid input");
        navigation.navigate("signUpPassword", { name, email });
      } catch(err){
          setNameError(true);
      }
    }
    return (
          <SafeAreaView style={styles.wrapper}>
            <MontserratText style={styles.title} val={"Sign up"} />
            <View style={styles.container}>
              <Text style={{ fontSize: 22, marginBottom: 8 }}>First Name</Text>
              <TextInput
                onChangeText={setName}
                style={{
                  ...styles.input,
                  borderColor: focus ? "#3461FD" : "black",
                }}
                placeholder="name"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />
              {nameError && (
                <View style={{ flexDirection: "row", alignContent: "center" }}>
                  <MaterialIcons
                    name="error-outline"
                    size={20}
                    color="red"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={{ color: "red", marginBottom: 10 }}>
                    Please enter a valid name
                  </Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.next}
                onPress={handleSubmit}
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
export default Name;