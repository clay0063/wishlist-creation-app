import { Text } from "react-native-paper";
import { View, ScrollView, Pressable, useWindowDimensions } from "react-native";
import { useRef, useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const UseCamera = ({ onPhotoTaken }) => {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(false);
  const screen = useWindowDimensions();
  let camera = useRef();
  const ratio = "3:2"
  const screenWidth = screen.width;
  const screenHeight = screen.height;

  useEffect(()=>{
    Camera.requestCameraPermissionsAsync()
    .then(permissions => {
      if ( permissions.status === "granted" ){
        setHasPermission(true);
      } else { setHasPermission(false); }
      
    })
    .then((result)=>{
      // result from getAvailablePictureSizesAsync()
      console.log(result)
    })
    .catch(err=>console.warn(err.message))
  }, []);

  function takePhoto(){
    if(!hasPermission){
      console.warn("No permission to take photo");
      return;
    }

    camera.getAvailablePictureSizesAsync().then((sizes) => {
      console.log({ sizes });
    }).catch((error)=>{console.warn(error)});

    const opts = {
      zoom: 0.2, //0-1
      quality: 0.8, //0-1
      imageType: "jpg", //or "png"
      skipProcessing: false, //if true doesnt correct rotation issues
    }
    //save img info in a state variable when taking photo
    camera.takePictureAsync(opts)
    .then(pic=>{
      if(pic){
        let w = screenWidth * 0.6 //makes it 60%
        let h = (w / pic.width) * pic.height //gets the ratio image size and scales down
        onPhotoTaken({uri: pic.uri, width:w, height: h})
      } else {
        //no pic
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
          <Camera type={type} ref={(r)=>{camera = r}} ratio={ratio} >
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