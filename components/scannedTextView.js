import {
    StyleSheet,
    Text,
    TextInput,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Share
  } from "react-native";
  import { Ionicons } from '@expo/vector-icons';
  import { Feather } from '@expo/vector-icons';
  import { AntDesign } from '@expo/vector-icons';
import React, {useEffect, useState} from "react";
import * as Clipboard from 'expo-clipboard';
import LottieView from 'lottie-react-native';
import {storeData, getData} from './storage';
import * as Print from 'expo-print';

  const ScannedTextView = (props) => {
    const {image, capturedImage, punjabi, setModalVisible, pdf} = props;
    const [copiedText, setCopiedText] = useState(false);

    const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h3 style="font-size: 30px; font-family: Helvetica Neue; font-weight: normal; margin-top: 100px;">
     ${punjabi}
    </h3>
  </body>
</html>
`;
    const printToFile = async () => {
      try{
        await Print.printAsync({
          html,
        })
      } catch(err){

      }

    };
  
    useEffect(() => {
        if(punjabi && punjabi.length > 0)
            storeData(punjabi);
    }, [punjabi])
    
    const copyToClipboard = async () => {
      setCopiedText(false);
      await Clipboard.setStringAsync(punjabi);
      setCopiedText(true);
    };
    const onShare = async () => {
      try {
        const result = await Share.share({
          message: punjabi,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };
    return (
        <SafeAreaView style={{backgroundColor: '#F6F5FC'}}>
          <View style={styles.header}>
            <Text style={{fontSize: 20}}>Extracted Text</Text>
            <TouchableOpacity style={{position: 'absolute', top: -3, left: 0, padding: 5}} onPress={() => setModalVisible(false)}><Ionicons name="chevron-back" size={24} color="black" /></TouchableOpacity>
          </View>
          <SafeAreaView
            style={styles.wrapper}
          >
            {/* <Image
              source={{
                uri: image ? image.uri : capturedImage.uri,
              }}
              resizeMode="contain"
              style={{
                width: 200,
                height: 300,
                marginTop: 20
              }}
            /> */}
            <View style={{width: '100%', padding: 15, justifyContent: 'center', alignItems: 'center'}}>
            {!punjabi ?
              <LottieView
        autoPlay
        loop={true}
        style={{
          width: '100%',
          height: 100,
          backgroundColor: '#f5f5f5',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/loading.json')}
      /> 
   : <TextInput
              value={punjabi}
              multiline={true}
              editable={false}
              selectTextOnFocus={false}
              style={styles.textInput}
            />}
            </View>
            <View style={styles.export}>
              <View style={styles.content}>
                <TouchableOpacity onPress={printToFile}>
                <AntDesign name="printer" size={26} color="black" />
                <Text style={{marginTop: 5}}>Print</Text>
                </TouchableOpacity>
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

        </SafeAreaView>
    )
  };
  const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        height: "100%",
        backgroundColor: 'white',
        padding: 20,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    textInput: {
      marginTop: 20,
      padding: 15,
      backgroundColor: '#FFFEFF',
      borderRadius: 15,
      fontSize: 17,
      fontWeight: '100'
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      borderBottomColor: '#F5694D',
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
      width: '60%'
    }
  });
  export default ScannedTextView;