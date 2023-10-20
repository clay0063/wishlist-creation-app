import { useTheme, Button, Text, IconButton, Badge, Surface } from "react-native-paper";
import { FlatList, View, Pressable } from "react-native";
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
      <View style={{flex:1, padding:10}}>
        <Text variant="titleMedium" style={{textAlign:"center", marginBottom:10}}>You have no people saved yet.</Text>
        <Button mode="elevated" style={{ alignSelf: 'center' }} 
        onPress={() => navigation.navigate("Add Person") }>
          Add a person?
        </Button>
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
      <Pressable onPress={() => navigation.navigate("Idea List", {uid: uid})}>
        <Surface elevation={1} style={styles.surface}>
          <View style={styles.innerSurface}>
            <View>
              <Text>{name}</Text>
              <Text>{dateString}</Text>
            </View>
            
            <View>
              <IconButton mode="contained" icon="lightbulb-on-outline" 
                onPress={() => navigation.navigate("Idea List", {uid: uid})}>
                Ideas 
              </IconButton>
              <Badge visible={visible} style={{position: 'absolute', top: 0, right: 0, backgroundColor:theme.colors.primary}}>{number}</Badge>
            </View>
          </View>
        </Surface>
      </Pressable>
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
  },
  surface: {
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#fff"
  },
  innerSurface: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: 10, 
    width: "100%" 
  }
});


export default PeopleScreen