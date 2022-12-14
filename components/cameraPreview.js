import {
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Text,
    SafeAreaView
  } from "react-native";

const CameraPreview = ({photo, retakePicture, closeCam}) => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '80%'
        }}
      >
        <View style={styles.choose}>
            <TouchableOpacity onPress={() => retakePicture()}>
                <Text style={styles.text}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => closeCam(false)}>
                <Text style={styles.text}>Choose</Text>
            </TouchableOpacity>
        </View>
        <ImageBackground
          source={{uri: photo && photo.uri}}
          style={{
            flex: 1
          }}
        />
      </View>
    )
  }
  const styles = StyleSheet.create({
    choose: {
        position: 'absolute',
        bottom: 50,
        zIndex: 99,
        padding: 20,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 20,
        color: 'white'
    }
  })
  export default CameraPreview;