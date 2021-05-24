import React, { useState, useEffect, useCallback } from 'react'
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  FlatList, 
  TouchableWithoutFeedback, 
  Keyboard,
  RefreshControl
} from 'react-native'


import Header from '../../components/Header'
import Search from '../../components/Search'
import Card from '../../components/Card'
import NoItems from '../../components/NoItems'
import NewItemModal from '../../components/NewItemModal'
import ListSkeleton from './Skeleton'

interface IProp {
  setShowTabBar(value: boolean): void
}

interface IList {
  id: string;
  name: string;
  isShared: boolean;
  products: [];
  total: number;
}

const Lists: React.FC<IProp> = ({ setShowTabBar }) => {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showNewModal, setShowNewModal] = useState(false)
  const [lists, setLists] = useState([] as IList[])
  
  const loadingLists = useCallback(async () => {
    setLoading(true)

    setLoading(false)
  }, [])

  
  useEffect(() => {
    loadingLists()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    loadingLists()

    setRefreshing(false)
  }, [])

  const handleAdd = useCallback(() => {
    console.log('salvar item na lista')
  }, [])
    
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <View style={{ flex: 1 }}>
          <Header 
            title={'My Shopping Lists'} 
            icon='plus' 
            buttonPress={() => { setShowNewModal(true); setShowTabBar(false) }}
          />
          <SafeAreaView style={ styles.container }> 
            <Search title='Mercado'/>
            <View style={ styles.containerContent }>
              {
                loading
                ?
                  <ListSkeleton />
                :
                  <FlatList 
                    data={lists}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <Card
                        isShared={item.isShared}
                        header={{
                          fields: {
                            title: item.name
                          }
                        }}
                        footer={{
                          fields: {
                            quantity: item.products.length,
                            total: item.total
                          },
                          style: {
                            fontSize: 16
                          }
                        }}
                      />
                    )}
                    ListEmptyComponent={<NoItems />}
                    contentContainerStyle={lists.length === 0 && { flex: 1 }}
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
          height='80%'
          title='Create a new list'
          type='list'
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

export default Lists;