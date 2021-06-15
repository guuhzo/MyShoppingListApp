import React, { useState, useEffect, useCallback } from 'react'
import theme from '../../global/theme'

import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
  Text
} from 'react-native'

import Header from '../../components/Header'
import Search from '../../components/Search'
import Card from '../../components/Card'
import NoItems from '../../components/NoItems'
import NewItemModal from './Components/NewItemModal'
import ListSkeleton from './Components/Skeleton'

import Realm from '../../services/database'

interface IProp {
  setShowTabBar(value: boolean): void
}

interface IProduct {
  _id: string;
  name: string;
  isShared: boolean;
  lastPrice: number;
}

interface IBudget {
  _id: string;
  type: string;
  value: number;
}

interface IList {
  _id: string;
  name: string;
  isFinished: boolean;
  products: IProduct[];
  budget: IBudget[];
  createdAt: Date;
}

const Lists: React.FC<IProp> = ({ setShowTabBar }) => {
  const [loading, setLoading] = useState(true)
  const [realm, setRealm] = useState(Realm)

  const [refresh, setRefresh] = useState(false)
  const [showNewModal, setShowNewModal] = useState(false)
  const [lists, setLists] = useState([] as IList[])

  const loadingLists = useCallback(() => {
    // const realm =  Realm
    setLoading(true)
    const data = realm.objects<IList[]>('List')
    const newLists: IList[] = data.map(item => item) as any
    setLists(newLists)

    setRefresh(!refresh)
    setLoading(false)
  }, [lists, refresh])


  useEffect(() => {
    realm.addListener('change', (realm, change) => {
      loadingLists()
    })
    loadingLists()

    return () => {
      Realm.removeAllListeners('change')
    }
  }, [])

  const renderItem = ({ item }: { item: IList}) => (
    <View key={item._id}>
      <Card
        header={{
          fields: {
            title: item.name
          }
        }}
        footer={{
          fields: {
            quantity: item.products.length,
            total: item.budget.reduce((acumulator, current) => {
              return acumulator += current.value
            }, 0)
          },
          style: {
            fontSize: 16
          }
        }}
      />
    </View>
  )

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <View style={{ flex: 1 }}>
          <Header
            title={'My Shopping Lists'}
            icon='plus'
            buttonPress={() => { setShowNewModal(true); setShowTabBar(false) }}
          />
          <SafeAreaView style={styles.container}>
            <Search title='Mercado' marginTop={-25}/>
            <View style={styles.containerContent}>
              {
                loading
                  ?
                  <ListSkeleton />
                  :
                  <FlatList
                    data={lists}
                    extraData={refresh}
                    keyExtractor={item => item._id}
                    renderItem={renderItem}
                    ListEmptyComponent={<NoItems />}
                    contentContainerStyle={lists.length === 0 && { flex: 1 }}
                  />
              }
            </View>
          </SafeAreaView>
        </View>
        {showNewModal &&
          <NewItemModal
            show={showNewModal}
            handleClose={() => {
              setShowNewModal(false)
              setShowTabBar(true)
              Keyboard.dismiss()
            }}
          />
        }
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