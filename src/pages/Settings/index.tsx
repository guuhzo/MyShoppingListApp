import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Header from '../../components/Header'

const Settings: React.FC = () => {
  
  return (
    <View style={ styles.container }>
      <Header title='My Settings' icon='log-out'/>
      <View style={ styles.containerContent }>
        <Text style={ styles.text }>Settings</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff'
  },
  text: {
    color: '#000',
    fontSize: 25
  }
});

export default Settings;