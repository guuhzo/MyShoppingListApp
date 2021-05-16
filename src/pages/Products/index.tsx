import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import Header from '../../components/Header'
import Search from '../../components/Search'

const Products: React.FC = () => {
 
  return (
    <ScrollView 
      contentContainerStyle={ styles.container }
      keyboardShouldPersistTaps='handled'
    >
      <Header title='My Products List' icon='plus'/>
      <Search title='Arroz'/>
      <View style={ styles.containerContent }>
        <Text style={ styles.text }>Products</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: '#000',
    fontSize: 25
  }
});

export default Products;