import { Text, Button, TextInput, Portal, Modal, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "react-native-modern-datepicker";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useState, useEffect } from "react";
import { useList } from "../context/ListContext";
import ErrorModal from "../components/ErrorModal";

const AddPersonScreen = ({ navigation, route }) => {
  const {fullList, updateStorageList} = useList();
  const [enabled, setEnabled] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const inputs = name.trim() !== "" && dob.length !== 0
    setEnabled(inputs);
  }, [name, dob]);

  const handleSetErrorMessage = () => {
    setErrorMessage("Test message");
  };

  const clearError = () => {
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

  //TODO: make it so that the Save Button is disabled unless both are filled out
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
        <DatePicker
          options={{
            backgroundColor: theme.colors.secondaryContainer,
            textHeaderColor: theme.colors.onSecondaryContainer,
            textDefaultColor: theme.colors.onSecondaryContainer,
            selectedTextColor: theme.colors.onSecondary,
            mainColor: theme.colors.onSecondaryContainer,
            textSecondaryColor: theme.colors.tertiary,
            borderColor: theme.colors.tertiary
          }}
          onSelectedChange={(date) => setDob(date)}
          mode="calendar"
        />
        <View style={{flexDirection: "row", marginVertical:10}}>
          <Button
            buttonColor={theme.colors.error}
            textColor={theme.colors.onError}
            mode="contained-tonal"
            onPress={() => navigation.navigate("People")}
          >
            Cancel
          </Button>
          <Button 
            style={{paddingHorizontal:25, marginLeft:40}}
            labelStyle={{fontWeight:"bold"}}
            mode="elevated" 
            icon="check-underline"
            disabled={!enabled}
            onPress={() => handleSaveData()}>
            Save
          </Button>
        </View>
          <Button mode="contained" onPress={() => handleSetErrorMessage()} title="Show Error" />
        
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
