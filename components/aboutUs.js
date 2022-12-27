import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { Ionicons } from "@expo/vector-icons";
  import MontserratText from "./montserratText";

  const AboutUs = ({navigation}) => {
    return (
        <SafeAreaView style={{height: '100%', backgroundColor: '#F6F5FC'}}>
        <View style={styles.header}>
        <MontserratText style={{ fontSize: 20 }} val={"About"} />
          <TouchableOpacity
            style={{ position: "absolute", top: -3, left: 0, padding: 5 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <Text style={{fontSize: 25}}>Thank you for using this App.</Text>
            <Text style={{fontSize: 18, marginTop: 18, lineHeight: 30, opacity: 0.7}}>As we all know many punjabi words are disappearing from our vocabulary. We are using several english words in our common senetnces without even realizing.</Text>
            <Text style={styles.txt}>By making word of the day, we hope you learn something everyday and our beautiful language stays alive.</Text>
            <Text style={styles.txt}>We have also provided an OCR (Optical character recognition) so you can extract punjabi text from images.</Text>
            <Text style={styles.txt}>If you have any questions, comments or complains contact us:</Text>
            <Text style={styles.txt}><Text style={{textDecorationLine: 'underline'}}>punjabi.wod@gmail.com</Text></Text>
        </View>
        </SafeAreaView>

    )
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
      container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        padding: 20,
      },
      txt: {
        fontSize: 18,
        marginTop: 10,
        lineHeight: 30,
        opacity: 0.7
      }
})
  export default AboutUs;