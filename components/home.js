import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ActivityIndicator
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";
import { getWord } from "../service/firebase";

const Home = (props) => {
  const op = useRef(new Animated.Value(0)).current;
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const wordOfD = await getWord();
        setWord(wordOfD["word"]);
        setMeaning(wordOfD["meaning"]);
      } catch (err) {
        console.log(err);
      } finally{
        setLoading(false);
      }
    }
    getData();
  }, []);
  useEffect(() => {
    Animated.timing(op, {
      toValue: props.showChoose ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [props.showChoose]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.welcomeBox}>
        <TouchableOpacity
          style={styles.profile}
          onPress={() => props.navigation.navigate("profile")}
        >
          <Text style={{ color: "white" }}>RS</Text>
        </TouchableOpacity>
        <Ionicons name="notifications-circle-outline" size={30} color="black" />
      </View>
      { loading ?     <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <ActivityIndicator size="large" />
        </View>
:
        <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
          <View style={styles.wordBox}>
            <Text style={styles.title}>Word of the day</Text>
            <Text style={styles.punText}>{word}</Text>
            <Text style={styles.desc}>{meaning}</Text>
          </View>
          <View style={styles.contentBox}>
            <LottieView
              autoPlay
              style={{
                width: 170,
                height: 170,
              }}
              source={require("../assets/scanLot.json")}
            />
            <Text>Start scanning text</Text>
          </View>
        </View>
      }
      {/* <BlurView intensity={9} tint='dark'  style={styles.blur}>

      </BlurView> */}
      <Animated.View
        style={{
          ...styles.blur,
          display: props.showChoose ? "flex" : "none",
          opacity: op,
        }}
      ></Animated.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  welcomeBox: {
    alignItems: "flex-start",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcome: {
    fontSize: 30,
  },
  wrapper: {
    alignItems: "center",
  },
  wordBox: {
    marginTop: 30,
    width: "90%",
    height: 200,
    backgroundColor: "#FFFEFF",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
  title: {
    fontSize: 30,
  },
  punText: {
    marginTop: 5,
    fontSize: 25,
    color: "#F5694D",
  },
  desc: {
    fontSize: 15,
  },
  contentBox: {
    marginTop: 30,
    width: "90%",
    height: "50%",
    backgroundColor: "#FFFEFF",
    borderRadius: 15,
    padding: 5,
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
  blur: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, .45)",
    display: "none",
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5694D",
  },
});
export default Home;
