import { Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Platform,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useList } from "../context/ListContext";
import ErrorModal from "../components/ErrorModal";
import bundlePeopleData from "../utils/bundlePeopleData";
import Calendar from "../components/Calendar";
import CancelButton from "../components/CancelButton";
import SaveButton from "../components/SaveButton";

const AddPersonScreen = ({ navigation, route }) => {
  const { fullList, updateStorageList } = useList();
  const theme = useTheme();

  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

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
        showModal(error.message);
      }
    } else {
      showModal("You must include both a name and birthday.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, width: "100%", justifyContent: "space-around" }}
          >
            <View>
              <Text
                style={{ color: theme.colors.primary, textAlign: "center" }}
                variant="titleMedium"
              >
                Name
              </Text>
              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
                style={{ width: "100%" }}
                backgroundColor={theme.colors.secondaryContainer}
              />
            </View>

            <View>
              <Text
                style={{ color: theme.colors.primary, textAlign: "center" }}
                variant="titleMedium"
              >
                Birthday
              </Text>
              <Calendar theme={theme} onDateChange={handleDateChange} />
            </View>
          </KeyboardAvoidingView>

          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <CancelButton onPress={() => navigation.navigate("People")} />

            <SaveButton
              text={name}
              data={dob}
              onPress={() => handleSaveData()}
            />
          </View>
        </View>
      </ScrollView>
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
  avoidanceContainer: {},
});

export default AddPersonScreen;
