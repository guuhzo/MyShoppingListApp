import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { FlatList, Keyboard, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Card from '../../components/Card'

import Header from '../../components/Header'
import NoItems from '../../components/NoItems'
import Search from '../../components/Search'
import api from '../../services/api'
import ProductsSkeleton from './Skeleton'

interface IProduct {
  id: string;
  name: string;
  isShared: boolean;
  lastPrice: number;
}

const Products: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [products, setProducts] = useState([] as IProduct[])
  
  const loadingProducts = useCallback(async () => {
    setLoading(true)
    
    try {
      const response = await api.get<IProduct[]>('products')
      setProducts(response.data)
    } catch(e) {
      setProducts([])
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    loadingProducts()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    loadingProducts()
    
    setRefreshing(false)
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <Header title={'My Shopping Lists'} icon='plus'/>
        <SafeAreaView style={ styles.container }>
          <Search title='Mercado'/>
          <View style={ styles.containerContent }>
            {
              loading
              ?
                <ProductsSkeleton />
              :
                <FlatList 
                  data={products}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <Card
                      isShared={item.isShared}
                      header={{
                        fields: {
                          title: item.name
                        },
                        style: {
                          fontSize: 16,
                          fontWeight: 'bold'
                        }
                      }}
                    />
                  )}
                  ListEmptyComponent={<NoItems />}
                  contentContainerStyle={products.length === 0 && { flex: 1 }}
                  refreshControl={
                    <RefreshControl 
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      colors={[
                        '#3272BC'
                      ]}
                    />
                  }
                />
            }
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerContent: {
    flex: 1,
    marginTop: 20,
    
  },
  containerEmptyList: {
    flex: 1,
  },
  
  text: {
    color: '#000',
    fontSize: 25
  }
});

export default Products;