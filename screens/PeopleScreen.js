import { Button, Text, Divider } from "react-native-paper";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const PeopleScreen = ({navigation, route}) => {
  const theme = useTheme();

  //if nothing in array then display Nothing saved yet...
  
  //if array then loop thru and display
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
      <View style={styles.container}>
        <Text variant="titleLarge">People List</Text>
        <Divider style={{width:'100%'}} />
        <Text variant="bodyLarge">No one added yet...</Text>
        <Button mode="contained" onPress={() => navigation.navigate("Idea List")}>
          Ideas
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
});


export default PeopleScreen