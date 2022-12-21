import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Share,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const HistoryView = ({ route, navigation }) => {
  const { text } = route.params;
  const [copiedText, setCopiedText] = useState(false);

  const copyToClipboard = async () => {
    setCopiedText(false);
    await Clipboard.setStringAsync(text);
    setCopiedText(true);
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: text,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
        
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{           backgroundColor: '#FFEEEB'    , height: '100%'}}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20 }}>Preview</Text>
        <TouchableOpacity
          style={{ position: "absolute", top: -3, left: 0, padding: 5 }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ height: '100%', padding: 15}}>
      <TextInput
        style={styles.textInput}
        value={text}
        multiline={true}
        editable={false}
      />
      </View>
      <View style={styles.export}>
              <View style={styles.content}>
              <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center',}} onPress={copyToClipboard}>
                <AntDesign name="copy1" size={26} color="black" />
                <Text style={{marginTop: 5}}>{copiedText ? "Copied!" : "Copy"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={onShare}>
                <Feather name="share" size={26} color="black" />
                <Text style={{marginTop: 5}}>Share</Text>
                </TouchableOpacity>
              </View>
          </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textInput: {
    marginTop: 40,
    padding: 15,
    backgroundColor: "#FFFEFF",
    borderRadius: 15,
    fontSize: 17,
    fontWeight: "100",
    maxHeight: '80%'
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderBottomColor: '#F5694D',
    borderBottomWidth: 0.5,
    paddingBottom: 10
  },
  export: {
    marginTop: 30,
    width: '100%',
    backgroundColor: '#FFFEFF',
    height: '15%',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    alignItems: 'center'
  },
  content: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    width: '40%'
  }
});
export default HistoryView;
