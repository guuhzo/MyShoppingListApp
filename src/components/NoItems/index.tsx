import React from 'react'
import { useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const NoItems: React.FC = () => {
  useEffect(() => {
    console.log('montei')
  })
  
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Oooops!!!</Text>
      <Text style={ styles.text }>It's a bit lonely here!</Text>
      <Text style={ styles.text }>Try to add something.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16
  }
})

export default NoItems;