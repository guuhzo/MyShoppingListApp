import React, { useState, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native'

import Header from '../../components/Header'
import Search from '../../components/Search'
import Card from '../../components/Card'

import importedlists from '../../../tmp/lists'

interface IList {
  id: string;
  name: string;
  isShared: boolean;
  quantityProducts: number;
  total: number;
}

const Lists: React.FC = () => {
  const [lists, setLists] = useState([] as IList[])

  useEffect(() => {
    setLists(importedlists)
  }, [setLists])

  return (
    <SafeAreaView 
      style={ styles.container }
    >
      <Header title={'My Shopping Lists ' + lists.length} icon='plus'/>
      <Search title='Mercado'/>
      <View style={ styles.containerContent }>
        <FlatList 
          data={lists}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card 
              title={item.name}
              height={100}
              isShared={item.isShared}
              option1={`${item.quantityProducts} Products`}
              option2= {`Total: R$ ${item.total}`}
              footerStyle={{ fontSize: 15, fontWeight: 'bold' }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerContent: {
    flex: 1,
    marginTop: 20
    
  },
  listItem: {
    height: 100,
    backgroundColor: '#F0F0F5',
    marginHorizontal: 30,
    marginBottom: 10,
    borderRadius: 8,
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 30,
    marginRight: 15,
    marginTop: 10
  },
  text: {
    color: '#000',
    fontSize: 25
  }
});

export default Lists;