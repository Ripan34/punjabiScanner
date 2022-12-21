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
  import React, { useState, useEffect } from "react";
import MontserratText from "./montserratText";
import {logInWithEmailAndPassword, auth, getWord} from '../service/firebase';
import { MaterialIcons } from "@expo/vector-icons";

  //supreme being??
  const PasswordScreen = ({route, navigation}) => {
    const {email} = route.params;
    const [focus, setFocus] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [word, setWord] = useState(null);
    const [meaning, setMeaning] = useState(null);
    const [initials, setInitials] = useState(null);

    async function getData() {
        try {
          const wordOfD = await getWord();
          setWord(wordOfD["word"]);
          setMeaning(wordOfD["meaning"]);
          const name = await auth.currentUser.displayName;
          setInitials(name);
        } catch (err) {
            
        }
      }

    const handleSubmit = async () => {
        try{
            setError(false);
            setLoading(true);
            await logInWithEmailAndPassword(email, password);
            await getData();
        } catch(err){
            setError(true);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(word != null && meaning != null && initials != null){
            navigation.navigate("tabs", {word: word, meaning: meaning, initials: initials});
        } else return;
      }, [word,meaning, initials])

        return (
            <SafeAreaView style={styles.wrapper}>
            <MontserratText style={styles.title} val={"Login"} />
                <View style={styles.container}>
                    <Text style={{fontSize: 22, marginBottom: 8}}>{email}</Text>
                    <TextInput style={{...styles.input, borderColor: focus? '#3461FD': 'black'}} placeholder="password" 
                     onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} secureTextEntry={true} onChangeText={setPassword}/>
                     <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
                        <Text style={{marginBottom: 10}}>Forgot password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSubmit} style={styles.next}><Text style={{color: 'white'}}>
                    {loading ? <ActivityIndicator size="small" /> : "Submit"}
                    </Text></TouchableOpacity>
                    {error &&             <View style={{ flexDirection: "row", alignContent: "center", marginTop: 10 }}>
              <MaterialIcons
                name="error-outline"
                size={20}
                color="red"
                style={{ marginRight: 5 }}
              />
              <Text style={{ color: "red", marginBottom: 10 }}>
                Wrong email or password
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
  export default PasswordScreen;