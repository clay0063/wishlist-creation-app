import { Button, Text, Surface, Divider, useTheme } from "react-native-paper";
import { View, FlatList, Image, StyleSheet } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useList } from "../context/ListContext";
import ErrorModal from "../components/ErrorModal";

const IdeaScreen = ({route, navigation}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { getItemsByID, deleteItem, getPersonName } = useList();
  const name = getPersonName(route.params.uid);
  const items = getItemsByID(route.params.uid);
  const theme = useTheme();

  const showModal = (error) => {
    setErrorMessage(error);
  };

  const clearError = () => {
    setErrorMessage("");
  };

  async function deleteIdea(itemID) {
    try {
      await deleteItem(route.params.uid, itemID);
    } catch (error) {
      showModal(error.message);
    }
    
  }

  function NoData() {
    return (
      <View style={{flex:1, padding:10}}>
        <Text variant="titleMedium" style={{textAlign:"center", marginBottom:10}}>No ideas saved yet.</Text>
        <Button mode="elevated" style={{ alignSelf: 'center' }} 
        onPress={() => navigation.navigate("Add Idea", {uid: route.params.uid}) }>
          Add an idea?
        </Button>
      </View>
    )
  }
  
  function ListItem(params) {
    const aspectRatio = 2 / 3;
    let w = params.width;
    let h = params.height;
    if(w > 100) {
      w = 100;
      h = w / aspectRatio;
    }
    return(
      <Surface elevation={1} style={styles.surface}>
        <View style={{flexDirection:"row", padding:10}}>
          <Image source={{uri:params.img}} width={w} height={h} />
          <View style={{flex:1, marginLeft:20, justifyContent:"space-between"}}>
            <Text variant="titleLarge">{params.text}</Text>
            <Button
              mode="contained" icon="trash-can-outline" buttonColor={theme.colors.error}
              onPress={() => deleteIdea(params.id)} > 
              Delete
            </Button>
          </View>
        </View>
      </Surface>
    )
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <Text variant="headlineSmall">Ideas for {name}</Text>
        <Divider style={{width:'100%', margin:2}} />
        <FlatList
          data={items}
          renderItem={ ({item}) => (
            <ListItem
              id={item.id}
              text={item.text}
              img={item.uri}
              width={item.width}
              height={item.height}
            />
          )}
          keyExtractor={(item)=>item.id}
          ListEmptyComponent={<NoData/>}
          style={{width:"90%"}}
        />
      </View>
      <ErrorModal errorMessage={errorMessage} clearError={clearError} />
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
  }
});

export default IdeaScreen