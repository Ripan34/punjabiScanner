import { StyleSheet, Text, View, TouchableOpacity, Animated,} from "react-native";
import Home from "./home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import React, {useState, useRef, useEffect} from "react";
import ChooseModal from "./chooseModal";

const Tab = createBottomTabNavigator();

const Scan = (props) => {
  const [showChoose, setShowChoose] = useState(false);

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
    <TouchableOpacity onPress={() => {setShowChoose(prev => !prev)}}>
      <View style={styles.wrapper}>
        <ChooseModal modalVisible={showChoose} setModalVisible={setShowChoose}/>
        <Text style={{ fontSize: "30", color: "#F9FAFD" }}>+</Text>
      </View>
    </TouchableOpacity>
  );
};
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#F9FAFD",
          elevation: 0,
          right: 20,
          left: 20,
          height: 80,
          bottom: 20,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        },
        showLabel: "false",
      }}
    >
      <Tab.Screen
        options={{
          tabBarShowLabel: true,
          tabBarIcon: () => <AntDesign name="home" size={25} color="black" />,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="Post"
        component={Home}
        options={{
          tabBarButton: (props) => <Scan/>,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        options={{
          tabBarShowLabel: true,
          tabBarIcon: () => (
            <MaterialIcons name="history" size={25} color="black" />
          ),
        }}
        name="History"
        component={Home}
      />
    </Tab.Navigator>
  );
};
export default Tabs;