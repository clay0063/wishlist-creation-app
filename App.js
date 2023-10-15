import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import IdeaScreen from "./screens/IdeaScreen";
import AddIdeasScreen from "./screens/AddIdeasScreen";

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
            <Stack.Screen name="People Screen" component={PeopleScreen} />
            <Stack.Screen name="Add Person Screen" component={AddPersonScreen} />
            <Stack.Screen name="Idea Screen" component={IdeaScreen} />
            <Stack.Screen name="Add Ideas Screen" component={AddIdeasScreen} />
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
