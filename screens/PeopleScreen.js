import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const PeopleScreen = ({navigation, route}) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
      <View style={styles.container}>
        <Text>People Screen</Text>
        <Button mode="contained" onPress={() => navigation.navigate("Idea List")}>
          Ideas
        </Button>
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


export default PeopleScreen