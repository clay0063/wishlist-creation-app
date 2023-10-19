import { Button, Text, Divider, IconButton } from "react-native-paper";
import { View, FlatList, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useList } from "../context/ListContext";
import React, { useEffect } from 'react'

const IdeaScreen = ({route, navigation}) => {
  const { getItemsByID } = useList();
  const items = getItemsByID(route.params.uid);

  function NoData() {
    return (
      <View>
        <Text>No ideas saved yet.</Text>
        <Button onPress={() => navigation.navigate("Add Idea", {uid: route.params.uid}) }>Add an idea?</Button>
      </View>
    )
  }
  
  function ListItem(params) {
    const w = params.width / 2
    const h = params.height / 2
    console.log(params.img)
    return(
      <View style={[{padding:30}]}>
        <Text>{params.text}</Text>
        <Text>{params.height} :  {params.width}</Text>
        <Image source={{uri:params.img}} width={w} height={h}></Image>
        <IconButton
          mode="contained" icon="trash-can-outline"
          onPress={() => console.log(params.id)}
        />
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
      <View style={styles.container}>
        <Text>Item list</Text>
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

export default IdeaScreen