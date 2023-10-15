import { Text, Button, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StyleSheet } from 'react-native'
// import { DatePickerInput } from 'react-native-paper-dates';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react'

const AddPersonScreen = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(new Date());

  const onChange = (ev, selectedDate) => {
    const currentDate = selectedDate;
    setDob(currentDate)
  };

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
            <DateTimePicker
              testID="dateTimePicker"
              value={dob}
              mode={"date"}
              onChange={onChange}
              minimumDate={new Date(1900, 0, 1)}
              maximumDate={new Date(2025, 0, 1)}
              accentColor="purple"
              // backgroundColor="blue"
            />
        <Button mode="outlined" onPress={() => console.log(name, dob)}>Save</Button>
        <Button buttonColor="red" mode="contained" onPress={() => console.log('Pressed')}>Cancel</Button>
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