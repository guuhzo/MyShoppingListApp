/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */
import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, Text, Dimensions, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Icon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { StackParamList } from '../../routes';
import Header from '../../components/Header';
import {
  Container,
  Content,
  Section,
  Title,
  BudgetItem,
  BudgetItemTitle,
  BudgetItemText,
  ProductCard,
  PCSection,
  PCText,
  PCQuantityControl,
  PCQuantityControlItem,
  Footer,
  FooterTitle,
  FooterText,
} from './styles';
import theme from '../../global/theme';
import database from '../../database';
import List from '../../database/model/List';
import ListItem from '../../database/model/ListItem';
import formatCurrency from '../../utils/formatCurrency';
import CurrencyInput from '../../components/CurrencyInput';

type Prop = StackScreenProps<StackParamList, 'ListDetails'>;

interface IEditableItem {
  id: string;
  quantity: number;
  price: number;
  productName: string;
}

const ListDetails: React.FC<Prop> = ({ navigation, route }) => {
  const [saving, setSaving] = useState(false);
  const [hasChange, setHasChange] = useState(false);
  const [list, setList] = useState({} as List);
  const [editableItems, setEditableItems] = useState([] as IEditableItem[]);
  const [itemsDb, setItemsDb] = useState([] as ListItem[]);
  const [loading, setLoading] = useState(true);
  const { id } = route.params;

  const loadList = useCallback(async () => {
    setLoading(true);
    const listsCollection = database.get<List>('lists');
    const listDb = await listsCollection.find(id);
    const itemsDb = await listDb.items.fetch();

    const editableItems = [] as IEditableItem[];
    for (const item of itemsDb) {
      const product = await item.product.fetch();
      editableItems.push({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        productName: product!.name,
      });
    }

    setList(listDb);
    setItemsDb(itemsDb);
    setEditableItems(editableItems);

    setLoading(false);
  }, [id]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    const preparedItems = [] as ListItem[];

    for (const item of editableItems) {
      const index = itemsDb.findIndex(itemDb => itemDb.id === item.id);
      const preparedItem = itemsDb[index].prepareUpdate(itemDb => {
        itemDb.price = item.price;
        itemDb.quantity = item.quantity;
      });
      preparedItems.push(preparedItem);
    }
    database.action(async () => {
      await database.batch(...preparedItems);
    });
    setSaving(false);
    navigation.goBack();
  }, [editableItems, itemsDb, navigation]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  const handleItemChange = useCallback(
    (id: string, value: number) => {
      const index = editableItems.findIndex(item => item.id === id);
      const item = editableItems[index];
      item.price = value;
      editableItems[index] = item;
      setEditableItems([...editableItems]);
      setHasChange(true);
    },
    [editableItems],
  );

  const handleQuantityPress = useCallback(
    (id: string, type: 'minus' | 'plus') => {
      const index = editableItems.findIndex(item => item.id === id);
      const item = editableItems[index];
      switch (type) {
        case 'minus':
          if (item.quantity > 0) {
            item.quantity -= 1;
          }
          break;
        case 'plus':
          if (item.quantity < 99) {
            item.quantity += 1;
          }
          break;
        default:
          break;
      }
      editableItems[index] = item;
      setEditableItems([...editableItems]);
      setHasChange(true);
    },
    [editableItems],
  );

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      style={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      }}
    >
      <Container>
        <Header title="My List Details" canGoBack={navigation.canGoBack()}>
          {hasChange &&
            (saving ? (
              <ActivityIndicator color={theme.colors.altText} size="small" />
            ) : (
              <TouchableOpacity onPress={handleSave}>
                <Icon
                  name="save"
                  size={RFValue(20)}
                  color={theme.colors.altText}
                />
              </TouchableOpacity>
            ))}
        </Header>
        <SafeAreaView style={{ flex: 1 }}>
          {!loading && (
            <KeyboardAwareScrollView
              style={{
                flexGrow: 1,
              }}
              contentContainerStyle={{
                paddingBottom: RFValue(120),
              }}
            >
              <Content>
                <Section>
                  <Title>{list.name}</Title>
                </Section>

                <Section>
                  <Title>Budget</Title>
                  <BudgetItem type="cash">
                    <BudgetItemTitle>
                      <Icon
                        name="dollar-sign"
                        size={RFValue(16)}
                        color={theme.colors.cash}
                      />
                      <BudgetItemText>CASH</BudgetItemText>
                    </BudgetItemTitle>
                    <BudgetItemText>{formatCurrency(list.cash)}</BudgetItemText>
                  </BudgetItem>
                  <BudgetItem type="card">
                    <BudgetItemTitle>
                      <Icon
                        name="credit-card"
                        size={RFValue(16)}
                        color={theme.colors.primary}
                      />
                      <BudgetItemText>CARD</BudgetItemText>
                    </BudgetItemTitle>
                    <BudgetItemText>{formatCurrency(list.card)}</BudgetItemText>
                  </BudgetItem>
                  <BudgetItem type="total">
                    <BudgetItemTitle>
                      <Icon
                        name="bar-chart-2"
                        size={RFValue(16)}
                        color={theme.colors.text}
                      />
                      <BudgetItemText>TOTAL</BudgetItemText>
                    </BudgetItemTitle>
                    <BudgetItemText>
                      {formatCurrency(list.cash + list.card)}
                    </BudgetItemText>
                  </BudgetItem>
                </Section>

                <Section>
                  <Title>Products</Title>
                  {editableItems.map(item => (
                    <ProductCard key={item.id}>
                      <PCSection>
                        <PCText>{item.productName}</PCText>
                        <PCText>
                          {formatCurrency(item.price * item.quantity)}
                        </PCText>
                      </PCSection>
                      <PCSection>
                        <PCQuantityControl>
                          <TouchableOpacity
                            disabled={item.quantity <= 0}
                            onPress={() =>
                              handleQuantityPress(item.id, 'minus')
                            }
                          >
                            <PCQuantityControlItem
                              type="minus"
                              style={{
                                width: RFValue(36),
                                borderColor:
                                  item.quantity <= 0
                                    ? theme.colors.agnostic
                                    : theme.colors.cancel,
                              }}
                            >
                              <Icon
                                name="minus"
                                size={RFValue(16)}
                                color={
                                  item.quantity <= 0
                                    ? theme.colors.agnostic
                                    : theme.colors.cancel
                                }
                              />
                            </PCQuantityControlItem>
                          </TouchableOpacity>
                          <PCQuantityControlItem>
                            <Text
                              style={{
                                color: theme.colors.text,
                                width: RFValue(26),
                                textAlign: 'center',
                                fontSize: RFValue(16),
                              }}
                            >
                              {item.quantity}
                            </Text>
                          </PCQuantityControlItem>
                          <TouchableOpacity
                            disabled={item.quantity >= 99}
                            onPress={() => handleQuantityPress(item.id, 'plus')}
                          >
                            <PCQuantityControlItem
                              type="plus"
                              style={{
                                width: RFValue(36),
                                borderColor:
                                  item.quantity >= 99
                                    ? theme.colors.agnostic
                                    : theme.colors.ticket,
                              }}
                            >
                              <Icon
                                name="plus"
                                size={RFValue(16)}
                                color={
                                  item.quantity >= 99
                                    ? theme.colors.agnostic
                                    : theme.colors.ticket
                                }
                              />
                            </PCQuantityControlItem>
                          </TouchableOpacity>
                        </PCQuantityControl>
                        <CurrencyInput
                          value={item.price}
                          updateValue={handleItemChange}
                          editable
                          itemId={item.id}
                        />
                      </PCSection>
                    </ProductCard>
                  ))}
                </Section>
              </Content>
            </KeyboardAwareScrollView>
          )}
        </SafeAreaView>

        <Footer>
          <FooterTitle>
            <Icon
              name="shopping-cart"
              size={RFValue(16)}
              color={theme.colors.primary}
            />
            <FooterText>TOTAL</FooterText>
          </FooterTitle>
          <FooterText>
            {formatCurrency(
              editableItems.reduce((previousValue, currentItem) => {
                return previousValue + currentItem.quantity * currentItem.price;
              }, 0),
            )}
          </FooterText>
        </Footer>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default ListDetails;
