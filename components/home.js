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
import MontserratText from "./montserratText";
import { Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

const Home = (props) => {
  const op = useRef(new Animated.Value(0)).current;

  const [loading, setLoading] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const copyToClipboard = async () => {
    setCopiedText(false);
    await Clipboard.setStringAsync(props.word + '\n' + props.meaning);
    setCopiedText(true);
  };

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
          onPress={() => props.navigation.navigate("profile", {name: props.initials, email: props.email})}
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
          <MontserratText style={styles.title} val={"Word of the day"} />
          <MontserratText style={styles.punText} val={props.word} />
          <MontserratText style={styles.desc} val={props.meaning} />
          <TouchableOpacity onPress={copyToClipboard} style={styles.copy}>
          <AntDesign name="copy1" size={20} color="black"/>
          <Text style={{fontSize: 15}}>{copiedText ? "copied!" : "copy"}</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.contentBox}>
            <MontserratText style={{fontSize: 22, marginTop: 20}} val={"Extract punjabi text from images"} />
            <LottieView
              autoPlay
              style={{
                width: 170,
                height: 170,
              }}
              source={require("../assets/scanLot.json")}
            />
           <View style={{flexDirection: 'row', width: '90%', justifyContent: 'space-around', marginTop: 30, opacity: 0.5}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <AntDesign name="printer" size={35} color="black" />
              <MontserratText style={{fontSize: 15, opacity: 0.5}} val={"Print"} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Feather name="share" size={35} color="black" />
            <MontserratText style={{fontSize: 15, opacity: 0.5}} val={"Share"} />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <AntDesign name="copy1" size={35} color="black" />
            <MontserratText style={{fontSize: 15, opacity: 0.5}} val={"Copy"} />
            </View>

           </View>

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
    backgroundColor: '#F6F5FC'
  },
  wordBox: {
    marginTop: 30,
    width: "90%",
    height: 200,
    backgroundColor: "#FFFEFF",
    borderRadius: 15,
    padding: 10,
    // shadowColor: "#171717",
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation: 20,
    borderWidth: 0.4,
    borderColor: '#3461FD'
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
    padding: 8,
    alignItems: "center",
    // shadowColor: "#171717",
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation: 20,
    alignItems: 'center',
    borderWidth: 0.4,
    borderColor: '#3461FD'
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
  copy: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }
});
export default Home;
