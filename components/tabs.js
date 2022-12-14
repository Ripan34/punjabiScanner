import { StyleSheet, Text, View, TouchableOpacity, Animated, Image} from "react-native";
import Home from "./home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import React, {useState, useRef, useEffect} from "react";
import ChooseModal from "./chooseModal";
import History from "./history";
import { SimpleLineIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import hisUnfilled from '../assets/historyUn.png';
import hisFilled from '../assets/histFilled.png';

const Tab = createBottomTabNavigator();

const Scan = (props) => {

  const styles = StyleSheet.create({
    wrapper: {
      top: -30,
      height: 60,
      width: 60,
      borderRadius: "50%",
      backgroundColor: "#6ac6a5",
      justifyContent: "center",
      alignItems: "center",
    },
    choose: {
      position: 'absolute',
      display: 'none',
      top: -20,
      width: 500,
      height: 600,
      backgroundColor: 'blue',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  });
  return (
    <TouchableOpacity onPress={() => {props.setShowChoose(prev => !prev)}}>
      <View style={styles.wrapper}>
        <ChooseModal modalVisible={props.showChoose} setModalVisible={props.setShowChoose} navigation={props.navigation}/>
        <Text style={{ fontSize: "30", color: "#F9FAFD" }}>+</Text>
      </View>
    </TouchableOpacity>
  );
};
const Tabs = ({navigation}) => {
  const [showChoose, setShowChoose] = useState(false);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarStyle: {
        //   position: "absolute",
        //   backgroundColor: "white",
        //   elevation: 0,
        //   right: 20,
        //   left: 20,
        //   height: 80,
        //   bottom: 20,
        //   borderRadius: 25,
        //   justifyContent: "center",
        //   alignItems: "center",
        // },
        showLabel: "false",
        tabBarActiveTintColor: '#674FF6',
      }}
    >
      <Tab.Screen
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({focused}) => {return focused ? <Fontisto name="home" size={24} color="black" /> :<SimpleLineIcons name="home" size={24} color="black" />},
        }}
        name="Home"
        children={() => <Home  showChoose={showChoose} navigation={navigation}/>}
      />
      <Tab.Screen
        name="Post"
        children={() => <Home  showChoose={showChoose} navigation={navigation}/>}
        options={{
          tabBarButton: (props) => <Scan setShowChoose={setShowChoose} showChoose={showChoose} navigation={navigation}/>,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({focused}) => {
            return (
              focused ?
              <Image source={hisFilled} style={{width: 35, height: 35}}/>  :
            <Image source={hisUnfilled} style={{width: 40, height: 40}}/> 
            );
          },
        }}
        name="History"
        component={History}
      />
    </Tab.Navigator>
  );
};
export default Tabs;