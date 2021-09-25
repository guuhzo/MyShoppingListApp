import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Text,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { StackScreenProps } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Model, Q } from '@nozbe/watermelondb';

import theme from '../../global/theme';
import { StackParamList } from '../../routes';

import database from '../../database';
import Product from '../../database/model/Product';
import List from '../../database/model/List';
import ListItem from '../../database/model/ListItem';

import Header from '../../components/Header';
import OutlinedButton from '../../components/OutlinedButton';
import NoItems from '../../components/NoItems';
import {
  ModalContainer,
  ModalContent,
  ModalTitle,
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
  FloatActionButton,
} from './styles';

interface IProduct {
  id: string;
  name: string;
  isSelected?: boolean;
  available: boolean;
}

type Props = StackScreenProps<StackParamList, 'AddProducts'>;

const AddProducts: React.FC<Props> = ({ route, navigation }) => {
  const { listId, listName, cash, card } = route.params;
  const [loading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [saving, setSaving] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [productToArchive, setProductToArchive] = useState<string>('');
  const [archiveModalText, setArchiveModalText] = useState<string>('');
  const [allProducts, setAllProducts] = useState(false);

  const loadSelectedItems = useCallback(async () => {
    if (listId && firstRender) {
      const list = await database.get<List>('lists').find(listId);
      const listItems = await list.items.fetch();

      const products = [] as IProduct[];
      const selectedProducts = [] as Product[];
      for (const item of listItems) {
        const product = (await item.product.fetch()) as Product;
        selectedProducts.push(product);
        products.push({
          id: product.id,
          name: product.name,
          isSelected: true,
          available: product.available,
        });
      }

      setProducts(
        products
          .sort((a, b) =>
            a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1,
          )
          .sort((a, b) =>
            a.available === b.available ? 0 : a.available ? -1 : 1,
          ),
      );
      setSelectedProducts(selectedProducts);
      setFirstRender(false);
    }
  }, [firstRender, listId]);

  const loadProducts = useCallback(async () => {
    if (listId && firstRender) {
      return;
    }
    const productsCollection = database.get<Product>('products');

    const dbProducts = [] as Product[];
    if (allProducts) {
      const products = await productsCollection.query().fetch();
      dbProducts.push(...products);
    } else {
      const products = await productsCollection
        .query(Q.where('available', true))
        .fetch();
      dbProducts.push(...products);
    }

    const products = [] as IProduct[];
    dbProducts.forEach(dbProduct => {
      const filteredProducts = selectedProducts.filter(
        item => item.id === dbProduct.id,
      );
      let isSelected = false;

      if (filteredProducts.length > 0) isSelected = true;

      products.push({
        id: dbProduct.id,
        name: dbProduct.name,
        isSelected,
        available: dbProduct.available,
      });
    });
    setProducts(
      products
        .sort((a, b) =>
          a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1,
        )
        .sort((a, b) =>
          a.available === b.available ? 0 : a.available ? -1 : 1,
        ),
    );
  }, [allProducts, firstRender, listId, selectedProducts]);

  useEffect(() => {
    setLoading(true);

    loadSelectedItems();
    loadProducts();

    setLoading(false);
  }, [loadProducts, loadSelectedItems]);

  const handleSave = useCallback(async () => {
    setSaving(true);

    const listsCollection = database.get<List>('lists');
    const listItemsCollection = database.get<ListItem>('list_items');

    if (listId) {
      const list = await listsCollection.find(listId);
      const preparedItems = [] as Model[];

      const prepared = list.prepareUpdate(item => {
        item.quantity = selectedProducts.length;
        item.name = listName;
        item.card = card;
        item.cash = cash;
      });

      preparedItems.push(prepared);

      const listItems = await listItemsCollection
        .query(Q.where('list_id', listId))
        .fetch();

      for (const item of listItems) {
        const product = (await item.product.fetch()) as Product;
        const hasItem = selectedProducts.includes(product);

        if (!hasItem) {
          const prepared = item.prepareDestroyPermanently();
          preparedItems.push(prepared);
        }
      }

      for (const selectedProduct of selectedProducts) {
        const listItem = await listItemsCollection
          .query(
            Q.where('product_id', selectedProduct.id),
            Q.where('list_id', listId),
          )
          .fetch();

        if (listItem.length === 0) {
          const prepared = listItemsCollection.prepareCreate(item => {
            item.quantity = 1;
            item.price = 0;
            item.list.set(list);
            item.product.set(selectedProduct);
          });
          preparedItems.push(prepared);
        }
      }
      await database.action(async () => {
        await database.batch(...preparedItems);
      });
    } else {
      await database.action(async () => {
        const list = await listsCollection.create(list => {
          list.name = listName;
          list.cash = cash;
          list.card = card;
          list.quantity = selectedProducts.length;
        });

        for (const selectedProduct of selectedProducts) {
          await listItemsCollection.create(item => {
            item.quantity = 1;
            item.price = 0;
            item.list.set(list);
            item.product.set(selectedProduct);
          });
        }
      });
    }

    setSaving(false);
    const stackAction = listId ? StackActions.pop(2) : StackActions.popToTop();
    navigation.dispatch(stackAction);
  }, [listId, navigation, selectedProducts, listName, cash, card]);

  const selectItem = useCallback(
    async (id: string) => {
      const newProductsList = [...products];
      const index = newProductsList.findIndex(item => item.id === id);
      const product = newProductsList[index];
      product.isSelected = !product.isSelected;
      newProductsList[index] = product;

      setProducts(
        newProductsList.sort((a, b) =>
          a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1,
        ),
      );
      const dbProduct = await database.get<Product>('products').find(id);
      const newSelectedProducts = [...selectedProducts];

      if (product.isSelected) {
        newSelectedProducts.push(dbProduct);
      } else {
        const index = newSelectedProducts.findIndex(
          item => item.id === dbProduct.id,
        );
        newSelectedProducts.splice(index, 1);
      }
      setSelectedProducts(newSelectedProducts);
    },
    [products, selectedProducts],
  );

  const handleArchiveModalVisibility = useCallback(
    (id: string) => {
      setShowArchiveModal(!showArchiveModal);
      setProductToArchive(id);
    },
    [showArchiveModal],
  );

  const handleArchiveItem = useCallback(async () => {
    if (productToArchive === '') {
      return;
    }

    // const productsList = [...products];
    // const productsIndex = productsList.findIndex(
    //   item => item.id === productToArchive,
    // );
    // const newProductsList = productsList.splice(productsIndex, 1);

    // setProducts(
    //   newProductsList.sort((a, b) =>
    //     a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1,
    //   ),
    // );

    const selectedProductsList = [...selectedProducts];

    const selectedProductsIndex = selectedProductsList.findIndex(
      item => item.id === productToArchive,
    );

    let newSelectedProducts = [] as Product[];
    if (selectedProductsIndex > 0) {
      newSelectedProducts = selectedProductsList.splice(
        selectedProductsIndex,
        1,
      );
    }

    const productDb = await database
      .get<Product>('products')
      .find(productToArchive);

    await database.action(async () => {
      await productDb.update(item => {
        item.available = !item.available;
      });
    });

    handleArchiveModalVisibility('');

    setSelectedProducts(
      newSelectedProducts.length > 0
        ? newSelectedProducts
        : selectedProductsList,
    );
  }, [handleArchiveModalVisibility, productToArchive, selectedProducts]);

  const handleChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const value = e.nativeEvent.text;

      if (value === ' ' && newProductName.length === 0) return;

      setNewProductName(value);
    },
    [newProductName],
  );

  const handleAddProductModalVisibility = useCallback(() => {
    setNewProductName('');
    setShowAddProductModal(!showAddProductModal);
  }, [showAddProductModal]);

  const handleFilterProducts = useCallback(() => {
    setAllProducts(!allProducts);
  }, [allProducts]);

  const handleCreateProduct = useCallback(async () => {
    const productsCollection = database.get<Product>('products');
    await database.action(async () => {
      const newProduct = await productsCollection.create(product => {
        product.name = newProductName;
        product.available = true;
        product.lastPrice = 0;
      });

      setSelectedProducts([...selectedProducts, newProduct]);

      const newProductsList = [...products];
      newProductsList.push({
        id: newProduct.id,
        name: newProduct.name,
        isSelected: true,
        available: newProduct.available,
      });

      setProducts(
        newProductsList.sort((a, b) =>
          a.isSelected === b.isSelected ? 0 : a.isSelected ? -1 : 1,
        ),
      );
    });

    handleAddProductModalVisibility();
  }, [
    handleAddProductModalVisibility,
    selectedProducts,
    products,
    newProductName,
  ]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
        <View style={{ flex: 1 }}>
          <Header
            title={route.params.listName}
            canGoBack={navigation.canGoBack()}
          />
          {loading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <ActivityIndicator color={theme.colors.primary} size="large" />
            </View>
          ) : (
            <>
              <Modal
                animationType="fade"
                visible={showAddProductModal}
                transparent
              >
                <ModalContainer>
                  <ModalContent>
                    <ProductNameInput>
                      <Icon
                        name="tag"
                        color={theme.colors.primary}
                        size={RFValue(24)}
                      />
                      <TextInput
                        // ref={inputRef}
                        value={newProductName}
                        onChange={handleChange}
                        placeholderTextColor={theme.colors.placeHolderText}
                        placeholder="Product Name"
                      />
                    </ProductNameInput>
                    <ModalButtonsContainer>
                      <ModalButtonCancel
                        onPress={handleAddProductModalVisibility}
                      >
                        <Text style={{ color: theme.colors.altText }}>
                          CANCEL
                        </Text>
                      </ModalButtonCancel>
                      {newProductName.length > 0 && (
                        <ModalButtonConfirm onPress={handleCreateProduct}>
                          <Text style={{ color: theme.colors.altText }}>
                            CONFIRM
                          </Text>
                        </ModalButtonConfirm>
                      )}
                    </ModalButtonsContainer>
                  </ModalContent>
                </ModalContainer>
              </Modal>
              <Modal
                animationType="fade"
                visible={showArchiveModal}
                transparent
              >
                <ModalContainer>
                  <ModalContent>
                    <ModalTitle>{archiveModalText}</ModalTitle>
                    <ModalButtonsContainer>
                      <ModalButtonCancel
                        onPress={() => handleArchiveModalVisibility('')}
                      >
                        <Text style={{ color: theme.colors.altText }}>
                          CANCEL
                        </Text>
                      </ModalButtonCancel>
                      <ModalButtonConfirm onPress={handleArchiveItem}>
                        <Text style={{ color: theme.colors.altText }}>
                          CONFIRM
                        </Text>
                      </ModalButtonConfirm>
                    </ModalButtonsContainer>
                  </ModalContent>
                </ModalContainer>
              </Modal>
              <Content>
                <ContentHeader>
                  <Title>{selectedProducts.length} Products</Title>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}
                  >
                    <OutlinedButton
                      color={theme.colors.text}
                      iconName="filter"
                      handlePress={handleFilterProducts}
                      text={allProducts ? 'Available' : 'All'}
                    />
                    <OutlinedButton
                      color={theme.colors.primary}
                      iconName="plus"
                      handlePress={handleAddProductModalVisibility}
                      text="Product"
                    />
                  </View>
                </ContentHeader>
                <FlatList
                  data={products}
                  keyExtractor={item => item.id}
                  ListEmptyComponent={NoItems}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={item.available ? 0.5 : 1}
                      onPress={() => {
                        if (item.available) {
                          selectItem(item.id);
                        }
                      }}
                      onLongPress={() => {
                        if (item.available) {
                          setArchiveModalText(
                            'Do you want to archive this product?',
                          );
                        } else {
                          setArchiveModalText(
                            'Do you want to unarchive this product?',
                          );
                        }
                        handleArchiveModalVisibility(item.id);
                      }}
                    >
                      <ItemContainer>
                        <ItemTitle>{item.name}</ItemTitle>
                        <View style={{ flexDirection: 'row' }}>
                          {!item.available ? (
                            <Icon
                              name="archive"
                              size={16}
                              color={theme.colors.text}
                            />
                          ) : (
                            <Icon
                              name={item.isSelected ? 'minus' : 'plus'}
                              size={16}
                              color={theme.colors.text}
                            />
                          )}
                          {!item.available && item.isSelected && (
                            <Icon
                              name="minus"
                              size={16}
                              color={theme.colors.text}
                              style={{ marginLeft: RFValue(8) }}
                            />
                          )}
                        </View>
                      </ItemContainer>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={
                    products.length === 0
                      ? { flex: 1 }
                      : { paddingBottom: RFValue(70) }
                  }
                />
                {selectedProducts.length > 0 && (
                  <FloatActionButton onPress={handleSave} disabled={saving}>
                    {saving ? (
                      <ActivityIndicator
                        color={theme.colors.altText}
                        size="small"
                      />
                    ) : (
                      <Icon
                        name="save"
                        size={RFValue(20)}
                        color={theme.colors.altText}
                      />
                    )}
                  </FloatActionButton>
                )}
              </Content>
            </>
          )}
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default AddProducts;
