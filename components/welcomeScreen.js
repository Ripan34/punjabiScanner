import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import MontserratText from "./montserratText";
import { auth, getWord } from "../service/firebase";
import ekOn from '../assets/ekO.png';

const WelcomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState(null);
  const [meaning, setMeaning] = useState(null);
  const [initials, setInitials] = useState(null);

  async function getData() {
    try {
      const wordOfD = await getWord();
      setWord(wordOfD["word"]);
      setMeaning(wordOfD["meaning"]);
      const name = await auth.currentUser.displayName;
      setInitials(name);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (word != null && meaning != null && initials != null) {
      navigation.navigate("tabs", {
        word: word,
        meaning: meaning,
        initials: initials,
      });
    } else return;
  }, [word, meaning, initials]);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await getData();
      } else {
        setLoading(false);
        return;
      }
    });
  }, []);
  return (
    <View style={{ width: "100%", height: "100%" }}>
      {loading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.top}>
            <MontserratText
            style={{ ...styles.title }}
                val={"Welcome to"}
              />
              <MontserratText
                style={{ ...styles.title }}
                val={"Word of the day"}
              />
                <MontserratText
                style={{ ...styles.title }}
                val={"Punjabi"}
              />
            </View>
            <View style={styles.middle}>
              {/* <LottieView
        autoPlay
        loop={false}
        style={{
          width: '50%',
          height: 250,
          backgroundColor: 'rgba(0,0,0,0)',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/home.json')}
      /> */}
      {/* <Image source={ekOn} style={{width: 300, height: 300}} resizeMode="contain"/> */}
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity
                style={styles.login}
                onPress={() => navigation.navigate("login")}
              >
                <Text
                  style={{ color: "white", fontWeight: "500", fontSize: 16 }}
                >
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.login, backgroundColor: "black" }}
                onPress={() => navigation.navigate("signUp")}
              >
                <Text
                  style={{ color: "white", fontWeight: "500", fontSize: 16 }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    // backgroundColor: 'rgb(220, 156, 253)',
    backgroundColor: '#FFEEEB'
  },
  title: {
    fontSize: 30,
    padding: 5
  },
  top: {
    width: "100%",
    alignItems: 'center',
    padding: 15,
  },
  bottom: {
    width: "100%",
    height: "22%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  login: {
    width: "80%",
    height: "auto",
    padding: 20,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#6D9886",
  },
  middle: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
  back: {
    flex: 1,
    justifyContent: "center",
  },
});
export default WelcomeScreen;
