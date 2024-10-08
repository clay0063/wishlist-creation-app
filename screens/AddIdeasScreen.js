import { Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions
} from "react-native";
import { useState } from "react";
import { useList } from "../context/ListContext";
import ErrorModal from "../components/ErrorModal";
import UseCamera from "../components/UseCamera";
import CancelButton from "../components/CancelButton";
import SaveButton from "../components/SaveButton";
import bundleIdeaData from "../utils/bundleIdeaData";

const AddIdeasScreen = ({ navigation, route }) => {
  const { addItemByID } = useList();
  const theme = useTheme();

  const [errorMessage, setErrorMessage] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const id = route.params.uid;
  const screenWidth = Dimensions.get('window').width;

  const showModal = (error) => {
    setErrorMessage(error);
  };

  const clearError = () => {
    setErrorMessage("");
  };

  const handleSaveData = async () => {
    if (text.trim() !== "" && image) {
      const data = bundleIdeaData(text, image);
      try {
        await addItemByID(id, data);
        navigation.navigate("Idea List", { uid: id });
      } catch (error) {
        showModal(error.message);
      }
    } else {
      showModal("You must have both an idea name and picture.");
    }
  };

  const handlePhotoTaken = (img) => {
    setImage(img);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ width: screenWidth, alignItems: "center" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, width: "100%", justifyContent: "space-around" }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{ color: theme.colors.primary, textAlign: "center" }}
              variant="titleMedium"
            >
              Enter your Idea
            </Text>
            <TextInput
              placeholder="Idea"
              value={text}
              onChangeText={(text) => setText(text)}
              style={{ width: "100%" }}
              backgroundColor={theme.colors.secondaryContainer}
            />
          </View>
        </KeyboardAvoidingView>

        <View style={{ flex: 1 }}>
          <Text
            style={{ color: theme.colors.primary, textAlign: "center" }}
            variant="titleMedium"
          >
            Take a Picture
          </Text>
          <UseCamera onPhotoTaken={handlePhotoTaken} />
        </View>

        <View style={{ margin: 10 }}>
          {image ? (
            <Image
              source={{ uri: image.uri }}
              width={image.width}
              height={image.height}
            ></Image>
          ) : null}
        </View>
        </ScrollView>

        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <CancelButton
            onPress={() => navigation.navigate("Idea List", { uid: id })}
          />
          <SaveButton
            text={text}
            data={image}
            onPress={() => handleSaveData()}
          />
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
    justifyContent: "space-between",
    padding: 4,
  },
});

export default AddIdeasScreen;
