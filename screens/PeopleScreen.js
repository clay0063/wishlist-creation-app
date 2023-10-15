import { Text } from "react-native-paper";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const PeopleScreen = () => {
  const theme = useTheme();
  return (
    <SafeAreaView>
      <View>
        <Text>People Screen</Text>
      </View>
    </SafeAreaView>
  )
}


export default PeopleScreen