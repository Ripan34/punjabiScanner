import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator
  } from "react-native";
  import React, { useState } from "react";
import MontserratText from "./montserratText";
import {createWithEmailAndPassword} from '../service/firebase';
import { MaterialIcons } from "@expo/vector-icons";

  const SignupPassword = ({route, navigation}) => {
    const {email, name} = route.params;
    const [focus, setFocus] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try{
            setError(false);
            setLoading(true);
            await createWithEmailAndPassword(email, password, name);
            navigation.navigate('tabs');
        } catch(err){
            console.log(err);
            setError(true);
        } finally{
            setLoading(false);
        }
    }
        return (
            <SafeAreaView style={styles.wrapper}>
            <MontserratText style={styles.title} val={"Sign up"} />
                <View style={styles.container}>
                    <Text style={{fontSize: 22, marginBottom: 8}}>Password</Text>
                    <TextInput style={{...styles.input, borderColor: focus? '#3461FD': 'black', marginBottom: 4}} placeholder="password" 
                     onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} secureTextEntry={true} onChangeText={setPassword}/>
                             <Text style={{ marginBottom: 10, fontWeight: "200", fontSize: 12 }}>
          Must be atleast 6 characters
        </Text>
                    <TouchableOpacity onPress={handleSubmit} style={styles.next}><Text style={{color: 'white'}}>  {loading ? <ActivityIndicator size="small" /> : "Create account"}</Text></TouchableOpacity>
                    {error &&             <View style={{ flexDirection: "row", alignContent: "center", marginTop: 10 }}>
              <MaterialIcons
                name="error-outline"
                size={20}
                color="red"
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: "red", marginBottom: 10 }}>
              Invalid input! please try again

              </Text>
            </View>}
                </View>
            </SafeAreaView>
        )
  };
  const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        width: '100%',
        backgroundColor: '#FFEEEB'
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
  export default SignupPassword;