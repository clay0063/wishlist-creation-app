import { Text, Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import DatePicker from 'react-native-modern-datepicker';
import { View, StyleSheet } from 'react-native'
import { useState } from 'react'
import { useList } from '../context/ListContext';

const AddPersonScreen = ({navigation, route}) => {
  const [fullList, setFullList] = useList();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const handleSaveData = () => {
    if (name.trim() !== '' && dob.length !== 0) {
      const personName = name.trim();
      const personDate = dob.replaceAll("/", "-");
      const dataBundle = {"name": personName, "date": personDate};
      setFullList([...fullList, dataBundle]);
      //TODO: Make it so that if the save fails, it alerts the user
      setName(""); 
      setDob("");
    } else { 
      console.log('missing name or date')
      //TODO: change this to an alert
    }
  };

  //TODO: make it so that the Save Button is disabled unless both are filled out
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
      <View style={styles.container}>
        <Text>Name</Text>
        <TextInput
          // label="Name"
          value={name}
          onChangeText={text => setName(text)}
          style={{width:"100%"}}
        />
        <Text>Birthday</Text>
        <DatePicker
          // options={{
          //   backgroundColor: '#090C08',
          //   textHeaderColor: '#FFA25B',
          //   textDefaultColor: '#F6E7C1',
          //   selectedTextColor: '#fff',
          //   mainColor: '#F4722B',
          //   textSecondaryColor: '#D6C7A1',
          //   borderColor: 'rgba(122, 146, 165, 0.1)'
          // }}
          onSelectedChange={date => setDob(date)}
          mode="calendar"
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

export default AddPersonScreen