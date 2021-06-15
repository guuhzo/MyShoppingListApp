import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { 
  FlatList, 
  Keyboard, 
  RefreshControl, 
  SafeAreaView, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  View 
} from 'react-native'

import Card from '../../components/Card'
import Header from '../../components/Header'
import NewItemModal from './Components/NewItemModal'
import NoItems from '../../components/NoItems'
import Search from '../../components/Search'
import ProductsSkeleton from './Components/Skeleton'
import Realm from '../../services/database'

interface IProp {
  setShowTabBar(value: boolean): void
}

interface IProduct {
  _id: string;
  name: string;
  lastPrice: number;
  createdAt: Date;
}

const Products: React.FC<IProp> = ({ setShowTabBar }) => {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showNewModal, setShowNewModal] = useState(false)
  const [products, setProducts] = useState([] as IProduct[])
  
  const loadingProducts = useCallback(async () => {
    setLoading(true)
    
    const realm =  Realm
    const data = realm.objects<IProduct[]>('Product')

    setProducts(data as any)
    setLoading(false)
  }, [])

  useEffect(() => {
    const realm = Realm
    realm.addListener('change', (realm) => {
      const data = realm.objects<IProduct[]>('Product')
      setProducts(data as any)
    })

    loadingProducts()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    loadingProducts()
    
    setRefreshing(false)
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
      <View style={{ flex: 1 }}>
        <Header 
          title={'My Shopping Lists'} 
          icon='plus'
          buttonPress={() => { setShowTabBar(false); setShowNewModal(true) }}
        />
        <SafeAreaView style={ styles.container }>
          <Search title='Mercado' marginTop={-25}/>
          <View style={ styles.containerContent }>
            {
              loading
              ?
                <ProductsSkeleton />
              :
                <FlatList 
                  data={products}
                  keyExtractor={item => item._id}
                  renderItem={({ item }) => (
                    <Card
                      header={{
                        fields: {
                          title: item.name
                        },
                        style: {
                          fontSize: 16
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
      <NewItemModal 
          show={showNewModal}
          handleAdd={({}) => console.log('salvar item na lista')} 
          handleClose={() => { 
            setShowNewModal(false)
            setShowTabBar(true) 
            Keyboard.dismiss()
          }} 
        />
      </>
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