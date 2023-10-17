import { View, Text, FlatList } from 'react-native'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useList } from "../context/ListContext";
import React from 'react'

const IdeaScreen = ({route, navigation}) => {
  const [fullList, updateStorageList] = useList();
  const id = route.params.uid;
  const person = fullList.find(item => item.uid === id)
  const items = person.ideas;

  function NoData() {
    return (
      <View>
        <Text>No items saved yet</Text>
      </View>
    )
  }
  
  function ListItem(params) {
    return(
      <View style={[{padding:30}]}>
        <Text>{params.text}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
      <View style={styles.container}>
        <Text>Item list for {person.name}</Text>
        <FlatList
          data={items}
          renderItem={ ({item}) => (
            <ListItem
              id={item.id}
              text={item.text}
              img={item.img}
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