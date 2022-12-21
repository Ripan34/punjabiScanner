import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { Ionicons } from "@expo/vector-icons";

  const AboutUs = ({navigation}) => {
    return (
        <SafeAreaView style={{     backgroundColor: '#FFEEEB'        , height: '100%'}}>
        <View style={styles.header}>
          <Text style={{ fontSize: 20 }}>About</Text>
          <TouchableOpacity
            style={{ position: "absolute", top: -3, left: 0, padding: 5 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <Text>Thank you for using this App.</Text>
            <Text>I have created this app for our community</Text>
        </View>
        </SafeAreaView>

    )
  };
  const styles = StyleSheet.create({
    header: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        borderBottomColor: '#F5694D',
        borderBottomWidth: 0.5,
        paddingBottom: 10
      },
      container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      },
})
  export default AboutUs;