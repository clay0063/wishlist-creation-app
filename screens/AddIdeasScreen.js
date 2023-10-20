import { Text, TextInput, useTheme } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import { useState } from 'react'
import { useList } from '../context/ListContext';
import UseCamera from "../components/UseCamera";
import CancelButton from '../components/CancelButton';
import SaveButton from "../components/SaveButton";
import bundleIdeaData from "../utils/bundleIdeaData"

const AddIdeasScreen = ({navigation, route}) => {
  const {addItemByID} = useList();
  const id = route.params.uid;
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const theme = useTheme();

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
          <Text style={{ color: theme.colors.primary, textAlign: "center" }} variant="titleMedium">Enter your Idea</Text>
          <TextInput
            placeholder="Idea"
            value={text}
            onChangeText={text => setText(text)}
            style={{width:"100%"}}
            backgroundColor={theme.colors.secondaryContainer}
          />
        </KeyboardAvoidingView>
        
        <Text style={{ color: theme.colors.primary }} variant="titleMedium">Take a Picture</Text>
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