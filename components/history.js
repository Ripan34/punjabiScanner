import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import React, {useEffect, useState} from "react";
import {getData, clear} from './storage';
import { useIsFocused } from "@react-navigation/native";
import MontserratText from "./montserratText";

const History = ({navigation}) => {

    const [historyArr, setHistoryArr] = useState([]);
    const isFocused = useIsFocused();

    const handleClear = () => {
        clear();
        setHistoryArr([]);
    }
  useEffect(() => {
    async function getD(){
        const arr = await getData();
        if(arr)
            setHistoryArr(arr);
    }
    getD();
  }, [isFocused])
    return (
        <SafeAreaView style={{ backgroundColor: '#F6F5FC'}}>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center'}}>
            <MontserratText style={{ fontSize: 30 }} val={"History"} />
            <TouchableOpacity onPress={handleClear}>
            <MontserratText style={{ fontSize: 15 }} val={"clear"} />
            </TouchableOpacity>
            </View>
            <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}>
                {
                    historyArr.map((obj, ind) => {
                        return (
                            <TouchableOpacity style={styles.card} key={ind} onPress={() => navigation.navigate("historyPreview", {text: obj.value})}>
                                <MontserratText style={styles.hisText} val={obj.value.replace(/[\r\n]/gm, '')} />
                                <MontserratText style={styles.date} val={`${new Date(obj.date).toLocaleString('default', { month: 'long' })} ${new Date(obj.date).getDate()}`} />
                        </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 15,
    },
    card: {
        width: '100%',
        height: 70,
        marginBottom: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        justifyContent: 'center',
    },
    date: {
        position: 'absolute',
        top: '20%',
        right: 0,
        fontSize: 13,
        fontWeight: '200'
    },
    hisText: {
        width: '70%',
    }
})
export default History;