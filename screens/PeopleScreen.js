import { useTheme, Button, Text, Divider, IconButton, Badge } from "react-native-paper";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useList } from "../context/ListContext";
import { useEffect } from "react";

const PeopleScreen = ({navigation, route}) => {
  const theme = useTheme();
  const {fullList, updateStorageList} = useList();

  useEffect(()=>{
    console.log(fullList);
    // updateStorageList([])
  }, []);

  //if nothing in array then display Nothing saved yet...
  function NoData() {
    return (
      <View>
        <Text>You have no people saved yet.</Text>
        <Button onPress={() => navigation.navigate("Add Person")}>Add a person?</Button>
      </View>
    )
  }
  
  //if array then loop thru and display
  function ListItem({uid, name, date, ideas}) {
    const dateObject = new Date(date)
    const dateString = dateObject.toLocaleDateString('en-ca', {month:'long', day:'numeric'});
    const number = ideas.length;
    const visible = number > 0;
    return (
      <View style={{padding:30}}>
        <Text>{name}</Text>
        <Text>{dateString}</Text>
        <View>
          <IconButton mode="contained" icon="lightbulb-on-outline" 
            onPress={() => navigation.navigate("Idea List", {uid: uid})}>
            Ideas 
          </IconButton>
          <Badge visible={visible} style={{position: 'absolute', top: -2, right: 15, backgroundColor:theme.colors.primary}}>{number}</Badge>
        </View>
      </View>
    )
  }

  function SortByDate(data){
    if (data.length>=2) {
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        const monthSort = dateA.getMonth() - dateB.getMonth();
        if (monthSort === 0) {
          return dateA.getDate() - dateB.getDate();
        }
        return monthSort
      })
      return sortedData
    } else {
      return data
    }
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <Text variant="titleLarge">People List</Text>
        <Divider style={{width:'100%'}} />
        <FlatList
          data={SortByDate(fullList)}
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
  },
});


export default PeopleScreen