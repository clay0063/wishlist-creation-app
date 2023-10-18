import { Camera, CameraType } from 'expo-camera';
import { Text } from 'react-native-paper';
import { StyleSheet, View, ScrollView, Pressable, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRef, useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

const UseCamera = ({ onPhotoTaken }) => {
  const screen = useWindowDimensions();
  const screenWidth = screen.width;
  const screenHeight = screen.height;

  const [type, setType] = useState(CameraType.back);
  let camera = useRef();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(()=>{
    Camera.requestCameraPermissionsAsync()
    .then(permissions => {
      if ( permissions.status === 'granted' ){
        setHasPermission(true);
      } else { setHasPermission(false); }
      
    })
    .then((result)=>{
      //result from getAvailablePictureSizesAsync()
      console.log(result)
    })
    .catch(err=>console.log(err.message))
  }, []);

  function takePhoto(){
    if(!hasPermission){
      console.log('No permission to take photo');
      return;
    }
    const opts = {
      zoom: 0.2, //0-1
      quality: 0.8, //0-1
      imageType: 'jpg', //or 'png'
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
    .catch(err=>console.log(err.message))
  }

  return (
    <ScrollView>
    <View>
      <Text>Camera View</Text>
      { hasPermission ? (
        <>
          <Text>{'Granted'}</Text>
          <Camera type={type} ref={(r)=>{camera = r}}>
            <Pressable onPress={()=>{takePhoto()}}>
              <View style={{backgroundColor:'black', flex:1, alignItems:'center'}}>
                <MaterialIcons name="camera-alt" size={50} color="white"></MaterialIcons>
              </View>
            </Pressable>
          </Camera>
        </>
      ) : (
        <Text>No camera for you.</Text>
      ) }
    </View>
  </ScrollView>
  )
}

export default UseCamera