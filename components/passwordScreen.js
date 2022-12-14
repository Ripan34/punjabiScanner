import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ImageBackground
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import b from '../assets/nBack.jpeg';
import MontserratText from "./montserratText";
import {logInWithEmailAndPassword} from '../service/firebase';

  //supreme being??
  const PasswordScreen = ({route, navigation}) => {
    const {email} = route.params;
    const [focus, setFocus] = useState(false);
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try{
            //await logInWithEmailAndPassword(email, password);
            navigation.navigate('tabs');
        } catch(err){
            console.log(err);
        }
    }
        return (
            <ImageBackground resizeMode="cover" source={b} style={styles.wrapper}>
            <SafeAreaView style={styles.wrapper}>
            <MontserratText style={styles.title} val={"Login"} />
                <View style={styles.container}>
                    <Text style={{fontSize: 22, marginBottom: 8}}>{email}</Text>
                    <TextInput style={{...styles.input, borderColor: focus? '#3461FD': 'black'}} placeholder="password" 
                     onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} secureTextEntry={true} onChangeText={setPassword}/>
                     <Text style={{marginBottom: 10}}>Forgot password?</Text>
                    <TouchableOpacity onPress={handleSubmit} style={styles.next}><Text style={{color: 'white'}}>Submit</Text></TouchableOpacity>
                </View>
            </SafeAreaView>
            </ImageBackground>
        )
  };
  const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        width: '100%',
    },
    title: {
        marginTop: 20,
        marginLeft: 18,
        fontSize: 30
    },
    container: {
        padding: 18
    },
    input: {
        padding: 15,
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 15,
        backgroundColor: 'white',
        marginBottom: 10
    },
    next: {
        padding: 15,
        width: '100%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3461FD',
    }
  })
  export default PasswordScreen;