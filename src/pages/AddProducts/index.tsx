import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'

import Realm from '../../services/database'

import Header from '../../components/Header'
import OutlinedButton from '../../components/OutlinedButton'

import {
  HeaderSubtitleContainer,
  HeaderSubtitleText,
  Content,
  ContentHeader,
  Title,
  ItemContainer,
  ItemTitle
} from './styles'
import theme from '../../global/theme'
import Search from '../../components/Search'
import NewProductModal from '../Products/Components/NewItemModal'
import Icon from 'react-native-vector-icons/Feather'

interface IBudget {
  _id: string;
  type: string;
  value: number;
}

interface IProduct {
  _id: string;
  name: string;
  lastPrice: number;
  createdAt: Date;
  isSelected?: boolean;
}

interface IList {
  _id: string;
  name: string;
  isFinished: boolean;
  products: IProduct[];
  budget: IBudget[];
  createdAt: Date;
}

type RootStackParamList = {
  AddProducts: { list: { name: string, budget: IBudget[] } }
}

type AddProductsRouteProps = RouteProp<RootStackParamList, 'AddProducts'>

const AddProducts: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([])
  const [showModal, setShowModal] = useState(false)
  const { params } = useRoute<AddProductsRouteProps>()

  const loadProducts = useCallback(() => {
    const realm = Realm

    const data = realm.objects<IProduct[]>('Product')
    setProducts(data as any)
  }, [products])

  useEffect(() => {
    const realm = Realm
    realm.addListener('change', realm => {
      loadProducts
    })

    loadProducts()

    return () => {
      Realm.removeAllListeners('change')
    }
  }, [])

  const handleSave = useCallback(() => {

  }, [])
  const selectItem = useCallback((_id: string) => {
    const newProductsList = [...products]
    const index = newProductsList.findIndex(item => item._id === _id)
    const product = newProductsList[index]
    product.isSelected = !product.isSelected
    newProductsList[index] = product

    setProducts(newProductsList)
  }, [products])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <View style={{ flex: 1 }}>
          <Header
            buttonPress={() => handleSave}
            icon='check'
            title={params.list.name}
            hasReturn
          >
            <HeaderSubtitleContainer>
              <HeaderSubtitleText>{products.filter(item => item.isSelected).length} products</HeaderSubtitleText>
            </HeaderSubtitleContainer>
          </Header>
          <Content>
            <ContentHeader>
              <Title>Products</Title>
              <OutlinedButton
                color={theme.colors.primary}
                iconName='plus'
                handlePress={() => setShowModal(true)}
                text='Product'
              />
            </ContentHeader>
            <Search title='Abacaxi' marginTop={0} />
            <FlatList
              data={products}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectItem(item._id)}>
                  <ItemContainer>
                    <ItemTitle>{item.name}</ItemTitle>
                    <Icon name={item.isSelected ? 'minus' : 'plus'} size={16} color={theme.colors.text} />
                  </ItemContainer>
                </TouchableOpacity>
              )}
            />
          </Content>
        </View>
        {showModal &&
          <NewProductModal
            handleClose={() => setShowModal(false)}
            show={showModal}
          />
        }
      </>
    </TouchableWithoutFeedback>
  )
}

export default AddProducts