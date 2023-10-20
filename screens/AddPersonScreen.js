import { Text, Button, TextInput, Portal, Modal, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import { useList } from "../context/ListContext";
import ErrorModal from "../components/ErrorModal";
import bundlePeopleData from "../utils/bundlePeopleData";
import Calendar from "../components/Calendar";
import CancelButton from "../components/CancelButton";
import SaveButton from "../components/SaveButton";

const AddPersonScreen = ({ navigation, route }) => {
  const {fullList, updateStorageList} = useList();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const theme = useTheme();
  
  const showModal = (error) => {
    setErrorMessage(error);
  };

  const clearError = () => {
    setErrorMessage("");
  };

  const handleDateChange = (date) => {
    setDob(date);
  };

  const handleSaveData = async () => {
    if (name.trim() !== "" && dob.length !== 0) {
      const data = bundlePeopleData(name, dob);
      console.log(data);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: "100%" }}
        >
          <Text style={{ color: theme.colors.primary, textAlign: "center" }} variant="titleMedium">Name</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={{ width: "100%" }}
            backgroundColor={theme.colors.secondaryContainer}
          />
        </KeyboardAvoidingView>

        <Text style={{ color: theme.colors.primary }} variant="titleMedium">Birthday</Text>
        <Calendar theme={theme} onDateChange={handleDateChange}/>

        <View style={{flexDirection: "row", marginVertical:10}}>
          <CancelButton onPress={() => navigation.navigate("People")} />
          
          <SaveButton text={name} data={dob} onPress={() => handleSaveData()} />
        </View>

      </View>
      <ErrorModal errorMessage={errorMessage} clearError={clearError} />
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
