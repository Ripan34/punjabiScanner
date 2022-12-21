import { StyleSheet, Text, View } from "react-native";
import Tabs from "./components/tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./components/welcomeScreen";
import Login from "./components/login";
import SignUp from "./components/signUp";
import PasswordScreen from "./components/passwordScreen";
import History from "./components/history";
import HistoryView from "./components/historyView";
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect, useState, useCallback, useRef} from "react";
import { Asset } from 'expo-asset';
import Profile from "./components/profile";
import Home from './components/home';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Name from "./components/name";
import SignupPassword from "./components/signUpPassword";
import ChangePassword from "./components/changePassword";
import AboutUs from "./components/aboutUs";
import ForgotPassword from "./components/forgotPassword";

// SplashScreen.preventAutoHideAsync();

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });
// Notifications.scheduleNotificationAsync({
//   content: {
//     title: "Checkout word of the day",
//     body: 'tap to learn!',
//   },
//   trigger: {
//     hour: 9,
//     repeats: true
//   },
// });

const Stack = createNativeStackNavigator();

export default function App() {  
 
  const [appIsReady, setAppIsReady] = useState(false);

  // useEffect(() => {
  //   registerForPushNotificationsAsync()
  // }, [])
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
          // const imageAssets = cacheImages([
          //   require('./assets/b.jpg'),
          //   require('./assets/nBack.jpeg'),
          // ]);
          // await Promise.all([...imageAssets]);

      } catch (e) {
          console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);


  // if (!appIsReady) {
  //   return null;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="welcome" component={WelcomeScreen}/>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="password" component={PasswordScreen} />
        <Stack.Screen name="signUp" component={SignUp} />
        <Stack.Screen
          name="tabs"
          options={{ gestureEnabled: false }}
          component={Tabs}
        />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="history" component={History} />
        <Stack.Screen name="historyPreview" component={HistoryView} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="name" component={Name} />
        <Stack.Screen name="signUpPassword" component={SignupPassword} />
        <Stack.Screen name="changePassword" component={ChangePassword} />
        <Stack.Screen name="aboutUs" component={AboutUs} />
        <Stack.Screen name="forgotPassword" component={ForgotPassword} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here' },
//     },
//     trigger: { seconds: 2 },
//   });
// }

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}