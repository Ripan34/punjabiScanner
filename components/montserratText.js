import {
    Text,
  } from "react-native";
  import { useFonts } from 'expo-font';

  const MontserratText = (props) => {
    const [fontsLoaded] = useFonts({
        'monst': require('../assets/pop.ttf'),
      });
      if (!fontsLoaded) {
        return <Text>Loading</Text>;
      } 
    return (
    <Text style={{...props.style, fontFamily: 'monst'}}>
        {props.val}
    </Text>)
  }

  export default MontserratText;