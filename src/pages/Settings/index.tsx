import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Header from '../../components/Header'
import api from '../../services/api'

interface IList {
  id: string;
  name: string;
  isShared: boolean;
  products: [];
  total: number;
}

interface IProduct {
  id: string;
  name: string;
  isShared: boolean;
  lastPrice: number;
}


const Settings: React.FC = () => {
  const [bText, setBText] = useState('Sync Information')

  const handleSync = useCallback(async () => {
    setBText('Synchronizing');
        
    try {
      const response = await api.get<IList[]>('lists')
      // setLists(response.data)
    } catch (e) {
      // setLists([])
    }

    try {
      const response = await api.get<IProduct[]>('products')
      // setProducts(response.data)
    } catch(e) {
      // setProducts([])
    }

    setBText('Sync Information');
  }, [])
  
  return (
    <View style={ styles.container }>
      <Header title='My Settings' icon='log-out'/>
      <View style={ styles.containerContent }>
        <TouchableOpacity onPress={handleSync}>
          <View style={ styles.button }>
            <Text style={ styles.text }>{bText}</Text>
          </View>
        </TouchableOpacity>
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
  button: {
    height: 80,
    width: 208,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efefef'
  },
  text: {
    color: '#2a2a2a',
    fontSize: 25
  }
});

export default Settings;