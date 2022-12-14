import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { Dimensions } from "react-native";
import CameraPreview from "./cameraPreview";
import { Ionicons } from "@expo/vector-icons";
import { readText } from "../service/firebase";
import ScannedTextView from "./scannedTextView";

const ChooseModal = (props) => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [punjabi, setPunjabi] = useState(null);

  useEffect(() => {
    async function getText() {
      try {
        const fImg = image != null ? image.base64 : capturedImage.base64;
        const res = await readText(fImg);
        setPunjabi(res);
      } catch (err) {
        console.log("err");
      }
    }
    if (!startCamera && (capturedImage != null || image != null)) getText();
  }, [startCamera, image]);

  useEffect(() => {
      if(!props.modalVisible){
        setStartCamera(false);
        setPreviewVisible(false);
        setCapturedImage(null);
        setImage(null);
        setPunjabi("");
      }
  }, [props.modalVisible])
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };
  let camera;
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      // start the camera
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({ base64: true });
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <Modal
      style={styles.wrapper}
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
    >
      {startCamera ? (
        previewVisible && capturedImage ? (
          <CameraPreview
            photo={capturedImage}
            retakePicture={__retakePicture}
            closeCam={setStartCamera}
          />
        ) : (
          <Camera
            style={styles.cam}
            ref={(r) => {
              camera = r;
            }}
            type={type}
          >
            <SafeAreaView style={styles.camStuff}>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 20,
                }}
              >
                <TouchableOpacity
                  style={styles.crosCam}
                  onPress={() => {
                    setStartCamera(false);
                    setCapturedImage(null);
                  }}
                >
                  <Entypo name="cross" size={22} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleCameraType}>
                  <Ionicons
                    name="camera-reverse-outline"
                    size={34}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.bottomTakePic}>
                <TouchableOpacity style={styles.but} onPress={__takePicture} />
              </View>
            </SafeAreaView>
          </Camera>
        )
      ) : capturedImage || image ? (
          <ScannedTextView image={image} capturedImage={capturedImage} punjabi={punjabi} setModalVisible={props.setModalVisible}/>
      ) : (
        <SafeAreaView style={styles.wrapper2}>
          <View
            style={styles.crossSection}
          >
            <Text style={{fontSize: 25, fontWeight: '500'}}>Scan</Text>
            <TouchableOpacity  onPress={() => props.setModalVisible(false)}>
              <Entypo name="cross" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              __startCamera();
            }}
            style={styles.container}
          >
            <View style={styles.circle}>
            <Feather name="camera" size={24} color="black" />
              </View>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              pickImage();
            }}
            style={styles.container}
          >
            <View style={styles.circle}>
            <FontAwesome name="photo" size={24} color="black" />
            </View>
            <Text style={styles.text}>Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              pickImage();
            }}
            style={styles.container}
          >
            <View style={styles.circle}>
            <Ionicons name="document-outline" size={28} color="black" />
            </View>
            <Text style={styles.text}>Document upload</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </Modal>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper2: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "40%",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    marginTop: 10
  },
  crossSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    width: "100%",
  },
  camContainer: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  camStuff: {
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
  },
  but: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    backgroundColor: "white",
  },
  cam: {
    width: "100%",
    height: "100%",
  },
  crosCam: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTakePic: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  scannedImg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 999,
    backgroundColor: "#FFEEEB",
  },
  openButton: {
    backgroundColor: "#F5694D",
    padding: 10,
    borderRadius: 8,
  },
  circle: {
    padding: 8,
    height: 60,
    width: 60,
    borderRadius: '50%',
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  }
});
export default ChooseModal;
