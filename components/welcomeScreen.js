import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from "react-native";
import React, { useState, useEffect } from "react";
import MontserratText from "./montserratText";
import { auth, getWord } from "../service/firebase";
import ek from '../assets/ek.png';
// import { uploadData, } from "../service/firebase";
import fb from '../assets/fb.png';
import {loginWithGoogle} from '../service/firebase';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';


const WelcomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [word, setWord] = useState(null);
  const [meaning, setMeaning] = useState(null);
  const [initials, setInitials] = useState(null);
  const [email, setEmail] = useState(null);
  WebBrowser.maybeCompleteAuthSession();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '937363023681-ef89q3se4utsmaj3rpvaht1ng80g88jf.apps.googleusercontent.com',
    },
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      loginWithGoogle(id_token);
    }
  }, [response]);

  async function getData() {
    try {
      const wordOfD = await getWord();
      setWord(wordOfD["word"]);
      setMeaning(wordOfD["meaning"]);
      const name = await auth.currentUser.displayName;
      const e = await auth.currentUser.email;
      setEmail(e);
      setInitials(name);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (word != null && meaning != null && initials != null && email != null) {
      navigation.navigate("tabs", {
        word: word,
        meaning: meaning,
        initials: initials,
        email: email
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
            <Image source={ek} style={{width: 100, height: 100}} resizeMode="contain"/>
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
            </View>
            <View style={styles.bottom}>
  
              <TouchableOpacity
                style={styles.continue}
                onPress={async () => { promptAsync()}}
              >
                                        <Image
       style={styles.googleIcon}
       source={{
        uri: "https://i.ibb.co/j82DCcR/search.png",
       }}/>
                <MontserratText
               style={{ fontWeight: "500", fontSize: 16 , marginLeft: 16}}
                val={"Continue with Google"}
              />
              </TouchableOpacity>
              <TouchableOpacity
                style={{...styles.continue, backgroundColor: '#4167B2'}}
                onPress={() => {}}
              >
                                        <Image
       style={styles.googleIcon}
       source={fb}/>

                <MontserratText
              style={{ fontWeight: "500", fontSize: 15 , marginLeft: 16, color: 'white'}}
                val={"Continue with Facebook"}
              />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{borderColor: 'black', borderBottomWidth: 0.5, width: 20}}/>
                <Text> or </Text>
                <View style={{borderColor: 'black', borderBottomWidth: 0.5, width: 20}}/>
              </View>
              <TouchableOpacity
                style={styles.login}
                onPress={() => {//uploadData(); 
                  navigation.navigate("login")}}
              >
                <MontserratText
               style={{ color: "white", fontWeight: "500", fontSize: 16 }}
                val={"Login"}
              />
              </TouchableOpacity>
              <TouchableOpacity
                style={{}}
                onPress={() => navigation.navigate("signUp")}
              >
                <MontserratText
                style={{ color: "black", fontWeight: "500", fontSize: 16 }}
                val={" Sign Up with email"}
              />
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
    backgroundColor: '#F6F5FC'
    // backgroundColor: 'rgb(220, 156, 253)',
  },
  title: {
    fontSize: 35,
    padding: 5,
  },
  top: {
    width: "100%",
    alignItems: 'center',
    padding: 15,
  },
  bottom: {
    width: "100%",
    height: "40%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  login: {
    width: "80%",
    height: "auto",
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: '30',
    backgroundColor: "#6AC6A5",
  },
  continue: {
    flexDirection: 'row',
    width: "80%",
    height: "auto",
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: '30',
    backgroundColor: 'white'
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
  googleIcon: {
    height: 24,
    width: 24
   }
});
export default WelcomeScreen;
