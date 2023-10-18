import { Text, Button, TextInput, Portal, Modal } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "react-native-modern-datepicker";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import { useList } from "../context/ListContext";

const AddPersonScreen = ({ navigation, route }) => {
  const [fullList, updateStorageList] = useList();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setErrorMessage("");
  };

  const handleSaveData = async () => {
    if (name.trim() !== "" && dob.length !== 0) {
      const data = bundleData();
      try {
        await updateStorageList([...fullList, data]);
        navigation.navigate("People");
      } catch (error) {
        setErrorMessage(error.message);
        showModal();
      }
    } else {
      console.log("missing name or date");
    }
  };

  const bundleData = () => {
    const personName = name.trim();
    const dateString = dob.replaceAll("/", "-");
    const personDate = dateMath(dateString);
    const index = fullList.length;
    const random = Math.random().toString(16).substring(2);
    const uid = index + "-" + random;
    const dataBundle = {
      name: personName,
      date: personDate,
      uid: uid,
      ideas: [],
    };
    return dataBundle;
  };

  const dateMath = (date) => {
    const dateObject = new Date(date);
    const offset = dateObject.getTimezoneOffset();
    const hoursOffset = offset / 60;
    dateObject.setHours(dateObject.getHours() + hoursOffset);
    return dateObject;
  };

  const ErrorModal = () => {
    return (
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
        >
          <Text>{errorMessage}</Text>
        </Modal>
      </Portal>
    );
  };

  //TODO: make it so that the Save Button is disabled unless both are filled out
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <Text>Name</Text>
          <TextInput
            // label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={{ width: "100%" }}
          />
        </KeyboardAvoidingView>
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
          onSelectedChange={(date) => setDob(date)}
          mode="calendar"
        />
        <Button mode="outlined" onPress={() => handleSaveData()}>
          Save
        </Button>
        <Button
          buttonColor="red"
          mode="contained"
          onPress={() => navigation.navigate("People")}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            updateStorageList([]);
          }}
        >
          Clear Full List
        </Button>
      </View>
      <ErrorModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
});

export default AddPersonScreen;
