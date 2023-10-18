import { Text, Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useList } from '../context/ListContext';

const AddIdeasScreen = ({navigation, route}) => {
  const [fullList, setFullList] = useList();
  const id = route.params.uid;
  const person = fullList.find(item => item.uid === id);
  const [text, setText] = useState("");

  const handleSaveData = () => {
    const updatedList = [...fullList];
    const index = updatedList.findIndex((person) => person.uid === id);
    const updatedPerson = {...updatedList[index]};
    if (text.trim() !== '') {
      const data = bundleData();
      updatedPerson.ideas = [...updatedPerson.ideas, data];
      updatedList[index] = updatedPerson;
      setFullList(updatedList);
      //TODO: Make it so that if the save fails, it alerts the user
      setText(""); 
    } else { 
      console.log('missing name or date')
      //TODO: change this to an alert
    }
  };

  const bundleData = () => {
    const itemName = text.trim();
    const random = Math.random().toString(16).substring(2);
    const id = random;
    const dataBundle = {"text": itemName, "id": id};
    return dataBundle;
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
      <View style={styles.container}>
        <Text>Item Name</Text>
        <TextInput
          // label="Name"
          value={text}
          onChangeText={text => setText(text)}
          style={{width:"100%"}}
        />
        
        <Button mode="outlined" onPress={() => handleSaveData()}>Save</Button>
        <Button mode="outlined" onPress={() => {
          console.log(fullList)
        }}>Display Data</Button>
        <Button buttonColor="red" mode="contained" onPress={() => navigation.navigate("People")}>Cancel</Button>
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