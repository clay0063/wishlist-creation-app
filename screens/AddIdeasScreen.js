import { Text, Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useList } from '../context/ListContext';

const AddIdeasScreen = ({navigation, route}) => {
  const id = route.params.uid;
  const [fullList, setFullList] = useList();
  const [text, setText] = useState("");
  console.log(id);
  const handleSaveData = () => {
    if (text.trim() !== '') {
      const data = bundleData();
      setFullList([...fullList, data]);
      //TODO: Make it so that if the save fails, it alerts the user
      setName(""); 
      setDob("");
    } else { 
      console.log('missing name or date')
      //TODO: change this to an alert
    }
  };

  const bundleData = () => {
    const itemName = text.trim();
    const index = fullList.length;
    const random = Math.random().toString(16).substring(2);
    const uid = index + "-" + random;
    const dataBundle = {"name": personName, "date": personDate, "uid": uid, "ideas": []};
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