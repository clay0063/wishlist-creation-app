import { Button, Text, Divider } from "react-native-paper";
import { FlatList, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useList } from "../context/ListContext";
import { useEffect } from "react";

const PeopleScreen = ({navigation, route}) => {
  const theme = useTheme();
  const [fullList, updateStorageList] = useList();

  useEffect(()=>{
    console.log(fullList)
  }, []);

  //if nothing in array then display Nothing saved yet...
  function NoData() {
    return (
      <View>
        <Text>No one saved yet</Text>
      </View>
    )
  }
  
  //if array then loop thru and display
  function ListItem({uid, name, date}) {
    return (
      <View style={{padding:30}}>
        <Text>{uid}</Text>
        <Text>{name}</Text>
        <Text>{date}</Text>
        <Button mode="contained" onPress={() => navigation.navigate("Idea List", {uid: uid})}>
          Ideas
        </Button>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
      <View style={styles.container}>
        <Text variant="titleLarge">People List</Text>
        <Divider style={{width:'100%'}} />
        <FlatList
          data={fullList}
          renderItem={ ({item}) => (
            <ListItem 
              uid={item.uid}
              name={item.name}
              date={item.date}
            />
          )}
          keyExtractor={(person)=> person.uid}
          ListEmptyComponent={<NoData />}
        />
        <Button mode="contained" onPress={() => {updateStorageList([])}}>
          Clear Full List
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