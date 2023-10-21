import { Text } from "react-native-paper";
import { View, ScrollView, Pressable, useWindowDimensions } from "react-native";
import { useRef, useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const UseCamera = ({ onPhotoTaken }) => {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(false);
  const screen = useWindowDimensions();
  const [availableSizes, setAvailableSizes] = useState([]);
  const cameraRef = useRef();
  const ratio = "3:2"
  const screenWidth = screen.width;
  
  useEffect(()=>{
    Camera.requestCameraPermissionsAsync()
    .then(permissions => {
      if ( permissions.status === "granted" ){
        setHasPermission(true);
      } else { setHasPermission(false); }
    })
    .catch(err=>console.warn(err.message))
  }, []);

  const setupCamera = async () => {
    if (hasPermission) {
      const sizes = await cameraRef.current.getAvailablePictureSizesAsync(ratio);
      setAvailableSizes(sizes)
    } else {
      console.log('Camera permission not granted');
    }
  }
  
  function takePhoto(){
    if(!hasPermission){
      console.warn("No permission to take photo");
      return;
    }

    const opts = {
      zoom: 0.2,
      quality: 0.8, 
      pictureSize: availableSizes ? availableSizes[0] : "720x480",
      imageType: "jpg", 
      skipProcessing: false, 
    }
    
    cameraRef.current.takePictureAsync(opts)
    .then(pic=>{
      if(pic){
        let w = screenWidth * 0.6
        let h = (w / pic.width) * pic.height
        onPhotoTaken({uri: pic.uri, width:w, height: h})
      } else {
        return null;
      }

    })
    .catch(err=>console.warn(err.message))
  }

  return (
    <ScrollView>
    <View>
      { hasPermission ? (
        <>
        <Text style={{marginBottom:5}}>Press the camera icon to take a picture.</Text>
          <Camera type={type} ref={ref => cameraRef.current = ref} ratio={ratio} onCameraReady={setupCamera} >
            <Pressable onPress={()=>{takePhoto()}}>
              <View style={{backgroundColor:"black", flex:1, alignItems:"center"}}>
                <MaterialIcons name="camera-alt" size={50} color="white"></MaterialIcons>
              </View>
            </Pressable>
          </Camera>
        </>
      ) : (
        <Text>Please check your camera permissions.</Text>
      ) }
    </View>
  </ScrollView>
  )
}

export default UseCamera;