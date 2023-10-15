import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native'
import React from 'react'

const IdeaScreen = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
      <View style={styles.container}>
        <Text>IdeaScreen</Text>
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