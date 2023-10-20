import { Text, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import { useState } from 'react'
import { useList } from '../context/ListContext';
import UseCamera from "../components/UseCamera";
import CancelButton from '../components/CancelButton';
import SaveButton from "../components/SaveButton";
import bundleIdeaData from "../utils/bundleIdeaData"


const AddIdeasScreen = ({navigation, route}) => {
  const {fullList, addItemByID} = useList();
  const id = route.params.uid;
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSaveData = async () => {
    if (text.trim() !== '' && image) {
      const data = bundleIdeaData(text, image);
      try {
        await addItemByID(id, data);
        navigation.navigate("Idea List", {uid: id})
      } catch (error) {
        console.log(error)
      }
    } else { 
      console.log('missing name or date')
      //TODO: change this to an alert
    }
  };

  const handlePhotoTaken = (img) => {
    setImage(img);
  }

  return (
    <SafeAreaView style={{flex:1}}>

      <View style={styles.container}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, width: "100%" }} >
          <Text>Item Name</Text>
          <TextInput
            value={text}
            onChangeText={text => setText(text)}
            style={{width:"100%"}}
          />
        </KeyboardAvoidingView>
        
        <UseCamera onPhotoTaken={handlePhotoTaken} />

        <View>
          <Text>Image View</Text>
          {image ? (
            <Image source={{uri:image.uri}} width={image.width} height={image.height}></Image>
          ) : (
            <Text>No image currently</Text>
          )}
        </View>

        <View style={{flexDirection: "row", marginVertical:10}}>
          <CancelButton onPress={() => navigation.navigate("Idea List", {uid: id})} />
          <SaveButton text={text} data={image} onPress={() => handleSaveData()} />
        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
});

export default AddIdeasScreen