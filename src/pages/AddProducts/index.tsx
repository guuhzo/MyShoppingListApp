import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Text
} from 'react-native'

import Header from '../../components/Header'
import OutlinedButton from '../../components/OutlinedButton'
import Search from '../../components/Search'
import NoItems from '../../components/NoItems'

import {
  ModalContainer,
  ModalContent,
  ProductNameInput,
  ModalButtonsContainer,
  ModalButtonCancel,
  ModalButtonConfirm,
  TextInput,
  Content,
  ContentHeader,
  Title,
  ItemContainer,
  ItemTitle,
  FloatActionButton
} from './styles'
import theme from '../../global/theme'
import Icon from 'react-native-vector-icons/Feather'
import { StackScreenProps } from '@react-navigation/stack'
import { StackParamList } from '../../routes'
import { RFValue } from 'react-native-responsive-fontsize'
import database from '../../database'
import Product from '../../database/model/Product'
import List from '../../database/model/List'
import ProductList from '../../database/model/ProductList'



interface IBudget {
  _id: string;
  type: string;
  value: number;
}

interface IProduct {
  id: string;
  name: string;
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

type Props = StackScreenProps<StackParamList, 'AddProducts'>

const AddProducts: React.FC<Props> = ({ route, navigation }) => {
  const { listName, cash, card } = route.params
  const [products, setProducts] = useState<IProduct[]>([])
  const [newProductName, setNewProductName] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [showModal, setShowModal] = useState(false)

  const loadProducts = useCallback(async () => {
    const productsCollection = database.get<Product>('products')
    const dbProducts = await productsCollection.query().fetch()

    const products = [] as IProduct[]
    dbProducts.forEach(dbProduct => {
      const filteredProducts = selectedProducts.filter(item => item.id === dbProduct.id)
      let isSelected = false

      if (filteredProducts.length > 0) isSelected = true

      products.push({ id: dbProduct.id, name: dbProduct.name, isSelected })

    })
    setProducts(products
      .sort((a, b) => a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1)
    )

  }, [products, selectedProducts])

  useEffect(() => {
    loadProducts()
  }, [])

  const handleSave = useCallback(async () => {
    await database.write(async () => {
      const list = await database.get<List>('lists').create(list => {
        list.name = listName
        list.cash = cash
        list.card = card
        list.quantity = selectedProducts.length
      })
      const productListCollection = database.get<ProductList>('product_lists')

      for (const selectedProduct of selectedProducts) {
        const createdLink = await productListCollection.create(productList => {
          productList.list.set(list)
          productList.product.set(selectedProduct)
        })
        console.log(createdLink);

      }

    })
  }, [selectedProducts, route])

  const selectItem = useCallback(async (id: string) => {
    const newProductsList = [...products]
    const index = newProductsList.findIndex(item => item.id === id)
    const product = newProductsList[index]
    product.isSelected = !product.isSelected
    newProductsList[index] = product

    setProducts(newProductsList
      .sort((a, b) => a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1)
    )
    const dbProduct = await database.get<Product>('products').find(id)
    const newSelectedProducts = [...selectedProducts]

    if (product.isSelected) {
      newSelectedProducts.push(dbProduct)
    } else {
      const index = newSelectedProducts.findIndex(item => item.id === dbProduct.id)
      newSelectedProducts.splice(index, 1)
    }
    setSelectedProducts(newSelectedProducts)
  }, [products, selectedProducts])

  const handleChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const value = e.nativeEvent.text

    if (value === ' ' && newProductName.length === 0) return

    setNewProductName(value)
  }, [newProductName])

  const handleModalVisibility = useCallback(() => {
    setNewProductName('')
    setShowModal(!showModal)
  }, [showModal, newProductName])

  const handleCreateProduct = useCallback(async () => {
    const productsCollection = database.get<Product>('products')
    await database.write(async () => {
      const newProduct = await productsCollection.create(product => {
        product.name = newProductName
      })

      setSelectedProducts([...selectedProducts, newProduct])

      const newProductsList = [...products]
      newProductsList.push({
        id: newProduct.id,
        name: newProduct.name,
        isSelected: true
      })

      setProducts(newProductsList
        .sort((a, b) => a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1)
      )
    })

    handleModalVisibility()
  }, [showModal, newProductName, selectedProducts, products])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <View style={{ flex: 1 }}>
          <Header title={route.params.listName} canGoBack={navigation.canGoBack()} />
          <Modal
            animationType='fade'
            visible={showModal}
            transparent={true}
          >
            <ModalContainer>
              <ModalContent>
                <ProductNameInput>
                  <Icon name='tag' color={theme.colors.primary} size={RFValue(24)} />
                  <TextInput
                    // ref={inputRef}
                    value={newProductName}
                    onChange={handleChange}
                    placeholderTextColor={theme.colors.placeHolderText}
                    placeholder='Product Name'
                  />
                </ProductNameInput>
                <ModalButtonsContainer>
                  <ModalButtonCancel onPress={handleModalVisibility}>
                    <Text style={{ color: theme.colors.altText }}>CANCEL</Text>
                  </ModalButtonCancel>
                  {newProductName.length > 0 &&
                    <ModalButtonConfirm onPress={handleCreateProduct}>
                      <Text style={{ color: theme.colors.altText }}>CONFIRM</Text>
                    </ModalButtonConfirm>
                  }
                </ModalButtonsContainer>
              </ModalContent>
            </ModalContainer>
          </Modal>
          <Content>
            <ContentHeader>
              <Title>{selectedProducts.length} Products</Title>
              <OutlinedButton
                color={theme.colors.primary}
                iconName='plus'
                handlePress={handleModalVisibility}
                text='Product'
              />
            </ContentHeader>
            {/* <Search title='Abacaxi' marginTop={0} /> */}
            <FlatList
              data={products}
              keyExtractor={item => item.id}
              ListEmptyComponent={NoItems}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectItem(item.id)}>
                  <ItemContainer>
                    <ItemTitle>{item.name}</ItemTitle>
                    <Icon name={item.isSelected ? 'minus' : 'plus'} size={16} color={theme.colors.text} />
                  </ItemContainer>
                </TouchableOpacity>
              )}
              contentContainerStyle={products.length === 0 && { flex: 1 }}
            />
            {selectedProducts.length > 0  &&
              <FloatActionButton onPress={handleSave}>
                <Icon name="check" size={RFValue(20)} color={theme.colors.altText} />
              </FloatActionButton>
            }
          </Content>
        </View>
      </>
    </TouchableWithoutFeedback>
  )
}

export default AddProducts