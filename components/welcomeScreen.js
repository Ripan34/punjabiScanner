import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import LottieView from 'lottie-react-native';
import MontserratText from "./montserratText";
import b from '../assets/b.jpg';

  const WelcomeScreen = ({navigation}) => {

    return (
        <ImageBackground resizeMode="cover" source={require('../assets/b.jpg')} style={styles.wrapper}>
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.top}>
                <MontserratText style={{...styles.title}} val={"Punjabi Scanner"}/>
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
                <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('login')}>
                    <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.login, backgroundColor: 'black'}} onPress={() => navigation.navigate('signUp')}>
                    <Text style={{color: 'white', fontWeight: '500', fontSize: 16}}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </ImageBackground>
    )
  };
  const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
    },
    top: {
        width: '100%',
        padding: 15
    },
    bottom: {
        width: '100%',
        height: '20%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    login: {
        width: '80%',
        height: 'auto',
        padding: 20,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#6D9886'
    },
    middle: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto'
    },
    back: {
        flex: 1,
        justifyContent: 'center'
    }
  });
  export default WelcomeScreen;