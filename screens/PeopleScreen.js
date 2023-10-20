import { Button, Text } from "react-native-paper";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useList } from "../context/ListContext";
import { useEffect } from "react";
import ListItem from "../components/ListItem";
import sortByDate from "../utils/sortByDate";

const PeopleScreen = ({navigation, route}) => {
  const {fullList, updateStorageList} = useList();

  useEffect(()=>{
    console.log(fullList);
    // updateStorageList([])
  }, []);

  function NoData() {
    return (
      <View style={{flex:1, padding:10}}>
        <Text variant="titleMedium" style={{textAlign:"center", marginBottom:10}}>You have no people saved yet.</Text>
        <Button mode="elevated" style={{ alignSelf: 'center' }} 
        onPress={() => navigation.navigate("Add Person") }>
          Add a person?
        </Button>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <FlatList
          data={sortByDate(fullList)}
          renderItem={ ({item}) => (
            <ListItem 
              uid={item.uid}
              name={item.name}
              date={item.date}
              ideas={item.ideas}
            />
          )}
          keyExtractor={(person)=> person.uid}
          ListEmptyComponent={<NoData />}
          style={{width:"90%"}}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  }
});


export default PeopleScreen