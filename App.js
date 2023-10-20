import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ListProvider, useList } from './context/ListContext.js';
import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import IdeaScreen from "./screens/IdeaScreen";
import AddIdeasScreen from "./screens/AddIdeasScreen";
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    // I can't get the proper way to work, trying it a few ways... keep getting:
    // Error: Rendered more hooks than during the previous render.
    // So using this as a placeholder that's working for now. thanks :) 
    setTimeout(() => {
      SplashScreen.hideAsync()
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <ListProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="People" component={PeopleScreen}
                options={({ navigation }) => ({
                  headerRight: () => (
                    <TouchableOpacity onPress={() => { navigation.navigate("Add Person") }}>
                      <Text>Add Person</Text>
                    </TouchableOpacity>
                  )
                })}/>
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
                options={({ route, navigation }) => ({
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.navigate("People") }}>
                      <Text>Back</Text>
                    </TouchableOpacity>
                  ),
                  headerRight: () => (
                    <TouchableOpacity onPress={() => { navigation.navigate("Add Idea", { uid: route.params.uid }) }}>
                      <Text>Add Idea</Text>
                    </TouchableOpacity>
                  )
                })}
              />
              <Stack.Screen name="Add Idea" component={AddIdeasScreen}
                options={({ route, navigation }) => ({
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => { navigation.navigate("Idea List", {uid: route.params.uid}) }}>
                      <Text>Back</Text>
                    </TouchableOpacity>
                  )
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ListProvider>
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
