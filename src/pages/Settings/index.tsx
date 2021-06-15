import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { Alert } from 'react-native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Header from '../../components/Header'
import api from '../../services/api'
import getRealm from '../../services/database'

interface IList {
  _id: string;
  name: string;
  isFinished: boolean;
  products: IProduct[];
  total: number;
  createdAt: Date;
}

interface IProduct {
  _id: string;
  name: string;
  lastPrice: number;
  createdAt: Date;
}


const Settings: React.FC = () => {
  const [realm, setRealm] = useState(getRealm)
  const [bSyncText, setBSyncText] = useState('Sync Information')
  const [bDeleteText, setBDeleteText] = useState('Delete Data')

  const handleSync = useCallback(async () => {
    setBSyncText('Synchronizing');

    try {
      const responseList = await api.get<IList[]>('lists')
      
      realm.write(() => {
        responseList.data.forEach(item => {
          realm.create('List', {
            _id: item._id,
            name: item.name,
            products: item.products,
            createdAt: new Date(item.createdAt),
            isFinished: item.isFinished
          })
        })
      })
      const responseProduct = await api.get<IProduct[]>('products')
      
      realm.write(() => {
        responseProduct.data.forEach(item => {
          realm.create('Product', {
            _id: item._id,
            name: item.name,
            lastPrice: Number(item.lastPrice),
            createdAt: new Date(item.createdAt)
          })
        })
      })
    } catch (e) {
      Alert.alert(
        'Ops!',
        'Erro ao carregar',
        [ { text: 'Ok' } ]
      )
      console.log(e);
      
    }

    setBSyncText('Sync Information');
  }, [])

  const handleDelete = useCallback(async () => {
    setBDeleteText('Deleting')

    realm.write(() => {
      const lists = realm.objects('List')
      realm.delete(lists)
      
      const products = realm.objects('Product')
      realm.delete(products)
    })
    
    setBDeleteText('Delete Data')
  }, [])

  useEffect(() => {
  }, [])
  
  return (
    <View style={ styles.container }>
      <Header title='My Settings' icon='log-out' buttonPress={() => {}}/>
      <View style={ styles.containerContent }>
        <TouchableOpacity onPress={handleSync}>
          <View style={ styles.button }>
            <Text style={ styles.text }>{bSyncText}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <View style={[ styles.button, { marginTop: 8 } ]}>
            <Text style={ styles.text }>{bDeleteText}</Text>
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