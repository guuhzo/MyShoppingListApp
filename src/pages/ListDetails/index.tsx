/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-await-in-loop */
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
} from './styles';
import theme from '../../global/theme';
import database from '../../database';
import List from '../../database/model/List';
import ListItem from '../../database/model/ListItem';
import formatCurrency from '../../utils/formatCurrency';
import CurrencyInput from '../../components/CurrencyInput';

type Prop = StackScreenProps<StackParamList, 'ListDetails'>;
interface IProductsInfo {
  id: string;
  name: string;
}

const ListDetails: React.FC<Prop> = ({ navigation, route }) => {
  const [list, setList] = useState({} as List);
  const [items, setItems] = useState([] as ListItem[]);
  const [productsInfo, setProductsInfo] = useState([] as IProductsInfo[]);
  const [loading, setLoading] = useState(true);
  const { id } = route.params;

  const loadList = useCallback(async () => {
    setLoading(true);
    const listsCollection = database.get<List>('lists');
    const listDb = await listsCollection.find(id);
    const listItems = await listDb.items.fetch();

    const productsInfo = [] as IProductsInfo[];
    for (const item of listItems) {
      const product = await item.product.fetch();
      productsInfo.push({ id: product!.id, name: product!.name });
    }

    setList(listDb);
    setItems(listItems);
    setProductsInfo(productsInfo);

    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadList();
  }, [loadList, route]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // eslint-disable-next-line prettier/prettier
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleItemChange = useCallback((id: string, value: number) => {}, []);

  const handleQuantityPress = useCallback(
    (id: string, type: 'minus' | 'plus') => {
      const index = items.findIndex(item => item.id === id);
      const item = items[index];
      switch (type) {
        case 'minus':
          item.quantity -= 1;
          break;
        case 'plus':
          item.quantity += 1;
          break;
        default:
          break;
      }
    },
    [items],
  );

  const handleProductInfo = useCallback(
    (id: string) => {
      const index = productsInfo.findIndex(item => item.id === id);

      return productsInfo[index].name;
    },
    [productsInfo],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Container>
        <SafeAreaView style={{ flex: 1 }}>
          <Header title="My List Details" canGoBack={navigation.canGoBack()} />
          {!loading && (
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
                {items.map(item => (
                  <ProductCard key={item.id}>
                    <PCSection>
                      <PCText>{handleProductInfo(item.product.id!)}</PCText>
                      <PCText>R$14,00</PCText>
                    </PCSection>
                    <PCSection>
                      <PCQuantityControl>
                        <TouchableOpacity
                          onPress={() => handleQuantityPress(item.id, 'minus')}
                        >
                          <PCQuantityControlItem
                            type="minus"
                            style={{ width: RFValue(36) }}
                          >
                            <Icon
                              name="minus"
                              size={RFValue(16)}
                              color={theme.colors.cancel}
                            />
                          </PCQuantityControlItem>
                        </TouchableOpacity>
                        <PCQuantityControlItem>
                          <Text
                            style={{
                              color: theme.colors.text,
                              width: RFValue(20),
                              textAlign: 'center',
                              fontSize: RFValue(16),
                            }}
                          >
                            {item.quantity}
                          </Text>
                        </PCQuantityControlItem>
                        <TouchableOpacity
                          onPress={() => handleQuantityPress(item.id, 'plus')}
                        >
                          <PCQuantityControlItem
                            type="plus"
                            style={{ width: RFValue(36) }}
                          >
                            <Icon
                              name="plus"
                              size={RFValue(16)}
                              color={theme.colors.ticket}
                            />
                          </PCQuantityControlItem>
                        </TouchableOpacity>
                      </PCQuantityControl>
                      <CurrencyInput
                        value={0}
                        updateValue={handleItemChange}
                        editable
                        itemId="sadf"
                      />
                    </PCSection>
                  </ProductCard>
                ))}
              </Section>
            </Content>
          )}
        </SafeAreaView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default ListDetails;
