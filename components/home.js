import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ActivityIndicator
} from "react-native";
import { useState, useRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import { AntDesign } from '@expo/vector-icons';

const Home = (props) => {
  const op = useRef(new Animated.Value(0)).current;

  const [loading, setLoading] = useState(false);

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
          onPress={() => props.navigation.navigate("profile", {name: props.initials})}
        >
          <Text style={{ color: "white" }}>{props.initials[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("aboutUs")}>
        <AntDesign name="questioncircle" size={25} color="black" />
        </TouchableOpacity>
      </View>
      { loading ?     <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <ActivityIndicator size="large" />
        </View>
:
        <View style={{width: '100%', height: '100%', alignItems: 'center'}}>
          <View style={styles.wordBox}>
            <Text style={styles.title}>Word of the day</Text>
            <Text style={styles.punText}>{props.word}</Text>
            <Text style={styles.desc}>{props.meaning}</Text>
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
    backgroundColor: '#FFEEEB'

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
