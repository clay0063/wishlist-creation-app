import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { en, registerTranslation } from 'react-native-paper-dates'
import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import IdeaScreen from "./screens/IdeaScreen";
import AddIdeasScreen from "./screens/AddIdeasScreen";

// registerTranslation('en', en)
// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: 'tomato',
//     secondary: 'yellow',
//   },
// };
// <PaperProvider theme={theme}></PaperProvider>

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="People" component={PeopleScreen}
              options={({ navigation }) => ({
                headerRight: () => (
                  <TouchableOpacity onPress={() => { navigation.navigate("Add Person") }}>
                    <Text>Add Person</Text>
                  </TouchableOpacity>
                )
              })}
            />
            <Stack.Screen name="Add Person" component={AddPersonScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => { navigation.navigate("People") }}>
                    <Text>Back</Text>
                  </TouchableOpacity>
                )
              })}
            />
            <Stack.Screen name="Idea List" component={IdeaScreen} 
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => { navigation.navigate("People") }}>
                    <Text>Back</Text>
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity onPress={() => { navigation.navigate("Add Idea") }}>
                    <Text>Add Idea</Text>
                  </TouchableOpacity>
                )
              })}
            />
            <Stack.Screen name="Add Idea" component={AddIdeasScreen}
              options={({ navigation }) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={() => { navigation.navigate("Idea List") }}>
                    <Text>Back</Text>
                  </TouchableOpacity>
                )
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
