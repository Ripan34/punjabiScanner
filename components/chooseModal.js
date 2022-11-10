import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { Dimensions } from "react-native";
import CameraPreview from "./cameraPreview";
import { Ionicons } from "@expo/vector-icons";
import f from "./scanner";

const ChooseModal = (props) => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.front);
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  
  useEffect(() => {
    if(!startCamera && capturedImage != null)
      f(capturedImage);
  }, [startCamera])

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
    const photo = await camera.takePictureAsync({base64: true});
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
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
      ) : capturedImage ? (
        <SafeAreaView style={styles.scannedImg}>
          <ImageBackground
            source={{ uri: capturedImage && capturedImage.uri }}
            style={{
              width: 300,
              height: 400,
            }}
          />
              <ActivityIndicator size="large" color="#00ff00"/>
              <Text>Scanning</Text>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.wrapper2}>
          <TouchableOpacity
            onPress={() => {
              __startCamera();
            }}
            style={styles.container}
          >
            <Feather name="camera" size={24} color="black" />
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              pickImage();
            }}
            style={styles.container}
          >
            <FontAwesome name="photo" size={24} color="black" />
            <Text style={styles.text}>Choose from Gallery</Text>
          </TouchableOpacity>
          <View style={styles.cross}>
            <TouchableOpacity onPress={() => props.setModalVisible(false)}>
              <Entypo name="cross" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </Modal>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%%",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper2: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "35%%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
  container: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  cross: {
    position: "absolute",
    top: 0,
    left: 0,
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
    width: 400,
    height: 500,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
});
export default ChooseModal;
